# OM Polyplast — Phased Build Plan

Status: v1.0 · Owner: Project/Engineering · Consumers: developer, project manager, client
Related: `prompt.md` (execution prompts per phase), `PRD.md` (what's in each phase)

Effort estimates assume **one full-stack developer** working with an AI coding agent (per `prompt.md`) plus part-time input from a designer and content writer. Estimates are in working days and are directional, not committed — actual pace depends on how quickly the client supplies the [TO BE CONFIRMED] items flagged throughout this suite.

| Phase | Name | Deliverables | Dependencies | Est. Effort |
|---|---|---|---|---|
| 0 | Discovery & Content Collection | Confirmed product list with real specs/images (or explicit go-ahead on placeholders); confirmed differentiators, certifications, MOQ/turnaround values; domain + hosting accounts created | Client provides open items flagged `[TO BE CONFIRMED]` across all docs | 3–5 days (client-dependent, can run in parallel with Phase 1) |
| 1 | Design System & Key Screens | Finalized tokens/components per `design.md`; high-fidelity mockups for Home, Category, PDP, RFQ flow, About, Contact (desktop + mobile) | Phase 0 brand assets (or sign-off on the from-scratch direction in `design.md` §2.1) | 5–7 days |
| 2 | CMS Schema & Admin Build | Payload collections implemented per `architecture.md` §2; admin roles/permissions configured per `admin-panel-spec.md`; notification hooks (email/WhatsApp) wired to a test recipient | `TRD.md` stack decisions finalized; hosting/DB accounts (Phase 0) | 4–6 days |
| 3 | Frontend Build | All public templates built against the design system and live CMS data: Home, Catalog/Category, PDP, RFQ tray + form, general Enquiry form, About, Contact | Phases 1 & 2 | 8–12 days |
| 4 | Content & SEO Population | Real product data entered by admin/content writer using the admin panel; category/page SEO copy written per `content-strategy.md`; schema markup verified; sitemap/robots confirmed | Phase 0 real content; Phase 3 admin panel usable | 5–8 days (content-writer-paced, can overlap Phase 3's tail end) |
| 5 | QA, Performance, Accessibility | Cross-browser/device QA; Lighthouse/PageSpeed pass against budgets in `TRD.md` §5; WCAG AA spot-check per `design.md` §3; RFQ flow tested end-to-end including notification delivery | Phase 3 & 4 substantially complete | 3–5 days |
| 6 | Launch | DNS cutover, GA4/Search Console/GBP verification, submit sitemap, smoke-test production notifications | Phase 5 sign-off | 1–2 days |
| 7 | Post-Launch Iteration | Monitor Core Web Vitals and RFQ conversion (`PRD.md` §8 metrics); first content refresh cycle; address any GBP/local-SEO citation gaps from `seo-checklist.md` | Launch + 2–4 weeks of live data | Ongoing |

**Critical path note:** Phase 0's real content (products, images, differentiators) is the single biggest schedule risk — Phases 1–3 can proceed on placeholder data, but Phase 4 (and therefore a credible launch) cannot complete without it. Recommend starting Phase 0 data collection immediately, in parallel with design work.
