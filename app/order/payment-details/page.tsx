'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SITE } from '@/src/config/site';
import { money } from '@/lib/order';
import CopyField from '@/components/CopyField';
import {
  ShieldCheck,
  Snowflake,
  ArrowRight,
  CheckCircle,
  FileText,
  AlertCircle,
  Clock,
  ExternalLink,
} from 'lucide-react';

function PaymentDetailsContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || '32975';

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDetails() {
      try {
        setLoading(true);
        const res = await fetch(`/api/order/payment-details/?order=${orderNumber}`);
        if (!res.ok) throw new Error('Order details could not be retrieved');
        const json = await res.json();
        setData(json);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load details');
      } finally {
        setLoading(false);
      }
    }
    loadDetails();
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="py-24 text-center text-xs text-neutral-500">
        <Clock className="w-6 h-6 animate-spin mx-auto mb-2 text-[#881326]" />
        <span>Loading secure payment instructions...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center">
        <div className="p-6 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs space-y-3">
          <AlertCircle className="w-8 h-8 text-rose-600 mx-auto" />
          <h2 className="font-bold text-sm">Order Payment Details Unavailable</h2>
          <p>{error || 'Please verify your order number or contact our Cowirra butcher desk.'}</p>
          <Link href="/contact" className="text-[#881326] underline font-bold block pt-2">
            Contact Support
          </Link>
        </div>
      </div>
    );
  }

  const { order, parsed } = data;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded">
          Official Payment Instructions
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
          Payment Details for Order #{order.orderNumber}
        </h1>
        <p className="text-xs text-neutral-500 leading-relaxed">
          Tap each field below to copy it directly into your Australian banking app (OSKO) or PayID.
        </p>
      </div>

      {/* Summary Box */}
      <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-5 sm:p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <span className="text-xs text-neutral-500 block">Customer Name</span>
            <span className="font-bold text-neutral-900 text-base">{order.customerName}</span>
          </div>
          <div className="sm:text-right">
            <span className="text-xs text-neutral-500 block">Payment Method</span>
            <span className="font-semibold text-neutral-900 text-sm">
              {order.paymentMethod} (5% Discount Applied)
            </span>
          </div>
        </div>

        <div className="pt-4 flex items-baseline justify-between">
          <div>
            <span className="text-xs text-neutral-500 block">Total Due (AUD):</span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#881326]">
              {money(order.total)}
            </span>
          </div>
          <div className="text-right text-xs text-emerald-700 font-semibold">
            Saved: {money(order.discount)} via Bank Transfer
          </div>
        </div>
      </div>

      {/* CopyField Interactive Grid */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
          Click or Tap To Copy Banking &amp; PayID Details:
        </h2>

        <div className="space-y-2.5">
          {parsed.fields.map((f: { label: string; value: string }, idx: number) => {
            const isReference = f.label.toLowerCase().includes('reference');
            return (
              <CopyField
                key={idx}
                label={f.label}
                value={f.value}
                highlight={isReference}
              />
            );
          })}
        </div>
      </div>

      {/* Important instructions */}
      <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-xl text-xs text-amber-950 space-y-2 mb-8">
        <strong className="block font-bold">Important Transfer Instructions:</strong>
        <p className="leading-relaxed text-[11px] text-amber-900">
          • Please enter <strong>{order.orderNumber}</strong> in the payment description/reference so our automated system matches your order instantly.<br />
          • Once transferred, click the button below to upload your screenshot or notify our dispatch team on WhatsApp.
        </p>
      </div>

      {/* Action CTA to Confirm Payment */}
      <div className="space-y-3">
        <Link
          href={`/order/confirm-payment/?order=${order.orderNumber}`}
          className="w-full py-3.5 px-4 bg-[#881326] hover:bg-[#721020] text-white rounded-lg font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <span>I Have Completed Transfer — Submit Receipt / Screenshot</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <a
          href={`https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(`Hi ${SITE.name}, I have initiated the transfer for Order #${order.orderNumber} (${money(order.total)}). Here is my payment notification.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <span>Send Transfer Receipt via WhatsApp</span>
          <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
        </a>
      </div>
    </div>
  );
}

export default function OrderPaymentDetailsPage() {
  return (
    <div className="bg-white min-h-screen">
      <Suspense fallback={<div className="p-10 text-center text-xs text-neutral-500">Loading payment details...</div>}>
        <PaymentDetailsContent />
      </Suspense>
    </div>
  );
}
