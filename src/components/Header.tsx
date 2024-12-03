import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, Receipt, BarChart3, Package, Building2, LayoutGrid, Utensils } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isManager = location.pathname.startsWith('/manager');
  const isWaiter = location.pathname.startsWith('/waiter');

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold">Cloud Kitchen</span>
          </Link>
          
          <nav className="flex space-x-6">
            {isAdmin ? (
              <>
                <Link
                  to="/admin"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/menu"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Menu
                </Link>
                <Link
                  to="/admin/orders"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Orders
                </Link>
                <Link
                  to="/admin/inventory"
                  className="text-gray-600 hover:text-gray-900 flex items-center"
                >
                  <Package className="w-4 h-4 mr-1" />
                  Inventory
                </Link>
                <Link
                  to="/admin/stores"
                  className="text-gray-600 hover:text-gray-900 flex items-center"
                >
                  <Building2 className="w-4 h-4 mr-1" />
                  Stores
                </Link>
                <Link
                  to="/admin/billing"
                  className="text-gray-600 hover:text-gray-900 flex items-center"
                >
                  <Receipt className="w-4 h-4 mr-1" />
                  Billing
                </Link>
                <Link
                  to="/admin/analytics"
                  className="text-gray-600 hover:text-gray-900 flex items-center"
                >
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Analytics
                </Link>
              </>
            ) : isManager ? (
              <>
                <Link
                  to="/manager/tables"
                  className="text-gray-600 hover:text-gray-900 flex items-center"
                >
                  <LayoutGrid className="w-4 h-4 mr-1" />
                  Tables
                </Link>
                <Link
                  to="/manager/menu"
                  className="text-gray-600 hover:text-gray-900 flex items-center"
                >
                  <ChefHat className="w-4 h-4 mr-1" />
                  Menu
                </Link>
              </>
            ) : isWaiter ? (
              <>
                <Link
                  to="/waiter"
                  className="text-gray-600 hover:text-gray-900 flex items-center"
                >
                  <Utensils className="w-4 h-4 mr-1" />
                  Orders
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="text-gray-600 hover:text-gray-900">
                  Menu
                </Link>
                <Link to="/cart" className="text-gray-600 hover:text-gray-900">
                  Cart
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}