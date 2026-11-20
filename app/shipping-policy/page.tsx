import React from 'react';
import Link from 'next/link';
import { SITE } from '@/src/config/site';
import { Snowflake, Truck, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { money } from '@/lib/order';

export default function ShippingPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#121212] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
            Cold-Chain Logistics Standard
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Refrigerated Shipping &amp; Delivery Policy
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300">
            Certified 0–3°C temperature-controlled freight from our Cowirra SA abattoir across South Australia.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-sm text-neutral-700 space-y-8 leading-relaxed">
        {/* Core Freight Rules Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <span className="font-bold text-neutral-900 block text-sm">Minimum Order</span>
            <span className="text-xl font-mono font-bold text-[#881326] mt-1 block">
              {money(SITE.orderRules.minOrder)} AUD
            </span>
            <span className="text-neutral-500 mt-1 block">Required for refrigerated logistics packing.</span>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <span className="font-bold text-neutral-900 block text-sm">Free Delivery Threshold</span>
            <span className="text-xl font-mono font-bold text-emerald-700 mt-1 block">
              {money(SITE.orderRules.freeShippingThreshold)} AUD
            </span>
            <span className="text-neutral-500 mt-1 block">Orders under $1,000 are charged a flat ${SITE.orderRules.flatShippingFee} fee.</span>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <span className="font-bold text-neutral-900 block text-sm">Temperature Guarantee</span>
            <span className="text-xl font-mono font-bold text-rose-700 mt-1 block">
              0°C to 3°C
            </span>
            <span className="text-neutral-500 mt-1 block">Maintained inside refrigerated vans and chill packs.</span>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-3">1. Delivery Zones &amp; Schedule</h2>
          <p className="mb-3">
            Ponde Meats delivers directly from our processing facility at <strong>32 Loxton Rd, Cowirra SA 5238</strong>. We service:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-xs">
            <li><strong>Greater Adelaide Metro &amp; Suburbs:</strong> Tuesday, Thursday, and Friday delivery runs.</li>
            <li><strong>Adelaide Hills &amp; Mount Barker:</strong> Tuesday and Friday delivery runs.</li>
            <li><strong>Murraylands &amp; Riverland Corridor (Murray Bridge, Mannum, Tailem Bend, Berri, Renmark):</strong> Monday, Wednesday, and Friday runs.</li>
            <li><strong>Barossa Valley &amp; Mid North:</strong> Weekly scheduled Thursday refrigerated run.</li>
            <li><strong>Regional SA &amp; Interstate Pallet Freight:</strong> Coordinated through certified refrigerated linehaul carriers (Coldshield / Lindsay Transport).</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-3">2. Packaging Integrity (Cryovac Vacuum Seals)</h2>
          <p>
            All bulk meat cuts, whole carcasses, and primal boxes are vacuum sealed in heavy-duty food-grade barrier bags. This ensures zero leakage, prevents oxidation and bacterial exposure, and allows seamless transfer into domestic or commercial freezers without freezer burn.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-3">3. Delivery Day Procedures &amp; Unattended Deliveries</h2>
          <p className="mb-3">
            Because meat is a strictly temperature-sensitive perishable product:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-xs">
            <li>Drivers will send an SMS notification prior to arrival on your scheduled route.</li>
            <li>If you are not home to accept delivery directly, orders will be placed in a shaded, secure area inside an insulated thermal container with ice gel packs.</li>
            <li>Customers are advised to transfer meat to domestic refrigeration (0–4°C) or freezing (-18°C) within 2 hours of delivery notification.</li>
          </ul>
        </div>

        <div className="p-4 bg-neutral-100 rounded-lg text-xs text-neutral-600">
          For urgent delivery schedule inquiries, contact our Cowirra butcher desk on{' '}
          <a href={`tel:${SITE.contact.phoneRaw}`} className="font-bold text-[#881326] underline">
            {SITE.contact.phoneFormatted}
          </a>{' '}
          or email <a href={`mailto:${SITE.contact.email}`} className="font-bold text-[#881326] underline">{SITE.contact.email}</a>.
        </div>
      </div>
    </div>
  );
}
