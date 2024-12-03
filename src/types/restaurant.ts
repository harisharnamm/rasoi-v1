export interface Table {
  id: string;
  number: string;
  capacity: number;
  status: 'vacant' | 'occupied' | 'reserved';
  shape: 'round' | 'square' | 'rectangle';
  position: { x: number; y: number };
  section: string;
  currentOrder?: Order;
  waiterId?: string;
}

export interface Order {
  id: string;
  tableId: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'completed';
  specialInstructions?: string;
  waiterId: string;
  customerCount: number;
  startTime: Date;
  completedTime?: Date;
  total: number;
  paymentStatus: 'pending' | 'paid';
  paymentMethod?: 'cash' | 'card';
}

export interface OrderItem {
  menuItemId: string;
  quantity: number;
  notes?: string;
  status: 'pending' | 'preparing' | 'ready' | 'served';
  price: number;
}

export interface Waiter {
  id: string;
  name: string;
  code: string;
  status: 'active' | 'break' | 'offline';
  assignedTables: string[];
  activeOrders: string[];
}