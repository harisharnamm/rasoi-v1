import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Edit2, ToggleLeft, Trash2, Search, ArrowUpDown } from 'lucide-react';
import MenuItemForm from '../../components/menu/MenuItemForm';
import toast from 'react-hot-toast';

export default function Menu() {
  const { menuItems, addMenuItem, updateMenuItem, toggleItemAvailability, deleteMenuItem } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(formData.price);
    
    if (editingItem) {
      const updatedItem = {
        id: editingItem,
        name: formData.name,
        description: formData.description,
        price,
        image: formData.image,
        available: true
      };
      updateMenuItem(updatedItem);
      toast.success('Menu item updated successfully');
      setEditingItem(null);
    } else {
      addMenuItem({
        name: formData.name,
        description: formData.description,
        price,
        image: formData.image,
        available: true,
        id: '' // Will be set by the store
      });
      toast.success('Menu item added successfully');
    }
    
    setIsAdding(false);
    setFormData({ name: '', description: '', price: '', image: '' });
  };

  const startEdit = (item: any) => {
    setEditingItem(item.id);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      image: item.image,
    });
    setIsAdding(true);
  };

  const handleDelete = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteMenuItem(itemId);
      toast.success('Menu item deleted successfully');
    }
  };

  const handleSort = (key: 'name' | 'price') => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedItems = menuItems
    .filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const modifier = sortOrder === 'asc' ? 1 : -1;
      if (sortBy === 'name') {
        return modifier * a.name.localeCompare(b.name);
      }
      return modifier * (a.price - b.price);
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
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
          <div className="flex items-center space-x-4">
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

      {isAdding && (
        <MenuItemForm
          initialData={editingItem ? formData : undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsAdding(false);
            setEditingItem(null);
            setFormData({ name: '', description: '', price: '', image: '' });
          }}
          isEditing={!!editingItem}
        />
      )}

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
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <span className="text-lg font-bold text-indigo-600">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <p className="mt-2 text-gray-600">{item.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEdit(item)}
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
    </div>
  );
}