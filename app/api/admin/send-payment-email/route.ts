import { NextRequest, NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { getOrder, markOrderSent } from '@/lib/orderStore';
import { parsePaymentDetail } from '@/lib/order';
import { sendEmail } from '@/lib/mailer';
import { paymentDetailsEmail } from '@/utils/emailTemplates';

export async function POST(req: NextRequest) {
  if (!checkAdminPasscode(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized: Invalid Passcode' }, { status: 401 });
  }

  try {
    const { orderNumber, paymentBlob, notes } = await req.json();

    if (!orderNumber || !paymentBlob) {
      return NextResponse.json({ ok: false, error: 'orderNumber and paymentBlob are required' }, { status: 400 });
    }

    const order = await getOrder(orderNumber);
    if (!order) {
      return NextResponse.json({ ok: false, error: 'Order not found' }, { status: 404 });
    }

    const parsed = parsePaymentDetail(paymentBlob);
    const emailPayload = paymentDetailsEmail(order, parsed, notes);

    const emailResult = await sendEmail({
      to: order.email,
      subject: emailPayload.subject,
      html: emailPayload.html,
    });

    const updatedOrder = await markOrderSent(orderNumber, paymentBlob);

    return NextResponse.json({
      ok: true,
      message: 'Payment details email dispatched successfully to customer',
      emailResult,
      order: updatedOrder,
      parsed,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
