import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wholesale Meat Accounts South Australia',
  description: 'Open a wholesale account with Ponde Meats for restaurants, butchers and caterers. Bulk beef, lamb, goat and mutton with refrigerated delivery.',
  alternates: { canonical: '/wholesale' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
