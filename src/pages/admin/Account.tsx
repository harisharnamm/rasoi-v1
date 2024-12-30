import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Bell, 
  Key, 
  CreditCard,
  Calendar,
  CheckCircle,
  Settings
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Account() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'billing'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    role: 'Admin',
    timezone: 'UTC-5',
    language: 'English',
    twoFactorEnabled: true,
    emailNotifications: true,
    pushNotifications: true,
    plan: 'Enterprise',
    billingCycle: 'Annual',
    nextBilling: '2024-12-31'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handlePasswordChange = () => {
    toast.success('Password reset link sent to your email');
  };

  const handlePlanUpgrade = () => {
    toast.success('Redirecting to upgrade page...');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Account Settings</h1>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 px-4 py-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex-1 px-4 py-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'security'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex-1 px-4 py-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'notifications'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`flex-1 px-4 py-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'billing'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Plan & Billing
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                      <label className="block text-sm font-medium text-gray-700">Timezone</label>
                      <select
                        value={formData.timezone}
                        onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                        <User className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <h2 className="text-lg font-medium text-gray-900">{formData.name}</h2>
                        <p className="text-sm text-gray-500">{formData.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
                    >
                      Edit Profile
                    </button>
                  </div>

                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">{formData.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        Phone
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">{formData.phone}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        Role
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">{formData.role}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Timezone
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">{formData.timezone}</dd>
                    </div>
                  </dl>
                </div>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your account security preferences
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Key className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Password</p>
                      <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                    </div>
                  </div>
                  <button
                    onClick={handlePasswordChange}
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    Change Password
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">
                        {formData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }))}
                    className={`px-3 py-1 text-sm rounded-full ${
                      formData.twoFactorEnabled
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {formData.twoFactorEnabled ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Manage how you receive notifications
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-500">Get notified via email</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, emailNotifications: !prev.emailNotifications }))}
                    className={`px-3 py-1 text-sm rounded-full ${
                      formData.emailNotifications
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {formData.emailNotifications ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                      <p className="text-sm text-gray-500">Get browser notifications</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, pushNotifications: !prev.pushNotifications }))}
                    className={`px-3 py-1 text-sm rounded-full ${
                      formData.pushNotifications
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {formData.pushNotifications ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Plan & Billing</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your subscription and billing details
                </p>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-indigo-900">Current Plan</p>
                    <p className="mt-1 text-2xl font-bold text-indigo-600">{formData.plan}</p>
                    <p className="mt-1 text-sm text-indigo-700">
                      Billed {formData.billingCycle.toLowerCase()}
                    </p>
                  </div>
                  <button
                    onClick={handlePlanUpgrade}
                    className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white rounded-md border border-indigo-600 hover:bg-indigo-50"
                  >
                    Upgrade Plan
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-4 border-b">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Payment Method</p>
                      <p className="text-sm text-gray-500">Visa ending in 4242</p>
                    </div>
                  </div>
                  <button className="text-sm text-indigo-600 hover:text-indigo-700">
                    Update
                  </button>
                </div>

                <div className="flex items-center justify-between py-4 border-b">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Next Billing Date</p>
                      <p className="text-sm text-gray-500">{formData.nextBilling}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Plan Features</p>
                      <ul className="mt-1 text-sm text-gray-500 space-y-1">
                        <li>Unlimited menu items</li>
                        <li>Advanced analytics</li>
                        <li>24/7 support</li>
                        <li>Custom integrations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}