# Production design contract — Kinetic Blueprint + Kinetic Lightfield

Status: current production authority. This file describes the implemented portfolio after human browser review. Where it differs from older Figma/static-freeze documents, this runtime contract reflects the later approved user decisions.

## Identity and composition

- Display type: Sora Light/Regular.
- Body, evidence, navigation, captions and actions: Manrope Regular/SemiBold.
- Desktop: asymmetric identity on the left, real portrait on the right, six full-width project chapters with different compositions.
- Mobile: calm semantic single-column layout with the same project order and evidence.
- Real project media remains more important than decorative interaction.
- No skills wall, testimonials, fake metrics, generic bento grid, glassmorphism, tech-logo strip, fake terminal or stock/AI-generated portrait.

## Color and atmosphere

### Light
- Background: `#E9EFF6`
- Surface: `#DCE5F0`
- Text: `#131B2A`
- Muted: `#5C6678`
- Slate accent: `#283F62`
- Energy: `#2F74E8`
- Ice: `#DCEAFF`
- Focus: `#0B57D0`

### Dark
- Background: `#070C16`
- Surface: `#0E1522`
- Text: `#E8EDF5`
- Muted: `#9EABC0`
- Accent: `#94ADD1`
- Energy: `#70A4FF`
- Ice: `#243A5A`
- Focus: `#A8C7FF`

Kinetic Lightfield uses low-opacity palette-derived illumination. Sections share one continuous page base; transparent oversized light layers provide chapter rhythm without hard color bands. Dark mode may be more cinematic; light mode uses cool shadows and a dimmer off-white base rather than pure white.

## Hero

The production hero combines factual identity, the approved real 6397 environmental portrait, and one procedural 3D Aperture Rig.

The portrait remains unaltered. On fine-pointer desktop it behaves as a restrained foreground plane with small translation/rotation and pointer-responsive light. It becomes static for coarse pointers and reduced motion.

The Aperture Rig is the spatial expression of the eclipse/aperture theme-control language:
- three ring structures;
- three aperture/blade elements;
- five nodes;
- central negative space;
- restrained physically shaded blue/ice materials.

It sits at the lower-right foreground edge of the portrait on desktop, with controlled overlap that never obscures the face or identity text.

The rig performs one short assembly on initial normal-motion desktop render, responds to pointer depth and moving key/fill light, then stops rendering after motion settles. It is not a persistent 00–06 chapter morph.

## Kinetic Lightfield chapter behavior

The same palette is used throughout; chapters differ by light placement and motion grammar rather than independent brand colors:
- Hero: portrait/rig-centered layered illumination.
- KAIROS: directional light.
- Ayam Kalintang: two localized workflow/station pools.
- SAMBUT: opposing reciprocal lights.
- The Colors of MIPA: broad diffuse field.
- Aether3D: strongest spatial field.
- N.A.R.A.: calmer layered closing field.
- Contact: converging/settled light.

Pointer and scroll updates are requestAnimationFrame-throttled and rely primarily on transform/opacity. There is no autonomous endless background animation.

## Project media

UI screenshots preserve their intrinsic aspect ratios rather than being forced into a universal frame. Complete interface evidence is preferred over cropping. The Colors of MIPA Reel remains an intentional 9:16 crop.

Fine-pointer desktop media uses restrained perspective, translation and local light response. Secondary media receives stronger perceived Z separation. Reduced-motion and coarse-pointer experiences remain complete without these effects.

## Navigation and theme

The persistent adaptive navigation tracks the visible chapter and exposes Home/VA, project chapters, Contact and the theme control.

Theme control is a 44px semantic switch using the custom eclipse/aperture glyph. It respects system preference on first visit and persists explicit user choice in localStorage.

## WebGL progressive enhancement

WebGL is decorative, not semantic.
- >=700px + WebGL + normal motion: lazy-load the hero scene.
- <700px: deterministic static aperture poster.
- reduced motion: deterministic static aperture poster.
- WebGL unavailable/import failure/context loss: deterministic static aperture poster.
- resizing across 700px re-evaluates eligibility and can tear down/recover WebGL.
- one Canvas maximum.
- `frameloop="demand"`, DPR <=1.5, no post-processing, texture dependency, particles or permanent idle loop.

All identity, project evidence, links and contact information remain HTML outside Canvas.

## Accessibility and reliability

- One H1 per public route.
- Logical headings and semantic landmarks.
- Keyboard-visible skip link and focus-visible states.
- 44px theme-control target.
- No essential hover-only or WebGL-only information.
- `prefers-reduced-motion` removes nonessential spatial motion.
- 320px minimum target without horizontal overflow.
- 200% zoom/text-spacing reflow must remain usable.
- Custom 404 and global runtime recovery UI exist.
- Real project image alt text describes the evidence shown.

## Public project captions

- KAIROS: `Local replay · public LaDe pickup data`
- Ayam Kalintang: `Kiosk interface · July 2026`
- SAMBUT: `Patient terminal`
- The Colors of MIPA: `Instagram Reel`
- Aether3D: `Simplified browser preview / proxy`
- N.A.R.A.: `Dashboard`

## SEO / share / security

Production provides per-route titles/descriptions/canonicals, a branded aperture favicon, branded Open Graph image, sitemap, robots, ProfilePage/Person structured data, and crawlable internal/source links. `NEXT_PUBLIC_SITE_URL` must be the real final HTTPS origin before production deployment.

Production headers include CSP, referrer policy, MIME sniffing protection, framing protection and a restrictive permissions policy. Preview deployments send `X-Robots-Tag: noindex, nofollow`.

## Permanent anti-slop constraints

Do not add generic purple/pink/cyan AI gradients, aurora blobs, particles, cursor trails, custom cursors, floating tech logos, glowing text/borders, glass panels, decorative dashboards, fake source code, repeated fade-up choreography, fabricated metrics or unverified project claims.

Creative intensity comes from the Aperture identity, responsive light/depth, asymmetric composition and real evidence rather than effect quantity.
