# OM Polyplast — Design System & UI Specification

Status: v1.0 · Owner: Design · Consumers: UI/UX designer, frontend developer
Related: `PRD.md` (features), `architecture.md` (data behind these screens), `content-strategy.md` (copy for these screens)

---

## 1. Design Thesis

OM Polyplast sells tapes, films, strapping rolls, and shrink bags to people who buy packaging materials for a living — production managers, procurement officers, and traders who compare three quotes before lunch. They are not browsing for inspiration. They are verifying specs, checking MOQs, and deciding whether to pick up the phone.

The site should read like a **well-run factory's technical catalog**, not a SaaS landing page. Concretely, that means:

- Specs are typeset like specs (tabular, monospaced numerals), not buried in paragraph copy.
- Photography is real product photography (rolls, pallets, coils, the factory floor) — never stock photos of people in blazers shaking hands.
- The blue in the brand comes from packaging itself — poly film sheen, tape core color, HDPE pellet blue — not from a "trustworthy SaaS blue" gradient.
- Density is allowed. B2B buyers in this category are comfortable with tables and dense spec sheets; over-simplifying reads as consumer-grade and undermines credibility.

**Anti-slop rule of thumb:** if a screen would look identical with the logo swapped for any other manufacturer's, it has failed this brief. Every template below calls out at least one deliberately specific, non-default choice.

---

## 2. Brand Foundation

### 2.1 Logo direction — [TO BE CONFIRMED: no existing logo file provided]

Assumption for this spec: a wordmark-led identity, not an abstract icon (icon marks take years to build recognition; a small manufacturer's budget is better spent on a strong wordmark that also works as a favicon crop).

- Wordmark: "OM POLYPLAST" set in the brand display face (see 2.3), tight tracking, all-caps, with "POLYPLAST" slightly heavier weight than "OM" to anchor the name.
- Lockup variant: wordmark + a single horizontal rule beneath it in Brand-Accent, suggesting a strip of tape — a literal but understated nod to the product.
- Icon-only mark (for favicon/app icon/WhatsApp avatar): monogram "OP" inside a rounded square, Brand-Deep background, white type.
- Deliver as SVG with a 1-color (white-knockout) and 1-color (Brand-Deep) variant for use on photography.

If a real logo exists, replace this section's output only — it does not cascade into color/type below.

### 2.2 Color System

Derived from the client-supplied "Ocean Blue Serenity" reference palette, extended with functional tokens. Base stays white per the client's brief; blues carry all brand weight so they're used with intent, not decoration.

| Token | Hex | Use |
|---|---|---|
| `base-white` | `#FFFFFF` | Page background, cards |
| `base-mist` | `#F4F8FB` | Section bands, table zebra striping, input backgrounds |
| `ink-900` | `#051423` | Body text, headings (near-black navy, not pure black) |
| `ink-600` | `#3A4A57` | Secondary text, captions, spec labels |
| `border-subtle` | `#DCE6ED` | Card borders, table rules, dividers |
| `brand-deep` | `#023E8A` | Header/footer background, hero overlay, primary headings on white |
| `brand-primary` | `#0077B6` | Primary buttons, links, active nav state, focus ring |
| `brand-mid` | `#0096C7` | Secondary buttons, icon fills |
| `brand-accent` | `#00B4D8` | Hover states, tags/chips, in-stock badges, the logo underline |
| `brand-sky` | `#CAF0F8` | Light info backgrounds, "New" ribbons, chip fills |
| `success` | `#1E7F4C` | Quote confirmed, in-stock |
| `warning` | `#B45309` | Quote pending, low-stock |
| `error` | `#B3261E` | Form errors, out-of-stock |

Contrast rule: `brand-primary` on `base-white` = 4.6:1 (passes AA for normal text at 16px+). `brand-accent` (`#00B4D8`) fails AA on white for body text (2.7:1) — restrict it to large text (24px+/bold 19px+), icon fills, borders, and backgrounds paired with `ink-900` text, never as small-text-on-white.

### 2.3 Typography

| Role | Family | Weight(s) | Notes |
|---|---|---|---|
| Display / H1–H2 | IBM Plex Sans | 600, 700 | Chosen for its engineering/technical heritage — reads as industrial, not startup-generic |
| Body / H3–H6 / UI | IBM Plex Sans | 400, 500 | Same family as display to keep the system tight; weight does the differentiating |
| Specs, SKUs, dimensions, GSM/micron values | IBM Plex Mono | 400, 500 | Tabular numerals for scannable spec tables — this is the detail that separates a catalog from a brochure |

Type scale (desktop / mobile), 8px base grid:

| Style | Desktop | Mobile | Line-height |
|---|---|---|---|
| H1 | 44px | 30px | 1.15 |
| H2 | 32px | 24px | 1.2 |
| H3 | 24px | 20px | 1.3 |
| Body | 16px | 16px | 1.6 |
| Small / caption | 14px | 13px | 1.5 |
| Spec table (mono) | 14px | 13px | 1.4 |

### 2.4 Spacing, Grid, Radius

- Base unit: 8px. Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Grid: 12 columns, 24px gutter, max content width 1280px; catalog/filter layouts use a 1280px canvas split 280px (filter rail) / 976px (grid) on desktop.
- Radius: 4px on inputs and buttons, 8px on cards, 0px on the tape-strip underline motif (it should look cut, not rounded).
- Elevation: two shadow levels only — `shadow-card` (subtle, for product cards) and `shadow-modal` (for the RFQ drawer/dialogs). No decorative glows or gradients on cards.

### 2.5 Motion

Motion is functional, not decorative — this is a technical buyer's site.

- Standard transition: 150ms ease-out for hover/focus states.
- Drawer/modal (RFQ tray, filter panel on mobile): 220ms slide + fade, ease-in-out.
- No parallax, no scroll-jacking, no auto-playing carousels on the homepage hero (they hide content from users who scan, and they hurt CLS/LCP).
- Respect `prefers-reduced-motion`: fall back to instant state changes.

### 2.6 Imagery

- Product photography: plain white/light-grey seamless background for catalog thumbnails (consistency across 100+ SKUs matters more than styling); one lifestyle/context shot per category (e.g., stretch film wrapping a pallet) used only on category landing pages, not per-product.
- Factory/facility photography on About page: real photos of the production floor, raw material stock, and finished-goods packaging — this does more for B2B trust than any illustration.
- No generic stock photography of office handshakes, globe icons, or abstract "network" graphics anywhere on the site.
- Icons: a single consistent line-icon set (1.5px stroke), custom-drawn or a licensed set like Phosphor (duotone variant using `brand-primary` + `brand-accent`) — not mixed icon styles.

---

## 3. Accessibility (WCAG 2.1 AA baseline)

| Requirement | Implementation note |
|---|---|
| Color contrast | 4.5:1 body text, 3:1 large text/UI components; see §2.2 for token-level guidance |
| Keyboard navigation | All interactive elements (filters, RFQ tray, mega-menu) reachable and operable via keyboard; visible focus ring using `brand-primary` at 2px offset |
| Forms | Every input has a bound `<label>`; errors announced via `aria-live="polite"`; RFQ/enquiry forms never rely on color alone to indicate error fields (pair with icon + text) |
| Images | All product images require descriptive `alt` text (product name + key spec, doubles as SEO win — see `content-strategy.md`) |
| Touch targets | Minimum 44×44px on mobile for buttons, filter chips, and the WhatsApp FAB |
| Motion | `prefers-reduced-motion` respected per §2.5 |
| Language | `lang="en"` at minimum; if Gujarati/Hindi is added later (currently out of scope — see `PRD.md`), pages get proper `lang` and `hreflang` attributes at that time |

---

## 4. Component Library (P0 components — build these first)

| Component | Key states | Notes |
|---|---|---|
| **Header / Mega-menu** | default, category-hover, mobile-collapsed | Categories shown with a representative thumbnail in the mega-menu, not just text links — buyers recognize products visually faster than by name |
| **Product Card** | default, hover, out-of-stock | Shows: thumbnail, name, 2–3 key specs inline (e.g., "48mm × 65m · 2-mil"), "Add to Enquiry" + "View Details" |
| **Spec Table** | — | Mono numerals, zebra striping (`base-mist`), sticky first column on mobile horizontal scroll |
| **Filter Rail** | applied, empty, mobile drawer | Facets: product type, thickness/GSM, size/dimension, application industry, MOQ range |
| **Enquiry Tray ("Quote Basket")** | empty, 1+ items, submitting, submitted | Persistent mini-cart-style tray for multi-product RFQs — see PRD user flow 2 |
| **RFQ / Enquiry Form** | default, validating, error, success | Fields: name, company, phone, email, city, product(s), quantity, message; honeypot + Turnstile for spam |
| **Trust Bar** | — | Years in operation, certifications (e.g., GST/Udyam — [TO BE CONFIRMED which certifications apply]), export markets if any, "Response within X business hours" |
| **WhatsApp FAB** | default, expanded | Fixed bottom-right, opens `wa.me` deep link pre-filled with page/product context |
| **Breadcrumb** | — | Category > Subcategory > Product, also feeds BreadcrumbList schema |
| **Downloadable Spec Sheet button** | — | Links to a per-product PDF (generated or uploaded in admin) — commonly requested by procurement teams for internal approval |

---

## 5. Page-Level Specs

### 5.1 Home
1. Header with mega-menu (Products, About, Contact) + phone number + "Request Bulk Quote" primary CTA visible without scrolling.
2. Hero: static (no carousel) — one strong image of product in context (e.g., stretch-wrapped pallets in a warehouse) + headline naming the product range and Rajkot location for immediate local-SEO and buyer-relevance signal. No stock-photo hero.
3. Category grid (4 tiles: BOPP Tapes, Masking Tapes, Shrink & Stretch Films, Box Strapping Rolls, Shrink Bags) — image-led, not icon-led.
4. Trust bar (years in business, MOQ flexibility, dispatch turnaround — values [TO BE CONFIRMED]).
5. "Why buy from OM Polyplast" — 3–4 concrete differentiators (not "quality" and "customer service" as generic bullets; use specifics like raw material sourcing, in-house testing, custom sizing/branding capability — confirm actuals with client).
6. Featured/best-selling products (pulled dynamically from CMS `featured` flag on Product).
7. Enquiry CTA band before footer.
8. Footer: full sitemap, address + embedded map (Rajkot), GST number, social links, certifications.

### 5.2 Catalog / Category Listing
- Filter rail (left, sticky on desktop; drawer on mobile) + product grid (right).
- Sort: relevance, name A–Z, newest.
- Each category page has a unique intro paragraph (150–250 words, SEO-written per `content-strategy.md` — never a copy-pasted template across categories).
- Pagination or "load more" — recommend simple numbered pagination for crawlability (infinite scroll hides content from search engines without extra work).

### 5.3 Product Detail Page (PDP)
1. Breadcrumb.
2. Gallery (left/top on mobile) — product images, zoomable.
3. Title, short description, key specs summary, "Add to Enquiry" + WhatsApp direct enquiry buttons (right/below on mobile).
4. Full spec table (Spec Table component) — dimensions, material, GSM/micron, color options, packaging unit, MOQ.
5. Applications section (which industries/use-cases this product suits — strong internal-linking and long-tail SEO opportunity).
6. Downloadable spec sheet (PDF).
7. Related products (same category).
8. Product-level FAQ (optional per product, feeds FAQ schema).

### 5.4 Quote / RFQ Flow
- Single-product path: "Add to Enquiry" from PDP → tray → review → form → confirmation screen with a reference number and expected response time.
- Multi-product/bulk path: browse multiple categories, add several products to the tray, submit one consolidated RFQ.
- Confirmation state must set expectations explicitly ("We typically respond within X business hours via call or WhatsApp") — reduces follow-up-call volume and anxiety, both real B2B pain points.

### 5.5 About
- Company story, facility/production photos, certifications, leadership note (optional), map + address block (doubles as local-SEO content — see `content-strategy.md`).

### 5.6 Contact
- Enquiry form (general, not tied to a product) + phone/email/WhatsApp + embedded Google Map + business hours + GST/Udyam number for buyer due-diligence.

---

## 6. Reference Inspiration (direction, not templates to clone)

Use these for *specific mechanics*, not overall look — none should be visibly "the model" for the final design:
- Industrial spec-sheet density: how electronics-component distributor catalogs (e.g., Mouser/DigiKey-style spec tables) handle dense technical data without feeling cluttered.
- Local-trust signals: how well-run Indian B2B manufacturer microsites on IndiaMART/TradeIndia surface GST numbers, years-in-business, and response-time promises prominently — a pattern worth keeping even though the platform itself is generic.
- Real photography over illustration: any manufacturer site that photographs its actual factory floor rather than using generic "industry 4.0" stock imagery.

---

## 7. Open Items Requiring Client Input

- [TO BE CONFIRMED] Final logo file or sign-off on the wordmark direction in §2.1.
- [TO BE CONFIRMED] Actual differentiators for the homepage "Why buy from us" section (specifics beat generic claims).
- [TO BE CONFIRMED] Certifications/registrations to display (GST, Udyam/MSME, ISO if any, export licenses if any).
- [TO BE CONFIRMED] Real product photography vs. stock/placeholder for initial launch.
