'use client';

import React, { useState } from 'react';
import { SITE } from '@/src/config/site';
import { MessageCircle, X, Phone, Mail, MapPin, ExternalLink, Clock } from 'lucide-react';

export default function ChatHub() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="bg-[#121212] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#881326] flex items-center justify-center font-bold text-xs text-white">
                PM
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Ponde Meats Desk</h4>
                <p className="text-[11px] text-neutral-400">Cowirra SA Butcher &amp; Dispatch</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-neutral-400 hover:text-white rounded transition-colors"
              aria-label="Close chat menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Channels */}
          <div className="p-4 space-y-2.5 text-xs">
            {/* WhatsApp Link with mandatory Hi Ponde Meats, greeting */}
            <a
              href={`https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(`Hi ${SITE.name}, I am inquiring about wholesale butcher orders and refrigerated delivery.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-emerald-950 font-medium transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">💬</span>
                <div>
                  <span className="font-bold block">Chat on WhatsApp</span>
                  <span className="text-[11px] text-emerald-800">
                    Instant reply from our butcher team
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Direct Phone */}
            <a
              href={`tel:${SITE.contact.phoneRaw}`}
              className="flex items-center justify-between p-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg text-neutral-900 font-medium transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#881326]" />
                <div>
                  <span className="font-bold block">Call Butcher Desk</span>
                  <span className="text-[11px] text-neutral-500">{SITE.contact.phoneFormatted}</span>
                </div>
              </div>
              <span className="text-[11px] text-neutral-500 font-medium">Free Call</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${SITE.contact.email}`}
              className="flex items-center justify-between p-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg text-neutral-900 font-medium transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-neutral-600" />
                <div>
                  <span className="font-bold block">Email Inquiries</span>
                  <span className="text-[11px] text-neutral-500">{SITE.contact.email}</span>
                </div>
              </div>
            </a>

            {/* Abattoir info */}
            <div className="pt-2 border-t border-neutral-100 text-[11px] text-neutral-500 space-y-1">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <span>32 Loxton Rd, Cowirra SA 5238</span>
              </div>
              <div className="flex items-start gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <span>Mon–Fri: 6am–4:30pm · Sat: 7am–12pm</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-[#881326] hover:bg-[#721020] text-white p-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#881326]"
        aria-label="Open butcher support desk"
      >
        <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline text-xs font-semibold pr-1">Need Meat Advice?</span>
      </button>
    </div>
  );
}
