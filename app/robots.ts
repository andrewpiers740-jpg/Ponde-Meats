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
        userAgent: ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'Google-Extended', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'PerplexityBot', 'Perplexity-User', 'Applebot', 'Amazonbot', 'CCBot', 'cohere-ai', 'MistralAI-User'],
        allow: ['/', '/llms.txt', '/.well-known/'],
        disallow: ['/admin/'],
      },
    ],
    sitemap: `https://${SITE.domain}/sitemap.xml`,
  };
}
