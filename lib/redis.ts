import { Redis } from '@upstash/redis';

/**
 * Checks 5 common credential name variants for Upstash Redis on Vercel / Next.js
 */
function getRedisCredentials(): { url: string; token: string } | null {
  const pairs = [
    { url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN },
    { url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN },
    { url: process.env.REDIS_REST_URL, token: process.env.REDIS_REST_TOKEN },
    { url: process.env.STORAGE_REDIS_REST_URL, token: process.env.STORAGE_REDIS_REST_TOKEN },
    { url: process.env.VERCEL_REDIS_REST_URL, token: process.env.VERCEL_REDIS_REST_TOKEN },
  ];

  for (const pair of pairs) {
    if (pair.url && pair.token) {
      return { url: pair.url, token: pair.token };
    }
  }

  return null;
}

let redisClient: Redis | null = null;

export function getRedis(): Redis | null {
  if (redisClient) return redisClient;
  const creds = getRedisCredentials();
  if (creds) {
    try {
      redisClient = new Redis({
        url: creds.url,
        token: creds.token,
      });
      return redisClient;
    } catch (e) {
      console.warn('Failed to initialize Upstash Redis, falling back to in-memory store:', e);
      return null;
    }
  }
  return null;
}
