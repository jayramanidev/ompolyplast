# OM Polyplast — SEO Checklist

Status: v1.0 · Owner: SEO/Developer · Consumers: developer (technical items), content writer (on-page items), whoever owns local listings
Related: `content-strategy.md` (the plan this checklist executes)

Use this as a literal pre-launch and post-launch checklist — check items off, don't just read them.

---

## 1. Technical SEO

- [ ] `sitemap.xml` auto-generated from published Products/Categories, submitted to Google Search Console
- [ ] `robots.txt` allows crawling of all public routes, disallows `/admin` and `/api`
- [ ] Canonical tags on every page (self-referencing by default; important for filtered category URLs — filters should not create duplicate indexable pages)
- [ ] Structured data (Organization/LocalBusiness, Product, BreadcrumbList) validated with Google's Rich Results Test on every template, not just spot-checked on one page
- [ ] Mobile-first rendering verified — mobile is the dominant traffic source for this buyer segment; test on an actual mid-tier Android device, not just desktop DevTools emulation
- [ ] HTTPS enforced site-wide, no mixed-content warnings
- [ ] Core Web Vitals pass "Good" thresholds on real product pages (not just the homepage) — see `TRD.md` §5 for exact budgets
- [ ] 404 page exists and offers navigation back into the catalog (not a dead end)
- [ ] No orphan pages — every category/product reachable via on-site navigation, not just the sitemap
- [ ] `hreflang` — not applicable at launch (English-only); revisit if Gujarati/Hindi is added later (`PRD.md` P2)

## 2. On-Page SEO

- [ ] Every page has a unique, non-templated meta title and description (per `content-strategy.md` §3 templates, filled with real content — not the literal template text)
- [ ] One `<h1>` per page, matching the primary keyword focus for that page
- [ ] Every product image has descriptive alt text (product name + one key spec — doubles as an accessibility requirement, see `design.md` §3)
- [ ] Internal linking: every category page links to its products; every product page links back to its category and to ≥1 related product
- [ ] No thin category pages — each has genuine unique intro copy per `content-strategy.md` §2, not a one-line stub above the product grid
- [ ] Spec tables use real, complete values — a blank spec field is both a UX and an SEO miss (buyers and search snippets both want the number)

## 3. Local SEO (Rajkot-specific)

- [ ] Google Business Profile created/claimed and fully filled out (category: e.g. "Plastic products supplier"), address verified
- [ ] NAP (Name, Address, Phone) is byte-for-byte identical across: site footer, Contact page, LocalBusiness schema, and Google Business Profile — inconsistency here is a common, avoidable local-ranking penalty
- [ ] Business hours listed consistently in GBP and on the Contact page
- [ ] Encourage and respond to Google reviews post-launch (no fabricated reviews, ever)
- [ ] Existing trade-directory profiles (IndiaMART/TradeIndia/JustDial, etc., if any) updated to link to the new site — these often already carry some domain authority worth reclaiming
- [ ] Rajkot named explicitly and naturally in Home, About, and Contact copy (not keyword-stuffed — see `content-strategy.md` writing rule)
- [ ] Embedded Google Map on Contact and About pages, pointing to the verified GBP location

## 4. Post-Launch (ongoing, not one-time)

- [ ] Monitor Search Console weekly for the first month for crawl errors or manual actions
- [ ] Track keyword cluster rankings (`content-strategy.md` §1) monthly
- [ ] Review GA4 RFQ-funnel drop-off (`PRD.md` §8 metrics) and iterate on the highest-drop-off step first
- [ ] Re-validate structured data after any admin-driven content model change
