# Production design contract — V2.3.1

Status: locked 7 September 2026. This document describes the current implemented design only. Do not use it as a redesign brief.

## Design name

Kinetic Blueprint

## Typography

- Display: Sora Light / Regular (Google Fonts, preloaded)
- Body, evidence, navigation, captions, actions: Manrope Regular / SemiBold (Google Fonts, preloaded)
- Project titles remain in Sora; not ExtraBold

## Color system

### Light mode — cold slate / dusty-blue

| Token | Value |
|---|---|
| Background | `#F3F6FB` |
| Surface | `#E6ECF6` |
| Text | `#131B2A` |
| Muted | `#5C6678` |
| Rule | `#C5CFDF` |
| Slate accent | `#283F62` |
| Interactive | `#1757AF` |
| Energy | `#2F74E8` |
| Ice | `#DCEAFF` |
| Focus | `#0B57D0` |

Contrast (text against background/surface): 15.92:1 / 14.53:1. Muted: 5.35:1 / 4.88:1. All links and focus meet WCAG 2.2 AA.

### Dark mode — midnight / navy

| Token | Value |
|---|---|
| Background | `#070C16` |
| Surface | `#0E1522` |
| Text | `#E8EDF5` |
| Muted | `#9EABC0` |
| Rule | `#333F54` |
| Accent | `#94ADD1` |
| Interactive | `#8CB6FF` |
| Energy | `#70A4FF` |
| Ice | `#243A5A` |
| Focus | `#A8C7FF` |

Project screenshots keep their source colors.

## Portrait

Source: `IMG_6397.JPG.jpeg`. Final treatment: `design-review/v2-3/portrait/6397-waist-up-environmental-v231.jpg` — a truthful waist-up environmental crop. No background removal, no generative alteration, no identity/clothing/skin manipulation. No public filename or internal portrait label is exposed. Face remains clear at 1440, 1024, 768, 430, 375, and 320px.

Production file: `public/media/portrait/valensius-alven.jpg`

## Page composition

### Desktop (≥1024px)

Asymmetric hero: portrait occupies right column; name, discipline, scope and actions on the left. Six project chapters follow as full-width sections in alternating layout (text-left, media-left, split, community). Persistent Signal Form layer is positioned behind/around content.

### Mobile (<768px)

Calmer semantic single-column composition. Name, portrait, scope, actions, navigation. No decorative project index beneath the hero. Contact email uses a responsive display size that keeps the full address intact at 430, 375, 360, and 320px.

## Theme control

44px control. Glyph: centered eclipse/aperture — an outer material disc with a concentric opening. Not a sun/moon pair. Implemented as a semantic `button` with `role="switch"`, `aria-checked`, accessible label, system-preference support, visible focus ring, and `localStorage` persistence.

## Navigation

Adaptive navigation bar. Persistent across scroll. Tracks the visible project chapter via IntersectionObserver. Shows `00 / 06 INTRO` through `06 / 06 N.A.R.A.`. Chapter links and Contact are reachable from the nav. Mobile shows a compact current-chapter indicator.

## Six project chapters — equal dignity

| # | Project | Layout |
|---|---|---|
| 01 | KAIROS | text-left |
| 02 | Ayam Kalintang | media-left |
| 03 | SAMBUT | split |
| 04 | The Colors of MIPA | community |
| 05 | Aether3D | media-left |
| 06 | N.A.R.A. | text-left |

All six chapters use real project media as primary visual evidence. No placeholder images.

### Media captions (exact)

- KAIROS: `Local replay · public LaDe pickup data`
- Ayam Kalintang: `Kiosk interface · July 2026`
- SAMBUT: `Patient terminal`; `Staff terminal`
- The Colors of MIPA: `Instagram Reel`
- Aether3D: `Simplified browser preview / proxy`
- N.A.R.A.: `Dashboard`; `Onboarding flow`

## Signal Form

One persistent actor. Seven states (00-06) driven by scroll position. One mutable ribbon BufferGeometry, three planes, five nodes. Lazy-loaded only on capable viewports at >=700px initial mount. `frameloop="demand"`. Stops invalidating after interpolation settles. No textures, no post-processing.

Mobile, reduced-motion, failed import, WebGL unavailability, and context loss all select the deterministic SVG poster.

## Reduced-motion fallback

`prefers-reduced-motion: reduce` -> deterministic SVG poster at all viewport sizes. No WebGL load attempted.

## WebGL progressive enhancement

Capability check at mount: `canvas.getContext("webgl2") || canvas.getContext("webgl")`. If null, poster is shown. Resize events do not re-evaluate eligibility after mount (intentional: initial-capability-based, safe, prevents mid-session context churn).

## Accessibility requirements

- One `<h1>` per page
- Ordered heading hierarchy
- Keyboard-visible skip link
- All nav links and controls reachable and focusable by keyboard
- Visible 2px focus outline on all interactive elements
- 44px minimum touch/click target for controls
- Axe zero violations (Chromium, light and dark)
- 200% CSS zoom + WCAG text spacing: no horizontal overflow
- 320px minimum viewport: no horizontal overflow
- `prefers-color-scheme` respected on first visit

## Anti-AI-slop constraints

The following are permanently banned from this design:

- Purple/cyan decorative gradients
- Glassmorphism or frosted-glass panels
- Particle systems or canvas decorations
- Generic floating orbs or cursor trails
- Repeated fade-up entrance animations
- Skill pills, technology walls, or badge grids
- Bento card layouts
- Glowing or animated borders
- Decorative code blocks
- Fake metrics or unverified engagement figures
- Generic marketing copy

## SEO and meta

- Unique title and description per route
- Open Graph / Twitter card metadata
- Generated OG image
- `sitemap.xml` and `robots.txt` cover all public routes
- `NEXT_PUBLIC_SITE_URL` must be set to the final HTTPS origin before production deployment

## Security headers (production)

`Content-Security-Policy`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Permissions-Policy`. Preview deployments additionally send `X-Robots-Tag: noindex, nofollow`.

## Final Figma reference

Page: `190:281` -- `V2.3.1 / FINAL FREEZE`
Desktop light: `190:282` / Desktop dark: `190:477` / 1024: `190:673` / 768: `190:825` / 430: `190:977` / 375: `190:1130` / 320: `190:1283`
