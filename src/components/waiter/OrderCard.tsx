import React from 'react';
import { Clock, DollarSign, Users } from 'lucide-react';
import { Table } from '../../types/restaurant';
import { useStore } from '../../store/useStore';

interface OrderCardProps {
  table: Table;
  onViewDetails: () => void;
}

export default function OrderCard({ table, onViewDetails }: OrderCardProps) {
  const { menuItems } = useStore();
  const order = table.currentOrder!;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'served':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">Table {table.number}</h3>
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>
              {new Date(order.startTime).toLocaleTimeString()}
            </span>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      <div className="space-y-2">
        {order.items.map((item, index) => {
          const menuItem = menuItems.find(m => m.id === item.menuItemId)!;
          return (
            <div key={index} className="flex justify-between text-sm">
              <span>{item.quantity}x {menuItem.name}</span>
              <span className={getStatusColor(item.status)}>
                {item.status}
              </span>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
        <div className="flex items-center text-gray-500">
          <Users className="h-4 w-4 mr-1" />
          <span>{order.customerCount} guests</span>
        </div>
        <div className="flex items-center font-medium">
          <DollarSign className="h-4 w-4" />
          <span>{order.total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onViewDetails}
        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
      >
        View Details
      </button>
    </div>
  );
}