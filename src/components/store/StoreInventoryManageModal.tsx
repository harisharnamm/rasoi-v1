import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { X, Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';

interface StoreInventoryManageModalProps {
  itemId: string;
  storeId: string;
  onClose: () => void;
}

export default function StoreInventoryManageModal({
  itemId,
  storeId,
  onClose
}: StoreInventoryManageModalProps) {
  const { inventory } = useStore();
  const item = inventory.find(i => i.id === itemId);
  const [quantity, setQuantity] = useState(0);
  const [notes, setNotes] = useState('');

  if (!item) return null;

  const handleSubmit = (action: 'add' | 'remove') => {
    if (quantity <= 0) {
      toast.error('Please enter a valid quantity');
      return;
    }

    if (action === 'remove' && quantity > item.currentStock) {
      toast.error('Cannot remove more than current stock');
      return;
    }

    // TODO: Implement stock update logic
    toast.success(`Stock ${action === 'add' ? 'added' : 'removed'} successfully`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Manage Stock</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div>
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-500">SKU: {item.sku}</p>
            <p className="mt-2">
              Current Stock: {item.currentStock} {item.unit}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Add any relevant notes..."
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => handleSubmit('remove')}
              className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Minus className="h-5 w-5 mr-2" />
              Remove Stock
            </button>
            <button
              onClick={() => handleSubmit('add')}
              className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Stock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}