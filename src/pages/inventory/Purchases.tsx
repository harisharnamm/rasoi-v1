import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Filter, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import type { PurchaseOrder } from '../../store/slices/purchaseOrderSlice';
import PurchaseOrderForm from '../../components/inventory/PurchaseOrderForm';
import PurchaseOrderList from '../../components/inventory/PurchaseOrderList';

export default function InventoryPurchases() {
  const { purchaseOrders = [], createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder } = useStore();
  const [isCreating, setIsCreating] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  const handleSubmit = (formData: Omit<PurchaseOrder, 'id' | 'createdAt'>) => {
    try {
      if (selectedOrder) {
        updatePurchaseOrder(selectedOrder, formData);
        toast.success('Purchase order updated successfully');
      } else {
        createPurchaseOrder(formData);
        toast.success('Purchase order created successfully');
      }
      setIsCreating(false);
      setSelectedOrder(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save purchase order');
    }
  };

  const handleEdit = (orderId: string) => {
    setSelectedOrder(orderId);
    setIsCreating(true);
  };

  const handleDelete = (orderId: string) => {
    if (window.confirm('Are you sure you want to delete this purchase order?')) {
      deletePurchaseOrder(orderId);
      toast.success('Purchase order deleted successfully');
    }
  };

  const filteredOrders = purchaseOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Purchase Orders</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Purchase Order
        </button>
      </div>

      {isCreating ? (
        <PurchaseOrderForm
          orderId={selectedOrder}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsCreating(false);
            setSelectedOrder(null);
          }}
        />
      ) : (
        <>
          <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1 relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search purchase orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="flex space-x-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="requested">Requested</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="all">All Payments</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          <PurchaseOrderList
            orders={filteredOrders}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onUpdateStatus={(orderId, status) => {
              updatePurchaseOrder(orderId, { status });
              toast.success('Order status updated');
            }}
            onUpdatePayment={(orderId, paymentStatus) => {
              updatePurchaseOrder(orderId, { paymentStatus });
              toast.success('Payment status updated');
            }}
          />
        </>
      )}
    </div>
  );
}