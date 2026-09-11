# V3.1 release-candidate acceptance

Status: runtime candidate verified locally and through GitHub Actions. Production deployment remains intentionally blocked on final human browser acceptance and the final canonical HTTPS domain.

## Verified runtime baseline

- Branch: `codex/v3-1-preview`
- Verified runtime commit: `c393b5183afe4fbd38563fd4dacf6c155483b78f`
- GitHub Actions Quality run: `34556413544` — **PASS**
- Install: PASS
- Lint: PASS
- Typecheck: PASS
- Production build: PASS
- Playwright-managed Chromium: PASS
- Playwright-managed Firefox: PASS
- Playwright-managed WebKit: PASS
- npm audit during clean install: 0 vulnerabilities reported

A later report-only commit may be the branch HEAD; `c393b5183...` is the runtime code baseline covered by the gate above.

## Runtime experience

- Kinetic Lightfield provides one continuous base with section-specific, palette-bound light movement.
- Hero uses one lazy-loaded, demand-rendered R3F Aperture Rig rather than a persistent chapter-spanning canvas.
- Aperture Rig is foregrounded at the lower-right portrait area on desktop and uses pointer-responsive geometry and lighting.
- Portrait is a restrained spatial foreground plane on fine-pointer desktop.
- Real project media uses intrinsic ratios, restrained perspective, local light response and stronger secondary Z separation.
- The Colors of MIPA remains a readable 9:16 artifact.
- UI screenshots preserve complete evidence without synthetic letterboxing.

## Progressive enhancement / accessibility

- Semantic identity, project evidence, links and contact remain server-rendered HTML.
- >=700px + WebGL + normal motion: lazy Hero WebGL.
- <700px: deterministic aperture poster.
- Crossing the 700px boundary tears down / restores WebGL correctly.
- Reduced motion: deterministic poster and no nonessential spatial motion.
- WebGL unavailable/import failure/context loss: deterministic poster.
- Coarse pointer has no hover-dependent functionality.
- One Canvas maximum, `frameloop="demand"`, DPR <=1.5, no post-processing or permanent idle loop.
- 320px reflow/overflow, 200% zoom + text-spacing, keyboard/focus and Axe checks pass in the automated release suite.

## Portfolio / factual boundaries

- Six projects use verified roles, evidence, source links and bounded claims from `EVIDENCE.md`.
- KAIROS and Ayam Kalintang have dedicated case-study routes.
- SAMBUT exposes both frontend and AI/backend source repositories.
- KAIROS offline evaluation remains explicitly qualified as offline reproduction evidence.
- No production adoption, medical outcome, autonomous dispatch, fabricated impact or unverified business result is claimed.

## Navigation / reliability

- Adaptive chapter navigation tracks natural forward and reverse scrolling.
- Homepage and case-study routes have theme support and return paths.
- Custom branded 404 exists.
- Root route-level error recovery and global root-layout error recovery exist.
- Console and first-party request audits are clean in the release suite.

## SEO / share / security

Implemented:
- unique route titles and descriptions
- canonical metadata
- branded aperture favicon
- branded Open Graph image
- homepage WebSite + ProfilePage/Person JSON-LD
- sitemap
- robots
- crawlable internal/source links
- preview `X-Robots-Tag: noindex, nofollow`
- CSP, framing protection, MIME-sniffing protection, referrer policy and restrictive permissions policy

Intentionally omitted because they do not fit this static portfolio:
- loading skeleton
- LocalBusiness schema
- `llms.txt`
- forced breadcrumb UI
- backend/database/API layer

## Deployment gate

### P0
None confirmed.

### P1 before production
1. Human review the current runtime on a real desktop browser and phone.
2. Select/claim the final public domain.
3. Set `NEXT_PUBLIC_SITE_URL` to that exact HTTPS origin in the production environment.
4. Deploy Preview/Production manually and run a final remote HTTPS smoke test.

### Optional
- Add a verified résumé PDF later; the current public résumé action is intentionally absent.

## Verdicts

- Code / build: **GO**
- Cross-browser CI: **GO**
- Accessibility baseline: **GO**
- Evidence integrity: **GO**
- SEO/share implementation: **GO, pending final origin**
- Security baseline: **GO**
- Human visual acceptance: **PENDING**
- Production deployment: **CONDITIONAL GO — final origin + human acceptance required**
