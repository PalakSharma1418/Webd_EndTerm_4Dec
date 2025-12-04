import { useState, createContext, useContext } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [userRole, setUserRole] = useState('admin');
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [stats, setStats] = useState({
    totalUsers: 1250,
    totalOrders: 3840,
    totalProducts: 521,
    totalRevenue: '$125,430',
    ordersToday: 34,
    usersThisMonth: 128,
  });

  const hasAccess = (requiredRole) => {
    const roleHierarchy = {
      admin: ['admin', 'moderator', 'user'],
      moderator: ['moderator', 'user'],
      user: ['user']
    };
    return roleHierarchy[userRole]?.includes(requiredRole) || false;
  };

  return (
    <AdminContext.Provider 
      value={{
        userRole,
        setUserRole,
        darkMode, 
        setDarkMode,
        stats,
        sidebarOpen,
        setSidebarOpen,
        hasAccess
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}