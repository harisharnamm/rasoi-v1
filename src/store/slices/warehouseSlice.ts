import { StateCreator } from 'zustand';
import { WarehouseReceipt, WarehouseLocation, WarehouseMovement, StorageMetrics } from '../types/warehouse';

interface WarehouseSlice {
  receipts: WarehouseReceipt[];
  locations: WarehouseLocation[];
  movements: WarehouseMovement[];
  
  addReceipt: (receipt: Omit<WarehouseReceipt, 'id'>) => void;
  updateReceipt: (id: string, updates: Partial<WarehouseReceipt>) => void;
  deleteReceipt: (id: string) => void;
  
  addLocation: (location: Omit<WarehouseLocation, 'id'>) => void;
  updateLocation: (id: string, updates: Partial<WarehouseLocation>) => void;
  deleteLocation: (id: string) => void;
  
  moveItem: (movement: Omit<WarehouseMovement, 'id' | 'movedAt'>) => void;
  
  getStorageMetrics: () => StorageMetrics;
  getLocationUtilization: (locationId: string) => number;
  getItemLocation: (itemId: string) => WarehouseLocation | null;
}

export const warehouseSlice: StateCreator<WarehouseSlice> = (set, get) => ({
  receipts: [],
  locations: [],
  movements: [],
  
  addReceipt: (receipt) => {
    const location = get().locations.find(l => l.id === receipt.locationId);
    if (!location) throw new Error('Invalid location');
    
    const newReceipt = {
      ...receipt,
      id: crypto.randomUUID(),
      receivedAt: new Date()
    };
    
    set(state => ({
      receipts: [...state.receipts, newReceipt],
      locations: state.locations.map(loc => 
        loc.id === location.id
          ? {
              ...loc,
              currentOccupancy: loc.currentOccupancy + receipt.quantity,
              items: [
                ...loc.items,
                { itemId: receipt.itemId, quantity: receipt.quantity }
              ]
            }
          : loc
      )
    }));
  },
  
  updateReceipt: (id, updates) => set(state => ({
    receipts: state.receipts.map(receipt =>
      receipt.id === id ? { ...receipt, ...updates } : receipt
    )
  })),
  
  deleteReceipt: (id) => set(state => ({
    receipts: state.receipts.filter(receipt => receipt.id !== id)
  })),
  
  addLocation: (location) => set(state => ({
    locations: [...state.locations, { ...location, id: crypto.randomUUID() }]
  })),
  
  updateLocation: (id, updates) => set(state => ({
    locations: state.locations.map(location =>
      location.id === id ? { ...location, ...updates } : location
    )
  })),
  
  deleteLocation: (id) => set(state => ({
    locations: state.locations.filter(location => location.id !== id)
  })),
  
  moveItem: (movement) => {
    const fromLocation = get().locations.find(l => l.id === movement.fromLocation);
    const toLocation = get().locations.find(l => l.id === movement.toLocation);
    
    if (!fromLocation || !toLocation) {
      throw new Error('Invalid locations');
    }
    
    if (toLocation.currentOccupancy + movement.quantity > toLocation.capacity) {
      throw new Error('Destination location capacity exceeded');
    }
    
    const newMovement = {
      ...movement,
      id: crypto.randomUUID(),
      movedAt: new Date()
    };
    
    set(state => ({
      movements: [...state.movements, newMovement],
      locations: state.locations.map(loc => {
        if (loc.id === fromLocation.id) {
          return {
            ...loc,
            currentOccupancy: loc.currentOccupancy - movement.quantity,
            items: loc.items.map(item =>
              item.itemId === movement.itemId
                ? { ...item, quantity: item.quantity - movement.quantity }
                : item
            ).filter(item => item.quantity > 0)
          };
        }
        if (loc.id === toLocation.id) {
          const existingItem = loc.items.find(item => item.itemId === movement.itemId);
          return {
            ...loc,
            currentOccupancy: loc.currentOccupancy + movement.quantity,
            items: existingItem
              ? loc.items.map(item =>
                  item.itemId === movement.itemId
                    ? { ...item, quantity: item.quantity + movement.quantity }
                    : item
                )
              : [...loc.items, { itemId: movement.itemId, quantity: movement.quantity }]
          };
        }
        return loc;
      })
    }));
  },
  
  getStorageMetrics: () => {
    const locations = get().locations;
    const totalCapacity = locations.reduce((sum, loc) => sum + loc.capacity, 0);
    const usedCapacity = locations.reduce((sum, loc) => sum + loc.currentOccupancy, 0);
    
    return {
      totalCapacity,
      usedCapacity,
      utilizationRate: totalCapacity ? (usedCapacity / totalCapacity) * 100 : 0,
      itemsByLocation: locations.reduce((acc, loc) => ({
        ...acc,
        [loc.id]: loc.currentOccupancy
      }), {}),
      expiringItems: [] // This would be populated based on expiry dates in a real system
    };
  },
  
  getLocationUtilization: (locationId: string) => {
    const location = get().locations.find(l => l.id === locationId);
    if (!location) return 0;
    return (location.currentOccupancy / location.capacity) * 100;
  },
  
  getItemLocation: (itemId: string) => {
    return get().locations.find(location =>
      location.items.some(item => item.itemId === itemId)
    ) || null;
  }
});