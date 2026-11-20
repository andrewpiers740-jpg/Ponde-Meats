import { getRedis } from '@/lib/redis';

export interface OrderItem {
  id: string;
  name: string;
  variantName?: string;
  quantity: number;
  price: number;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  preferredDeliveryDate?: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  channel: 'email' | 'whatsapp' | 'both';
  status:
    | 'Pending Payment'
    | 'Payment Sent'
    | 'Payment Confirmed'
    | 'Preparing Dispatch'
    | 'Dispatched'
    | 'Delivered'
    | 'Cancelled';
  paymentDetailsSent?: boolean;
  paymentDetailsSentAt?: string;
  paymentConfirmedAt?: string;
  receiptNote?: string;
  customPaymentDetails?: string;
}

const REDIS_ORDERS_KEY = 'pondemeats:orders';

// In-memory fallback for local preview or unconfigured Redis
declare global {
  var __memoryOrders: Map<string, OrderRecord> | undefined;
}

if (!globalThis.__memoryOrders) {
  globalThis.__memoryOrders = new Map<string, OrderRecord>();
}

export async function saveOrder(order: OrderRecord): Promise<OrderRecord> {
  const redis = getRedis();
  if (redis) {
    try {
      await redis.hset(REDIS_ORDERS_KEY, { [order.id]: JSON.stringify(order) });
      console.log(`[orders] saved order ${order.id} to Redis`);
      return order;
    } catch (e) {
      console.error('[orders] Redis hset error, saving to memory fallback:', e);
    }
  } else {
    console.error('[orders] Redis is not configured; order is kept in memory only and will be lost');
  }
  globalThis.__memoryOrders!.set(order.id, order);
  return order;
}

export interface StorageStatus {
  mode: 'redis' | 'memory';
  ok: boolean;
  orderCount?: number;
  error?: string;
}

/** Reports which storage backend is active and whether it is reachable (no secrets included). */
export async function getStorageStatus(): Promise<StorageStatus> {
  const redis = getRedis();
  if (!redis) return { mode: 'memory', ok: false, error: 'Redis environment variables not found' };
  try {
    const count = await redis.hlen(REDIS_ORDERS_KEY);
    return { mode: 'redis', ok: true, orderCount: count };
  } catch (e) {
    return { mode: 'redis', ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function listOrders(): Promise<OrderRecord[]> {
  const redis = getRedis();
  if (redis) {
    try {
      const records = await redis.hgetall<Record<string, string | OrderRecord>>(REDIS_ORDERS_KEY);
      const parsed: OrderRecord[] = Object.values(records || {}).map((item) =>
        typeof item === 'string' ? JSON.parse(item) : item
      );
      return parsed.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (e) {
      console.error('[orders] Redis hgetall error, reading memory fallback:', e);
    }
  }

  const memoryList = Array.from(globalThis.__memoryOrders!.values());
  return memoryList.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getOrder(id: string): Promise<OrderRecord | null> {
  const redis = getRedis();
  if (redis) {
    try {
      const record = await redis.hget<string | OrderRecord>(REDIS_ORDERS_KEY, id);
      if (record) {
        return typeof record === 'string' ? JSON.parse(record) : record;
      }
    } catch (e) {
      console.warn('Redis hget error, reading memory fallback:', e);
    }
  }
  return globalThis.__memoryOrders!.get(id) || null;
}

export async function updateOrder(id: string, updates: Partial<OrderRecord>): Promise<OrderRecord | null> {
  const existing = await getOrder(id);
  if (!existing) return null;

  const updated: OrderRecord = {
    ...existing,
    ...updates,
  };

  return saveOrder(updated);
}

export async function markOrderSent(id: string, customDetails?: string): Promise<OrderRecord | null> {
  return updateOrder(id, {
    status: 'Payment Sent',
    paymentDetailsSent: true,
    paymentDetailsSentAt: new Date().toISOString(),
    customPaymentDetails: customDetails,
  });
}

export async function markPaymentConfirmed(id: string, receiptNote?: string): Promise<OrderRecord | null> {
  return updateOrder(id, {
    status: 'Payment Confirmed',
    paymentConfirmedAt: new Date().toISOString(),
    receiptNote: receiptNote,
  });
}

export async function deleteOrder(id: string): Promise<boolean> {
  const redis = getRedis();
  if (redis) {
    try {
      await redis.hdel(REDIS_ORDERS_KEY, id);
    } catch (e) {
      console.warn('Redis hdel error:', e);
    }
  }
  return globalThis.__memoryOrders!.delete(id);
}
