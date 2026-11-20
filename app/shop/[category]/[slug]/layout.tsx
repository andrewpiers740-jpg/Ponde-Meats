import type { Metadata } from 'next';
import { PRODUCTS, SITE } from '@/src/config/site';

type Params = { category: string; slug: string };

const find = (p: Params) =>
  PRODUCTS.find((x) => (x.slug === p.slug || x.id === p.slug) && x.category === p.category);

const trim = (s: string, n: number) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…');

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const product = find(await params);
  if (!product) return { title: 'Product not found' };
  const cat = product.category.charAt(0).toUpperCase() + product.category.slice(1);
  const url = `/shop/${product.category}/${product.slug}`;
  const desc = trim(`${product.description} From $${(product.variants[0]?.price ?? product.price).toFixed(2)} ($${product.price.toFixed(2)} ${product.unit}). Min order $${SITE.orderRules.minOrder}.`, 158);
  return {
    title: trim(`${product.name} – Wholesale ${cat}`, 52),
    description: desc,
    alternates: { canonical: url },
    openGraph: { title: product.name, description: desc, url, type: 'website', images: [{ url: product.image }] },
  };
}

export default async function ProductLayout({ children, params }: { children: React.ReactNode; params: Promise<Params> }) {
  const product = find(await params);
  const ld = product && {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: [`https://${SITE.domain}${product.image}`],
    sku: product.id,
    category: product.category,
    brand: { '@type': 'Brand', name: SITE.name },
    offers: {
      '@type': 'Offer',
      url: `https://${SITE.domain}/shop/${product.category}/${product.slug}`,
      priceCurrency: SITE.orderRules.currency.code,
      price: (product.variants[0]?.price ?? product.price).toFixed(2),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: SITE.name },
    },
  };
  return (
    <>
      {ld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />}
      {children}
    </>
  );
}
