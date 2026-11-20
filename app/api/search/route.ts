import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS } from '@/src/config/site';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const query = q.toLowerCase().trim();

  if (!query) {
    return NextResponse.json({ ok: true, query: '', results: [] });
  }

  const results = PRODUCTS.filter((p) => {
    return (
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.longDescription.toLowerCase().includes(query) ||
      p.variants.some((v) => v.name.toLowerCase().includes(query)) ||
      (p.badge && p.badge.toLowerCase().includes(query))
    );
  });

  return NextResponse.json({
    ok: true,
    query,
    count: results.length,
    results,
  });
}
