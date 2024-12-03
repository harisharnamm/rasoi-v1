import React from 'react';
import { Plus } from 'lucide-react';

interface VendorFormProps {
  formData: {
    name: string;
    contact: string;
    email: string;
    category: string;
  };
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: string) => void;
  onCancel: () => void;
}

export default function VendorForm({ formData, isEditing, onSubmit, onChange, onCancel }: VendorFormProps) {
  const foodCategories = ['dairy', 'meat', 'produce', 'grains', 'beverages', 'spices', 'other'];

  return (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Number</label>
          <input
            type="tel"
            required
            value={formData.contact}
            onChange={(e) => onChange('contact', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Food Category</label>
          <select
            required
            value={formData.category}
            onChange={(e) => onChange('category', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Food Category</option>
            {foodCategories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          {isEditing ? 'Update' : 'Add'} Vendor
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}