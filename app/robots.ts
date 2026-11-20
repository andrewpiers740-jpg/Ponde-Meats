import { MetadataRoute } from 'next';
import { SITE } from '@/src/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/admin/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'Anthropic-AI', 'ClaudeBot', 'PerplexityBot'],
        allow: ['/', '/llms.txt', '/.well-known/'],
        disallow: ['/admin/'],
      },
    ],
    sitemap: `https://${SITE.domain}/sitemap.xml`,
  };
}
