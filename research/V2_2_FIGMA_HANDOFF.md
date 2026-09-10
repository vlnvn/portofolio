# V2.2 Figma handoff

## Approved visual system

Kinetic Blueprint uses Sora for identity/project titles and Manrope for body, evidence and navigation. Light mode uses `#F3F6FB` background, `#E6ECF6` surface, `#13223A` text, `#53637A` muted, `#C5CFDF` rule, `#1757AF` interactive text and `#2F74E8` non-text energy. Dark mode uses `#09111F`, `#111D30`, `#EAF1FF`, `#A8B5C9`, `#263650`, `#8CB6FF` and `#70A4FF`. Interactive and energy blues remain separate roles.

`IMG_6397.JPG.jpeg` is the selected real portrait. It passed desktop light/dark and 375/320 framing. Keep face and upper shoulder intact. Signal Form may pass behind hair/shoulder or just outside the silhouette, never across eyes, nose, mouth or central face. Keep the naturally light wall for dark-edge separation; do not add a fake rim glow. The alternate candidates were not advanced because 6397 had no demonstrated compositional failure; user preference therefore remained decisive.

## Chapter identities and media

1. **KAIROS:** directional/ordered actor; Team Lead and human-decision boundary; large real queue/cutoff artifact remains required.
2. **Ayam Kalintang:** modular/tactile actor; real-business kiosk; large kiosk artifact with optional verified admin/receipt fragment. Clean capture remains required.
3. **SAMBUT:** reciprocal actor; patient/staff pair; real local in-memory capture is available. Patient UI leads, staff UI supports. Caption: recognition disabled.
4. **The Colors of MIPA:** expansive/social actor; real Reel or verified still; 30+ contributors, 9 programs and reported 1,002 result use typography rather than KPI cards.
5. **Aether3D:** strongest spatial actor; real browser preview labeled `SIMPLIFIED BROWSER PREVIEW / PROXY`; never imply executed Blender geometry.
6. **N.A.R.A.:** calmer layered actor; clean onboarding/dashboard/result/profile UI; keep recommendation engine team boundary.

## Signal Form

One procedural assembly persists: `RIBBON_A`, `PLANE_1..3`, `NODE_1..5`. Stable states are 00 Hero, 01 KAIROS, 02 Kalintang, 03 SAMBUT, 04 Colors, 05 Aether3D and 06 N.A.R.A. Browser proof is authoritative; the Figma state sheet is a parameter map. 01→02 has 0/25/50/75/100 captures. 03 SAMBUT uses paired reciprocal sides joined by the same backbone.

## Navigation and motion

Desktop may show full chapter labels. At narrower widths use `02 AYAM`, `04 COLORS`, and `05 AETHER` visually while preserving full accessible names in production. Contact remains reachable. Progress represents six chapters and the end state, never loading status.

Scroll owns Signal Form interpolation and progress. Thresholds own active chapter/nav/media state. Titles, roles, evidence and actions remain static. Only the active transition renders and then settles. Rapid skips move from the materialized state directly to the requested target. Reduced motion uses deterministic chapter posters with no interpolation.

## Responsive transformation

Desktop uses asymmetric collage and controlled overlap. Mobile uses semantic order: project, role/context, real media, boundary/evidence, source/action. It preserves the portrait and actor but reduces overlap. Vary media crop and section height in production so six chapters do not become identical cards or six forced 100vh slides.

## Accessibility constraints

Normal text contrast ≥4.5:1, large text ≥3:1; interactive blue values above are approved. Theme and navigation controls require 44px targets and visible focus. Keep full accessible chapter names, real-media alt text, full-size artifact access and all evidence outside WebGL/video. WebGL failure and reduced motion use deterministic posters.

## Remaining asset gates

Portrait and SAMBUT are closed. KAIROS, Kalintang clean media, Colors Reel/still, Aether preview and N.A.R.A. clean UI remain open. No placeholder is production media.

## Node IDs

- V2.1 base: hero light `107:2`, hero dark `107:26`, mobile `107:50`, narrow `107:73`, KAIROS desktop `107:96`, KAIROS mobile `107:110`, nav/control proof `107:123`.
- Chapters: Kalintang `110:2`, SAMBUT `110:30`, Colors `110:59`, Aether3D `110:86`, N.A.R.A. `110:112`, state sheet `110:141`.
- Continuous pages: desktop light `111:2`, desktop dark `111:184`, mobile 375 `111:366`, mobile 320 `111:455`.
- Responsive/browser/review: 768 `114:26`, 1024 `114:58`, browser Signal proof `114:90`, review notes `114:94`.
