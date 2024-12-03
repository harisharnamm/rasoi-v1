import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import VendorForm from '../../components/inventory/VendorForm';
import VendorList from '../../components/inventory/VendorList';
import { Vendor } from '../../types';

export default function InventoryVendors() {
  const { vendors, addVendor, updateVendor, deleteVendor } = useStore();
  const [isAddingVendor, setIsAddingVendor] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    category: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedVendor) {
      updateVendor({ ...formData, id: selectedVendor });
      toast.success('Vendor updated successfully');
    } else {
      addVendor(formData);
      toast.success('Vendor added successfully');
    }

    setIsAddingVendor(false);
    setSelectedVendor(null);
    setFormData({
      name: '',
      contact: '',
      email: '',
      category: '',
    });
  };

  const handleEdit = (vendor: Vendor) => {
    setSelectedVendor(vendor.id);
    setFormData({
      name: vendor.name,
      contact: vendor.contact,
      email: vendor.email,
      category: vendor.category,
    });
    setIsAddingVendor(true);
  };

  const handleDelete = (vendorId: string) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      deleteVendor(vendorId);
      toast.success('Vendor deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Vendor Management</h1>
        <button
          onClick={() => setIsAddingVendor(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Vendor
        </button>
      </div>

      {isAddingVendor && (
        <VendorForm
          formData={formData}
          isEditing={!!selectedVendor}
          onSubmit={handleSubmit}
          onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
          onCancel={() => {
            setIsAddingVendor(false);
            setSelectedVendor(null);
            setFormData({
              name: '',
              contact: '',
              email: '',
              category: '',
            });
          }}
        />
      )}

      <VendorList
        vendors={vendors}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}