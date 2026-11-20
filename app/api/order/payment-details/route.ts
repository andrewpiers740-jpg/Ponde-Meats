import { NextRequest, NextResponse } from 'next/server';
import { getOrder } from '@/lib/orderStore';
import { parsePaymentDetail } from '@/lib/order';
import { SITE } from '@/src/config/site';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderNumber = searchParams.get('order');

  if (!orderNumber) {
    return NextResponse.json({ ok: false, error: 'Order number is required' }, { status: 400 });
  }

  const order = await getOrder(orderNumber);
  if (!order) {
    return NextResponse.json({ ok: false, error: 'Order not found' }, { status: 404 });
  }

  // Use custom details if admin entered specific details for this order, or default
  const defaultDetails = `
Bank: Commonwealth Bank of Australia
BSB: 065-000
Account Number: 1098 7654
Account Name: Ponde Meats Pty Ltd
PayID: 0485901075
Payment Reference: ${order.orderNumber}
Notes: Please quote Order #${order.orderNumber} on transfer.
  `.trim();

  const rawBlob = order.customPaymentDetails || defaultDetails;
  const parsed = parsePaymentDetail(rawBlob);

  return NextResponse.json({
    ok: true,
    order: {
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      total: order.total,
      subtotal: order.subtotal,
      discount: order.discount,
      shipping: order.shipping,
      paymentMethod: order.paymentMethod,
      status: order.status,
      items: order.items,
    },
    parsed,
  });
}
