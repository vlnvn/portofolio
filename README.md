# Valensius Alven portfolio planning repository

This repository contains the verified evidence, content decisions, design contract, asset requirements, and implementation plan for Valensius Alven's personal portfolio.

The portfolio has two purposes:

1. support the 2026–2027 Claude Builder Club application with concrete project and campus-work evidence;
2. remain useful as an engineering portfolio for recruiters and collaborators.

Production implementation has not started. The selected design is Direction B: a compact project register that places each project's problem, role, evidence, ownership boundary, and source in one scan path.

## Reading order

Read these files in order when continuing the project:

1. [EVIDENCE.md](EVIDENCE.md) — claim ledger, ownership, confidence, and publication boundaries.
2. [CONTENT_ARCHITECTURE.md](CONTENT_ARCHITECTURE.md) — page order, project treatment, copy limits, and route decisions.
3. [PORTFOLIO_SPEC.md](PORTFOLIO_SPEC.md) — functional, responsive, accessibility, metadata, and performance requirements.
4. [CONSTRAINTS.md](CONSTRAINTS.md) — measurable checks required before release.
5. [DESIGN.md](DESIGN.md) — final production design contract.
6. [ASSET_PLAN.md](ASSET_PLAN.md) — real screenshots and other assets still required.
7. [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) — ordered production work and verification criteria.

The files above are the implementation handoff. If two statements conflict, use this priority:

1. facts explicitly confirmed by Valensius;
2. source code and git history recorded in `EVIDENCE.md`;
3. repository documentation grounded in source;
4. résumé evidence when supplied;
5. authoritative external sources;
6. clearly marked inference.

Do not turn an inference into a public claim.

## Selected work

- **KAIROS** — dispatcher decision-support for pickup-promise review. Valensius was Team Lead for the COMPFEST 18 AI Innovation Challenge in 2026. The human dispatcher retains every operational decision.
- **Ayam Kalintang Self-Order Kiosk** — kiosk and staff tools completed in July 2026 for a local culinary business. Valensius worked as Full-Stack Engineer and Deputy Team Lead.
- **The Colors of MIPA** — a BEM FMIPA student project involving all nine undergraduate programs. Valensius coordinated 30+ contributors; a target of 200 likes resulted in 1,002 likes.
- **N.A.R.A.** — supporting full-stack and interface work for a nutrition-planning application connected to a Python recommendation service. The core recommendation engine is team-owned.

## Design validation

Directions A and B were rendered with identical content at 1440×900, 375×812, and 320×800. The final score was:

| Direction | Weighted score |
|---|---:|
| A — evidence-margin narrative | 8.35/10 |
| B — compact project register | 8.55/10 |

The complete findings are in [design-review/REPORT.md](design-review/REPORT.md). Post-distillation browser captures are stored beside that report. Direction B won because it exposes role, technical evidence, ownership boundary, and source access faster. It still requires careful mobile media cropping and a stronger presentation of the Colors participation result.

## Planned production routes

- `/`
- `/work/kairos`
- `/work/ayam-kalintang`
- framework 404, sitemap, robots, and metadata endpoints

The planned stack is Next.js App Router, strict TypeScript, and Tailwind CSS. The project does not require a CMS, database, authentication, global state library, component framework, animation library, or client-side data fetching.

## Confirmed public contact

- GitHub: <https://github.com/vlnvn>
- LinkedIn: <https://linkedin.com/in/valensiusalven>
- Email: <alvenvalensius93@gmail.com>
- The Colors of MIPA Reel: <https://www.instagram.com/reel/DL_5D0XxNnq/>

## Pending inputs

- final résumé PDF;
- clean local captures for KAIROS and Ayam Kalintang;
- optional safe N.A.R.A. capture;
- final domain and deployment credentials.

Local source checkouts, security-sensitive notes, temporary prototypes, tool caches, and workflow configuration are intentionally excluded from version control. They are not required to implement the portfolio from this handoff.
