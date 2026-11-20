import { NextRequest, NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { getEnquiry, deleteEnquiry } from '@/lib/enquiryStore';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminPasscode(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const enquiry = await getEnquiry(id);
  if (!enquiry) {
    return NextResponse.json({ ok: false, error: 'Enquiry not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, enquiry });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminPasscode(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const success = await deleteEnquiry(id);
  return NextResponse.json({ ok: success });
}
