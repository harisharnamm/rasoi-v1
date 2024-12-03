import React from 'react';
import { Image, Upload, X } from 'lucide-react';

interface ImageUploadProps {
  images: {
    storefront?: string;
    interior?: string;
    logo?: string;
  };
  onChange: (images: { storefront?: string; interior?: string; logo?: string }) => void;
}

export default function ImageUpload({ images, onChange }: ImageUploadProps) {
  const handleImageChange = (type: keyof typeof images) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...images, [type]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (type: keyof typeof images) => {
    const newImages = { ...images };
    delete newImages[type];
    onChange(newImages);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Image className="h-5 w-5 text-gray-400" />
        <h2 className="text-lg font-medium">Store Images</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(['storefront', 'interior', 'logo'] as const).map((type) => (
          <div key={type} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {type}
            </label>
            
            {images[type] ? (
              <div className="relative">
                <img
                  src={images[type]}
                  alt={type}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(type)}
                  className="absolute top-2 right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-indigo-500">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Click to upload</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange(type)}
                />
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}