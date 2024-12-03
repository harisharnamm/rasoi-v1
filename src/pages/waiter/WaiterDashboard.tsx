import React, { useState } from 'react';
import { useRestaurantStore } from '../../store/restaurantStore';
import { useStore } from '../../store/useStore';
import { Plus, Clock, DollarSign, Users } from 'lucide-react';
import OrderForm from '../../components/waiter/OrderForm';
import TableDetailsModal from '../../components/manager/TableDetailsModal';
import OrderCard from '../../components/waiter/OrderCard';
import TableGrid from '../../components/waiter/TableGrid';
import toast from 'react-hot-toast';

export default function WaiterDashboard() {
  const { tables } = useRestaurantStore();
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  // Simulated waiter ID - in production, this would come from auth
  const waiterId = 'waiter-1';

  const handleTableSelect = (tableId: string) => {
    const table = tables.find(t => t.id === tableId);
    if (table?.status === 'occupied') {
      // View existing order
      setSelectedTable(tableId);
    } else if (table?.status === 'vacant') {
      // Create new order
      setSelectedTable(tableId);
      setIsCreatingOrder(true);
    } else {
      toast.error('Table is currently reserved');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Waiter Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            Active
          </span>
        </div>
      </div>

      {/* Table Grid */}
      <TableGrid
        onTableSelect={handleTableSelect}
        selectedTableId={selectedTable}
      />

      {/* Order Form Modal */}
      {isCreatingOrder && selectedTable ? (
        <OrderForm
          tableId={selectedTable}
          waiterId={waiterId}
          onClose={() => {
            setIsCreatingOrder(false);
            setSelectedTable(null);
          }}
        />
      ) : selectedTable && !isCreatingOrder && (
        <TableDetailsModal
          tableId={selectedTable}
          onClose={() => setSelectedTable(null)}
        />
      )}

      {/* Active Orders */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Active Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tables
            .filter(table => table.currentOrder)
            .map(table => (
              <OrderCard
                key={table.id}
                table={table}
                onViewDetails={() => setSelectedTable(table.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}