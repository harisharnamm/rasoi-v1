import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Edit2, Trash2, Package, TrendingDown, AlertTriangle, Users, History } from 'lucide-react';
import toast from 'react-hot-toast';
import InventoryUsageModal from '../../components/InventoryUsageModal';
import VendorForm from '../../components/VendorForm';
import VendorList from '../../components/VendorList';
import { Vendor } from '../../types';

export default function Inventory() {
  const { 
    inventory, 
    vendors, 
    addInventoryItem, 
    updateInventoryItem, 
    deleteInventoryItem, 
    inventoryUsage,
    addVendor,
    updateVendor,
    deleteVendor 
  } = useStore();

  const [activeTab, setActiveTab] = useState('inventory');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isAddingVendor, setIsAddingVendor] = useState(false);
  const [isUsageModalOpen, setIsUsageModalOpen] = useState(false);
  const [showUsageHistory, setShowUsageHistory] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editingVendor, setEditingVendor] = useState<string | null>(null);
  
  const [inventoryFormData, setInventoryFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: '',
    vendorId: '',
    minimumStock: '',
    currentStock: ''
  });

  const [vendorFormData, setVendorFormData] = useState({
    name: '',
    contact: '',
    email: '',
    category: ''
  });

  const handleInventorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const itemData = {
      name: inventoryFormData.name,
      category: inventoryFormData.category,
      quantity: Number(inventoryFormData.quantity),
      unit: inventoryFormData.unit,
      vendorId: inventoryFormData.vendorId,
      minimumStock: Number(inventoryFormData.minimumStock),
      currentStock: Number(inventoryFormData.currentStock)
    };

    if (editingItem) {
      updateInventoryItem({ ...itemData, id: editingItem });
      toast.success('Inventory item updated successfully');
    } else {
      addInventoryItem(itemData);
      toast.success('Inventory item added successfully');
    }

    setIsAddingItem(false);
    setEditingItem(null);
    setInventoryFormData({
      name: '',
      category: '',
      quantity: '',
      unit: '',
      vendorId: '',
      minimumStock: '',
      currentStock: ''
    });
  };

  const handleVendorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingVendor) {
      updateVendor({ ...vendorFormData, id: editingVendor });
      toast.success('Vendor updated successfully');
    } else {
      addVendor(vendorFormData);
      toast.success('Vendor added successfully');
    }

    setIsAddingVendor(false);
    setEditingVendor(null);
    setVendorFormData({
      name: '',
      contact: '',
      email: '',
      category: ''
    });
  };

  const handleEditVendor = (vendor: Vendor) => {
    setEditingVendor(vendor.id);
    setVendorFormData({
      name: vendor.name,
      contact: vendor.contact,
      email: vendor.email,
      category: vendor.category
    });
    setIsAddingVendor(true);
  };

  const handleDeleteVendor = (vendorId: string) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      deleteVendor(vendorId);
      toast.success('Vendor deleted successfully');
    }
  };

  const startEdit = (item: any) => {
    setEditingItem(item.id);
    setInventoryFormData({
      name: item.name,
      category: item.category,
      quantity: item.quantity.toString(),
      unit: item.unit,
      vendorId: item.vendorId,
      minimumStock: item.minimumStock.toString(),
      currentStock: item.currentStock.toString()
    });
    setIsAddingItem(true);
  };

  const handleDelete = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteInventoryItem(itemId);
      toast.success('Inventory item deleted successfully');
    }
  };

  const renderUsageHistory = () => {
    const groupedUsage = inventoryUsage.reduce((acc, usage) => {
      const date = new Date(usage.date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(usage);
      return acc;
    }, {} as Record<string, typeof inventoryUsage>);

    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Usage History</h2>
        {Object.entries(groupedUsage).map(([date, usages]) => (
          <div key={date} className="mb-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">{date}</h3>
            <div className="space-y-3">
              {usages.map((usage) => {
                const item = inventory.find((i) => i.id === usage.itemId);
                return (
                  <div key={usage.id} className="flex justify-between items-start border-b border-gray-100 pb-2">
                    <div>
                      <p className="font-medium">{item?.name}</p>
                      <p className="text-sm text-gray-600">
                        {usage.quantity} {item?.unit} - {usage.reason}
                      </p>
                      {usage.notes && (
                        <p className="text-sm text-gray-500 mt-1">{usage.notes}</p>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(usage.date).toLocaleTimeString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'inventory'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            <Package className="h-5 w-5 mr-2" />
            Inventory
          </button>
          <button
            onClick={() => setActiveTab('vendors')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'vendors'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            <Users className="h-5 w-5 mr-2" />
            Vendors
          </button>
        </div>
      </div>

      {activeTab === 'inventory' ? (
        <>
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                onClick={() => setIsUsageModalOpen(true)}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <TrendingDown className="h-5 w-5 mr-2" />
                Record Usage
              </button>
              <button
                onClick={() => setShowUsageHistory(!showUsageHistory)}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                <History className="h-5 w-5 mr-2" />
                {showUsageHistory ? 'Hide History' : 'Show History'}
              </button>
            </div>
            <button
              onClick={() => setIsAddingItem(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Item
            </button>
          </div>

          {showUsageHistory && renderUsageHistory()}

          {isAddingItem && (
            <form onSubmit={handleInventorySubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    required
                    value={inventoryFormData.name}
                    onChange={(e) => setInventoryFormData({ ...inventoryFormData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    required
                    value={inventoryFormData.category}
                    onChange={(e) => setInventoryFormData({ ...inventoryFormData, category: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Unit</label>
                  <input
                    type="text"
                    required
                    value={inventoryFormData.unit}
                    placeholder="e.g., kg, liters, pieces"
                    onChange={(e) => setInventoryFormData({ ...inventoryFormData, unit: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Vendor</label>
                  <select
                    required
                    value={inventoryFormData.vendorId}
                    onChange={(e) => setInventoryFormData({ ...inventoryFormData, vendorId: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select Vendor</option>
                    {vendors.map((vendor) => (
                      <option key={vendor.id} value={vendor.id}>
                        {vendor.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Minimum Stock</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={inventoryFormData.minimumStock}
                    onChange={(e) => setInventoryFormData({ ...inventoryFormData, minimumStock: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Stock</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={inventoryFormData.currentStock}
                    onChange={(e) => setInventoryFormData({ ...inventoryFormData, currentStock: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  {editingItem ? 'Update' : 'Add'} Item
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingItem(false);
                    setEditingItem(null);
                    setInventoryFormData({
                      name: '',
                      category: '',
                      quantity: '',
                      unit: '',
                      vendorId: '',
                      minimumStock: '',
                      currentStock: ''
                    });
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventory.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEdit(item)}
                      className="p-1 text-gray-600 hover:text-gray-900"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Current Stock:</span>
                    <span className="font-medium">
                      {item.currentStock} {item.unit}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Minimum Stock:</span>
                    <span className="font-medium">
                      {item.minimumStock} {item.unit}
                    </span>
                  </div>
                  {item.currentStock <= item.minimumStock && (
                    <div className="flex items-center text-red-600 text-sm mt-2">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Low stock alert
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Vendor Management</h2>
            <button
              onClick={() => setIsAddingVendor(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Vendor
            </button>
          </div>

          {isAddingVendor && (
            <VendorForm
              formData={vendorFormData}
              isEditing={!!editingVendor}
              onSubmit={handleVendorSubmit}
              onChange={(field, value) => setVendorFormData(prev => ({ ...prev, [field]: value }))}
              onCancel={() => {
                setIsAddingVendor(false);
                setEditingVendor(null);
                setVendorFormData({
                  name: '',
                  contact: '',
                  email: '',
                  category: ''
                });
              }}
            />
          )}

          <VendorList
            vendors={vendors}
            onEdit={handleEditVendor}
            onDelete={handleDeleteVendor}
          />
        </>
      )}

      <InventoryUsageModal
        isOpen={isUsageModalOpen}
        onClose={() => setIsUsageModalOpen(false)}
      />
    </div>
  );
}