import { StateCreator } from 'zustand';
import { Customer, CustomerActivity } from '../../types/customer';

interface CustomerSlice {
  customers: Customer[];
  customerActivity: CustomerActivity[];
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  recordCustomerActivity: (activity: Omit<CustomerActivity, 'id'>) => void;
}

export const customerSlice: StateCreator<CustomerSlice> = (set) => ({
  customers: [],
  customerActivity: [],
  
  addCustomer: (customer) => set((state) => ({
    customers: [...state.customers, {
      ...customer,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      totalOrders: 0,
      lifetimeValue: 0,
      averageOrderValue: 0,
      segment: 'one-time',
      preferredCategories: [],
      tags: []
    }]
  })),
  
  updateCustomer: (id, updates) => set((state) => ({
    customers: state.customers.map((customer) =>
      customer.id === id ? { ...customer, ...updates } : customer
    )
  })),
  
  deleteCustomer: (id) => set((state) => ({
    customers: state.customers.filter((customer) => customer.id !== id)
  })),
  
  recordCustomerActivity: (activity) => set((state) => ({
    customerActivity: [...state.customerActivity, {
      ...activity,
      id: crypto.randomUUID()
    }]
  }))
});