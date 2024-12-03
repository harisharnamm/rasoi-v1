import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Minus, Trash2 } from 'lucide-react';

interface PurchaseOrderFormProps {
  orderId?: string | null;
  onSubmit: (formData: any) => void;
  onCancel: () => void;
}

export default function PurchaseOrderForm({ orderId, onSubmit, onCancel }: PurchaseOrderFormProps) {
  const { vendors, inventory, purchaseOrders } = useStore();
  const [formData, setFormData] = useState({
    vendorId: '',
    items: [] as Array<{ itemId: string; quantity: number; pricePerUnit: number }>,
    status: 'requested',
    paymentStatus: 'pending',
    expectedDelivery: '',
  });

  useEffect(() => {
    if (orderId) {
      const order = purchaseOrders.find(o => o.id === orderId);
      if (order) {
        setFormData({
          vendorId: order.vendorId,
          items: order.items,
          status: order.status,
          paymentStatus: order.paymentStatus,
          expectedDelivery: order.expectedDelivery ? new Date(order.expectedDelivery).toISOString().split('T')[0] : '',
        });
      }
    }
  }, [orderId, purchaseOrders]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalAmount = formData.items.reduce(
      (sum, item) => sum + item.quantity * item.pricePerUnit,
      0
    );
    onSubmit({ ...formData, totalAmount });
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { itemId: '', quantity: 1, pricePerUnit: 0 }],
    }));
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const updateItem = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const vendorItems = inventory.filter(item => item.vendorId === formData.vendorId);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Vendor</label>
          <select
            required
            value={formData.vendorId}
            onChange={(e) => setFormData({ ...formData, vendorId: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Vendor</option>
            {vendors.map(vendor => (
              <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Expected Delivery</label>
          <input
            type="date"
            value={formData.expectedDelivery}
            onChange={(e) => setFormData({ ...formData, expectedDelivery: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            required
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="requested">Requested</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Payment Status</label>
          <select
            required
            value={formData.paymentStatus}
            onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Order Items</h3>
          <button
            type="button"
            onClick={addItem}
            className="flex items-center px-3 py-1 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Item
          </button>
        </div>

        {formData.items.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end border-b border-gray-200 pb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Item</label>
              <select
                required
                value={item.itemId}
                onChange={(e) => updateItem(index, 'itemId', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Item</option>
                {vendorItems.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                required
                min="1"
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price per Unit</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={item.pricePerUnit}
                onChange={(e) => updateItem(index, 'pricePerUnit', parseFloat(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <button
              type="button"
              onClick={() => removeItem(index)}
              className="flex items-center text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          {orderId ? 'Update' : 'Create'} Purchase Order
        </button>
      </div>
    </form>
  );
}