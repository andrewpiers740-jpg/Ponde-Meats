'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, CATEGORIES, Product } from '@/src/config/site';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/lib/cartContext';
import { money } from '@/lib/order';
import { Search, Filter, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function ShopIndexPage() {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedSubcategory !== 'all' && p.subcategory !== selectedSubcategory) return false;
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return b.reviewCount - a.reviewCount;
    });
  }, [selectedCategory, selectedSubcategory, searchQuery, sortBy]);

  return (
    <div className="bg-white min-h-screen">
      {/* Category Header Banner */}
      <div className="bg-[#121212] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
                Wholesale Butcher Catalog · Cowirra SA
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Wholesale Meat &amp; Whole Carcasses
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-2xl leading-relaxed">
                Order prime grass-fed beef, pasture-raised lamb, Boer goat, and prime mutton direct from our South Australian facility. Fresh chilled cold-chain delivery.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs text-neutral-300">
              <span className="bg-neutral-800 border border-neutral-700 px-3 py-1.5 rounded-md">
                Min. Order: <strong>$200 AUD</strong>
              </span>
              <span className="bg-[#881326] text-white px-3 py-1.5 rounded-md font-semibold">
                5% Off with OSKO / PayID
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls Toolbar: Search, Filters, Sort */}
        <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search cuts, boxes, carcasses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#881326]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end md:self-auto text-xs text-neutral-600">
              <span className="whitespace-nowrap font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'popular' | 'price-asc' | 'price-desc')}
                className="px-3 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#881326]"
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-200/80">
            <span className="text-xs font-bold text-neutral-700 mr-1">Category:</span>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSubcategory('all');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#881326] text-white shadow-xs'
                  : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              All Livestock ({PRODUCTS.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedSubcategory('all');
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#881326] text-white shadow-xs'
                    : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Subcategory Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold text-neutral-700 mr-1">Cut Type:</span>
            {[
              { id: 'all', label: 'All Cuts' },
              { id: 'single-cuts', label: 'Single Cuts' },
              { id: 'meat-boxes', label: 'Meat Boxes' },
              { id: 'whole-carcasses', label: 'Whole & Half Carcasses' },
              { id: 'mixed-cuts', label: 'Mixed Packs' },
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubcategory(sub.id)}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  selectedSubcategory === sub.id
                    ? 'bg-neutral-900 text-white font-semibold'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-neutral-500 bg-neutral-50 rounded-xl border border-neutral-200">
            <p className="text-base font-bold text-neutral-800">No meat cuts found</p>
            <p className="text-xs text-neutral-500 mt-1">
              Try adjusting your search terms or filter selection.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSubcategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#881326] text-white rounded text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
