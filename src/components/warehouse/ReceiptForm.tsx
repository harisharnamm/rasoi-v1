import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { X, Camera } from 'lucide-react';
import BarcodeScanner from './BarcodeScanner';

interface ReceiptFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function ReceiptForm({ onSubmit, onCancel }: ReceiptFormProps) {
  const { inventory, locations } = useStore();
  const [showScanner, setShowScanner] = useState(false);
  const [formData, setFormData] = useState({
    itemId: '',
    quantity: '',
    locationId: '',
    source: 'manual',
    condition: 'good',
    receivedBy: '',
    notes: '',
    batchNumber: '',
    barcode: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleBarcodeScan = (barcode: string) => {
    // Find item by barcode
    const item = inventory.find(i => i.sku === barcode);
    if (item) {
      setFormData(prev => ({
        ...prev,
        itemId: item.id,
        barcode: barcode,
        quantity: '1'
      }));
    } else {
      toast.error('Product not found for this barcode');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {showScanner && (
        <BarcodeScanner
          onScan={handleBarcodeScan}
          onClose={() => setShowScanner(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <select
            required
            value={formData.locationId}
            onChange={(e) => setFormData({ ...formData, locationId: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>{location.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Source</label>
          <select
            required
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="manual">Manual Entry</option>
            <option value="purchase_order">Purchase Order</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Condition</label>
          <select
            required
            value={formData.condition}
            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="good">Good</option>
            <option value="damaged">Damaged</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Received By</label>
          <input
            type="text"
            required
            value={formData.receivedBy}
            onChange={(e) => setFormData({ ...formData, receivedBy: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Batch Number</label>
          <input
            type="text"
            value={formData.batchNumber}
            onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Barcode</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              value={formData.barcode}
              onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
              className="flex-1 rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowScanner(true)}
              className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <Camera className="h-5 w-5 text-gray-400" />
              <span>Scan</span>
            </button>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
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
          Create Receipt
        </button>
      </div>
    </form>
  );
}