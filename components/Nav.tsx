'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cartContext';
import { SITE } from '@/src/config/site';
import { ShoppingBag, Search, Menu, X, Phone, MessageSquare } from 'lucide-react';
import { money } from '@/lib/order';

export default function Nav() {
  const { itemCount, subtotal, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark with Authentic Logo */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group shrink-0 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#881326] rounded-md"
          >
            <div className="relative w-12 h-12 rounded overflow-hidden border border-neutral-200 bg-white shrink-0 shadow-sm">
              <Image
                src="/images/logo.jpg"
                alt="Ponde Meats Wholesale Butcher Logo"
                fill
                className="object-contain p-0.5"
                priority
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-neutral-900 group-hover:text-[#881326] transition-colors leading-none">
                PONDE MEATS
              </span>
              <span className="text-[11px] font-semibold tracking-wider text-neutral-500 uppercase mt-1">
                WHOLESALE BUTCHER · SA
              </span>
            </div>
          </Link>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-700">
            <Link
              href="/shop"
              className="hover:text-[#881326] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
            >
              Shop All
            </Link>
            <Link
              href="/shop/beef"
              className="hover:text-[#881326] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
            >
              Beef
            </Link>
            <Link
              href="/shop/lamb"
              className="hover:text-[#881326] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
            >
              Lamb
            </Link>
            <Link
              href="/shop/goat"
              className="hover:text-[#881326] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
            >
              Boer Goat
            </Link>
            <Link
              href="/shop/mutton"
              className="hover:text-[#881326] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
            >
              Mutton
            </Link>
            <Link
              href="/wholesale"
              className="hover:text-[#881326] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 font-semibold text-neutral-900"
            >
              Wholesale
            </Link>
            <Link
              href="/about"
              className="hover:text-[#881326] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
            >
              About Cowirra
            </Link>
            <Link
              href="/#faq"
              className="hover:text-[#881326] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#881326] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
            >
              Contact
            </Link>
          </nav>

          {/* Zone 3: 1 Primary Action Area */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search link */}
            <Link
              href="/search"
              aria-label="Search meat catalog"
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Quick WhatsApp chat */}
            <a
              href={`https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(`Hi ${SITE.name}, I'd like to ask about placing a wholesale meat order.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md hover:bg-emerald-100 transition-colors whitespace-nowrap shrink-0"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            {/* Primary Action: Cart Button with count & subtotal */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 px-4 py-2 bg-[#881326] hover:bg-[#721020] text-white rounded-md font-medium text-sm transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0"
              aria-label={`View Cart (${itemCount} items)`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="font-semibold">{itemCount}</span>
              {itemCount > 0 && (
                <span className="hidden sm:inline border-l border-rose-900/60 pl-2 text-rose-100 font-mono text-xs">
                  {money(subtotal)}
                </span>
              )}
            </button>

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3 font-medium text-neutral-800 text-base">
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-neutral-100 hover:text-[#881326]"
            >
              Shop All Products
            </Link>
            <div className="grid grid-cols-2 gap-2 py-1 pl-2">
              <Link
                href="/shop/beef"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-sm text-neutral-600 hover:text-[#881326]"
              >
                🥩 Prime Beef
              </Link>
              <Link
                href="/shop/lamb"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-sm text-neutral-600 hover:text-[#881326]"
              >
                🍖 Pasture Lamb
              </Link>
              <Link
                href="/shop/goat"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-sm text-neutral-600 hover:text-[#881326]"
              >
                🐐 Boer Goat
              </Link>
              <Link
                href="/shop/mutton"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-sm text-neutral-600 hover:text-[#881326]"
              >
                🥘 Prime Mutton
              </Link>
            </div>
            <Link
              href="/wholesale"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-neutral-100 text-[#881326] font-semibold"
            >
              Wholesale &amp; Carcasses
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-neutral-100 hover:text-[#881326]"
            >
              About Cowirra Facility
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-neutral-100 hover:text-[#881326]"
            >
              Butcher Guides &amp; Cuts
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-neutral-100 hover:text-[#881326]"
            >
              Frequently Asked Questions (FAQ)
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-neutral-100 hover:text-[#881326]"
            >
              Contact &amp; Location
            </Link>
            <Link
              href="/order-tracking"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-neutral-100 hover:text-[#881326]"
            >
              Track Cold-Chain Order
            </Link>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`tel:${SITE.contact.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-neutral-100 rounded-md font-medium text-sm text-neutral-800"
              >
                <Phone className="w-4 h-4" />
                <span>Call {SITE.contact.phoneFormatted}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
