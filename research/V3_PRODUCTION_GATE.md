# V3 production gate

> Historical baseline notice: this report predates the later human-approved Kinetic Lightfield/Aperture Rig runtime. Use `DESIGN.md` for current visual/runtime authority and `research/V3_1_RC_ACCEPTANCE.md` for the current release gate.

Status: production candidate built locally on 10 September 2026. Deployment remains intentionally stopped for final human review.

## Implementation

- Next.js 16.3.4 App Router, React 19.2.8, strict TypeScript 6.0.3.
- Static homepage with a real 6397 portrait, adaptive 00–06 navigation, six evidence-led chapters, dark/light theme and contact.
- Static `/work/kairos` and `/work/ayam-kalintang` case studies, 404, sitemap, robots and generated Open Graph image.
- Final visual references: Figma section `190:281`; desktop light `190:282`, desktop dark `190:477`, 1024 `190:673`, 768 `190:825`, 430 `190:977`, 375 `190:1130`, 320 `190:1283`; nav `220:282`; theme `135:14`.

## Parity verdict

PASS with implementation-level differences only. Production preserves the asymmetric portrait hero, Sora/Manrope hierarchy, cold off-white/slate-blue light system, midnight dark system, six equal-dignity chapters, real media, chapter rhythm and mobile semantic order. WebGL geometry is intentionally runtime-rendered rather than pixel-matched to a static Figma state. Screenshots are in `design-review/v3-production/` for 1440 light/dark, 1024, 768, 430, 375 light/dark and 320.

## Case studies

KAIROS: complete. It states the human decision boundary, team boundary, personal reliability work and qualifies the repository-recorded Recall@10 comparison as an offline reproduction.

Ayam Kalintang: complete. It states the real-business context, role, completion date, bounded personal work and UAT-derived revisions without adoption, revenue or live-payment claims.

## Signal Form

One persistent actor uses one mutable ribbon BufferGeometry, three persistent planes and five persistent nodes across seven states. The scene is lazy-loaded only on capable viewports at or above 700px, uses `frameloop="demand"`, stops invalidation after interpolation settles, and has no textures or post-processing. The measured peak was 12 renderer draw calls for the nine-mesh actor; the post-settle counter changed by at most one frame over 500 ms. Mobile, reduced motion, failed import, WebGL unavailability and context loss select the deterministic SVG poster. All identity, project, evidence, link and contact content is server-rendered outside canvas.

## Accessibility and resilience

PASS in Chromium and WebKit. Axe found no unresolved violations in light or dark mode. Keyboard focus, skip link, navigation, theme control, case-study paths, 200% CSS zoom with WCAG text spacing, reduced motion and 320px reflow passed. Width samples passed at 320, 360, 375, 390, 430, 768, 1024, 1280 and 1440. Console and same-origin request audits were clean.

## Performance

Local unthrottled lab measurements from the production build:

| View | LCP | CLS | DOMContentLoaded | load | transferred resources |
|---|---:|---:|---:|---:|---:|
| 1440×900 | 408 ms | 0 | 285 ms | 389 ms | 578,035 bytes / 18 resources |
| 375×812 | 232 ms | 0 | 165 ms | 267 ms | 252,769 bytes / 16 resources |

INP is not reported because a short local scripted session cannot provide meaningful field responsiveness data. The large raw Three/R3F chunk is deferred from mobile and loads after desktop capability/idle checks. These figures are local lab evidence, not field results.

## SEO, links and security

- Unique homepage and case-study titles/descriptions; favicon, Open Graph/Twitter metadata and generated OG image are present.
- Sitemap and robots include all public routes. Links and semantic copy are present in static HTML.
- Every public destination returned HTTP 200 during the link audit.
- CSP, `frame-ancestors`, `nosniff`, referrer and permissions policies are active in production. `upgrade-insecure-requests` activates only when `NEXT_PUBLIC_SITE_URL` is an HTTPS origin, so local production QA remains functional.
- No `.env` files or secret-pattern matches were found. `npm audit --omit=dev` reported zero vulnerabilities. External links use `rel="noreferrer"`.

## Test status

- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run build`: PASS; nine static routes/assets generated
- Chromium: 24/24 production and capture tests passed before the final three additional width samples; those 3/3 also passed.
- WebKit: 10 passed, 6 intentional Chromium-only skips.
- Firefox: NOT TESTED. The installed Playwright Firefox binary fails before launch with Windows side-by-side configuration error. No page code executes.

## Factual and design red team

Public prose was checked against `EVIDENCE.md`; target metrics, exclusive SAMBUT ownership, production adoption, medical outcomes, Aether executed-geometry claims and unverified business results are absent. Banned promotional phrasing returned no matches. The running screenshots show no gradients, glass, particles, repeated entrance animation, generic card grid or decorative technical UI. Real artifacts remain the visual evidence in every chapter.

## Remaining issues

- P0: none confirmed.
- P1: configure the final HTTPS domain in `NEXT_PUBLIC_SITE_URL` before deployment; canonical and sitemap otherwise resolve to the documented local fallback.
- P2: repair the host Firefox side-by-side runtime and rerun its Playwright project.
- P2: a résumé PDF was not supplied, so the public résumé action is omitted.

Overall production-candidate score: **9.2/10**. The candidate is ready for final human browser review, not deployment.
