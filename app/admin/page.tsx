'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAdminPasscode } from '@/components/admin/AdminPasscodeContext';
import { OrderRecord } from '@/lib/orderStore';
import { EnquiryRecord } from '@/lib/enquiryStore';
import { money } from '@/lib/order';
import StatusBadge from '@/components/admin/StatusBadge';
import {
  ShoppingCart,
  MessageSquare,
  Clock,
  CheckCircle,
  Truck,
  ArrowRight,
  Send,
  RefreshCw,
} from 'lucide-react';

export default function AdminHubPage() {
  const { passcode } = useAdminPasscode();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      const headers = { 'x-admin-passcode': passcode };
      const [resOrders, resEnquiries] = await Promise.all([
        fetch('/api/admin/orders/', { headers }),
        fetch('/api/admin/enquiries/', { headers }),
      ]);

      if (resOrders.ok) {
        const data = await resOrders.json();
        setOrders(data.orders || []);
      }
      if (resEnquiries.ok) {
        const data = await resEnquiries.json();
        setEnquiries(data.enquiries || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [passcode]);

  useEffect(() => {
    let active = true;
    const run = async () => {
      try {
        const headers = { 'x-admin-passcode': passcode };
        const [resOrders, resEnquiries] = await Promise.all([
          fetch('/api/admin/orders/', { headers }),
          fetch('/api/admin/enquiries/', { headers }),
        ]);

        if (active && resOrders.ok) {
          const data = await resOrders.json();
          setOrders(data.orders || []);
        }
        if (active && resEnquiries.ok) {
          const data = await resEnquiries.json();
          setEnquiries(data.enquiries || []);
        }
      } catch {
        // ignore
      } finally {
        if (active) setLoading(false);
      }
    };
    run();
    return () => {
      active = false;
    };
  }, [passcode]);

  const pendingOrders = orders.filter(
    (o) => o.status === 'Pending Payment' || o.status === 'Payment Sent'
  );
  const confirmedOrders = orders.filter((o) => o.status === 'Payment Confirmed');
  const newEnquiries = enquiries.filter((e) => e.status === 'new');

  return (
    <div className="space-y-8">
      {/* Title & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Admin Dashboard Hub</h1>
          <p className="text-xs text-neutral-500 mt-1">
            Real-time wholesale order dispatch &amp; customer enquiry management.
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="self-start sm:self-auto px-3 py-1.5 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
            <ShoppingCart className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-neutral-900">{orders.length}</div>
          <p className="text-[11px] text-neutral-400 mt-1">Direct website &amp; WhatsApp</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Payment</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-mono font-bold text-amber-600">{pendingOrders.length}</div>
          <p className="text-[11px] text-neutral-400 mt-1">Awaiting OSKO or PayID receipt</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Payment Verified</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-mono font-bold text-emerald-600">{confirmedOrders.length}</div>
          <p className="text-[11px] text-neutral-400 mt-1">Ready for boning room packaging</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">New Enquiries</span>
            <MessageSquare className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-mono font-bold text-blue-600">{newEnquiries.length}</div>
          <p className="text-[11px] text-neutral-400 mt-1">Wholesale &amp; customer contact</p>
        </div>
      </div>

      {/* Quick Action Ribbon */}
      <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-neutral-900">Quick Actions:</span>
          <span className="text-neutral-500">Dispatch details or reply to pending requests</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/send-payment-email"
            className="px-3 py-1.5 bg-[#881326] text-white rounded text-xs font-semibold hover:bg-[#721020] transition-colors flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Payment Details Email</span>
          </Link>
          <Link
            href="/admin/enquiries"
            className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded text-xs font-semibold transition-colors"
          >
            Review Enquiries ({newEnquiries.length})
          </Link>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-neutral-900">Recent Wholesale Orders</h2>
            <p className="text-xs text-neutral-500">Live order queue with cold-chain statuses</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-[#881326] hover:underline flex items-center gap-1"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-600 font-semibold border-b border-neutral-200">
              <tr>
                <th className="p-3.5">Order #</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Total</th>
                <th className="p-3.5">Method</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-neutral-900">
                    <Link href={`/admin/orders/${order.orderNumber}`} className="hover:underline text-[#881326]">
                      #{order.orderNumber}
                    </Link>
                  </td>
                  <td className="p-3.5 text-neutral-500">
                    {new Date(order.createdAt).toLocaleDateString('en-AU')}
                  </td>
                  <td className="p-3.5">
                    <span className="font-semibold text-neutral-900 block">{order.customerName}</span>
                    <span className="text-[11px] text-neutral-500">{order.suburb} {order.state}</span>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-neutral-900">
                    {money(order.total)}
                  </td>
                  <td className="p-3.5 text-neutral-600">
                    {order.paymentMethod}
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <Link
                      href={`/admin/send-payment-email/?order=${order.orderNumber}`}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded text-[11px] font-semibold transition-colors"
                    >
                      <Send className="w-3 h-3 text-[#881326]" />
                      <span>Send Payment</span>
                    </Link>
                    <Link
                      href={`/admin/orders/${order.orderNumber}`}
                      className="text-[#881326] hover:underline font-semibold text-[11px]"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
