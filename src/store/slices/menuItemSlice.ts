import { StateCreator } from 'zustand';
import { MenuItem } from '../../types';

interface MenuItemSlice {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  toggleItemAvailability: (id: string) => void;
  assignItemToCategory: (itemId: string, categoryId: string) => void;
  removeItemFromCategory: (itemId: string, categoryId: string) => void;
}

export const menuItemSlice: StateCreator<MenuItemSlice> = (set) => ({
  menuItems: [],
  
  addMenuItem: (item) => set((state) => ({
    menuItems: [...state.menuItems, { 
      ...item, 
      id: crypto.randomUUID(),
      price: typeof item.price === 'number' ? item.price : 0,
      available: true,
      categories: item.categories || [],
      category: item.category || ''
    }]
  })),
  
  updateMenuItem: (id, updates) => set((state) => ({
    menuItems: state.menuItems.map((item) =>
      item.id === id ? {
        ...item,
        ...updates,
        price: typeof updates.price === 'number' ? updates.price : item.price,
        category: updates.category || item.category,
        categories: updates.categories || item.categories,
        available: typeof updates.available === 'boolean' ? updates.available : item.available
      } : item
    )
  })),
  
  deleteMenuItem: (id) => set((state) => ({
    menuItems: state.menuItems.filter((item) => item.id !== id)
  })),
  
  toggleItemAvailability: (id) => set((state) => ({
    menuItems: state.menuItems.map((item) =>
      item.id === id ? { ...item, available: !item.available } : item
    )
  })),

  assignItemToCategory: (itemId, categoryId) => set((state) => ({
    menuItems: state.menuItems.map((item) =>
      item.id === itemId
        ? { ...item, categories: [...(item.categories || []), categoryId] }
        : item
    )
  })),

  removeItemFromCategory: (itemId, categoryId) => set((state) => ({
    menuItems: state.menuItems.map((item) =>
      item.id === itemId
        ? { ...item, categories: (item.categories || []).filter(id => id !== categoryId) }
        : item
    )
  }))
});