import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS } from '@/src/config/site';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return NextResponse.json({ ok: false, error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, product });
}
