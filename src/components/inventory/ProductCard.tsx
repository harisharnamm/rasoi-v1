import React from 'react';
import { Package } from 'lucide-react';

interface ProductCardProps {
  name: string;
  sku: string;
  currentStock: number;
  unit: string;
  minimumStock: number;
  vendor: string;
  onOrderClick?: () => void;
}

export default function ProductCard({
  name,
  sku,
  currentStock,
  unit,
  minimumStock,
  vendor,
  onOrderClick
}: ProductCardProps) {
  const isLowStock = currentStock <= minimumStock;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <Package className="h-5 w-5 text-gray-400 mt-1" />
          <div className="ml-3">
            <h3 className="font-medium text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">SKU: {sku}</p>
          </div>
        </div>
        {isLowStock && (
          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
            Low Stock
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Current Stock</p>
          <p className="font-medium">{currentStock} {unit}</p>
        </div>
        <div>
          <p className="text-gray-500">Minimum Stock</p>
          <p className="font-medium">{minimumStock} {unit}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500">Vendor</p>
        <p className="text-sm font-medium">{vendor}</p>
      </div>

      {isLowStock && onOrderClick && (
        <button
          onClick={onOrderClick}
          className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700"
        >
          Create Purchase Order
        </button>
      )}
    </div>
  );
}