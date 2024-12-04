import React, { useState, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Calendar,
  Search,
  Filter,
  Download,
  MessageSquare
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import CustomerDetails from '../../components/customer/CustomerDetails';
import CustomerSegments from '../../components/customer/CustomerSegments';
import CustomerInsights from '../../components/customer/CustomerInsights';
import ActivityHeatmap from '../../components/customer/ActivityHeatmap';
import { exportToCSV } from '../../utils/exportUtils';
import toast from 'react-hot-toast';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

export default function CustomerAnalytics() {
  const { customers, orders } = useStore();
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const segments = useMemo(() => {
    const total = customers.length;
    return {
      vip: customers.filter(c => c.segment === 'vip').length,
      repeat: customers.filter(c => c.segment === 'repeat').length,
      atRisk: customers.filter(c => c.segment === 'at-risk').length,
      oneTime: customers.filter(c => c.segment === 'one-time').length,
      inactive: customers.filter(c => c.segment === 'inactive').length,
      retentionRate: ((customers.filter(c => 
        c.segment === 'vip' || c.segment === 'repeat'
      ).length / total) * 100).toFixed(1)
    };
  }, [customers]);

  const handleExport = () => {
    try {
      const data = customers.map(customer => ({
        Name: customer.name,
        Email: customer.email,
        Phone: customer.phone,
        'Total Orders': customer.totalOrders,
        'Lifetime Value': `$${customer.lifetimeValue.toFixed(2)}`,
        'Average Order Value': `$${customer.averageOrderValue.toFixed(2)}`,
        Segment: customer.segment,
        'Last Order': customer.lastOrderDate?.toLocaleDateString() || 'Never',
        'Member Since': new Date(customer.createdAt).toLocaleDateString()
      }));

      exportToCSV(data, 'customer-analytics');
      toast.success('Customer data exported successfully');
    } catch (error) {
      toast.error('Failed to export customer data');
    }
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSegment = selectedSegment === 'all' || customer.segment === selectedSegment;
      
      const matchesDateRange = 
        !dateRange.start || !dateRange.end || 
        (customer.lastOrderDate && 
          customer.lastOrderDate >= new Date(dateRange.start) &&
          customer.lastOrderDate <= new Date(dateRange.end));
      
      return matchesSearch && matchesSegment && matchesDateRange;
    });
  }, [customers, searchQuery, selectedSegment, dateRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Customer Analytics</h1>
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Download className="h-5 w-5 mr-2" />
          Export Data
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-semibold text-gray-900">{customers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Retention Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{segments.retentionRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">At Risk</p>
              <p className="text-2xl font-semibold text-gray-900">{segments.atRisk}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Today</p>
              <p className="text-2xl font-semibold text-gray-900">
                {customers.filter(c => 
                  c.lastInteraction && 
                  c.lastInteraction.toDateString() === new Date().toDateString()
                ).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <select
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Segments</option>
            <option value="vip">VIP</option>
            <option value="repeat">Repeat</option>
            <option value="at-risk">At Risk</option>
            <option value="one-time">One Time</option>
            <option value="inactive">Inactive</option>
          </select>

          <div className="flex space-x-4">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer List and Details */}
        <div className="lg:col-span-2 space-y-6">
          <CustomerSegments segments={segments} />
          <CustomerDetails 
            customers={filteredCustomers}
            selectedCustomerId={selectedCustomer}
            onSelectCustomer={setSelectedCustomer}
          />
        </div>

        {/* Insights and Activity */}
        <div className="space-y-6">
          <CustomerInsights customerId={selectedCustomer} />
          <ActivityHeatmap customerId={selectedCustomer} />
        </div>
      </div>
    </div>
  );
}