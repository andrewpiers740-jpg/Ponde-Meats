import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/src/config/blog';
import { SITE } from '@/src/config/site';
import { ArrowLeft, Clock, Calendar, User, Share2, CheckCircle } from 'lucide-react';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-white min-h-screen">
      {/* Banner */}
      <div className="bg-[#121212] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-rose-400 font-bold uppercase tracking-wider mb-3">
            <span>{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>{post.date}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="mt-4 text-xs text-neutral-400 flex items-center gap-2">
            <span>Author: <strong>{post.author}</strong></span>
            <span>·</span>
            <span>Cowirra SA Abattoir</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-neutral max-w-none text-neutral-700 text-sm sm:text-base leading-relaxed space-y-6">
          <p className="text-base sm:text-lg text-neutral-900 font-medium leading-relaxed bg-neutral-50 p-5 rounded-xl border border-neutral-200">
            {post.excerpt}
          </p>

          <h2 className="text-xl font-bold text-neutral-900 mt-8 mb-3">
            Understanding the Carcass Journey
          </h2>
          <p>
            When purchasing bulk meat direct from a licensed South Australian abattoir like Ponde Meats in Cowirra SA (ABN {SITE.abn}), one of the most critical concepts for buyers to understand is the difference between <em>hung weight</em> (the warm or chilled dressed carcass hanging in our coolrooms) and the final <em>take-home cut yield</em> in your freezer.
          </p>
          <p>
            As a general rule of thumb across Australian pasture cattle:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li><strong>Side of Beef (~120kg to 140kg hung weight):</strong> Delivers approximately 70% to 75% packaged table meat (around 85kg to 105kg of trimmed steaks, roasts, slow-cook dice, mince, and marrow soup bones). The remainder consists of unusable bone, kidney fat, and moisture evaporation during dry-aging.</li>
            <li><strong>Whole Lamb Carcass (~24kg hung weight):</strong> Typically yields around 72% to 78% take-home cuts (approx 17kg to 19kg of leg roasts, French cutlets, loin chops, shanks, and stew meat).</li>
            <li><strong>Whole Boer Goat Carcass (~18kg hung weight):</strong> Goat is leaner than lamb, resulting in an exceptionally clean 70% to 75% yield of curry chunks and tender roast legs with very low trimmed surface fat.</li>
          </ul>

          <h2 className="text-xl font-bold text-neutral-900 mt-8 mb-3">
            The Role of Cryovac Packaging &amp; Cold-Chain Storage
          </h2>
          <p>
            All bulk meat and carcass orders at Ponde Meats are vacuum sealed in commercial heavy-duty Cryovac barrier film. Vacuum sealing draws out oxygen, halting aerobic bacterial degradation and preventing moisture crystals that cause freezer burn. In a deep chest freezer maintained at -18°C or colder, vacuum-sealed whole beef and lamb cuts maintain pristine culinary quality for up to 12 months.
          </p>

          <div className="p-6 bg-rose-50 border border-rose-200 rounded-xl my-8">
            <h3 className="font-bold text-sm text-[#881326] mb-1">
              Need a Custom Cutting Schedule?
            </h3>
            <p className="text-xs text-neutral-700 leading-relaxed">
              Our Cowirra team will cut your carcass order to your family’s exact cooking habits. Prefer 1-inch thick steaks? Want your lamb legs butterflied and boned? Need whole goat saw-cut for traditional biryani? Let our butchers know when placing your order.
            </p>
          </div>

          <p>
            For any questions or custom wholesale inquiries, contact our butcher desk directly on{' '}
            <a href={`tel:${SITE.contact.phoneRaw}`} className="text-[#881326] font-bold hover:underline">
              {SITE.contact.phoneFormatted}
            </a>{' '}
            or chat with us on WhatsApp.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 flex items-center justify-between">
          <Link
            href="/shop"
            className="px-5 py-2.5 bg-[#881326] text-white rounded text-xs font-semibold hover:bg-[#721020] transition-colors"
          >
            Browse Wholesale Carcasses &amp; Boxes
          </Link>
          <Link
            href="/blog"
            className="text-xs text-neutral-600 hover:text-neutral-900 font-medium"
          >
            View More Articles →
          </Link>
        </div>
      </div>
    </article>
  );
}
