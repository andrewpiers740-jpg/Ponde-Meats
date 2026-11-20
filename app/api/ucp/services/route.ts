import { NextResponse } from 'next/server';
import { SITE } from '@/src/config/site';

export async function GET() {
  return NextResponse.json({
    ucp: '1.0',
    provider: SITE.name,
    domain: SITE.domain,
    services: [
      {
        id: 'wholesale-meat-ordering',
        name: 'South Australia Wholesale Meat Supply',
        description: 'Pasture-raised beef, lamb, Boer goat and mutton in bulk boxes and whole carcasses.',
        supportedPaymentRails: ['Bank Transfer (OSKO)', 'PayID'],
        minimumOrderAud: SITE.orderRules.minOrder,
      },
      {
        id: 'cold-chain-freight',
        name: 'Refrigerated Transport Service',
        description: '0–3°C cold-chain transport across SA & Interstate.',
      },
    ],
  });
}
