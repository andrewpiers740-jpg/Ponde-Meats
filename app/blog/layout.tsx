import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Butcher Blog – Wholesale Meat Guides',
  description: 'Guides from Ponde Meats on buying bulk beef, lamb, goat and mutton, freezer boxes, carcass cuts and slow cooking.',
  alternates: { canonical: '/blog' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
