import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Search, Filter, Shield, Clock } from 'lucide-react';
import EmployeeForm from '../../components/employee/EmployeeForm';
import EmployeeList from '../../components/employee/EmployeeList';
import RolePermissions from '../../components/employee/RolePermissions';
import AccessLogs from '../../components/employee/AccessLogs';
import toast from 'react-hot-toast';

export default function EmployeeManagement() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useStore();
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'employees' | 'roles' | 'access'>('employees');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleSubmit = (employeeData: any) => {
    try {
      if (selectedEmployee) {
        updateEmployee(selectedEmployee, employeeData);
        toast.success('Employee updated successfully');
      } else {
        addEmployee(employeeData);
        toast.success('Employee added successfully');
      }
      setIsAddingEmployee(false);
      setSelectedEmployee(null);
    } catch (error) {
      toast.error('Failed to save employee');
    }
  };

  const handleDelete = (employeeId: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(employeeId);
      toast.success('Employee deleted successfully');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
        <div className="flex items-center space-x-4">
          {activeTab === 'employees' && (
            <button
              onClick={() => setIsAddingEmployee(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Employee
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('employees')}
              className={`flex-1 px-4 py-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'employees'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Employees
            </button>
            <button
              onClick={() => setActiveTab('roles')}
              className={`flex-1 px-4 py-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'roles'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Roles & Permissions
            </button>
            <button
              onClick={() => setActiveTab('access')}
              className={`flex-1 px-4 py-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'access'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Access Logs
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'employees' && (
        <>
          {isAddingEmployee ? (
            <EmployeeForm
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsAddingEmployee(false);
                setSelectedEmployee(null);
              }}
              initialData={selectedEmployee ? employees.find(e => e.id === selectedEmployee) : undefined}
            />
          ) : (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <EmployeeList
                employees={employees}
                onEdit={(employee) => {
                  setSelectedEmployee(employee.id);
                  setIsAddingEmployee(true);
                }}
                onDelete={handleDelete}
              />
            </div>
          )}
        </>
      )}

      {activeTab === 'roles' && <RolePermissions />}
      {activeTab === 'access' && <AccessLogs />}
    </div>
  );
}