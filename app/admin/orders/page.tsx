'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAdminPasscode } from '@/components/admin/AdminPasscodeContext';
import { OrderRecord } from '@/lib/orderStore';
import { money } from '@/lib/order';
import StatusBadge from '@/components/admin/StatusBadge';
import { Trash2, Send, Search, Filter, ShoppingBag } from 'lucide-react';

export default function AdminOrdersPage() {
  const { passcode } = useAdminPasscode();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/admin/orders/', {
          headers: { 'x-admin-passcode': passcode },
        });
        if (active && res.ok) {
          const data = await res.json();
          setOrders(data.orders || []);
        }
      } catch {
        // ignore
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchOrders();
    return () => {
      active = false;
    };
  }, [passcode]);

  const handleDelete = async (id: string) => {
    if (!confirm(`Are you sure you want to delete order #${id}?`)) return;
    try {
      const res = await fetch(`/api/admin/orders/${id}/`, {
        method: 'DELETE',
        headers: { 'x-admin-passcode': passcode },
      });
      if (res.ok) {
        setOrders((prev) => prev.filter((o) => o.id !== id));
      }
    } catch {
      // ignore
    }
  };

  const filtered = orders.filter((o) => {
    if (filterStatus !== 'all' && o.status.toLowerCase() !== filterStatus.toLowerCase()) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchNum = o.orderNumber.includes(q);
      const matchName = o.customerName.toLowerCase().includes(q);
      const matchEmail = o.email.toLowerCase().includes(q);
      return matchNum || matchName || matchEmail;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Wholesale Orders</h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Manage incoming beef, lamb, Boer goat, and mutton orders ({orders.length} total).
          </p>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order #, customer, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#881326]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto text-xs">
          <span className="font-semibold text-neutral-500 mr-1">Status:</span>
          {['all', 'Pending Payment', 'Payment Sent', 'Payment Confirmed', 'Dispatched'].map(
            (st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-md capitalize transition-colors ${
                  filterStatus.toLowerCase() === st.toLowerCase()
                    ? 'bg-[#881326] text-white font-semibold'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                {st}
              </button>
            )
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-600 font-semibold border-b border-neutral-200">
              <tr>
                <th className="p-3.5">Order #</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Customer &amp; Address</th>
                <th className="p-3.5">Items</th>
                <th className="p-3.5">Total (AUD)</th>
                <th className="p-3.5">Method</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-neutral-900">
                    <Link
                      href={`/admin/orders/${order.orderNumber}`}
                      className="hover:underline text-[#881326]"
                    >
                      #{order.orderNumber}
                    </Link>
                  </td>
                  <td className="p-3.5 text-neutral-500">
                    {new Date(order.createdAt).toLocaleDateString('en-AU')}
                  </td>
                  <td className="p-3.5">
                    <span className="font-bold text-neutral-900 block">{order.customerName}</span>
                    <span className="text-[11px] text-neutral-500 block">{order.email}</span>
                    <span className="text-[11px] text-neutral-400">
                      {order.suburb} {order.state} {order.postcode}
                    </span>
                  </td>
                  <td className="p-3.5 text-neutral-600 max-w-xs truncate">
                    {order.items.map((it) => `${it.quantity}x ${it.name}`).join(', ')}
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
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#881326] text-white hover:bg-[#721020] rounded text-[11px] font-semibold transition-colors"
                      title="Send payment details to customer"
                    >
                      <Send className="w-3 h-3" />
                      <span>Send Pay</span>
                    </Link>
                    <Link
                      href={`/admin/orders/${order.orderNumber}`}
                      className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded text-[11px] font-semibold transition-colors"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="p-1 text-neutral-400 hover:text-rose-600 transition-colors"
                      aria-label="Delete order"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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
