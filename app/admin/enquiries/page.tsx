'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAdminPasscode } from '@/components/admin/AdminPasscodeContext';
import { EnquiryRecord } from '@/lib/enquiryStore';
import StatusBadge from '@/components/admin/StatusBadge';
import { Trash2, MessageSquare, Reply, Building } from 'lucide-react';

export default function AdminEnquiriesPage() {
  const { passcode } = useAdminPasscode();
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchEnquiries = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/admin/enquiries/', {
          headers: { 'x-admin-passcode': passcode },
        });
        if (active && res.ok) {
          const data = await res.json();
          setEnquiries(data.enquiries || []);
        }
      } catch {
        // ignore
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchEnquiries();
    return () => {
      active = false;
    };
  }, [passcode]);

  const handleDelete = async (id: string) => {
    if (!confirm(`Delete enquiry ${id}?`)) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${id}/`, {
        method: 'DELETE',
        headers: { 'x-admin-passcode': passcode },
      });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
      }
    } catch {
      // ignore
    }
  };

  const filtered = enquiries.filter((e) => {
    if (filterType !== 'all' && e.type !== filterType) return false;
    if (filterStatus !== 'all' && e.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Customer &amp; Wholesale Enquiries</h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          Review incoming questions, wholesale trade applications, and compose email replies.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-neutral-600 mr-1">Type:</span>
          {['all', 'wholesale', 'contact'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1 rounded-md capitalize transition-colors ${
                filterType === t
                  ? 'bg-[#881326] text-white font-semibold'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-neutral-600 mr-1">Status:</span>
          {['all', 'new', 'replied'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 rounded-md capitalize transition-colors ${
                filterStatus === st
                  ? 'bg-neutral-900 text-white font-semibold'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Grid / List */}
      <div className="space-y-3">
        {filtered.map((enq) => (
          <div
            key={enq.id}
            className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-neutral-300 transition-colors"
          >
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-neutral-900 truncate">
                  {enq.name} {enq.businessName ? `(${enq.businessName})` : ''}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    enq.type === 'wholesale'
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-neutral-100 text-neutral-700'
                  }`}
                >
                  {enq.type}
                </span>
                <StatusBadge status={enq.status} />
              </div>

              <div className="text-xs text-neutral-500 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>Email: <a href={`mailto:${enq.email}`} className="text-[#881326] underline">{enq.email}</a></span>
                {enq.phone && <span>Phone: {enq.phone}</span>}
                <span>Date: {new Date(enq.createdAt).toLocaleDateString('en-AU')}</span>
              </div>

              <p className="text-xs text-neutral-700 line-clamp-2 mt-2 leading-relaxed">
                &ldquo;{enq.message}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
              <Link
                href={`/admin/reply-enquiry/?id=${enq.id}`}
                className="px-3.5 py-1.5 bg-[#881326] hover:bg-[#721020] text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Reply className="w-3.5 h-3.5" />
                <span>Compose Reply</span>
              </Link>
              <button
                onClick={() => handleDelete(enq.id)}
                className="p-1.5 text-neutral-400 hover:text-rose-600 transition-colors"
                aria-label="Delete enquiry"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
