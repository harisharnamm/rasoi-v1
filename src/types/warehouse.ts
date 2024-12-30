export interface WarehouseReceipt {
  id: string;
  itemId: string;
  quantity: number;
  receivedAt: Date;
  source: 'manual' | 'purchase_order' | 'transfer';
  locationId: string;
  condition: 'good' | 'damaged' | 'expired';
  receivedBy: string;
  notes?: string;
  batchNumber?: string;
  barcode?: string;
}

export interface WarehouseLocation {
  id: string;
  name: string;
  type: 'shelf' | 'bin' | 'rack' | 'zone';
  capacity: number;
  currentOccupancy: number;
  temperature?: number;
  humidity?: number;
  items: Array<{
    itemId: string;
    quantity: number;
  }>;
}

export interface WarehouseMovement {
  id: string;
  itemId: string;
  quantity: number;
  fromLocation: string;
  toLocation: string;
  movedAt: Date;
  movedBy: string;
  reason: string;
}

export interface StorageMetrics {
  totalCapacity: number;
  usedCapacity: number;
  utilizationRate: number;
  itemsByLocation: Record<string, number>;
  expiringItems: Array<{
    itemId: string;
    quantity: number;
    expiryDate: Date;
  }>;
}