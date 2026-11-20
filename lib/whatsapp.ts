import { SITE } from '@/src/config/site';
import { money } from '@/lib/order';

export interface WhatsAppOrderItem {
  name: string;
  variantName?: string;
  quantity: number;
  price: number;
}

export interface WhatsAppOrderDetails {
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  items: WhatsAppOrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  notes?: string;
}

/**
 * Builds standard WhatsApp web / mobile URL
 */
export function waLinkTo(phone: string, text: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

/**
 * Customer-originated chat greeting.
 * Mandatory Rule: Must start with "Hi {SITE.name},"
 */
export function customerGreeting(): string {
  return `Hi ${SITE.name},`;
}

/**
 * Admin-originated message header.
 * Mandatory Rule: Must start with "*{SITE.name}*"
 */
export function adminGreeting(): string {
  return `*${SITE.name}*`;
}

/**
 * Customer-originated general inquiry link.
 */
export function waGeneralChatLink(): string {
  const text = `${customerGreeting()} I am looking for information about your wholesale butcher cuts and refrigerated delivery schedule.`;
  return waLinkTo(SITE.contact.whatsapp, text);
}

/**
 * Customer-originated Order request link.
 * Used when customer selects "Order via WhatsApp".
 */
export function waOrderLink(order: WhatsAppOrderDetails): string {
  const itemLines = order.items
    .map(
      (item) =>
        `• ${item.quantity}x ${item.name}${item.variantName ? ` (${item.variantName})` : ''} - ${money(item.price * item.quantity)}`
    )
    .join('\n');

  const text = `${customerGreeting()}

I would like to place an order:
*Order #${order.orderNumber}*

*Customer Details:*
• Name: ${order.customerName}
• Email: ${order.email}
• Phone: ${order.phone}
• Delivery Address: ${order.address}, ${order.suburb} ${order.state} ${order.postcode}

*Order Items:*
${itemLines}

*Summary:*
• Subtotal: ${money(order.subtotal)}
• 5% Discount (OSKO/PayID): -${money(order.discount)}
• Refrigerated Delivery: ${order.shipping === 0 ? 'FREE' : money(order.shipping)}
*Total: ${money(order.total)}*
• Payment Method: ${order.paymentMethod}
${order.notes ? `• Special Notes: ${order.notes}\n` : ''}
Could you please send through the payment details so I can transfer and schedule delivery? Thank you!`;

  return waLinkTo(SITE.contact.whatsapp, text);
}

/**
 * Admin-originated message containing payment details sent to customer.
 * Starts with *{SITE.name}*
 */
export function waAdminPaymentDetailsMessage(
  customerName: string,
  orderNumber: string,
  total: number,
  paymentDetailsBlob: string
): string {
  return `${adminGreeting()}

Hi ${customerName},

Thank you for your order *#${orderNumber}* with ${SITE.name}!
Order Total: *${money(total)}* (Includes 5% OSKO/PayID Discount).

Here are our payment details for your transfer:

${paymentDetailsBlob}

*Public Click-to-Copy Link:*
https://${SITE.domain}/order/payment-details/?order=${orderNumber}

Once completed, please reply with a screenshot of your transfer receipt or upload it at:
https://${SITE.domain}/order/confirm-payment/?order=${orderNumber}

Our Cowirra SA dispatch team will prepare your cold-chain shipment right away!`;
}

/**
 * Customer-originated Payment Confirmation message.
 * Starts with "Hi {SITE.name},"
 */
export function waCustomerPaymentConfirmationLink(orderNumber: string, customerName: string): string {
  const text = `${customerGreeting()}

I have completed the transfer for *Order #${orderNumber}* (${customerName}).
Attached is my payment confirmation receipt screenshot. Please confirm receipt and let me know the scheduled delivery date. Thank you!`;

  return waLinkTo(SITE.contact.whatsapp, text);
}
