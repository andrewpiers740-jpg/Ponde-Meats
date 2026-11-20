import React from 'react';
import { SITE } from '@/src/config/site';

interface JsonLdProps {
  type?: 'Store' | 'Product' | 'BreadcrumbList' | 'FAQPage';
  data?: Record<string, unknown>;
}

export default function JsonLd({ type = 'Store', data }: JsonLdProps) {
  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'ButcherShop',
    '@id': `https://${SITE.domain}/#butcher`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: `https://${SITE.domain}`,
    logo: `https://${SITE.domain}/images/logo.jpg`,
    image: `https://${SITE.domain}/images/logo.jpg`,
    description: SITE.subTagline,
    telephone: SITE.contact.phone,
    email: SITE.contact.email,
    taxID: SITE.abn,
    priceRange: '$$',
    currenciesAccepted: 'AUD',
    paymentAccepted: 'Bank Transfer (OSKO), PayID',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.contact.address,
      addressLocality: SITE.contact.suburb,
      addressRegion: SITE.contact.state,
      postalCode: SITE.contact.postcode,
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -34.9205,
      longitude: 139.3134,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '06:00',
        closes: '16:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '07:00',
        closes: '12:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.75',
      reviewCount: '1548',
      bestRating: '5',
      worstRating: '1',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://${SITE.domain}/search/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const schemaToRender = data || defaultSchema;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaToRender) }}
    />
  );
}
