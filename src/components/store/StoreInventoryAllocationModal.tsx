import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Search, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface StoreInventoryAllocationModalProps {
  storeId: string;
  onClose: () => void;
}

export default function StoreInventoryAllocationModal({
  storeId,
  onClose
}: StoreInventoryAllocationModalProps) {
  const { inventory } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<Array<{
    itemId: string;
    quantity: number;
  }>>([]);

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setSelectedItems(prev => {
      const existing = prev.find(item => item.itemId === itemId);
      if (existing) {
        return prev.map(item =>
          item.itemId === itemId ? { ...item, quantity } : item
        );
      }
      return [...prev, { itemId, quantity }];
    });
  };

  const handleSubmit = () => {
    // TODO: Implement allocation logic
    toast.success('Items allocated successfully');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Allocate Inventory Items</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-4 max-h-[50vh] overflow-y-auto">
            {filteredInventory.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    Available: {item.currentStock} {item.unit}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min="0"
                    max={item.currentStock}
                    value={selectedItems.find(i => i.itemId === item.id)?.quantity || ''}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Qty"
                  />
                  <span className="text-sm text-gray-500">{item.unit}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
            >
              Allocate Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}