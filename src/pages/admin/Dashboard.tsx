import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { 
  Bot,
  ChefHat, 
  ClipboardList, 
  Users, 
  Package, 
  Building2, 
  BarChart3,
  TrendingUp,
  DollarSign,
  Clock,
  ShoppingBag,
  Sparkles,
  Zap,
  FileText,
  Settings
} from 'lucide-react';
import QuickActions from '../../components/dashboard/QuickActions';
import PilotApprovalsModal from '../../components/PilotApprovalsModal';

export default function Dashboard() {
  const { orders, menuItems, customers } = useStore();
  const [showPilotApprovals, setShowPilotApprovals] = useState(false);

  // Calculate metrics
  const todayOrders = orders?.filter(order => 
    new Date(order.createdAt).toDateString() === new Date().toDateString()
  ) || [];

  const metrics = {
    todayRevenue: todayOrders.reduce((sum, order) => sum + (order?.total || 0), 0),
    totalOrders: todayOrders.length,
    avgOrderValue: todayOrders.length ? 
      todayOrders.reduce((sum, order) => sum + (order?.total || 0), 0) / todayOrders.length : 
      0,
    activeCustomers: customers?.filter(c => 
      c.lastInteraction && 
      new Date(c.lastInteraction).toDateString() === new Date().toDateString()
    )?.length || 0
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      {/* Pilot Feature Card */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg shadow-sm p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Bot className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Pilot - Your AI-Powered Admin Assistant
              </h2>
            </div>
            <p className="mt-2 text-gray-600 max-w-3xl">
              Let Pilot handle your administrative tasks intelligently. From content generation to analytics insights, 
              Pilot streamlines your workflow and helps you make data-driven decisions.
            </p>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => setShowPilotApprovals(true)}
                className="flex items-center px-4 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
              >
                <Sparkles className="h-5 w-5 text-indigo-500 group-hover:text-indigo-600 mr-3" />
                <span className="text-gray-700 group-hover:text-gray-900">Generate Content</span>
              </button>
              
              <button
                onClick={() => setShowPilotApprovals(true)}
                className="flex items-center px-4 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
              >
                <Settings className="h-5 w-5 text-indigo-500 group-hover:text-indigo-600 mr-3" />
                <span className="text-gray-700 group-hover:text-gray-900">Optimize Settings</span>
              </button>
              
              <button
                onClick={() => setShowPilotApprovals(true)}
                className="flex items-center px-4 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
              >
                <FileText className="h-5 w-5 text-indigo-500 group-hover:text-indigo-600 mr-3" />
                <span className="text-gray-700 group-hover:text-gray-900">Review Analytics</span>
              </button>
              
              <button
                onClick={() => setShowPilotApprovals(true)}
                className="flex items-center px-4 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
              >
                <Zap className="h-5 w-5 text-indigo-500 group-hover:text-indigo-600 mr-3" />
                <span className="text-gray-700 group-hover:text-gray-900">Get Recommendations</span>
              </button>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>15 Tasks Completed Today</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span>3 Pending Approvals</span>
                </div>
              </div>
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${metrics.todayRevenue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-900">
                {metrics.totalOrders}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${metrics.avgOrderValue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Customers</p>
              <p className="text-2xl font-semibold text-gray-900">
                {metrics.activeCustomers}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h2>
        <div className="space-y-4">
          {todayOrders.slice(0, 5).map(order => (
            <div key={order.id} className="flex items-center justify-between py-4 border-b last:border-0">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-full">
                  <Clock className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Order #{order.id.slice(0, 8)}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">${(order?.total || 0).toFixed(2)}</p>
                <p className="text-sm text-gray-500">{order.items.length} items</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Items */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Popular Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(menuItems || []).slice(0, 3).map(item => (
            <div key={item.id} className="flex items-center space-x-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">
                  ${(item?.price || 0).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {showPilotApprovals && (
        <PilotApprovalsModal
          isOpen={showPilotApprovals}
          onClose={() => setShowPilotApprovals(false)}
        />
      )}
    </div>
  );
}