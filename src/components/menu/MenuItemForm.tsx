import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Minus, Search } from 'lucide-react';
import toast from 'react-hot-toast';

interface MenuItemFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export default function MenuItemForm({ initialData, onSubmit, onCancel, isEditing }: MenuItemFormProps) {
  const { inventory } = useStore();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || '',
    image: initialData?.image || '',
    category: initialData?.category || '',
    preparationTime: initialData?.preparationTime || '',
    preparationInstructions: initialData?.preparationInstructions || '',
    ingredients: initialData?.ingredients || [],
    available: initialData?.available ?? true
  });

  const [searchQuery, setSearchQuery] = useState('');

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddIngredient = (inventoryItem: any) => {
    if (formData.ingredients.some(ing => ing.itemId === inventoryItem.id)) {
      toast.error('This ingredient is already added');
      return;
    }

    setFormData(prev => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        {
          itemId: inventoryItem.id,
          quantity: 1,
          unit: inventoryItem.unit,
          wastagePercentage: 0
        }
      ]
    }));
  };

  const handleRemoveIngredient = (itemId: string) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(ing => ing.itemId !== itemId)
    }));
  };

  const updateIngredient = (itemId: string, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.map(ing =>
        ing.itemId === itemId ? { ...ing, [field]: value } : ing
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.ingredients.length === 0) {
      toast.error('Please add at least one ingredient');
      return;
    }

    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      preparationTime: parseInt(formData.preparationTime)
    });
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
          <input
            type="text"
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
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
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            required
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Preparation Instructions</label>
          <textarea
            required
            value={formData.preparationInstructions}
            onChange={(e) => setFormData({ ...formData, preparationInstructions: e.target.value })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Ingredients</h3>
        
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search inventory items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInventory.map(item => (
            <div
              key={item.id}
              className="p-4 border rounded-lg hover:border-indigo-500 cursor-pointer"
              onClick={() => handleAddIngredient(item)}
            >
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-gray-500">SKU: {item.sku}</p>
              <p className="text-sm text-gray-500">Unit: {item.unit}</p>
            </div>
          ))}
        </div>

        {formData.ingredients.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Selected Ingredients</h4>
            <div className="space-y-4">
              {formData.ingredients.map(ing => {
                const item = inventory.find(i => i.id === ing.itemId);
                return (
                  <div key={ing.itemId} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{item?.name}</p>
                      <p className="text-sm text-gray-500">SKU: {item?.sku}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div>
                        <label className="block text-sm text-gray-600">Quantity</label>
                        <input
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={ing.quantity}
                          onChange={(e) => updateIngredient(ing.itemId, 'quantity', parseFloat(e.target.value))}
                          className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Wastage %</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={ing.wastagePercentage}
                          onChange={(e) => updateIngredient(ing.itemId, 'wastagePercentage', parseInt(e.target.value))}
                          className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredient(ing.itemId)}
                        className="p-2 text-red-600 hover:text-red-700"
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
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
          {isEditing ? 'Update' : 'Create'} Menu Item
        </button>
      </div>
    </form>
  );
}