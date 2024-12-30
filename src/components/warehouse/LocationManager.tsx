import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LocationManager() {
  const { locations, addLocation, updateLocation, deleteLocation } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'shelf',
    capacity: '',
    temperature: '',
    humidity: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const locationData = {
      name: formData.name,
      type: formData.type as 'shelf' | 'bin' | 'rack' | 'zone',
      capacity: Number(formData.capacity),
      temperature: formData.temperature ? Number(formData.temperature) : undefined,
      humidity: formData.humidity ? Number(formData.humidity) : undefined,
      currentOccupancy: 0,
      items: []
    };

    try {
      if (selectedLocation) {
        updateLocation(selectedLocation, locationData);
        toast.success('Location updated successfully');
      } else {
        addLocation(locationData);
        toast.success('Location added successfully');
      }
      setIsEditing(false);
      setSelectedLocation(null);
      setFormData({
        name: '',
        type: 'shelf',
        capacity: '',
        temperature: '',
        humidity: ''
      });
    } catch (error) {
      toast.error('Failed to save location');
    }
  };

  const handleDelete = (locationId: string) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      deleteLocation(locationId);
      toast.success('Location deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Storage Locations</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Location
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-4">
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
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="shelf">Shelf</option>
                <option value="bin">Bin</option>
                <option value="rack">Rack</option>
                <option value="zone">Zone</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Capacity</label>
              <input
                type="number"
                required
                min="1"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Temperature (°C)</label>
              <input
                type="number"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Humidity (%)</label>
              <input
                type="number"
                value={formData.humidity}
                onChange={(e) => setFormData({ ...formData, humidity: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setSelectedLocation(null);
                setFormData({
                  name: '',
                  type: 'shelf',
                  capacity: '',
                  temperature: '',
                  humidity: ''
                });
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
            >
              {selectedLocation ? 'Update' : 'Create'} Location
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <div key={location.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{location.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{location.type}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedLocation(location.id);
                      setFormData({
                        name: location.name,
                        type: location.type,
                        capacity: location.capacity.toString(),
                        temperature: location.temperature?.toString() || '',
                        humidity: location.humidity?.toString() || ''
                      });
                      setIsEditing(true);
                    }}
                    className="p-1 text-gray-400 hover:text-gray-500"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(location.id)}
                    className="p-1 text-red-400 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Capacity:</span>
                  <span className="font-medium">{location.capacity} units</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Occupancy:</span>
                  <span className="font-medium">{location.currentOccupancy} units</span>
                </div>
                {location.temperature !== undefined && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Temperature:</span>
                    <span className="font-medium">{location.temperature}°C</span>
                  </div>
                )}
                {location.humidity !== undefined && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Humidity:</span>
                    <span className="font-medium">{location.humidity}%</span>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${(location.currentOccupancy / location.capacity) * 100}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        (location.currentOccupancy / location.capacity) > 0.9
                          ? 'bg-red-500'
                          : (location.currentOccupancy / location.capacity) > 0.7
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}