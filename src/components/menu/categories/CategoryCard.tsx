import React from 'react';
import { Eye, EyeOff, Edit2, GripVertical, Plus } from 'lucide-react';
import { MenuCategory } from '../../../types/menu';
import { MenuItem } from '../../../types';
import { useStore } from '../../../store/useStore';
import { Menu } from '@headlessui/react';

interface CategoryCardProps {
  category: MenuCategory;
  onEdit: () => void;
  onToggleVisibility: () => void;
  menuItems: MenuItem[];
}

export default function CategoryCard({ 
  category, 
  onEdit, 
  onToggleVisibility,
  menuItems
}: CategoryCardProps) {
  const { assignItemToCategory, removeItemFromCategory } = useStore();

  const handleItemToggle = (itemId: string) => {
    if (category.items && category.items.includes(itemId)) {
      removeItemFromCategory(itemId, category.id);
    } else {
      assignItemToCategory(itemId, category.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center space-x-4">
        <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
        
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{category.name}</h3>
          {category.description && (
            <p className="text-sm text-gray-500">{category.description}</p>
          )}
          {category.items && category.items.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {category.items.length} items assigned
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2 relative z-50">
          <Menu as="div" className="relative">
            <Menu.Button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
              <Plus className="h-5 w-5" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto z-[60]">
              <div className="p-2">
                {menuItems.map((item) => (
                  <Menu.Item key={item.id}>
                    {({ active }) => (
                      <div
                        className={`flex items-center px-3 py-2 rounded-md ${
                          active ? 'bg-gray-100' : ''
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={category.items?.includes(item.id)}
                          onChange={() => handleItemToggle(item.id)}
                          className="h-4 w-4 text-indigo-600 rounded border-gray-300"
                        />
                        <span className="ml-3 text-sm text-gray-900">{item.name}</span>
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Menu>
          <button
            onClick={onToggleVisibility}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            {category.isActive ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeOff className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <Edit2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}