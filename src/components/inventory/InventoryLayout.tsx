import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  ClipboardList, 
  History,
  Warehouse 
} from 'lucide-react';

const topNavItems = [
  { path: '/admin/inventory', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { path: '/admin/inventory/items', icon: Package, label: 'Items' },
  { path: '/admin/inventory/vendors', icon: Users, label: 'Vendors' },
  { path: '/admin/inventory/purchases', icon: ShoppingCart, label: 'Purchase Orders' },
  { path: '/admin/inventory/usage', icon: ClipboardList, label: 'Usage Log' },
  { path: '/admin/inventory/warehouse', icon: Warehouse, label: 'Warehouse' },
  { path: '/admin/inventory/history', icon: History, label: 'History' }
];

export default function InventoryLayout() {
  const location = useLocation();

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <nav className="bg-white border-b border-gray-200 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {topNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path, item.exact);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
                    active
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}