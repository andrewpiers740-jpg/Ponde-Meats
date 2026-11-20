'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminPasscodeContextType {
  passcode: string;
  setPasscode: (code: string) => void;
  isAuthenticated: boolean;
  login: (code: string) => boolean;
  logout: () => void;
}

const AdminPasscodeContext = createContext<AdminPasscodeContextType | undefined>(undefined);

export function AdminPasscodeProvider({ children }: { children: React.ReactNode }) {
  const [passcode, setPasscode] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return sessionStorage.getItem('ponde_admin_passcode') || '';
      } catch {
        return '';
      }
    }
    return '';
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return Boolean(sessionStorage.getItem('ponde_admin_passcode'));
      } catch {
        return false;
      }
    }
    return false;
  });

  const login = (code: string): boolean => {
    // Stores the passcode for X-Admin-Passcode header in API calls
    if (code.trim().length > 0) {
      setPasscode(code.trim());
      setIsAuthenticated(true);
      sessionStorage.setItem('ponde_admin_passcode', code.trim());
      return true;
    }
    return false;
  };

  const logout = () => {
    setPasscode('');
    setIsAuthenticated(false);
    sessionStorage.removeItem('ponde_admin_passcode');
  };

  return (
    <AdminPasscodeContext.Provider
      value={{
        passcode,
        setPasscode,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AdminPasscodeContext.Provider>
  );
}

export function useAdminPasscode() {
  const ctx = useContext(AdminPasscodeContext);
  if (!ctx) {
    throw new Error('useAdminPasscode must be used within an AdminPasscodeProvider');
  }
  return ctx;
}
