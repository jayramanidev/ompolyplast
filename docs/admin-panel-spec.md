# OM Polyplast — Admin Panel Specification

Status: v1.0 · Owner: Product/Engineering · Consumers: developer, client's admin/sales staff (as training material)
Related: `architecture.md` §2 (the data models these screens manage), `PRD.md` (feature priorities)

Built on Payload's auto-generated admin UI (per `TRD.md` §2), customized only where noted — the goal is a genuinely non-technical experience, not a raw database editor.

---

## 1. Screens

| Screen | Purpose | Priority |
|---|---|---|
| Dashboard | At-a-glance: new Quotes/Enquiries count, quick links to add a Product | P1 (Payload's default admin home is acceptable at P0; a custom dashboard widget is a P1 polish item) |
| Products — list | Table of all products: thumbnail, name, category, in-stock toggle, featured toggle; search + filter by category | P0 |
| Products — edit/create | Full form per fields in `architecture.md` §2.2 | P0 |
| Categories — list/edit | Simple list + form per `architecture.md` §2.1 | P0 |
| Quotes (RFQ) inbox | List of all quote submissions with status, buyer name, company, date, assigned-to; click into detail view showing full item list and message | P0 |
| Quote detail | Full submission detail + status dropdown + internal notes field + assign-to-staff dropdown | P0 |
| Enquiries inbox | Same pattern as Quotes, simpler (no line items) | P0 |
| Media library | Payload's built-in upload manager, backed by R2 (`TRD.md` §1) | P0 |
| Site Settings (global) | Response-time promise text, homepage trust-bar stats, featured-products override, contact phone/WhatsApp numbers | P1 |
| Users | Add/remove staff accounts, assign roles | P0 (Super Admin only) |

## 2. Key Field Reference (for training the client's staff)

### Product form
| Field | Type | Required | Notes for the person filling this in |
|---|---|---|---|
| Name | Text | Yes | e.g. "BOPP Self-Adhesive Tape — 48mm" |
| Category | Dropdown | Yes | Choose from the 4 existing categories |
| Images | Upload (multiple) | Yes, ≥1 | White/plain background preferred — see `design.md` §2.6 |
| Short description | Text | Yes | 1–2 sentences, shown on catalog cards |
| Full description | Rich text | No | Longer detail, shown on product page |
| Specs | Repeating label/value rows | Yes | Fill every row that applies — never leave a spec blank (`seo-checklist.md` §2) |
| Applications | Repeating text | No | Which industries/uses this suits |
| MOQ | Text | No | e.g. "500 rolls" — free text since MOQs vary by negotiation |
| In stock | Toggle | — | Controls the out-of-stock badge in `design.md` §4 |
| Featured | Toggle | — | Controls homepage "featured products" |
| SEO title/description | Text | No but recommended | Falls back to `content-strategy.md` §3 template if left blank |

### Quote status workflow
`New` → `Contacted` → `Quoted` → `Won` / `Lost`. Status changes are logged automatically (Payload's built-in versioning); no manual "activity log" needed at P0.

## 3. Permissions Matrix

| Action | Super Admin | Sales | Content Editor |
|---|---|---|---|
| View/edit Products & Categories | ✅ | ❌ | ✅ |
| View/edit Quotes & Enquiries | ✅ | ✅ | ❌ |
| Manage Site Settings | ✅ | ❌ | ❌ |
| Add/remove Users | ✅ | ❌ | ❌ |
| View Dashboard | ✅ | ✅ | ✅ |

Rationale: separating catalog control from the sales pipeline means a content mistake by a Sales user (or vice versa) is structurally impossible, without needing a large, confusing permissions UI for a 2–3-person admin team.

## 4. Workflows

**New RFQ arrives:**
1. Buyer submits the multi-product or single-product form on the public site.
2. Payload creates a Quote record, status `New`.
3. `afterChange` hook fires: email + WhatsApp notification sent to the configured Sales recipient(s) (`architecture.md` §2.3).
4. Sales staff opens the Quotes inbox, reviews items/message, contacts the buyer externally (phone/WhatsApp/email — outside the system, this is not a full CRM), updates status to `Contacted`, then `Quoted` once pricing is sent, then `Won`/`Lost` once resolved.
5. Internal notes field captures anything not worth putting in buyer-facing communication (e.g., "price-sensitive, competitor quote from X").

**Adding a new product (non-technical admin):**
1. Content Editor logs in, goes to Products → Create.
2. Fills required fields per §2 above.
3. Saves and publishes.
4. Product appears live on the site within seconds (on-demand ISR revalidation, `architecture.md` §5) — no developer, no redeploy.

## 5. Open Items Requiring Client Input

- [TO BE CONFIRMED] Number of staff accounts needed at launch and their names/roles.
- [TO BE CONFIRMED] Whether a Dashboard beyond Payload's default is worth the P1 build effort, or whether the Quotes/Enquiries inboxes alone are sufficient day-to-day.
