import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Store } from '../../types/store';

interface StoreListProps {
  stores: Store[];
}

export default function StoreList({ stores }: StoreListProps) {
  const getStatusColor = (status: Store['status']) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      maintenance: 'bg-yellow-100 text-yellow-800'
    };
    return colors[status];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stores.map((store) => (
        <div
          key={store.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          {store.images.storefront ? (
            <img
              src={store.images.storefront}
              alt={store.name}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
              <Building2 className="h-12 w-12 text-gray-400" />
            </div>
          )}
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{store.name}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(store.status)}`}>
                {store.status.charAt(0).toUpperCase() + store.status.slice(1)}
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{store.location.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>{store.contactPhone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>{store.contactEmail}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>
                  {store.operatingHours.find(h => !h.isClosed)?.open} - {store.operatingHours.find(h => !h.isClosed)?.close}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <Link
                to={`/admin/stores/${store.id}/edit`}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Edit
              </Link>
              <Link
                to={`/admin/stores/${store.id}`}
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}