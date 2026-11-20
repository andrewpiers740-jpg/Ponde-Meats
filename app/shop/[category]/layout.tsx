import type { Metadata } from 'next';
import { CATEGORIES, SITE } from '@/src/config/site';

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.id === category);
  if (!cat) return { title: 'Category not found' };
  const desc = `Buy wholesale ${cat.name.toLowerCase()} in bulk from ${SITE.contact.suburb} SA. ${cat.tagline}. Cold-chain delivery, min order $${SITE.orderRules.minOrder}.`.slice(0, 158);
  return {
    title: `Wholesale ${cat.name} South Australia`,
    description: desc,
    alternates: { canonical: `/shop/${cat.id}` },
  };
}

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
