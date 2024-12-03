import React from 'react';
import { Store } from '../../../types/store';
import { Building2, Mail, Phone, MapPin, Clock } from 'lucide-react';

interface StoreOverviewProps {
  store: Store;
}

export default function StoreOverview({ store }: StoreOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Store Images */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Store Images</h2>
          <div className="grid grid-cols-2 gap-4">
            {store.images.storefront && (
              <div>
                <img
                  src={store.images.storefront}
                  alt="Storefront"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="mt-2 text-sm text-gray-600">Storefront</p>
              </div>
            )}
            {store.images.interior && (
              <div>
                <img
                  src={store.images.interior}
                  alt="Interior"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="mt-2 text-sm text-gray-600">Interior</p>
              </div>
            )}
            {store.images.logo && (
              <div>
                <img
                  src={store.images.logo}
                  alt="Logo"
                  className="w-full h-48 object-contain rounded-lg bg-gray-50"
                />
                <p className="mt-2 text-sm text-gray-600">Logo</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Contact Information</h2>
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Mail className="w-5 h-5 mr-2" />
              <a href={`mailto:${store.contactEmail}`} className="hover:text-indigo-600">
                {store.contactEmail}
              </a>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="w-5 h-5 mr-2" />
              <a href={`tel:${store.contactPhone}`} className="hover:text-indigo-600">
                {store.contactPhone}
              </a>
            </div>
            <div className="flex items-start text-gray-600">
              <MapPin className="w-5 h-5 mr-2 mt-1" />
              <div>
                <p>{store.location.address}</p>
                <p>{store.location.city}, {store.location.state} {store.location.zipCode}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Coordinates: {store.location.latitude}, {store.location.longitude}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Operating Hours</h2>
          <div className="space-y-2">
            {store.operatingHours.map((hours) => (
              <div key={`${hours.day}-${hours.open}-${hours.close}`} className="flex justify-between text-gray-600">
                <span className="capitalize">{hours.day}</span>
                <span>
                  {hours.isClosed ? 'Closed' : `${hours.open} - ${hours.close}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Manager Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Store Manager</h2>
          <div className="space-y-3">
            <p className="text-gray-600">
              <span className="font-medium">Name:</span> {store.manager.name}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Role:</span>{' '}
              {store.manager.role.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Email:</span>{' '}
              <a href={`mailto:${store.manager.email}`} className="hover:text-indigo-600">
                {store.manager.email}
              </a>
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Phone:</span>{' '}
              <a href={`tel:${store.manager.phone}`} className="hover:text-indigo-600">
                {store.manager.phone}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Store Documents */}
      {store.documents.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {store.documents.map(doc => (
              <div key={doc.id} className="p-4 border rounded-lg">
                <p className="font-medium">{doc.name}</p>
                <p className="text-sm text-gray-600 capitalize">{doc.type}</p>
                {doc.expiryDate && (
                  <p className="text-sm text-gray-600">
                    Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                  </p>
                )}
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-sm text-indigo-600 hover:text-indigo-700 inline-block"
                >
                  View Document
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}