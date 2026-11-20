import React from 'react';
import Link from 'next/link';
import { SITE } from '@/src/config/site';
import { BLOG_POSTS } from '@/src/config/blog';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';

export default function BlogIndexPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <div className="bg-[#121212] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              From The Butcher&apos;s Block · Educational Articles
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ponde Meats Guides &amp; Butchery Insights
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Expert advice on selecting whole carcasses, calculating freezer box yields, storing bulk meat safely, and cooking pasture-raised Australian beef, lamb, Boer goat, and mutton.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="bg-neutral-50 rounded-xl border border-neutral-200 p-7 hover:border-neutral-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                  <span className="font-semibold text-[#881326] uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.date}</span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-bold text-neutral-900 group-hover:text-[#881326] transition-colors leading-snug">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-neutral-600 mt-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200/80 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-medium">By {post.author}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-[#881326] flex items-center gap-1 group-hover:underline"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
