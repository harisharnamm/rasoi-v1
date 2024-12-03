import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../../store/useStore';
import StoreForm from '../../../components/store/StoreForm';
import toast from 'react-hot-toast';

export default function StoreEdit() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const { stores, updateStore } = useStore();
  const store = stores.find(s => s.id === storeId);

  if (!store) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Store not found</h2>
      </div>
    );
  }

  const handleSubmit = (storeData: any) => {
    try {
      updateStore(storeId!, storeData);
      toast.success('Store updated successfully');
      navigate(`/admin/stores/${storeId}`);
    } catch (error) {
      toast.error('Failed to update store');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Store: {store.name}</h1>
      <StoreForm
        initialData={store}
        onSubmit={handleSubmit}
        isEditing={true}
      />
    </div>
  );
}