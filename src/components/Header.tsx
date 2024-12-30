import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, Receipt, BarChart3, Package, Building2, LayoutGrid, Utensils, Users, Link2 } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isManager = location.pathname.startsWith('/manager');
  const isWaiter = location.pathname.startsWith('/waiter');
  const isKitchen = location.pathname.startsWith('/kitchen');
  const isOnboarding = location.pathname.startsWith('/onboarding') || location.pathname.startsWith('/setup');

  return (
    <header className={`bg-white shadow-sm fixed top-0 ${isAdmin ? 'lg:left-64' : 'left-0'} right-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold">Kitchen Copilot</span>
          </Link>
          
          <nav className="flex space-x-6">
            {isAdmin ? (
              null
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
            ) : isKitchen || isOnboarding ? (
              null
            ) : (
              <>
                <Link to="/" className="text-gray-600 hover:text-gray-900">
                  Menu
                </Link>
                <Link to="/orders" className="text-gray-600 hover:text-gray-900">
                  Orders
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