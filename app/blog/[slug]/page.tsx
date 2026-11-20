import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/src/config/blog';
import { BLOG_CONTENT } from '@/src/config/blog-content';
import { SITE } from '@/src/config/site';
import { ArrowLeft } from 'lucide-react';

const shorten = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s);

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Article not found' };
  return {
    title: shorten(post.title, 52),
    description: shorten(post.excerpt, 158),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: shorten(post.excerpt, 158), type: 'article', url: `/blog/${post.slug}` },
  };
}

type Block =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] };

function toBlocks(lines: string[]): Block[] {
  const blocks: Block[] = [];
  for (const line of lines) {
    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.slice(3) });
    } else if (line.startsWith('- ')) {
      const last = blocks[blocks.length - 1];
      if (last && last.type === 'ul') last.items.push(line.slice(2));
      else blocks.push({ type: 'ul', items: [line.slice(2)] });
    } else {
      blocks.push({ type: 'p', text: line });
    }
  }
  return blocks;
}

// Pick a few shop categories related to the article for internal linking.
function relatedCategories(text: string) {
  const t = text.toLowerCase();
  const picks: { id: string; label: string }[] = [];
  const add = (id: string, label: string, needle: string) => {
    if (t.includes(needle) && !picks.find((p) => p.id === id)) picks.push({ id, label });
  };
  add('lamb', 'Shop wholesale lamb', 'lamb');
  add('beef', 'Shop wholesale beef', 'beef');
  add('goat', 'Shop Boer goat', 'goat');
  add('mutton', 'Shop mutton', 'mutton');
  return picks.slice(0, 4);
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const lines = BLOG_CONTENT[slug];

  if (!post || !lines) {
    notFound();
  }

  const blocks = toBlocks(lines);
  const related = relatedCategories(lines.join(' '));
  const moreArticles = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Organization', name: SITE.name },
    publisher: { '@type': 'Organization', name: SITE.name, logo: { '@type': 'ImageObject', url: `https://${SITE.domain}/images/logo.jpg` } },
    mainEntityOfPage: `https://${SITE.domain}/blog/${post.slug}`,
  };

  return (
    <article className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

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

          <div className="flex flex-wrap items-center gap-2 text-xs text-rose-400 font-bold uppercase tracking-wider mb-3">
            <span>{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>{post.date}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">{post.title}</h1>

          <div className="mt-4 text-xs text-neutral-400 flex items-center gap-2">
            <span>
              Author: <strong>{post.author}</strong>
            </span>
            <span>·</span>
            <span>Ponde Meats, Cowirra SA</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-base sm:text-lg text-neutral-900 font-medium leading-relaxed bg-neutral-50 p-5 rounded-xl border border-neutral-200 mb-8">
          {post.excerpt}
        </p>

        <div className="text-neutral-700 text-base leading-relaxed space-y-5">
          {blocks.map((b, i) => {
            if (b.type === 'h2')
              return (
                <h2 key={i} className="text-xl sm:text-2xl font-bold text-neutral-900 pt-5">
                  {b.text}
                </h2>
              );
            if (b.type === 'ul')
              return (
                <ul key={i} className="list-disc pl-6 space-y-2">
                  {b.items.map((it, j) => (
                    <li key={j}>{it}</li>
                  ))}
                </ul>
              );
            return <p key={i}>{b.text}</p>;
          })}
        </div>

        <div className="p-6 bg-rose-50 border border-rose-200 rounded-xl my-10">
          <h2 className="font-bold text-sm text-[#881326] mb-1">Need a hand choosing cuts or quantities?</h2>
          <p className="text-sm text-neutral-700 leading-relaxed">
            Our Cowirra butchers will cut to your instructions and advise on sizes for your family, event or kitchen. Call{' '}
            <a href={`tel:${SITE.contact.phoneRaw}`} className="text-[#881326] font-bold hover:underline">
              {SITE.contact.phoneFormatted}
            </a>{' '}
            or message us on WhatsApp.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {related.map((r) => (
            <Link
              key={r.id}
              href={`/shop/${r.id}`}
              className="px-5 py-2.5 bg-[#881326] text-white rounded text-xs font-semibold hover:bg-[#721020] transition-colors"
            >
              {r.label}
            </Link>
          ))}
          <Link href="/shop" className="px-5 py-2.5 border border-neutral-300 rounded text-xs font-semibold text-neutral-800 hover:bg-neutral-50">
            Browse all cuts
          </Link>
        </div>

        {moreArticles.length > 0 && (
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <h2 className="text-lg font-bold text-neutral-900 mb-4">More from the butcher’s block</h2>
            <ul className="space-y-3">
              {moreArticles.map((m) => (
                <li key={m.slug}>
                  <Link href={`/blog/${m.slug}`} className="text-[#881326] font-semibold hover:underline">
                    {m.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/blog" className="inline-block mt-5 text-xs text-neutral-600 hover:text-neutral-900 font-medium">
              View all {BLOG_POSTS.length} articles →
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
