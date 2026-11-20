'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyFieldProps {
  label: string;
  value: string;
  highlight?: boolean;
}

export default function CopyField({ label, value, highlight = false }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textArea = document.createElement('textarea');
      textArea.value = value;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      onClick={handleCopy}
      className={`group relative flex items-center justify-between p-3.5 rounded-lg border transition-all cursor-pointer select-all ${
        copied
          ? 'bg-emerald-50/80 border-emerald-300 ring-1 ring-emerald-400'
          : highlight
          ? 'bg-rose-50/40 border-rose-200 hover:border-rose-300 hover:bg-rose-50/70'
          : 'bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/60'
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCopy();
        }
      }}
      aria-label={`Copy ${label}: ${value}`}
    >
      <div className="flex flex-col pr-3 min-w-0">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
          {label}
        </span>
        <span className="font-mono text-sm sm:text-base font-bold text-neutral-900 tracking-tight truncate mt-0.5">
          {value}
        </span>
      </div>

      <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors">
        {copied ? (
          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-xs">
            <Check className="w-3.5 h-3.5" />
            Copied!
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-neutral-500 group-hover:text-neutral-800 bg-neutral-100 group-hover:bg-neutral-200 px-2 py-0.5 rounded text-xs">
            <Copy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tap to copy</span>
          </span>
        )}
      </div>
    </div>
  );
}
