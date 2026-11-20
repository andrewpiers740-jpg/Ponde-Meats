import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE } from '@/src/config/site';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: `Wholesale Application Received – ${SITE.name}`,
  robots: { index: false, follow: true },
};

export default function ThankYouWholesalePage() {
  return (
    <div className="bg-white min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center space-y-4">
        <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
        <h1 className="text-2xl font-bold text-neutral-900">Wholesale Application Received</h1>
        <p className="text-xs text-neutral-600 leading-relaxed">
          Thank you for applying for a commercial wholesale account with Ponde Meats. Our wholesale manager will email your personalized price schedule and delivery timetable.
        </p>
        <div className="pt-2">
          <Link
            href="/shop"
            className="px-5 py-2.5 bg-[#881326] text-white rounded text-xs font-semibold hover:bg-[#721020]"
          >
            Explore Wholesale Cuts
          </Link>
        </div>
      </div>
    </div>
  );
}
