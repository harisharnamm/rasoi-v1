import React from 'react';
import { useRestaurantStore } from '../../store/restaurantStore';
import { Users, DollarSign } from 'lucide-react';

interface TableGridProps {
  onTableSelect: (tableId: string) => void;
  selectedTableId: string | null;
}

export default function TableGrid({ onTableSelect, selectedTableId }: TableGridProps) {
  const { tables } = useRestaurantStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vacant':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'occupied':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {tables.map(table => (
        <button
          key={table.id}
          onClick={() => onTableSelect(table.id)}
          className={`${
            getStatusColor(table.status)
          } ${
            selectedTableId === table.id ? 'ring-2 ring-indigo-500' : ''
          } p-4 rounded-lg text-center transition-colors`}
        >
          <h3 className="font-medium">Table {table.number}</h3>
          <div className="flex items-center justify-center mt-2">
            <Users className="h-4 w-4 mr-1" />
            <span>{table.capacity}</span>
          </div>
          {table.currentOrder && (
            <div className="flex items-center justify-center mt-2">
              <DollarSign className="h-4 w-4 mr-1" />
              <span>{table.currentOrder.total.toFixed(2)}</span>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}