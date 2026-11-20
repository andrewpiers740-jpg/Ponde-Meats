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

  // Sample initial enquiries
  const sampleEnquiries: EnquiryRecord[] = [
    {
      id: 'enq-101',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      type: 'wholesale',
      name: 'Julian Croft',
      email: 'j.croft@riverlandhospitality.com.au',
      phone: '0421 990 311',
      businessName: 'Riverland Hospitality Group',
      categoryInterest: 'Beef, Lamb & Boer Goat',
      volumeInterest: '100kg - 250kg weekly',
      subject: 'Weekly chilled meat supply for 3 bistro locations',
      message:
        'Hi Ponde Meats team, We operate three bistro venues across the Riverland and Murraylands. We are seeking regular weekly delivery of ribeye tomahawks, lamb cutlets and diced Boer goat. Could you provide your wholesale carton rate sheet and delivery run schedule?',
      status: 'new',
    },
    {
      id: 'enq-102',
      createdAt: new Date(Date.now() - 3600000 * 22).toISOString(),
      type: 'contact',
      name: 'Sarah Lindqvist',
      email: 'sarah.lindqvist@outlook.com',
      phone: '0434 502 119',
      subject: 'Custom cut whole lamb carcass question',
      message:
        'Hello, I would like to order a whole lamb carcass for next Friday. Can the leg roasts be boned and rolled, and the chops packed in bags of 4? Also confirming if you deliver directly to Adelaide Hills.',
      status: 'replied',
      repliedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
      replyMessage:
        'Hi Sarah, yes absolutely! All our whole lamb carcasses are custom cut and packed to your exact specs at no extra charge. We deliver to the Adelaide Hills weekly on Tuesdays and Fridays.',
    },
  ];

  sampleEnquiries.forEach((e) => globalThis.__memoryEnquiries!.set(e.id, e));
}

export async function saveEnquiry(enquiry: EnquiryRecord): Promise<EnquiryRecord> {
  const redis = getRedis();
  if (redis) {
    try {
      await redis.hset(REDIS_ENQUIRIES_KEY, { [enquiry.id]: JSON.stringify(enquiry) });
      return enquiry;
    } catch (e) {
      console.warn('Redis hset enquiry error, saving to memory:', e);
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
      console.warn('Redis hgetall enquiry error, reading memory:', e);
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
      console.warn('Redis hget enquiry error:', e);
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
      console.warn('Redis hdel enquiry error:', e);
    }
  }
  return globalThis.__memoryEnquiries!.delete(id);
}
