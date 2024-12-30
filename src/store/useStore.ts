import { create as createStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order } from '../types';
import { sampleOrders } from '../data/sampleOrders';
import { menuCategorySlice } from './slices/menuCategorySlice';
import { cartSlice } from './slices/cartSlice';
import { menuItemSlice } from './slices/menuItemSlice';
import { orderSlice } from './slices/orderSlice'; 
import { purchaseOrderSlice } from './slices/purchaseOrderSlice';
import { employeeSlice } from './slices/employeeSlice';
import { vendorSlice } from './slices/vendorSlice';
import { inventorySlice } from './slices/inventorySlice';
import { customerSlice } from './slices/customerSlice';
import { storeSlice } from './slices/storeSlice';
import { warehouseSlice } from './slices/warehouseSlice';

export const useStore = createStore(
  persist(
    (set, get) => ({
      isAcceptingOrders: true,
      customers: [] as Customer[],
      setAcceptingOrders: (status: boolean) => set({ isAcceptingOrders: status }),
      
      ...menuCategorySlice(set),
      ...cartSlice(set),
      ...menuItemSlice(set),
      ...orderSlice(set),
      ...purchaseOrderSlice(set),
      ...vendorSlice(set),
      ...employeeSlice(set),
      ...inventorySlice(set),
      ...customerSlice(set),
      ...storeSlice(set, get),
      ...warehouseSlice(set, get),
    }),
    {
      name: 'cloud-kitchen-storage',
    }
  )
);