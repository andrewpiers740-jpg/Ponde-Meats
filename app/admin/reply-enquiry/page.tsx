'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAdminPasscode } from '@/components/admin/AdminPasscodeContext';
import { EnquiryRecord } from '@/lib/enquiryStore';
import { SITE } from '@/src/config/site';
import { ArrowLeft, Send, CheckCircle, Clock } from 'lucide-react';

function ReplyEnquiryContent() {
  const searchParams = useSearchParams();
  const enquiryId = searchParams.get('id') || 'enq-101';
  const { passcode } = useAdminPasscode();
  const router = useRouter();

  const [enquiry, setEnquiry] = useState<EnquiryRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [replyMessage, setReplyMessage] = useState(
    'Hi, thank you for reaching out to Ponde Meats. We have reviewed your request and would be pleased to provide you with our wholesale delivery schedule and price sheet.'
  );
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEnquiry() {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/enquiries/${enquiryId}/`, {
          headers: { 'x-admin-passcode': passcode },
        });
        if (res.ok) {
          const json = await res.json();
          setEnquiry(json.enquiry);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    loadEnquiry();
  }, [enquiryId, passcode]);

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    setSentSuccess(false);

    try {
      const res = await fetch('/api/admin/reply-enquiry/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode,
        },
        body: JSON.stringify({
          enquiryId,
          replyMessage,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Failed to dispatch reply');
      setSentSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error sending reply');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-xs text-neutral-500">Loading enquiry...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link
        href="/admin/enquiries"
        className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Enquiries</span>
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Compose Customer Reply</h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          Responding to {enquiry?.name || 'Customer'} ({enquiry?.email})
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4 text-xs">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded">
              {error}
            </div>
          )}

          {sentSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <strong>Reply dispatched successfully!</strong>
                <p className="text-[11px] text-emerald-800">
                  Enquiry status marked as &quot;replied&quot;.
                </p>
              </div>
            </div>
          )}

          {enquiry && (
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1.5">
              <span className="font-bold text-neutral-900 block uppercase text-[10px] tracking-wider">
                Original Customer Message ({new Date(enquiry.createdAt).toLocaleDateString('en-AU')}):
              </span>
              <p className="italic text-neutral-700">&ldquo;{enquiry.message}&rdquo;</p>
              {enquiry.phone && <p className="text-neutral-500">Phone: {enquiry.phone}</p>}
            </div>
          )}

          <form onSubmit={handleSendReply} className="space-y-4">
            <div>
              <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Your Butcher Desk Response
              </label>
              <textarea
                rows={6}
                required
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="w-full p-3 border border-neutral-300 rounded-md focus:ring-1 focus:ring-[#881326] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-2.5 bg-[#881326] hover:bg-[#721020] text-white font-bold text-xs rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{sending ? 'Sending...' : 'Send Reply Email'}</span>
            </button>
          </form>
        </div>

        {/* Right Column: Live Email Preview */}
        <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200 space-y-4">
          <h3 className="font-bold text-xs text-neutral-900 uppercase tracking-wider border-b border-neutral-200 pb-2">
            Customer Email Preview (Light Shell)
          </h3>

          <div className="bg-white rounded-lg border border-neutral-200 p-4 shadow-xs space-y-3 text-xs">
            <div className="bg-[#121212] text-white p-3 rounded text-center">
              <span className="font-bold uppercase tracking-wider text-xs block">{SITE.name}</span>
              <span className="text-[10px] text-neutral-400">Wholesale Butcher · Cowirra SA</span>
            </div>

            <p className="font-semibold text-neutral-900">Hello {enquiry?.name || 'Customer'},</p>
            <div className="p-3 bg-neutral-50 border-l-2 border-[#881326] rounded text-neutral-800 whitespace-pre-wrap text-[11px] leading-relaxed">
              {replyMessage}
            </div>
            <p className="text-[10px] text-neutral-400 pt-2 border-t border-neutral-100">
              {SITE.legalName} · 32 Loxton Rd, Cowirra SA 5238 · Phone: {SITE.contact.phoneFormatted}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReplyEnquiryPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs text-neutral-500">Loading...</div>}>
      <ReplyEnquiryContent />
    </Suspense>
  );
}
