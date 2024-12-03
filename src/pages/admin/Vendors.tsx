import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Edit2, Trash2, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Vendors() {
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
    setFormData({ name: '', contact: '', email: '', category: '' });
  };

  const handleEdit = (vendor: any) => {
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
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="tel"
                required
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
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
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                required
                value={formData.category}
                placeholder="e.g., Produce, Meat, Dairy"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {selectedVendor ? 'Update' : 'Add'} Vendor
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAddingVendor(false);
                setSelectedVendor(null);
                setFormData({ name: '', contact: '', email: '', category: '' });
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

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
                  onClick={() => handleEdit(vendor)}
                  className="p-1 text-gray-600 hover:text-gray-900"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(vendor.id)}
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
    </div>
  );
}