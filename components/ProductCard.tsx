'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/src/config/site';
import { useCart } from '@/lib/cartContext';
import { money } from '@/lib/order';
import {
  ShoppingBag,
  Check,
  ShieldCheck,
  Star,
  ChevronRight,
  Info,
  X,
  Plus,
  Minus,
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addItem, setIsCheckoutOpen } = useCart();
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);

  const defaultVariant = product.variants[0] || {
    id: 'default',
    name: 'Standard',
    price: product.price,
    unit: product.unit,
  };

  const totalPrice = defaultVariant.price * quantity;
  const oskoDiscount = Number((totalPrice * 0.05).toFixed(2));
  const finalPrice = Number((totalPrice - oskoDiscount).toFixed(2));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(
      {
        id: `${product.id}-${defaultVariant.id}`,
        productId: product.id,
        name: product.name,
        variantId: defaultVariant.id,
        variantName: defaultVariant.name,
        price: defaultVariant.price,
        image: product.image,
        unit: product.unit,
      },
      quantity
    );

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <>
      <div className="group bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full">
        <div>
          {/* Product Image Frame */}
          <Link
            href={`/shop/${product.category}/${product.slug}`}
            className="block relative aspect-square w-full bg-white border-b border-neutral-100 p-3 overflow-hidden cursor-pointer"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain p-2 group-hover:scale-102 transition-transform duration-200"
              referrerPolicy="no-referrer"
            />

            {/* Product Badge */}
            {product.badge && (
              <div className="absolute top-2.5 left-2.5 bg-[#881326] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs z-10">
                {product.badge}
              </div>
            )}

            {/* 5-Star Rating Pill Badge */}
            <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs border border-neutral-200/90 px-2 py-0.5 rounded-md flex items-center gap-1 text-[11px] font-bold text-neutral-900 shadow-xs z-10">
              <div className="flex items-center text-[#00B67A]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xs">★</span>
                ))}
              </div>
              <span>5.0</span>
            </div>
          </Link>

          {/* Product Info */}
          <div className="p-4">
            {/* Category & Subcategory breadcrumb */}
            <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 uppercase tracking-wider mb-1 font-semibold">
              <span className="text-[#881326]">{product.category}</span>
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <span>{product.subcategory.replace('-', ' ')}</span>
            </div>

            {/* Title */}
            <Link href={`/shop/${product.category}/${product.slug}`}>
              <h3 className="font-bold text-neutral-900 text-sm group-hover:text-[#881326] transition-colors leading-snug line-clamp-2">
                {product.name}
              </h3>
            </Link>

            {/* 5 Star Rating Row */}
            <div className="flex items-center gap-1.5 mt-1.5 text-[11px]">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-neutral-800">5.0</span>
              <span className="text-neutral-400">({product.reviewCount} verified)</span>
            </div>

            {/* Description */}
            <p className="text-[11px] text-neutral-500 mt-2 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            {/* Merchant Return Policy Indicator Strip */}
            <div className="mt-3 py-1.5 px-2 bg-emerald-50/80 border border-emerald-200/70 rounded-md text-[10px] flex items-center justify-between text-emerald-900">
              <div className="flex items-center gap-1 font-medium truncate">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="truncate">100% Freshness Guarantee · 48h Return Policy</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowReturnModal(true);
                }}
                className="text-emerald-800 underline hover:text-emerald-950 font-bold shrink-0 ml-1 cursor-pointer"
              >
                Policy
              </button>
            </div>
          </div>
        </div>

        {/* Pricing, Quantity Range, and Add to Cart Section */}
        <div className="p-4 pt-0 border-t border-neutral-100 bg-neutral-50/50 mt-2">
          {/* Price Header */}
          <div className="flex items-baseline justify-between py-2.5">
            <div>
              <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-medium">Unit Price</span>
              <span className="text-base font-extrabold font-mono text-neutral-900">
                {money(defaultVariant.price)}
              </span>
              <span className="text-[10px] text-neutral-500 ml-1">/{product.unit.replace('per ', '')}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-emerald-700 font-bold block">
                5% Off with OSKO / PayID
              </span>
              <span className="text-xs font-mono font-bold text-emerald-700">
                {money(finalPrice)}
              </span>
              {quantity > 1 && (
                <span className="text-[10px] text-neutral-400 block font-mono">
                  ({quantity} {product.unit.replace('per ', '')})
                </span>
              )}
            </div>
          </div>

          {/* Interactive Quantity Range Selector */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-[11px] font-medium text-neutral-700 mb-1">
              <span>Quantity Range:</span>
              <span className="font-mono font-bold text-neutral-900">{quantity} {product.unit.replace('per ', '')}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              {/* Stepper Down */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuantity((q) => Math.max(1, q - 1));
                }}
                className="w-8 h-8 rounded border border-neutral-300 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-700 font-bold active:scale-95 cursor-pointer shrink-0"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              {/* Number Input Range */}
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
                onClick={(e) => e.stopPropagation()}
                className="w-full h-8 text-center border border-neutral-300 rounded bg-white font-mono text-xs font-bold text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#881326]"
              />

              {/* Stepper Up */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuantity((q) => Math.min(100, q + 1));
                }}
                className="w-8 h-8 rounded border border-neutral-300 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-700 font-bold active:scale-95 cursor-pointer shrink-0"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Quantity Range Preset Chips */}
            <div className="flex items-center gap-1 mt-1.5 overflow-x-auto pb-0.5">
              {[1, 2, 5, 10, 20].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuantity(preset);
                  }}
                  className={`text-[10px] px-2 py-0.5 rounded font-mono transition-colors cursor-pointer ${
                    quantity === preset
                      ? 'bg-neutral-800 text-white font-bold'
                      : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {preset}kg
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`py-2 px-2.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#881326] hover:bg-[#721020] text-white active:scale-98'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <Link
              href={`/shop/${product.category}/${product.slug}`}
              className="py-2 px-2.5 bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-800 rounded text-xs font-semibold flex items-center justify-center transition-colors text-center"
            >
              <span>View Specs</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Merchant Return Policy Popover Modal */}
      {showReturnModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowReturnModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-neutral-200 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-neutral-200">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-neutral-900 text-base">
                    Ponde Meats Merchant Return Policy
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Australian Consumer Law &amp; Cold-Chain Assurance
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowReturnModal(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Policy Content */}
            <div className="py-4 space-y-3.5 text-xs text-neutral-600 leading-relaxed">
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                <span className="font-bold text-neutral-900 block mb-0.5">
                  100% Cold-Chain Freshness Guarantee
                </span>
                <p>
                  All fresh meat is dispatched in calibrated refrigerated transport at 0°C to 4°C, and frozen cuts at -18°C. If your order arrives outside compliance temperatures, we guarantee immediate resolution.
                </p>
              </div>

              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                <span className="font-bold text-neutral-900 block mb-0.5">
                  48-Hour Inspection &amp; Notice Window
                </span>
                <p>
                  Due to the perishable nature of wholesale meat, please inspect upon arrival and notify our team within 48 hours of delivery regarding any quality discrepancy, weight variation, or packaging damage.
                </p>
              </div>

              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                <span className="font-bold text-neutral-900 block mb-0.5">
                  Immediate Replacement or Full Refund
                </span>
                <p>
                  Confirmed return claims are processed promptly with your choice of free priority replacement on the next cold-chain run, immediate store credit, or direct refund to your OSKO/PayID account.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
              <Link
                href="/refund-policy"
                onClick={() => setShowReturnModal(false)}
                className="text-xs text-[#881326] font-bold hover:underline"
              >
                Read Full Refund Policy →
              </Link>
              <button
                type="button"
                onClick={() => setShowReturnModal(false)}
                className="py-1.5 px-4 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-md"
              >
                Close Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
