import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface UsageInputModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UsageInputModal({ isOpen, onClose }: UsageInputModalProps) {
  const { inventory, recordInventoryUsage } = useStore();
  const [formData, setFormData] = useState({
    itemId: '',
    quantity: '',
    reason: 'production',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      recordInventoryUsage({
        itemId: formData.itemId,
        quantity: Number(formData.quantity),
        reason: formData.reason as 'production' | 'wastage' | 'damage' | 'other',
        notes: formData.notes
      });
      toast.success('Usage recorded successfully');
      onClose();
      setFormData({ itemId: '', quantity: '', reason: 'production', notes: '' });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to record usage');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Record Item Usage</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Item</label>
            <select
              required
              value={formData.itemId}
              onChange={(e) => setFormData({ ...formData, itemId: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Item</option>
              {inventory.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.currentStock} {item.unit} available)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity Used</label>
            <input
              type="number"
              required
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Reason</label>
            <select
              required
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="production">Production</option>
              <option value="wastage">Wastage</option>
              <option value="damage">Damage</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="Additional details..."
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Record Usage
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}