import { StateCreator } from 'zustand';
import { Order } from '../../types';

interface OrderSlice {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
}

export const orderSlice: StateCreator<OrderSlice> = (set) => ({
  orders: [],
  
  addOrder: (order) => set((state) => ({
    orders: [...state.orders, {
      ...order,
      id: crypto.randomUUID(),
      createdAt: new Date()
    }]
  })),
  
  updateOrderStatus: (id, status) => set((state) => ({
    orders: state.orders.map((order) =>
      order.id === id ? { ...order, status } : order
    )
  })),
  
  deleteOrder: (id) => set((state) => ({
    orders: state.orders.filter((order) => order.id !== id)
  }))
});