import { create as createStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { MenuCategory } from '../types/menu';
import { menuCategorySlice } from './slices/menuCategorySlice';
import { cartSlice } from './slices/cartSlice';
import { menuItemSlice } from './slices/menuItemSlice';
import { orderSlice } from './slices/orderSlice'; 
import { purchaseOrderSlice } from './slices/purchaseOrderSlice';
import { vendorSlice } from './slices/vendorSlice';
import { inventorySlice } from './slices/inventorySlice';
import { customerSlice } from './slices/customerSlice';
import { storeSlice } from './slices/storeSlice';

export const useStore = createStore(
  persist(
    (set, get) => ({
      isAcceptingOrders: true,
      setAcceptingOrders: (status: boolean) => set({ isAcceptingOrders: status }),
      
      ...menuCategorySlice(set),
      ...cartSlice(set),
      ...menuItemSlice(set),
      ...orderSlice(set),
      ...purchaseOrderSlice(set),
      ...vendorSlice(set),
      ...inventorySlice(set),
      ...customerSlice(set),
      ...storeSlice(set, get),
    }),
    {
      name: 'cloud-kitchen-storage',
    }
  )
);