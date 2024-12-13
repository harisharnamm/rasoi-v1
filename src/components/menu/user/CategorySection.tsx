import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MenuCategory } from '../../../types/menu';
import { MenuItem } from '../../../types';

interface CategorySectionProps {
  category: MenuCategory;
  items: MenuItem[];
  isExpanded?: boolean;
}

export default function CategorySection({
  category,
  items, 
  isExpanded: initialExpanded = true
}: CategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  return (
    <div className="border-b border-gray-200 last:border-0 pb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-6 flex items-center justify-between bg-white hover:bg-gray-50"
      >
        <div className="flex items-center space-x-3">
          {category.imageUrl && (
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          )}
          <div className="text-left">
            <h3 className="text-xl font-medium text-gray-900">{category.name}</h3>
            {category.description && (
              <p className="text-sm text-gray-500 mt-1">{category.description}</p>
            )}
            <p className="text-sm text-gray-500">{items.length} items</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  </div>
                  <p className="text-lg font-bold text-indigo-600">${item.price.toFixed(2)}</p>
                </div>
                {!item.available && (
                  <p className="mt-2 text-sm text-red-600">Currently unavailable</p>
                )}
                {item.ingredients && item.ingredients.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500">
                      {item.ingredients.map(ing => ing.itemId).join(', ')}
                    </p>
                  </div>
                )}
                <div className="mt-4">
                  <button
                    onClick={() => {/* Add to cart handler */}}
                    disabled={!item.available}
                    className={`w-full px-4 py-2 rounded-lg text-sm font-medium ${
                      item.available
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {item.available ? 'Add to Cart' : 'Unavailable'}
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