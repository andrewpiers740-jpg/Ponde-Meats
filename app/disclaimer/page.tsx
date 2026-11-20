import React from 'react';
import Link from 'next/link';
import { SITE } from '@/src/config/site';
import { ExternalLink, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#121212] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
            Regulatory Disclosures &amp; Statutory Standards
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Legal Disclaimer &amp; Meat Authorities
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300">
            Australian statutory compliance, food safety frameworks, and official regulatory links.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-sm text-neutral-700 space-y-10 leading-relaxed">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-3">1. Safe Handling &amp; Food Preparation Notice</h2>
          <p className="mb-3">
            All meat products supplied by Ponde Meats are raw, fresh, or frozen agricultural commodities that must be stored, handled, and cooked according to Australian food hygiene standards:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-xs">
            <li>Keep refrigerated at or below 4°C, or deep frozen at -18°C.</li>
            <li>Thaw frozen meat in the refrigerator, never on the counter at room temperature.</li>
            <li>Wash hands, cutting boards, knives, and prep surfaces with hot soapy water after touching raw meat.</li>
            <li>Cook ground meat and poultry to an internal temperature of 71°C; cook whole beef, lamb, and goat steaks/roasts to your preferred internal doneness (minimum 63°C recommended).</li>
          </ul>
        </div>

        {/* Official Australian Meat Authorities & Regulators */}
        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">
            2. Australian Red Meat Regulators &amp; Industry Authorities
          </h2>
          <p className="text-xs text-neutral-600 mb-4">
            Our processing facility at 32 Loxton Rd, Cowirra SA operates under the oversight of, and adheres to the specifications of, the following Australian regulatory authorities:
          </p>

          <div className="space-y-3">
            {SITE.authorities.map((auth) => (
              <div
                key={auth.acronym}
                className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900 text-sm">{auth.name}</span>
                    <span className="text-[10px] bg-neutral-200 text-neutral-800 font-bold px-1.5 py-0.5 rounded">
                      {auth.acronym}
                    </span>
                  </div>
                  <p className="text-neutral-500 mt-1">{auth.role}</p>
                </div>
                <a
                  href={auth.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#881326] hover:underline shrink-0"
                >
                  <span>Official Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-3">3. Allergen &amp; Additive Disclosure</h2>
          <p>
            All our single cuts, whole carcasses, and primal boxes contain 100% natural, pasture-raised Australian red meat with zero added preservatives, binders, or artificial coloring. Certain specialty manufactured sausages may contain gluten, sulfites, or natural spices; detailed ingredient lists are clearly labelled on product packaging in compliance with the Australia New Zealand Food Standards Code.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-3">4. Limitation of Liability</h2>
          <p>
            While Ponde Meats exercises meticulous care in butchery, packaging, and cold-chain temperature management, our liability is limited strictly to product replacement or refund in accordance with Australian Consumer Law.
          </p>
        </div>
      </div>
    </div>
  );
}
