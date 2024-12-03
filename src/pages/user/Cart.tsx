import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <Link
          to="/"
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>

      <div className="bg-white rounded-lg shadow-sm">
        <ul className="divide-y divide-gray-200">
          {cart.map((item) => (
            <li key={item.id} className="p-4 flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between text-lg font-medium">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Link
          to="/checkout"
          className="mt-4 w-full block text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}