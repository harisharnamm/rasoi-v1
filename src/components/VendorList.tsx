import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Vendor } from '../types';

interface VendorListProps {
  vendors: Vendor[];
  onEdit: (vendor: Vendor) => void;
  onDelete: (vendorId: string) => void;
}

export default function VendorList({ vendors, onEdit, onDelete }: VendorListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vendors.map((vendor) => (
        <div key={vendor.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{vendor.name}</h3>
              <p className="text-sm text-gray-500">{vendor.category}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(vendor)}
                className="p-1 text-gray-600 hover:text-gray-900"
              >
                <Edit2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(vendor.id)}
                className="p-1 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <span>Contact:</span>
              <a
                href={`tel:${vendor.contact}`}
                className="ml-2 text-indigo-600 hover:text-indigo-700"
              >
                {vendor.contact}
              </a>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span>Email:</span>
              <a
                href={`mailto:${vendor.email}`}
                className="ml-2 text-indigo-600 hover:text-indigo-700"
              >
                {vendor.email}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}