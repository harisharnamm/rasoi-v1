import React from 'react';
import { Customer } from '../../types/customer';
import { Calendar, DollarSign, ShoppingBag, Clock } from 'lucide-react';

interface CustomerDetailsProps {
  customers: Customer[];
  selectedCustomerId: string | null;
  onSelectCustomer: (id: string) => void;
}

export default function CustomerDetails({
  customers,
  selectedCustomerId,
  onSelectCustomer
}: CustomerDetailsProps) {
  const getSegmentColor = (segment: Customer['segment']) => {
    switch (segment) {
      case 'vip':
        return 'bg-purple-100 text-purple-800';
      case 'repeat':
        return 'bg-green-100 text-green-800';
      case 'at-risk':
        return 'bg-red-100 text-red-800';
      case 'one-time':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Customer Details</h2>
      </div>
      <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
        {customers.map(customer => (
          <div
            key={customer.id}
            onClick={() => onSelectCustomer(customer.id)}
            className={`p-4 hover:bg-gray-50 cursor-pointer ${
              selectedCustomerId === customer.id ? 'bg-gray-50' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{customer.name}</h3>
                <p className="text-sm text-gray-500">{customer.email}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSegmentColor(customer.segment)}`}>
                {customer.segment.replace('-', ' ').toUpperCase()}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center text-gray-500">
                <ShoppingBag className="h-4 w-4 mr-1" />
                {customer.totalOrders} orders
              </div>
              <div className="flex items-center text-gray-500">
                <DollarSign className="h-4 w-4 mr-1" />
                ${customer.lifetimeValue.toFixed(2)}
              </div>
              <div className="flex items-center text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                {customer.lastOrderDate
                  ? new Date(customer.lastOrderDate).toLocaleDateString()
                  : 'Never'}
              </div>
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                Member since {new Date(customer.createdAt).toLocaleDateString()}
              </div>
            </div>

            {customer.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {customer.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}

        {customers.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No customers found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}