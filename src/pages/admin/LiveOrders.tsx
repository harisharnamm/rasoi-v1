import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Bell, Clock, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LiveOrders() {
  const { orders, updateOrderStatus } = useStore();
  const [selectedPlatform, setPlatform] = useState<'all' | 'swiggy' | 'zomato' | 'talabat'>('all');

  // Filter and sort orders by creation time
  const pendingOrders = orders
    .filter(order => 
      order.status === 'pending' &&
      (selectedPlatform === 'all' || order.source === selectedPlatform)
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleAcceptOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'preparing');
    toast.success('Order accepted');
  };

  const handleMarkOutOfStock = (orderId: string) => {
    updateOrderStatus(orderId, 'cancelled');
    toast.error('Order marked as out of stock');
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'swiggy':
        return 'bg-orange-100 text-orange-800';
      case 'zomato':
        return 'bg-red-100 text-red-800';
      case 'talabat':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Live Orders</h1>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPlatform}
            onChange={(e) => setPlatform(e.target.value as any)}
            className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Platforms</option>
            <option value="swiggy">Swiggy</option>
            <option value="zomato">Zomato</option>
            <option value="talabat">Talabat</option>
          </select>
          <div className="relative">
            <Bell className="h-6 w-6 text-gray-400" />
            {pendingOrders.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {pendingOrders.length}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pendingOrders.map(order => (
          <div 
            key={order.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden border-t-4 border-indigo-500"
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Order #{order.id.slice(0, 8)}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPlatformColor(order.source)}`}>
                  {order.source.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">{item.quantity}x</span>
                      <span className="ml-2">{item.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {item.notes && `(${item.notes})`}
                    </span>
                  </div>
                ))}
              </div>

              {order.deliveryAddress && (
                <div className="text-sm text-gray-500 mb-4">
                  📍 {order.deliveryAddress}
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => handleAcceptOrder(order.id)}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleMarkOutOfStock(order.id)}
                  className="flex-1 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200"
                >
                  Out of Stock
                </button>
              </div>
            </div>
          </div>
        ))}

        {pendingOrders.length === 0 && (
          <div className="col-span-full text-center py-12">
            <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No pending orders</h3>
            <p className="mt-1 text-sm text-gray-500">New orders will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}