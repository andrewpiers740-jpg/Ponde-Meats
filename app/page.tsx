'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE, CATEGORIES, PRODUCTS } from '@/src/config/site';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/lib/cartContext';
import { money } from '@/lib/order';
import TrustpilotWidget from '@/components/TrustpilotWidget';
import HomeFaq from '@/components/HomeFaq';
import {
  ArrowRight,
  ShieldCheck,
  Snowflake,
  Percent,
  CheckCircle,
  Truck,
  ExternalLink,
  Phone,
  MessageSquare,
} from 'lucide-react';

export default function HomePage() {
  const { addItem, setIsCheckoutOpen } = useCart();

  // Featured spotlight products: premium steaks, whole portions, and roasts across all categories
  const featuredProducts = [
    PRODUCTS.find((p) => p.id === 'lamb-backstraps'),
    PRODUCTS.find((p) => p.id === 'lamb-french-cutlets'),
    PRODUCTS.find((p) => p.id === 'beef-tomahawk-steaks'),
    PRODUCTS.find((p) => p.id === 'beef-t-bones'),
    PRODUCTS.find((p) => p.id === 'beef-tenderloin-long-fillet'),
    PRODUCTS.find((p) => p.id === 'goat-bone-in-curry-pieces'),
    PRODUCTS.find((p) => p.id === 'mutton-chump-steaks'),
    PRODUCTS.find((p) => p.id === 'mutton-boneless-netted-leg'),
  ].filter(Boolean) as typeof PRODUCTS;

  return (
    <div className="flex flex-col min-h-screen">
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-[#121212] text-white overflow-hidden border-b border-neutral-800">
        {/* Subtle background glow/overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-800/40 via-neutral-950 to-black pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Regional Authority Kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
                <span>Cowirra, South Australia</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span>Licensed Abattoir Facility</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span className="font-mono text-neutral-300">ABN {SITE.abn}</span>
              </div>

              {/* Exactly ONE <h1> for the page */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
                South Australia’s Premier Wholesale &amp; Bulk Butcher
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl font-normal">
                Direct from our Cowirra processing facility to your kitchen. Grass-fed beef, pasture-raised lamb, Australian Boer goat, and prime mutton — available in single cuts, freezer packs, and whole custom-hung carcasses.
              </p>

              {/* Key Trust Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 pb-4 text-xs text-neutral-300 border-y border-neutral-800/80">
                <div className="flex items-center gap-2">
                  <Snowflake className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Chilled 0–3°C Cold Chain</span>
                </div>
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>5% Off OSKO &amp; PayID</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free Freight Over $1,000</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/shop"
                  className="px-6 py-3.5 bg-[#881326] hover:bg-[#721020] text-white font-semibold text-sm rounded-md shadow-lg shadow-rose-950/40 flex items-center gap-2 transition-all active:scale-95 whitespace-nowrap"
                >
                  <span>Explore Wholesale Shop</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/wholesale"
                  className="px-6 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-sm rounded-md border border-neutral-700 flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  <span>Carcass &amp; Trade Inquiries</span>
                </Link>

                <a
                  href={`https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(`Hi ${SITE.name}, I would like to inquire about ordering bulk meat and whole carcasses.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 text-emerald-400 hover:text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Butcher Desk</span>
                </a>
              </div>
            </div>

            {/* Right Media Spotlight (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl p-3 sm:p-4">
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white">
                  <Image
                    src="/images/products/mixed_meat_box_1795106913441.jpg"
                    alt="Ponde Meats Wholesale Bulk Meat Box"
                    fill
                    className="object-contain p-2"
                    priority
                    referrerPolicy="no-referrer"
                  />
                  {/* Quality Seal Tag */}
                  <div className="absolute top-3 left-3 bg-[#121212]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded border border-neutral-700">
                    DIRECT FROM COWIRRA SA
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#881326] text-white text-xs font-bold px-3 py-1.5 rounded shadow-md">
                    FROM $145 PER BOX
                  </div>
                </div>

                <div className="mt-4 px-2 text-neutral-300 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block text-sm">Wholesale Master Packs</span>
                    <span className="text-neutral-400">Cryovac sealed, labelled &amp; ready for freezer</span>
                  </div>
                  <Link
                    href="/shop"
                    className="text-amber-400 hover:underline font-semibold flex items-center gap-1 text-xs"
                  >
                    <span>View Boxes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES SECTION ================= */}
      <section className="py-16 bg-[#FBF9F5] border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#881326] mb-1">
                South Australian Livestock
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                Shop By Livestock Category
              </h2>
            </div>
            <p className="text-xs text-neutral-600 max-w-md leading-relaxed">
              Available as individual primal cuts, mixed freezer cartons, or whole carcasses hung to order and portion-packed by hand.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop/${cat.id}`}
                className="group bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative aspect-4/3 w-full bg-white border-b border-neutral-100 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-neutral-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {cat.name}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#881326] transition-colors">
                      {cat.name} Cuts &amp; Boxes
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                      {cat.tagline}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-[#881326]">
                    <span>View Cuts &amp; Carcasses</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS SPOTLIGHT ================= */}
      <section className="py-16 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#881326] mb-1">
                Direct From The Butcher Block
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                Featured Bulk Meat &amp; Carcass Specials
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-bold text-[#881326] hover:text-[#721020] flex items-center gap-1 hover:underline"
            >
              <span>View All {PRODUCTS.length} Wholesale Items</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= 1500+ TRUSTPILOT INTEGRATION ================= */}
      <TrustpilotWidget />

      {/* ================= COLD CHAIN & COWIRRA SA FACILITY ================= */}
      <section className="py-16 bg-[#121212] text-white border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">
                Murraylands &amp; Riverland Corridor
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4 text-balance">
                Fresh From 32 Loxton Rd, Cowirra SA
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                Ponde Meats operates a fully licensed South Australian meat processing and wholesale facility located in Cowirra SA (ABN 42 395 857 236). We source directly from local Fleurieu, Murraylands, and Riverland pastures, bypassing major grocery distribution centers.
              </p>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-[#881326] rounded text-white shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white">Full Carcass Customization:</strong>
                    <p className="text-neutral-400 mt-0.5">
                      Order a whole or half carcass of beef, lamb, goat, or mutton. Our butchers cut, portion, cryovac-pack, and label every piece to your household or restaurant requirements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-[#881326] rounded text-white shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white">Strict Cold-Chain Temperature Logs:</strong>
                    <p className="text-neutral-400 mt-0.5">
                      Every order travels in certified refrigerated freight held constantly at 0–3°C, ensuring optimal tenderness and freshness on delivery.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-[#881326] rounded text-white shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white">Transparent Australian Pricing:</strong>
                    <p className="text-neutral-400 mt-0.5">
                      All prices in AUD including GST. Instant 5% discount for Bank Transfer (OSKO) and PayID, with zero hidden booking or merchant fees.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="px-5 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-xs font-semibold border border-neutral-700 flex items-center gap-1.5 transition-colors"
                >
                  <span>Learn About Our Facility</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/contact"
                  className="px-5 py-3 bg-[#881326] hover:bg-[#721020] text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>Contact Our Butcher Desk</span>
                </Link>
              </div>
            </div>

            {/* Facility specs card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6">
              <h3 className="font-bold text-base text-white border-b border-neutral-800 pb-3">
                Processing &amp; Delivery Standards
              </h3>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-neutral-950/60 rounded border border-neutral-800/80">
                  <span className="text-neutral-500 block">Facility Location</span>
                  <span className="font-bold text-white mt-1 block">Cowirra, SA 5238</span>
                </div>
                <div className="p-3 bg-neutral-950/60 rounded border border-neutral-800/80">
                  <span className="text-neutral-500 block">Delivery Range</span>
                  <span className="font-bold text-white mt-1 block">All South Australia &amp; Freight</span>
                </div>
                <div className="p-3 bg-neutral-950/60 rounded border border-neutral-800/80">
                  <span className="text-neutral-500 block">Temperature Range</span>
                  <span className="font-bold text-rose-400 mt-1 block">0°C to 3°C Verified</span>
                </div>
                <div className="p-3 bg-neutral-950/60 rounded border border-neutral-800/80">
                  <span className="text-neutral-500 block">Packaging</span>
                  <span className="font-bold text-white mt-1 block">Heavy-Duty Cryovac</span>
                </div>
              </div>

              <div className="p-4 bg-neutral-950 rounded border border-neutral-800 text-xs space-y-2">
                <span className="font-semibold text-amber-400 block">Need a Custom Wholesale Quote?</span>
                <p className="text-neutral-400 leading-relaxed text-[11px]">
                  For restaurants, commercial caterers, supermarkets, and export enquiries, we offer bulk carton pricing and scheduled refrigerated route deliveries.
                </p>
                <div className="pt-1">
                  <Link
                    href="/wholesale"
                    className="inline-flex items-center gap-1 text-white hover:text-amber-300 font-bold text-xs underline"
                  >
                    <span>Submit Wholesale Application</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FREQUENTLY ASKED QUESTIONS ================= */}
      <HomeFaq />

      {/* ================= REGULATORY AUTHORITIES STRIP ================= */}
      <section className="py-12 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#881326] mb-1">
              Food Safety &amp; Industry Standards
            </h2>
            <p className="text-sm font-bold text-neutral-900">
              Compliant with Leading Australian Red Meat Authorities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
            {SITE.authorities.map((auth) => (
              <a
                key={auth.acronym}
                href={auth.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-neutral-50 hover:bg-neutral-100 rounded-lg border border-neutral-200 transition-colors flex flex-col justify-between group"
              >
                <div>
                  <span className="font-bold text-xs text-neutral-900 group-hover:text-[#881326] transition-colors block">
                    {auth.acronym}
                  </span>
                  <span className="text-[10px] text-neutral-500 line-clamp-2 mt-1">
                    {auth.name}
                  </span>
                </div>
                <div className="mt-2 text-[10px] text-neutral-400 group-hover:text-neutral-700 flex items-center justify-center gap-0.5">
                  <span>Visit</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
