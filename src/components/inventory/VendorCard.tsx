import React from 'react';
import { Building2, Phone, Mail, Tag } from 'lucide-react';

interface VendorCardProps {
  name: string;
  email: string;
  phone: string;
  category: string;
  productsCount: number;
  lowStockProducts: number;
  onViewProducts: () => void;
}

export default function VendorCard({
  name,
  email,
  phone,
  category,
  productsCount,
  lowStockProducts,
  onViewProducts
}: VendorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <Building2 className="h-10 w-10 text-gray-400" />
          <div className="ml-4">
            <h3 className="font-medium text-lg">{name}</h3>
            <p className="text-sm text-gray-500">{category}</p>
          </div>
        </div>
        {lowStockProducts > 0 && (
          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
            {lowStockProducts} Low Stock Items
          </span>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm">
          <Phone className="h-4 w-4 text-gray-400 mr-2" />
          <a href={`tel:${phone}`} className="text-gray-600 hover:text-gray-900">
            {phone}
          </a>
        </div>
        <div className="flex items-center text-sm">
          <Mail className="h-4 w-4 text-gray-400 mr-2" />
          <a href={`mailto:${email}`} className="text-gray-600 hover:text-gray-900">
            {email}
          </a>
        </div>
        <div className="flex items-center text-sm">
          <Tag className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-600">{productsCount} Products</span>
        </div>
      </div>

      <button
        onClick={onViewProducts}
        className="mt-4 w-full px-4 py-2 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-lg hover:bg-indigo-100"
      >
        View Products
      </button>
    </div>
  );
}