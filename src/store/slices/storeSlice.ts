import { StateCreator } from 'zustand';
import { Store, StoreInventoryItem, StoreMenuItem, StoreSalesRecord, StorePerformanceMetrics } from '../../types/store';

interface StoreSlice {
  stores: Store[];
  storeInventory: StoreInventoryItem[];
  storeMenuItems: StoreMenuItem[];
  storeSales: StoreSalesRecord[];
  performanceMetrics: StorePerformanceMetrics[];
  
  // Store Management
  addStore: (store: Omit<Store, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateStore: (id: string, updates: Partial<Store>) => void;
  deleteStore: (id: string) => void;
  toggleStoreStatus: (id: string) => void;
  
  // Inventory Management
  addStoreInventoryItem: (item: Omit<StoreInventoryItem, 'id'>) => void;
  updateStoreInventoryItem: (id: string, updates: Partial<StoreInventoryItem>) => void;
  deleteStoreInventoryItem: (id: string) => void;
  updateStockLevel: (id: string, quantity: number) => void;
  
  // Menu Management
  addStoreMenuItem: (item: Omit<StoreMenuItem, 'id'>) => void;
  updateStoreMenuItem: (id: string, updates: Partial<StoreMenuItem>) => void;
  deleteStoreMenuItem: (id: string) => void;
  batchUpdateMenuItems: (updates: Partial<StoreMenuItem>[]) => void;
  
  // Sales Management
  recordSale: (sale: Omit<StoreSalesRecord, 'id'>) => void;
  updateSalesRecord: (id: string, updates: Partial<StoreSalesRecord>) => void;
  deleteSalesRecord: (id: string) => void;
  
  // Performance Metrics
  updatePerformanceMetrics: (storeId: string) => void;
  getStoreMetrics: (storeId: string, period: { start: Date; end: Date }) => StorePerformanceMetrics | null;
}

export const storeSlice: StateCreator<StoreSlice> = (set, get) => ({
  stores: [],
  storeInventory: [],
  storeMenuItems: [],
  storeSales: [],
  performanceMetrics: [],

  // Store Management
  addStore: (store) => set((state) => ({
    stores: [...state.stores, {
      ...store,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    }]
  })),

  updateStore: (id, updates) => set((state) => ({
    stores: state.stores.map((store) =>
      store.id === id
        ? { ...store, ...updates, updatedAt: new Date() }
        : store
    )
  })),

  deleteStore: (id) => set((state) => ({
    stores: state.stores.filter((store) => store.id !== id)
  })),

  toggleStoreStatus: (id) => set((state) => ({
    stores: state.stores.map((store) =>
      store.id === id
        ? {
            ...store,
            status: store.status === 'active' ? 'inactive' : 'active',
            updatedAt: new Date()
          }
        : store
    )
  })),

  // Inventory Management
  addStoreInventoryItem: (item) => set((state) => ({
    storeInventory: [...state.storeInventory, { ...item, id: crypto.randomUUID() }]
  })),

  updateStoreInventoryItem: (id, updates) => set((state) => ({
    storeInventory: state.storeInventory.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    )
  })),

  deleteStoreInventoryItem: (id) => set((state) => ({
    storeInventory: state.storeInventory.filter((item) => item.id !== id)
  })),

  updateStockLevel: (id, quantity) => set((state) => ({
    storeInventory: state.storeInventory.map((item) =>
      item.id === id
        ? {
            ...item,
            currentStock: item.currentStock + quantity,
            lastRestockDate: quantity > 0 ? new Date() : item.lastRestockDate
          }
        : item
    )
  })),

  // Menu Management
  addStoreMenuItem: (item) => set((state) => ({
    storeMenuItems: [...state.storeMenuItems, { ...item, id: crypto.randomUUID() }]
  })),

  updateStoreMenuItem: (id, updates) => set((state) => ({
    storeMenuItems: state.storeMenuItems.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    )
  })),

  deleteStoreMenuItem: (id) => set((state) => ({
    storeMenuItems: state.storeMenuItems.filter((item) => item.id !== id)
  })),

  batchUpdateMenuItems: (updates) => set((state) => ({
    storeMenuItems: state.storeMenuItems.map((item) => {
      const update = updates.find((u) => u.id === item.id);
      return update ? { ...item, ...update } : item;
    })
  })),

  // Sales Management
  recordSale: (sale) => {
    const id = crypto.randomUUID();
    set((state) => ({
      storeSales: [...state.storeSales, { ...sale, id }]
    }));
    
    // Update inventory levels based on sale
    sale.inventoryImpact.forEach((impact) => {
      get().updateStockLevel(impact.itemId, -impact.quantity);
    });
    
    // Update performance metrics
    get().updatePerformanceMetrics(sale.storeId);
  },

  updateSalesRecord: (id, updates) => set((state) => ({
    storeSales: state.storeSales.map((sale) =>
      sale.id === id ? { ...sale, ...updates } : sale
    )
  })),

  deleteSalesRecord: (id) => set((state) => ({
    storeSales: state.storeSales.filter((sale) => sale.id !== id)
  })),

  // Performance Metrics
  updatePerformanceMetrics: (storeId) => {
    const state = get();
    const today = new Date();
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));

    const storeSales = state.storeSales.filter(
      (sale) => sale.storeId === storeId && sale.date >= thirtyDaysAgo
    );

    const metrics: StorePerformanceMetrics = {
      id: crypto.randomUUID(),
      storeId,
      period: {
        start: thirtyDaysAgo,
        end: new Date()
      },
      sales: {
        total: storeSales.reduce((sum, sale) => sum + sale.revenue, 0),
        byCategory: {}
      },
      inventory: {
        turnoverRate: 0,
        wastagePercentage: 0,
        stockouts: 0,
        lowStockAlerts: 0
      },
      customerMetrics: {
        totalOrders: storeSales.length,
        averageOrderValue: storeSales.length
          ? storeSales.reduce((sum, sale) => sum + sale.revenue, 0) / storeSales.length
          : 0,
        peakHours: []
      }
    };

    set((state) => ({
      performanceMetrics: [
        ...state.performanceMetrics.filter((m) => m.storeId !== storeId),
        metrics
      ]
    }));
  },

  getStoreMetrics: (storeId, period) => {
    const state = get();
    return (
      state.performanceMetrics.find(
        (m) =>
          m.storeId === storeId &&
          m.period.start >= period.start &&
          m.period.end <= period.end
      ) || null
    );
  }
});