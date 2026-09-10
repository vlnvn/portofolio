# V2.3.1 final static-design freeze

Status: frozen for production handoff. The production source was not modified.

## Color tokens

Light mode restores the approved cold V2.2 base:

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

The light backgrounds and surfaces are bound to the existing V2.2 light-mode variables rather than recolored per frame. Measured normal-text contrast against background/surface is: text `15.92:1 / 14.53:1`, muted `5.35:1 / 4.88:1`, interactive `6.42:1 / 5.86:1`, and focus `5.90:1 / 5.38:1`.

Dark mode remains unchanged:

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

Source `IMG_6397.JPG.jpeg` remains selected. One final non-generative U2Net/alpha-matting pass was rejected because it retained the chair, damaged the lower shirt silhouette, and produced weak hand/body edges. The final treatment is the truthful waist-up environmental crop at `design-review/v2-3/portrait/6397-waist-up-environmental-v231.jpg`. It shows no legs, reduces room and desk emphasis, and changes no identity, clothing, skin, or body pixels.

The face remains clear at 1440, 1024, 768, 430, 375, and 320px. Signal Form geometry stays behind the portrait or outside the central face. No public filename or internal portrait label remains.

## Typography

Sora Light/Regular remains the display system. Manrope Regular/SemiBold remains the body, evidence, navigation, action, and caption system. Project titles do not return to ExtraBold.

## Theme control

The final 44px control uses a centered eclipse/aperture glyph: an outer material disc with a concentric opening. It does not use a sun, moon, or sun/moon pair. Production must provide an accessible label, current/pressed state, focus visibility, system-preference support, and persistence.

## Public media captions

- KAIROS: `Local replay · public LaDe pickup data`
- Ayam Kalintang: `Kiosk interface · July 2026`
- SAMBUT: `Patient terminal`; `Staff terminal`
- The Colors of MIPA: `Instagram Reel`
- Aether3D: `Simplified browser preview / proxy`
- N.A.R.A.: `Dashboard`; `Onboarding flow`

The Aether chapter also states that the browser view is not executed Blender geometry. Internal verification language remains only in repository documentation. Redundant responsive Reel captions were removed while the Reel action remains.

## Final Figma nodes

- Page: `190:281` — `V2.3.1 / FINAL FREEZE`
- Desktop light: `190:282`
- Desktop dark: `190:477`
- 1024 light: `190:673`
- 768 light: `190:825`
- 430 light: `190:977`
- 375 light: `190:1130`
- 320 light: `190:1283`
- 360 contact proof: `196:2`

## Responsive constraints

Mobile uses one adaptive navigation model. The decorative six-project index beneath the hero was removed. Name, discipline, portrait, scope, actions, and persistent navigation remain readable. Contact email uses a responsive display size that keeps `alvenvalensius93@gmail.com` intact at 430, 375, 360, and 320px.

The targeted bounds check found no text/text, nav/content, portrait/critical-text, or frame-clipping failures. Detected caption/media adjacency and Signal Form/media intersections are intentional edge relationships verified visually; none obscures evidence-bearing UI. Required result: zero unintended semantic collisions.

## Runtime-only validation gates

Production owns the real R3F Signal Form, scroll interpolation, pointer response, keyboard behavior, visible browser focus, `prefers-reduced-motion`, WebGL failure fallback, frame time, bundle size, context loss, system theme restoration, and browser restoration behavior. These gates do not reopen the frozen static composition unless implementation exposes a direct accessibility or evidence-legibility defect.
