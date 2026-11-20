'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { PRODUCTS, SITE, ProductVariant } from '@/src/config/site';
import { useCart } from '@/lib/cartContext';
import { money } from '@/lib/order';
import { waLinkTo } from '@/lib/whatsapp';
import {
  ArrowLeft,
  ShieldCheck,
  Snowflake,
  Truck,
  CheckCircle,
  MessageSquare,
  ShoppingBag,
  Percent,
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const categorySlug = params?.category as string;

  const product = PRODUCTS.find(
    (p) => (p.slug === slug || p.id === slug) && (!categorySlug || p.category === categorySlug)
  );

  if (!product) {
    notFound();
  }

  const { addItem, setIsCheckoutOpen } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || { id: 'default', name: 'Standard', price: product.price, unit: product.unit }
  );
  const [quantity, setQuantity] = useState(1);

  const currentPrice = selectedVariant.price;
  const oskoDiscount = Number((currentPrice * 0.05).toFixed(2));
  const finalPrice = Number((currentPrice - oskoDiscount).toFixed(2));

  const handleAddToCart = () => {
    addItem(
      {
        id: `${product.id}-${selectedVariant.id}`,
        productId: product.id,
        name: product.name,
        variantId: selectedVariant.id,
        variantName: selectedVariant.name,
        price: selectedVariant.price,
        image: product.image,
        unit: product.unit,
      },
      quantity
    );
  };

  const handleWhatsAppOrder = () => {
    const text = `Hi ${SITE.name},

I would like to order:
*${product.name}*
• Selection: ${selectedVariant.name}
• Quantity: ${quantity}
• Total: ${money(currentPrice * quantity)} (less 5% with OSKO/PayID = ${money(finalPrice * quantity)})

Could you please confirm availability and provide transfer instructions for refrigerated delivery? Thank you!`;

    window.open(waLinkTo(SITE.contact.whatsapp, text), '_blank');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="bg-neutral-50 border-b border-neutral-200 py-3 px-4 sm:px-6 lg:px-8 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-neutral-900">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/shop" className="hover:text-neutral-900">Shop</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/shop/${product.category}`} className="capitalize hover:text-neutral-900">{product.category}</Link>
          <span aria-hidden="true">/</span>
          <span className="text-neutral-900 font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Product Imagery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square w-full rounded-2xl bg-white border border-neutral-200 p-6 sm:p-10 overflow-hidden shadow-xs">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-contain p-4"
                referrerPolicy="no-referrer"
              />

              {product.badge && (
                <div className="absolute top-4 left-4 bg-[#881326] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded shadow-sm">
                  {product.badge}
                </div>
              )}

              {product.halalCertified && (
                <div className="absolute top-4 right-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded shadow-xs flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Halal Accredited</span>
                </div>
              )}
            </div>

            {/* Quality assurance bar */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs text-neutral-600 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
              <div>
                <span className="font-bold text-neutral-900 block">Vacuum Sealed</span>
                <span className="text-[11px] text-neutral-500">Commercial Cryovac</span>
              </div>
              <div className="border-x border-neutral-200">
                <span className="font-bold text-neutral-900 block">Temperature Log</span>
                <span className="text-[11px] text-neutral-500">Chilled 0–3°C</span>
              </div>
              <div>
                <span className="font-bold text-neutral-900 block">South Australia</span>
                <span className="text-[11px] text-neutral-500">Cowirra Processing</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Livestock category tag */}
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#881326] mb-2">
                <span>{product.category}</span>
                <span aria-hidden="true" className="text-neutral-400">·</span>
                <span>{product.subcategory.replace('-', ' ')}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Trustpilot Score Badge */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 bg-[#00B67A] text-white flex items-center justify-center rounded-xs text-[10px]"
                    >
                      ★
                    </div>
                  ))}
                </div>
                <span className="text-xs font-bold text-neutral-900">5.0 / 5.0</span>
                <span className="text-xs text-neutral-500">
                  ({product.reviewCount} verified Trustpilot reviews)
                </span>
              </div>
            </div>

            {/* Price Box with 5% OSKO/PayID calculation */}
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-neutral-500 block">Standard Price</span>
                  <span className="text-3xl font-extrabold font-mono text-neutral-900">
                    {money(currentPrice)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-700 font-bold block">
                    With 5% Bank / PayID Discount:
                  </span>
                  <span className="text-xl font-bold font-mono text-emerald-700">
                    {money(finalPrice)}
                  </span>
                  <span className="text-[10px] text-neutral-500 block">
                    (Save {money(oskoDiscount)})
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-neutral-500 mt-2 pt-2 border-t border-neutral-200/80">
                All prices AUD GST inclusive. Minimum wholesale order $200. Free cold-chain freight over $1,000.
              </p>
            </div>

            {/* Variant / Size Options */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Select Cut / Packaging Size:
              </label>
              <div className="grid grid-cols-1 gap-2">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#881326] bg-rose-50/50 ring-1 ring-[#881326]'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white'
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-xs text-neutral-900 block">
                          {v.name}
                        </span>
                        {v.weightKg && (
                          <span className="text-[11px] text-neutral-500">
                            Approx weight: {v.weightKg}kg
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs font-bold text-neutral-900">
                        {money(v.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Range Stepper & Quick Preset Chips */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-800 mb-2">
                  <span>Select Quantity Range:</span>
                  <span className="font-mono text-sm font-extrabold text-[#881326]">
                    {quantity} {product.unit.replace('per ', '')} ({money(currentPrice * quantity)})
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-neutral-300 rounded-lg bg-white shadow-xs">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 text-sm font-bold active:scale-95 cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val) && val >= 1) {
                          setQuantity(Math.min(100, val));
                        }
                      }}
                      className="w-14 text-center font-mono font-bold text-xs text-neutral-900 border-x border-neutral-200 py-2 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(100, quantity + 1))}
                      className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 text-sm font-bold active:scale-95 cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Quick Quantity Range Preset Chips */}
                  <div className="flex items-center gap-1.5 overflow-x-auto">
                    {[1, 2, 5, 10, 20, 50].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setQuantity(preset)}
                        className={`text-xs px-2.5 py-1.5 rounded-md font-mono transition-all cursor-pointer ${
                          quantity === preset
                            ? 'bg-[#881326] text-white font-bold shadow-xs'
                            : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                        }`}
                      >
                        {preset}kg
                      </button>
                    ))}
                  </div>
                </div>

                {/* Range Slider */}
                <div className="mt-3">
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={Math.min(50, quantity)}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full accent-[#881326] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                    <span>1kg</span>
                    <span>10kg</span>
                    <span>25kg</span>
                    <span>50kg</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-3 px-4 bg-[#881326] hover:bg-[#721020] text-white rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Wholesale Cart ({money(currentPrice * quantity)})</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="w-full sm:w-auto py-3 px-4 bg-[#075E54] hover:bg-[#128C7E] text-white rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Order via WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Merchant Return Policy Section */}
            <div className="border border-emerald-200 bg-emerald-50/50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs text-emerald-950 uppercase tracking-wider">
                    Ponde Meats Merchant Return Policy
                  </h3>
                  <p className="text-[11px] text-emerald-800">
                    100% Cold-Chain Freshness Guarantee &amp; Australian Consumer Law Protection
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-emerald-900 pt-1">
                <div className="bg-white/80 p-2.5 rounded-lg border border-emerald-100">
                  <strong className="block text-emerald-950 font-bold mb-0.5">48-Hour Notice Window:</strong>
                  Inspect delivery upon arrival; report any temperature discrepancy or cut variation within 48 hours.
                </div>
                <div className="bg-white/80 p-2.5 rounded-lg border border-emerald-100">
                  <strong className="block text-emerald-950 font-bold mb-0.5">Instant Refund / Replacement:</strong>
                  Full priority replacement on next run, store credit, or 100% refund directly to your OSKO/PayID.
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-emerald-200/60">
                <span className="text-emerald-800 font-medium">Licensed under PrimeSafe &amp; FSANZ</span>
                <Link href="/refund-policy" className="text-[#881326] font-bold hover:underline">
                  Full Return Policy &amp; Terms →
                </Link>
              </div>
            </div>

            {/* Butcher Specs Accordion / Details */}
            <div className="border-t border-neutral-200 pt-6 space-y-4">
              <h3 className="font-bold text-xs text-neutral-900 uppercase tracking-wider">
                Butcher Specifications &amp; Cold-Chain
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-neutral-50 rounded border border-neutral-200">
                  <span className="text-[10px] text-neutral-500 block">Livestock Origin</span>
                  <span className="font-semibold text-neutral-900">{product.specs.origin}</span>
                </div>
                <div className="p-2.5 bg-neutral-50 rounded border border-neutral-200">
                  <span className="text-[10px] text-neutral-500 block">Feed Regime</span>
                  <span className="font-semibold text-neutral-900">{product.specs.feedType}</span>
                </div>
                <div className="p-2.5 bg-neutral-50 rounded border border-neutral-200">
                  <span className="text-[10px] text-neutral-500 block">Packaging</span>
                  <span className="font-semibold text-neutral-900">{product.specs.packaging}</span>
                </div>
                <div className="p-2.5 bg-neutral-50 rounded border border-neutral-200">
                  <span className="text-[10px] text-neutral-500 block">Temperature Storage</span>
                  <span className="font-semibold text-neutral-900">{product.specs.storage}</span>
                </div>
              </div>

              {product.specs.hungWeightKg && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900">
                  <strong>Carcass Yield Note:</strong> {product.specs.hungWeightKg}. Custom butcher cutting schedule (steak thickness, roast boning, sausage mincing) confirmed upon order.
                </div>
              )}
            </div>

            {/* Long description prose */}
            <div className="border-t border-neutral-200 pt-6">
              <h3 className="font-bold text-xs text-neutral-900 uppercase tracking-wider mb-2">
                Product Details
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {product.longDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
