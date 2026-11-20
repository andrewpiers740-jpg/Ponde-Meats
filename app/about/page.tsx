import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE } from '@/src/config/site';
import { ShieldCheck, Snowflake, MapPin, Award, CheckCircle, ExternalLink, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-[#121212] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Est. {SITE.foundingYear} · Cowirra, South Australia
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              About Ponde Meats
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Wholesale butchery founded on ethical South Australian livestock, authentic abattoir craftsmanship, and direct cold-chain delivery.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8 text-neutral-700 text-sm leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                South Australian Paddock-to-Plate Tradition
              </h2>
              <p className="mb-4">
                Founded in 2022 at <strong>32 Loxton Rd, Cowirra SA 5238</strong>, Ponde Meats (ABN{' '}
                <a href={SITE.abnLink} target="_blank" rel="noopener noreferrer" className="text-[#881326] underline font-mono">
                  {SITE.abn}
                </a>
                ) was established to solve a clear problem in the Australian red meat supply chain: bridge the gap between quality South Australian pastures and commercial kitchens and families who want real butcher-grade meat without exorbitant retail supermarket markups.
              </p>
              <p>
                Situated along the Murray River corridor connecting the Riverland and Murraylands, our facility has direct access to some of the nation’s finest prime cattle, grazing sheep, and Australian Boer goats.
              </p>
            </div>

            {/* Core Values */}
            <div className="space-y-4 pt-4 border-t border-neutral-200">
              <h3 className="text-lg font-bold text-neutral-900">
                Our Butchery Principles
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <div className="p-2 bg-[#881326] text-white rounded shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm mb-1">
                      1. True Whole Carcass Butchery
                    </h4>
                    <p className="text-neutral-600 leading-relaxed">
                      We honour the whole animal. Customers can purchase sides of beef, whole lamb carcasses, whole Boer goats, and mutton carcasses. Our butchers provide tailored portion cutting, bone-and-roll roasts, cutlets, steaks, and trim packaging.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <div className="p-2 bg-[#881326] text-white rounded shrink-0">
                    <Snowflake className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm mb-1">
                      2. Unbroken Cold-Chain Integrity (0–3°C)
                    </h4>
                    <p className="text-neutral-600 leading-relaxed">
                      Perishable meat should never sit on unrefrigerated loading bays. From our temperature-regulated boning rooms to certified refrigerated delivery vans, temperature logs are maintained end-to-end.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <div className="p-2 bg-[#881326] text-white rounded shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm mb-1">
                      3. Regulatory Compliance &amp; Traceability
                    </h4>
                    <p className="text-neutral-600 leading-relaxed">
                      Fully registered under South Australian food safety and primary industry statutes, adhering to Safe Food SA, FSANZ, and AUS-MEAT specifications. Full traceability on all livestock origins.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div className="pt-4 border-t border-neutral-200 space-y-4">
              <h3 className="text-lg font-bold text-neutral-900">
                Facility Milestones
              </h3>
              <div className="border-l-2 border-[#881326] pl-4 space-y-4 text-xs">
                <div>
                  <span className="font-bold text-[#881326] block">2022</span>
                  <span className="font-semibold text-neutral-900">Founding in Cowirra, South Australia</span>
                  <p className="text-neutral-600 mt-0.5">
                    Established abattoir processing operations at 32 Loxton Rd, Cowirra SA, servicing regional Murraylands butchers and food service.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-[#881326] block">2023</span>
                  <span className="font-semibold text-neutral-900">Cold-Chain Fleet &amp; Wholesale Expansion</span>
                  <p className="text-neutral-600 mt-0.5">
                    Launched temperature-controlled cold-chain delivery routes across Greater Adelaide, Fleurieu, and Riverland corridors.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-[#881326] block">2024</span>
                  <span className="font-semibold text-neutral-900">Direct-to-Customer &amp; 1,500+ Trustpilot Milestone</span>
                  <p className="text-neutral-600 mt-0.5">
                    Introduced curated family bulk freezer boxes and carcass orders with direct Bank Transfer (OSKO) and PayID checkout. Surpassed 1,500 verified reviews with a 4.75 TrustScore.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Facility Quick Facts Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-50 p-6 sm:p-8 rounded-xl border border-neutral-200 space-y-5">
              <div className="relative w-16 h-16 rounded overflow-hidden border border-neutral-200 bg-white p-1">
                <Image
                  src="/images/logo.jpg"
                  alt="Ponde Meats"
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h3 className="font-bold text-base text-neutral-900">{SITE.legalName}</h3>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">ABN: {SITE.abn}</p>
              </div>

              <div className="space-y-3 text-xs text-neutral-600 pt-3 border-t border-neutral-200">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#881326] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900 block">Facility Address:</strong>
                    <span>32 Loxton Rd, Cowirra SA 5238</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900 block">Licensing:</strong>
                    <span>Primary Industries &amp; Regions SA (PIRSA) Compliance</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Snowflake className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900 block">Freight Dispatch:</strong>
                    <span>Chilled (0–3°C) Vans &amp; Pallet Freight</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <Link
                  href="/contact"
                  className="w-full py-2.5 px-4 bg-[#881326] hover:bg-[#721020] text-white rounded font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Visit Our Cowirra Facility</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
