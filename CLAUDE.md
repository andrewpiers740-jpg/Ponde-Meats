# Ponde Meats — project instructions

Next.js 15 (App Router, TypeScript) wholesale butcher store for Cowirra SA. Deploy target: Vercel (GitHub). Currency AUD, GST inclusive.

## Non-negotiable
- **Trustpilot reviews are real and must never be edited, reworded, removed or regenerated.** `TRUSTPILOT_REVIEWS`, `SITE.reviewsSummary` and `components/TrustpilotWidget.tsx` are owner-protected (owner rule).
- Never invent brand facts, awards, press, reviews or statistics. Real facts only.
- Price rule: product prices are capped at 10% below the nearest comparable Australian competitor. Never raise a price to meet the cap; only lower.
- Product images must match the product name. If no correct photo exists, use the branded "photo coming soon" tile, never a wrong photo.
- If a request would break any of the above, stop and say so.

## Architecture
- `src/config/site.ts` = site facts, order rules, categories, reviews. `src/config/products.ts` = 85 products (generated originally by `scripts/build-products-and-images.mjs`; edit products.ts directly).
- Order rules: min $200, free shipping over $1000, $20 flat fee, 5% off for Bank Transfer (OSKO) / PayID.
- Reply portal: `/admin/*` (passcode via `ADMIN_PASSCODE`), Upstash Redis, SMTP mailer (`lib/mailer.ts`).
- Domain lives in `SITE.domain`; agent files in `public/` (llms.txt, auth.md, .well-known/*) must match it.

## Rules
- `npx tsc --noEmit && npx next build` must pass before every push.
- One `<h1>` per page; unique title (template adds "| Ponde Meats"); description ≤160; canonical set; sitemap URLs without trailing slash.
- Emails are light-themed (no dark body).

## Live placeholders (site still works without them)
SMTP_HOST/PORT/USER/PASS/FROM, ADMIN_PASSCODE, Upstash Redis URL+token, Search Console + Bing codes, Tawk.to ID, WhatsApp 61485901075.
