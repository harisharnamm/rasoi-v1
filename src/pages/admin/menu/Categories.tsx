import React, { useState } from 'react';
import { Plus, Layers, Search } from 'lucide-react';
import CategoryList from '../../../components/menu/categories/CategoryList';
import CategoryForm from '../../../components/menu/categories/CategoryForm';
import { MenuCategory } from '../../../types/menu';
import { useStore } from '../../../store/useStore';
import toast from 'react-hot-toast';

export default function Categories() {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<MenuCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { menuCategories, menuItems, addMenuCategory, updateMenuCategory, deleteMenuCategory, toggleCategoryVisibility } = useStore();

  const filteredCategories = menuCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (categoryData: Omit<MenuCategory, 'id'>) => {
    try {
      if (editingCategory) {
        updateMenuCategory(editingCategory.id, categoryData);
        toast.success('Category updated successfully');
      } else {
        addMenuCategory(categoryData);
        toast.success('Category created successfully');
      }
      setIsAddingCategory(false);
      setEditingCategory(null);
    } catch (error) {
      toast.error('Failed to save category');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:justify-between">
        <div className="flex-1 max-w-md relative">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu Categories</h1>
          <p className="mt-1 text-sm text-gray-500">
            Organize your menu items into categories
          </p>
        </div>
        <button
          onClick={() => setIsAddingCategory(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Category
        </button>
      </div>

      {isAddingCategory || editingCategory ? (
        <CategoryForm
          initialData={editingCategory || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsAddingCategory(false);
            setEditingCategory(null);
          }}
          categories={menuCategories}
        />
      ) : (
        <>
          {menuCategories.length === 0 ? (
            <div className="text-center py-12">
              <Layers className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No categories</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new category
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setIsAddingCategory(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Category
                </button>
              </div>
            </div>
          ) : (
            <CategoryList
              categories={filteredCategories}
              onEdit={setEditingCategory}
              onToggleVisibility={toggleCategoryVisibility}
              menuItems={menuItems}
            />
          )}
        </>
      )}
    </div>
  );
}