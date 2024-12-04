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
  deliveryPreferences?: {
    address: string;
    instructions?: string;
    preferredTime?: string;
  };
  lastInteraction?: Date;
  tags: string[];
  notes?: string;
}

export interface CustomerInsight {
  id: string;
  customerId: string;
  type: 'purchase_pattern' | 'preference' | 'risk' | 'opportunity';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  createdAt: Date;
  expiresAt?: Date;
  status: 'active' | 'resolved' | 'expired';
  actionTaken?: string;
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