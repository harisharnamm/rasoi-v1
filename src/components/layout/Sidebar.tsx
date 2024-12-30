import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navigationItems } from './navigationConfig';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-sm"
      >
        {isCollapsed ? (
          <X className="h-6 w-6 text-gray-600" />
        ) : (
          <Menu className="h-6 w-6 text-gray-600" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-40 ${
          isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'w-64'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-center border-b border-gray-200">
            <span className={`font-semibold text-gray-800 ${isCollapsed ? 'hidden lg:block' : ''}`}>
              {isCollapsed ? 'CK' : 'Cloud Kitchen'}
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  } transition-colors duration-150 ease-in-out ${
                    isCollapsed ? 'lg:justify-center' : ''
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                  <span className={isCollapsed ? 'lg:hidden' : ''}>
                    {item.name}
                  </span>
                  {isActive && (
                    <div className="absolute left-0 w-1 h-6 bg-indigo-600 rounded-r-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Collapse Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center h-12 border-t border-gray-200 text-gray-500 hover:bg-gray-50"
          >
            {isCollapsed ? (
              <Menu className="h-5 w-5" />
            ) : (
              <X className="h-5 w-5" />
            )}
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
}