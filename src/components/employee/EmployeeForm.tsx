import React, { useState } from 'react';
import { Shield, Clock } from 'lucide-react';

interface EmployeeFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function EmployeeForm({ initialData, onSubmit, onCancel }: EmployeeFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    role: initialData?.role || 'staff',
    department: initialData?.department || '',
    status: initialData?.status || 'active',
    expiryDate: initialData?.expiryDate || '',
    ipRestrictions: initialData?.ipRestrictions || '',
    workingHours: initialData?.workingHours || {
      start: '09:00',
      end: '17:00'
    },
    requireTwoFactor: initialData?.requireTwoFactor || false,
    sessionTimeout: initialData?.sessionTimeout || 30
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Account Expiry Date</label>
          <input
            type="date"
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">IP Restrictions</label>
          <input
            type="text"
            placeholder="e.g., 192.168.1.0/24"
            value={formData.ipRestrictions}
            onChange={(e) => setFormData({ ...formData, ipRestrictions: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
          <input
            type="number"
            min="5"
            max="480"
            value={formData.sessionTimeout}
            onChange={(e) => setFormData({ ...formData, sessionTimeout: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours</label>
          <div className="flex space-x-4">
            <div>
              <label className="block text-xs text-gray-500">Start Time</label>
              <input
                type="time"
                value={formData.workingHours.start}
                onChange={(e) => setFormData({
                  ...formData,
                  workingHours: { ...formData.workingHours, start: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">End Time</label>
              <input
                type="time"
                value={formData.workingHours.end}
                onChange={(e) => setFormData({
                  ...formData,
                  workingHours: { ...formData.workingHours, end: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="twoFactor"
              checked={formData.requireTwoFactor}
              onChange={(e) => setFormData({ ...formData, requireTwoFactor: e.target.checked })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="twoFactor" className="ml-2 block text-sm text-gray-900">
              Require Two-Factor Authentication
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
        >
          {initialData ? 'Update' : 'Create'} Employee
        </button>
      </div>
    </form>
  );
}