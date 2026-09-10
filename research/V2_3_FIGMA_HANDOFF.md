# V2.3 Figma handoff

Status: evidence-complete pre-production design. Production source remains unchanged. Human approval is still required before implementation.

## Final palette

- Light: background `#F4F2EC`, surface `#E8E8E8`, text `#131B2A`, muted `#5C6678`, slate-blue accent `#283F62`, focus `#2E6BA6`, rule `#C9C9C2`.
- Dark: background `#070C16`, surface `#0E1522`, text `#E8EDF5`, muted `#9EABC0`, accent `#94ADD1`, rule `#333F54`.
- Accent marks interaction, chapter state, evidence boundaries, and selected facts.
- Measured contrast: light accent `9.49:1`, light muted `5.17:1`, dark accent `8.53:1`, dark muted `8.42:1`.

## Type system

- Sora Light carries the hero and most project titles. Sora Regular handles precise or denser titles. Sora SemiBold is limited to compact identity moments.
- Manrope Regular carries body copy. Manrope SemiBold carries roles, evidence, actions, navigation, and captions.
- Desktop hero: `84–92px`; desktop chapter titles: `60–72px`; mobile identity and titles: `34–54px`; body: `15–22px`; metadata/actions: `10–17px`.
- ExtraBold is removed from the V2.3 hierarchy. Copy groups use content-driven Auto Layout and readable line lengths.

## Portrait rule

- Selected source: `IMG_6397.JPG.jpeg`, represented by `design-review/v2-3/portrait/6397-waist-up-environmental.jpg`.
- Use an upper-body environmental crop. Keep facial identity, clothing, and body untouched. Do not generate missing body regions or add a rim glow.
- The non-generative alpha attempt is rejected because visible matte residue remains around the rear shoulder, torso, and hand edge.
- On mobile, the portrait sits below the name; scope and actions follow below the portrait. Keep the central face clear of Signal Form geometry.

## Chapter composition

- `01 KAIROS`: technical artifact leads; ownership and the dispatcher boundary stay adjacent to the real queue view.
- `02 Ayam Kalintang`: large tactile kiosk view on the left, compact ownership and completion evidence on the right.
- `03 SAMBUT`: patient and staff terminals overlap as two real interfaces; contribution remains shared and bounded.
- `04 The Colors of MIPA`: text-led community chapter with a vertical real Reel poster and controlled participation emphasis.
- `05 Aether3D`: widest spatial artifact. Caption must say `SIMPLIFIED BROWSER PREVIEW / PROXY`; never imply executed Blender geometry.
- `06 N.A.R.A.`: calm layered dashboard and onboarding composition; recommendation-engine ownership remains a team boundary.
- Desktop chapter heights vary from `960–1100px`. Mobile chapters vary from `850–980px`.

## Signal Form and media

- Keep one persistent actor with states `00–06`. Media is evidence; Signal Form is narrative structure.
- Signal Form may pass behind the portrait or media frame and emerge beyond an outer edge. It must not cross the face, controls, evidence, captions, or source actions.
- Protected-zone corrections are reflected in SAMBUT `142:122`, Colors `144:135`, and the 768px states under `155:379`.
- Figma groups communicate state and travel intent. Production owns actual depth, continuity, occlusion masks, and reduced-motion behavior.

## Navigation

- Desktop component set `136:100`; mobile component set `137:86`; theme control `135:14`.
- Desktop shows all six chapters plus Contact and the 44px eclipse theme control. Mobile shows the current chapter, `xx / 06`, Contact, and the same control.
- Navigation is one persistent control. Do not render a separate header at every chapter boundary.

## Responsive behavior

- `1024px`: alternating two-column chapters remain viable.
- `768px` and below: semantic content precedes media; Signal Form reduces and moves outside the artifact.
- `430/375/320px`: name, discipline, scope, portrait, actions, and six-project index fit the hero; projects stack in semantic order.
- The 320px text-spacing proof uses 150% line height and 12% letter spacing and has no text/media collision.

## Motion ownership and 3D architecture

- Normal browser scrolling drives progress; no scroll-jacking.
- Use one fixed, pointer-transparent WebGL canvas behind semantic DOM content, with one scene graph interpolating between `00–06`. Keep DOM content and controls outside the canvas.
- Lazy-load WebGL, cap device pixel ratio, pause when hidden, and provide a static vector fallback. `prefers-reduced-motion` locks the actor to stable chapter states and removes travel interpolation.
- Recheck every transition against final DOM media rectangles. Motion may connect empty space; it may not sweep across protected evidence.

## Project visuals and provenance

| Project | Final visual | Provenance |
|---|---|---|
| KAIROS | Real queue/review-capacity replay | `design-review/v2-3/project-evidence/kairos/PROVENANCE.md` |
| Ayam Kalintang | Real kiosk menu | `design-review/v2-3/project-evidence/ayam-kalintang/PROVENANCE.md` |
| SAMBUT | Real patient and staff terminals | `design-review/v2-3/project-evidence/sambut/PROVENANCE.md` |
| Colors of MIPA | Confirmed real Reel poster | `design-review/v2-3/project-evidence/colors-of-mipa/PROVENANCE.md` |
| Aether3D | Real simplified browser proxy | `design-review/v2-3/project-evidence/aether3d/PROVENANCE.md` |
| N.A.R.A. | Real dashboard and onboarding | `design-review/v2-3/project-evidence/nara/PROVENANCE.md` |

## Accessibility and implementation-sensitive details

- Preserve semantic heading and DOM reading order. Art layers remain `aria-hidden` and pointer-inert.
- Retain visible focus, the 44px theme control, keyboard-accessible navigation and links, and the measured text contrast.
- Do not bake text into project screenshots. Alt text should identify the workflow and why the artifact is evidence.
- Runtime QA must cover keyboard order, focus visibility, 200% zoom, reduced motion, forced colors, image loading, canvas fallback, and mobile performance.

## Final node IDs

- Foundations `138:30`; Visual QA `171:281`; media/provenance `157:263`; portrait decision `147:134`.
- Hero light `150:162`; hero dark `150:199`.
- Chapters: KAIROS `139:56`; Ayam Kalintang `141:69`; SAMBUT `142:82`; Colors `144:95`; Aether3D `145:108`; N.A.R.A. `146:121`.
- Full desktop light `152:188`; full desktop dark `153:201`.
- Responsive: 1024 `155:214`; 768 `155:379`; 430 `156:236`; 375 light `156:398`; 320 light `156:560`; 375 dark `160:263`; text-spacing stress `164:272`.
