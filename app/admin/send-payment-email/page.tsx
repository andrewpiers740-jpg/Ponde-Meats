'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAdminPasscode } from '@/components/admin/AdminPasscodeContext';
import { parsePaymentDetail, ParsedPaymentDetail, money } from '@/lib/order';
import { waAdminPaymentDetailsMessage } from '@/lib/whatsapp';
import { SITE } from '@/src/config/site';
import WhatsAppSendPanel from '@/components/admin/WhatsAppSendPanel';
import { ArrowLeft, Send, CheckCircle, Clock, Copy, AlertCircle, RefreshCw } from 'lucide-react';

function SendPaymentEmailContent() {
  const searchParams = useSearchParams();
  const initialOrderNumber = searchParams.get('order') || '32975';

  const { passcode } = useAdminPasscode();
  const [orderNumber, setOrderNumber] = useState(initialOrderNumber);
  const [order, setOrder] = useState<any>(null);
  const [loadingOrder, setLoadingOrder] = useState(false);

  // Default Australian Banking details block for Cowirra SA
  const defaultBankBlob = `
Bank: Commonwealth Bank of Australia
BSB: 065-000
Account Number: 1098 7654
Account Name: Ponde Meats Pty Ltd
PayID: 0485901075
Payment Reference: ${initialOrderNumber}
Notes: Please quote Order #${initialOrderNumber} on your transfer.
  `.trim();

  const [paymentBlob, setPaymentBlob] = useState(defaultBankBlob);
  const [customNotes, setCustomNotes] = useState('Your order will be boned, cut to specification, and vacuum sealed upon payment receipt.');
  
  // Calculate parsed fields reactively without cascading effect
  const parsed = React.useMemo(() => parsePaymentDetail(paymentBlob), [paymentBlob]);

  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load Order Details
  useEffect(() => {
    async function fetchOrder() {
      if (!orderNumber.trim()) return;
      setLoadingOrder(true);
      try {
        const res = await fetch(`/api/admin/orders/${orderNumber.trim()}/`, {
          headers: { 'x-admin-passcode': passcode },
        });
        if (res.ok) {
          const json = await res.json();
          setOrder(json.order);
        }
      } catch {
        // ignore
      } finally {
        setLoadingOrder(false);
      }
    }
    fetchOrder();
  }, [orderNumber, passcode]);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    setSentSuccess(false);

    try {
      const res = await fetch('/api/admin/send-payment-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode,
        },
        body: JSON.stringify({
          orderNumber,
          paymentBlob,
          notes: customNotes,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || 'Failed to dispatch email');
      }

      setSentSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error sending email');
    } finally {
      setSending(false);
    }
  };

  const orderTotal = order ? order.total : 675.5;
  const customerName = order ? order.customerName : 'Valued Customer';
  const customerPhone = order ? order.phone : SITE.contact.phoneFormatted;

  // WhatsApp admin message with mandatory *{SITE.name}* header
  const waMessage = waAdminPaymentDetailsMessage(
    customerName,
    orderNumber,
    orderTotal,
    paymentBlob
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Orders List</span>
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-neutral-900">
          Payment Details Email &amp; WhatsApp Composer
        </h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          Paste the payment details once. <code className="font-mono bg-neutral-200 px-1 rounded">parsePaymentDetail()</code> auto-splits it into individually copyable fields for the customer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-xs space-y-6">
          <form onSubmit={handleSendEmail} className="space-y-5 text-xs">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded">
                {error}
              </div>
            )}

            {sentSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <strong>Payment details email sent successfully!</strong>
                  <p className="text-[11px] text-emerald-800">
                    Order status updated to &quot;Payment Sent&quot;. The customer can also view the interactive copy page.
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Target Order Number
                </label>
                <input
                  type="text"
                  required
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="w-full px-3 py-2 font-mono font-bold border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Customer Email
                </label>
                <input
                  type="text"
                  readOnly
                  value={order?.email || 'customer@example.com'}
                  className="w-full px-3 py-2 bg-neutral-50 text-neutral-600 border border-neutral-300 rounded-md"
                />
              </div>
            </div>

            {/* Paste Blob */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-neutral-700 uppercase tracking-wider">
                  Paste Payment Details (Bank, BSB, Acc, PayID, Reference)
                </label>
                <span className="text-[11px] text-neutral-400">Auto-parsed below</span>
              </div>
              <textarea
                rows={7}
                required
                value={paymentBlob}
                onChange={(e) => setPaymentBlob(e.target.value)}
                className="w-full font-mono text-xs p-3 border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Custom Butcher Notes / Dispatch Schedule
              </label>
              <textarea
                rows={2}
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full p-2.5 border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 bg-[#881326] hover:bg-[#721020] text-white font-bold text-xs rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{sending ? 'Sending...' : 'Send Payment Details Email To Customer'}</span>
            </button>
          </form>

          {/* WhatsApp outgoing panel */}
          <div className="pt-4 border-t border-neutral-200">
            <WhatsAppSendPanel
              customerPhone={customerPhone}
              messageText={waMessage}
              title="WhatsApp Customer Reply (Prefilled *Ponde Meats* Header)"
            />
          </div>
        </div>

        {/* Right Column: Live Auto-Parsed Fields Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
              <h3 className="font-bold text-xs text-neutral-900 uppercase tracking-wider">
                Live Auto-Parsed Fields ({parsed.fields.length})
              </h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                parsePaymentDetail()
              </span>
            </div>

            <p className="text-[11px] text-neutral-500 leading-relaxed">
              These are the individual click-to-copy fields the customer will see on their mobile payment page.
            </p>

            <div className="space-y-2">
              {parsed.fields.map((f, i) => (
                <div
                  key={i}
                  className="p-3 bg-white rounded-lg border border-neutral-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                      {f.label}
                    </span>
                    <span className="font-mono font-bold text-neutral-900">{f.value}</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">
                    Copyable
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href={`/order/payment-details/?order=${orderNumber}`}
                target="_blank"
                className="text-xs text-[#881326] hover:underline font-bold block text-center"
              >
                Open Customer-Facing Payment Page Preview →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SendPaymentEmailPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs text-neutral-500">Loading composer...</div>}>
      <SendPaymentEmailContent />
    </Suspense>
  );
}
