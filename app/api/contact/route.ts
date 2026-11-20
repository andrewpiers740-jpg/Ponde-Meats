import { NextRequest, NextResponse } from 'next/server';
import { SITE } from '@/src/config/site';
import { saveOrder, OrderRecord } from '@/lib/orderStore';
import { saveEnquiry, EnquiryRecord } from '@/lib/enquiryStore';
import { sendEmail } from '@/lib/mailer';
import { customerOrderConfirmationEmail, shopOrderNotificationEmail } from '@/utils/emailTemplates';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const formName = data.formName || 'contact';

    // 1. ORDER SUBMISSION
    if (formName === 'order') {
      const orderNumber = data.orderNumber || Math.floor(10000 + Math.random() * 90000).toString();

      const order: OrderRecord = {
        id: orderNumber,
        orderNumber,
        createdAt: new Date().toISOString(),
        customerName: data.customerName || 'Valued Customer',
        email: data.email,
        phone: data.phone,
        address: data.address,
        suburb: data.suburb,
        state: data.state || 'SA',
        postcode: data.postcode,
        preferredDeliveryDate: data.preferredDeliveryDate,
        notes: data.notes,
        items: data.items || [],
        subtotal: Number(data.subtotal) || 0,
        discount: Number(data.discount) || 0,
        shipping: Number(data.shipping) || 0,
        total: Number(data.total) || 0,
        paymentMethod: data.paymentMethod || 'Bank Transfer (OSKO)',
        channel: data.channel || 'email',
        status: 'Pending Payment',
      };

      // Persist order in store (Redis or In-Memory)
      await saveOrder(order);

      // Unconditional customer confirmation email (ALWAYS sent, regardless of channel)
      if (order.email) {
        const customerMail = customerOrderConfirmationEmail(order);
        await sendEmail({
          to: order.email,
          subject: customerMail.subject,
          html: customerMail.html,
        });
      }

      // Shop notification email
      const shopMail = shopOrderNotificationEmail(order);
      await sendEmail({
        to: process.env.ORDER_EMAIL || SITE.contact.orderEmail,
        subject: shopMail.subject,
        html: shopMail.html,
        replyTo: order.email,
      });

      return NextResponse.json({
        ok: true,
        orderNumber: order.orderNumber,
        message: 'Order saved and confirmation email queued successfully',
      });
    }

    // 2. WHOLESALE OR CONTACT ENQUIRY
    const enquiryId = `enq-${Date.now().toString().slice(-6)}`;
    const enquiry: EnquiryRecord = {
      id: enquiryId,
      createdAt: new Date().toISOString(),
      type: formName === 'wholesale' ? 'wholesale' : 'contact',
      name: data.name || data.customerName || 'Anonymous',
      email: data.email,
      phone: data.phone,
      businessName: data.businessName,
      categoryInterest: data.categoryInterest,
      volumeInterest: data.volumeInterest,
      subject: data.subject || (formName === 'wholesale' ? 'New Wholesale Account Inquiry' : 'Customer Inquiry'),
      message: data.message || '',
      status: 'new',
    };

    await saveEnquiry(enquiry);

    // Send notification email to shop
    const destination =
      formName === 'wholesale'
        ? process.env.WHOLESALE_EMAIL || SITE.contact.wholesaleEmail
        : process.env.CONTACT_EMAIL || SITE.contact.email;

    await sendEmail({
      to: destination,
      subject: `[${enquiry.type.toUpperCase()}] ${enquiry.subject} - ${enquiry.name}`,
      html: `
        <div style="font-family:sans-serif; padding:20px; color:#1a1a1a;">
          <h2 style="color:#881326;">New ${enquiry.type === 'wholesale' ? 'Wholesale Account' : 'General'} Inquiry</h2>
          <p><strong>Name:</strong> ${enquiry.name}</p>
          <p><strong>Email:</strong> ${enquiry.email}</p>
          <p><strong>Phone:</strong> ${enquiry.phone || 'N/A'}</p>
          ${enquiry.businessName ? `<p><strong>Business Name:</strong> ${enquiry.businessName}</p>` : ''}
          ${enquiry.categoryInterest ? `<p><strong>Category Interest:</strong> ${enquiry.categoryInterest}</p>` : ''}
          ${enquiry.volumeInterest ? `<p><strong>Volume Interest:</strong> ${enquiry.volumeInterest}</p>` : ''}
          <p><strong>Message:</strong></p>
          <div style="background:#f4f4f4; padding:15px; border-radius:5px; white-space:pre-wrap;">${enquiry.message}</div>
          <p style="margin-top:20px;"><a href="https://${SITE.domain}/admin/enquiries/${enquiry.id}">View and reply in Admin Portal</a></p>
        </div>
      `,
      replyTo: enquiry.email,
    });

    return NextResponse.json({
      ok: true,
      enquiryId: enquiry.id,
      message: 'Enquiry received successfully',
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('API /api/contact error:', errorMsg);
    return NextResponse.json({ ok: false, error: errorMsg }, { status: 500 });
  }
}
