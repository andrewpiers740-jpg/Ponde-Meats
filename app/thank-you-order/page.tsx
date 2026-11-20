import React, { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE } from '@/src/config/site';
import { CheckCircle, Mail, ArrowRight, Clock, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: `Order Received – ${SITE.name}`,
  robots: { index: false, follow: true },
};

function ThankYouOrderContent({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
        <CheckCircle className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
          Order Successfully Received
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
          Thank You For Your Wholesale Order
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md mx-auto">
          Our Cowirra SA abattoir team has received your order and queued it for cold-chain scheduling.
        </p>
      </div>

      {/* Mandatory Rule: DO NOT show bank details, deadline, or WA screenshot request — only 'watch for payment-details email' */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 text-left space-y-3">
        <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
          <Mail className="w-4 h-4 text-[#881326]" />
          <span>Please Watch Your Email For Official Payment Details</span>
        </div>
        <p className="text-xs text-neutral-600 leading-relaxed">
          We have sent an order confirmation to your email address. Our accounts desk will review your order items and dispatch your official Bank Transfer (OSKO) and PayID details, including your instant 5% discount deduction.
        </p>
        <p className="text-xs text-neutral-500">
          Once your payment details email arrives, you can complete the transfer directly from your banking app.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/shop"
          className="w-full sm:w-auto px-6 py-2.5 bg-[#881326] hover:bg-[#721020] text-white rounded-md text-xs font-semibold transition-colors"
        >
          Return to Meat Catalog
        </Link>
        <Link
          href="/about"
          className="w-full sm:w-auto px-6 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-md text-xs font-semibold transition-colors"
        >
          About Our Facility
        </Link>
      </div>
    </div>
  );
}

export default async function ThankYouOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  return (
    <div className="bg-white min-h-[70vh] flex items-center justify-center">
      <Suspense fallback={<div className="p-10 text-center text-xs text-neutral-500">Loading order receipt...</div>}>
        <ThankYouOrderContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
