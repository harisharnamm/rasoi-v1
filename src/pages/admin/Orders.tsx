import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Search, Bell } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Orders() {
  const { orders, updateOrderStatus } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = useMemo(() => orders?.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  }), [orders, searchQuery, statusFilter]);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus as Order['status']);
    toast.success(`Order status updated to ${newStatus}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <div className="mt-2">
            <Link
              to="/admin/orders/live"
              className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100"
            >
              <Bell className="h-4 w-4 mr-2" />
              Live Orders ({orders.filter(o => o.status === 'pending').length})
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders?.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{order.id.slice(0, 8)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{order.customerName}</div>
                  {order.deliveryAddress && (
                    <div className="text-xs text-gray-400">{order.deliveryAddress}</div>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {item.quantity}x {item.name}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${(order.total || 0).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`text-sm font-medium rounded-full px-3 py-1 ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'ready' ? 'bg-green-100 text-green-800' :
                      order.status === 'completed' ? 'bg-purple-100 text-purple-800' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!filteredOrders?.length && (
          <div className="text-center py-12 text-gray-500">
            No orders found
          </div>
        )}
      </div>
    </div>
  );
}