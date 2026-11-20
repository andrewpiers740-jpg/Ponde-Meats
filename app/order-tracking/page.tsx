'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SITE } from '@/src/config/site';
import { money } from '@/lib/order';
import { Search, Snowflake, CheckCircle, Clock, Truck, ShieldAlert, ArrowRight } from 'lucide-react';

interface OrderLookupResult {
  orderNumber: string;
  customerName: string;
  total: number;
  status: string;
  paymentMethod: string;
  items: { name: string; quantity: number }[];
  preferredDeliveryDate?: string;
}

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<OrderLookupResult | null>(null);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const res = await fetch(`/api/order/payment-details/?order=${orderNumber.trim()}`);
      if (!res.ok) {
        throw new Error('Order not found. Please check your 5-digit order number (e.g. 32975).');
      }
      const json = await res.json();
      setOrderData(json.order);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Could not find order.');
      setOrderData(null);
    } finally {
      setLoading(false);
    }
  };

  // Determine timeline stage
  const getStageIndex = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending payment':
        return 0;
      case 'payment sent':
      case 'payment confirmed':
        return 1;
      case 'preparing dispatch':
        return 2;
      case 'dispatched':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 1;
    }
  };

  const stages = [
    { label: 'Order Queued', desc: 'Awaiting Bank/PayID transfer' },
    { label: 'Payment Verified', desc: '5% OSKO discount confirmed' },
    { label: 'Boning Room Prep', desc: 'Portion cut & Cryovac vacuum packed' },
    { label: 'Cold-Chain Dispatch', desc: 'Refrigerated van transport at 0–3°C' },
    { label: 'Delivered', desc: 'Safely delivered to customer' },
  ];

  const currentStageIndex = orderData ? getStageIndex(orderData.status) : 0;

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#121212] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Cold-Chain Logistics Tracking
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Track Your Refrigerated Meat Order
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Enter your 5-digit wholesale order number to view real-time cold-chain preparation, temperature logs, and delivery timeline.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Lookup Form */}
        <div className="bg-neutral-50 p-6 sm:p-8 rounded-xl border border-neutral-200 mb-8 shadow-xs">
          <form onSubmit={handleLookup} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
                  5-Digit Order Number *
                </label>
                <input
                  type="text"
                  required
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g. 32975"
                  className="w-full px-3 py-2 text-xs font-mono font-bold bg-white border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
                  Email or Phone (Optional)
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. 0412 884 921"
                  className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-[#881326] hover:bg-[#721020] text-white font-semibold text-xs rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              <span>{loading ? 'Searching...' : 'Track Cold-Chain Status'}</span>
            </button>
          </form>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs mb-8 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Tracking Results Card */}
        {orderData && (
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm space-y-6 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
              <div>
                <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block">
                  ORDER REFERENCE
                </span>
                <h2 className="text-xl font-bold font-mono text-neutral-900 mt-0.5">
                  #{orderData.orderNumber}
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Customer: <strong>{orderData.customerName}</strong>
                </p>
              </div>

              <div className="sm:text-right">
                <span className="inline-block px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">
                  {orderData.status}
                </span>
                <span className="block text-xs font-mono font-bold text-[#881326] mt-1.5">
                  Total: {money(orderData.total)} AUD
                </span>
              </div>
            </div>

            {/* Timeline Progress */}
            <div>
              <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-6">
                Live Cold-Chain Dispatch Timeline
              </h3>
              <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                {stages.map((stage, idx) => {
                  const isDone = idx <= currentStageIndex;
                  const isCurrent = idx === currentStageIndex;
                  return (
                    <div key={stage.label} className="relative flex items-start gap-4">
                      <div
                        className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isDone
                            ? 'bg-[#881326] text-white ring-4 ring-rose-50'
                            : 'bg-neutral-200 text-neutral-500'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <div>
                        <h4
                          className={`text-xs font-bold ${
                            isCurrent ? 'text-[#881326]' : isDone ? 'text-neutral-900' : 'text-neutral-400'
                          }`}
                        >
                          {stage.label}
                        </h4>
                        <p className="text-[11px] text-neutral-500 mt-0.5">{stage.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cold Chain Guarantee Callout */}
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center gap-3 text-xs text-neutral-700">
              <Snowflake className="w-5 h-5 text-rose-500 shrink-0" />
              <div>
                <strong>Temperature Verified 0–3°C</strong>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Packaged in insulated thermal chill bags with heavy-duty gel ice packs.
                </p>
              </div>
            </div>

            {/* Payment link if pending */}
            {orderData.status.toLowerCase().includes('pending') && (
              <div className="pt-2 flex justify-between items-center text-xs">
                <span className="text-neutral-500">Need to view bank details or upload receipt?</span>
                <Link
                  href={`/order/payment-details/?order=${orderData.orderNumber}`}
                  className="font-bold text-[#881326] hover:underline flex items-center gap-1"
                >
                  <span>View Payment Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
