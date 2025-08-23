import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the structure for access control
interface AccessControl {
  [userType: string]: string[];
}

// Define the structure for page information
interface PageInfo {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
}

// Default access control configuration
const defaultAccessControl: AccessControl = {
  homeowner: [
    'dashboard', 'properties', 'tenants', 'leases', 'applications', 
    'financials', 'rent-collection', 'expenses', 'maintenance', 
    'inspections', 'documents', 'reports', 'analytics', 'settings'
  ],
  admin: [
    'dashboard', 'properties', 'tenants', 'leases', 'applications', 
    'financials', 'rent-collection', 'expenses', 'maintenance', 
    'inspections', 'documents', 'reports', 'analytics', 'settings',
    'admin-access-control'
  ],
  tenant: [
    'dashboard', 'leases', 'payments', 'maintenance-requests', 'documents'
  ],
  vendor: [
    'dashboard', 'work-orders', 'maintenance-requests', 'payments', 'documents'
  ]
};

// All available pages in the system
export const allPages: PageInfo[] = [
  { id: 'dashboard', name: 'Dashboard', icon: 'Activity', category: 'Core', description: 'Main dashboard and overview' },
  { id: 'properties', name: 'Properties', icon: 'Building', category: 'Management', description: 'Property portfolio management' },
  { id: 'tenants', name: 'Tenants', icon: 'Users', category: 'Management', description: 'Tenant management and information' },
  { id: 'leases', name: 'Leases', icon: 'FileText', category: 'Management', description: 'Lease agreements and management' },
  { id: 'applications', name: 'Applications', icon: 'FileText', category: 'Management', description: 'Rental application processing' },
  { id: 'financials', name: 'Financials', icon: 'DollarSign', category: 'Finance', description: 'Financial overview and tracking' },
  { id: 'rent-collection', name: 'Rent Collection', icon: 'CreditCard', category: 'Finance', description: 'Rent payment management' },
  { id: 'expenses', name: 'Expenses', icon: 'Receipt', category: 'Finance', description: 'Expense tracking and management' },
  { id: 'maintenance', name: 'Maintenance', icon: 'Wrench', category: 'Operations', description: 'Maintenance request management' },
  { id: 'inspections', name: 'Inspections', icon: 'ClipboardCheck', category: 'Operations', description: 'Property inspection management' },
  { id: 'documents', name: 'Documents', icon: 'Folder', category: 'Operations', description: 'Document storage and management' },
  { id: 'reports', name: 'Reports', icon: 'BarChart3', category: 'Analytics', description: 'Analytics and reporting' },
  { id: 'analytics', name: 'Analytics', icon: 'TrendingUp', category: 'Analytics', description: 'Performance metrics and insights' },
  { id: 'settings', name: 'Settings', icon: 'Settings', category: 'System', description: 'Account and application settings' },
  { id: 'admin-access-control', name: 'Access Control', icon: 'Shield', category: 'Admin', description: 'Manage user access permissions' }
];

interface AccessControlContextType {
  accessControl: AccessControl;
  updateAccessControl: (userType: string, pages: string[]) => void;
  togglePageAccess: (userType: string, pageId: string) => void;
  isPageAccessible: (userType: string, pageId: string) => boolean;
  getAccessiblePages: (userType: string) => string[];
  resetToDefault: () => void;
  saveConfiguration: () => void;
  loadConfiguration: (config: AccessControl) => void;
}

const AccessControlContext = createContext<AccessControlContextType | undefined>(undefined);

export const useAccessControl = () => {
  const context = useContext(AccessControlContext);
  if (context === undefined) {
    throw new Error('useAccessControl must be used within an AccessControlProvider');
  }
  return context;
};

interface AccessControlProviderProps {
  children: ReactNode;
}

export const AccessControlProvider: React.FC<AccessControlProviderProps> = ({ children }) => {
  const [accessControl, setAccessControl] = useState<AccessControl>(defaultAccessControl);

  // Load configuration from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('accessControlConfig');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setAccessControl(parsed);
      } catch (error) {
        console.error('Error loading access control configuration:', error);
        // Fall back to default if there's an error
        setAccessControl(defaultAccessControl);
      }
    }
  }, []);

  // Save configuration to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('accessControlConfig', JSON.stringify(accessControl));
  }, [accessControl]);

  const updateAccessControl = (userType: string, pages: string[]) => {
    setAccessControl(prev => ({
      ...prev,
      [userType]: pages
    }));
  };

  const togglePageAccess = (userType: string, pageId: string) => {
    setAccessControl(prev => {
      const currentUserType = prev[userType] || [];
      const newAccess = currentUserType.includes(pageId)
        ? currentUserType.filter(id => id !== pageId)
        : [...currentUserType, pageId];
      
      return {
        ...prev,
        [userType]: newAccess
      };
    });
  };

  const isPageAccessible = (userType: string, pageId: string): boolean => {
    return accessControl[userType]?.includes(pageId) || false;
  };

  const getAccessiblePages = (userType: string): string[] => {
    return accessControl[userType] || [];
  };

  const resetToDefault = () => {
    setAccessControl(defaultAccessControl);
  };

  const saveConfiguration = () => {
    // In a real app, this would save to the backend
    localStorage.setItem('accessControlConfig', JSON.stringify(accessControl));
    console.log('Access control configuration saved:', accessControl);
  };

  const loadConfiguration = (config: AccessControl) => {
    setAccessControl(config);
  };

  const value: AccessControlContextType = {
    accessControl,
    updateAccessControl,
    togglePageAccess,
    isPageAccessible,
    getAccessiblePages,
    resetToDefault,
    saveConfiguration,
    loadConfiguration
  };

  return (
    <AccessControlContext.Provider value={value}>
      {children}
    </AccessControlContext.Provider>
  );
};
