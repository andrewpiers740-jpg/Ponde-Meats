import { NextRequest, NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { getEnquiry, markEnquiryReplied } from '@/lib/enquiryStore';
import { sendEmail } from '@/lib/mailer';
import { enquiryReplyEmail } from '@/utils/emailTemplates';

export async function POST(req: NextRequest) {
  if (!checkAdminPasscode(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized: Invalid Passcode' }, { status: 401 });
  }

  try {
    const { enquiryId, replyMessage } = await req.json();

    if (!enquiryId || !replyMessage) {
      return NextResponse.json({ ok: false, error: 'enquiryId and replyMessage are required' }, { status: 400 });
    }

    const enquiry = await getEnquiry(enquiryId);
    if (!enquiry) {
      return NextResponse.json({ ok: false, error: 'Enquiry not found' }, { status: 404 });
    }

    const mail = enquiryReplyEmail(enquiry, replyMessage);
    const emailResult = await sendEmail({
      to: enquiry.email,
      subject: mail.subject,
      html: mail.html,
    });

    const updated = await markEnquiryReplied(enquiryId, replyMessage);

    return NextResponse.json({
      ok: true,
      message: 'Reply email dispatched successfully to customer',
      emailResult,
      enquiry: updated,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
