export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  ingredients: {
    itemId: string;
    quantity: number;
    unit: string;
    wastagePercentage: number;
  }[];
  preparationInstructions: string;
  preparationTime: number;
  category: string;
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