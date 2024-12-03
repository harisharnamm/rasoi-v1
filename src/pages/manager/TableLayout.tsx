import React, { useState } from 'react';
import { useRestaurantStore } from '../../store/restaurantStore';
import { Plus, Grid, Users, DollarSign, X } from 'lucide-react';
import { Table } from '../../types/restaurant';
import TableDetailsModal from '../../components/manager/TableDetailsModal';
import toast from 'react-hot-toast';

export default function TableLayout() {
  const { tables, addTable, updateTablePosition, updateTableStatus } = useRestaurantStore();
  const [isAddingTable, setIsAddingTable] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState('all');
  const [newTable, setNewTable] = useState<Partial<Table>>({
    number: '',
    capacity: 4,
    shape: 'square',
    section: 'main',
    status: 'vacant',
    position: { x: 0, y: 0 }
  });

  const sections = ['all', ...new Set(tables.map(table => table.section))];

  const handleAddTable = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (tables.some(t => t.number === newTable.number)) {
      toast.error('Table number already exists');
      return;
    }

    const offset = tables.length * 50;
    const position = {
      x: 100 + (offset % 400),
      y: 100 + Math.floor(offset / 400) * 150
    };

    const tableData = {
      ...newTable,
      position,
      currentOrder: undefined,
      waiterId: undefined
    } as Omit<Table, 'id'>;

    addTable(tableData);
    toast.success('Table added successfully');
    setIsAddingTable(false);
    setNewTable({
      number: '',
      capacity: 4,
      shape: 'square',
      section: 'main',
      status: 'vacant',
      position: { x: 0, y: 0 }
    });
  };

  const handleDragStart = (e: React.DragEvent, tableId: string) => {
    e.dataTransfer.setData('tableId', tableId);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const tableId = e.dataTransfer.getData('tableId');
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    
    // Ensure table stays within bounds
    let x = Math.max(0, Math.min(e.clientX - rect.left, rect.width - 128)); // 128px is table width
    let y = Math.max(0, Math.min(e.clientY - rect.top, rect.height - 128));
    
    updateTablePosition(tableId, { x, y });
  };

  const getStatusColor = (status: Table['status']) => {
    switch (status) {
      case 'vacant':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-red-100 text-red-800';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Table Layout</h1>
        <div className="flex items-center space-x-4">
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {sections.map(section => (
              <option key={section} value={section}>
                {section === 'all' ? 'All Sections' : `Section: ${section}`}
              </option>
            ))}
          </select>
          <button
            onClick={() => setIsAddingTable(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Table
          </button>
        </div>
      </div>

      {isAddingTable && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Add New Table</h2>
              <button
                onClick={() => setIsAddingTable(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddTable} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Table Number</label>
                <input
                  type="text"
                  required
                  value={newTable.number}
                  onChange={(e) => setNewTable({ ...newTable, number: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Capacity</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={newTable.capacity}
                  onChange={(e) => setNewTable({ ...newTable, capacity: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Shape</label>
                <select
                  value={newTable.shape}
                  onChange={(e) => setNewTable({ ...newTable, shape: e.target.value as Table['shape'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="round">Round</option>
                  <option value="square">Square</option>
                  <option value="rectangle">Rectangle</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Section</label>
                <input
                  type="text"
                  required
                  value={newTable.section}
                  onChange={(e) => setNewTable({ ...newTable, section: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsAddingTable(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                >
                  Add Table
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div
        className="relative bg-white rounded-lg shadow-sm h-[600px] border-2 border-dashed border-gray-300"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {tables.map((table) => (
          <div
            key={table.id}
            draggable
            onDragStart={(e) => handleDragStart(e, table.id)}
            onClick={() => table.currentOrder && setSelectedTable(table.id)}
            style={{
              display: selectedSection === 'all' || selectedSection === table.section ? 'flex' : 'none',
              position: 'absolute',
              left: table.position.x,
              top: table.position.y,
              cursor: table.currentOrder ? 'pointer' : 'move'
            }}
            className={`${
              table.shape === 'round' ? 'rounded-full' : 'rounded-lg'
            } transition-colors ${
              getStatusColor(table.status)
            } p-4 w-32 h-32 flex flex-col items-center justify-center border-2 border-current`}
          >
            <span className="font-bold text-lg">Table {table.number}</span>
            <div className="flex items-center mt-1">
              <Users className="h-4 w-4 mr-1" />
              <span>{table.capacity}</span>
            </div>
            {table.currentOrder && (
              <div className="flex items-center mt-1">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>{table.currentOrder.total.toFixed(2)}</span>
              </div>
            )}
          </div>
        ))}
        {tables.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <Grid className="h-8 w-8 mr-2" />
            <p>No tables added yet. Click "Add Table" to get started.</p>
          </div>
        )}
      </div>

      {selectedTable && (
        <TableDetailsModal
          tableId={selectedTable}
          onClose={() => setSelectedTable(null)}
        />
      )}
    </div>
  );
}