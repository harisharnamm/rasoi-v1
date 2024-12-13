import React from 'react';
import { Edit2, Trash2, ToggleLeft } from 'lucide-react';
import { MenuItem } from '../../types';

interface MenuItemCardProps {
  item: MenuItem;
  onEdit: () => void;
  onDelete: () => void;
  onToggleAvailability: () => void;
}

export default function MenuItemCard({
  item,
  onEdit,
  onDelete,
  onToggleAvailability
}: MenuItemCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
              onClick={onEdit}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </button>
            <button
              onClick={onDelete}
              className="flex items-center text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </button>
          </div>
          <button
            onClick={onToggleAvailability}
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
  );
}