import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE } from '@/src/config/site';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: `Message Received – ${SITE.name}`,
  robots: { index: false, follow: true },
};

export default function ThankYouContactPage() {
  return (
    <div className="bg-white min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center space-y-4">
        <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
        <h1 className="text-2xl font-bold text-neutral-900">Message Received</h1>
        <p className="text-xs text-neutral-600 leading-relaxed">
          Thank you for reaching out to Ponde Meats. Our Cowirra butcher desk will get back to you shortly.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="px-5 py-2.5 bg-[#881326] text-white rounded text-xs font-semibold hover:bg-[#721020]"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
