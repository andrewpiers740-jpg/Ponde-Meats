'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface AdminPasscodeContextType {
  passcode: string;
  setPasscode: (code: string) => void;
  isAuthenticated: boolean;
  checking: boolean;
  login: (code: string) => Promise<boolean>;
  logout: () => void;
}

const AdminPasscodeContext = createContext<AdminPasscodeContextType | undefined>(undefined);

const STORAGE_KEY = 'ponde_admin_passcode';

/** Asks the server whether this passcode is valid (the server is the only place that knows the real one). */
async function verifyPasscode(code: string): Promise<boolean> {
  try {
    const res = await fetch('/api/admin/orders', { headers: { 'x-admin-passcode': code } });
    return res.ok;
  } catch {
    return false;
  }
}

export function AdminPasscodeProvider({ children }: { children: React.ReactNode }) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  const logout = useCallback(() => {
    setPasscode('');
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  // On load, re-verify any stored passcode so a stale or wrong value can never look "signed in".
  useEffect(() => {
    let active = true;
    (async () => {
      let stored = '';
      try {
        stored = sessionStorage.getItem(STORAGE_KEY) || '';
      } catch {
        stored = '';
      }
      if (stored && (await verifyPasscode(stored))) {
        if (active) {
          setPasscode(stored);
          setIsAuthenticated(true);
        }
      } else if (stored) {
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch {
          // ignore
        }
      }
      if (active) setChecking(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const login = async (code: string): Promise<boolean> => {
    const trimmed = code.trim();
    if (!trimmed) return false;
    const ok = await verifyPasscode(trimmed);
    if (!ok) return false;
    setPasscode(trimmed);
    setIsAuthenticated(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, trimmed);
    } catch {
      // ignore
    }
    return true;
  };

  return (
    <AdminPasscodeContext.Provider
      value={{
        passcode,
        setPasscode,
        isAuthenticated,
        checking,
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
