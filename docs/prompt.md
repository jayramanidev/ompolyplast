# OM Polyplast — Master Execution Prompts

Status: v1.0 · Owner: Engineering · Consumers: developer using an AI coding agent (e.g., Claude Code)
Related: `promptphases.md` (schedule these against), all other docs (each prompt below references them)

How to use this file: run these prompts **in order**, one phase at a time, against a coding agent with access to this entire documentation folder. Each prompt assumes the agent can read the other `.md` files in this suite directly — paste the file contents in, or point the agent at the folder if it has file access. Do not skip ahead; later prompts assume earlier phases' output exists in the repo.

---

## Prompt 1 — Project Scaffold (Phase 2 start)

```
Scaffold a new Next.js 16 project (App Router, TypeScript) with Payload CMS 3.x
installed directly into the /app directory, per architecture.md §4 (Folder
Structure). Use the Postgres adapter for Payload, configured for a managed
Postgres connection string via environment variable. Configure the upload/media
handling to use an S3-compatible adapter (Cloudflare R2) instead of local disk
storage, since this will deploy to Vercel.

Set up Tailwind CSS and wire in the design tokens from design.md §2 (colors)
and §2.3 (typography — IBM Plex Sans + IBM Plex Mono) as Tailwind theme
extensions, not hardcoded values in components.

Do not build any pages or collections yet — this prompt is scaffolding only.
Confirm the project builds and the Payload admin panel loads at /admin with
an empty database before proceeding.
```

## Prompt 2 — Collections (Phase 2)

```
Implement the following Payload collections exactly as specified in
architecture.md §2: Categories, Products, Quotes, Enquiries, and the extended
Users collection with the role field. Do not create a Blog/Posts collection —
it is explicitly out of scope per PRD.md.

For Quotes and Enquiries, implement the afterChange hook described in
architecture.md §2.3–2.4: on create, send a transactional email (via Resend)
and a WhatsApp notification (via the configured BSP) to the admin recipient
defined in an environment variable. Include the reference number, buyer name,
phone, and a summary of requested items/message in both notifications.

Implement role-based access control per admin-panel-spec.md's permissions
matrix: Content Editors can read/write Products and Categories but not
Quotes/Enquiries; Sales can read/write Quotes and Enquiries but not
Products/Categories; Super Admin has full access.

Seed the database with 8–10 realistic placeholder products across all four
categories (BOPP Tapes, Masking Tapes, Shrink & Stretch Films, Box Strapping Rolls, Shrink Bags) so the
frontend build in the next phase has real data to render against. Mark seeded
content clearly as placeholder in a code comment.
```

## Prompt 3 — Public Frontend (Phase 3)

```
Build the public-facing templates specified in design.md §5, using the
component library in design.md §4, against the live Payload data via the
Local API pattern described in architecture.md §3 (server-side calls, not
public HTTP round-trips). Build in this order: Header/mega-menu + footer
(shared layout), Home, Category listing with filters, Product Detail Page,
About, Contact.

Follow the PRD.md §5 user flows exactly for navigation between these pages.
Apply the accessibility requirements in design.md §3 (labelled form inputs,
visible focus states, alt text on all product images, 44px minimum touch
targets). Apply the performance budgets in TRD.md §5 — use next/image for
all product photography, and keep client-side JavaScript to interactive
islands only (filters, mega-menu, forms) per architecture.md's Server
Components approach.

Do not build the RFQ tray/form yet — that's the next prompt.
```

## Prompt 4 — RFQ & Enquiry Flow (Phase 3)

```
Build the Enquiry Tray component and the multi-product RFQ flow described in
design.md §5.4 and PRD.md §5 (the mermaid flow diagram). Implement the
POST /api/quotes and POST /api/enquiries endpoints per architecture.md §3,
including Cloudflare Turnstile verification, a honeypot field, and
server-side rate limiting by IP as specified in TRD.md §4.

Generate a human-readable reference number on submission (format:
OMP-Q-YYYY-NNNN for quotes, OMP-E-YYYY-NNNN for enquiries) and display it on
a confirmation screen along with the response-time promise text (pull this
from a site-settings global in Payload, not a hardcoded string, so admin can
change it without a code deploy).

Also implement the WhatsApp click-to-chat button (product-page and floating
FAB variants) as a plain wa.me deep link pre-filled with the current page's
product name — this does not need the WhatsApp API, per TRD.md's stack table.

Write acceptance tests against every acceptance criterion listed in
PRD.md §7.
```

## Prompt 5 — SEO Implementation (Phase 4)

```
Implement the technical SEO layer per content-strategy.md and
seo-checklist.md: generate sitemap.xml and robots.ts per architecture.md's
folder structure, add per-page metadata (title/description) sourced from
each page/product/category's `seo` field group in Payload, and implement
JSON-LD structured data for Organization, LocalBusiness, Product, and
BreadcrumbList exactly as specified in content-strategy.md §5. Verify every
structured data block validates against Google's Rich Results Test before
marking this prompt complete.

Do not fabricate content to fill these fields — where real data
(certifications, exact address, GST number, founding year) is not yet
available in the CMS, leave the field empty and flag it, rather than
inventing a plausible-sounding value.
```

## Prompt 6 — QA & Performance Pass (Phase 5)

```
Run a full QA pass against design.md §3 (accessibility), TRD.md §5
(performance budgets), and PRD.md §7 (acceptance criteria) for every page and
flow built so far. Fix any Core Web Vitals regressions before proceeding.
Specifically test the RFQ flow end-to-end including actual email and
WhatsApp notification delivery to a real test recipient, not just that the
database record is created.
```

## Prompt 7 — Launch Prep (Phase 6)

```
Prepare the project for production launch: verify all environment variables
are set in Vercel for the production environment (not just preview), connect
the production domain, verify Google Analytics 4 and Search Console are
receiving data from the production URL, submit the sitemap to Search
Console, and confirm the Google Business Profile listing's address/phone
matches the site footer exactly (NAP consistency, per seo-checklist.md).
```
