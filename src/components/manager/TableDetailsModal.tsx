import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useRestaurantStore } from '../../store/restaurantStore';
import { X, Printer, DollarSign, Clock, User } from 'lucide-react';
import { generateRetailInvoice } from '../../utils/pdfGenerator';
import toast from 'react-hot-toast';

interface TableDetailsModalProps {
  tableId: string;
  onClose: () => void;
}

export default function TableDetailsModal({ tableId, onClose }: TableDetailsModalProps) {
  const { menuItems } = useStore();
  const { tables, orders, completeOrder } = useRestaurantStore();
  const table = tables.find(t => t.id === tableId);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');

  if (!table || !table.currentOrder) {
    return null;
  }

  const order = table.currentOrder;
  const startTime = new Date(order.startTime);
  const duration = order.completedTime 
    ? Math.round((new Date(order.completedTime).getTime() - startTime.getTime()) / 1000 / 60)
    : Math.round((new Date().getTime() - startTime.getTime()) / 1000 / 60);

  const handlePrintBill = () => {
    const orderItems = order.items.map(item => {
      const menuItem = menuItems.find(m => m.id === item.menuItemId)!;
      return {
        name: menuItem.name,
        quantity: item.quantity,
        price: item.price,
        notes: item.notes
      };
    });

    const billDetails = {
      orderNumber: order.id.slice(0, 8),
      tableNumber: table.number,
      customerCount: order.customerCount,
      items: orderItems,
      subtotal: order.total,
      tax: order.total * 0.18,
      total: order.total * 1.18,
      startTime: startTime,
      duration,
      waiterId: order.waiterId
    };

    const invoice = generateRetailInvoice(billDetails);
    invoice.save(`Table-${table.number}-Bill.pdf`);
    toast.success('Bill generated successfully');
  };

  const handleCompleteOrder = () => {
    if (window.confirm('Are you sure you want to complete this order?')) {
      completeOrder(order.id, paymentMethod);
      toast.success('Order completed successfully');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Table {table.number} Details
              </h2>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>Started: {startTime.toLocaleTimeString()}</span>
                <span className="mx-2">•</span>
                <span>Duration: {duration} mins</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>Waiter ID: {order.waiterId}</span>
              </div>
              <span>{order.customerCount} guests</span>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium text-gray-900 mb-3">Order Items</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => {
                  const menuItem = menuItems.find(m => m.id === item.menuItemId)!;
                  return (
                    <div key={index} className="flex justify-between">
                      <div>
                        <p className="font-medium">{menuItem.name}</p>
                        {item.notes && (
                          <p className="text-sm text-gray-500">{item.notes}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p>{item.quantity} × ${item.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">
                          ${(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span>Tax (18%)</span>
                <span>${(order.total * 0.18).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg mt-2">
                <span>Total</span>
                <span>${(order.total * 1.18).toFixed(2)}</span>
              </div>
            </div>

            {!order.completedTime && (
              <div className="border-t border-gray-200 pt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Payment Method
                  </label>
                  <div className="mt-2 flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'cash')}
                        className="mr-2"
                      />
                      Cash
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'card')}
                        className="mr-2"
                      />
                      Card
                    </label>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handlePrintBill}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    <Printer className="h-5 w-5 mr-2" />
                    Print Bill
                  </button>
                  <button
                    onClick={handleCompleteOrder}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <DollarSign className="h-5 w-5 mr-2" />
                    Complete Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}