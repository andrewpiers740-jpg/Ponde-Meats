'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SITE } from '@/src/config/site';
import { waCustomerPaymentConfirmationLink } from '@/lib/whatsapp';
import { CheckCircle, Upload, ArrowRight, MessageSquare, ShieldCheck, Clock } from 'lucide-react';

function ConfirmPaymentContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || '32975';

  const [customerName, setCustomerName] = useState('');
  const [receiptNote, setReceiptNote] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/order/confirm-payment/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber,
          customerName: customerName.trim(),
          receiptNote: receiptNote.trim(),
          receiptFileName: fileName,
        }),
      });

      if (!res.ok) throw new Error('Failed to record confirmation');
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error confirming payment');
    } finally {
      setLoading(false);
    }
  };

  const waLink = waCustomerPaymentConfirmationLink(orderNumber, customerName || 'Customer');

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
          Order Verification
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
          Confirm Payment for Order #{orderNumber}
        </h1>
        <p className="text-xs text-neutral-500 leading-relaxed">
          Upload your transfer receipt screenshot or transaction ID so our Cowirra SA dispatch team can verify your payment and schedule cold-chain packing.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-4 shadow-xs">
          <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
          <h2 className="text-lg font-bold text-emerald-950">Payment Confirmation Received!</h2>
          <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
            Thank you! Your payment verification note has been forwarded to the accounts desk at Cowirra SA. Your cold-chain refrigerated run is being queued.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/order-tracking/?order=${orderNumber}`}
              className="px-5 py-2.5 bg-neutral-900 text-white rounded text-xs font-semibold hover:bg-neutral-800 transition-colors"
            >
              Track Refrigerated Order
            </Link>
            <Link
              href="/shop"
              className="px-5 py-2.5 bg-white border border-neutral-300 text-neutral-800 rounded text-xs font-semibold hover:bg-neutral-50 transition-colors"
            >
              Return to Shop
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-neutral-50 p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-sm space-y-6">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. David Henderson"
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Upload Transfer Receipt Screenshot (Optional)
              </label>
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center bg-white hover:border-[#881326] transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload className="w-6 h-6 text-neutral-400 mx-auto mb-2" />
                <span className="font-semibold text-neutral-800 block">
                  {fileName ? fileName : 'Click to select bank receipt screenshot or PDF'}
                </span>
                <span className="text-[11px] text-neutral-400 mt-1 block">
                  PNG, JPG, or PDF up to 10MB
                </span>
              </div>
            </div>

            <div>
              <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Transaction Notes or Reference Number
              </label>
              <textarea
                rows={3}
                value={receiptNote}
                onChange={(e) => setReceiptNote(e.target.value)}
                placeholder="e.g. Sent $675.50 via CommBank OSKO at 2:15pm, ref: 32975"
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#881326] hover:bg-[#721020] text-white font-bold text-xs rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Submitting...' : 'Submit Payment Confirmation'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick WhatsApp option */}
          <div className="pt-4 border-t border-neutral-200">
            <span className="text-[11px] text-neutral-500 block text-center mb-2">
              Prefer to send the receipt directly via WhatsApp?
            </span>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Screenshot on WhatsApp (Opens prefilled message)</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ConfirmPaymentPage() {
  return (
    <div className="bg-white min-h-screen">
      <Suspense fallback={<div className="p-10 text-center text-xs text-neutral-500">Loading...</div>}>
        <ConfirmPaymentContent />
      </Suspense>
    </div>
  );
}
