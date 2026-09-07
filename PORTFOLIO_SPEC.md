# Portfolio specification

Status: production specification, locked 7 September 2026. The verified first production slice is implemented; later sections and routes remain planned. EVIDENCE.md controls facts; CONTENT_ARCHITECTURE.md controls order and density; CONSTRAINTS.md controls measurable quality gates; DESIGN.md controls presentation.

## Purpose and audience

Support the 2026–2027 undergraduate Claude campus application through independently useful project evidence. Secondary use: engineering recruiters and collaborators. Public content must make sense without mentioning the application or Anthropic.

## Success criteria

- A first-time reviewer can identify name, university and work scope within 10 seconds; strongest technical work and completed client context within 30; leadership, campus coordination and artifact destinations within 60. Validate with the walkthrough in CONTENT_ARCHITECTURE.md, explicitly distinguishing a reviewer simulation from a human study.
- KAIROS, Ayam Kalintang and Colors are all discoverable without opening detail pages. Exact personal role and ownership boundary appear in each feature.
- Every factual sentence maps to approved evidence IDs. No prototype, offline metric or completed project is silently promoted to live adoption.
- Readable and operable at 320, 375, 430, 768, 1024 and 1440px. Pass CONSTRAINTS.md before declaring ready to ship.

## Content hierarchy and featured work

Navigation → introduction/project index → selected work (KAIROS, kiosk, Colors) → supporting work (Aether3D, N.A.R.A.) → Contact/footer. Use the density limits in CONTENT_ARCHITECTURE.md. Reserve longer technical explanations for the two case studies. No technology list or uniform four-card gallery.

## Routes

| Route | Content | Rendering |
|---|---|---|
| `/` | Portfolio overview, community feature and contact | Static |
| `/work/kairos` | AI judgment, bounded personal contribution, qualified evaluation | Static |
| `/work/ayam-kalintang` | Business workflow, implementation and feedback-to-change example | Static |
| Unmatched paths | Useful 404 with Home and Work destinations | Framework 404 |
| `/sitemap.xml`, `/robots.txt` | Production-origin technical metadata | Generated at build/configuration time |

Do not create separate About, Contact, resume viewer, Colors, Aether3D, N.A.R.A., blog or application pages. Native source/artifact links provide further depth.

## Case-study structure

Shared semantic shell; different editorial content and media proportions:

1. Back to work anchor; project name, factual description, role, context/date and completion/prototype status.
2. Problem and constraint: ≤90 words.
3. Team product and personal contribution: explicit distinction, ≤100 words total.
4. Two decisions with constraint → implemented response → bounded result. KAIROS: decision-time validation and ranking/capacity semantics. Kiosk: customization/UAT revision and printer/workflow integration.
5. Evidence and limits: one optional qualified result for KAIROS; completion and concrete revisions for kiosk. Do not invent before/after measurements.
6. Source links: repository plus at most 2 directly relevant evidence artifacts/commits; return to Work.

Target 450–650 words per case, hard ceiling 750. One lead screenshot and at most one supplementary visual only if it explains a decision. KAIROS must not become a model card. No dense comparison chart on the homepage.

## Intended architecture

Resolved baseline: Next.js 16.3.4 App Router, React 19.2.8, TypeScript 6.0.3 strict mode, Tailwind CSS 4.3.3 and PostCSS integration. TypeScript 7 and ESLint 10 were tested but rejected because the current Next lint stack does not support them together.

- Server/static content by default; client code only for a real interaction.
- Content records store project identity, role, context, evidence IDs, destinations and media metadata. Shared page shell/navigation/footer; avoid a universal project-card component that flattens all evidence.
- Proposed source: `src/app/`, `src/components/`, `src/content/`, `public/`, `tests/`. Research and internal ledgers excluded from public assets and build packaging.
- Small dependencies; no component framework, animation library, CMS, database, auth, analytics or social embed by default.
- No project secrets or project backend integration. The portfolio links to projects; it does not operate their systems.

## Interaction requirements

- Native anchors and links; browser Back works; homepage anchors have stable IDs and visible headings.
- Critical content is never hidden behind hover, carousel, drag, tab, accordion or animation.
- Provide a two-state light/dark switch. First visit follows the system setting; a manual choice persists locally and is applied before paint. Use a semantic switch with a changing accessible label and no theme dependency.
- Entire media panels are not clickable when they contain other links. Use descriptive text actions; no nested interactive controls.
- Keep external navigation same-tab by default; if new-tab behavior is introduced, communicate it and use appropriate link relationship attributes.
- Contact uses visible email plus mailto. Resume uses a real downloadable file only when supplied and checked.
- No automatic video loading/playback. Instagram remains an external link.
- Navigation should wrap naturally on narrow screens rather than adding a hamburger without need. Avoid pinned/sticky behavior unless critique demonstrates navigation value.

## Responsive requirements

- Test all six specified widths; 320px is a first-class layout, not a scaled desktop screenshot.
- Desktop can use multiple editorial columns; mobile preserves the same meaningful DOM/reading order. Role and essential evidence precede optional large media.
- Body text minimum 16px, comfortable 1.5–1.7 line height, paragraph measure approximately 55–70 characters on wide screens. Metadata minimum 14px with readable contrast.
- Suggested heading envelope: name 36–64px, section 28–40px, project 24–36px, adjusted by real font metrics. No viewport-height hero; name should wrap naturally, usually at most 2 lines at 320px.
- No fixed content heights. Screenshots preserve aspect ratio; crop only where irrelevant chrome can be removed without changing apparent behavior. Full meaningful capture remains available if needed.
- Fix overflow at its source; do not use root `overflow-x:hidden` to conceal broken layout.

## Accessibility floor

Target WCAG 2.2 AA in applicable criteria; automated scans are necessary but do not establish conformance alone. Semantic landmarks; one H1 per route; logical heading progression; skip link; keyboard-visible focus; no traps. Targets ≥44×44px for navigation/actions, with adequate separation; inline prose links remain ordinary text links.

Normal text contrast ≥4.5:1, large text ≥3:1, meaningful UI/focus indicators ≥3:1. No color-only meaning. Useful screenshot alt text and visible context captions. Honor reduced motion; content visible with JavaScript disabled. Verify 200% zoom, 320px reflow/400% desktop equivalent, text-spacing overrides and a screen-reader critical path. No focus obscured by navigation.

## Performance targets

See CONSTRAINTS.md for protocol and enforcement. Targets: mobile Lighthouse ≥95; lab LCP ≤2.5s, CLS ≤0.1, TBT ≤200ms; field INP goal ≤200ms when real field data becomes available. INP is not a fabricated prelaunch lab result.

Homepage initial transfer ≤1MB compressed, total route JS ≤200KB compressed, total fonts ≤160KB, no third-party runtime embeds. First useful content must not wait for a client fetch. Optimize screenshots as AVIF/WebP, declare dimensions, lazy-load below-fold media. Font choice must survive local fallback and slow-network checks.

## SEO and metadata

- Home title: `Valensius Alven | Informatics Engineering`; distinct factual titles/descriptions for both cases.
- Canonical, Open Graph URLs and sitemap use one configured production origin, verified before release. Preview deployments must not masquerade as the canonical site.
- OG image uses real name/project text or approved project media; no fake product composite. Favicon may be a restrained typographic initial, not a new brand exercise.
- Structured data: Person with approved name, university affiliation and confirmed GitHub/LinkedIn sameAs. Do not add awards, job title, employer, birthdate or student identifier. Case CreativeWork fields only when their meaning matches supported facts.
- Robots and sitemap include only public content routes. Internal research must never be exposed as static files.
- Resume download is a pending asset; final handoff must explicitly identify if absent. Do not create a placeholder download.

## Non-goals

No skills cloud, services, testimonials, certifications wall, blog, fake terminal/dashboard, stock portrait, custom cursor, gratuitous 3D, counters, animated hero, filters, newsletter, contact form or Claude imitation.

## Factuality and presentation rules

- EVIDENCE.md wins over promotional README language. Public draft records should carry evidence IDs internally, not visible developer labels.
- Keep KAIROS as a human-controlled local competition MVP; keep personal ownership bounded.
- Keep kiosk completed July 2026; do not infer daily use or active payment processing.
- Keep Colors' 30+ contributors, 9 programs, 200-like target and 1,002-like result distinct. Never imply 1,002 participants.
- No fabricated assets, testimonials or metrics. Rewrite prose only after facts are complete, then compare every revision against the evidence ledger.
- At most one memorable visual device; typography, composition and real artifacts do the rest.
- Avoid repeated rounded rectangles, generic bento/SaaS grids, arbitrary numbered sections, decorative mono, all-caps eyebrows, arrows on every link and synchronized reveal animations.
- Every suspected design tell must be removed or justified by information/interaction. Safe-but-generic is not an automatic winner.

## Ship gates and delivery boundary

Before implementation: architecture, constraints, browser-tested structural comparison, final design contract, asset plan, and implementation plan are complete. Direction B, the compact project register, is locked.

During implementation: run install validation, typecheck, lint, production build, meaningful tests, Playwright, responsive captures, real-browser review, console/network checks, link checks, manual and automated accessibility checks, performance checks, factual review, copy review, and a final visual critique/distillation pass. Every copy revision must preserve facts and technical meaning.

Deploy only after gates and infrastructure are ready. If credentials are absent, supply exact short deployment instructions; never call a local preview a deployment. Outstanding resume/domain facts must be listed without blocking the present design stage.
