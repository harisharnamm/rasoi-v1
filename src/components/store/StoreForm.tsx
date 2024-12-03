import React, { useState } from 'react';
import { Store, OperatingHours, StoreManager } from '../../types/store';
import { validateStore } from '../../utils/storeValidation';
import { Building2, Clock, User, MapPin, Phone, Mail, Image, FileText } from 'lucide-react';
import OperatingHoursInput from './OperatingHoursInput';
import LocationInput from './LocationInput';
import ManagerInput from './ManagerInput';
import DocumentUpload from './DocumentUpload';
import ImageUpload from './ImageUpload';

interface StoreFormProps {
  onSubmit: (store: Omit<Store, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: Partial<Store>;
  isEditing?: boolean;
}

export default function StoreForm({ onSubmit, initialData, isEditing }: StoreFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    contactEmail: initialData?.contactEmail || '',
    contactPhone: initialData?.contactPhone || '',
    status: initialData?.status || 'active',
    location: initialData?.location || {
      latitude: 0,
      longitude: 0,
      address: '',
      city: '',
      state: '',
      zipCode: ''
    },
    operatingHours: initialData?.operatingHours || Array(7).fill({
      day: 'monday',
      open: '09:00',
      close: '17:00',
      isClosed: false
    }),
    manager: initialData?.manager || {
      name: '',
      email: '',
      phone: '',
      role: 'store_manager'
    },
    images: initialData?.images || {},
    documents: initialData?.documents || []
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateStore(formData);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData as Omit<Store, 'id' | 'createdAt' | 'updatedAt'>);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <ul className="list-disc list-inside text-red-600">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <div className="flex items-center space-x-2">
          <Building2 className="h-5 w-5 text-gray-400" />
          <h2 className="text-lg font-medium">Basic Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Store Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Store['status'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Email</label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
            <input
              type="tel"
              value={formData.contactPhone}
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <LocationInput
        value={formData.location}
        onChange={(location) => setFormData({ ...formData, location })}
      />

      <OperatingHoursInput
        value={formData.operatingHours}
        onChange={(hours) => setFormData({ ...formData, operatingHours: hours })}
      />

      <ManagerInput
        value={formData.manager}
        onChange={(manager) => setFormData({ ...formData, manager })}
      />

      <ImageUpload
        images={formData.images}
        onChange={(images) => setFormData({ ...formData, images })}
      />

      <DocumentUpload
        documents={formData.documents}
        onChange={(documents) => setFormData({ ...formData, documents })}
      />

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
        >
          {isEditing ? 'Update Store' : 'Create Store'}
        </button>
      </div>
    </form>
  );
}