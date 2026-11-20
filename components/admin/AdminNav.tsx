'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminPasscode } from './AdminPasscodeContext';
import { SITE } from '@/src/config/site';
import { LayoutDashboard, ShoppingCart, MessageSquare, LogOut, ArrowLeft, Send } from 'lucide-react';

export default function AdminNav() {
  const pathname = usePathname();
  const { logout } = useAdminPasscode();

  const links = [
    { href: '/admin', label: 'Dashboard Hub', icon: LayoutDashboard },
    { href: '/admin/orders', label: 'Wholesale Orders', icon: ShoppingCart },
    { href: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },
    { href: '/admin/send-payment-email', label: 'Payment Details Composer', icon: Send },
  ];

  return (
    <header className="bg-[#121212] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2 font-bold text-sm tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#881326]" />
              <span>{SITE.name} Admin Portal</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {links.map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      active
                        ? 'bg-neutral-800 text-white'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/"
              className="text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Storefront</span>
            </Link>
            <span className="text-neutral-700">|</span>
            <button
              onClick={logout}
              className="text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
