'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cartContext';
import { SITE } from '@/src/config/site';
import { money } from '@/lib/order';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, AlertCircle, Snowflake } from 'lucide-react';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    subtotal,
    discount,
    shipping,
    total,
    isMinOrderMet,
    freeShippingProgress,
    setIsCheckoutOpen,
    discountCode,
    setDiscountCode,
    applyDiscountCode,
    discountCodeApplied,
    discountCodeError,
  } = useCart();

  if (!isCartOpen) return null;

  const minOrderDifference = Math.max(0, SITE.orderRules.minOrder - subtotal);
  const freeShippingDifference = Math.max(0, SITE.orderRules.freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70">
            <div>
              <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                <span>Wholesale Cart</span>
                <span className="text-xs bg-neutral-200 text-neutral-700 font-semibold px-2 py-0.5 rounded-full">
                  {items.reduce((acc, it) => acc + it.quantity, 0)} items
                </span>
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">Cold-chain dispatch from Cowirra SA</p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* Free Shipping & Min Order Notification Bars */}
            <div className="space-y-2">
              {/* Free shipping bar */}
              <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 text-xs">
                <div className="flex items-center justify-between font-medium mb-1.5 text-neutral-700">
                  <span className="flex items-center gap-1.5">
                    <Snowflake className="w-3.5 h-3.5 text-rose-600" />
                    <span>Free Refrigerated Delivery</span>
                  </span>
                  <span className="font-semibold text-neutral-900">
                    {freeShippingDifference === 0
                      ? 'UNLOCKED'
                      : `Add ${money(freeShippingDifference)}`}
                  </span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#881326] h-1.5 transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Min order check */}
              {!isMinOrderMet && (
                <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Minimum wholesale order is {money(SITE.orderRules.minOrder)}.</strong>
                    <p className="text-[11px] text-amber-700 mt-0.5">
                      Please add {money(minOrderDifference)} more meat to proceed to checkout.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Empty state */}
            {items.length === 0 ? (
              <div className="py-16 text-center text-neutral-500">
                <div className="w-16 h-16 mx-auto mb-3 text-neutral-300 bg-neutral-100 rounded-full flex items-center justify-center">
                  🥩
                </div>
                <p className="font-semibold text-neutral-800 text-base">Your cart is empty</p>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                  Browse our grass-fed beef, pasture lamb, Boer goat, and mutton cuts.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-4 py-2 bg-[#881326] text-white rounded text-xs font-semibold hover:bg-[#721020]"
                >
                  Explore Meat Catalog
                </button>
              </div>
            ) : (
              <div className="divide-y divide-neutral-100">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex gap-3.5 items-start">
                    <div className="relative w-16 h-16 rounded border border-neutral-200 bg-white overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-xs text-neutral-900 truncate">
                        {item.name}
                      </h4>
                      {item.variantName && (
                        <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                          {item.variantName}
                        </p>
                      )}
                      <div className="text-xs font-mono font-bold text-[#881326] mt-1">
                        {money(item.price)}
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-neutral-200 rounded">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-neutral-100 text-neutral-600 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-mono font-semibold text-neutral-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-neutral-100 text-neutral-600 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-400 hover:text-rose-600 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-neutral-200 bg-neutral-50/60 space-y-3">
              {/* Coupon / Promo input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Discount code (optional)"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 text-xs border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-[#881326] uppercase"
                />
                <button
                  onClick={() => applyDiscountCode(discountCode)}
                  className="px-3 py-1.5 bg-neutral-800 text-white text-xs font-medium rounded hover:bg-neutral-700 transition-colors"
                >
                  Apply
                </button>
              </div>
              {discountCodeApplied && (
                <div className="text-[11px] text-emerald-700 font-medium">
                  ✓ Code applied! Additional 5% discount activated.
                </div>
              )}
              {discountCodeError && (
                <div className="text-[11px] text-rose-600">{discountCodeError}</div>
              )}

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 text-xs pt-2 border-t border-neutral-200/80">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal:</span>
                  <span className="font-mono text-neutral-800">{money(subtotal)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>5% OSKO / PayID Discount:</span>
                  <span className="font-mono">-{money(discount)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Refrigerated Transport (SA &amp; Interstate):</span>
                  <span className="font-mono">
                    {shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : money(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                  <span>Estimated Total (AUD):</span>
                  <span className="font-mono text-base text-[#881326]">{money(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                disabled={!isMinOrderMet}
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className={`w-full py-3 px-4 rounded-md font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                  isMinOrderMet
                    ? 'bg-[#881326] hover:bg-[#721020] text-white active:scale-98 cursor-pointer'
                    : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                }`}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>OSKO &amp; PayID Accepted · 5% Discount Automatically Applied</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
