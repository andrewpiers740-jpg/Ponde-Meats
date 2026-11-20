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

  // Seed sample initial orders
  const sampleOrders: OrderRecord[] = [
    {
      id: '32975',
      orderNumber: '32975',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      customerName: 'Marcus Vance',
      email: 'm.vance@murraylandsresort.com.au',
      phone: '0412 884 921',
      address: '14 Riverside Way',
      suburb: 'Murray Bridge',
      state: 'SA',
      postcode: '5253',
      preferredDeliveryDate: '2026-11-21',
      notes: 'Please buzz side loading dock for refrigerated dropoff.',
      items: [
        {
          id: 'beef-tomahawk-ribeye',
          name: 'Grass-Fed Beef Ribeye & Tomahawk Steaks',
          variantName: 'Bulk Master Carton (5kg)',
          quantity: 2,
          price: 235,
        },
        {
          id: 'lamb-french-rack-cutlets',
          name: 'Pasture-Raised Lamb Cutlets & French Racks',
          variantName: 'Wholesale Foodservice Carton (5kg)',
          quantity: 1,
          price: 220,
        },
      ],
      subtotal: 690,
      discount: 34.5,
      shipping: 20,
      total: 675.5,
      paymentMethod: 'Bank Transfer (OSKO)',
      channel: 'both',
      status: 'Pending Payment',
    },
    {
      id: '32976',
      orderNumber: '32976',
      createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
      customerName: 'Elena Rostova',
      email: 'elena.rostova@gmail.com',
      phone: '0488 321 004',
      address: '88 The Parade',
      suburb: 'Norwood',
      state: 'SA',
      postcode: '5067',
      preferredDeliveryDate: '2026-11-20',
      notes: 'Leave in insulated box on front porch if unattended.',
      items: [
        {
          id: 'goat-whole-carcass',
          name: 'Whole Australian Boer Goat Carcass (Custom Cut)',
          variantName: 'Whole Boer Goat Carcass (~16-20kg hung weight, custom cut)',
          quantity: 1,
          price: 340,
        },
        {
          id: 'beef-family-freezer-box',
          name: 'Grass-Fed Beef Family Freezer Box (10kg)',
          variantName: 'Standard Family Box (10kg)',
          quantity: 1,
          price: 240,
        },
      ],
      subtotal: 580,
      discount: 29.0,
      shipping: 20,
      total: 571.0,
      paymentMethod: 'PayID',
      channel: 'whatsapp',
      status: 'Payment Confirmed',
      paymentDetailsSent: true,
      paymentDetailsSentAt: new Date(Date.now() - 3600000 * 16).toISOString(),
      paymentConfirmedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    },
    {
      id: '32977',
      orderNumber: '32977',
      createdAt: new Date(Date.now() - 3600000 * 30).toISOString(),
      customerName: 'Harrison Forde',
      email: 'hforde@adelaidebutchers.com.au',
      phone: '0423 719 440',
      address: '210 Main North Rd',
      suburb: 'Prospect',
      state: 'SA',
      postcode: '5082',
      notes: 'Wholesale side order for retail butchery display.',
      items: [
        {
          id: 'beef-whole-carcass-side',
          name: 'Whole Beef Carcass & Side of Beef (Bulk Hung Weight)',
          variantName: 'Side of Beef (~120kg hung weight, custom cut & packed)',
          quantity: 1,
          price: 1350,
        },
      ],
      subtotal: 1350,
      discount: 67.5,
      shipping: 0, // Free delivery over $1000
      total: 1282.5,
      paymentMethod: 'Bank Transfer (OSKO)',
      channel: 'email',
      status: 'Dispatched',
      paymentDetailsSent: true,
      paymentConfirmedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
  ];

  sampleOrders.forEach((o) => globalThis.__memoryOrders!.set(o.id, o));
}

export async function saveOrder(order: OrderRecord): Promise<OrderRecord> {
  const redis = getRedis();
  if (redis) {
    try {
      await redis.hset(REDIS_ORDERS_KEY, { [order.id]: JSON.stringify(order) });
      return order;
    } catch (e) {
      console.warn('Redis hset error, saving to memory fallback:', e);
    }
  }
  globalThis.__memoryOrders!.set(order.id, order);
  return order;
}

export async function listOrders(): Promise<OrderRecord[]> {
  const redis = getRedis();
  if (redis) {
    try {
      const records = await redis.hgetall<Record<string, string | OrderRecord>>(REDIS_ORDERS_KEY);
      if (records) {
        const parsed: OrderRecord[] = Object.values(records).map((item) =>
          typeof item === 'string' ? JSON.parse(item) : item
        );
        return parsed.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    } catch (e) {
      console.warn('Redis hgetall error, reading memory fallback:', e);
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
