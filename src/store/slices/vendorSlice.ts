import { StateCreator } from 'zustand';
import { Vendor } from '../../types';

interface VendorSlice {
  vendors: Vendor[];
  addVendor: (vendor: Omit<Vendor, 'id'>) => void;
  updateVendor: (id: string, updates: Partial<Vendor>) => void;
  deleteVendor: (id: string) => void;
}

export const vendorSlice: StateCreator<VendorSlice> = (set) => ({
  vendors: [],
  
  addVendor: (vendor) => set((state) => ({
    vendors: [...state.vendors, { ...vendor, id: crypto.randomUUID() }]
  })),
  
  updateVendor: (id, updates) => set((state) => ({
    vendors: state.vendors.map((vendor) =>
      vendor.id === id ? { ...vendor, ...updates } : vendor
    )
  })),
  
  deleteVendor: (id) => set((state) => ({
    vendors: state.vendors.filter((vendor) => vendor.id !== id)
  }))
});