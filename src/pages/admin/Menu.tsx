import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Layers } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import MenuItemForm from '../../components/menu/MenuItemForm';
import MenuItemCard from '../../components/menu/MenuItemCard';
import MenuSearchBar from '../../components/menu/MenuSearchBar';
import { filterAndSortMenuItems, getUniqueCategories } from '../../utils/menuFilters';
import toast from 'react-hot-toast';

export default function Menu() {
  const navigate = useNavigate();
  const { menuItems, addMenuItem, updateMenuItem, toggleItemAvailability, deleteMenuItem } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = getUniqueCategories(menuItems);

  const handleSort = (key: 'name' | 'price') => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const handleDelete = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteMenuItem(itemId);
      toast.success('Menu item deleted successfully');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/admin/menu/categories')}
            className="flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Layers className="h-5 w-5 mr-2" />
            Categories
          </button>
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
      </div>

      {!isAdding && (
        <MenuSearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          categories={categories}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={handleSort}
          sortOrder={sortOrder}
        />
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
          {filterAndSortMenuItems(menuItems, {
            searchQuery,
            category: selectedCategory,
            sortBy,
            sortOrder
          }).map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onEdit={() => {
                setEditingItem(item.id);
                setIsAdding(true);
              }}
              onDelete={() => handleDelete(item.id)}
              onToggleAvailability={() => toggleItemAvailability(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}