import { getRedis } from '@/lib/redis';

export interface EnquiryRecord {
  id: string;
  createdAt: string;
  type: 'contact' | 'wholesale';
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  categoryInterest?: string;
  volumeInterest?: string;
  subject?: string;
  message: string;
  status: 'new' | 'replied' | 'archived';
  repliedAt?: string;
  replyMessage?: string;
}

const REDIS_ENQUIRIES_KEY = 'pondemeats:enquiries';

// In-memory fallback
declare global {
  var __memoryEnquiries: Map<string, EnquiryRecord> | undefined;
}

if (!globalThis.__memoryEnquiries) {
  globalThis.__memoryEnquiries = new Map<string, EnquiryRecord>();
}

export async function saveEnquiry(enquiry: EnquiryRecord): Promise<EnquiryRecord> {
  const redis = getRedis();
  if (redis) {
    try {
      await redis.hset(REDIS_ENQUIRIES_KEY, { [enquiry.id]: JSON.stringify(enquiry) });
      return enquiry;
    } catch (e) {
      console.error('Redis hset enquiry error, saving to memory:', e);
    }
  }
  globalThis.__memoryEnquiries!.set(enquiry.id, enquiry);
  return enquiry;
}

export async function listEnquiries(): Promise<EnquiryRecord[]> {
  const redis = getRedis();
  if (redis) {
    try {
      const records = await redis.hgetall<Record<string, string | EnquiryRecord>>(REDIS_ENQUIRIES_KEY);
      if (records) {
        const parsed: EnquiryRecord[] = Object.values(records).map((item) =>
          typeof item === 'string' ? JSON.parse(item) : item
        );
        return parsed.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    } catch (e) {
      console.error('Redis hgetall enquiry error, reading memory:', e);
    }
  }

  const list = Array.from(globalThis.__memoryEnquiries!.values());
  return list.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getEnquiry(id: string): Promise<EnquiryRecord | null> {
  const redis = getRedis();
  if (redis) {
    try {
      const record = await redis.hget<string | EnquiryRecord>(REDIS_ENQUIRIES_KEY, id);
      if (record) {
        return typeof record === 'string' ? JSON.parse(record) : record;
      }
    } catch (e) {
      console.error('Redis hget enquiry error:', e);
    }
  }
  return globalThis.__memoryEnquiries!.get(id) || null;
}

export async function markEnquiryReplied(id: string, replyMessage: string): Promise<EnquiryRecord | null> {
  const existing = await getEnquiry(id);
  if (!existing) return null;

  const updated: EnquiryRecord = {
    ...existing,
    status: 'replied',
    repliedAt: new Date().toISOString(),
    replyMessage,
  };

  return saveEnquiry(updated);
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  const redis = getRedis();
  if (redis) {
    try {
      await redis.hdel(REDIS_ENQUIRIES_KEY, id);
    } catch (e) {
      console.error('Redis hdel enquiry error:', e);
    }
  }
  return globalThis.__memoryEnquiries!.delete(id);
}
