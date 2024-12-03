import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { InventoryHistory } from '../../types';

interface HistoryTableProps {
  history: InventoryHistory[];
  sortConfig: {
    key: string;
    direction: 'asc' | 'desc';
  };
  onSort: (key: string) => void;
}

export default function HistoryTable({
  history,
  sortConfig,
  onSort
}: HistoryTableProps) {
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

  const getActionColor = (action: string) => {
    const colors = {
      create: 'bg-green-100 text-green-800',
      update: 'bg-blue-100 text-blue-800',
      delete: 'bg-red-100 text-red-800',
      stock_update: 'bg-yellow-100 text-yellow-800'
    };
    return colors[action as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('timestamp')}
              >
                <div className="flex items-center space-x-1">
                  <span>Timestamp</span>
                  {renderSortIcon('timestamp')}
                </div>
              </th>
              <th
                className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('action')}
              >
                <div className="flex items-center space-x-1">
                  <span>Action</span>
                  {renderSortIcon('action')}
                </div>
              </th>
              <th
                className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('itemName')}
              >
                <div className="flex items-center space-x-1">
                  <span>Item</span>
                  {renderSortIcon('itemName')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Previous Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                New Value
              </th>
              <th
                className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('user')}
              >
                <div className="flex items-center space-x-1">
                  <span>User</span>
                  {renderSortIcon('user')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {history.map((entry) => (
              <tr key={entry.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(entry.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getActionColor(entry.action)}`}>
                    {entry.action.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {entry.itemName}
                  </div>
                  <div className="text-sm text-gray-500">
                    SKU: {entry.sku}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {entry.previousValue || '-'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {entry.newValue || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {entry.user}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {entry.notes || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}