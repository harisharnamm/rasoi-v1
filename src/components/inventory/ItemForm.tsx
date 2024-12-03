import React from 'react';
import { useStore } from '../../store/useStore';

interface ItemFormProps {
  formData: {
    name: string;
    sku: string;
    category: string;
    unit: string;
    price: string;
    vendorId: string;
    minimumStock: string;
    currentStock: string;
    trackInventory: boolean;
    brand: string;
    foodCategory: string;
  };
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: string | boolean) => void;
  onCancel: () => void;
}

export default function ItemForm({ formData, isEditing, onSubmit, onChange, onCancel }: ItemFormProps) {
  const { vendors } = useStore();

  const units = ['kg', 'liters', 'pieces', 'boxes', 'dozen'];
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
          <label className="block text-sm font-medium text-gray-700">SKU Code</label>
          <input
            type="text"
            required
            value={formData.sku}
            onChange={(e) => onChange('sku', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            required
            value={formData.category}
            onChange={(e) => onChange('category', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Unit</label>
          <select
            required
            value={formData.unit}
            onChange={(e) => onChange('unit', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Unit</option>
            {units.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price per Unit</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => onChange('price', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Vendor</label>
          <select
            required
            value={formData.vendorId}
            onChange={(e) => onChange('vendorId', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Vendor</option>
            {vendors.map(vendor => (
              <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Brand</label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) => onChange('brand', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Food Category</label>
          <select
            required
            value={formData.foodCategory}
            onChange={(e) => onChange('foodCategory', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Food Category</option>
            {foodCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Minimum Stock</label>
          <input
            type="number"
            required
            min="0"
            value={formData.minimumStock}
            onChange={(e) => onChange('minimumStock', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Current Stock</label>
          <input
            type="number"
            required
            min="0"
            value={formData.currentStock}
            onChange={(e) => onChange('currentStock', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="trackInventory"
          checked={formData.trackInventory}
          onChange={(e) => onChange('trackInventory', e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="trackInventory" className="ml-2 block text-sm text-gray-900">
          Track inventory for this item
        </label>
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          {isEditing ? 'Update' : 'Add'} Item
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