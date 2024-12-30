import React from 'react';
import { Clock, DollarSign, Package } from 'lucide-react';
import { Order } from '../../types';

interface OrderCardProps {
  order: Order;
  onDragStart: (e: React.DragEvent, orderId: string) => void;
}

const sourceColors = {
  swiggy: 'bg-orange-100 text-orange-800',
  zomato: 'bg-red-100 text-red-800',
  website: 'bg-blue-100 text-blue-800',
  waiter: 'bg-green-100 text-green-800'
};

export default function OrderCard({ order, onDragStart }: OrderCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, order.id)}
      className="w-[200px] aspect-square bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-move"
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-900">#{order.id.slice(0, 8)}</h3>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${sourceColors[order.source]}`}>
          {order.source}
        </span>
      </div>

      <div className="mt-3 space-y-2 text-sm">
        {order.tableNumber ? (
          <p className="text-gray-600">Table #{order.tableNumber}</p>
        ) : (
          <p className="text-gray-600 line-clamp-1">{order.deliveryAddress}</p>
        )}

        <div className="flex items-center text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span>{new Date(order.createdAt).toLocaleTimeString()}</span>
        </div>

        <div className="flex items-center text-gray-500">
          <DollarSign className="h-4 w-4 mr-1" />
          <span>${order.total.toFixed(2)}</span>
        </div>

        <p className="text-gray-600 font-medium">{order.customerName}</p>

        <div className="flex items-center text-gray-500">
          <Package className="h-4 w-4 mr-1" />
          <span>{order.items.length} items</span>
        </div>
      </div>
    </div>
  );
}