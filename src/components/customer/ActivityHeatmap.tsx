import React from 'react';
import { useStore } from '../../store/useStore';
import { Calendar } from 'lucide-react';

interface ActivityHeatmapProps {
  customerId: string | null;
}

export default function ActivityHeatmap({ customerId }: ActivityHeatmapProps) {
  const { orders } = useStore();

  if (!customerId) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Activity Heatmap</h2>
        <p className="text-gray-500 text-center">Select a customer to view activity</p>
      </div>
    );
  }

  // Generate activity data for the last 12 weeks
  const weeks = 12;
  const days = weeks * 7;
  const today = new Date();
  const activityData = Array.from({ length: days }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dayOrders = orders.filter(
      order =>
        order.customerId === customerId &&
        new Date(order.createdAt).toDateString() === date.toDateString()
    );
    return {
      date,
      count: dayOrders.length,
      value: dayOrders.reduce((sum, order) => sum + order.total, 0)
    };
  }).reverse();

  const getActivityColor = (count: number) => {
    if (count === 0) return 'bg-gray-100';
    if (count === 1) return 'bg-green-200';
    if (count === 2) return 'bg-green-300';
    return 'bg-green-400';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Activity Heatmap</h2>
        <Calendar className="h-5 w-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="text-center text-xs text-gray-500">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'][i]}
          </div>
        ))}
        {activityData.map((day, i) => (
          <div
            key={i}
            className={`aspect-square rounded-sm ${getActivityColor(day.count)}`}
            title={`${day.date.toLocaleDateString()}: ${day.count} orders, $${day.value.toFixed(
              2
            )}`}
          />
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
        <span>Less</span>
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-gray-100 rounded-sm" />
          <div className="w-3 h-3 bg-green-200 rounded-sm" />
          <div className="w-3 h-3 bg-green-300 rounded-sm" />
          <div className="w-3 h-3 bg-green-400 rounded-sm" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}