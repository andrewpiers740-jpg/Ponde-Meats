import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Products',
  description: 'Search Ponde Meats wholesale cuts, meat boxes and carcasses by name or category.',
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
