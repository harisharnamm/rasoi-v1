import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Table, Order, Waiter } from '../types/restaurant';

interface RestaurantState {
  tables: Table[];
  orders: Order[];
  waiters: Waiter[];
  
  // Table Management
  addTable: (table: Omit<Table, 'id'>) => void;
  updateTable: (id: string, updates: Partial<Table>) => void;
  deleteTable: (id: string) => void;
  updateTablePosition: (id: string, position: { x: number; y: number }) => void;
  updateTableStatus: (id: string, status: Table['status']) => void;
  
  // Order Management
  createOrder: (tableId: string, waiterId: string, customerCount: number, total: number) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  addOrderItem: (orderId: string, item: Omit<OrderItem, 'status'>) => void;
  updateOrderItem: (orderId: string, itemIndex: number, updates: Partial<OrderItem>) => void;
  removeOrderItem: (orderId: string, itemIndex: number) => void;
  completeOrder: (id: string, paymentMethod: Order['paymentMethod']) => void;
  
  // Waiter Management
  addWaiter: (waiter: Omit<Waiter, 'id'>) => void;
  updateWaiter: (id: string, updates: Partial<Waiter>) => void;
  deleteWaiter: (id: string) => void;
  assignTable: (waiterId: string, tableId: string) => void;
  unassignTable: (waiterId: string, tableId: string) => void;
}

export const useRestaurantStore = create<RestaurantState>()(persist((set, get) => ({
  tables: [],
  orders: [],
  waiters: [],

  // Table Management
  addTable: (table) => set((state) => ({
    tables: [...state.tables, { ...table, id: crypto.randomUUID() }]
  })),

  updateTable: (id, updates) => set((state) => ({
    tables: state.tables.map((table) =>
      table.id === id ? { ...table, ...updates } : table
    )
  })),

  deleteTable: (id) => set((state) => ({
    tables: state.tables.filter((table) => table.id !== id)
  })),

  updateTablePosition: (id, position) => set((state) => ({
    tables: state.tables.map((table) =>
      table.id === id ? { ...table, position } : table
    )
  })),

  updateTableStatus: (id, status) => set((state) => ({
    tables: state.tables.map((table) =>
      table.id === id ? { ...table, status } : table
    )
  })),

  // Order Management
  createOrder: (tableId, waiterId, customerCount, total) => {
    const order: Order = {
      id: crypto.randomUUID(),
      tableId,
      waiterId,
      items: [],
      status: 'pending',
      customerCount,
      startTime: new Date(),
      total,
      paymentStatus: 'pending'
    };

    set((state) => ({
      orders: [...state.orders, order],
      tables: state.tables.map((table) =>
        table.id === tableId
          ? { ...table, status: 'occupied', currentOrder: order }
          : table
      )
    }));
  },

  updateOrder: (id, updates) => set((state) => ({
    orders: state.orders.map((order) =>
      order.id === id ? { ...order, ...updates } : order
    )
  })),

  addOrderItem: (orderId, item) => set((state) => ({
    orders: state.orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            items: [...order.items, { ...item, status: 'pending' }],
            total: order.total + item.price * item.quantity
          }
        : order
    )
  })),

  updateOrderItem: (orderId, itemIndex, updates) => set((state) => ({
    orders: state.orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            items: order.items.map((item, index) =>
              index === itemIndex ? { ...item, ...updates } : item
            )
          }
        : order
    )
  })),

  removeOrderItem: (orderId, itemIndex) => set((state) => ({
    orders: state.orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            items: order.items.filter((_, index) => index !== itemIndex),
            total: order.total - (order.items[itemIndex].price * order.items[itemIndex].quantity)
          }
        : order
    )
  })),

  completeOrder: (id, paymentMethod) => {
    const order = get().orders.find((o) => o.id === id);
    if (!order) return;

    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === id
          ? {
              ...o,
              status: 'completed',
              completedTime: new Date(),
              paymentStatus: 'paid',
              paymentMethod
            }
          : o
      ),
      tables: state.tables.map((table) =>
        table.id === order.tableId
          ? { ...table, status: 'vacant', currentOrder: undefined }
          : table
      ),
      waiters: state.waiters.map((waiter) =>
        waiter.id === order.waiterId
          ? {
              ...waiter,
              activeOrders: waiter.activeOrders.filter((oId) => oId !== id)
            }
          : waiter
      )
    }));
  },

  // Waiter Management
  addWaiter: (waiter) => set((state) => ({
    waiters: [...state.waiters, { ...waiter, id: crypto.randomUUID() }]
  })),

  updateWaiter: (id, updates) => set((state) => ({
    waiters: state.waiters.map((waiter) =>
      waiter.id === id ? { ...waiter, ...updates } : waiter
    )
  })),

  deleteWaiter: (id) => set((state) => ({
    waiters: state.waiters.filter((waiter) => waiter.id !== id)
  })),

  assignTable: (waiterId, tableId) => set((state) => ({
    waiters: state.waiters.map((waiter) =>
      waiter.id === waiterId
        ? { ...waiter, assignedTables: [...waiter.assignedTables, tableId] }
        : waiter
    )
  })),

  unassignTable: (waiterId, tableId) => set((state) => ({
    waiters: state.waiters.map((waiter) =>
      waiter.id === waiterId
        ? {
            ...waiter,
            assignedTables: waiter.assignedTables.filter((id) => id !== tableId),
          }
        : waiter
    )
  })),
}), {
  name: 'restaurant-store',
}));