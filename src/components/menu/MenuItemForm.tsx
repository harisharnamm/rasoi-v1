import React, { useState } from 'react';
import { MenuItem } from '../../types/menu';
import { Upload, Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';

const foodCategories = ['dairy', 'meat', 'produce', 'grains', 'beverages', 'spices', 'other'];
const customizationDefaults = {
  id: '',
  name: '',
  options: [{ name: '', price: 0 }]
};

interface MenuItemFormProps {
  initialData?: MenuItem;
  onSubmit: (data: Omit<MenuItem, 'id' | 'lastUpdated'>) => void;
  onCancel: () => void;
  categories?: string[];
}

export default function MenuItemForm({ initialData, onSubmit, onCancel, categories }: MenuItemFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    platformPrices: initialData?.platformPrices || {
      dineIn: 0,
      delivery: 0,
      swiggy: 0,
      zomato: 0
    },
    category: initialData?.category || '',
    subcategory: initialData?.subcategory || '',
    dietaryType: initialData?.dietaryType || 'veg',
    available: initialData?.available ?? true,
    image: initialData?.image || '',
    preparationTime: initialData?.preparationTime || 15,
    platformCodes: initialData?.platformCodes || {
      swiggy: '',
      zomato: ''
    },
    customizationOptions: initialData?.customizationOptions || [customizationDefaults]
  });

  const [imagePreview, setImagePreview] = useState(formData.image);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In production, implement actual image upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addCustomizationOption = () => {
    setFormData(prev => ({
      ...prev,
      customizationOptions: [...prev.customizationOptions, { ...customizationDefaults, id: crypto.randomUUID() }]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Item name is required');
      return;
    }

    if (formData.price <= 0) {
      toast.error('Base price must be greater than 0');
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Category</option>
            {(categories || []).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Base Price</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Preparation Time (minutes)</label>
          <input
            type="number"
            required
            min="1"
            value={formData.preparationTime}
            onChange={(e) => setFormData({ ...formData, preparationTime: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="available"
              checked={formData.available}
              onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="available" className="text-sm font-medium text-gray-700">
              Item is available for ordering
            </label>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Platform Prices</label>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            {['dineIn', 'delivery', 'swiggy', 'zomato'].map((platform) => (
              <div key={platform}>
                <label className="block text-xs text-gray-500 capitalize">{platform}</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.platformPrices[platform] || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    platformPrices: {
                      ...formData.platformPrices,
                      [platform]: parseFloat(e.target.value)
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Platform Codes</label>
          <div className="mt-2 grid grid-cols-2 gap-4">
            {['swiggy', 'zomato'].map((platform) => (
              <div key={platform}>
                <label className="block text-xs text-gray-500 capitalize">{platform} Code</label>
                <input
                  type="text"
                  value={formData.platformCodes[platform] || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    platformCodes: {
                      ...formData.platformCodes,
                      [platform]: e.target.value
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <div className="mt-2 flex items-center space-x-4">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview('');
                    setFormData(prev => ({ ...prev, image: '' }));
                  }}
                  className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                >
                  <Minus className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-indigo-500">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-xs text-gray-500">Upload image</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Customization Options</label>
            <button
              type="button"
              onClick={addCustomizationOption}
              className="flex items-center px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Option
            </button>
          </div>

          <div className="mt-2 space-y-4">
            {formData.customizationOptions.map((option, optionIndex) => (
              <div key={option.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <input
                    type="text"
                    placeholder="Option Name"
                    value={option.name}
                    onChange={(e) => {
                      const newOptions = [...formData.customizationOptions];
                      newOptions[optionIndex].name = e.target.value;
                      setFormData({ ...formData, customizationOptions: newOptions });
                    }}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        customizationOptions: formData.customizationOptions.filter((_, i) => i !== optionIndex)
                      });
                    }}
                    className="ml-2 p-1 text-red-600 hover:text-red-700"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {option.options.map((choice, choiceIndex) => (
                    <div key={choiceIndex} className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Choice"
                        value={choice.name}
                        onChange={(e) => {
                          const newOptions = [...formData.customizationOptions];
                          newOptions[optionIndex].options[choiceIndex].name = e.target.value;
                          setFormData({ ...formData, customizationOptions: newOptions });
                        }}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={choice.price}
                        onChange={(e) => {
                          const newOptions = [...formData.customizationOptions];
                          newOptions[optionIndex].options[choiceIndex].price = parseFloat(e.target.value);
                          setFormData({ ...formData, customizationOptions: newOptions });
                        }}
                        className="w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newOptions = [...formData.customizationOptions];
                          newOptions[optionIndex].options = option.options.filter((_, i) => i !== choiceIndex);
                          setFormData({ ...formData, customizationOptions: newOptions });
                        }}
                        className="p-1 text-red-600 hover:text-red-700"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newOptions = [...formData.customizationOptions];
                      newOptions[optionIndex].options.push({ name: '', price: 0 });
                      setFormData({ ...formData, customizationOptions: newOptions });
                    }}
                    className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Choice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
        >
          {initialData ? 'Update' : 'Create'} Item
        </button>
      </div>
    </form>
  );
}