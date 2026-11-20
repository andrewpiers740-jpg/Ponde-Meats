import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE } from '@/src/config/site';

export const metadata: Metadata = {
  title: `Page Not Found – ${SITE.name}`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-white">
      <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-2xl mb-4">
        🥩
      </div>
      <h1 className="text-3xl font-extrabold text-neutral-900 mb-2">404 – Cut Not Found</h1>
      <p className="text-xs text-neutral-500 max-w-sm mb-6 leading-relaxed">
        The page or product cut you are searching for does not exist or may have been relocated.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="px-5 py-2.5 bg-[#881326] text-white rounded text-xs font-semibold hover:bg-[#721020]"
        >
          Return Home
        </Link>
        <Link
          href="/shop"
          className="px-5 py-2.5 bg-neutral-100 text-neutral-800 rounded text-xs font-semibold hover:bg-neutral-200"
        >
          Browse Shop
        </Link>
      </div>
    </div>
  );
}
