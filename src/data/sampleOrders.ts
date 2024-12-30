import { Order } from '../types';

export const sampleOrders: Order[] = [
  {
    id: 'SW123456',
    source: 'swiggy',
    status: 'pending',
    items: [
      { id: '1', name: 'Fried Papad', quantity: 1, price: 2.99 },
      { id: '2', name: 'Samosa', quantity: 1, price: 3.99 }
    ],
    total: 6.98,
    customerName: 'John Smith',
    deliveryAddress: '123 Main St, Apt 4B',
    createdAt: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
  },
  {
    id: 'ZM789012',
    source: 'zomato',
    status: 'pending',
    items: [
      { id: '3', name: 'Palak Paneer', quantity: 1, price: 12.99 },
      { id: '4', name: 'Butter Naan', quantity: 12, price: 2.99 }
    ],
    total: 48.87,
    customerName: 'Emma Wilson',
    deliveryAddress: '456 Park Ave',
    createdAt: new Date(Date.now() - 1000 * 60 * 3) // 3 minutes ago
  },
  {
    id: 'TB345678',
    source: 'talabat',
    status: 'pending',
    items: [
      { id: '5', name: 'Masala Dosa', quantity: 2, price: 8.99 },
      { id: '6', name: 'Idli-Sambar', quantity: 1, price: 6.99 }
    ],
    total: 24.97,
    customerName: 'David Lee',
    deliveryAddress: '789 Oak St',
    createdAt: new Date(Date.now() - 1000 * 60 * 8) // 8 minutes ago
  }
];