# OM Polyplast — B2B Catalog Website Documentation Suite

This folder contains a complete, implementation-ready documentation set for the OM Polyplast catalog website: a Rajkot-based manufacturer of BOPP tapes, masking tapes, shrink & stretch films, box strapping rolls, and shrink bags selling to other businesses.

**Locked decisions this version is built around:** Next.js frontend (client-selected), Payload CMS 3.x as the recommended headless CMS/admin (see `TRD.md` §2 for the full comparison), catalog-only — no blog.

Every open decision the client hasn't yet made is marked **`[TO BE CONFIRMED]`** inline in the relevant document, per the original brief's instruction not to invent specs.

## Documents, in Recommended Reading Order

| # | File | Read this if you are... |
|---|---|---|
| 1 | `PRD.md` | Anyone — start here. Vision, personas, features, user flows, success metrics. |
| 2 | `design.md` | The UI/UX designer. Brand system, components, page-by-page UI specs. |
| 3 | `TRD.md` | The developer/architect. Stack choices and why, security, performance budgets. |
| 4 | `architecture.md` | The developer. Data models, API contracts, folder structure, caching. |
| 5 | `content-strategy.md` | The content writer / SEO owner. Keyword clusters, page briefs, schema plan. |
| 6 | `seo-checklist.md` | Whoever ships the site. A literal pre/post-launch checklist. |
| 7 | `admin-panel-spec.md` | The developer (build reference) and the client's staff (training reference). |
| 8 | `promptphases.md` | Project management. Phased plan with effort estimates. |
| 9 | `prompt.md` | The developer, paired with an AI coding agent. Copy-paste execution prompts per phase. |

## How These Fit Together

`PRD.md` defines *what* to build and why. `design.md` and `TRD.md`/`architecture.md` define *how* — the look-and-feel and the technical implementation, respectively, both traceable back to PRD requirements. `content-strategy.md` and `seo-checklist.md` cover the content/SEO layer that makes the site findable. `admin-panel-spec.md` documents the system the client's own staff will use daily. `promptphases.md` and `prompt.md` turn all of the above into an actual build sequence.

## Before Development Starts

Collect every `[TO BE CONFIRMED]` item across these documents — they cluster around: real product data (specs/images), brand assets (logo), business details for local SEO (address/phone/hours/certifications), and a few budget-sensitive infrastructure choices (WhatsApp API tier). `promptphases.md` Phase 0 is built around closing these out before the rest of the timeline depends on them.
