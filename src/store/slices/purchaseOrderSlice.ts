import { StateCreator } from 'zustand';

export interface PurchaseOrder {
  id: string;
  vendorId: string;
  items: Array<{
    itemId: string;
    quantity: number;
    pricePerUnit: number;
  }>;
  status: 'requested' | 'processing' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'processing' | 'completed';
  totalAmount: number;
  expectedDelivery?: string;
  createdAt: Date;
}

interface PurchaseOrderSlice {
  purchaseOrders: PurchaseOrder[];
  createPurchaseOrder: (order: Omit<PurchaseOrder, 'id' | 'createdAt'>) => void;
  updatePurchaseOrder: (id: string, updates: Partial<PurchaseOrder>) => void;
  deletePurchaseOrder: (id: string) => void;
}

export const purchaseOrderSlice: StateCreator<PurchaseOrderSlice> = (set) => ({
  purchaseOrders: [],
  
  createPurchaseOrder: (order) => set((state) => ({
    purchaseOrders: [...state.purchaseOrders, {
      ...order,
      id: crypto.randomUUID(),
      createdAt: new Date()
    }]
  })),
  
  updatePurchaseOrder: (id, updates) => set((state) => ({
    purchaseOrders: state.purchaseOrders.map((order) =>
      order.id === id ? { ...order, ...updates } : order
    )
  })),
  
  deletePurchaseOrder: (id) => set((state) => ({
    purchaseOrders: state.purchaseOrders.filter((order) => order.id !== id)
  }))
});