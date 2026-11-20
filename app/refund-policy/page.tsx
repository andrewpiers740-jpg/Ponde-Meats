import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/src/config/site';

export const metadata: Metadata = { title: 'Refund Policy', description: 'Refund and replacement policy for Ponde Meats perishable orders, including the 48-hour inspection window for cold-chain deliveries.', alternates: { canonical: '/refund-policy' } };
export default function RefundPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#121212] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
            Perishable Goods Policy
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Refund and Return Policy
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300">
            Australian Consumer Law compliance for fresh and perishable meat products.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-sm text-neutral-700 space-y-8 leading-relaxed">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">1. Nature of Perishable Goods</h2>
          <p>
            Due to strict Australian public health and biosecurity regulations governing red meat, fresh and frozen perishable products cannot be returned to our boning rooms once delivered and signed for, as custody and thermal logs cannot be reversed.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">2. Replacement &amp; Credit Eligibility</h2>
          <p className="mb-2">
            You are fully entitled to an immediate replacement, credit voucher, or full refund under the following conditions:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-xs">
            <li>The product delivered does not match your ordered livestock category or cutting schedule.</li>
            <li>The meat arrived in damaged or compromised packaging resulting in product contamination.</li>
            <li>Refrigerated delivery was logged above 4°C at the time of delivery.</li>
            <li>Missing items from an order invoice.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">3. Claim Notification Period</h2>
          <p>
            Notification must be made within <strong>24 hours</strong> of delivery. Please take clear photos of the product labels and items in question, and email them to{' '}
            <a href={`mailto:${SITE.contact.email}`} className="text-[#881326] underline font-bold">
              {SITE.contact.email}
            </a>{' '}
            or send them via WhatsApp to <strong>{SITE.contact.phoneFormatted}</strong>.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">4. Processing of Refunds</h2>
          <p>
            Approved refunds are returned via the original payment method (Bank Transfer or PayID) within 1–2 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
