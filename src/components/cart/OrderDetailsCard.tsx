import React, { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { Truck, Users, ShoppingBag } from 'lucide-react';

interface OrderDetailsCardProps {
  orderType: 'delivery' | 'dine-in' | 'pickup';
  onOrderTypeChange: (type: 'delivery' | 'dine-in' | 'pickup') => void;
  tip: number;
  onTipChange: (amount: number) => void;
  instructions: string;
  onInstructionsChange: (text: string) => void;
}

const tipOptions = [0, 5, 10, 15, 20];

export default function OrderDetailsCard({
  orderType,
  onOrderTypeChange,
  tip,
  onTipChange,
  instructions,
  onInstructionsChange
}: OrderDetailsCardProps) {
  const [activeTab, setActiveTab] = useState<'type' | 'tip' | 'instructions'>('type');

  const orderTypes = [
    { id: 'delivery', name: 'Delivery', icon: Truck },
    { id: 'dine-in', name: 'Dine-in', icon: Users },
    { id: 'pickup', name: 'Pickup', icon: ShoppingBag }
  ] as const;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {['type', 'tip', 'instructions'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 px-4 py-3 text-sm font-medium text-center border-b-2 ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4">
        {activeTab === 'type' && (
          <RadioGroup value={orderType} onChange={onOrderTypeChange}>
            <div className="space-y-3">
              {orderTypes.map(({ id, name, icon: Icon }) => (
                <RadioGroup.Option
                  key={id}
                  value={id}
                  className={({ checked }) =>
                    `relative flex items-center px-4 py-3 cursor-pointer rounded-lg ${
                      checked
                        ? 'bg-indigo-50 border-indigo-200'
                        : 'border border-gray-200'
                    }`
                  }
                >
                  {({ checked }) => (
                    <>
                      <Icon className={`h-5 w-5 mr-3 ${
                        checked ? 'text-indigo-600' : 'text-gray-400'
                      }`} />
                      <div className="flex-1">
                        <RadioGroup.Label
                          className={`font-medium ${
                            checked ? 'text-indigo-900' : 'text-gray-900'
                          }`}
                        >
                          {name}
                        </RadioGroup.Label>
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        )}

        {activeTab === 'tip' && (
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-2">
              {tipOptions.map((amount) => (
                <button
                  key={amount}
                  onClick={() => onTipChange(amount)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    tip === amount
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {amount}%
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-500">
              Tip amount will be calculated based on subtotal
            </div>
          </div>
        )}

        {activeTab === 'instructions' && (
          <div>
            <textarea
              value={instructions}
              onChange={(e) => onInstructionsChange(e.target.value)}
              placeholder="Add special instructions for your order..."
              rows={4}
              className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        )}
      </div>
    </div>
  );
}