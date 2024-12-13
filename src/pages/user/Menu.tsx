import { useStore } from '../../store/useStore';
import { Plus, Minus } from 'lucide-react';
import CategorySection from '../../components/menu/user/CategorySection';
import { groupItemsByCategory } from '../../utils/menuUtils';
import toast from 'react-hot-toast';

export default function Menu() {
  const { menuItems, menuCategories, addToCart, cart, updateQuantity, isAcceptingOrders } = useStore();

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

  // Group items by category
  const itemsByCategory = groupItemsByCategory(menuItems, menuCategories);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {!isAcceptingOrders && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
          We are currently not accepting orders. Please check back later.
        </div>
      )}

      <div className="space-y-6">
        {menuCategories
          .filter(category => category.isActive)
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map(category => (
            <CategorySection
              key={category.id}
              category={category}
              items={itemsByCategory[category.id] || []}
            />
          ))}

        {/* Uncategorized items */}
        {itemsByCategory.uncategorized?.length > 0 && (
          <CategorySection
            category={{
              id: 'uncategorized',
              name: 'Other Items',
              description: 'More delicious options',
              displayOrder: 999,
              isActive: true
            }}
            items={itemsByCategory.uncategorized}
          />
        )}
      </div>

      {/* Cart Preview */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg md:rounded-lg shadow-lg p-4 w-full">
          <h3 className="font-medium text-gray-900">Cart ({cart.length} items)</h3>
          <div className="mt-2 space-y-2">
            {cart.slice(0, 3).map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{item.name}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            {cart.length > 3 && (
              <p className="text-sm text-gray-500">
                and {cart.length - 3} more items...
              </p>
            )}
          </div>
          <button
            onClick={() => window.location.href = '/cart'}
            className="mt-4 w-full px-4 py-3 md:py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
}