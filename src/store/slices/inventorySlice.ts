import { StateCreator } from 'zustand';
import { InventoryHistory } from '../../types';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  unit: string;
  price: number;
  vendorId: string;
  minimumStock: number;
  currentStock: number;
  trackInventory: boolean;
  brand?: string;
  foodCategory?: string;
}

interface InventoryUsage {
  id: string;
  itemId: string;
  quantity: number;
  date: Date;
  reason: 'production' | 'wastage' | 'damage' | 'other';
  notes?: string;
}

interface InventorySlice {
  inventory: InventoryItem[];
  inventoryUsage: InventoryUsage[];
  inventoryHistory: InventoryHistory[];
  
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateInventoryItem: (id: string, updates: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string) => void;
  recordInventoryUsage: (usage: Omit<InventoryUsage, 'id' | 'date'>) => void;
}

export const inventorySlice: StateCreator<InventorySlice> = (set) => ({
  inventory: [],
  inventoryUsage: [],
  inventoryHistory: [],
  
  addInventoryItem: (item) => set((state) => ({
    inventory: [...state.inventory, { ...item, id: crypto.randomUUID() }],
    inventoryHistory: [...state.inventoryHistory, {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      action: 'create',
      itemName: item.name,
      sku: item.sku,
      user: 'system',
      newValue: JSON.stringify(item)
    }]
  })),
  
  updateInventoryItem: (id, updates) => set((state) => {
    const oldItem = state.inventory.find(item => item.id === id);
    return {
      inventory: state.inventory.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
      inventoryHistory: [...state.inventoryHistory, {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        action: 'update',
        itemName: oldItem?.name || '',
        sku: oldItem?.sku || '',
        user: 'system',
        previousValue: oldItem ? JSON.stringify(oldItem) : undefined,
        newValue: JSON.stringify({ ...oldItem, ...updates })
      }]
    };
  }),
  
  deleteInventoryItem: (id) => set((state) => {
    const item = state.inventory.find(item => item.id === id);
    return {
      inventory: state.inventory.filter((item) => item.id !== id),
      inventoryHistory: [...state.inventoryHistory, {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        action: 'delete',
        itemName: item?.name || '',
        sku: item?.sku || '',
        user: 'system',
        previousValue: item ? JSON.stringify(item) : undefined
      }]
    };
  }),
  
  recordInventoryUsage: (usage) => set((state) => {
    const item = state.inventory.find(item => item.id === usage.itemId);
    if (!item) throw new Error('Item not found');
    if (item.currentStock < usage.quantity) throw new Error('Insufficient stock');
    
    const newUsage = {
      ...usage,
      id: crypto.randomUUID(),
      date: new Date()
    };
    
    return {
      inventoryUsage: [...state.inventoryUsage, newUsage],
      inventory: state.inventory.map((item) =>
        item.id === usage.itemId
          ? { ...item, currentStock: item.currentStock - usage.quantity }
          : item
      ),
      inventoryHistory: [...state.inventoryHistory, {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        action: 'stock_update',
        itemName: item.name,
        sku: item.sku,
        user: 'system',
        previousValue: item.currentStock.toString(),
        newValue: (item.currentStock - usage.quantity).toString(),
        notes: `Usage recorded: ${usage.quantity} ${item.unit} (${usage.reason})`
      }]
    };
  })
});