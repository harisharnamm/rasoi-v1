import React from 'react';
import { Order } from '../../types';
import OrderCard from './OrderCard';

interface OrderColumnProps {
  title: string;
  orders: Order[];
  onDragStart: (e: React.DragEvent, orderId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export default function OrderColumn({
  title,
  orders,
  onDragStart,
  onDragOver,
  onDrop
}: OrderColumnProps) {
  return (
    <div
      className="flex-1 min-h-[600px] bg-gray-50 rounded-lg p-4"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        <span className="px-2 py-1 bg-gray-200 text-gray-700 text-sm font-medium rounded-full">
          {orders.length}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 auto-rows-max">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
}