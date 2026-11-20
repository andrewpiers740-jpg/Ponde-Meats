'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE, CATEGORIES } from '@/src/config/site';
import { ShieldCheck, Snowflake, Truck, CheckCircle, ArrowRight, Building, Phone, Mail } from 'lucide-react';

export default function WholesalePage() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: 'Restaurant / Bistro',
    volumeWeekly: '50kg - 150kg',
    categoriesInterested: 'Beef & Lamb',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formName: 'wholesale',
          name: formData.contactName,
          businessName: formData.businessName,
          email: formData.email,
          phone: formData.phone,
          categoryInterest: `${formData.businessType} | ${formData.categoriesInterested}`,
          volumeInterest: formData.volumeWeekly,
          message: formData.message || `Wholesale account inquiry for ${formData.businessName}`,
        }),
      });

      if (!res.ok) throw new Error('Submission failed');
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to submit inquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#121212] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400">
              <Building className="w-4 h-4" />
              <span>Commercial Foodservice &amp; Retail Supply</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Wholesale Butchery &amp; Whole Carcasses
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Partner directly with our Cowirra SA abattoir. Supplying Adelaide and regional South Australia with prime beef sides, whole lamb carcasses, Boer goat, and prime mutton.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Wholesale Specs & Benefits (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-3">
                Why Commercial Kitchens &amp; Butchers Partner With Us
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                Whether you operate a boutique bistro in the Adelaide Hills, a steakhouse in the CBD, or a regional supermarket butcher shop, Ponde Meats delivers consistent, pasture-raised livestock with verified cold-chain integrity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <div className="flex items-center gap-2 font-bold text-neutral-900 mb-1">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Custom Butcher Cutting Schedules</span>
                  </div>
                  <p className="text-neutral-500 leading-relaxed">
                    We cut to your exact culinary specifications: steak thickness (e.g. 250g or 350g), whole primal cryovac packing, or boned and rolled roasts.
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <div className="flex items-center gap-2 font-bold text-neutral-900 mb-1">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Side &amp; Whole Carcass Hanging</span>
                  </div>
                  <p className="text-neutral-500 leading-relaxed">
                    Full transparency on hung weights, chilling yield, and trim loss. True wholesale abattoir pricing.
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <div className="flex items-center gap-2 font-bold text-neutral-900 mb-1">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Scheduled Cold-Chain Delivery</span>
                  </div>
                  <p className="text-neutral-500 leading-relaxed">
                    Regular weekly refrigerated transport runs covering Adelaide Metro, Murray Bridge, Riverland, Barossa, and interstate depots.
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <div className="flex items-center gap-2 font-bold text-neutral-900 mb-1">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>5% OSKO / PayID Advantage</span>
                  </div>
                  <p className="text-neutral-500 leading-relaxed">
                    Eliminate 2–3% card merchant fees. Pay direct via OSKO or PayID and receive 5% off invoice totals automatically.
                  </p>
                </div>
              </div>
            </div>

            {/* Carcass Specifications Table */}
            <div>
              <h3 className="text-lg font-bold text-neutral-900 mb-3">
                Carcass Hung Weight &amp; Yield Guidelines
              </h3>
              <div className="overflow-x-auto border border-neutral-200 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-100 text-neutral-700 font-bold border-b border-neutral-200">
                    <tr>
                      <th className="p-3">Category</th>
                      <th className="p-3">Hung Weight</th>
                      <th className="p-3">Standard Yield</th>
                      <th className="p-3">Packaging</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    <tr>
                      <td className="p-3 font-semibold text-neutral-900">Side of Beef</td>
                      <td className="p-3 font-mono">~120kg – 140kg</td>
                      <td className="p-3">Steaks, Roasts, Mince &amp; Trim</td>
                      <td className="p-3">Cryovac Master Cartons</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-neutral-900">Whole Lamb</td>
                      <td className="p-3 font-mono">~22kg – 26kg</td>
                      <td className="p-3">Cutlets, Loin Chops, Shanks, Legs</td>
                      <td className="p-3">Portioned &amp; Labelled</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-neutral-900">Whole Boer Goat</td>
                      <td className="p-3 font-mono">~16kg – 20kg</td>
                      <td className="p-3">Curry pieces or whole spit roast</td>
                      <td className="p-3">Lined Carcass Bag or Packs</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-neutral-900">Whole Prime Mutton</td>
                      <td className="p-3 font-mono">~24kg – 28kg</td>
                      <td className="p-3">Shoulder chops, legs, stew cuts</td>
                      <td className="p-3">Vacuum Sealed Cartons</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Wholesale Inquiry Form (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-50 p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-sm sticky top-28">
              <h3 className="text-base font-bold text-neutral-900 mb-1">
                Open a Wholesale Trade Account
              </h3>
              <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
                Complete the inquiry form below and our Cowirra butcher desk will prepare a tailored price schedule and delivery timetable.
              </p>

              {success ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-3">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-sm text-emerald-950">Inquiry Received</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Thank you! Our wholesale butcher team at Cowirra SA will review your volume requirements and email your wholesale price list within 1 business day.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-xs font-semibold text-emerald-800 underline mt-2"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {error && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded text-xs">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block font-medium text-neutral-700 mb-1">Business Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="e.g. Adelaide Hills Bistro Pty Ltd"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Contact Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="e.g. Julian Croft"
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 0421 990 311"
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-neutral-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. orders@riverlandhospitality.com.au"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Business Type</label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        className="w-full px-2.5 py-2 bg-white border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                      >
                        <option>Restaurant / Bistro</option>
                        <option>Butcher Shop</option>
                        <option>Supermarket</option>
                        <option>Catering / Events</option>
                        <option>Exporter / Distributor</option>
                        <option>Family Bulk Buyer</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Weekly Volume</label>
                      <select
                        value={formData.volumeWeekly}
                        onChange={(e) => setFormData({ ...formData, volumeWeekly: e.target.value })}
                        className="w-full px-2.5 py-2 bg-white border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                      >
                        <option>20kg - 50kg</option>
                        <option>50kg - 150kg</option>
                        <option>150kg - 500kg</option>
                        <option>Whole Carcass (1-3 units)</option>
                        <option>Pallet / Multi-Tonne</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-neutral-700 mb-1">
                      Cuts or Products of Interest
                    </label>
                    <input
                      type="text"
                      value={formData.categoriesInterested}
                      onChange={(e) => setFormData({ ...formData, categoriesInterested: e.target.value })}
                      placeholder="e.g. Tomahawks, French lamb racks, whole goat"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-neutral-700 mb-1">
                      Notes or Delivery Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your delivery frequency or custom cutting requirements..."
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#881326] hover:bg-[#721020] text-white rounded-md font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <span>{loading ? 'Submitting...' : 'Submit Wholesale Application'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
