import React from 'react';
import { ChevronRight, Eye, EyeOff } from 'lucide-react';
import { MenuCategory } from '../../../types/menu';
import { MenuItem } from '../../../types';
import CategoryCard from './CategoryCard';

interface CategoryListProps {
  categories: MenuCategory[];
  onEdit: (category: MenuCategory) => void;
  onToggleVisibility: (categoryId: string) => void;
  menuItems: MenuItem[];
  onReorder: (sourceId: string, targetId: string) => void;
}

export default function CategoryList({ 
  categories, 
  onEdit, 
  onToggleVisibility,
  menuItems,
  onReorder 
}: CategoryListProps) {
  const handleDragStart = (e: React.DragEvent, categoryId: string) => {
    e.dataTransfer.setData('categoryId', categoryId);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData('categoryId');
    if (sourceId !== targetId) {
      onReorder(sourceId, targetId);
    }
  };

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div
          key={category.id}
          draggable
          onDragStart={(e) => handleDragStart(e, category.id)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, category.id)}
          className="transform transition-transform duration-200 hover:scale-[1.01]"
        >
          <CategoryCard
            category={category}
            onEdit={() => onEdit(category)}
            onToggleVisibility={() => onToggleVisibility(category.id)}
            menuItems={menuItems}
          />
        </div>
      ))}
    </div>
  );
}