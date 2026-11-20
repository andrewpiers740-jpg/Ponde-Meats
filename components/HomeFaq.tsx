'use client';

import React, { useState, useMemo } from 'react';
import { SITE } from '@/src/config/site';
import {
  ChevronDown,
  Search,
  HelpCircle,
  ShieldCheck,
  Truck,
  CreditCard,
  Beef,
  Phone,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

export interface FAQItem {
  id: string;
  category: 'sourcing' | 'logistics' | 'payment' | 'storage';
  question: string;
  answer: string;
  keyPoints?: string[];
}

export const FAQ_DATA: FAQItem[] = [
  // ================= SOURCING & QUALITY =================
  {
    id: 'sourcing-origin',
    category: 'sourcing',
    question: 'Where does Ponde Meats source its beef, lamb, goat, and mutton?',
    answer:
      'All our red meat is 100% Australian grown, sourced directly from pristine South Australian pastoral runs in the Fleurieu Peninsula, Murraylands, and Riverland corridor. Livestock is ethically pasture-raised and grain-assisted on family-owned South Australian farms. All slaughtering, carcass aging, custom portioning, and packing occur at our state-licensed facility at 32 Loxton Rd, Cowirra SA 5238 (ABN 42 395 857 236).',
    keyPoints: [
      '100% South Australian livestock direct from Murraylands & Riverland pastures',
      'Processed & packed at 32 Loxton Rd, Cowirra SA',
      'No multi-warehouse distributor markups or prolonged handling delays',
    ],
  },
  {
    id: 'sourcing-halal-grading',
    category: 'sourcing',
    question: 'Is your meat Halal certified and AUS-MEAT quality graded?',
    answer:
      'Yes. 100% of our beef, lamb, Boer goat, and mutton is processed under strict Australian Government-accredited Halal standards by certified Muslim slaughtermen. Our processing plant complies with uniform AUS-MEAT specifications, and our operations are licensed and audited under Primary Industries and Regions SA (PIRSA) and Safe Food SA biosecurity standards.',
    keyPoints: [
      '100% Halal certified processing with formal certification available',
      'Compliant with AUS-MEAT national uniform specifications',
      'Audited by PIRSA and Safe Food South Australia',
    ],
  },
  {
    id: 'sourcing-carcass-custom',
    category: 'sourcing',
    question: 'How does whole and half carcass custom butchery work?',
    answer:
      'When you order a Whole or Half Carcass (Side of Beef, Whole Lamb, Whole Boer Goat, or Mutton), you receive direct abattoir-level wholesale hung-weight value. Our master butchers prepare the carcass according to your exact specifications: you select roast styles (bone-in or boneless rolled), steak thicknesses (e.g. 25mm tomahawks or T-bones), diced curry sizes (with or without bone), and mince ratios. Every cut is individually vacuum-sealed (cryovaced) and clearly labelled for effortless freezer storage.',
    keyPoints: [
      'Tailored cutting schedule: choose roasts, chops, steaks, curry cubes, and mince',
      'Every single portion is vacuum-sealed and labelled with cut name and pack date',
      'Includes soup bones, marrow shanks, and trim on request',
    ],
  },
  {
    id: 'sourcing-supermarket-vs-wholesale',
    category: 'sourcing',
    question: 'How is abattoir-direct wholesale meat different from supermarket meat?',
    answer:
      'Supermarket meat is commonly cut in centralized distribution centers, gas-flushed (modified atmosphere packaging) to maintain an artificial red bloom, and handled through multiple logistics hubs before reaching retail shelves. In contrast, Ponde Meats dry-ages primals naturally on the bone, hand-trims each cut to order, and vacuum-seals meat fresh with zero gas flushing or artificial preservatives. You receive fresher meat with superior tenderness, zero moisture loss, and true commercial wholesale pricing.',
    keyPoints: [
      'Natural bone aging vs. gas-flushed supermarket packaging',
      'Hand-portioned on order by master butchers in Cowirra SA',
      'Substantial savings of 25% to 40% compared to typical retail butcher prices',
    ],
  },

  // ================= LOGISTICS & DELIVERY =================
  {
    id: 'logistics-cold-chain',
    category: 'logistics',
    question: 'How does cold-chain delivery work from your Cowirra facility?',
    answer:
      'We maintain an unbroken, certified cold chain at 0°C to 3°C from our Cowirra processing floor to your receiving door. Once vacuum-sealed, products are chilled in commercial refrigeration before being loaded directly onto refrigerated freight vehicles equipped with continuous temperature logging. This guarantees your meat arrives ice-cold, food-safe, and ready for immediate refrigeration or deep freezing.',
    keyPoints: [
      'Continuous temperature logging maintained strictly between 0°C and 3°C',
      'Certified refrigerated transport vehicles across South Australia',
      'Temperature verified upon handover at delivery',
    ],
  },
  {
    id: 'logistics-zones-fees',
    category: 'logistics',
    question: 'Where do you deliver, and what are the shipping costs?',
    answer:
      'We operate scheduled refrigerated delivery routes across metropolitan Adelaide, Adelaide Hills, the Murraylands corridor, Barossa Valley, Riverland, Fleurieu Peninsula, and regional South Australia, alongside scheduled interstate refrigerated freight runs. Delivery is a low flat rate of $20 per shipment, regardless of carton weight. All orders of $1,000 or more qualify for 100% Free Refrigerated Cold-Chain Delivery.',
    keyPoints: [
      'Flat $20 refrigerated delivery fee anywhere in our service area',
      'FREE refrigerated delivery on all bulk orders over $1,000',
      'Servicing metro Adelaide, regional SA, and scheduled interstate freight',
    ],
  },
  {
    id: 'logistics-min-order',
    category: 'logistics',
    question: 'Why is there a $200 minimum order requirement?',
    answer:
      'Because Ponde Meats operates as a genuine wholesale supplier using certified temperature-controlled refrigerated freight rather than standard couriers, our $200 order minimum covers the logistics overhead of cold-chain packing and refrigerated route transport. This allows us to pass genuine wholesale bulk rates down to households, farm homesteads, catering teams, and restaurants.',
    keyPoints: [
      'Minimum order is $200 AUD (including GST)',
      'Ensures cost efficiency for commercial refrigerated delivery',
      'Combine beef, lamb, goat, or mutton boxes to reach the minimum',
    ],
  },
  {
    id: 'logistics-unattended',
    category: 'logistics',
    question: 'What happens if I am not home when the delivery arrives?',
    answer:
      'We send SMS and WhatsApp dispatch notifications with an estimated delivery window prior to arrival. If you will not be home, please let us know your preferred shaded, secure location (such as a carport, verandah, or esky). We pack orders in heavy-duty commercial thermal cartons with food-grade gel ice packs that maintain cold temperatures for several hours until you return.',
    keyPoints: [
      'Proactive WhatsApp / SMS delivery window notifications',
      'Heavy-duty insulated cartons with commercial ice packs ensure safety',
      'Proof of delivery photo sent via WhatsApp or email upon drop-off',
    ],
  },

  // ================= PAYMENTS, OSKO, PAYID =================
  {
    id: 'payment-osko-discount',
    category: 'payment',
    question: 'Why do you offer an instant 5% discount for Bank Transfer (OSKO) and PayID?',
    answer:
      'Traditional credit card gateways and buy-now-pay-later platforms charge merchant fees between 2.5% and 4.5% per transaction. By choosing Australian fast bank payments (OSKO or PayID), those third-party fees are eliminated entirely. As a wholesale butcher, we pass 100% of these processing fee savings directly back to you as an automatic 5% instant discount applied at checkout.',
    keyPoints: [
      'Instant 5% discount applied automatically on OSKO and PayID orders',
      'Zero credit card surcharges or hidden platform booking fees',
      'Direct South Australian business-to-customer bank transfer',
    ],
  },
  {
    id: 'payment-how-to-pay',
    category: 'payment',
    question: 'How do I complete payment using PayID or Bank Transfer (OSKO)?',
    answer:
      'When completing checkout, select "Bank Transfer (OSKO)" or "PayID". You will receive an immediate confirmation screen and email with our South Australian business PayID and official BSB/Account numbers, alongside your unique 5-digit order reference number (e.g. #32975). Open your mobile banking app, enter the payment details with your order reference in the description, and transfer. PayID and OSKO clear in seconds.',
    keyPoints: [
      'Enter our registered Australian business PayID or BSB/Account',
      'Always quote your 5-digit order reference in the transfer description',
      'Upload receipt directly to our portal or text to WhatsApp: 0485 901 075',
    ],
  },
  {
    id: 'payment-confirmation-time',
    category: 'payment',
    question: 'How quickly is my order confirmed and scheduled after transferring?',
    answer:
      'OSKO and PayID payments clear near-instantly (within 60 seconds). As soon as the transfer registers, our Cowirra dispatch coordinator confirms receipt via WhatsApp and email, generates your official tax invoice, and assigns your order to the upcoming morning butcher cut and refrigerated packing schedule.',
    keyPoints: [
      'Near-instant clearance through Australian New Payments Platform (NPP)',
      'Immediate order confirmation and tax invoice via WhatsApp and email',
      'Dispatched on the next scheduled refrigerated cold-chain route',
    ],
  },

  // ================= STORAGE & GUARANTEE =================
  {
    id: 'storage-shelf-life',
    category: 'storage',
    question: 'How long does vacuum-packed (cryovac) meat last in the fridge and freezer?',
    answer:
      'Because our meat is vacuum-sealed in heavy-gauge barrier film that eliminates oxygen, its fresh refrigerated lifespan is substantially longer than supermarket cling-wrap meat. Unopened chilled cuts keep perfectly at 0°C to 3°C for up to 21 to 28 days from pack date. When placed directly into a domestic chest freezer, cryovaced meat freezes flat without freezer burn, preserving flavor, tenderness, and moisture for 12 to 18 months.',
    keyPoints: [
      'Up to 21–28 days fresh in your refrigerator (0°C to 3°C)',
      '12 to 18 months in the freezer with zero freezer burn or ice crystallization',
      'Packs freeze flat for organized, space-efficient chest freezer stacking',
    ],
  },
];

export default function HomeFaq() {
  const [activeTab, setActiveTab] = useState<'all' | 'sourcing' | 'logistics' | 'payment' | 'storage'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'sourcing-origin': true,
    'logistics-cold-chain': true,
    'payment-osko-discount': true,
  });

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesTab = activeTab === 'all' || item.category === activeTab;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesTab;
      const matchesQuery =
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        (item.keyPoints && item.keyPoints.some((p) => p.toLowerCase().includes(q)));
      return matchesTab && matchesQuery;
    });
  }, [activeTab, searchQuery]);

  const faqJsonLd = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_DATA.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };
  }, []);

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="py-16 sm:py-20 bg-[#FBF9F5] border-b border-neutral-200 relative"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= HEADER SECTION ================= */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-[#881326] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Customer Trust &amp; Transparency</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about our South Australian livestock sourcing, unbroken cold-chain delivery from Cowirra, PayID &amp; OSKO 5% discounts, and bulk freezer storage.
          </p>

          {/* Search bar */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. OSKO, delivery, Halal, freezer, Cowirra)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-neutral-300 rounded-xl shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#881326] focus:border-transparent text-neutral-900 placeholder:text-neutral-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400 hover:text-neutral-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter category buttons */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'all'
                  ? 'bg-[#121212] text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
              }`}
            >
              All Topics ({FAQ_DATA.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('sourcing')}
              className={`inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'sourcing'
                  ? 'bg-[#881326] text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
              }`}
            >
              <Beef className="w-3.5 h-3.5" />
              <span>Sourcing &amp; Quality</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('logistics')}
              className={`inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'logistics'
                  ? 'bg-[#881326] text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Cold-Chain Logistics</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('payment')}
              className={`inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'payment'
                  ? 'bg-[#881326] text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>OSKO / PayID (5% Off)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('storage')}
              className={`inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'storage'
                  ? 'bg-[#881326] text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Packaging &amp; Shelf Life</span>
            </button>
          </div>
        </div>

        {/* ================= ACCORDION LIST ================= */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-neutral-200 p-6">
              <HelpCircle className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-neutral-800">No matching questions found</p>
              <p className="text-xs text-neutral-500 mt-1">
                Try searching a different word or contact our butcher desk directly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('all');
                }}
                className="mt-4 px-4 py-1.5 bg-[#881326] text-white text-xs font-semibold rounded-md"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = !!openIds[faq.id];

              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-[#881326]/40 shadow-xs ring-1 ring-[#881326]/10'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-5 sm:px-6 py-4 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#881326]"
                  >
                    <span className="font-bold text-xs sm:text-sm text-neutral-900 leading-snug">
                      {faq.question}
                    </span>
                    <span
                      className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-200 ${
                        isOpen
                          ? 'bg-[#881326] text-white rotate-180'
                          : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100">
                      <p className="mb-3">{faq.answer}</p>

                      {faq.keyPoints && faq.keyPoints.length > 0 && (
                        <div className="mt-3 bg-neutral-50 rounded-lg p-3 border border-neutral-200/80 space-y-1.5">
                          {faq.keyPoints.map((point, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-2 text-[11px] text-neutral-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* ================= BUTCHER DESK HELP CARD ================= */}
        <div className="mt-10 sm:mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#881326] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-neutral-900">
                Have a specific cut or delivery question?
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                Speak directly with our Cowirra butcher counter (Mon–Fri 6:00 AM – 4:30 PM) or chat on WhatsApp.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href={`https://wa.me/${SITE.contact.whatsapp}?text=Hi%20Ponde%20Meats,%20I%20have%20a%20question%20about%20your%20wholesale%20meat%20orders:`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Butchery Desk</span>
            </a>

            <a
              href={`tel:${SITE.contact.phoneRaw}`}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Phone className="w-4 h-4" />
              <span>Call {SITE.contact.phoneFormatted}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
