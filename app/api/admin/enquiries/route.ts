import { NextRequest, NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { listEnquiries } from '@/lib/enquiryStore';

export async function GET(req: NextRequest) {
  if (!checkAdminPasscode(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const enquiries = await listEnquiries();
  return NextResponse.json({
    ok: true,
    total: enquiries.length,
    enquiries,
  });
}
