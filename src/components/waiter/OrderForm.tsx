import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useRestaurantStore } from '../../store/restaurantStore';
import { Search, Plus, Minus, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface OrderFormProps {
  tableId: string;
  waiterId: string;
  onClose: () => void;
}

export default function OrderForm({ tableId, waiterId, onClose }: OrderFormProps) {
  const { menuItems } = useStore();
  const { createOrder, addOrderItem } = useRestaurantStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [customerCount, setCustomerCount] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Array<{
    menuItemId: string;
    quantity: number;
    notes?: string;
  }>>([]);

  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory && item.available;
  });

  const handleAddItem = (menuItem: any) => {
    const existing = selectedItems.find(item => item.menuItemId === menuItem.id);
    if (existing) {
      setSelectedItems(prev =>
        prev.map(item =>
          item.menuItemId === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setSelectedItems(prev => [...prev, {
        menuItemId: menuItem.id,
        quantity: 1,
        notes: ''
      }]);
    }
  };

  const handleUpdateQuantity = (menuItemId: string, quantity: number) => {
    if (quantity === 0) {
      setSelectedItems(prev => prev.filter(item => item.menuItemId !== menuItemId));
    } else {
      setSelectedItems(prev =>
        prev.map(item =>
          item.menuItemId === menuItemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleUpdateNotes = (menuItemId: string, notes: string) => {
    setSelectedItems(prev =>
      prev.map(item =>
        item.menuItemId === menuItemId ? { ...item, notes } : item
      )
    );
  };

  const handleSubmit = () => {
    if (selectedItems.length === 0) {
      toast.error('Please add at least one item');
      return;
    }

    const total = selectedItems.reduce((sum, item) => {
      const menuItem = menuItems.find(m => m.id === item.menuItemId);
      return sum + ((menuItem?.price || 0) * item.quantity);
    }, 0);

    try {
      // Create order with customer count and total
      createOrder(tableId, waiterId, customerCount, total);
      
      selectedItems.forEach(item => {
        const menuItem = menuItems.find(m => m.id === item.menuItemId);
        if (!menuItem) return;

        addOrderItem(tableId, {
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          notes: item.notes,
          price: menuItem.price || 0,
          status: 'pending'
        });
      });

      toast.success('Order created successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to create order');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">New Order</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Guests:</label>
              <input
                type="number"
                min="1"
                value={customerCount}
                onChange={(e) => setCustomerCount(parseInt(e.target.value))}
                className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Menu Items */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Menu Items</h3>
              <div className="grid grid-cols-1 gap-4 max-h-[50vh] overflow-y-auto">
                {filteredItems.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        ${Number(item.price || 0).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAddItem(item)}
                      className="p-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Items */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Order Items</h3>
              <div className="space-y-4 max-h-[50vh] overflow-y-auto">
                {selectedItems.map(item => {
                  const menuItem = menuItems.find(m => m.id === item.menuItemId);
                  if (!menuItem) return null;

                  return (
                    <div key={item.menuItemId} className="p-4 bg-gray-50 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{menuItem.name}</h4>
                          <p className="text-sm text-gray-500">
                            ${Number((menuItem?.price || 0) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleUpdateQuantity(item.menuItemId, item.quantity - 1)}
                            className="p-1 text-gray-400 hover:text-gray-500"
                          >
                            <Minus className="h-5 w-5" />
                          </button>
                          <span className="font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.menuItemId, item.quantity + 1)}
                            className="p-1 text-gray-400 hover:text-gray-500"
                          >
                            <Plus className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Special instructions..."
                        value={item.notes}
                        onChange={(e) => handleUpdateNotes(item.menuItemId, e.target.value)}
                        className="w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  );
                })}

                {selectedItems.length === 0 && (
                  <p className="text-center text-gray-500 py-4">
                    No items added yet
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>
                    ${selectedItems.reduce((sum, item) => {
                      const menuItem = menuItems.find(m => m.id === item.menuItemId);
                      const price = Number(menuItem?.price || 0);
                      return sum + (price * item.quantity);
                    }, 0).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}