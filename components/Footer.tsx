import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE, CATEGORIES } from '@/src/config/site';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  ExternalLink,
  Snowflake,
  Clock,
  Lock,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-neutral-300 border-t border-neutral-800 text-sm">
      {/* Cold Chain Guarantee Strip */}
      <div className="border-b border-neutral-800 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-neutral-800 text-[#881326] rounded-md shrink-0 border border-neutral-700">
                <Snowflake className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Cold-Chain Guaranteed</h4>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Chilled at 0–3°C from our Cowirra processing floor directly to your door in specialized refrigerated freight.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-neutral-800 text-amber-400 rounded-md shrink-0 border border-neutral-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Licensed Abattoir Facility</h4>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Operated in accordance with PIRSA &amp; FSANZ standards with full traceability on all cattle, sheep &amp; goats.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-neutral-800 text-emerald-400 rounded-md shrink-0 border border-neutral-700">
                <span className="font-bold text-xs">OSKO</span>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">5% Instant Bank Discount</h4>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Direct Bank Transfer (OSKO) and PayID qualify for an automatic 5% wholesale discount deducted at checkout.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-neutral-800 text-rose-400 rounded-md shrink-0 border border-neutral-700">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Fresh Paddock-to-Plate</h4>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  No extended supermarket warehouse holding. Processed, portion-cut and vacuum-sealed to order.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Identity & ABN */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded bg-white overflow-hidden p-0.5 border border-neutral-700 shrink-0">
                <Image
                  src="/images/logo.jpg"
                  alt="Ponde Meats"
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-wider block">PONDE MEATS</span>
                <span className="text-xs text-neutral-400">WHOLESALE BUTCHER · SOUTH AUSTRALIA</span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mb-4">
              South Australia’s premier wholesale meat specialist. Providing grass-fed beef, pasture-raised lamb, Australian Boer goat, and prime mutton to families, restaurants, and retail butchers.
            </p>

            <div className="text-xs text-neutral-400 space-y-1.5 mb-5">
              <p>
                <strong className="text-neutral-200">ABN:</strong>{' '}
                <a
                  href={SITE.abnLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline inline-flex items-center gap-1 font-mono"
                >
                  {SITE.abn}
                  <ExternalLink className="w-3 h-3" />
                </a>{' '}
                (Registered Australian Entity)
              </p>
              <p>
                <strong className="text-neutral-200">Facility:</strong> {SITE.contact.address}, {SITE.contact.suburb} {SITE.contact.state} {SITE.contact.postcode}
              </p>
              <p>
                <strong className="text-neutral-200">Hours:</strong> {SITE.contact.hours}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <a
                href={`tel:${SITE.contact.phoneRaw}`}
                className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-rose-400" />
                <span>{SITE.contact.phoneFormatted}</span>
              </a>
              <span className="text-neutral-600">·</span>
              <a
                href={`mailto:${SITE.contact.email}`}
                className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-rose-400" />
                <span>{SITE.contact.email}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Shop Categories */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
              Meat Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/shop/beef" className="hover:text-white transition-colors">
                  Grass-Fed Beef
                </Link>
              </li>
              <li>
                <Link href="/shop/lamb" className="hover:text-white transition-colors">
                  Pasture Prime Lamb
                </Link>
              </li>
              <li>
                <Link href="/shop/goat" className="hover:text-white transition-colors">
                  Australian Boer Goat
                </Link>
              </li>
              <li>
                <Link href="/shop/mutton" className="hover:text-white transition-colors">
                  Heritage Mutton
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                  Whole &amp; Half Carcasses
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Bulk Meat Freezer Boxes
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Information */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
              Customer &amp; Orders
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/wholesale" className="hover:text-white transition-colors">
                  Wholesale Trade Accounts
                </Link>
              </li>
              <li>
                <Link href="/order-tracking" className="hover:text-white transition-colors">
                  Track Refrigerated Delivery
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Customer Account
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Butcher Guides &amp; Carcass Yields
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Our Cowirra SA Abattoir
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors text-amber-300 font-medium">
                  Frequently Asked Questions (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact &amp; Location Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Regulatory & Policies */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
              Policies &amp; Compliance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/shipping-policy" className="hover:text-white transition-colors">
                  Refrigerated Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white transition-colors">
                  Refund &amp; Return Policy
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-white transition-colors">
                  Freshness &amp; Cold-Chain Warranty
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition-colors">
                  Legal Disclaimer &amp; Meat Standards
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-neutral-500 hover:text-neutral-300 inline-flex items-center gap-1 mt-2 transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Reply Portal</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Meat Regulatory Authorities Strip with Active Outbound Links */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="text-center mb-4">
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              Australian Meat Industry Authorities &amp; Standards Regulators
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-400">
            {SITE.authorities.map((auth) => (
              <a
                key={auth.acronym}
                href={auth.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors inline-flex items-center gap-1 group py-0.5"
                title={`${auth.name}: ${auth.role}`}
              >
                <span>{auth.name}</span>
                <ExternalLink className="w-2.5 h-2.5 text-neutral-500 group-hover:text-rose-400" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom copyright & ABN */}
        <div className="mt-8 pt-6 border-t border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved. ABN{' '}
            <a href={SITE.abnLink} target="_blank" rel="noopener noreferrer" className="hover:underline text-neutral-300 font-mono">
              {SITE.abn}
            </a>
            . 32 Loxton Rd, Cowirra SA 5238.
          </p>
          <div className="flex items-center gap-3">
            <span>Prices in AUD (GST Incl.)</span>
            <span>·</span>
            <span>OSKO &amp; PayID Accepted</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
