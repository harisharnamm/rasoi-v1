import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Minus, Search, Receipt, Printer, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { generateRetailInvoice, generateKOT } from '../../utils/pdfGenerator';

export default function Billing() {
  const { menuItems, addOrder } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<Array<{ id: string; quantity: number }>>([]);
  const [orderDetails, setOrderDetails] = useState({
    customerName: '',
    customerPhone: '',
    orderType: 'dining' as 'dining' | 'delivery' | 'pickup',
    tableNumber: '',
    paymentMethod: 'cash',
    isPaid: false
  });

  const filteredItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) && item.available
  );

  const getItemQuantity = (itemId: string) => {
    const item = selectedItems.find(i => i.id === itemId);
    return item?.quantity || 0;
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      setSelectedItems(prev => prev.filter(item => item.id !== itemId));
    } else {
      setSelectedItems(prev => {
        const existing = prev.find(item => item.id === itemId);
        if (existing) {
          return prev.map(item => 
            item.id === itemId ? { ...item, quantity } : item
          );
        }
        return [...prev, { id: itemId, quantity }];
      });
    }
  };

  const calculateTotals = () => {
    const subtotal = selectedItems.reduce((total, selected) => {
      const menuItem = menuItems.find(item => item.id === selected.id);
      return total + (menuItem?.price || 0) * selected.quantity;
    }, 0);
    
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + tax;
    
    return { subtotal, tax, total };
  };

  const handlePrintBill = () => {
    const { subtotal, tax, total } = calculateTotals();
    const orderItems = selectedItems.map(selected => {
      const menuItem = menuItems.find(item => item.id === selected.id)!;
      return {
        ...menuItem,
        quantity: selected.quantity
      };
    });

    const billDetails = {
      orderNumber: crypto.randomUUID().slice(0, 8),
      customerName: orderDetails.customerName,
      customerPhone: orderDetails.customerPhone,
      items: orderItems,
      subtotal,
      tax,
      total,
      orderType: orderDetails.orderType,
      tableNumber: orderDetails.tableNumber,
      isPaid: orderDetails.isPaid,
      paymentMethod: orderDetails.paymentMethod
    };

    // Generate and download retail invoice
    const invoice = generateRetailInvoice(billDetails);
    invoice.save(`Invoice-${billDetails.orderNumber}.pdf`);

    // Generate and download KOT
    const kot = generateKOT(billDetails);
    kot.save(`KOT-${billDetails.orderNumber}.pdf`);

    // Save order to system
    addOrder({
      items: orderItems,
      total,
      status: 'delivered',
      customerName: orderDetails.customerName,
      customerPhone: orderDetails.customerPhone,
      orderType: orderDetails.orderType,
      tableNumber: orderDetails.tableNumber,
      paymentMethod: orderDetails.paymentMethod as 'cash' | 'card' | 'upi',
      createdAt: new Date()
    });

    // Reset form
    setSelectedItems([]);
    setOrderDetails({
      customerName: '',
      customerPhone: '',
      orderType: 'dining',
      tableNumber: '',
      paymentMethod: 'cash',
      isPaid: false
    });
    
    toast.success('Bill generated successfully');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Side - Menu Items */}
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200 max-h-[calc(100vh-200px)] overflow-y-auto">
          {filteredItems.map((item) => (
            <div key={item.id} className="p-4 flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2">
                {getItemQuantity(item.id) > 0 ? (
                  <>
                    <button
                      onClick={() => updateQuantity(item.id, getItemQuantity(item.id) - 1)}
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{getItemQuantity(item.id)}</span>
                  </>
                ) : null}
                <button
                  onClick={() => updateQuantity(item.id, getItemQuantity(item.id) + 1)}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Bill Details */}
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Bill Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Name</label>
              <input
                type="text"
                required
                value={orderDetails.customerName}
                onChange={(e) => setOrderDetails(prev => ({ ...prev, customerName: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                required
                value={orderDetails.customerPhone}
                onChange={(e) => setOrderDetails(prev => ({ ...prev, customerPhone: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Order Type</label>
              <select
                value={orderDetails.orderType}
                onChange={(e) => setOrderDetails(prev => ({ 
                  ...prev, 
                  orderType: e.target.value as 'dining' | 'delivery' | 'pickup',
                  tableNumber: e.target.value !== 'dining' ? '' : prev.tableNumber
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="dining">Dining</option>
                <option value="delivery">Delivery</option>
                <option value="pickup">Pickup</option>
              </select>
            </div>

            {orderDetails.orderType === 'dining' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Table Number</label>
                <input
                  type="text"
                  value={orderDetails.tableNumber}
                  onChange={(e) => setOrderDetails(prev => ({ ...prev, tableNumber: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Method</label>
              <select
                value={orderDetails.paymentMethod}
                onChange={(e) => setOrderDetails(prev => ({ ...prev, paymentMethod: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPaid"
                checked={orderDetails.isPaid}
                onChange={(e) => setOrderDetails(prev => ({ ...prev, isPaid: e.target.checked }))}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="isPaid" className="text-sm font-medium text-gray-700">
                Mark as Paid
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2">
              {selectedItems.map(selected => {
                const item = menuItems.find(i => i.id === selected.id)!;
                return (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{selected.quantity}x {item.name}</span>
                    <span>${(item.price * selected.quantity).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${calculateTotals().subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>GST (18%)</span>
                <span>${calculateTotals().tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>${calculateTotals().total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handlePrintBill}
              disabled={selectedItems.length === 0}
              className="flex-1 flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
            >
              <Receipt className="h-5 w-5 mr-2" />
              Generate Bill & KOT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}