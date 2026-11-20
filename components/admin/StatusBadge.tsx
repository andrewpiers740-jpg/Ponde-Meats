'use client';

import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  let colorClass = 'bg-neutral-100 text-neutral-800 border-neutral-200';

  switch (status.toLowerCase()) {
    case 'pending payment':
      colorClass = 'bg-amber-50 text-amber-800 border-amber-200';
      break;
    case 'payment sent':
      colorClass = 'bg-sky-50 text-sky-800 border-sky-200';
      break;
    case 'payment confirmed':
      colorClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      break;
    case 'preparing dispatch':
      colorClass = 'bg-purple-50 text-purple-800 border-purple-200';
      break;
    case 'dispatched':
      colorClass = 'bg-indigo-50 text-indigo-800 border-indigo-200';
      break;
    case 'delivered':
      colorClass = 'bg-teal-50 text-teal-800 border-teal-200';
      break;
    case 'cancelled':
      colorClass = 'bg-rose-50 text-rose-800 border-rose-200';
      break;
    case 'new':
      colorClass = 'bg-blue-50 text-blue-800 border-blue-200';
      break;
    case 'replied':
      colorClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      break;
    default:
      colorClass = 'bg-neutral-100 text-neutral-800 border-neutral-200';
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${colorClass}`}
    >
      {status}
    </span>
  );
}
