'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { CATEGORIES, PRODUCTS } from '@/src/config/site';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/lib/cartContext';
import { money } from '@/lib/order';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = (params?.category as string)?.toLowerCase();

  const category = CATEGORIES.find((c) => c.id === categorySlug);
  if (!category) {
    notFound();
  }

  const { addItem } = useCart();
  const categoryProducts = PRODUCTS.filter((p) => p.category === categorySlug);

  return (
    <div className="bg-white min-h-screen">
      {/* Category Hero Banner */}
      <div className="bg-[#121212] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Wholesale Meat</span>
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
                Livestock Category · South Australia
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Wholesale {category.name}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-2xl leading-relaxed">
                {category.description}
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 px-4 py-2.5 rounded-lg text-xs text-neutral-300">
              <span>Includes Single Cuts, Freezer Boxes &amp; Whole Carcasses</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
