'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAdminPasscode } from '@/components/admin/AdminPasscodeContext';
import { OrderRecord } from '@/lib/orderStore';
import { money } from '@/lib/order';
import StatusBadge from '@/components/admin/StatusBadge';
import { ArrowLeft, Send, CheckCircle, Clock, Trash2, ExternalLink } from 'lucide-react';

export default function AdminOrderDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { passcode } = useAdminPasscode();

  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    async function loadOrder() {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/orders/${id}/`, {
          headers: { 'x-admin-passcode': passcode },
        });
        if (res.ok) {
          const data = await res.json();
          setOrder(data.order);
          setStatus(data.order.status);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [id, passcode]);

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      setUpdating(true);
      const res = await fetch(`/api/admin/orders/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setStatus(newStatus);
        setOrder((prev) => (prev ? { ...prev, status: newStatus as any } : null));
      }
    } catch {
      // ignore
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-xs text-neutral-500">Loading order details...</div>;
  }

  if (!order) {
    return (
      <div className="p-12 text-center text-xs text-neutral-500">
        <p>Order not found</p>
        <Link href="/admin/orders" className="text-[#881326] underline font-bold mt-2 block">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Orders List</span>
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-bold font-mono text-neutral-900">
                Order #{order.orderNumber}
              </h1>
              <StatusBadge status={order.status} />
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Received: {new Date(order.createdAt).toLocaleString('en-AU')} · Channel:{' '}
              <strong className="uppercase">{order.channel}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/admin/send-payment-email/?order=${order.orderNumber}`}
              className="px-4 py-2 bg-[#881326] hover:bg-[#721020] text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Compose Payment Details Email</span>
            </Link>
          </div>
        </div>

        {/* Customer & Delivery Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1.5">
            <h3 className="font-bold text-neutral-900 uppercase text-[11px] mb-2">
              Customer Information
            </h3>
            <p><strong>Name:</strong> {order.customerName}</p>
            <p><strong>Email:</strong> <a href={`mailto:${order.email}`} className="text-[#881326] underline">{order.email}</a></p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Payment Rail:</strong> {order.paymentMethod} (5% off)</p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1.5">
            <h3 className="font-bold text-neutral-900 uppercase text-[11px] mb-2">
              Delivery Destination
            </h3>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Suburb/State:</strong> {order.suburb} {order.state} {order.postcode}</p>
            {order.preferredDeliveryDate && <p><strong>Preferred Date:</strong> {order.preferredDeliveryDate}</p>}
            {order.notes && <p className="text-amber-800"><strong>Butcher Notes:</strong> {order.notes}</p>}
          </div>
        </div>

        {/* Items Table */}
        <div>
          <h3 className="font-bold text-xs text-neutral-900 uppercase mb-3">Order Items</h3>
          <div className="border border-neutral-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 text-neutral-700 font-semibold border-b border-neutral-200">
                <tr>
                  <th className="p-3">Item Name</th>
                  <th className="p-3">Variant / Pack</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Price</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {order.items.map((it, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-semibold text-neutral-900">{it.name}</td>
                    <td className="p-3 text-neutral-500">{it.variantName || 'Standard'}</td>
                    <td className="p-3 text-center font-mono">{it.quantity}</td>
                    <td className="p-3 text-right font-mono">{money(it.price)}</td>
                    <td className="p-3 text-right font-mono font-bold text-neutral-900">
                      {money(it.price * it.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals Breakdown */}
        <div className="flex justify-end text-xs">
          <div className="w-64 space-y-1.5 bg-neutral-50 p-4 rounded-lg border border-neutral-200">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal:</span>
              <span className="font-mono">{money(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>5% Bank/PayID Discount:</span>
              <span className="font-mono">-{money(order.discount)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Refrigerated Delivery:</span>
              <span className="font-mono">{order.shipping === 0 ? 'FREE' : money(order.shipping)}</span>
            </div>
            <div className="flex justify-between font-bold text-neutral-900 pt-2 border-t border-neutral-200 text-sm">
              <span>Total AUD:</span>
              <span className="font-mono text-[#881326] text-base">{money(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Change Status Control */}
        <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-800">Update Order Status:</span>
            <select
              value={status}
              disabled={updating}
              onChange={(e) => handleStatusUpdate(e.target.value)}
              className="px-3 py-1.5 bg-white border border-neutral-300 rounded-md font-medium text-xs focus:ring-1 focus:ring-[#881326] focus:outline-none"
            >
              <option value="Pending Payment">Pending Payment</option>
              <option value="Payment Sent">Payment Sent</option>
              <option value="Payment Confirmed">Payment Confirmed</option>
              <option value="Preparing Dispatch">Preparing Dispatch</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            {updating && <span className="text-neutral-500">Updating...</span>}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/order/payment-details/?order=${order.orderNumber}`}
              target="_blank"
              className="text-neutral-500 hover:text-neutral-800 flex items-center gap-1"
            >
              <span>View Public Payment Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
