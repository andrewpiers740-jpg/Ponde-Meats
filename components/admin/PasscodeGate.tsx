'use client';

import React, { useState } from 'react';
import { useAdminPasscode } from './AdminPasscodeContext';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { SITE } from '@/src/config/site';

export default function PasscodeGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, checking, login } = useAdminPasscode();
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (checking) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-xs text-neutral-400">
        Checking access…
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim().length === 0) {
      setError(true);
      return;
    }
    setSubmitting(true);
    const ok = await login(inputCode);
    setSubmitting(false);
    if (!ok) setError(true);
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm bg-neutral-950 border border-neutral-800 rounded-xl p-7 shadow-2xl text-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-[#881326] rounded-lg">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-wide">{SITE.name}</h1>
            <p className="text-xs text-neutral-400">Reply Portal &amp; Butcher Hub</p>
          </div>
        </div>

        <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
          Authorized personnel only. Enter the secure administrator passcode to manage wholesale orders, reply to customer inquiries, and dispatch OSKO/PayID payment details.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Staff Passcode
            </label>
            <input
              type="password"
              required
              autoFocus
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value);
                setError(false);
              }}
              placeholder="Enter admin passcode"
              className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-md text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#881326] focus:border-[#881326]"
            />
          </div>

          {error && (
            <p className="text-xs text-rose-400">
              Invalid passcode. Please enter the correct admin passcode.
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 px-4 bg-[#881326] hover:bg-[#721020] text-white font-semibold text-xs rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Unlock Admin Hub</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Server-Gated · X-Admin-Passcode Verification</span>
        </div>
      </div>
    </div>
  );
}
