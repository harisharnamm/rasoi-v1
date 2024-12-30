import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Search, Filter, Download } from 'lucide-react';
import ReceiptForm from '../../components/warehouse/ReceiptForm';
import LocationManager from '../../components/warehouse/LocationManager';
import MovementHistory from '../../components/warehouse/MovementHistory';
import StorageMetrics from '../../components/warehouse/StorageMetrics';
import { exportToCSV } from '../../utils/exportUtils';
import toast from 'react-hot-toast';

export default function Warehouse() {
  const [activeTab, setActiveTab] = useState<'receipts' | 'locations' | 'movements' | 'metrics'>('receipts');
  const [showReceiptForm, setShowReceiptForm] = useState(false);
  const { receipts, locations, movements, addReceipt } = useStore();

  const handleExport = () => {
    try {
      const data = receipts.map(receipt => ({
        'Receipt ID': receipt.id,
        'Item': receipt.itemId,
        'Quantity': receipt.quantity,
        'Location': receipt.locationId,
        'Received At': receipt.receivedAt.toLocaleString(),
        'Source': receipt.source,
        'Condition': receipt.condition,
        'Received By': receipt.receivedBy,
        'Notes': receipt.notes || ''
      }));

      exportToCSV(data, 'warehouse-receipts');
      toast.success('Warehouse receipts exported successfully');
    } catch (error) {
      toast.error('Failed to export receipts');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Warehouse Management</h1>
        <div className="flex items-center space-x-4">
          {activeTab === 'receipts' && (
            <>
              <button
                onClick={() => setShowReceiptForm(true)}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Receipt
              </button>
              <button
                onClick={handleExport}
                className="flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Download className="h-5 w-5 mr-2" />
                Export
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('receipts')}
              className={`flex-1 px-4 py-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'receipts'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Receipts
            </button>
            <button
              onClick={() => setActiveTab('locations')}
              className={`flex-1 px-4 py-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'locations'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Locations
            </button>
            <button
              onClick={() => setActiveTab('movements')}
              className={`flex-1 px-4 py-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'movements'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Movements
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`flex-1 px-4 py-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'metrics'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Metrics
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'receipts' && (
            <>
              {showReceiptForm ? (
                <ReceiptForm
                  onSubmit={(data) => {
                    addReceipt(data);
                    setShowReceiptForm(false);
                    toast.success('Receipt added successfully');
                  }}
                  onCancel={() => setShowReceiptForm(false)}
                />
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 relative">
                      <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search receipts..."
                        className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <select className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                      <option value="all">All Sources</option>
                      <option value="manual">Manual Entry</option>
                      <option value="purchase_order">Purchase Order</option>
                      <option value="transfer">Transfer</option>
                    </select>
                  </div>

                  <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Receipt ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Item
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Received At
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {receipts.map((receipt) => (
                          <tr key={receipt.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {receipt.id.slice(0, 8)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {receipt.itemId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {receipt.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {receipt.locationId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {receipt.receivedAt.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                receipt.condition === 'good'
                                  ? 'bg-green-100 text-green-800'
                                  : receipt.condition === 'damaged'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {receipt.condition}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {receipts.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        No receipts found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'locations' && <LocationManager />}
          {activeTab === 'movements' && <MovementHistory />}
          {activeTab === 'metrics' && <StorageMetrics />}
        </div>
      </div>
    </div>
  );
}