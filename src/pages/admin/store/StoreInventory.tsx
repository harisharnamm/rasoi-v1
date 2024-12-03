import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../../store/useStore';
import { Package, AlertTriangle, Search, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import StoreInventoryAllocationModal from '../../../components/store/StoreInventoryAllocationModal';
import StoreInventoryManageModal from '../../../components/store/StoreInventoryManageModal';

export default function StoreInventory() {
  const { storeId } = useParams();
  const { inventory, stores } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllocationModal, setShowAllocationModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const store = stores.find(s => s.id === storeId);
  
  if (!store) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Store not found</h2>
      </div>
    );
  }

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStockStatus = (currentStock: number, minimumStock: number) => {
    if (currentStock === 0) return 'out';
    if (currentStock <= minimumStock) return 'low';
    return 'good';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'out':
        return 'bg-red-100 text-red-800';
      case 'low':
        return 'bg-yellow-100 text-yellow-800';
      case 'good':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Store Inventory</h2>
        <button
          onClick={() => setShowAllocationModal(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Allocate Items
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="relative">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search inventory items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInventory.map((item) => {
          const status = getStockStatus(item.currentStock, item.minimumStock);
          return (
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Package className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
                  {status.toUpperCase()}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Current Stock</p>
                  <p className="font-medium">{item.currentStock} {item.unit}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Minimum Stock</p>
                  <p className="font-medium">{item.minimumStock} {item.unit}</p>
                </div>
              </div>

              {status !== 'good' && (
                <div className="mt-4 flex items-start space-x-2 text-sm text-red-600">
                  <AlertTriangle className="h-4 w-4 mt-0.5" />
                  <p>
                    {status === 'out'
                      ? 'Out of stock! Place order immediately.'
                      : 'Low stock warning. Consider restocking soon.'}
                  </p>
                </div>
              )}

              <button
                onClick={() => setSelectedItem(item.id)}
                className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Manage Stock
              </button>
            </div>
          );
        })}
      </div>

      {showAllocationModal && (
        <StoreInventoryAllocationModal
          storeId={storeId}
          onClose={() => {
            setShowAllocationModal(false);
            toast.success('Inventory allocation updated');
          }}
        />
      )}

      {selectedItem && (
        <StoreInventoryManageModal
          itemId={selectedItem}
          storeId={storeId}
          onClose={() => {
            setSelectedItem(null);
            toast.success('Stock level updated');
          }}
        />
      )}
    </div>
  );
}