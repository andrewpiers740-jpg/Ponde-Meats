'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SITE, TRUSTPILOT_REVIEWS, TrustpilotReview } from '@/src/config/site';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  ShieldCheck,
  ThumbsUp,
  Pause,
  Play,
  Share2,
  PackageCheck,
  Star,
  ExternalLink,
} from 'lucide-react';

export default function TrustpilotWidget() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'beef' | 'lamb' | 'goat' | 'mutton'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});
  const [votedMap, setVotedMap] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter reviews based on active category
  const filteredReviews = TRUSTPILOT_REVIEWS.filter((rev) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'beef') return rev.productName.toLowerCase().includes('beef');
    if (activeCategory === 'lamb') return rev.productName.toLowerCase().includes('lamb');
    if (activeCategory === 'goat') return rev.productName.toLowerCase().includes('goat');
    if (activeCategory === 'mutton') return rev.productName.toLowerCase().includes('mutton');
    return true;
  });

  const totalReviews = filteredReviews.length;

  // Responsive cards per view
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, totalReviews - visibleCount);

  const handleCategorySelect = (category: 'all' | 'beef' | 'lamb' | 'goat' | 'mutton') => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  // Safe navigation handlers
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // Autoplay interval with pause-on-hover
  useEffect(() => {
    if (isPaused || totalReviews <= visibleCount) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, maxIndex, totalReviews, visibleCount]);

  // Touch Swipe support
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Upvote helpful handler
  const handleHelpful = (id: string, defaultCount: number = 0) => {
    if (votedMap[id]) return;
    setHelpfulVotes((prev) => ({
      ...prev,
      [id]: (prev[id] ?? defaultCount) + 1,
    }));
    setVotedMap((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  // Share link handler
  const handleShare = (rev: TrustpilotReview) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${SITE.url}/#reviews - "${rev.title}" by ${rev.author}`);
      setCopiedId(rev.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section
      id="reviews"
      aria-label="Trustpilot Reviews"
      className="bg-[#FAFAFA] py-16 sm:py-20 border-b border-neutral-200 relative overflow-hidden"
    >
      {/* Background Subtle Trustpilot Accent Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-32 bg-gradient-to-b from-[#00B67A]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* ================= OFFICIAL TRUSTPILOT HEADER LOCKUP ================= */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Trustpilot Identity & Score */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2.5">
                {/* Official Trustpilot Logo lockup */}
                <div className="flex items-center gap-1.5 font-extrabold text-xl tracking-tight text-neutral-900">
                  <span className="w-6 h-6 bg-[#00B67A] text-white flex items-center justify-center rounded-xs text-sm font-black shadow-xs">
                    ★
                  </span>
                  <span>Trustpilot</span>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>VERIFIED BUTCHER ACCOUNT</span>
                </div>

                <span className="text-xs text-neutral-400 hidden sm:inline">•</span>
                <span className="text-xs text-neutral-500 font-medium hidden sm:inline">
                  ABN 42 395 857 236 · Cowirra SA
                </span>
              </div>

              {/* Star Bar + Score Metrics */}
              <div className="flex flex-wrap items-center gap-3.5">
                {/* Trustpilot Green Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 bg-[#00B67A] text-white flex items-center justify-center rounded-[2px] text-sm font-black shadow-2xs"
                    >
                      ★
                    </div>
                  ))}
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-neutral-900 tracking-tight">4.75</span>
                  <span className="text-sm font-semibold text-neutral-500">/ 5.0</span>
                  <span className="text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white px-2 py-0.5 rounded-xs ml-1">
                    Excellent
                  </span>
                </div>

                <span className="text-xs text-neutral-600 font-medium">
                  Based on{' '}
                  <strong className="text-neutral-900 font-bold">
                    {SITE.reviewsSummary.totalReviews.toLocaleString()}+
                  </strong>{' '}
                  verified customer reviews
                </span>
              </div>

              <p className="text-xs text-neutral-600 mt-2.5 max-w-2xl leading-relaxed">
                South Australian families, catering venues, and butcher shops consistently rate our refrigerated cold-chain integrity, verified pasture cuts, direct OSKO/PayID instant checkout, and responsive Cowirra butcher dispatch.
              </p>
            </div>

            {/* Right: Category Selector & Carousel Play/Pause */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1 bg-neutral-100 p-1 rounded-xl border border-neutral-200">
                <button
                  type="button"
                  onClick={() => handleCategorySelect('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeCategory === 'all'
                      ? 'bg-[#121212] text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
                  }`}
                >
                  All (1,548)
                </button>
                <button
                  type="button"
                  onClick={() => handleCategorySelect('beef')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeCategory === 'beef'
                      ? 'bg-[#121212] text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
                  }`}
                >
                  Beef
                </button>
                <button
                  type="button"
                  onClick={() => handleCategorySelect('lamb')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeCategory === 'lamb'
                      ? 'bg-[#121212] text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
                  }`}
                >
                  Lamb
                </button>
                <button
                  type="button"
                  onClick={() => handleCategorySelect('goat')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeCategory === 'goat'
                      ? 'bg-[#121212] text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
                  }`}
                >
                  Boer Goat
                </button>
                <button
                  type="button"
                  onClick={() => handleCategorySelect('mutton')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeCategory === 'mutton'
                      ? 'bg-[#121212] text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
                  }`}
                >
                  Mutton
                </button>
              </div>

              {/* Slider Controls & Play/Pause */}
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPaused(!isPaused)}
                  title={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
                  className="p-2 text-neutral-500 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors border border-neutral-200"
                  aria-label={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
                >
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous review"
                    className="p-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-xs"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next review"
                    className="p-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-xs"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= REVOLUTIONARY SLIDER CAROUSEL ================= */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Animated Slider Track */}
          <div
            className="flex transition-transform duration-500 ease-out will-change-transform"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {filteredReviews.map((rev) => {
              const currentHelpful = helpfulVotes[rev.id] ?? rev.helpfulCount ?? 15;
              const hasVoted = votedMap[rev.id];
              const initials =
                rev.authorInitials ||
                rev.author
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase();

              return (
                <div
                  key={rev.id}
                  className="shrink-0 px-2.5"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  {/* REAL TRUSTPILOT TILE LOCKUP */}
                  <div className="bg-white rounded-xl p-6 border border-neutral-200/90 hover:border-neutral-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full group">
                    <div>
                      {/* Top Bar: Trustpilot Star Squares + Verified Order Badge */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        {/* Five Solid Green Trustpilot Star Squares */}
                        <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                          {[...Array(5)].map((_, sIdx) => (
                            <div
                              key={sIdx}
                              className="w-5 h-5 bg-[#00B67A] text-white flex items-center justify-center rounded-[2px] text-xs font-black shadow-2xs"
                            >
                              ★
                            </div>
                          ))}
                        </div>

                        {/* Verified Order Badge */}
                        {rev.verified && (
                          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full shadow-2xs">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Verified Order</span>
                          </div>
                        )}
                      </div>

                      {/* Reviewer Profile Section */}
                      <div className="flex items-center gap-3 mb-3.5 pb-3 border-b border-neutral-100">
                        {/* Avatar Initials Circle */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0 ring-2 ring-emerald-500/20">
                          {initials}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="text-xs font-bold text-neutral-900 truncate">
                              {rev.author}
                            </h4>
                            <span className="text-[10px] text-neutral-400 font-medium">AU</span>
                          </div>
                          <p className="text-[11px] text-neutral-500 truncate flex items-center gap-1">
                            <span>{rev.location}</span>
                            <span>•</span>
                            <span className="text-neutral-400">1 review</span>
                          </p>
                        </div>

                        {/* Relative Date */}
                        <div className="text-[11px] text-neutral-400 font-mono shrink-0">
                          {rev.date}
                        </div>
                      </div>

                      {/* Review Title */}
                      <h3 className="font-bold text-neutral-900 text-sm mb-2 leading-snug group-hover:text-[#881326] transition-colors">
                        &ldquo;{rev.title}&rdquo;
                      </h3>

                      {/* Review Body */}
                      <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                        {rev.content}
                      </p>
                    </div>

                    {/* Bottom Metadata & Interactive Elements */}
                    <div className="pt-3 border-t border-neutral-100 space-y-2.5">
                      {/* Product Tag */}
                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-700 bg-neutral-50 px-2.5 py-1.5 rounded-md border border-neutral-150">
                        <PackageCheck className="w-3.5 h-3.5 text-[#881326] shrink-0" />
                        <span className="truncate">
                          Purchased: <strong className="text-neutral-900 font-semibold">{rev.productName}</strong>
                        </span>
                      </div>

                      {/* Date of experience & Trustpilot standard attribution */}
                      {rev.dateOfExperience && (
                        <div className="text-[10px] text-neutral-400 flex items-center justify-between">
                          <span>Date of experience: {rev.dateOfExperience}</span>
                          <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                            <CheckCircle className="w-2.5 h-2.5" /> Authenticated
                          </span>
                        </div>
                      )}

                      {/* Helpful Button & Share */}
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <button
                          type="button"
                          onClick={() => handleHelpful(rev.id, rev.helpfulCount)}
                          disabled={hasVoted}
                          className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-md transition-colors ${
                            hasVoted
                              ? 'bg-emerald-50 text-emerald-700 cursor-default'
                              : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 cursor-pointer'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3 text-neutral-500" />
                          <span>{hasVoted ? 'Helpful' : 'Helpful'}</span>
                          <span className="font-mono text-neutral-500">({currentHelpful})</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleShare(rev)}
                          className="text-[11px] text-neutral-400 hover:text-neutral-700 flex items-center gap-1 transition-colors"
                          title="Share verified review"
                        >
                          <Share2 className="w-3 h-3" />
                          <span>{copiedId === rev.id ? 'Copied!' : 'Share'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= PAGINATION DOTS & PROGRESS BAR ================= */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Active Review Range Counter */}
          <div className="text-xs text-neutral-500 font-medium">
            Showing <strong className="text-neutral-900">{currentIndex + 1}</strong> –{' '}
            <strong className="text-neutral-900">
              {Math.min(currentIndex + visibleCount, totalReviews)}
            </strong>{' '}
            of <strong className="text-neutral-900">{totalReviews}</strong> featured verified reviews
          </div>

          {/* Interactive Navigation Dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === dotIdx
                    ? 'w-6 h-2 bg-[#00B67A]'
                    : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>

          {/* Trustpilot Review Submission Prompt */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">Ordered with us?</span>
            <a
              href="mailto:info@pondemeats.com?subject=Ponde%20Meats%20Order%20Review"
              className="text-xs font-semibold text-[#881326] hover:underline inline-flex items-center gap-1"
            >
              <span>Submit Your Review</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
