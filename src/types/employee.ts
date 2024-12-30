export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  expiryDate?: string;
  ipRestrictions?: string;
  workingHours: {
    start: string;
    end: string;
  };
  requireTwoFactor: boolean;
  sessionTimeout: number;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccessLog {
  id: string;
  userId: string;
  userName: string;
  action: 'login' | 'logout' | 'failed_login';
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failure';
  details?: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: {
    userManagement: boolean;
    contentManagement: boolean;
    financialOperations: boolean;
    reportGeneration: boolean;
    systemSettings: boolean;
    analyticsAccess: boolean;
  };
  createdAt: string;
  updatedAt: string;
}