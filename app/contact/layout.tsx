import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Ponde Meats – Cowirra SA Butcher',
  description: 'Contact Ponde Meats at 32 Loxton Rd, Cowirra SA 5238. Call 0485 901 075, email or WhatsApp for wholesale meat orders and delivery quotes.',
  alternates: { canonical: '/contact' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
