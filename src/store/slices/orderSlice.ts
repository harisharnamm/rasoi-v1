import { StateCreator } from 'zustand';
import { Order, CartItem } from '../../types';
import { sampleOrders } from '../../data/sampleOrders';

interface OrderSlice {
  orders: Order[];
  addOrder: (orderData: {
    items: CartItem[];
    total: number;
    type: 'delivery' | 'dine-in';
    customerDetails: {
      name: string;
      phone: string;
      address?: string;
    };
  }) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
}

export const orderSlice: StateCreator<OrderSlice> = (set) => ({
  orders: sampleOrders,
  
  addOrder: (orderData) => set((state) => {
    const newOrder: Order = {
      id: crypto.randomUUID(),
      source: 'website',
      status: 'pending',
      items: orderData.items.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price || 0
      })),
      total: orderData.total || 0,
      customerName: orderData.customerDetails.name,
      deliveryAddress: orderData.type === 'delivery' ? orderData.customerDetails.address : undefined,
      createdAt: new Date()
    };

    return {
      orders: [...state.orders, newOrder]
    };
  }),
  
  updateOrderStatus: (id, status) => set((state) => ({
    orders: state.orders.map((order) =>
      order.id === id ? { ...order, status } : order
    )
  })),
  
  deleteOrder: (id) => set((state) => ({
    orders: state.orders.filter((order) => order.id !== id)
  }))
});