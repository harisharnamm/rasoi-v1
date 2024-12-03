import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, addOrder, clearCart } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    type: 'delivery',
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Simulate payment processing
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Processing payment...',
        success: 'Payment successful!',
        error: 'Payment failed',
      }
    ).then(() => {
      // Create order
      addOrder({
        items: cart,
        total,
        type: formData.type as 'delivery' | 'dine-in',
        customerDetails: {
          name: formData.name,
          phone: formData.phone,
          ...(formData.type === 'delivery' && { address: formData.address }),
        },
      });

      // Clear cart and redirect
      clearCart();
      navigate('/');
      toast.success('Order placed successfully!');
    });
  };

  if (cart.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Order Type</h2>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="delivery"
                checked={formData.type === 'delivery'}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="mr-2"
              />
              Delivery
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="dine-in"
                checked={formData.type === 'dine-in'}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="mr-2"
              />
              Dine-in
            </label>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Contact Details</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          {formData.type === 'delivery' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Delivery Address
              </label>
              <textarea
                required
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={item.id} className="py-2 flex justify-between">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between text-lg font-medium">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}