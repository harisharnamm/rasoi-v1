import React from 'react';
import { X, AlertTriangle, Send } from 'lucide-react';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

interface StoreDiscrepancyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StoreDiscrepancyModal({ isOpen, onClose }: StoreDiscrepancyModalProps) {
  const { stores } = useStore();

  const storeDiscrepancies = [
    {
      storeId: '1',
      name: 'Downtown Store',
      discrepancy: 15.2,
      items: [
        { name: 'Tomatoes', difference: -8 },
        { name: 'Onions', difference: -12 },
      ]
    },
    {
      storeId: '2',
      name: 'Uptown Store',
      discrepancy: 8.7,
      items: [
        { name: 'Chicken', difference: -5 },
        { name: 'Rice', difference: -7 },
      ]
    }
  ];

  const handleWarnManager = (storeId: string) => {
    // In production, this would send a notification to the store manager
    toast.success('Warning sent to store manager');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Store Inventory Discrepancies</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6 max-h-[60vh] overflow-y-auto">
            {storeDiscrepancies.map((store) => (
              <div key={store.storeId} className="bg-white border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{store.name}</h3>
                    <div className="flex items-center mt-1">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                      <span className="text-sm text-amber-600">
                        {store.discrepancy}% inventory discrepancy
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleWarnManager(store.storeId)}
                    className="flex items-center px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100"
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Warn Manager
                  </button>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Problematic Items:</h4>
                  <div className="space-y-2">
                    {store.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.name}</span>
                        <span className="text-red-600">{item.difference} units</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}