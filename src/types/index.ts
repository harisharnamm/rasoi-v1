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