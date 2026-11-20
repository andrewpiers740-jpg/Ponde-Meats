import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/src/config/site';
import { ShieldCheck, Snowflake, CheckCircle } from 'lucide-react';

export const metadata: Metadata = { title: 'Freshness Guarantee', description: 'Ponde Meats cold-chain freshness guarantee: temperature-verified delivery with replacement or refund if your order arrives compromised.', alternates: { canonical: '/warranty' } };
export default function WarrantyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#121212] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
            Quality Assurance Policy
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Freshness &amp; Cold-Chain Warranty
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300">
            Our 100% butcher freshness and temperature guarantee on all livestock cuts.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-sm text-neutral-700 space-y-8 leading-relaxed">
        <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
          <div className="flex items-center gap-2 font-bold text-emerald-950 text-base">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>The Ponde Meats Freshness Promise</span>
          </div>
          <p className="text-xs text-emerald-800 leading-relaxed">
            If any cut of beef, lamb, Boer goat, or mutton does not meet your culinary expectations for freshness or arrives outside certified cold-chain temperature thresholds, we will replace the item or issue an immediate credit note.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">1. Temperature Guarantee on Arrival</h2>
          <p>
            We warrant that every vacuum-sealed delivery dispatched from Cowirra SA arrives in unbroken refrigerated transport at a verified internal core temperature between 0°C and 4°C.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">2. Vacuum Packaging Integrity</h2>
          <p>
            All products are inspected on packing tables for vacuum barrier integrity. In the rare event that a bone puncturing a vacuum seal occurs during freight transit, the meat remains completely safe if chilled; however, our team will gladly provide replacement bags or credit upon prompt notification.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">3. Lodging a Freshness Claim</h2>
          <p>
            Claims must be reported within 24 hours of delivery by emailing photos of the product and thermal reading to{' '}
            <a href={`mailto:${SITE.contact.email}`} className="text-[#881326] underline font-bold">
              {SITE.contact.email}
            </a>{' '}
            or contacting our butcher desk on <strong>{SITE.contact.phoneFormatted}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
