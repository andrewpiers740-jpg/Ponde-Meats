import { NextRequest, NextResponse } from 'next/server';
import { getOrder, markPaymentConfirmed } from '@/lib/orderStore';
import { sendEmail } from '@/lib/mailer';
import { SITE } from '@/src/config/site';
import { money } from '@/lib/order';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { orderNumber, receiptNote, receiptFileName } = data;

    if (!orderNumber) {
      return NextResponse.json({ ok: false, error: 'Order number is required' }, { status: 400 });
    }

    const order = await getOrder(orderNumber);
    if (!order) {
      return NextResponse.json({ ok: false, error: 'Order not found' }, { status: 404 });
    }

    const note = `${receiptNote || 'Payment confirmed by customer'} ${receiptFileName ? `[Receipt: ${receiptFileName}]` : ''}`.trim();
    const updated = await markPaymentConfirmed(orderNumber, note);

    // Notify shop of customer payment submission
    await sendEmail({
      to: process.env.ORDER_EMAIL || SITE.contact.orderEmail,
      subject: `[PAYMENT CONFIRMATION] Order #${order.orderNumber} - ${order.customerName}`,
      html: `
        <div style="font-family:sans-serif; padding:20px; color:#1a1a1a;">
          <h2 style="color:#059669;">Payment Confirmation Received</h2>
          <p>Customer <strong>${order.customerName}</strong> has confirmed payment for Order <strong>#${order.orderNumber}</strong> (${money(order.total)}).</p>
          <p><strong>Note:</strong> ${note}</p>
          <p><a href="https://${SITE.domain}/admin/orders/${order.orderNumber}">Open Order in Admin Hub</a></p>
        </div>
      `,
    });

    return NextResponse.json({
      ok: true,
      message: 'Payment confirmation recorded successfully. Our Cowirra SA cold-chain dispatch team will verify and prepare your order.',
      order: updated,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
