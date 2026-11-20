export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'carcass-yields-side-of-beef-whole-lamb',
    title: 'Understanding Carcass Hung Weights vs Take-Home Meat Yield: Side of Beef & Whole Lamb',
    excerpt: 'A master butcher’s breakdown of what happens when you purchase a whole or half animal carcass: bone-in vs boneless yields, fat trim, and freezer storage planning.',
    date: 'November 2026',
    readTime: '6 min read',
    category: 'Butcher Knowledge',
    author: 'Head Butcher, Cowirra SA',
  },
  {
    slug: 'cold-chain-meat-freshness-guide',
    title: 'Why 0–3°C Cold Chain Transport Is Essential For Premium Meat Quality',
    excerpt: 'How strict refrigeration from the abattoir chilling room directly to your doorstep locks in natural juices, prevents bacterial multiplication, and enhances dry-aging tenderness.',
    date: 'November 2026',
    readTime: '4 min read',
    category: 'Food Safety & Logistics',
    author: 'Cold-Chain Logistics Team',
  },
  {
    slug: 'australian-boer-goat-meat-cuts-guide',
    title: 'The Ultimate Guide to Australian Boer Goat Cuts for Curries, Biryanis & Roasts',
    excerpt: 'Boer goat is lean, tender, and uniquely sweet. Learn which cuts to choose — bone-in shoulder chunks for slow-simmered curries, whole legs for spit roasting, and meaty shanks.',
    date: 'October 2026',
    readTime: '5 min read',
    category: 'Meat Guides',
    author: 'Culinary Butcher Team',
  },
  {
    slug: 'heritage-mutton-slow-cooking-flavour',
    title: 'A Butcher’s Secret: Why Heritage Mutton Delivers Superior Flavour in Slow Braises',
    excerpt: 'Rediscover the deep, rich flavour profile of Australian pasture mutton. Why chefs and traditional home cooks prefer prime mutton over young lamb for long braises and tagines.',
    date: 'October 2026',
    readTime: '5 min read',
    category: 'Butcher Knowledge',
    author: 'Ponde Meats Abattoir Staff',
  },
];
