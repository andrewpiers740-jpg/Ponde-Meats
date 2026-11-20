import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Wholesale Beef, Lamb, Goat & Mutton',
  description: 'Browse 85 wholesale cuts, meat boxes and whole carcasses from Cowirra SA. Beef, lamb, Boer goat and mutton with cold-chain delivery. Min order $200.',
  alternates: { canonical: '/shop' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
