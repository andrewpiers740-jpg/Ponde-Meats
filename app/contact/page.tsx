'use client';

import React, { useState } from 'react';
import { SITE } from '@/src/config/site';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle, ExternalLink } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
          formName: 'contact',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!res.ok) throw new Error('Submission failed');
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error sending message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#121212] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Cowirra SA Abattoir &amp; Customer Support
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Contact Ponde Meats
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Have questions regarding our beef sides, lamb carcasses, custom portioning, or refrigerated delivery schedule? Our butcher desk is here to help.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-50 p-6 sm:p-8 rounded-xl border border-neutral-200">
              <h2 className="text-lg font-bold text-neutral-900 mb-2">Send Us A Message</h2>
              <p className="text-xs text-neutral-500 mb-6">
                Fill in the details below and we will respond promptly by email or phone.
              </p>

              {success ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-3">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h3 className="font-bold text-sm text-emerald-950">Message Sent Successfully</h3>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Thank you for contacting Ponde Meats. A member of our Cowirra butcher desk will be in touch with you shortly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-xs font-semibold text-emerald-800 underline mt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {error && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded text-xs">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. David Henderson"
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. david@example.com.au"
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 0485 901 075"
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Subject</label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Question about whole lamb carcass"
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-neutral-700 mb-1">Your Message *</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please let us know how we can help you..."
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#881326] hover:bg-[#721020] text-white font-semibold text-xs rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Sending Message...' : 'Send Message To Butcher Desk'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Channels & Location (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Contact Cards */}
            <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200 space-y-4">
              <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-200 pb-3">
                Direct Contact Channels
              </h3>

              {/* WhatsApp (with mandatory Hi Ponde Meats, greeting) */}
              <a
                href={`https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(`Hi ${SITE.name}, I would like to speak with a butcher regarding an order.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-emerald-950 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-600 text-white rounded-md">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs block">WhatsApp Direct Chat</span>
                    <span className="text-[11px] text-emerald-800">
                      +61 {SITE.contact.phoneFormatted}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-700" />
              </a>

              {/* Phone */}
              <a
                href={`tel:${SITE.contact.phoneRaw}`}
                className="flex items-center justify-between p-3.5 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-lg text-neutral-900 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#881326] text-white rounded-md">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs block">Telephone</span>
                    <span className="text-[11px] text-neutral-500 font-mono">
                      {SITE.contact.phone} ({SITE.contact.phoneFormatted})
                    </span>
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${SITE.contact.email}`}
                className="flex items-center justify-between p-3.5 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-lg text-neutral-900 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neutral-800 text-white rounded-md">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs block">Email Dispatch</span>
                    <span className="text-[11px] text-neutral-500">{SITE.contact.email}</span>
                  </div>
                </div>
              </a>
            </div>

            {/* Location & Operating Hours */}
            <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200 space-y-4 text-xs text-neutral-700">
              <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-200 pb-3">
                Abattoir Location &amp; Hours
              </h3>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#881326] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block font-semibold">Address:</strong>
                  <span>{SITE.contact.address}, {SITE.contact.suburb} {SITE.contact.state} {SITE.contact.postcode}</span>
                  <span className="block text-[11px] text-neutral-500 mt-0.5">
                    South Australia (Near Murray Bridge / Riverland)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block font-semibold">Opening Hours:</strong>
                  <span>{SITE.contact.hours}</span>
                  <span className="block text-[11px] text-neutral-500 mt-0.5">
                    Sunday: Closed (Live animal resting &amp; cold-chain sanitization)
                  </span>
                </div>
              </div>

              {/* Map embed / location reference */}
              <div className="p-3 bg-neutral-200/60 rounded-lg border border-neutral-300 text-center text-neutral-600 text-xs">
                <span className="font-semibold block text-neutral-800">Cowirra SA Facility Location</span>
                <span className="text-[11px] text-neutral-500">Latitude: -34.9205 · Longitude: 139.3134</span>
                <div className="mt-2">
                  <a
                    href="https://maps.google.com/?q=32+Loxton+Rd+Cowirra+SA+5238"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#881326] font-bold hover:underline"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
