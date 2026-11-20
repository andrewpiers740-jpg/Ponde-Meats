import { MetadataRoute } from 'next';
import { SITE, PRODUCTS, CATEGORIES } from '@/src/config/site';
import { BLOG_POSTS } from '@/src/config/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${SITE.domain}`;

  const staticRoutes = [
    '',
    '/shop',
    '/wholesale',
    '/about',
    '/contact',
    '/blog',
    '/search',
    '/order-tracking',
    '/account',
    '/shipping-policy',
    '/terms',
    '/warranty',
    '/disclaimer',
    '/refund-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const categoryRoutes = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/shop/${cat.id}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const productRoutes = PRODUCTS.map((prod) => ({
    url: `${baseUrl}/shop/${prod.category}/${prod.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.85,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes];
}
