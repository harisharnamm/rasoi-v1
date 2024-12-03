import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  ClipboardList,
  History
} from 'lucide-react';

const navItems = [
  { path: '/admin/inventory', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { path: '/admin/inventory/items', icon: Package, label: 'Items' },
  { path: '/admin/inventory/vendors', icon: Users, label: 'Vendors' },
  { path: '/admin/inventory/purchases', icon: ShoppingCart, label: 'Purchase Orders' },
  { path: '/admin/inventory/usage', icon: ClipboardList, label: 'Usage Log' },
  { path: '/admin/inventory/history', icon: History, label: 'History' },
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
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path, item.exact);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  active
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content with left margin to account for fixed sidebar */}
      <div className="flex-1 ml-64">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}