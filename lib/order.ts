import { SITE } from '@/src/config/site';

export interface ParsedPaymentDetail {
  raw: string;
  bankName?: string;
  accountName?: string;
  bsb?: string;
  accountNumber?: string;
  payId?: string;
  payIdType?: string;
  reference?: string;
  swiftBic?: string;
  paymentLink?: string;
  notes?: string;
  fields: { label: string; value: string }[];
}

/**
 * Parses any raw pasted payment text into individually copyable fields.
 * Supports Australian BSB & Account Numbers, PayID (mobile or email),
 * SWIFT/BIC, Payment URLs, Account Names, and References.
 */
export function parsePaymentDetail(rawText: string): ParsedPaymentDetail {
  if (!rawText || typeof rawText !== 'string') {
    return { raw: '', fields: [] };
  }

  const lines = rawText.split('\n').map((l) => l.trim()).filter(Boolean);
  const fields: { label: string; value: string }[] = [];

  let bankName: string | undefined;
  let accountName: string | undefined;
  let bsb: string | undefined;
  let accountNumber: string | undefined;
  let payId: string | undefined;
  let payIdType: string | undefined;
  let reference: string | undefined;
  let swiftBic: string | undefined;
  let paymentLink: string | undefined;

  for (const line of lines) {
    // Check for BSB (e.g. BSB: 065-000 or 065000)
    const bsbMatch = line.match(/(?:bsb|sort\s*code)[\s:=]+([0-9]{3}[-\s]?[0-9]{3})/i);
    if (bsbMatch && !bsb) {
      bsb = bsbMatch[1].trim();
      fields.push({ label: 'BSB', value: bsb });
      continue;
    }

    // Check for Account Number (e.g. Account: 1234 5678 or Acc No: 12345678)
    const accMatch = line.match(/(?:account\s*(?:no|number)?|acc\s*no|acc)[\s:=]+([0-9\s-]{6,15})/i);
    if (accMatch && !accountNumber) {
      accountNumber = accMatch[1].trim();
      fields.push({ label: 'Account Number', value: accountNumber });
      continue;
    }

    // Check for Account Name / Payee Name
    const nameMatch = line.match(/(?:account\s*name|name|payee|payable\s*to)[\s:=]+([^:\n]+)/i);
    if (nameMatch && !accountName) {
      accountName = nameMatch[1].trim();
      fields.push({ label: 'Account Name', value: accountName });
      continue;
    }

    // Check for PayID (phone number or email)
    const payIdMatch = line.match(/(?:payid|pay\s*id)[\s:=]+([^:\n]+)/i);
    if (payIdMatch && !payId) {
      payId = payIdMatch[1].trim();
      payIdType = payId.includes('@') ? 'Email' : 'Mobile / ABN';
      fields.push({ label: `PayID (${payIdType})`, value: payId });
      continue;
    }

    // Check for Bank Name
    const bankMatch = line.match(/(?:bank(?:\s*name)?|institution)[\s:=]+([^:\n]+)/i);
    if (bankMatch && !bankName) {
      bankName = bankMatch[1].trim();
      fields.push({ label: 'Bank', value: bankName });
      continue;
    }

    // Check for Reference
    const refMatch = line.match(/(?:reference|ref|order\s*(?:no|#))[\s:=]+([^:\n]+)/i);
    if (refMatch && !reference) {
      reference = refMatch[1].trim();
      fields.push({ label: 'Payment Reference', value: reference });
      continue;
    }

    // Check for SWIFT / BIC
    const swiftMatch = line.match(/(?:swift|bic)[\s:=]+([A-Z0-9]{8,11})/i);
    if (swiftMatch && !swiftBic) {
      swiftBic = swiftMatch[1].trim();
      fields.push({ label: 'SWIFT / BIC', value: swiftBic });
      continue;
    }

    // Check for Payment Link
    const urlMatch = line.match(/(https?:\/\/[^\s]+)/i);
    if (urlMatch && !paymentLink) {
      paymentLink = urlMatch[1].trim();
      fields.push({ label: 'Payment Link', value: paymentLink });
      continue;
    }

    // Generic key: value line if not matched above
    const genericMatch = line.match(/^([A-Za-z\s]+)[:=-]\s*(.+)$/);
    if (genericMatch && genericMatch[1] && genericMatch[2]) {
      fields.push({ label: genericMatch[1].trim(), value: genericMatch[2].trim() });
    }
  }

  // If no fields parsed via regex patterns, provide default lines as raw fields
  if (fields.length === 0 && lines.length > 0) {
    lines.forEach((l, idx) => {
      fields.push({ label: `Line ${idx + 1}`, value: l });
    });
  }

  return {
    raw: rawText,
    bankName,
    accountName,
    bsb,
    accountNumber,
    payId,
    payIdType,
    reference,
    swiftBic,
    paymentLink,
    fields,
  };
}

/**
 * Formats monetary amounts in AUD currency.
 */
export function money(amount: number, locale = 'en-AU', currency = 'AUD'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Returns plain text lines describing payment terms for WhatsApp, email or composers.
 */
export function paymentTermsLines(orderTotal: number, discountAmount = 0): string[] {
  const lines = [
    `Minimum order: ${money(SITE.orderRules.minOrder)}`,
    `Free refrigerated delivery for orders over ${money(SITE.orderRules.freeShippingThreshold)}`,
    `Flat rate refrigerated shipping: ${money(SITE.orderRules.flatShippingFee)}`,
    `Bank Transfer (OSKO) & PayID: 5% instant discount applies (${discountAmount > 0 ? `Saved: ${money(discountAmount)}` : 'applied at payment'})`,
    `Cold-Chain Delivery: Kept at 0–3°C in temperature-controlled transport across SA & interstate.`,
    `Please quote your order reference number on your transfer.`,
  ];
  return lines;
}

/**
 * Returns HTML representation of payment terms.
 */
export function paymentTermsHtml(orderTotal: number, discountAmount = 0): string {
  const lines = paymentTermsLines(orderTotal, discountAmount);
  return `<ul style="margin: 0; padding-left: 20px; color: #4B5563; font-size: 14px; line-height: 1.6;">${lines
    .map((line) => `<li style="margin-bottom: 6px;">${line}</li>`)
    .join('')}</ul>`;
}
