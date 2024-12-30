import React, { useState } from 'react';
import { Search, Calendar, Download } from 'lucide-react';
import DateRangePicker from '../common/DateRangePicker';
import { exportToCSV } from '../../utils/exportUtils';
import toast from 'react-hot-toast';

// Sample data - replace with actual data from your store
const sampleLogs = [
  {
    id: '1',
    userId: 'user1',
    userName: 'John Doe',
    action: 'login',
    timestamp: new Date().toISOString(),
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    status: 'success'
  },
  // Add more sample logs...
];

export default function AccessLogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [actionFilter, setActionFilter] = useState('all');

  const handleExport = () => {
    try {
      const data = sampleLogs.map(log => ({
        User: log.userName,
        Action: log.action,
        'IP Address': log.ipAddress,
        Timestamp: new Date(log.timestamp).toLocaleString(),
        Status: log.status
      }));

      exportToCSV(data, 'access-logs');
      toast.success('Access logs exported successfully');
    } catch (error) {
      toast.error('Failed to export access logs');
    }
  };

  const filteredLogs = sampleLogs.filter(log => {
    const matchesSearch = 
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.includes(searchQuery);
    
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    
    const logDate = new Date(log.timestamp);
    const matchesDate = 
      (!dateRange.start || logDate >= new Date(dateRange.start)) &&
      (!dateRange.end || logDate <= new Date(dateRange.end));
    
    return matchesSearch && matchesAction && matchesDate;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Access Logs</h2>
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Download className="h-5 w-5 mr-2" />
          Export Logs
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Actions</option>
            <option value="login">Login</option>
            <option value="logout">Logout</option>
            <option value="failed_login">Failed Login</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLogs.map((log) => (
              <tr key={log.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                  <div className="text-sm text-gray-500">{log.userId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    log.action === 'login' ? 'bg-green-100 text-green-800' :
                    log.action === 'logout' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {log.ipAddress}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    log.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No access logs found
          </div>
        )}
      </div>
    </div>
  );
}