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
  price: number;
  image: string;
  available: boolean;
  categories: string[]; // Array of category IDs
  ingredients?: {
    itemId: string;
    quantity: number;
    unit: string;
    wastagePercentage: number;
  }[];
  preparationInstructions?: string;
  preparationTime: number;
}

export interface CategoryStats {
  totalItems: number;
  activeItems: number;
  averagePrice: number;
}