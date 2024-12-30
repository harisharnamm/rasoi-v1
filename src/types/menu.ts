export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
  parentId?: string;
  imageUrl?: string;
  items?: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  platformPrices: {
    dineIn?: number;
    delivery?: number;
    swiggy?: number;
    zomato?: number;
  };
  category: string;
  subcategory?: string;
  dietaryType: 'veg' | 'non-veg' | 'vegan';
  customizationOptions?: {
    id: string;
    name: string;
    options: Array<{
      name: string;
      price: number;
    }>;
  }[];
  image: string;
  isAvailable: boolean;
  preparationTime: number;
  platformCodes: {
    swiggy?: string;
    zomato?: string;
  };
  scheduledChanges?: {
    startDate: Date;
    endDate?: Date;
    changes: Partial<MenuItem>;
  }[];
  lastUpdated: Date;
  lastSynced?: {
    swiggy?: Date;
    zomato?: Date;
    website?: Date;
  };
}

export interface MenuChangeLog {
  id: string;
  timestamp: Date;
  userId: string;
  itemId: string;
  changeType: 'create' | 'update' | 'delete';
  changes: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  platforms: string[];
  status: 'pending' | 'synced' | 'failed';
  error?: string;
}

export interface SyncStatus {
  platform: string;
  lastSync: Date;
  status: 'success' | 'failed' | 'in-progress';
  error?: string;
  itemsAffected: number;
}