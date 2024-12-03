import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { PurchaseOrder } from '../../types';
import { useStore } from '../../store/useStore';

interface PurchaseOrderListProps {
  orders: PurchaseOrder[];
  onEdit: (orderId: string) => void;
  onDelete: (orderId: string) => void;
  onUpdateStatus: (orderId: string, status: PurchaseOrder['status']) => void;
  onUpdatePayment: (orderId: string, status: PurchaseOrder['paymentStatus']) => void;
}

export default function PurchaseOrderList({
  orders,
  onEdit,
  onDelete,
  onUpdateStatus,
  onUpdatePayment
}: PurchaseOrderListProps) {
  const { vendors, inventory } = useStore();

  const getStatusColor = (status: PurchaseOrder['status']) => {
    const colors = {
      requested: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  const getPaymentStatusColor = (status: PurchaseOrder['paymentStatus']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800'
    };
    return colors[status];
  };

  return (
    <div className="space-y-6">
      {orders.map(order => {
        const vendor = vendors.find(v => v.id === order.vendorId);
        
        return (
          <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  PO #{order.id.slice(0, 8)}
                </h3>
                <p className="text-sm text-gray-500">
                  Vendor: {vendor?.name || 'Unknown Vendor'}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={order.status}
                  onChange={(e) => onUpdateStatus(order.id, e.target.value as PurchaseOrder['status'])}
                  className={`${getStatusColor(order.status)} px-3 py-1 rounded-full text-sm font-medium`}
                >
                  <option value="requested">Requested</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <select
                  value={order.paymentStatus}
                  onChange={(e) => onUpdatePayment(order.id, e.target.value as PurchaseOrder['paymentStatus'])}
                  className={`${getPaymentStatusColor(order.paymentStatus)} px-3 py-1 rounded-full text-sm font-medium`}
                >
                  <option value="pending">Payment Pending</option>
                  <option value="processing">Payment Processing</option>
                  <option value="completed">Payment Completed</option>
                </select>

                <button
                  onClick={() => onEdit(order.id)}
                  className="p-1 text-gray-600 hover:text-gray-900"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(order.id)}
                  className="p-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium text-gray-700 mb-2">Order Items</h4>
              <div className="space-y-2">
                {order.items.map((item, index) => {
                  const inventoryItem = inventory.find(i => i.id === item.itemId);
                  return (
                    <div key={index} className="flex justify-between text-sm text-gray-600">
                      <span>{inventoryItem?.name || 'Unknown Item'}</span>
                      <span>
                        {item.quantity} x ${item.pricePerUnit.toFixed(2)} = $
                        {(item.quantity * item.pricePerUnit).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">Total Amount:</span>
                <span className="font-bold text-gray-900">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>
              {order.expectedDelivery && (
                <div className="flex justify-between text-sm mt-2">
                  <span className="font-medium text-gray-700">Expected Delivery:</span>
                  <span className="text-gray-600">
                    {new Date(order.expectedDelivery).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {orders.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No purchase orders found
        </div>
      )}
    </div>
  );
}