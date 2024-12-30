import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Search, Filter, Download, Calendar, Plus } from 'lucide-react';
import UsageLogTable from '../../components/inventory/UsageLogTable';
import DateRangePicker from '../../components/common/DateRangePicker';
import UsageInputModal from '../../components/inventory/UsageInputModal';
import { exportToCSV } from '../../utils/exportUtils';
import { filterUsageLogs } from '../../utils/filterUtils';
import toast from 'react-hot-toast';

export default function InventoryUsage() {
  const { inventoryUsage, inventory } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedReason, setSelectedReason] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [isUsageModalOpen, setIsUsageModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc' as 'asc' | 'desc'
  });

  const reasons = ['all', 'production', 'wastage', 'damage', 'other'];

  const handleExport = () => {
    try {
      const data = filterUsageLogs(inventoryUsage, {
        searchQuery,
        dateRange,
        reason: selectedReason
      }).map(usage => {
        const item = inventory.find(i => i.id === usage.itemId);
        return {
          Date: new Date(usage.date).toLocaleString(),
          Item: item?.name || 'Unknown Item',
          'SKU Code': item?.sku || 'N/A',
          Quantity: usage.quantity,
          Reason: usage.reason,
          Notes: usage.notes || ''
        };
      });

      exportToCSV(data, 'inventory-usage-log');
      toast.success('Usage log exported successfully');
    } catch (error) {
      toast.error('Failed to export usage log');
    }
  };

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const filteredLogs = filterUsageLogs(inventoryUsage, {
    searchQuery,
    dateRange,
    reason: selectedReason
  });

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / entriesPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-medium text-gray-900">Usage Log</h2>
          <button
            onClick={() => setIsUsageModalOpen(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Record Usage
          </button>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Download className="h-5 w-5 mr-2" />
          Export Log
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
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
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {reasons.map(reason => (
              <option key={reason} value={reason}>
                {reason.charAt(0).toUpperCase() + reason.slice(1)}
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

      <UsageLogTable
        logs={paginatedLogs}
        inventory={inventory}
        sortConfig={sortConfig}
        onSort={handleSort}
      />

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {Math.min((currentPage - 1) * entriesPerPage + 1, filteredLogs.length)} to{' '}
          {Math.min(currentPage * entriesPerPage, filteredLogs.length)} of {filteredLogs.length} entries
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

      <UsageInputModal 
        isOpen={isUsageModalOpen}
        onClose={() => setIsUsageModalOpen(false)}
      />
    </div>
  );
}