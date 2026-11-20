import { SITE } from '@/src/config/site';
import { money } from '@/lib/order';
import { OrderRecord } from '@/lib/orderStore';
import { EnquiryRecord } from '@/lib/enquiryStore';
import { ParsedPaymentDetail } from '@/lib/order';

const PRIMARY_ACCENT = SITE.reply.brand.primary; // '#881326'
const HEADER_DARK = SITE.reply.brand.headerDark; // '#121212'

/**
 * Clean Light HTML Email Shell
 * Always white card, dark brand header, near-black text to prevent dark mode auto-inversion
 */
function emailShell(title: string, preheader: string, contentHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f4f1ea; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937; -webkit-font-smoothing: antialiased; }
    table { border-collapse: collapse; }
    .email-wrapper { width: 100%; background-color: #f4f1ea; padding: 24px 12px; }
    .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); }
    .header-band { background-color: ${HEADER_DARK}; padding: 24px 32px; text-align: center; }
    .header-title { color: #ffffff; font-size: 22px; font-weight: 700; margin: 0; letter-spacing: 0.05em; text-transform: uppercase; }
    .header-tagline { color: #d1d5db; font-size: 13px; margin: 6px 0 0 0; }
    .body-content { padding: 32px 32px; background-color: #ffffff; }
    .h1 { font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 16px 0; }
    .p { font-size: 15px; line-height: 1.6; color: #374151; margin: 0 0 16px 0; }
    .pill { display: inline-block; background-color: #f3f4f6; padding: 4px 10px; border-radius: 4px; font-size: 13px; font-weight: 600; color: #1f2937; }
    .table-details { width: 100%; margin: 20px 0; border: 1px solid #e5e7eb; border-radius: 6px; }
    .table-details th { background-color: #f9fafb; padding: 10px 14px; text-align: left; font-size: 13px; font-weight: 600; color: #4b5563; border-bottom: 1px solid #e5e7eb; }
    .table-details td { padding: 12px 14px; font-size: 14px; border-bottom: 1px solid #f3f4f6; color: #1f2937; }
    .btn { display: inline-block; background-color: ${PRIMARY_ACCENT}; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 15px; margin: 16px 0; }
    .callout { background-color: #fdf2f2; border-left: 4px solid ${PRIMARY_ACCENT}; padding: 16px; border-radius: 4px; margin: 20px 0; }
    .footer { background-color: #fafafa; padding: 24px 32px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 12px; color: #6b7280; line-height: 1.5; }
    .footer a { color: ${PRIMARY_ACCENT}; text-decoration: none; }
  </style>
</head>
<body>
  <div style="display:none;font-size:1px;color:#f4f1ea;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    ${preheader}
  </div>
  <table role="presentation" class="email-wrapper">
    <tr>
      <td align="center">
        <table role="presentation" class="email-container">
          <tr>
            <td class="header-band">
              <div class="header-title">${SITE.name}</div>
              <div class="header-tagline">${SITE.reply.headertagline}</div>
            </td>
          </tr>
          <tr>
            <td class="body-content">
              ${contentHtml}
            </td>
          </tr>
          <tr>
            <td class="footer">
              <strong>${SITE.legalName}</strong> · ABN ${SITE.abn}<br>
              ${SITE.contact.address}, ${SITE.contact.suburb} ${SITE.contact.state} ${SITE.contact.postcode}, Australia<br>
              Phone: ${SITE.contact.phoneFormatted} · Email: <a href="mailto:${SITE.contact.email}">${SITE.contact.email}</a><br>
              ${SITE.reply.dispatchlogisticsline}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Customer Order Confirmation Email (sent unconditionally on all orders, including WhatsApp orders)
 */
export function customerOrderConfirmationEmail(order: OrderRecord): { subject: string; html: string } {
  const subject = `Order Confirmation #${order.orderNumber} - ${SITE.name}`;
  const preheader = `Thank you for your order #${order.orderNumber}. We have received your order details and are preparing payment instructions.`;

  const itemRows = order.items
    .map(
      (it) => `
    <tr>
      <td><strong>${it.name}</strong>${it.variantName ? `<br><span style="font-size:12px;color:#6b7280;">${it.variantName}</span>` : ''}</td>
      <td style="text-align:center;">${it.quantity}</td>
      <td style="text-align:right;">${money(it.price * it.quantity)}</td>
    </tr>
  `
    )
    .join('');

  const html = emailShell(
    subject,
    preheader,
    `
    <h1 class="h1">Thank you for your order, ${order.customerName}!</h1>
    <p class="p">We have received your wholesale order <strong>#${order.orderNumber}</strong>. Our butcher team at Cowirra SA has queued your cold-chain order.</p>

    <div class="callout">
      <strong style="color:${PRIMARY_ACCENT}; font-size:15px;">Next Step: Payment Details</strong>
      <p style="margin:6px 0 0 0; font-size:14px; color:#4b5563;">
        You have selected <strong>${order.paymentMethod}</strong> (Includes an instant 5% discount: <strong>-${money(order.discount)}</strong>).
        Our accounts desk will issue your official bank/PayID details shortly. You can also view live payment details and copy fields directly via the link below:
      </p>
      <div style="margin-top:12px;">
        <a href="https://${SITE.domain}/order/payment-details/?order=${order.orderNumber}" class="btn" style="margin:0;">View Payment Details &amp; Copy Fields</a>
      </div>
    </div>

    <h2 style="font-size:16px; font-weight:700; color:#111827; margin:24px 0 8px 0;">Order Summary (#${order.orderNumber})</h2>
    <table class="table-details">
      <thead>
        <tr>
          <th>Item</th>
          <th style="text-align:center;">Qty</th>
          <th style="text-align:right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemRows}
        <tr>
          <td colspan="2" style="text-align:right; font-weight:600;">Subtotal:</td>
          <td style="text-align:right; font-weight:600;">${money(order.subtotal)}</td>
        </tr>
        <tr>
          <td colspan="2" style="text-align:right; color:#059669; font-weight:600;">5% Discount (${order.paymentMethod}):</td>
          <td style="text-align:right; color:#059669; font-weight:600;">-${money(order.discount)}</td>
        </tr>
        <tr>
          <td colspan="2" style="text-align:right;">Refrigerated Delivery:</td>
          <td style="text-align:right;">${order.shipping === 0 ? 'FREE' : money(order.shipping)}</td>
        </tr>
        <tr style="background-color:#f9fafb;">
          <td colspan="2" style="text-align:right; font-size:16px; font-weight:700; color:#111827;">Total Due:</td>
          <td style="text-align:right; font-size:16px; font-weight:700; color:${PRIMARY_ACCENT};">${money(order.total)}</td>
        </tr>
      </tbody>
    </table>

    <h3 style="font-size:15px; font-weight:700; color:#111827; margin:20px 0 8px 0;">Delivery Destination:</h3>
    <p class="p" style="margin-bottom:8px;">
      ${order.customerName}<br>
      ${order.address}<br>
      ${order.suburb} ${order.state} ${order.postcode}<br>
      Phone: ${order.phone}<br>
      ${order.preferredDeliveryDate ? `<strong>Preferred Date:</strong> ${order.preferredDeliveryDate}<br>` : ''}
      ${order.notes ? `<strong>Notes:</strong> ${order.notes}` : ''}
    </p>

    <p class="p" style="margin-top:24px; font-size:13px; color:#6b7280;">
      Questions regarding this order? Reply directly to this email or chat with our Cowirra butcher desk on WhatsApp at <a href="https://wa.me/${SITE.contact.whatsapp}" style="color:${PRIMARY_ACCENT}; font-weight:600;">+61 ${SITE.contact.phoneFormatted}</a>.
    </p>
  `
  );

  return { subject, html };
}

/**
 * Shop Notification Email for new orders
 */
export function shopOrderNotificationEmail(order: OrderRecord): { subject: string; html: string } {
  const subject = `[NEW WHOLESALE ORDER] #${order.orderNumber} - ${order.customerName} (${money(order.total)})`;
  const preheader = `New order #${order.orderNumber} placed via ${order.channel.toUpperCase()}. Total: ${money(order.total)}.`;

  const itemLines = order.items
    .map((it) => `<li><strong>${it.quantity}x</strong> ${it.name} ${it.variantName ? `(${it.variantName})` : ''} - ${money(it.price * it.quantity)}</li>`)
    .join('');

  const html = emailShell(
    subject,
    preheader,
    `
    <h1 class="h1">New Order Received: #${order.orderNumber}</h1>
    <p class="p">An order was submitted via <strong>${order.channel.toUpperCase()}</strong> channel.</p>

    <div style="background-color:#f9fafb; padding:16px; border-radius:6px; margin-bottom:20px;">
      <p style="margin:0 0 6px 0;"><strong>Customer:</strong> ${order.customerName}</p>
      <p style="margin:0 0 6px 0;"><strong>Email:</strong> ${order.email}</p>
      <p style="margin:0 0 6px 0;"><strong>Phone:</strong> ${order.phone}</p>
      <p style="margin:0 0 6px 0;"><strong>Address:</strong> ${order.address}, ${order.suburb} ${order.state} ${order.postcode}</p>
      <p style="margin:0 0 6px 0;"><strong>Payment Method:</strong> ${order.paymentMethod}</p>
      <p style="margin:0 0 6px 0;"><strong>Total Value:</strong> <span style="font-size:18px; font-weight:700; color:${PRIMARY_ACCENT};">${money(order.total)}</span></p>
      ${order.notes ? `<p style="margin:0 0 6px 0;"><strong>Notes:</strong> ${order.notes}</p>` : ''}
    </div>

    <h3 style="font-size:15px; font-weight:700; margin:16px 0 8px 0;">Ordered Items:</h3>
    <ul style="padding-left:20px; line-height:1.6;">
      ${itemLines}
    </ul>

    <div style="margin-top:24px;">
      <a href="https://${SITE.domain}/admin/send-payment-email/?order=${order.orderNumber}" class="btn">Send Payment Details from Admin Portal</a>
    </div>
  `
  );

  return { subject, html };
}

/**
 * Payment Details Email sent to customer by Admin
 */
export function paymentDetailsEmail(
  order: OrderRecord,
  parsed: ParsedPaymentDetail,
  customNotes?: string
): { subject: string; html: string } {
  const subject = `Payment Details for Order #${order.orderNumber} - ${SITE.name}`;
  const preheader = `Please find your official payment transfer details for order #${order.orderNumber} (${money(order.total)}).`;

  const fieldRows = parsed.fields
    .map(
      (f) => `
    <tr>
      <td style="font-weight:600; width:35%; background-color:#f9fafb; color:#4b5563;">${f.label}:</td>
      <td style="font-weight:700; font-family:monospace; font-size:15px; color:#111827;">${f.value}</td>
    </tr>
  `
    )
    .join('');

  const html = emailShell(
    subject,
    preheader,
    `
    <h1 class="h1">Payment Details for Order #${order.orderNumber}</h1>
    <p class="p">Dear ${order.customerName},</p>
    <p class="p">Thank you for your order with ${SITE.name}. Please find our official South Australian banking &amp; PayID transfer details below:</p>

    <table class="table-details">
      <tbody>
        <tr>
          <td style="font-weight:600; width:35%; background-color:#f9fafb; color:#4b5563;">Order Total:</td>
          <td style="font-size:18px; font-weight:700; color:${PRIMARY_ACCENT};">${money(order.total)} AUD</td>
        </tr>
        <tr>
          <td style="font-weight:600; width:35%; background-color:#f9fafb; color:#4b5563;">Payment Method:</td>
          <td style="font-weight:600; color:#111827;">${order.paymentMethod} (5% Discount Applied)</td>
        </tr>
        ${fieldRows}
      </tbody>
    </table>

    ${customNotes ? `<div class="callout"><p style="margin:0; font-size:14px;"><strong>Butcher Note:</strong> ${customNotes}</p></div>` : ''}

    <p class="p"><strong>Click-to-Copy &amp; Mobile Payment Page:</strong></p>
    <p class="p">Tap each detail field directly to copy on your phone or computer:</p>
    <div>
      <a href="https://${SITE.domain}/order/payment-details/?order=${order.orderNumber}" class="btn">Open Interactive Payment Page</a>
    </div>

    <div style="background-color:#f3f4f6; padding:16px; border-radius:6px; margin:20px 0;">
      <strong style="color:#111827; font-size:14px;">After Making Payment:</strong>
      <p style="margin:6px 0 0 0; font-size:13px; color:#4b5563;">
        Please upload your transfer screenshot or receipt at: <br>
        <a href="https://${SITE.domain}/order/confirm-payment/?order=${order.orderNumber}" style="color:${PRIMARY_ACCENT}; font-weight:600;">https://${SITE.domain}/order/confirm-payment/?order=${order.orderNumber}</a><br>
        Or reply directly to this email or via WhatsApp. Once verified, cold-chain transport is immediately dispatched.
      </p>
    </div>
  `
  );

  return { subject, html };
}

/**
 * Enquiry Reply Email
 */
export function enquiryReplyEmail(
  enquiry: EnquiryRecord,
  replyMessage: string
): { subject: string; html: string } {
  const subject = `Re: ${enquiry.subject || 'Your enquiry with Ponde Meats'}`;
  const preheader = `Response from Ponde Meats Cowirra SA regarding your enquiry.`;

  const html = emailShell(
    subject,
    preheader,
    `
    <h1 class="h1">Hello ${enquiry.name},</h1>
    <p class="p">Thank you for getting in touch with <strong>${SITE.name}</strong>.</p>

    <div style="background-color:#f9fafb; border-left:4px solid ${PRIMARY_ACCENT}; padding:18px; border-radius:4px; margin:20px 0;">
      <p style="margin:0; font-size:15px; line-height:1.6; color:#111827; white-space:pre-wrap;">${replyMessage}</p>
    </div>

    <div style="background-color:#f3f4f6; padding:12px 16px; border-radius:4px; font-size:13px; color:#6b7280; margin-top:24px;">
      <strong>Your Original Enquiry (${new Date(enquiry.createdAt).toLocaleDateString('en-AU')}):</strong><br>
      <em>"${enquiry.message}"</em>
    </div>

    <p class="p" style="margin-top:20px;">
      If you have further questions or wish to place a wholesale order, please reply directly or call our Cowirra butcher desk on <strong>${SITE.contact.phoneFormatted}</strong>.
    </p>
  `
  );

  return { subject, html };
}
