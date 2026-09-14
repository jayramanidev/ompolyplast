# OM Polyplast — SEO Content Strategy

Status: v1.0 · Owner: Content/SEO · Consumers: content writer, developer (schema implementation)
Related: `seo-checklist.md` (execution checklist), `PRD.md` §4 (blog explicitly out of scope for this version)

Scope note: the client selected **catalog-only, no blog**. This strategy therefore leans entirely on **category and product page depth plus local landing content** to carry organic search weight — a valid and common approach for B2B manufacturer sites, provided category pages are written as genuine, differentiated content rather than thin wrappers around a product grid.

---

## 1. Keyword Clusters

Keyword volumes are directional placeholders — [TO BE CONFIRMED with a keyword research tool such as Google Keyword Planner or Ahrefs against current India-Gujarat search volume before final prioritization].

### Cluster A — Local + Category (highest priority, drives Home + Category pages)
- BOPP tape manufacturer Rajkot
- stretch film supplier Rajkot / Gujarat
- Box strapping rolls manufacturer Rajkot
- packaging tape wholesale Gujarat
- shrink bags manufacturer Rajkot
- plastic packaging company Rajkot

### Cluster B — Product + Buyer Intent (drives Product Detail Pages)
- BOPP self adhesive tape bulk order
- LLDPE stretch film wholesale price
- Box strapping rolls bulk buy
- cloth tape manufacturer India
- custom printed packaging tape supplier
- [expand per confirmed real product list — Phase 0]

### Cluster C — Application/Industry (drives internal linking from PDP → category, long-tail traffic)
- packaging tape for e-commerce shipping
- stretch film for pallet wrapping
- shrink bags for food packaging
- tape for carton sealing bulk supply

### Cluster D — Company/Trust (drives About + Contact)
- OM Polyplast Rajkot
- packaging manufacturer near me Rajkot
- GST registered packaging supplier Gujarat

---

## 2. Page-by-Page Content Briefs

| Page | Primary keyword focus | Word count | Must include |
|---|---|---|---|
| Home | Cluster A (brand + category umbrella) | 300–500 (excluding product grid) | Rajkot location named in first 100 words; links to all 4 category pages; trust signals (years in business, GST) |
| Category: Tapes | Cluster A + B (tape-specific) | 200–300 unique intro copy | Named sub-types (BOPP/cloth/etc. — [TO BE CONFIRMED against real range]); at least one application use-case |
| Category: Stretch Films | Cluster A + B | 200–300 | Micron/thickness range mentioned in prose (aids relevance for spec-searchers) |
| Category: Shrink Bags | Cluster A + B | 200–300 | Application industries named (agriculture, retail, etc.) |
| Category: Other Packaging | Cluster A + B | 200–300 | Scope of "other" defined clearly — avoid a vague catch-all page that dilutes relevance |
| Product Detail (template, applied per SKU) | Cluster B + C | 100–150 short description + full spec table | Every spec field filled (never left blank — blank specs are a top reason procurement buyers bounce); at least one named application |
| About | Cluster D | 400–600 | Founding year, facility details, certifications — real specifics beat generic "quality and trust" language |
| Contact | Cluster D | 100–150 + NAP block | Full address matching Google Business Profile exactly, embedded map |

**Writing rule for all category/product copy:** never write the same paragraph structure twice across pages with only the noun swapped — this is the single most common "AI-slop" tell in catalog SEO content and both Google and human buyers discount it. Vary structure, lead with a different angle per category (Tapes: adhesion/application use-cases; Stretch Films: thickness/stretch-ratio buyer concerns; Shrink Bags: sealing strength/industry use-cases).

---

## 3. Meta Title / Description Templates

| Page type | Title template | Description template |
|---|---|---|
| Home | `OM Polyplast \| Packaging Tapes, Stretch Films & Bags — Rajkot` | `Manufacturer of BOPP tape, stretch film, and Shrink Bags in Rajkot, Gujarat. Request a bulk quote — [response-time promise].` |
| Category | `{Category Name} Manufacturer in Rajkot \| OM Polyplast` | `{1-sentence category summary}. Bulk & custom orders. Get a quote from OM Polyplast, Rajkot.` |
| Product | `{Product Name} — {Key Spec} \| OM Polyplast` | `{Product name} in {size/thickness}. {1 key differentiator}. Request pricing from OM Polyplast, Rajkot.` |
| About | `About OM Polyplast \| Packaging Manufacturer, Rajkot` | `{Founding year/summary}. GST-registered manufacturer of packaging materials based in Rajkot, Gujarat.` |
| Contact | `Contact OM Polyplast \| Rajkot, Gujarat` | `Get in touch for bulk packaging orders. Phone, WhatsApp, and enquiry form — OM Polyplast, Rajkot.` |

All values above with `{}` placeholders are admin-editable per page via the `seo` field group defined in `architecture.md` §2 — never hardcoded in templates.

---

## 4. Blog — Excluded (rationale kept here for future reference)

The client chose catalog-only. If revisited later (`PRD.md` P2), the highest-value blog topics for this vertical would be application/how-to content (e.g., "How to choose stretch film thickness for pallet weight," "BOPP vs. cloth tape for carton sealing") — noted here only so this decision isn't re-researched from scratch if priorities change.

---

## 5. Schema Markup Plan

Implement as JSON-LD, injected server-side per `architecture.md` §4 (`lib/schema/`).

**Organization + LocalBusiness (site-wide, in root layout):**

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "OM Polyplast",
  "image": "https://[domain]/og-image.jpg",
  "@id": "https://[domain]",
  "url": "https://[domain]",
  "telephone": "[TO BE CONFIRMED]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[TO BE CONFIRMED]",
    "addressLocality": "Rajkot",
    "addressRegion": "Gujarat",
    "postalCode": "[TO BE CONFIRMED]",
    "addressCountry": "IN"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "[TBC]", "longitude": "[TBC]" },
  "openingHoursSpecification": "[TO BE CONFIRMED]"
}
```

**Product (per Product Detail Page):**

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{{product.name}}",
  "image": "{{product.images[0].url}}",
  "description": "{{product.shortDescription}}",
  "sku": "{{product.sku}}",
  "brand": { "@type": "Brand", "name": "OM Polyplast" },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "availability": "{{product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'}}",
    "url": "https://[domain]/products/{{category.slug}}/{{product.slug}}"
  }
}
```

Note: omit a `price` field rather than inventing one — this is a quote-driven model (`PRD.md` §6), not fixed retail pricing; Google accepts `Offer` schema without a literal price when paired with a clear RFQ path, but do not fabricate a number to satisfy the schema.

**BreadcrumbList (Category and Product pages):** standard 2–3 level breadcrumb matching the visible breadcrumb component in `design.md` §4.

**FAQPage (per product, if FAQs are populated — P1 feature):** generated only when a product has ≥1 FAQ entry; never auto-generate placeholder FAQ content to force this schema to appear.

---

## 6. Open Items Requiring Client Input

- [TO BE CONFIRMED] Exact business address, phone, opening hours for LocalBusiness schema and NAP consistency.
- [TO BE CONFIRMED] Real product range and specs to finalize Cluster B/C keyword targeting.
- [TO BE CONFIRMED] Keyword volume validation via a proper keyword research tool before locking final on-page targeting.
