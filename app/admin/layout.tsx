import React from 'react';
import type { Metadata } from 'next';
import { AdminPasscodeProvider } from '@/components/admin/AdminPasscodeContext';
import PasscodeGate from '@/components/admin/PasscodeGate';
import AdminNav from '@/components/admin/AdminNav';

export const metadata: Metadata = {
  title: 'Admin Reply Portal – Ponde Meats',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminPasscodeProvider>
      <PasscodeGate>
        <div className="min-h-screen bg-neutral-100 flex flex-col text-neutral-900">
          <AdminNav />
          <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </div>
      </PasscodeGate>
    </AdminPasscodeProvider>
  );
}
