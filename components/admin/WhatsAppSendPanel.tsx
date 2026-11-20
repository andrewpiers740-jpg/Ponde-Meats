'use client';

import React, { useState } from 'react';
import { ExternalLink, Copy, Check, MessageSquare } from 'lucide-react';
import { waLinkTo } from '@/lib/whatsapp';

interface WhatsAppSendPanelProps {
  customerPhone: string;
  messageText: string;
  title?: string;
}

export default function WhatsAppSendPanel({
  customerPhone,
  messageText,
  title = 'Send via WhatsApp to Customer',
}: WhatsAppSendPanelProps) {
  const [copied, setCopied] = useState(false);

  const cleanPhone = customerPhone.replace(/[^0-9]/g, '');
  // Convert standard Australian 04... to 614...
  const intlPhone = cleanPhone.startsWith('0') ? '61' + cleanPhone.substring(1) : cleanPhone;
  const link = waLinkTo(intlPhone, messageText);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(messageText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
          <span>{title}</span>
        </h4>
        <span className="text-[11px] font-mono text-emerald-800 font-semibold">
          {customerPhone}
        </span>
      </div>

      <div className="p-3 bg-white rounded border border-emerald-200/80 text-xs font-mono text-neutral-800 max-h-36 overflow-y-auto whitespace-pre-wrap leading-relaxed">
        {messageText}
      </div>

      <div className="flex items-center gap-2 pt-1">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-3 bg-[#075E54] hover:bg-[#128C7E] text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Open in WhatsApp</span>
        </a>

        <button
          onClick={handleCopy}
          className="py-2 px-3 bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-300 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Message</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
