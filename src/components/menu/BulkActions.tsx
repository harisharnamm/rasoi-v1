import React, { useState } from 'react';
import { ArrowUpDown, Download, Upload, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface BulkActionsProps {
  onPriceUpdate: (percentage: number, platforms: string[]) => void;
  onImport: (file: File) => void;
  onExport: () => void;
}

export default function BulkActions({ onPriceUpdate, onImport, onExport }: BulkActionsProps) {
  const [showPriceUpdate, setShowPriceUpdate] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const platforms = [
    { id: 'dineIn', name: 'Dine-in' },
    { id: 'delivery', name: 'Delivery' },
    { id: 'swiggy', name: 'Swiggy' },
    { id: 'zomato', name: 'Zomato' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/json') {
        toast.error('Please upload a JSON file');
        return;
      }
      onImport(file);
    }
  };

  const handlePriceUpdate = () => {
    if (percentage === 0) {
      toast.error('Please enter a valid percentage');
      return;
    }
    if (selectedPlatforms.length === 0) {
      toast.error('Please select at least one platform');
      return;
    }
    onPriceUpdate(percentage, selectedPlatforms);
    setShowPriceUpdate(false);
    setPercentage(0);
    setSelectedPlatforms([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <button
          onClick={() => setShowPriceUpdate(true)}
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <ArrowUpDown className="h-5 w-5 mr-2" />
          Update Prices
        </button>

        <button
          onClick={onExport}
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Download className="h-5 w-5 mr-2" />
          Export Menu
        </button>

        <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
          <Upload className="h-5 w-5 mr-2" />
          Import Menu
          <input
            type="file"
            className="hidden"
            accept="application/json"
            onChange={handleFileUpload}
          />
        </label>
      </div>

      {showPriceUpdate && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Update Prices</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Percentage Change
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    value={percentage}
                    onChange={(e) => setPercentage(parseFloat(e.target.value))}
                    className="block w-full pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="0"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">%</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Platforms
                </label>
                <div className="space-y-2">
                  {platforms.map((platform) => (
                    <label key={platform.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedPlatforms.includes(platform.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPlatforms([...selectedPlatforms, platform.id]);
                          } else {
                            setSelectedPlatforms(selectedPlatforms.filter(id => id !== platform.id));
                          }
                        }}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700">{platform.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowPriceUpdate(false);
                  setPercentage(0);
                  setSelectedPlatforms([]);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePriceUpdate}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}