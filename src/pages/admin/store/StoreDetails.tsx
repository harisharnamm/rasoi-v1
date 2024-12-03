import React from 'react';
import { useParams, Link, Routes, Route } from 'react-router-dom';
import { useStore } from '../../../store/useStore';
import { Edit, BarChart, Package } from 'lucide-react';
import StoreInventory from './StoreInventory';
import StoreOverview from './StoreOverview';

export default function StoreDetails() {
  const { storeId } = useParams();
  const { stores } = useStore();
  const store = stores.find(s => s.id === storeId);

  if (!store) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Store not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{store.name}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {store.location.city}, {store.location.state}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="inventory"
            className="flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 border border-gray-200"
          >
            <Package className="h-5 w-5 mr-2" />
            Store Inventory
          </Link>
          <Link
            to="edit"
            className="flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 border border-gray-200"
          >
            <Edit className="h-5 w-5 mr-2" />
            Edit Store
          </Link>
          <Link
            to="dashboard"
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <BarChart className="h-5 w-5 mr-2" />
            Dashboard
          </Link>
        </div>
      </div>

      <Routes>
        <Route index element={<StoreOverview store={store} />} />
        <Route path="inventory" element={<StoreInventory />} />
      </Routes>
    </div>
  );
}