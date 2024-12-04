import React from 'react';
import { useStore } from '../../store/useStore';
import { Lightbulb, TrendingUp, AlertTriangle, Bot } from 'lucide-react';

interface CustomerInsightsProps {
  customerId: string | null;
}

export default function CustomerInsights({ customerId }: CustomerInsightsProps) {
  const { customers, orders } = useStore();
  const customer = customers.find(c => c.id === customerId);

  if (!customer) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Bot className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-medium text-gray-900">Agent Insights 🤖</h2>
        </div>
        <p className="text-gray-500 text-center">Select a customer to view insights</p>
      </div>
    );
  }

  const customerOrders = orders.filter(o => o.customerId === customerId);
  const recentOrders = customerOrders.slice(-3);

  const insights = [
    {
      type: 'pattern',
      title: 'Purchase Pattern',
      description: `Orders ${customer.totalOrders} items every ${
        customer.totalOrders > 0
          ? Math.round(
              (new Date().getTime() - new Date(customer.createdAt).getTime()) /
                (customer.totalOrders * 24 * 60 * 60 * 1000)
            )
          : 0
      } days on average`,
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      type: 'preference',
      title: 'Category Preferences',
      description: customer.preferredCategories.join(', '),
      icon: Lightbulb,
      color: 'text-yellow-600'
    }
  ];

  if (customer.segment === 'at-risk') {
    insights.push({
      type: 'risk',
      title: 'Churn Risk',
      description: 'No orders in the last 15 days',
      icon: AlertTriangle,
      color: 'text-red-600'
    });
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Bot className="h-5 w-5 text-indigo-600" />
        <h2 className="text-lg font-medium text-gray-900">Agent Insights 🤖</h2>
      </div>
      
      <div className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div key={index} className="flex items-start space-x-3">
              <div className={`mt-1 ${insight.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">{insight.title}</h3>
                <p className="text-sm text-gray-500">{insight.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Orders</h3>
        <div className="space-y-3">
          {recentOrders.map((order, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
              <span className="font-medium">${order.total.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Agent Notes</h3>
        <textarea
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
          placeholder="Add notes about this customer..."
          defaultValue={customer.notes}
        />
      </div>
    </div>
  );
}