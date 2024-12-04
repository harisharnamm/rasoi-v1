import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, MenuItem, Order, Vendor, InventoryItem, PurchaseOrder, InventoryUsage, Store, Customer, CustomerInsight, CustomerActivity } from '../types';

interface StoreState {
  isAcceptingOrders: boolean;
  menuItems: MenuItem[];
  cart: CartItem[];
  orders: Order[];
  vendors: Vendor[];
  inventory: InventoryItem[];
  purchaseOrders: PurchaseOrder[];
  inventoryUsage: InventoryUsage[];
  inventoryHistory: InventoryHistory[];
  stores: Store[];
  customers: Customer[];
  customerInsights: CustomerInsight[];
  customerActivities: CustomerActivity[];
  
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
  
  // Customer Management
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (customerId: string, updates: Partial<Customer>) => void;
  deleteCustomer: (customerId: string) => void;
  addCustomerInsight: (insight: Omit<CustomerInsight, 'id' | 'createdAt'>) => void;
  updateCustomerInsight: (insightId: string, updates: Partial<CustomerInsight>) => void;
  recordCustomerActivity: (activity: Omit<CustomerActivity, 'id'>) => void;
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
      inventoryHistory: [],
      stores: [], // Initialize empty stores array
      customers: [
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah.j@email.com',
          phone: '555-0123',
          createdAt: new Date('2023-12-01'),
          lastOrderDate: new Date('2024-02-15'),
          totalOrders: 12,
          lifetimeValue: 450.75,
          averageOrderValue: 37.56,
          segment: 'vip',
          preferredCategories: ['Italian', 'Desserts'],
          lastInteraction: new Date('2024-02-15'),
          tags: ['frequent-diner', 'dessert-lover'],
          notes: 'Prefers vegetarian options'
        },
        {
          id: '2',
          name: 'Michael Chen',
          email: 'mchen@email.com',
          phone: '555-0124',
          createdAt: new Date('2023-11-15'),
          lastOrderDate: new Date('2024-02-01'),
          totalOrders: 8,
          lifetimeValue: 320.50,
          averageOrderValue: 40.06,
          segment: 'repeat',
          preferredCategories: ['Asian', 'Seafood'],
          lastInteraction: new Date('2024-02-01'),
          tags: ['seafood-lover'],
          notes: 'Allergic to peanuts'
        },
        {
          id: '3',
          name: 'Emma Wilson',
          email: 'emma.w@email.com',
          phone: '555-0125',
          createdAt: new Date('2023-10-20'),
          lastOrderDate: new Date('2024-01-05'),
          totalOrders: 3,
          lifetimeValue: 89.97,
          averageOrderValue: 29.99,
          segment: 'at-risk',
          preferredCategories: ['Mexican', 'Salads'],
          lastInteraction: new Date('2024-01-05'),
          tags: ['health-conscious'],
          notes: 'Prefers low-carb options'
        },
        {
          id: '4',
          name: 'David Brown',
          email: 'dbrown@email.com',
          phone: '555-0126',
          createdAt: new Date('2024-01-15'),
          lastOrderDate: new Date('2024-01-15'),
          totalOrders: 1,
          lifetimeValue: 45.50,
          averageOrderValue: 45.50,
          segment: 'one-time',
          preferredCategories: ['American'],
          lastInteraction: new Date('2024-01-15'),
          tags: ['new-customer'],
          notes: ''
        },
        {
          id: '5',
          name: 'Lisa Martinez',
          email: 'lmartinez@email.com',
          phone: '555-0127',
          createdAt: new Date('2023-09-01'),
          lastOrderDate: new Date('2023-11-30'),
          totalOrders: 0,
          lifetimeValue: 0,
          averageOrderValue: 0,
          segment: 'inactive',
          preferredCategories: [],
          lastInteraction: new Date('2023-11-30'),
          tags: ['inactive'],
          notes: 'Follow up needed'
        }
      ],
      customerInsights: [],
      customerActivities: [
        {
          id: '1',
          customerId: '1',
          type: 'order',
          timestamp: new Date('2024-02-15'),
          details: 'Ordered Margherita Pizza and Tiramisu',
          value: 42.50,
          sentiment: 'positive'
        },
        {
          id: '2',
          customerId: '1',
          type: 'review',
          timestamp: new Date('2024-02-16'),
          details: 'Left a 5-star review',
          sentiment: 'positive'
        },
        {
          id: '3',
          customerId: '2',
          type: 'order',
          timestamp: new Date('2024-02-01'),
          details: 'Ordered Sushi Platter',
          value: 55.00,
          sentiment: 'positive'
        },
        {
          id: '4',
          customerId: '3',
          type: 'support',
          timestamp: new Date('2024-01-05'),
          details: 'Requested refund for delayed delivery',
          sentiment: 'negative'
        },
        {
          id: '5',
          customerId: '4',
          type: 'order',
          timestamp: new Date('2024-01-15'),
          details: 'Ordered Burger Combo',
          value: 45.50,
          sentiment: 'neutral'
        }
      ],
      
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

      // Customer Management
      addCustomer: (customer) => set((state) => ({
        customers: [...state.customers, { ...customer, id: crypto.randomUUID() }]
      })),

      updateCustomer: (customerId, updates) => set((state) => ({
        customers: state.customers.map((customer) =>
          customer.id === customerId ? { ...customer, ...updates } : customer
        )
      })),

      deleteCustomer: (customerId) => set((state) => ({
        customers: state.customers.filter((customer) => customer.id !== customerId)
      })),

      addCustomerInsight: (insight) => set((state) => ({
        customerInsights: [
          ...state.customerInsights,
          { ...insight, id: crypto.randomUUID(), createdAt: new Date() }
        ]
      })),

      updateCustomerInsight: (insightId, updates) => set((state) => ({
        customerInsights: state.customerInsights.map((insight) =>
          insight.id === insightId ? { ...insight, ...updates } : insight
        )
      })),

      recordCustomerActivity: (activity) => set((state) => ({
        customerActivities: [
          ...state.customerActivities,
          { ...activity, id: crypto.randomUUID() }
        ]
      })),
    }),
    {
      name: 'cloud-kitchen-storage',
    }
  )
);