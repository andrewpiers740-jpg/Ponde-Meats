import nodemailer, { type Transporter } from 'nodemailer';
import { SITE } from '@/src/config/site';

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

export interface SendMailResult {
  sent: boolean;
  messageId?: string;
  simulated?: boolean;
  error?: string;
}

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;

  if (!host || host === 'pending' || !user || user === 'pending') {
    return null;
  }

  try {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });
    return transporter;
  } catch (err) {
    console.warn('Failed to configure SMTP transporter:', err);
    return null;
  }
}

/**
 * Sends email via SMTP lazy singleton. If SMTP is unconfigured, returns { sent: false, simulated: true }
 * without crashing or throwing an unhandled exception.
 */
export async function sendEmail(opts: SendMailOptions): Promise<SendMailResult> {
  const mailTransporter = getTransporter();
  const fromAddress =
    opts.from ||
    process.env.SMTP_FROM ||
    `"${SITE.name}" <${process.env.SMTP_USER || SITE.contact.email}>`;

  if (!mailTransporter) {
    console.log(
      `[SIMULATED EMAIL - SMTP PENDING] To: ${opts.to} | Subject: "${opts.subject}" | From: ${fromAddress}`
    );
    return {
      sent: false,
      simulated: true,
      messageId: `sim-${Date.now()}`,
    };
  }

  try {
    const info = await mailTransporter.sendMail({
      from: fromAddress,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      replyTo: opts.replyTo || SITE.contact.email,
    });

    return {
      sent: true,
      messageId: info.messageId,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('SMTP send failed:', errorMessage);
    return {
      sent: false,
      error: errorMessage,
    };
  }
}
