import { StateCreator } from 'zustand';
import { Employee, AccessLog } from '../../types/employee';

interface EmployeeSlice {
  employees: Employee[];
  accessLogs: AccessLog[];
  roles: {
    id: string;
    name: string;
    permissions: Record<string, boolean>;
  }[];
  
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  
  addRole: (role: { name: string; permissions: Record<string, boolean> }) => void;
  updateRole: (id: string, updates: Partial<{ name: string; permissions: Record<string, boolean> }>) => void;
  deleteRole: (id: string) => void;
  
  recordAccessLog: (log: Omit<AccessLog, 'id' | 'timestamp'>) => void;
}

export const employeeSlice: StateCreator<EmployeeSlice> = (set) => ({
  employees: [],
  accessLogs: [],
  roles: [],
  
  addEmployee: (employee) => set((state) => ({
    employees: [...state.employees, { ...employee, id: crypto.randomUUID() }]
  })),
  
  updateEmployee: (id, updates) => set((state) => ({
    employees: state.employees.map((employee) =>
      employee.id === id ? { ...employee, ...updates } : employee
    )
  })),
  
  deleteEmployee: (id) => set((state) => ({
    employees: state.employees.filter((employee) => employee.id !== id)
  })),
  
  addRole: (role) => set((state) => ({
    roles: [...state.roles, { ...role, id: crypto.randomUUID() }]
  })),
  
  updateRole: (id, updates) => set((state) => ({
    roles: state.roles.map((role) =>
      role.id === id ? { ...role, ...updates } : role
    )
  })),
  
  deleteRole: (id) => set((state) => ({
    roles: state.roles.filter((role) => role.id !== id)
  })),
  
  recordAccessLog: (log) => set((state) => ({
    accessLogs: [...state.accessLogs, {
      ...log,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString()
    }]
  }))
});