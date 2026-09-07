# Production implementation plan

Build the compact project-register contract in `DESIGN.md`. Each completed slice must render in a browser and preserve the factual boundaries in `EVIDENCE.md`.

## 0. Bootstrap and version validation

**Goal:** Create the smallest supported Next.js App Router project with strict TypeScript and Tailwind CSS after checking current official APIs.

**Files / area:** `package.json`, lockfile, Next/TypeScript/Tailwind/PostCSS configuration, scripts.

**Acceptance criteria:** Static-first App Router; strict mode; no component framework, client data layer, animation library, CMS, database, authentication, or analytics.

**Verification:** Clean install, version report, dev server, typecheck, lint, and empty production build.

## 1. Tokens, typography, and shell

**Goal:** Implement the locked grid, colors, spacing, rules, IBM Plex Sans files, header, footer, and accessibility primitives.

**Files / area:** Global CSS, root layout, local font assets, shell components.

**Acceptance criteria:** Exact `DESIGN.md` tokens; 400/500/600 Latin font files only; skip link and focus states; no font layout shift.

**Verification:** Browser captures at 320, 375, 430, 768, 1024, and 1440; font/network inspection; accessibility baseline.

## 2. Homepage opening and index

**Goal:** Put identity and the three-project register in the first viewport.

**Files / area:** Homepage, project content module, index component.

**Acceptance criteria:** Name, university, scope, KAIROS role preview, kiosk completion preview, and Colors 9/30 preview are visible without scrolling at every target width.

**Verification:** Automated viewport assertions, visual captures, and keyboard checks.

## 3. KAIROS homepage row

**Goal:** Present AI work, personal contribution, operational boundary, and source as one scan path.

**Files / area:** Project register row and KAIROS content.

**Acceptance criteria:** Team Lead, competition context, CatBoost/public LaDe, personal validation/testing/reproducibility work, human decision boundary, team/MVP boundary, and source are explicit.

**Verification:** Factual diff against `EVIDENCE.md`, browser scan, and link test.

## 4. Ayam Kalintang homepage row

**Goal:** Show completed software for a real local business and the owned implementation areas.

**Files / area:** Project row and kiosk image integration.

**Acceptance criteria:** Role, Jan–Jul 2026, completed July 2026, kiosk/admin/customization, receipt/UAT evidence, team boundary, source, and one real cropped capture.

**Verification:** Image dimensions/alt text, factual diff, link test, and responsive crop review.

## 5. The Colors of MIPA homepage row

**Goal:** Give campus coordination equal featured-project weight.

**Files / area:** Project row and external artifact link.

**Acceptance criteria:** External Relations/BEM context, all nine programs, 30+ contributors, 200 target, 1,002 result, and confirmed Reel; contributor line receives the one approved result emphasis.

**Verification:** First/two-scroll visibility captures, factual diff, and external-link check.

## 6. N.A.R.A. supporting entry

**Goal:** Show interface and integration work without claiming teammates' AI engine.

**Files / area:** `More work` register row.

**Acceptance criteria:** Role, flows, response mapping/persistence, engine boundary, and source are visible; weight remains below featured work.

**Verification:** Factual diff, hierarchy review, and link test.

## 7. KAIROS detail page

**Goal:** Expand problem, system behavior, contribution, validation, and limits from approved evidence.

**Files / area:** `/work/kairos` and shared detail primitives.

**Acceptance criteria:** 450–650 words unless evidence requires less; no production, autonomy, or route-optimization claim; real artifacts sit beside supported statements.

**Verification:** Evidence trace, headings/landmarks, browser capture, and source links.

## 8. Ayam Kalintang detail page

**Goal:** Explain business context, shipped workflow, implementation ownership, and UAT revisions.

**Files / area:** `/work/ayam-kalintang` and detail media.

**Acceptance criteria:** 450–650 words unless evidence requires less; no unverified daily-use, payment, or business-performance claim; kiosk/admin/receipt artifacts have clear states.

**Verification:** Evidence trace, headings/landmarks, browser capture, and source links.

## 9. Contact and footer

**Goal:** Provide email, GitHub, LinkedIn, and résumé access without repeating the introduction.

**Files / area:** Footer/contact component and public résumé.

**Acceptance criteria:** Correct addresses, accessible link labels, and résumé only after the final PDF is supplied.

**Verification:** Keyboard navigation, mail link, HTTP checks, and PDF open/download behavior.

## 10. Real asset capture and integration

**Goal:** Capture only the safe real states defined in `ASSET_PLAN.md`.

**Files / area:** Local project runtimes and optimized public assets.

**Acceptance criteria:** No live integrations, private data, secrets, debug controls, or fake interfaces; homepage crops preserve evidence discovery.

**Verification:** Provenance check, metadata stripping, optimization report, and visual comparison.

## 11. Responsive refinement

**Goal:** Preserve the register scan path from 1440px to 320px.

**Files / area:** Layout and media CSS.

**Acceptance criteria:** No clipping/overflow; index stays in the first viewport; KAIROS source appears within one normal scroll; the full Colors participation result appears by two normal scrolls at 320px.

**Verification:** Identical capture sequence at all six target widths and scripted overflow assertions.

## 12. Accessibility

**Goal:** Meet WCAG 2.2 AA for critical homepage and detail paths.

**Files / area:** Semantics, focus, labels, colors, media, and reduced-motion CSS.

**Acceptance criteria:** Logical headings/landmarks, full keyboard use, visible focus, 44px targets, useful alt text, 200% zoom resilience, adequate contrast, no motion dependency.

**Verification:** Automated accessibility scan, keyboard walkthrough, contrast calculation, and zoom/reflow inspection.

## 13. Metadata, SEO, and 404

**Goal:** Add professional metadata and the failure state.

**Files / area:** Root metadata, canonical/OG, sitemap, robots, favicon, and `not-found`.

**Acceptance criteria:** Canonical uses the selected domain; metadata is factual; structured `Person` data contains public data only; 404 returns useful navigation.

**Verification:** Build output, metadata/schema inspection, sitemap/robots requests, and social-image dimensions.

## 14. Playwright

**Goal:** Cover critical paths without mirroring implementation details.

**Files / area:** Playwright configuration and end-to-end specs.

**Acceptance criteria:** Homepage, navigation, project/source links, résumé/GitHub/LinkedIn targets, keyboard path, and overflow assertions; Chromium, Firefox, and WebKit when supported.

**Verification:** Repeatable headless run and one headed Chromium check.

## 15. Performance

**Goal:** Stay inside the portfolio budgets.

**Files / area:** Font subsets, images, static boundaries, and bundle configuration.

**Acceptance criteria:** Initial transfer ≤1 MB, JavaScript ≤200 KB, fonts ≤160 KB; LCP ≤2.5s, CLS ≤0.1, TBT ≤200ms in the agreed profile.

**Verification:** Production bundle report, Lighthouse trace, network waterfall, and image/font audit.

## 16. Final visual review

**Goal:** Critique, audit, simplify, and polish the production screenshots.

**Files / area:** Rendered site and affected presentation code.

**Acceptance criteria:** Every finding is accepted, rejected, or tested with a reason; register repetition and source proximity receive explicit scrutiny; additions require evidence or navigation value.

**Verification:** Before/after capture set and recorded decisions.

## 17. Factual and copy review

**Goal:** Freeze prose after an evidence trace and restrained editorial pass.

**Files / area:** Project content and metadata.

**Acceptance criteria:** Every role, number, date, ownership statement, behavior, and limitation matches `EVIDENCE.md`; no banned marketing patterns; all copy changes are diffed and fact-preserving.

**Verification:** Claim-by-claim audit and manual review for formulaic or promotional writing.

## 18. Deployment

**Goal:** Produce a reproducible deployment when credentials/domain are available.

**Files / area:** Hosting configuration and deployment notes.

**Acceptance criteria:** Clean install/build, HTTPS, canonical URL, working public routes/assets, and no environment secrets in the client bundle.

**Verification:** Live smoke test, broken-link crawl, metadata checks, and final browser capture.

## Dependency proposal

| Name | Why required | Alternative without it |
|---|---|---|
| `next`, `react`, `react-dom` | Requested application/runtime stack | Plain static HTML would lose the selected production framework and metadata routing |
| `typescript` and React/Node type packages | Strict compile-time checks | JavaScript with JSDoc, which does not meet the requested stack |
| `tailwindcss` and its current official build integration | Requested styling system and token implementation | Handwritten CSS modules; viable but outside the preferred stack |
| ESLint with current Next.js rules | Framework-aware linting and quality gate | Typecheck plus manual review, with weaker framework checks |
| `@playwright/test` | Required browser, keyboard, link, and overflow coverage | Manual browser matrix, less repeatable and contrary to the requested gate |

Do not add icon, class-merging, animation, component, analytics, state, data-fetching, CMS, or carousel packages. Use platform APIs and small local components.

## Pre-mortem

| Failure | Early warning | Prevention in implementation plan |
|---|---|---|
| The register reads like a résumé/README and has no authored identity | Production captures show four mechanically identical text rows | Tasks 4–6 use evidence-driven media and the single Colors emphasis; task 16 removes repeated labels/rules |
| Colors remains technically present but its full result is too late on mobile | The 30+/nine-program line is absent after two 0.85-viewport scrolls at 320px | Tasks 10–11 use a shallow kiosk crop, compact spacing, and an explicit two-scroll criterion |
| Source links look detached from their claims | Inspection requires crossing a wide empty column or mobile sources follow media | Tasks 3–6 align desktop sources to evidence and keep mobile sources before media; task 16 retests proximity |
| Screenshots reduce trust through debug UI, stale states, or private data | Captures show development controls, blank canvas, real orders, or unexplained states | Task 10 uses seeded offline states, strips metadata, and labels historical artifacts |
| Compact copy blurs personal versus team ownership | A scan misses `personal work`, team boundaries, or the N.A.R.A. engine boundary | Every project slice has an ownership acceptance check; task 17 audits claims before copy freezes |
