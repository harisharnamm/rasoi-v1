import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  Settings, 
  Link2,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';

const steps = [
  {
    id: 'organization',
    title: 'Organization Details',
    icon: Building2,
    estimatedTime: '5 mins',
    fields: ['name', 'type', 'address', 'phone', 'email']
  },
  {
    id: 'users',
    title: 'User Management',
    icon: Users,
    estimatedTime: '10 mins',
    fields: ['adminEmail', 'adminPassword']
  },
  {
    id: 'preferences',
    title: 'System Preferences',
    icon: Settings,
    estimatedTime: '5 mins',
    fields: ['timezone', 'currency', 'language']
  },
  {
    id: 'integrations',
    title: 'Integrations',
    icon: Link2,
    estimatedTime: '15 mins',
    fields: ['pos', 'accounting', 'delivery']
  }
];

export default function Setup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Organization Details
    name: '',
    type: '',
    address: '',
    phone: '',
    email: '',
    
    // User Management
    adminEmail: '',
    adminPassword: '',
    
    // System Preferences
    timezone: 'UTC',
    currency: 'USD',
    language: 'en',
    
    // Integrations
    pos: false,
    accounting: false,
    delivery: false
  });
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  const handleSaveProgress = () => {
    localStorage.setItem('setupProgress', JSON.stringify({ currentStep, formData, progress }));
    toast.success('Progress saved successfully');
  };

  const handleNext = () => {
    const step = steps[currentStep];
    const isStepValid = step.fields.every(field => {
      if (typeof formData[field] === 'boolean') return true;
      return formData[field]?.trim();
    });

    if (!isStepValid) {
      toast.error('Please fill in all required fields');
      return;
    }

    setProgress(prev => ({ ...prev, [step.id]: true }));
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Setup complete
      navigate('/admin');
      toast.success('Setup completed successfully!');
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case 'organization':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Organization Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Type</option>
                <option value="restaurant">Restaurant</option>
                <option value="cafe">Café</option>
                <option value="cloud_kitchen">Cloud Kitchen</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Admin Email</label>
              <input
                type="email"
                value={formData.adminEmail}
                onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Admin Password</label>
              <input
                type="password"
                value={formData.adminPassword}
                onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Timezone</label>
              <select
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="UTC">UTC</option>
                <option value="UTC-5">Eastern Time (UTC-5)</option>
                <option value="UTC-8">Pacific Time (UTC-8)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Currency</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Language</label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white rounded-lg">
                  <img src="https://example.com/pos-logo.png" alt="POS" className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Point of Sale</h4>
                  <p className="text-sm text-gray-500">Connect your POS system</p>
                </div>
              </div>
              <button
                onClick={() => setFormData(prev => ({ ...prev, pos: !prev.pos }))}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  formData.pos
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {formData.pos ? 'Connected' : 'Connect'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white rounded-lg">
                  <img src="https://example.com/accounting-logo.png" alt="Accounting" className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Accounting Software</h4>
                  <p className="text-sm text-gray-500">Sync with your accounting system</p>
                </div>
              </div>
              <button
                onClick={() => setFormData(prev => ({ ...prev, accounting: !prev.accounting }))}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  formData.accounting
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {formData.accounting ? 'Connected' : 'Connect'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white rounded-lg">
                  <img src="https://example.com/delivery-logo.png" alt="Delivery" className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Delivery Services</h4>
                  <p className="text-sm text-gray-500">Connect delivery platforms</p>
                </div>
              </div>
              <button
                onClick={() => setFormData(prev => ({ ...prev, delivery: !prev.delivery }))}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  formData.delivery
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {formData.delivery ? 'Connected' : 'Connect'}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Setup Your Account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Complete these steps to get your account ready
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10" />
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = progress[step.id];
              const isCurrent = currentStep === index;

              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center ${
                    index === steps.length - 1 ? '' : 'flex-1'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? 'bg-green-100'
                        : isCurrent
                        ? 'bg-indigo-100'
                        : 'bg-gray-100'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <Icon className={`h-6 w-6 ${
                        isCurrent ? 'text-indigo-600' : 'text-gray-400'
                      }`} />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium text-gray-900">
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center justify-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {step.estimatedTime}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="mb-6">
            <h2 className="text-xl font-medium text-gray-900">
              {steps[currentStep].title}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>

          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/admin')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Skip Setup
            </button>
            <button
              onClick={handleSaveProgress}
              className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100"
            >
              Save Progress
            </button>
          </div>
          <div className="flex space-x-4">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}