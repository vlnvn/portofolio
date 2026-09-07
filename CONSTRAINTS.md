# Portfolio quality constraints

Defined 6 September 2026 from the project brief. These are acceptance targets, not checks already executed. No production app or installed checkers exist yet. Do not lower the bar, suppress errors, or remove tests to obtain a passing result.

## Non-negotiable floor

- No invented claims, assets, contact destinations or deployment status.
- No source-project secrets, raw research copies or personal identifiers in public output.
- No type/lint suppressions, ignored build errors, unimplemented UI actions or empty catch blocks added to pass checks.
- No skipped/deleted tests or weakened budgets without a documented reason and explicit review.
- Production implementation begins only after this planning handoff is accepted.

## Planned executable gates

The implementation must create these npm script contracts and mirror them here. They are not runnable today. `npm test` uses Node's test runner for meaningful content integrity/destination validation; Playwright covers real behavior. Do not add a coverage quota for static markup.

| Gate | Planned command / method | Passing condition |
|---|---|---|
| Reproducible install | `npm ci` | Lockfile valid; clean install exits 0 |
| Types | `npm run typecheck` → `tsc --noEmit` | 0 errors |
| Lint | `npm run lint` → `eslint . --max-warnings=0` scoped to app/tests/config | 0 errors/warnings; research clones excluded |
| Build | `npm run build` → `next build` | Production build succeeds; intended pages static |
| Content integrity | `npm test` | Approved IDs, required roles/destinations and no missing published assets |
| Browser | `npm run test:e2e` → Playwright | Home, 2 cases, anchors, back path, 404, keyboard routes, email/social/resume if supplied; no horizontal overflow at 6 widths |
| Accessibility | `npm run test:a11y` → Playwright + axe | No unresolved automated violations on all 3 content routes; manual keyboard/screen-reader/zoom checks documented |
| External links | `npm run check:links` | Internal links/assets pass; external destinations manually triaged if bots blocked; no false “broken” conclusion from rate-limit/login barrier |
| Dependency audit | `npm audit --omit=dev` | No unresolved high/critical production dependency finding |
| Secret scan | `gitleaks dir . --redact --no-banner` with research/cache exclusions | No finding in deliverable sources/assets; report locations without secret values |
| Performance | `npm run test:performance` → Lighthouse on production server, saved JSON | 3 cold mobile runs per route; median score ≥95, LCP ≤2.5s, CLS ≤0.1, TBT ≤200ms; document browser/version/throttling |
| Transfer | Browser network capture, empty cache, production homepage | Initial compressed transfer ≤1MB; all route JS ≤200KB; fonts ≤160KB; no social embed/network requests |
| Visual/copy/facts | Screenshots + line-by-line evidence review | All 6 widths inspected; facts preserved; no unexplained template-like patterns |

Record environment, commands, outcomes and artifact paths in a later QA report. Fresh browser runs must have no product console errors or failed first-party requests. External destination blockers remain reported, never silently marked passed.

## Manual standards

Normal-text contrast ≥4.5:1; large text and meaningful interface indicators ≥3:1. Navigation/action hit areas ≥44px. Content works at 320px, 200% zoom and text-spacing overrides. Reduced motion introduces no hidden content. Screen-reader navigation identifies landmarks, headings and link purposes. Body copy ≥16px; metadata ≥14px. No fabricated WCAG certification.

Field p75 INP ≤200ms is a future monitoring target, not a ship verdict without field data. Lighthouse cannot verify field INP or predict every user's connection. Images and fonts reserve layout space.

No exceptions approved. Missing resume and production origin are tracked dependencies; neither may be filled with an invented value.
