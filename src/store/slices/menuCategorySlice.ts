import { StateCreator } from 'zustand';
import { MenuCategory } from '../../types/menu';

const initialCategories: MenuCategory[] = [
  {
    id: 'pizza',
    name: 'Pizza',
    description: 'Our signature pizzas',
    displayOrder: 1,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800'
  },
  {
    id: 'pasta',
    name: 'Pasta',
    description: 'Fresh pasta dishes',
    displayOrder: 2,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800'
  },
  {
    id: 'salads',
    name: 'Salads',
    description: 'Fresh and healthy salads',
    displayOrder: 3,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    description: 'Sweet treats',
    displayOrder: 4,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800'
  }
];

interface MenuCategorySlice {
  menuCategories: MenuCategory[];
  addMenuCategory: (category: Omit<MenuCategory, 'id'>) => void;
  updateMenuCategory: (id: string, updates: Partial<MenuCategory>) => void;
  deleteMenuCategory: (id: string) => void;
  toggleCategoryVisibility: (id: string) => void;
  reorderCategories: (sourceId: string, targetId: string) => void;
  assignItemToCategory: (itemId: string, categoryId: string) => void;
  removeItemFromCategory: (itemId: string, categoryId: string) => void;
}

export const menuCategorySlice: StateCreator<MenuCategorySlice> = (set) => ({
  menuCategories: initialCategories,

  addMenuCategory: (category) => set((state) => ({
    menuCategories: [...state.menuCategories, { ...category, id: crypto.randomUUID() }]
  })),

  updateMenuCategory: (id, updates) => set((state) => ({
    menuCategories: state.menuCategories.map((category) =>
      category.id === id ? { ...category, ...updates } : category
    )
  })),

  deleteMenuCategory: (id) => set((state) => ({
    menuCategories: state.menuCategories.filter((category) => category.id !== id)
  })),

  toggleCategoryVisibility: (id) => set((state) => ({
    menuCategories: state.menuCategories.map((category) =>
      category.id === id ? { ...category, isActive: !category.isActive } : category
    )
  })),

  reorderCategories: (sourceId, targetId) => set((state) => {
    const categories = [...state.menuCategories];
    const sourceIndex = categories.findIndex((c) => c.id === sourceId);
    const targetIndex = categories.findIndex((c) => c.id === targetId);
    
    const [removed] = categories.splice(sourceIndex, 1);
    categories.splice(targetIndex, 0, removed);
    
    return {
      menuCategories: categories.map((category, index) => ({
        ...category,
        displayOrder: index + 1
      }))
    };
  }),

  assignItemToCategory: (itemId, categoryId) => set((state) => ({
    menuCategories: state.menuCategories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items ? [...category.items, itemId] : [itemId]
        };
      }
      return category;
    })
  })),

  removeItemFromCategory: (itemId, categoryId) => set((state) => ({
    menuCategories: state.menuCategories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items ? category.items.filter((id) => id !== itemId) : []
        };
      }
      return category;
    })
  }))
});