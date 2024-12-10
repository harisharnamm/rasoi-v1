import React, { useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChefHat, 
  ClipboardList, 
  Power, 
  Activity, 
  Bell, 
  Download, 
  Upload,
  Settings,
  Users,
  TrendingUp,
  Bot
} from 'lucide-react';
import { useStore } from '../../store/useStore'; 
import PilotApprovalsModal from '../../components/PilotApprovalsModal';

export default function Dashboard() {
  const { isAcceptingOrders, setAcceptingOrders } = useStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPilotApprovals, setShowPilotApprovals] = useState(false);

  const recentActivity = [
    { id: 1, type: 'order', message: 'New order #1234 received', time: '5 minutes ago' },
    { id: 2, type: 'inventory', message: 'Low stock alert: Tomatoes', time: '10 minutes ago' },
    { id: 3, type: 'user', message: 'New user registration', time: '15 minutes ago' }
  ];

  const systemStatus = [
    { name: 'Orders', status: 'healthy', value: '98%' },
    { name: 'Inventory', status: 'warning', value: '85%' },
    { name: 'Users', status: 'healthy', value: '100%' }
  ];

  const handleExport = () => {
    // TODO: Implement export functionality
  };

  const handleImport = () => {
    // TODO: Implement import functionality
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Section */}
      <div className="flex justify-between items-center py-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-400 hover:text-gray-500"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
          </button>
          <button
            onClick={() => setShowPilotApprovals(true)}
            className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
          >
            <Bot className="w-5 h-5 mr-2" />
            Pilot Approvals
          </button>
          <button
            onClick={() => setAcceptingOrders(!isAcceptingOrders)}
            className={`flex items-center px-4 py-2 rounded-lg ${
              isAcceptingOrders
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            <Power className="w-5 h-5 mr-2" />
            {isAcceptingOrders ? 'Stop Accepting Orders' : 'Start Accepting Orders'}
          </button>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { icon: ChefHat, title: 'Menu', desc: 'Manage menu items', link: '/admin/menu' },
          { icon: ClipboardList, title: 'Orders', desc: 'Track orders', link: '/admin/orders' },
          { icon: Users, title: 'Customers', desc: 'View customer data', link: '/admin/customers' }
        ].map((item, idx) => (
          <Link
            key={idx}
            to={item.link}
            className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <item.icon className="w-8 h-8 mb-4 text-indigo-600" />
            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Activity className="h-4 w-4 text-indigo-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">System Status</h2>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {systemStatus.map((status, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{status.name}</span>
                <div className="flex items-center">
                  <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
                    status.status === 'healthy' ? 'bg-green-400' : 'bg-yellow-400'
                  }`} />
                  <span className="text-sm text-gray-900">{status.value}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              onClick={handleExport}
              className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button
              onClick={handleImport}
              className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import
            </button>
          </div>
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