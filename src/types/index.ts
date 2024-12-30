export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
  ingredients: {
    itemId: string;
    quantity: number;
    unit: string;
    wastagePercentage: number;
  }[];
  category: string;
  categories: string[];
  preparationInstructions: string;
  preparationTime: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  createdAt: Date;
  lastOrderDate?: Date;
  totalOrders: number;
  lifetimeValue: number;
  averageOrderValue: number;
  segment: 'vip' | 'repeat' | 'at-risk' | 'one-time' | 'inactive';
  preferredCategories: string[];
  lastInteraction?: Date;
  tags: string[];
  notes?: string;
}

export interface Order {
  id: string;
  source: 'swiggy' | 'zomato' | 'website' | 'waiter';
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    notes?: string;
  }>;
  total?: number;
  customerName: string;
  tableNumber?: string;
  deliveryAddress?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface CustomerActivity {
  id: string;
  customerId: string;
  type: 'order' | 'support' | 'review' | 'website_visit';
  timestamp: Date;
  details: string;
  value?: number;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface InventoryHistory {
  id: string;
  timestamp: string;
  action: 'create' | 'update' | 'delete' | 'stock_update';
  itemName: string;
  sku: string;
  previousValue?: string;
  newValue?: string;
  user: string;
  notes?: string;
}