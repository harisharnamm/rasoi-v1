import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Search, Filter, Download, Calendar } from 'lucide-react';
import HistoryTable from '../../components/inventory/HistoryTable';
import DateRangePicker from '../../components/common/DateRangePicker';
import { exportToCSV } from '../../utils/exportUtils';
import { filterHistoryLogs } from '../../utils/filterUtils';
import toast from 'react-hot-toast';

export default function InventoryHistory() {
  const { inventoryHistory, inventory } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedAction, setSelectedAction] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: 'timestamp',
    direction: 'desc' as 'asc' | 'desc'
  });

  const actions = ['all', 'create', 'update', 'delete', 'stock_update'];

  const handleExport = () => {
    try {
      const data = filterHistoryLogs(inventoryHistory, {
        searchQuery,
        dateRange,
        action: selectedAction
      }).map(history => ({
        Date: new Date(history.timestamp).toLocaleString(),
        Action: history.action,
        Item: history.itemName,
        'SKU Code': history.sku,
        'Previous Value': history.previousValue || '',
        'New Value': history.newValue || '',
        User: history.user,
        Notes: history.notes || ''
      }));

      exportToCSV(data, 'inventory-history');
      toast.success('History exported successfully');
    } catch (error) {
      toast.error('Failed to export history');
    }
  };

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const filteredHistory = filterHistoryLogs(inventoryHistory, {
    searchQuery,
    dateRange,
    action: selectedAction
  });

  // Pagination
  const totalPages = Math.ceil(filteredHistory.length / entriesPerPage);
  const paginatedHistory = filteredHistory.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Inventory History</h1>
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Download className="h-5 w-5 mr-2" />
          Export History
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <DateRangePicker
            startDate={dateRange.start}
            endDate={dateRange.end}
            onStartDateChange={(date) => setDateRange(prev => ({ ...prev, start: date }))}
            onEndDateChange={(date) => setDateRange(prev => ({ ...prev, end: date }))}
          />

          <select
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {actions.map(action => (
              <option key={action} value={action}>
                {action.charAt(0).toUpperCase() + action.slice(1).replace('_', ' ')}
              </option>
            ))}
          </select>

          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value={10}>10 entries</option>
            <option value={25}>25 entries</option>
            <option value={50}>50 entries</option>
            <option value={100}>100 entries</option>
          </select>
        </div>
      </div>

      <HistoryTable
        history={paginatedHistory}
        sortConfig={sortConfig}
        onSort={handleSort}
      />

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {Math.min((currentPage - 1) * entriesPerPage + 1, filteredHistory.length)} to{' '}
          {Math.min(currentPage * entriesPerPage, filteredHistory.length)} of {filteredHistory.length} entries
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}