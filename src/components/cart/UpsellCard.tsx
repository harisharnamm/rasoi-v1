import React from 'react';
import { useStore } from '../../store/useStore';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { MenuItem } from '../../types';

export default function UpsellCard() {
  const { menuItems, addToCart } = useStore();

  // Get popular items that could be recommended
  const recommendedItems: MenuItem[] = menuItems
    .filter(item => item.available)
    .slice(0, 3);

  const handleAddToCart = (item: MenuItem) => {
    if (!item.price) {
      toast.error('Item price not available');
      return;
    }
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1
    });
    toast.success('Item added to cart');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-medium text-gray-900 mb-4">Recommended Items</h3>
      <div className="space-y-4">
        {recommendedItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-500">
                  ${typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleAddToCart(item)}
              className="p-2 text-indigo-600 hover:text-indigo-700 rounded-full hover:bg-indigo-50"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}