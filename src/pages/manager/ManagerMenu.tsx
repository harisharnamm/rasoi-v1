import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Edit2, ToggleLeft, Trash2, Search, ArrowUpDown } from 'lucide-react';
import MenuItemForm from '../../components/menu/MenuItemForm';
import toast from 'react-hot-toast';

export default function ManagerMenu() {
  const { menuItems, addMenuItem, updateMenuItem, toggleItemAvailability, deleteMenuItem } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  const handleSort = (key: 'name' | 'price') => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedItems = menuItems
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const modifier = sortOrder === 'asc' ? 1 : -1;
      if (sortBy === 'name') {
        return modifier * a.name.localeCompare(b.name);
      }
      return modifier * (a.price - b.price);
    });

  const handleDelete = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteMenuItem(itemId);
      toast.success('Menu item deleted successfully');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Menu Item
          </button>
        )}
      </div>

      {!isAdding && (
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

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

            <div className="flex space-x-2">
              <button
                onClick={() => handleSort('name')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  sortBy === 'name' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100'
                }`}
              >
                <ArrowUpDown className="h-4 w-4 mr-1" />
                Name
              </button>
              <button
                onClick={() => handleSort('price')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  sortBy === 'price' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100'
                }`}
              >
                <ArrowUpDown className="h-4 w-4 mr-1" />
                Price
              </button>
            </div>
          </div>
        </div>
      )}

      {isAdding ? (
        <MenuItemForm
          onSubmit={(data) => {
            if (editingItem) {
              updateMenuItem({ ...data, id: editingItem });
              toast.success('Menu item updated successfully');
            } else {
              addMenuItem(data);
              toast.success('Menu item added successfully');
            }
            setIsAdding(false);
            setEditingItem(null);
          }}
          onCancel={() => {
            setIsAdding(false);
            setEditingItem(null);
          }}
          isEditing={!!editingItem}
          initialData={editingItem ? menuItems.find(item => item.id === editingItem) : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <span className="text-lg font-bold text-indigo-600">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{item.description}</p>
                
                {item.ingredients && item.ingredients.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700">Ingredients:</h4>
                    <ul className="mt-1 space-y-1">
                      {item.ingredients.map((ing, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          {ing.quantity} {ing.unit}
                          {ing.wastagePercentage > 0 && ` (${ing.wastagePercentage}% wastage)`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingItem(item.id);
                        setIsAdding(true);
                      }}
                      className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </div>
                  <button
                    onClick={() => toggleItemAvailability(item.id)}
                    className={`flex items-center px-3 py-1 rounded-full ${
                      item.available
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    <ToggleLeft className="h-4 w-4 mr-1" />
                    {item.available ? 'Available' : 'Unavailable'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}