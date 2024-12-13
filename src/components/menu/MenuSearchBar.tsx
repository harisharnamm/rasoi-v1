import React from 'react';
import { Search, ArrowUpDown } from 'lucide-react';

interface MenuSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
  sortBy: 'name' | 'price';
  onSortChange: (key: 'name' | 'price') => void;
  sortOrder: 'asc' | 'desc';
}

export default function MenuSearchBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  categories,
  onCategoryChange,
  sortBy,
  onSortChange,
  sortOrder
}: MenuSearchBarProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 relative">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
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
            onClick={() => onSortChange('name')}
            className={`flex items-center px-3 py-2 rounded-md ${
              sortBy === 'name' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100'
            }`}
          >
            <ArrowUpDown className="h-4 w-4 mr-1" />
            Name
          </button>
          <button
            onClick={() => onSortChange('price')}
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
  );
}