import React, { useState, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { Clock, Package, Check, X } from 'lucide-react';

const statusSteps = {
  'pending': 0,
  'preparing': 1,
  'ready': 2,
  'completed': 3,
  'cancelled': 4
};

export default function OrderStatus() {
  const { orders } = useStore();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const sortedOrders = useMemo(() => {
    // Sort orders by date, most recent first
    return [...(orders || [])].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [orders]);

  const selectedOrderDetails = useMemo(() => {
    return selectedOrder ? orders?.find(order => order.id === selectedOrder) : null;
  }, [orders, selectedOrder]);

  const getStatusColor = (status: string) => {
    if (!status) return 'bg-gray-100 text-gray-800';

    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Order Status</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="font-medium text-gray-900">Recent Orders</h2>
          <div className="space-y-4">
            {sortedOrders.map(order => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order.id)}
                className={`bg-white rounded-lg shadow-sm p-4 cursor-pointer transition-shadow hover:shadow-md ${
                  selectedOrder === order.id ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">
                      Order #{order.id.slice(0, 8)}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(order.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Unknown'}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {order.items.length} items · ${(order.total || 0).toFixed(2)}
                </div>
              </div>
            ))}

            {sortedOrders.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No orders found
              </div>
            )}
          </div>
        </div>

        {/* Order Details */}
        <div className="lg:col-span-2">
          {selectedOrderDetails ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Order Details
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    #{selectedOrderDetails.id.slice(0, 8)}
                  </p>
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  getStatusColor(selectedOrderDetails.status)
                }`}>
                  {selectedOrderDetails.status ? 
                    selectedOrderDetails.status.charAt(0).toUpperCase() + selectedOrderDetails.status.slice(1)
                    : 'Unknown'
                  }
                </span>
              </div>

              {/* Order Progress */}
              <div className="mb-8">
                <div className="relative">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
                    <div
                      style={{ width: `${(statusSteps[selectedOrderDetails.status] / 3) * 100}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        selectedOrderDetails.status === 'cancelled' 
                          ? 'bg-red-500'
                          : 'bg-indigo-500'
                      }`}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="text-center">
                      <div className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full ${
                        statusSteps[selectedOrderDetails.status] >= 0 
                          ? 'bg-indigo-100 text-indigo-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        <Clock className="h-5 w-5" />
                      </div>
                      <p className="mt-1 text-xs">Received</p>
                    </div>
                    <div className="text-center">
                      <div className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full ${
                        statusSteps[selectedOrderDetails.status] >= 1
                          ? 'bg-indigo-100 text-indigo-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        <Package className="h-5 w-5" />
                      </div>
                      <p className="mt-1 text-xs">Preparing</p>
                    </div>
                    <div className="text-center">
                      <div className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full ${
                        statusSteps[selectedOrderDetails.status] >= 2
                          ? 'bg-indigo-100 text-indigo-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        <Check className="h-5 w-5" />
                      </div>
                      <p className="mt-1 text-xs">Ready</p>
                    </div>
                    <div className="text-center">
                      <div className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full ${
                        statusSteps[selectedOrderDetails.status] >= 3
                          ? 'bg-indigo-100 text-indigo-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {selectedOrderDetails.status === 'cancelled' ? (
                          <X className="h-5 w-5 text-red-600" />
                        ) : (
                          <Check className="h-5 w-5" />
                        )}
                      </div>
                      <p className="mt-1 text-xs">
                        {selectedOrderDetails.status === 'cancelled' ? 'Cancelled' : 'Completed'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-4">
                  {selectedOrderDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.quantity}x {item.name}
                        </p>
                        {item.notes && (
                          <p className="text-sm text-gray-500">{item.notes}</p>
                        )}
                      </div>
                      <p className="font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-200 mt-6 pt-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>${(selectedOrderDetails.total || 0).toFixed(2)}</p>
                </div>
                {selectedOrderDetails.deliveryAddress && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Delivery Address</h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedOrderDetails.deliveryAddress}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
              Select an order to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}