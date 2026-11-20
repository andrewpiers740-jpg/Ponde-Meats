import { NextRequest, NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { listOrders } from '@/lib/orderStore';

export async function GET(req: NextRequest) {
  if (!checkAdminPasscode(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized: Invalid Passcode' }, { status: 401 });
  }

  const orders = await listOrders();
  return NextResponse.json({
    ok: true,
    total: orders.length,
    orders,
  });
}
