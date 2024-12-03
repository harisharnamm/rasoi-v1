import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle } from 'lucide-react';

const roles = [
  { id: 'user', label: 'Customer', path: '/' },
  { id: 'admin', label: 'Admin', path: '/admin' },
  { id: 'manager', label: 'Manager', path: '/manager/tables' },
  { id: 'waiter', label: 'Waiter', path: '/waiter' }
];

export default function RoleSwitcher() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative inline-block">
        <select
          onChange={(e) => navigate(e.target.value)}
          className="appearance-none bg-white pl-10 pr-8 py-2 rounded-lg shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {roles.map(role => (
            <option key={role.id} value={role.path}>
              Switch to {role.label}
            </option>
          ))}
        </select>
        <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}