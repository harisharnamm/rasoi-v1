import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Plus, Building2 } from 'lucide-react';
import StoreDetails from './store/StoreDetails';
import StoreEdit from './store/StoreEdit';
import StoreDashboard from './store/StoreDashboard';
import StoreForm from '../../components/store/StoreForm';
import StoreList from '../../components/store/StoreList';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

export default function AdminStores() {
  const { stores, addStore } = useStore();

  const handleCreateStore = (storeData: any) => {
    try {
      addStore(storeData);
      toast.success('Store created successfully');
    } catch (error) {
      toast.error('Failed to create store');
    }
  };

  return (
    <Routes>
      <Route
        index
        element={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Store Management</h1>
              <Link
                to="new"
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Store
              </Link>
            </div>

            {stores.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No stores</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new store.</p>
                <div className="mt-6">
                  <Link
                    to="new"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Store
                  </Link>
                </div>
              </div>
            ) : (
              <StoreList stores={stores} />
            )}
          </div>
        }
      />
      <Route path=":storeId" element={<StoreDetails />} />
      <Route path=":storeId/edit" element={<StoreEdit />} />
      <Route path=":storeId/dashboard" element={<StoreDashboard />} />
      <Route path=":storeId/*" element={<StoreDetails />} />
      <Route
        path="new"
        element={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Store</h1>
            <StoreForm onSubmit={handleCreateStore} />
          </div>
        }
      />
    </Routes>
  );
}