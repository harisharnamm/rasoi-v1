import { 
  LayoutDashboard, 
  ChefHat, 
  ClipboardList, 
  Package, 
  Building2, 
  Receipt, 
  BarChart3, 
  Users, 
  Link2, 
  UserCog,
  User,
  Sparkles
} from 'lucide-react';

export const navigationItems = [
  {
    name: 'Onboarding',
    path: '/onboarding',
    icon: Sparkles,
    hideAfterComplete: true
  },
  {
    name: 'Dashboard',
    path: '/admin',
    icon: LayoutDashboard
  },
  {
    name: 'Menu',
    path: '/admin/menu',
    icon: ChefHat
  },
  {
    name: 'Orders',
    path: '/admin/orders',
    icon: ClipboardList
  },
  {
    name: 'Inventory',
    path: '/admin/inventory',
    icon: Package
  },
  {
    name: 'Stores',
    path: '/admin/stores',
    icon: Building2
  },
  {
    name: 'Billing',
    path: '/admin/billing',
    icon: Receipt
  },
  {
    name: 'Analytics',
    path: '/admin/analytics',
    icon: BarChart3
  },
  {
    name: 'Customers',
    path: '/admin/customers',
    icon: Users
  },
  {
    name: 'Integrations',
    path: '/admin/integrations',
    icon: Link2
  },
  {
    name: 'Employees',
    path: '/admin/employees',
    icon: UserCog
  },
  {
    name: 'Account',
    path: '/admin/account',
    icon: User
  }
];