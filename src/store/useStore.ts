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
      menuItems: [
        {
          id: '1',
          name: 'Margherita Pizza',
          description: 'Classic tomato sauce, fresh mozzarella, basil',
          price: 12.99,
          image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
          available: true,
          category: 'Pizza',
          preparationTime: 20,
          ingredients: [
            { itemId: 'flour-001', quantity: 250, unit: 'g', wastagePercentage: 5 },
            { itemId: 'tomato-001', quantity: 100, unit: 'g', wastagePercentage: 10 },
            { itemId: 'cheese-001', quantity: 150, unit: 'g', wastagePercentage: 2 }
          ]
        },
        {
          id: '2',
          name: 'Pepperoni Pizza',
          description: 'Spicy pepperoni with melted cheese and tomato sauce',
          price: 14.99,
          image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800',
          available: true,
          category: 'Pizza',
          preparationTime: 20,
          ingredients: [
            { itemId: 'flour-001', quantity: 250, unit: 'g', wastagePercentage: 5 },
            { itemId: 'tomato-001', quantity: 100, unit: 'g', wastagePercentage: 10 },
            { itemId: 'cheese-001', quantity: 150, unit: 'g', wastagePercentage: 2 }
          ]
        },
        {
          id: '3',
          name: 'Chicken Alfredo Pasta',
          description: 'Creamy alfredo sauce with grilled chicken and parmesan',
          price: 16.99,
          image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800',
          available: true,
          category: 'Pasta',
          preparationTime: 25,
          ingredients: []
        },
        {
          id: '4',
          name: 'Caesar Salad',
          description: 'Crisp romaine lettuce, croutons, parmesan cheese with caesar dressing',
          price: 10.99,
          image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800',
          available: true,
          category: 'Salads',
          preparationTime: 10,
          ingredients: []
        },
        {
          id: '5',
          name: 'Chocolate Brownie',
          description: 'Warm chocolate brownie served with vanilla ice cream',
          price: 7.99,
          image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800',
          available: true,
          category: 'Desserts',
          preparationTime: 15,
          ingredients: []
        },
        {
          id: '6',
          name: 'Garlic Bread',
          description: 'Toasted bread with garlic butter and herbs',
          price: 5.99,
          image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=800',
          available: true,
          category: 'Appetizers',
          preparationTime: 10,
          ingredients: []
        },
        {
          id: '7',
          name: 'Mushroom Risotto',
          description: 'Creamy arborio rice with wild mushrooms and parmesan',
          price: 15.99,
          image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800',
          available: true,
          category: 'Mains',
          preparationTime: 30,
          ingredients: []
        },
        {
          id: '8',
          name: 'Tiramisu',
          description: 'Classic Italian dessert with coffee-soaked ladyfingers',
          price: 8.99,
          image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800',
          available: true,
          category: 'Desserts',
          preparationTime: 15,
          ingredients: []
        },
        {
          id: '9',
          name: 'Caprese Salad',
          description: 'Fresh mozzarella, tomatoes, and basil with balsamic glaze',
          price: 11.99,
          image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=800',
          available: true,
          category: 'Salads',
          preparationTime: 10,
          ingredients: []
        },
        {
          id: '10',
          name: 'Grilled Salmon',
          description: 'Fresh salmon fillet with lemon herb butter sauce',
          price: 22.99,
          image: 'https://images.unsplash.com/photo-1485704686097-ed47f7263ca4?w=800',
          available: true,
          category: 'Mains',
          preparationTime: 25,
          ingredients: []
        }
      ],
      cart: [],
      orders: [],
      vendors: [
        {
          id: 'v1',
          name: 'Fresh Farm Produce',
          contact: 'Sarah Johnson',
          email: 'sarah@freshfarm.com',
          phone: '555-0123',
          address: '123 Farm Road, Rural County',
          category: 'Produce',
          paymentTerms: 'Net 30',
          active: true
        },
        {
          id: 'v2',
          name: 'Premium Meats & Poultry',
          contact: 'Michael Chen',
          email: 'michael@premiummeats.com',
          phone: '555-0124',
          address: '456 Butcher Lane, Downtown',
          category: 'Meat',
          paymentTerms: 'Net 15',
          active: true
        },
        {
          id: 'v3',
          name: 'Valley Fresh Dairy',
          contact: 'Emma Wilson',
          email: 'emma@valleydairy.com',
          phone: '555-0125',
          address: '789 Dairy Road, Riverside',
          category: 'Dairy',
          paymentTerms: 'Net 30',
          active: true
        },
        {
          id: 'v4',
          name: 'Global Spice Traders',
          contact: 'Raj Patel',
          email: 'raj@globalspices.com',
          phone: '555-0126',
          address: '321 Spice Street, Market District',
          category: 'Spices',
          paymentTerms: 'Net 45',
          active: true
        },
        {
          id: 'v5',
          name: 'Eco Packaging Solutions',
          contact: 'Lisa Brown',
          email: 'lisa@ecopack.com',
          phone: '555-0127',
          address: '654 Box Avenue, Industrial Park',
          category: 'Packaging',
          paymentTerms: 'Net 30',
          active: false
        }
      ],
      inventory: [
        {
          id: 'flour-001',
          name: 'All-Purpose Flour',
          sku: 'FL-001',
          category: 'Dry Goods',
          unit: 'kg',
          price: 2.50,
          vendorId: 'v1',
          minimumStock: 50,
          currentStock: 75,
          brand: 'Golden Mills',
          foodCategory: 'grains'
        },
        {
          id: 'tomato-001',
          name: 'Fresh Tomatoes',
          sku: 'TM-001',
          category: 'Produce',
          unit: 'kg',
          price: 3.99,
          vendorId: 'v1',
          minimumStock: 20,
          currentStock: 15,
          brand: 'Farm Fresh',
          foodCategory: 'produce'
        },
        {
          id: 'cheese-001',
          name: 'Mozzarella Cheese',
          sku: 'CH-001',
          category: 'Dairy',
          unit: 'kg',
          price: 12.99,
          vendorId: 'v3',
          minimumStock: 25,
          currentStock: 30,
          brand: 'Dairy Best',
          foodCategory: 'dairy'
        },
        {
          id: 'chicken-001',
          name: 'Chicken Breast',
          sku: 'MT-001',
          category: 'Meat',
          unit: 'kg',
          price: 8.99,
          vendorId: 'v2',
          minimumStock: 30,
          currentStock: 25,
          brand: 'Premium Poultry',
          foodCategory: 'meat'
        },
        {
          id: 'basil-001',
          name: 'Fresh Basil',
          sku: 'HB-001',
          category: 'Herbs',
          unit: 'kg',
          price: 15.99,
          vendorId: 'v1',
          minimumStock: 5,
          currentStock: 3,
          brand: 'Fresh Herbs Co',
          foodCategory: 'produce'
        },
        {
          id: 'olive-oil-001',
          name: 'Extra Virgin Olive Oil',
          sku: 'OL-001',
          category: 'Oils',
          unit: 'liters',
          price: 18.99,
          vendorId: 'v4',
          minimumStock: 15,
          currentStock: 20,
          brand: 'Mediterranean Gold',
          foodCategory: 'oils'
        },
        {
          id: 'pepper-001',
          name: 'Black Peppercorns',
          sku: 'SP-001',
          category: 'Spices',
          unit: 'kg',
          price: 25.99,
          vendorId: 'v4',
          minimumStock: 5,
          currentStock: 8,
          brand: 'Global Spices',
          foodCategory: 'spices'
        },
        {
          id: 'milk-001',
          name: 'Whole Milk',
          sku: 'DY-001',
          category: 'Dairy',
          unit: 'liters',
          price: 3.99,
          vendorId: 'v3',
          minimumStock: 40,
          currentStock: 35,
          brand: 'Valley Fresh',
          foodCategory: 'dairy'
        },
        {
          id: 'garlic-001',
          name: 'Fresh Garlic',
          sku: 'PR-001',
          category: 'Produce',
          unit: 'kg',
          price: 6.99,
          vendorId: 'v1',
          minimumStock: 10,
          currentStock: 12,
          brand: 'Farm Fresh',
          foodCategory: 'produce'
        },
        {
          id: 'beef-001',
          name: 'Ground Beef',
          sku: 'MT-002',
          category: 'Meat',
          unit: 'kg',
          price: 11.99,
          vendorId: 'v2',
          minimumStock: 25,
          currentStock: 18,
          brand: 'Premium Meats',
          foodCategory: 'meat'
        }
      ],
      stores: [
        {
          id: 's1',
          name: 'Downtown Kitchen',
          description: 'Our flagship location in the heart of downtown',
          location: {
            latitude: 40.7128,
            longitude: -74.0060,
            address: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zipCode: '10001'
          },
          contactEmail: 'downtown@kitchen.com',
          contactPhone: '555-0001',
          operatingHours: [
            { day: 'monday', open: '09:00', close: '22:00', isClosed: false },
            { day: 'tuesday', open: '09:00', close: '22:00', isClosed: false },
            { day: 'wednesday', open: '09:00', close: '22:00', isClosed: false },
            { day: 'thursday', open: '09:00', close: '22:00', isClosed: false },
            { day: 'friday', open: '09:00', close: '23:00', isClosed: false },
            { day: 'saturday', open: '10:00', close: '23:00', isClosed: false },
            { day: 'sunday', open: '10:00', close: '21:00', isClosed: false }
          ],
          manager: {
            name: 'James Wilson',
            email: 'james@kitchen.com',
            phone: '555-0002',
            role: 'store_manager'
          },
          status: 'active',
          images: {
            storefront: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
            interior: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800',
            logo: 'https://images.unsplash.com/photo-1581873372796-635b67ca2008?w=800'
          },
          documents: [],
          createdAt: new Date('2023-01-01'),
          updatedAt: new Date('2024-01-01')
        }
      ],
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