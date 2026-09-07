# Production baseline report

Baseline commit: `557b7a9284b71845e2fdec5935d3d65e605a4e62`

Scope: the first production slice only. It contains the application shell, local font, light/dark theme system, header, introduction, three-project evidence index, the KAIROS homepage row, and the opening of the Ayam Kalintang row.

## Observed

The following findings were inspected directly from the committed source and stored screenshots:

- The homepage uses a `1160px` maximum shell, a split desktop opening, and a two-column desktop project row.
- KAIROS source access sits immediately after the evidence and boundary in the evidence column. The documented three-column source treatment is not implemented.
- The project index is the only filled content surface. It uses a one-pixel border, `10px` radius, and three `64px` minimum-height rows on desktop.
- IBM Plex Sans is locally hosted as one variable Latin WOFF2.
- Light and dark themes use separate semantic tokens. The switch is a native button with `role="switch"`, `aria-checked`, a changing label, and a minimum `44px` height.
- At 1440×900, the screenshots show identity, discipline, work scope, all three index entries, KAIROS role/context, all three technical evidence lines, the team boundary, and source access.
- At 375×812 and 320×800, identity, discipline, work scope, all three index entries, the Selected work heading, and the KAIROS heading appear without horizontal clipping.
- No project screenshot appears in the production slice. This follows the instruction to omit media until a safe real artifact is available.

## Recorded

The committed `qa.json` records a Playwright run against a local production server:

- HTTP status `200` at 320×800, 375×812, 768×900, and 1440×900.
- `documentElement.clientWidth` equaled `scrollWidth` at all four widths; the overflow scan returned no elements outside the viewport.
- IBM Plex Sans reported `document.fonts.status = "loaded"` and passed the font-face check at every viewport.
- The first-view index ended at approximately 566px on the 320px viewport and 573px on the 375px viewport. KAIROS began at approximately 649px and 656px.
- The recorded pages contain no console errors, page errors, or failed requests.
- A fresh dark-preference context initialized in dark mode with `aria-checked="true"` and the label “Switch to light mode.”
- Toggling changed the theme to light, saved `portfolio-theme=light`, updated the accessible state and label, and remained light after reload.
- The recorded keyboard order begins with Skip to content, then VA/home, Work, the theme switch, GitHub, LinkedIn, KAIROS, and Ayam Kalintang.

The repository history also records successful install, dependency audit, external-link checks, contrast calculations, and a broader browser review during the baseline session. Their raw outputs are not all preserved in `qa.json`, so this report does not promote them to newly observed results.

## Reverified on 7 September 2026

These commands were run again against the unchanged baseline source:

| Command | Result |
|---|---|
| `npm run typecheck` | Passed with zero TypeScript errors |
| `npm run lint` | Passed with zero reported lint errors |
| `npm run build` | Passed; `/`, framework not-found, and `/icon.svg` rendered statically |

## Not yet tested

These remain outside the baseline evidence:

- The complete Ayam Kalintang, Colors, Aether3D, N.A.R.A., contact, and footer sections.
- Real KAIROS, Ayam Kalintang, Aether3D, or N.A.R.A. artifact integration.
- The KAIROS and Ayam Kalintang detail routes.
- The required 430px and 1024px viewport checks.
- Firefox and WebKit browser runs.
- Automated accessibility scanning, screen-reader review, 200% zoom, and text-spacing overrides.
- Lighthouse and final transfer-budget verification.
- Final metadata, sitemap, robots, canonical URL, Open Graph image, resume, deployment, and live-site checks.
- Final factual, copy, design, and complete-portfolio QA.

This report is evidence for the production baseline only. It is not a release approval or a claim that the full portfolio has been tested.
