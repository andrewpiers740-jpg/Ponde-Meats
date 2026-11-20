import type { Metadata } from 'next';
import './globals.css';
import { SITE } from '@/src/config/site';
import { CartProvider } from '@/lib/cartContext';
import AnnouncementBar from '@/components/AnnouncementBar';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import ChatHub from '@/components/ChatHub';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: `${SITE.name} – ${SITE.tagline}`,
  description: `${SITE.subTagline}. Minimum order $200, free delivery over $1000, 5% OSKO/PayID discount.`,
  openGraph: {
    title: `${SITE.name} – Wholesale & Bulk Butcher SA`,
    description: 'South Australia’s premier wholesale butcher in Cowirra SA. Prime beef, lamb, Boer goat & mutton.',
    type: 'website',
    url: `https://${SITE.domain}`,
    siteName: SITE.name,
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} – Wholesale Butcher South Australia`,
    description: 'Fresh grass-fed beef, pasture lamb, Boer goat & mutton wholesale from Cowirra SA.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-neutral-900 antialiased selection:bg-[#881326] selection:text-white" suppressHydrationWarning>
        <CartProvider>
          <AnnouncementBar />
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <CheckoutModal />
          <ChatHub />
        </CartProvider>
      </body>
    </html>
  );
}
