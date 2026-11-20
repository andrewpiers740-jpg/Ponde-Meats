'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cartContext';
import { SITE } from '@/src/config/site';
import { money } from '@/lib/order';
import { waOrderLink } from '@/lib/whatsapp';
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  MessageSquare,
  Mail,
  CheckCircle,
  AlertCircle,
  Lock,
} from 'lucide-react';

export default function CheckoutModal() {
  const router = useRouter();
  const {
    items,
    isCheckoutOpen,
    setIsCheckoutOpen,
    subtotal,
    discount,
    shipping,
    total,
    clearCart,
    isMinOrderMet,
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [suburb, setSuburb] = useState('');
  const [state, setState] = useState('SA');
  const [postcode, setPostcode] = useState('');
  const [preferredDeliveryDate, setPreferredDeliveryDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Bank Transfer (OSKO)' | 'PayID'>('Bank Transfer (OSKO)');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = async (channel: 'email' | 'whatsapp') => {
    // Validation
    if (!customerName.trim() || !email.trim() || !phone.trim() || !address.trim() || !suburb.trim() || !postcode.trim()) {
      setErrorMessage('Please complete all required fields: Name, Email, Phone, and Delivery Address.');
      return;
    }

    if (!isMinOrderMet) {
      setErrorMessage(`Minimum order value is ${money(SITE.orderRules.minOrder)}.`);
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    // Generate random 5-digit order number matching format e.g. 32980
    const randomSuffix = Math.floor(10000 + Math.random() * 90000).toString();
    const orderNumber = randomSuffix;

    const payload = {
      formName: 'order',
      orderNumber,
      customerName: customerName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      suburb: suburb.trim(),
      state,
      postcode: postcode.trim(),
      preferredDeliveryDate,
      notes: notes.trim(),
      items: items.map((it) => ({
        id: it.id,
        name: it.name,
        variantName: it.variantName,
        quantity: it.quantity,
        price: it.price,
      })),
      subtotal,
      discount,
      shipping,
      total,
      paymentMethod,
      channel,
    };

    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to record order. Please try again or chat with our butcher desk.');
      }

      // If WhatsApp channel, generate prefilled WhatsApp link with customer greeting "Hi Ponde Meats,"
      if (channel === 'whatsapp') {
        const waLink = waOrderLink({
          orderNumber,
          customerName,
          email,
          phone,
          address,
          suburb,
          state,
          postcode,
          items,
          subtotal,
          discount,
          shipping,
          total,
          paymentMethod,
          notes,
        });
        window.open(waLink, '_blank');
      }

      clearCart();
      setIsCheckoutOpen(false);
      router.push(`/thank-you-order/?order=${orderNumber}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCheckoutOpen(false)}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden my-8">
          {/* Header */}
          <div className="bg-[#121212] text-white p-5 sm:p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-neutral-800 rounded-md text-amber-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold leading-tight">Wholesale Meat Order Checkout</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Direct processing at Cowirra SA Abattoir · Cold-chain delivery
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-md transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 sm:p-7 space-y-6 max-h-[80vh] overflow-y-auto">
            {errorMessage && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider border-b border-neutral-200 pb-2">
                1. Customer &amp; Contact Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Full Name / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. David Henderson"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Email Address * (For Confirmation &amp; Invoice)
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. david@example.com.au"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0412 884 921"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Preferred Delivery Date
                  </label>
                  <input
                    type="date"
                    value={preferredDeliveryDate}
                    onChange={(e) => setPreferredDeliveryDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider border-b border-neutral-200 pb-2">
                2. Cold-Chain Delivery Destination
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 45 King William Street"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">Suburb *</label>
                  <input
                    type="text"
                    required
                    value={suburb}
                    onChange={(e) => setSuburb(e.target.value)}
                    placeholder="e.g. Adelaide"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">State *</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none bg-white"
                  >
                    <option value="SA">South Australia (SA)</option>
                    <option value="VIC">Victoria (VIC)</option>
                    <option value="NSW">New South Wales (NSW)</option>
                    <option value="QLD">Queensland (QLD)</option>
                    <option value="WA">Western Australia (WA)</option>
                    <option value="TAS">Tasmania (TAS)</option>
                    <option value="ACT">ACT</option>
                    <option value="NT">Northern Territory (NT)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">Postcode *</label>
                  <input
                    type="text"
                    required
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="e.g. 5000"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Butcher Cutting &amp; Delivery Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Cut steaks to 300g thickness, bone and roll lamb shoulders, gate code 1234."
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  3. Payment Method (5% Wholesale Discount Included)
                </h3>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  5% DISCOUNT APPLIED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() => setPaymentMethod('Bank Transfer (OSKO)')}
                  className={`p-3.5 rounded-lg border cursor-pointer flex items-start gap-3 transition-all ${
                    paymentMethod === 'Bank Transfer (OSKO)'
                      ? 'border-[#881326] bg-rose-50/50 ring-1 ring-[#881326]'
                      : 'border-neutral-200 hover:border-neutral-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'Bank Transfer (OSKO)'}
                    onChange={() => setPaymentMethod('Bank Transfer (OSKO)')}
                    className="mt-0.5 text-[#881326] focus:ring-[#881326]"
                  />
                  <div>
                    <span className="block text-xs font-bold text-neutral-900">
                      Bank Transfer (OSKO)
                    </span>
                    <span className="block text-[11px] text-neutral-500 mt-0.5">
                      Direct BSB &amp; Account Number transfer. Instant clearance via OSKO.
                    </span>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod('PayID')}
                  className={`p-3.5 rounded-lg border cursor-pointer flex items-start gap-3 transition-all ${
                    paymentMethod === 'PayID'
                      ? 'border-[#881326] bg-rose-50/50 ring-1 ring-[#881326]'
                      : 'border-neutral-200 hover:border-neutral-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'PayID'}
                    onChange={() => setPaymentMethod('PayID')}
                    className="mt-0.5 text-[#881326] focus:ring-[#881326]"
                  />
                  <div>
                    <span className="block text-xs font-bold text-neutral-900">PayID</span>
                    <span className="block text-[11px] text-neutral-500 mt-0.5">
                      Fast mobile/ABN PayID clearance. Simple, instant, zero card fees.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Order Review Box */}
            <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 text-xs space-y-2">
              <h4 className="font-bold text-neutral-900 text-xs mb-1">Order Items ({items.length}):</h4>
              <div className="max-h-28 overflow-y-auto divide-y divide-neutral-200/60 pr-1">
                {items.map((it) => (
                  <div key={it.id} className="py-1.5 flex justify-between">
                    <span className="truncate pr-2">
                      {it.quantity}x {it.name} {it.variantName ? `(${it.variantName})` : ''}
                    </span>
                    <span className="font-mono shrink-0">{money(it.price * it.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-neutral-200 space-y-1">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal:</span>
                  <span className="font-mono">{money(subtotal)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>5% Discount ({paymentMethod}):</span>
                  <span className="font-mono">-{money(discount)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Refrigerated Delivery:</span>
                  <span className="font-mono">
                    {shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : money(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-neutral-900 pt-1.5 border-t border-neutral-200">
                  <span>Total Due (AUD):</span>
                  <span className="font-mono text-base text-[#881326]">{money(total)}</span>
                </div>
              </div>
            </div>

            {/* Submit Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Channel 1: Place Order (Email invoice) */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleSubmitOrder('email')}
                  className="py-3 px-4 bg-[#881326] hover:bg-[#721020] text-white rounded-md font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 cursor-pointer disabled:opacity-50"
                >
                  <Mail className="w-4 h-4" />
                  <span>{loading ? 'Processing...' : 'Place Order & Get Invoice'}</span>
                </button>

                {/* Channel 2: Order via WhatsApp */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleSubmitOrder('whatsapp')}
                  className="py-3 px-4 bg-[#075E54] hover:bg-[#128C7E] text-white rounded-md font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 cursor-pointer disabled:opacity-50"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{loading ? 'Processing...' : 'Order via WhatsApp'}</span>
                </button>
              </div>

              <p className="text-[11px] text-neutral-500 text-center leading-relaxed">
                Whichever button you press, your order is secured and a confirmation email is dispatched immediately. You will receive official OSKO/PayID transfer instructions to complete payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
