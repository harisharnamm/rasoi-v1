import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, MenuItem, Order, Vendor, InventoryItem, PurchaseOrder, InventoryUsage, Store } from '../types';

interface StoreState {
  isAcceptingOrders: boolean;
  menuItems: MenuItem[];
  cart: CartItem[];
  orders: Order[];
  vendors: Vendor[];
  inventory: InventoryItem[];
  purchaseOrders: PurchaseOrder[];
  inventoryUsage: InventoryUsage[];
  stores: Store[];
  
  setAcceptingOrders: (status: boolean) => void;
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (itemId: string) => void;
  toggleItemAvailability: (itemId: string) => void;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  // Store Management
  addStore: (store: Omit<Store, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateStore: (storeId: string, updates: Partial<Store>) => void;
  deleteStore: (storeId: string) => void;
  
  // Vendor Management
  addVendor: (vendor: Omit<Vendor, 'id'>) => void;
  updateVendor: (vendor: Vendor) => void;
  deleteVendor: (vendorId: string) => void;
  
  // Inventory Management
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateInventoryItem: (item: InventoryItem) => void;
  deleteInventoryItem: (itemId: string) => void;
  updateStock: (itemId: string, quantity: number) => void;
  
  // Inventory Usage Tracking
  recordInventoryUsage: (usage: Omit<InventoryUsage, 'id' | 'date'>) => void;
  deleteInventoryUsage: (usageId: string) => void;
  
  // Purchase Order Management
  createPurchaseOrder: (order: Omit<PurchaseOrder, 'id' | 'createdAt'>) => void;
  updatePurchaseOrder: (orderId: string, updates: Partial<PurchaseOrder>) => void;
  deletePurchaseOrder: (orderId: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      isAcceptingOrders: true,
      menuItems: [],
      cart: [],
      orders: [],
      vendors: [],
      inventory: [],
      purchaseOrders: [],
      inventoryUsage: [],
      stores: [], // Initialize empty stores array
      
      setAcceptingOrders: (status) => set({ isAcceptingOrders: status }),
      
      // Store Management Methods
      addStore: (store) => set((state) => ({
        stores: [...state.stores, {
          ...store,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date()
        }]
      })),

      updateStore: (storeId, updates) => set((state) => ({
        stores: state.stores.map((store) =>
          store.id === storeId
            ? { ...store, ...updates, updatedAt: new Date() }
            : store
        )
      })),

      deleteStore: (storeId) => set((state) => ({
        stores: state.stores.filter((store) => store.id !== storeId)
      })),
      
      // Existing methods...
      addMenuItem: (item) => set((state) => ({
        menuItems: [...state.menuItems, { ...item, id: crypto.randomUUID() }]
      })),
      
      updateMenuItem: (item) => set((state) => ({
        menuItems: state.menuItems.map((menuItem) => 
          menuItem.id === item.id ? item : menuItem
        )
      })),

      deleteMenuItem: (itemId) => set((state) => ({
        menuItems: state.menuItems.filter((item) => item.id !== itemId)
      })),

      toggleItemAvailability: (itemId) => set((state) => ({
        menuItems: state.menuItems.map((item) =>
          item.id === itemId ? { ...item, available: !item.available } : item
        )
      })),
      
      addToCart: (item) => set((state) => {
        const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
          return {
            cart: state.cart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            ),
          };
        }
        return { cart: [...state.cart, { ...item, quantity: 1 }] };
      }),
      
      removeFromCart: (itemId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== itemId)
      })),
      
      updateCartItemQuantity: (itemId, quantity) => set((state) => ({
        cart: quantity > 0 
          ? state.cart.map((item) =>
              item.id === itemId ? { ...item, quantity } : item
            )
          : state.cart.filter((item) => item.id !== itemId)
      })),
      
      clearCart: () => set({ cart: [] }),
      
      addOrder: (order) => set((state) => ({
        orders: [{ ...order, id: crypto.randomUUID(), status: 'pending', createdAt: new Date() }, ...state.orders]
      })),
      
      updateOrderStatus: (orderId, status) => set((state) => ({
        orders: state.orders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      })),

      // Vendor Management
      addVendor: (vendor) => set((state) => ({
        vendors: [...state.vendors, { ...vendor, id: crypto.randomUUID() }]
      })),

      updateVendor: (vendor) => set((state) => ({
        vendors: state.vendors.map((v) => v.id === vendor.id ? vendor : v)
      })),

      deleteVendor: (vendorId) => set((state) => ({
        vendors: state.vendors.filter((v) => v.id !== vendorId)
      })),

      // Inventory Management
      addInventoryItem: (item) => set((state) => ({
        inventory: [...state.inventory, { ...item, id: crypto.randomUUID() }]
      })),

      updateInventoryItem: (item) => set((state) => ({
        inventory: state.inventory.map((i) => i.id === item.id ? item : i)
      })),

      deleteInventoryItem: (itemId) => set((state) => ({
        inventory: state.inventory.filter((i) => i.id !== itemId)
      })),

      updateStock: (itemId, quantity) => set((state) => ({
        inventory: state.inventory.map((item) =>
          item.id === itemId
            ? { ...item, currentStock: item.currentStock + quantity }
            : item
        )
      })),

      // Inventory Usage Tracking
      recordInventoryUsage: (usage) => set((state) => {
        const item = state.inventory.find((i) => i.id === usage.itemId);
        if (!item || item.currentStock < usage.quantity) {
          throw new Error('Insufficient stock');
        }

        return {
          inventoryUsage: [
            ...state.inventoryUsage,
            { ...usage, id: crypto.randomUUID(), date: new Date() }
          ],
          inventory: state.inventory.map((i) =>
            i.id === usage.itemId
              ? { ...i, currentStock: i.currentStock - usage.quantity }
              : i
          )
        };
      }),

      deleteInventoryUsage: (usageId) => set((state) => ({
        inventoryUsage: state.inventoryUsage.filter((u) => u.id !== usageId)
      })),

      // Purchase Order Management
      createPurchaseOrder: (order) => set((state) => ({
        purchaseOrders: [
          ...state.purchaseOrders,
          {
            ...order,
            id: crypto.randomUUID(),
            createdAt: new Date()
          }
        ]
      })),

      updatePurchaseOrder: (orderId, updates) => set((state) => ({
        purchaseOrders: state.purchaseOrders.map((order) =>
          order.id === orderId ? { ...order, ...updates } : order
        )
      })),

      deletePurchaseOrder: (orderId) => set((state) => ({
        purchaseOrders: state.purchaseOrders.filter((order) => order.id !== orderId)
      })),
    }),
    {
      name: 'cloud-kitchen-storage',
    }
  )
);