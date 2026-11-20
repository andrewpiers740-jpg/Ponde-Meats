'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, Product } from '@/src/config/site';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/lib/cartContext';
import { money } from '@/lib/order';
import { Search, ArrowRight, ArrowLeft } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const { addItem } = useCart();

  const results = PRODUCTS.filter((p) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.longDescription.toLowerCase().includes(q) ||
      p.variants.some((v) => v.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/shop"
        className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Full Shop</span>
      </Link>

      <div className="max-w-2xl mb-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mb-4">
          Search Wholesale Meat Catalog
        </h1>
        <div className="relative">
          <Search className="w-5 h-5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search beef, lamb racks, Boer goat, mutton, sides..."
            className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-neutral-300 rounded-lg shadow-xs focus:ring-2 focus:ring-[#881326] focus:outline-none"
            autoFocus
          />
        </div>
      </div>

      {query.trim().length > 0 ? (
        <div>
          <div className="text-xs text-neutral-500 mb-6 font-medium">
            Found {results.length} item{results.length === 1 ? '' : 's'} matching &ldquo;
            <span className="text-neutral-900 font-bold">{query}</span>&rdquo;
          </div>

          {results.length === 0 ? (
            <div className="py-16 text-center text-neutral-500 bg-neutral-50 rounded-xl border border-neutral-200">
              <p className="font-bold text-base text-neutral-800">No meat products found</p>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                We couldn&apos;t find anything matching your search. Try searching for &ldquo;beef&rdquo;, &ldquo;lamb&rdquo;, &ldquo;goat&rdquo;, or &ldquo;carcass&rdquo;.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="py-12 bg-neutral-50 rounded-xl border border-neutral-200 p-8 text-center text-xs text-neutral-500">
          <p className="font-bold text-sm text-neutral-800 mb-2">Popular Search Terms:</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
            {['Ribeye tomahawk', 'Side of beef', 'Lamb cutlets', 'Whole lamb carcass', 'Boer goat', 'Curry cuts', 'Prime mutton', 'Freezer box'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3 py-1 bg-white border border-neutral-300 rounded-md text-neutral-700 hover:border-[#881326] hover:text-[#881326] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="bg-white min-h-screen">
      <Suspense fallback={<div className="p-10 text-center text-xs text-neutral-500">Loading search...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
