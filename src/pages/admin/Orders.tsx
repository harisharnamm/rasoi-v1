import { useStore } from '../../store/useStore';
import { Order } from '../../types';

export default function Orders() {
  const { orders, updateOrderStatus } = useStore();

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      preparing: 'bg-blue-100 text-blue-800',
      ready: 'bg-green-100 text-green-800',
      delivered: 'bg-gray-100 text-gray-800'
    };
    return colors[status];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">
                  Order #{order.id.slice(0, 8)}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                className={`${getStatusColor(order.status)} px-3 py-1 rounded-full text-sm font-medium`}
              >
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            <div className="mt-4">
              <h4 className="font-medium text-gray-700">Customer Details</h4>
              <p className="text-sm text-gray-600">
                Name: {order.customerName}
                <br />
                Phone: {order.customerPhone}
                {order.customerAddress && (
                  <>
                    <br />
                    Address: {order.customerAddress}
                  </>
                )}
              </p>
            </div>

            <div className="mt-4">
              <h4 className="font-medium text-gray-700">Order Items</h4>
              <ul className="mt-2 space-y-2">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between font-medium">
                <span>Total Amount</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              {order.paymentMethod && (
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Payment Method</span>
                  <span className="capitalize">{order.paymentMethod}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No orders yet
          </div>
        )}
      </div>
    </div>
  );
}