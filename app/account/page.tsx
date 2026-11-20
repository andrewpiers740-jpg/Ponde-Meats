'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SITE } from '@/src/config/site';
import { User, ShoppingBag, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#121212] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <User className="w-4 h-4" />
            <span>Customer Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Wholesale Customer Account
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl">
            Manage your saved delivery address, view order history, and track recurring wholesale schedules.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[#881326] text-white'
                  : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Customer Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeTab === 'orders'
                  ? 'bg-[#881326] text-white'
                  : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order History &amp; Re-orders</span>
            </button>
            <Link
              href="/order-tracking"
              className="w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 bg-neutral-50 text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>Track Cold-Chain Run</span>
            </Link>
          </div>

          {/* Main Panel */}
          <div className="md:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-6 space-y-6">
                <div>
                  <h2 className="text-base font-bold text-neutral-900">Registered Details</h2>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Your wholesale delivery address and contact credentials.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-white rounded-lg border border-neutral-200">
                    <span className="text-neutral-400 block text-[10px] uppercase font-bold">
                      Account Type
                    </span>
                    <span className="font-semibold text-neutral-900 mt-1 block">
                      Wholesale &amp; Bulk Household Buyer
                    </span>
                  </div>
                  <div className="p-3.5 bg-white rounded-lg border border-neutral-200">
                    <span className="text-neutral-400 block text-[10px] uppercase font-bold">
                      Default Payment Rail
                    </span>
                    <span className="font-semibold text-emerald-700 mt-1 block">
                      Bank Transfer (OSKO) / PayID (5% Discount Active)
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-neutral-200 text-xs space-y-2">
                  <span className="font-bold text-neutral-900 block">Cold-Chain Delivery Zone:</span>
                  <p className="text-neutral-600">
                    Greater Adelaide, Adelaide Hills, Murraylands, and Regional South Australia corridors.
                  </p>
                </div>

                <div className="pt-2 flex justify-end">
                  <Link
                    href="/shop"
                    className="px-5 py-2.5 bg-[#881326] text-white rounded text-xs font-semibold hover:bg-[#721020] transition-colors"
                  >
                    Start A New Order
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-6 space-y-4">
                <h2 className="text-base font-bold text-neutral-900">Recent Orders</h2>
                <div className="p-4 bg-white rounded-lg border border-neutral-200 text-xs text-neutral-600">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono font-bold text-neutral-900">Sample Order #32975</span>
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-800 rounded font-bold text-[10px]">
                      Pending Payment
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    2x Beef Ribeye Steaks (5kg Master Carton), 1x Lamb Cutlets Foodservice Carton.
                  </p>
                  <div className="mt-3 pt-2 border-t border-neutral-100 flex justify-between items-center">
                    <span className="font-mono font-bold text-[#881326]">$675.50 AUD</span>
                    <Link
                      href="/order/payment-details/?order=32975"
                      className="text-[#881326] hover:underline font-semibold"
                    >
                      View Payment Details →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
