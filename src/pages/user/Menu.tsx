import { useStore } from '../../store/useStore';
import { Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Menu() {
  const { menuItems, addToCart, cart, updateQuantity, isAcceptingOrders } = useStore();

  const handleAddToCart = (item: any) => {
    if (!isAcceptingOrders) {
      toast.error('Sorry, we are not accepting orders at the moment');
      return;
    }
    if (!item.available) {
      toast.error('This item is currently unavailable');
      return;
    }
    addToCart(item);
    toast.success('Added to cart');
  };

  const getItemQuantity = (id: string) => {
    const cartItem = cart.find((item) => item.id === id);
    return cartItem?.quantity || 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {!isAcceptingOrders && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          We are currently not accepting orders. Please check back later.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-lg shadow-sm overflow-hidden ${
              !item.available && 'opacity-75'
            }`}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <span className="text-lg font-bold text-indigo-600">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <p className="mt-2 text-gray-600">{item.description}</p>
              
              {!item.available ? (
                <p className="mt-4 text-red-600 text-sm">Currently unavailable</p>
              ) : (
                <div className="mt-4">
                  {getItemQuantity(item.id) > 0 ? (
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, getItemQuantity(item.id) - 1)
                        }
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-medium">{getItemQuantity(item.id)}</span>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}