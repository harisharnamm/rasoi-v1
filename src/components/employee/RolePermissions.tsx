import React, { useState } from 'react';
import { Plus, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

const defaultPermissions = {
  userManagement: false,
  contentManagement: false,
  financialOperations: false,
  reportGeneration: false,
  systemSettings: false,
  analyticsAccess: false
};

export default function RolePermissions() {
  const [roles, setRoles] = useState([
    {
      id: '1',
      name: 'Admin',
      description: 'Full system access',
      permissions: { ...defaultPermissions, userManagement: true, systemSettings: true }
    },
    {
      id: '2',
      name: 'Manager',
      description: 'Department management access',
      permissions: { ...defaultPermissions, contentManagement: true, reportGeneration: true }
    }
  ]);

  const [isAddingRole, setIsAddingRole] = useState(false);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: { ...defaultPermissions }
  });

  const handleAddRole = () => {
    if (!newRole.name) {
      toast.error('Role name is required');
      return;
    }

    setRoles([...roles, { ...newRole, id: crypto.randomUUID() }]);
    setNewRole({ name: '', description: '', permissions: { ...defaultPermissions } });
    setIsAddingRole(false);
    toast.success('Role added successfully');
  };

  const togglePermission = (roleId: string, permission: string) => {
    setRoles(roles.map(role => 
      role.id === roleId
        ? {
            ...role,
            permissions: {
              ...role.permissions,
              [permission]: !role.permissions[permission]
            }
          }
        : role
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Role Management</h2>
        <button
          onClick={() => setIsAddingRole(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Role
        </button>
      </div>

      {isAddingRole && (
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Role Name</label>
            <input
              type="text"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              value={newRole.description}
              onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Permissions</h3>
            <div className="space-y-2">
              {Object.keys(defaultPermissions).map(permission => (
                <div key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`new-${permission}`}
                    checked={newRole.permissions[permission]}
                    onChange={() => setNewRole({
                      ...newRole,
                      permissions: {
                        ...newRole.permissions,
                        [permission]: !newRole.permissions[permission]
                      }
                    })}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`new-${permission}`} className="ml-2 text-sm text-gray-700">
                    {permission.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsAddingRole(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddRole}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
            >
              Add Role
            </button>
          </div>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              {Object.keys(defaultPermissions).map(permission => (
                <th key={permission} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {permission.replace(/([A-Z])/g, ' $1').trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map(role => (
              <tr key={role.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{role.name}</div>
                    <div className="text-sm text-gray-500">{role.description}</div>
                  </div>
                </td>
                {Object.entries(role.permissions).map(([permission, value]) => (
                  <td key={permission} className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => togglePermission(role.id, permission)}
                      className={`p-1 rounded-full ${
                        value
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {value ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}