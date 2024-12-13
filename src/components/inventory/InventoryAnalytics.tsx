import React, { useState } from 'react';
import { Bot, TrendingUp, LineChart } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Line, LineChart as RechartsLineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StoreDiscrepancyModal from './StoreDiscrepancyModal';

export default function InventoryAnalytics() {
  const [showDiscrepancyModal, setShowDiscrepancyModal] = useState(false);
  const { inventory, inventoryUsage } = useStore();

  // Calculate metrics for the current period
  const currentPeriodUsage = inventoryUsage.reduce((sum, usage) => sum + usage.quantity, 0);
  const totalInventory = inventory.reduce((sum, item) => sum + item.currentStock, 0);
  const usageEfficiency = totalInventory ? (currentPeriodUsage / totalInventory) * 100 : 0;

  // Sample data for the graph - in production this would come from actual inventory data
  const graphData = [
    { week: 'Week 1', purchased: 100, used: 80, loss: 5 },
    { week: 'Week 2', purchased: 120, used: 90, loss: 8 },
    { week: 'Week 3', purchased: 90, used: 85, loss: 4 },
    { week: 'Week 4', purchased: 110, used: 95, loss: 6 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Agent Comment Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Bot className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-medium text-gray-900">Agent Comment</h3>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600">
            Inventory discrepancy detected: <span className="font-medium text-red-600">12% higher</span> than optimal levels.
          </p>
          <div className="mt-4">
            <span className="text-amber-600 font-medium">Price Alert:</span>
            <p className="mt-1 text-gray-600">Vendor "Fresh Foods Inc." has increased prices:</p>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <div>• Tomatoes: <span className="text-red-600">+15%</span> ($2.50/kg → $2.88/kg)</div>
              <div>• Onions: <span className="text-red-600">+8%</span> ($1.80/kg → $1.94/kg)</div>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
            <span>15% improvement from last week</span>
            <button
              onClick={() => setShowDiscrepancyModal(true)}
              className="ml-auto px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
            >
              Action
            </button>
          </div>
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-2">Recommendations:</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <div>• Reduce order quantities for high-stock items</div>
              <div>• Review storage conditions for perishables</div>
              <div>• Optimize reorder points for top sellers</div>
              <div>• Consider alternative vendors for affected items</div>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Insights Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-medium text-gray-900">Key Metrics</h3>
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Usage Efficiency</span>
              <span className={`flex items-center ${usageEfficiency >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                {usageEfficiency.toFixed(1)}%
                <TrendingUp className="h-4 w-4 ml-1" />
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${usageEfficiency >= 75 ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${Math.min(usageEfficiency, 100)}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Inventory Loss</span>
              <span className="text-red-600">-8.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Order Efficiency</span>
              <span className="text-green-600">+12.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Stock Turnover</span>
              <span className="text-green-600">+5.3%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Graph Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <LineChart className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-medium text-gray-900">4-Week Performance</h3>
        </div>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="purchased" stroke="#4F46E5" name="Purchased" />
              <Line type="monotone" dataKey="used" stroke="#10B981" name="Used" />
              <Line type="monotone" dataKey="loss" stroke="#EF4444" name="Loss" />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-gray-500 text-center">
          Order fulfillment rate: <span className="text-green-600 font-medium">+15.3%</span> vs last week
        </div>
      </div>
      
      <StoreDiscrepancyModal 
        isOpen={showDiscrepancyModal}
        onClose={() => setShowDiscrepancyModal(false)}
      />
    </div>
  );
}