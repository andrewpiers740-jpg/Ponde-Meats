'use client';

import React from 'react';
import Link from 'next/link';
import { SITE } from '@/src/config/site';
import { ShieldCheck, Snowflake, Percent, Truck } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-[#121212] text-white border-b border-neutral-800 text-xs py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
        {/* Left highlight */}
        <div className="flex items-center gap-4 text-neutral-300">
          <div className="flex items-center gap-1.5 font-medium">
            <Snowflake className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="whitespace-nowrap">SA Cold-Chain Delivery (0–3°C)</span>
          </div>
          <span className="hidden sm:inline text-neutral-600" aria-hidden="true">·</span>
          <div className="hidden sm:flex items-center gap-1.5 text-neutral-300">
            <Truck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="whitespace-nowrap">Free Shipping Over ${SITE.orderRules.freeShippingThreshold} (Min Order ${SITE.orderRules.minOrder})</span>
          </div>
        </div>

        {/* Right promotion */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <Percent className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="whitespace-nowrap">5% Off Bank Transfer &amp; PayID</span>
          </div>
          <span className="text-neutral-600" aria-hidden="true">·</span>
          <Link
            href="/wholesale"
            className="text-neutral-300 hover:text-white underline underline-offset-2 transition-colors whitespace-nowrap"
          >
            Wholesale Accounts
          </Link>
        </div>
      </div>
    </div>
  );
}
