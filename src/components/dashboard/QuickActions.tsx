import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, ClipboardList, Users, Package, Building2, BarChart3 } from 'lucide-react';

const actions = [
  { icon: ChefHat, title: 'Menu', desc: 'Manage menu items', link: '/admin/menu' },
  { icon: ClipboardList, title: 'Orders', desc: 'Track orders', link: '/admin/orders' },
  { icon: Users, title: 'Customers', desc: 'View customer data', link: '/admin/customers' },
  { icon: Package, title: 'Inventory', desc: 'Manage stock', link: '/admin/inventory' },
  { icon: Building2, title: 'Stores', desc: 'Store management', link: '/admin/stores' },
  { icon: BarChart3, title: 'Analytics', desc: 'View insights', link: '/admin/analytics' }
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {actions.map((item, idx) => (
        <Link
          key={idx}
          to={item.link}
          className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <item.icon className="w-8 h-8 mb-2 text-indigo-600" />
          <h3 className="font-medium text-gray-900">{item.title}</h3>
          <p className="text-sm text-gray-500">{item.desc}</p>
        </Link>
      ))}
    </div>
  );
}