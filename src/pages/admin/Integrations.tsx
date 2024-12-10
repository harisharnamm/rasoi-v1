import React, { useState } from 'react';
import { Plus, Search, ExternalLink, Settings, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Integration {
  id: string;
  name: string;
  logo: string;
  status: 'active' | 'inactive';
  integratedAt: Date;
  lastSync?: Date;
  type: 'accounting' | 'delivery' | 'payment';
}

const AVAILABLE_INTEGRATIONS = [
  {
    id: 'tally',
    name: 'Tally',
    logo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'Streamline your accounting and financial management',
    type: 'accounting'
  },
  {
    id: 'sap',
    name: 'SAP',
    logo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'Enterprise resource planning and management',
    type: 'accounting'
  },
  {
    id: 'easebuzz',
    name: 'Easebuzz',
    logo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'Secure payment gateway integration',
    type: 'payment'
  },
  {
    id: 'dunzo',
    name: 'Dunzo',
    logo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'Local delivery and logistics',
    type: 'delivery'
  },
  {
    id: 'swiggy',
    name: 'Swiggy',
    logo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'Food delivery platform integration',
    type: 'delivery'
  },
  {
    id: 'zomato',
    name: 'Zomato',
    logo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'Restaurant discovery and delivery',
    type: 'delivery'
  }
];

export default function Integrations() {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  const handleConnect = (integration: typeof AVAILABLE_INTEGRATIONS[0]) => {
    // Simulate integration connection
    const newIntegration: Integration = {
      id: integration.id,
      name: integration.name,
      logo: integration.logo,
      status: 'active',
      integratedAt: new Date(),
      lastSync: new Date(),
      type: integration.type as Integration['type']
    };

    setIntegrations(prev => [...prev, newIntegration]);
    setShowModal(false);
    toast.success(`Successfully connected to ${integration.name}`);
  };

  const handleDisconnect = (integrationId: string) => {
    if (window.confirm('Are you sure you want to disconnect this integration?')) {
      setIntegrations(prev => prev.filter(i => i.id !== integrationId));
      toast.success('Integration disconnected successfully');
    }
  };

  const filteredIntegrations = AVAILABLE_INTEGRATIONS.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || integration.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Integration
        </button>
      </div>

      {/* Active Integrations */}
      {integrations.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Active Integrations</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {integrations.map(integration => (
              <div key={integration.id} className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={integration.logo}
                    alt={integration.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{integration.name}</h3>
                    <p className="text-sm text-gray-500">
                      Connected {integration.integratedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                  <button
                    onClick={() => setSelectedIntegration(integration.id)}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <Settings className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDisconnect(integration.id)}
                    className="p-2 text-red-400 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Integration Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Add Integration</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <ExternalLink className="h-6 w-6" />
                </button>
              </div>

              <div className="mb-6 flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search integrations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="all">All Types</option>
                  <option value="accounting">Accounting</option>
                  <option value="delivery">Delivery</option>
                  <option value="payment">Payment</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                {filteredIntegrations.map(integration => (
                  <div
                    key={integration.id}
                    className="bg-white border rounded-lg p-4 hover:border-indigo-500 transition-colors cursor-pointer"
                    onClick={() => handleConnect(integration)}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={integration.logo}
                        alt={integration.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{integration.name}</h3>
                        <p className="text-sm text-gray-500">{integration.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {selectedIntegration && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Integration Settings</h2>
                <button
                  onClick={() => setSelectedIntegration(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <ExternalLink className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sync Frequency</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    <option>Every 15 minutes</option>
                    <option>Every 30 minutes</option>
                    <option>Every hour</option>
                    <option>Every 4 hours</option>
                    <option>Daily</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Webhook URL</label>
                  <input
                    type="url"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="https://"
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => setSelectedIntegration(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setSelectedIntegration(null);
                      toast.success('Settings updated successfully');
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}