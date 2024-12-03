import { MenuItem, InventoryItem } from './index';

export interface StoreLocation {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface OperatingHours {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  open: string;
  close: string;
  isClosed: boolean;
}

export interface StoreManager {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'store_manager' | 'assistant_manager';
}

export interface StoreDocument {
  id: string;
  name: string;
  type: 'license' | 'permit' | 'certificate' | 'other';
  url: string;
  expiryDate?: Date;
}

export interface StoreInventoryItem extends InventoryItem {
  storeId: string;
  storageLocation: string;
  initialStock: number;
  currentStock: number;
  minimumStock: number;
  reorderPoint: number;
  lastRestockDate: Date;
}

export interface StoreMenuItem extends MenuItem {
  storeId: string;
  ingredients: {
    itemId: string;
    quantity: number;
    unit: string;
    wastagePercentage: number;
  }[];
  preparationInstructions: string;
}

export interface StoreSalesRecord {
  id: string;
  storeId: string;
  date: Date;
  menuItemId: string;
  quantity: number;
  revenue: number;
  inventoryImpact: {
    itemId: string;
    quantity: number;
    wastage: number;
  }[];
}

export interface Store {
  id: string;
  name: string;
  description?: string;
  location: StoreLocation;
  contactEmail: string;
  contactPhone: string;
  operatingHours: OperatingHours[];
  manager: StoreManager;
  status: 'active' | 'inactive' | 'maintenance';
  images: {
    storefront?: string;
    interior?: string;
    logo?: string;
  };
  documents: StoreDocument[];
  createdAt: Date;
  updatedAt: Date;
}

export interface StorePerformanceMetrics {
  id: string;
  storeId: string;
  period: {
    start: Date;
    end: Date;
  };
  sales: {
    total: number;
    byCategory: Record<string, number>;
  };
  inventory: {
    turnoverRate: number;
    wastagePercentage: number;
    stockouts: number;
    lowStockAlerts: number;
  };
  customerMetrics: {
    totalOrders: number;
    averageOrderValue: number;
    peakHours: string[];
  };
}