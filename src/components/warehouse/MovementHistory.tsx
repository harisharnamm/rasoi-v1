import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Search, Calendar } from 'lucide-react';
import DateRangePicker from '../common/DateRangePicker';

export default function MovementHistory() {
  const { movements, locations, inventory } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const filteredMovements = movements.filter(movement => {
    const matchesSearch = 
      movement.itemId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movement.fromLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movement.toLocation.toLowerCase().includes(searchQuery.toLowerCase());
    
    const movementDate = new Date(movement.movedAt);
    const matchesDate = 
      (!dateRange.start || movementDate >= new Date(dateRange.start)) &&
      (!dateRange.end || movementDate <= new Date(dateRange.end));
    
    return matchesSearch && matchesDate;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search movements..."
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
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                From
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Moved By
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMovements.map((movement) => {
              const item = inventory.find(i => i.id === movement.itemId);
              const fromLocation = locations.find(l => l.id === movement.fromLocation);
              const toLocation = locations.find(l => l.id === movement.toLocation);

              return (
                <tr key={movement.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {movement.movedAt.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {item?.name || 'Unknown Item'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item?.sku || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {fromLocation?.name || 'Unknown Location'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {toLocation?.name || 'Unknown Location'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {movement.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {movement.movedBy}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredMovements.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No movements found
          </div>
        )}
      </div>
    </div>
  );
}