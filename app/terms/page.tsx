import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/src/config/site';

export const metadata: Metadata = { title: 'Terms & Conditions', description: 'Terms and conditions for ordering wholesale meat from Ponde Meats in Cowirra SA, including payment, delivery and cold-chain rules.', alternates: { canonical: '/terms' } };
export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#121212] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
            Commercial &amp; Consumer Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Terms and Conditions
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300">
            {SITE.legalName} · ABN {SITE.abn} · Cowirra SA 5238
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-sm text-neutral-700 space-y-8 leading-relaxed">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">1. Company Details &amp; Application</h2>
          <p>
            These terms and conditions govern all sales of fresh beef, lamb, Boer goat, and mutton products by <strong>{SITE.legalName}</strong> (ABN{' '}
            <a href={SITE.abnLink} target="_blank" rel="noopener noreferrer" className="text-[#881326] underline font-mono">
              {SITE.abn}
            </a>
            ) operating from 32 Loxton Rd, Cowirra SA 5238 to commercial wholesale clients and bulk household consumers.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">2. Minimum Orders &amp; Pricing</h2>
          <p className="mb-2">
            The minimum order value for processing and cold-chain refrigerated delivery is <strong>${SITE.orderRules.minOrder} AUD</strong>. All prices quoted on pondemeats.com include Australian Goods and Services Tax (GST) where applicable.
          </p>
          <p>
            Customers paying via direct Bank Transfer (OSKO) or PayID automatically receive an instant 5% discount on product subtotals, which is reflected at checkout and on invoices.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">3. Carcass Hanging Weights &amp; Yields</h2>
          <p>
            Whole carcasses and side cuts are sold based on hung abattoir weight specifications. Custom butcher portioning, bone trimming, and packaging are provided to client instruction. Due to the natural biology of pasture livestock, natural variations of +/- 5% in hung weight are standard industry tolerance.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">4. Payment &amp; Clearance Terms</h2>
          <p>
            Orders are scheduled for boning room preparation and cold-chain vehicle loading upon receipt or verification of electronic funds transfer (OSKO or PayID). Official banking details are issued via email and our secure online payment portal upon order submission.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">5. Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of South Australia and the Commonwealth of Australia, under the jurisdiction of the courts of South Australia.
          </p>
        </div>
      </div>
    </div>
  );
}
