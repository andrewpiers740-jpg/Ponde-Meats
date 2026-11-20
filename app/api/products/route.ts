import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS } from '@/src/config/site';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');

  let list = PRODUCTS;

  if (category) {
    list = list.filter((p) => p.category === category);
  }

  if (subcategory) {
    list = list.filter((p) => p.subcategory === subcategory);
  }

  return NextResponse.json({
    ok: true,
    total: list.length,
    products: list,
  });
}
