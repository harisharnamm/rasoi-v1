import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Search, Filter, ArrowUpDown } from 'lucide-react';
import ItemForm from '../../components/inventory/ItemForm';
import ProductCard from '../../components/inventory/ProductCard';
import toast from 'react-hot-toast';

export default function InventoryItems() {
  const { inventory, vendors, addInventoryItem, updateInventoryItem, deleteInventoryItem } = useStore();
  
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'stock'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    unit: '',
    price: '',
    vendorId: '',
    minimumStock: '',
    currentStock: '',
    trackInventory: true,
    brand: '',
    foodCategory: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const itemData = {
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      unit: formData.unit,
      price: Number(formData.price),
      vendorId: formData.vendorId,
      minimumStock: Number(formData.minimumStock),
      currentStock: Number(formData.currentStock),
      trackInventory: formData.trackInventory,
      brand: formData.brand,
      foodCategory: formData.foodCategory,
    };

    try {
      if (editingItem) {
        updateInventoryItem({ ...itemData, id: editingItem });
        toast.success('Item updated successfully');
      } else {
        addInventoryItem(itemData);
        toast.success('Item added successfully');
      }

      setIsAddingItem(false);
      setEditingItem(null);
      setFormData({
        name: '',
        sku: '',
        category: '',
        unit: '',
        price: '',
        vendorId: '',
        minimumStock: '',
        currentStock: '',
        trackInventory: true,
        brand: '',
        foodCategory: '',
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save item');
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item.id);
    setFormData({
      name: item.name,
      sku: item.sku,
      category: item.category,
      unit: item.unit,
      price: item.price.toString(),
      vendorId: item.vendorId,
      minimumStock: item.minimumStock.toString(),
      currentStock: item.currentStock.toString(),
      trackInventory: item.trackInventory,
      brand: item.brand || '',
      foodCategory: item.foodCategory || '',
    });
    setIsAddingItem(true);
  };

  const handleDelete = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteInventoryItem(itemId);
      toast.success('Item deleted successfully');
    }
  };

  const filteredItems = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesVendor = selectedVendor === 'all' || item.vendorId === selectedVendor;
    
    return matchesSearch && matchesCategory && matchesVendor;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    const modifier = sortOrder === 'asc' ? 1 : -1;
    if (sortBy === 'name') {
      return modifier * a.name.localeCompare(b.name);
    }
    return modifier * (a.currentStock - b.currentStock);
  });

  const categories = ['all', ...new Set(inventory.map(item => item.category))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Items</h1>
        <button
          onClick={() => setIsAddingItem(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Item
        </button>
      </div>

      {isAddingItem ? (
        <ItemForm
          formData={formData}
          isEditing={!!editingItem}
          onSubmit={handleSubmit}
          onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
          onCancel={() => {
            setIsAddingItem(false);
            setEditingItem(null);
            setFormData({
              name: '',
              sku: '',
              category: '',
              unit: '',
              price: '',
              vendorId: '',
              minimumStock: '',
              currentStock: '',
              trackInventory: true,
              brand: '',
              foodCategory: '',
            });
          }}
        />
      ) : (
        <>
          <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1 relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="flex space-x-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedVendor}
                  onChange={(e) => setSelectedVendor(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="all">All Vendors</option>
                  {vendors.map(vendor => (
                    <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    if (sortBy === 'name') {
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy('name');
                      setSortOrder('asc');
                    }
                  }}
                  className="flex items-center px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  <ArrowUpDown className="h-4 w-4 mr-1" />
                  Name
                </button>

                <button
                  onClick={() => {
                    if (sortBy === 'stock') {
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy('stock');
                      setSortOrder('asc');
                    }
                  }}
                  className="flex items-center px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  <ArrowUpDown className="h-4 w-4 mr-1" />
                  Stock
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItems.map(item => {
              const vendor = vendors.find(v => v.id === item.vendorId);
              return (
                <ProductCard
                  key={item.id}
                  name={item.name}
                  sku={item.sku}
                  currentStock={item.currentStock}
                  unit={item.unit}
                  minimumStock={item.minimumStock}
                  vendor={vendor?.name || 'Unknown Vendor'}
                  onOrderClick={() => {
                    // Handle order creation
                    toast.success('Purchase order creation coming soon!');
                  }}
                />
              );
            })}
          </div>

          {sortedItems.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No items found matching your criteria
            </div>
          )}
        </>
      )}
    </div>
  );
}