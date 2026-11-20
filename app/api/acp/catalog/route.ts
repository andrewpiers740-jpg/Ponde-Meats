import { NextResponse } from 'next/server';
import { PRODUCTS, SITE } from '@/src/config/site';

export async function GET() {
  return NextResponse.json({
    acpVersion: '1.0',
    store: SITE.name,
    domain: SITE.domain,
    catalog: PRODUCTS.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.variants[0]?.price ?? p.price,
      pricePerUnit: p.price,
      unit: p.unit,
      variants: p.variants.map((v) => ({ id: v.id, name: v.name, weightKg: v.weightKg ?? null, price: v.price })),
      currency: 'AUD',
      inStock: true,
      url: `https://${SITE.domain}/shop/${p.category}/${p.slug}`,
    })),
  });
}
