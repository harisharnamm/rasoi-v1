import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { InventoryUsage, InventoryItem } from '../../types';

interface UsageLogTableProps {
  logs: InventoryUsage[];
  inventory: InventoryItem[];
  sortConfig: {
    key: string;
    direction: 'asc' | 'desc';
  };
  onSort: (key: string) => void;
}

export default function UsageLogTable({
  logs,
  inventory,
  sortConfig,
  onSort
}: UsageLogTableProps) {
  const renderSortIcon = (key: string) => {
    if (sortConfig.key === key) {
      return (
        <ArrowUpDown
          className={`h-4 w-4 transition-transform ${
            sortConfig.direction === 'desc' ? 'transform rotate-180' : ''
          }`}
        />
      );
    }
    return <ArrowUpDown className="h-4 w-4 opacity-0 group-hover:opacity-100" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('date')}
              >
                <div className="flex items-center space-x-1">
                  <span>Date</span>
                  {renderSortIcon('date')}
                </div>
              </th>
              <th
                className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('itemId')}
              >
                <div className="flex items-center space-x-1">
                  <span>Item</span>
                  {renderSortIcon('itemId')}
                </div>
              </th>
              <th
                className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('quantity')}
              >
                <div className="flex items-center space-x-1">
                  <span>Quantity</span>
                  {renderSortIcon('quantity')}
                </div>
              </th>
              <th
                className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('reason')}
              >
                <div className="flex items-center space-x-1">
                  <span>Reason</span>
                  {renderSortIcon('reason')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logs.map((log) => {
              const item = inventory.find(i => i.id === log.itemId);
              return (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(log.date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {item?.name || 'Unknown Item'}
                    </div>
                    <div className="text-sm text-gray-500">
                      SKU: {item?.sku || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.quantity} {item?.unit || 'units'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      log.reason === 'production' ? 'bg-green-100 text-green-800' :
                      log.reason === 'wastage' ? 'bg-red-100 text-red-800' :
                      log.reason === 'damage' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {log.reason}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {log.notes || '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}