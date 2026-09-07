# Production design contract

Status: locked 7 September 2026 after browser calibration. Direction B uses a compact project register with a crafted but quiet visual system.

## Design principle

Evidence should be faster to find than decoration. One quiet index surface gives the opening an authored shape; project identity comes from real artifacts, factual roles, and different evidence rhythms.

## Page composition

Header → split introduction and project index → featured project rows → supporting-work rows → contact/footer. The first featured row begins in the initial desktop and mobile viewport. Long reasoning stays on the two detail routes.

## Grid

- Shell maximum: `1160px`; horizontal padding `20px` mobile, `32px` tablet, `40px` desktop.
- Desktop opening: `5/7` columns. Project rows: `3/7/2` columns with `32px` gutters.
- At `≤900px`, project rows become two columns: identity `minmax(180px, 0.75fr)` and evidence `1.5fr`; source joins evidence.
- At `≤680px`, use one column in semantic order. Do not preserve empty desktop tracks.

## Typography

- Family: IBM Plex Sans, locally hosted Latin files. Use 400 for prose, 500 for names/links, 600 for roles and short evidence labels.
- Name: `clamp(2.5rem, 5vw, 4rem)`, weight 500, line-height `0.98`, tracking `-0.035em`.
- Section/project headings: `clamp(1.65rem, 2.4vw, 2.25rem)`, weight 500, line-height `1.08`.
- Body: `clamp(1rem, 0.35vw + .92rem, 1.125rem)`, line-height `1.55`.
- Metadata: `0.9rem–1rem`, line-height `1.45`; never use tiny uppercase eyebrows.
- Prose line length: `48–68ch`; evidence lines may be shorter.

## Color

Light tokens: background `#f4f8f7`, surface `#e9f2ef`, text `#10211e`, muted `#536661`, rule `#c7d6d2`, accent `#006f69`, focus `#007d76`.

Dark tokens: background `#07120f`, surface `#102823`, text `#edf7f3`, muted `#a9bbb5`, rule `#28423b`, accent `#72d8cf`, focus `#8ce9e0`.

The accent marks links, focus and the active theme state. Tune themes independently. Text and controls must meet WCAG 2.2 AA; focus indicators must reach 3:1 against adjacent colors. Theme browser chrome and text selection should use the active tokens.

## Spacing

Use `4, 8, 12, 16, 24, 32, 48, 64, 88px`. Opening padding is `48–64px` top and `64–88px` bottom on desktop, `32px` top and `48px` bottom on mobile. Project rows use `40–64px` vertical spacing.

## Rules, radius and shadows

Use one-pixel rules for header, project boundaries and index rows. Avoid duplicate separators. Structural containers remain square. Radius is `10px` for the index surface and real media crop; the theme switch may be pill-shaped because its track communicates a binary state. Shadows default to none. One low-spread shadow may separate a real artifact from the page when its edge is otherwise unclear.

## Project-specific composition

### KAIROS

Column one: project name and problem. Column two: Team Lead, competition context, three evidence points, explicit team/MVP boundary, source, then one real review-queue capture if available. Never render a placeholder in production.

### Ayam Kalintang

Column one: project name and business problem. Column two: Full-Stack Engineer · Deputy Team Lead, dates/completion, owned kiosk/admin/customization work, receipt/UAT revisions, source, then a real kiosk crop. Detail-only artifacts cover admin and receipt workflows.

### The Colors of MIPA

Keep full featured-row weight. Put role and BEM context before `30+ contributors across all 9 programs`; set that line one typographic step above body text. Follow with `target 200 likes; result 1,002` and the Reel link. No decorative media is required.

### Aether3D

Use a short supporting row before N.A.R.A. State that it is a personal AI/3D experiment using Gemini to request Blender Python and a simplified browser preview. If a real browser capture is used, label the preview as a simplified proxy. Homepage only.

### N.A.R.A.

Use a short supporting row. Keep the exact role, owned interface flows, recommendation mapping/persistence, teammate AI-engine boundary and source visible. Media is optional.

## Media treatment

Use only real project artifacts. Homepage crops are shallow, without browser/device frames, and must keep task-defining UI labels legible. Historical or proxy states receive plain captions. If a safe artifact is unavailable, omit its space.

## Links

Use descriptive underlined text with `4px` underline offset. Hover thickens the underline. Focus uses a visible `2px` outline with `4px` offset. Place source links directly after the evidence they validate. Interactive targets are at least `44×44px` when presented as controls.

## Theme and motion

The two-state theme button uses an inline sun, a compact track/thumb and an inline moon. It is a semantic `button` with `role="switch"`, current `aria-checked`, and a changing accessible label. The first visit follows `prefers-color-scheme`; a manual choice persists in local storage. Apply the theme before paint to prevent a wrong-theme flash. Use no theme package.

Approved motion: `120–180ms` color and thumb-position transitions on the theme control and link state changes. No entrance or scroll animation. Disable nonessential transitions under `prefers-reduced-motion`.

## Mobile transformation

Keep the name, two factual lines and the complete three-project index in the first viewport at 320–430px. Keep `Work` in the header; contact may move to the footer. Collapse rows to project → role/context → evidence → source → media. Body text stays at least `16px`; primary reading copy targets `17px`.

## Accessibility

Use landmarks, one `h1`, ordered headings, a keyboard-visible skip link, native anchors/buttons, visible focus, useful alt text, 44px control targets, 200% zoom resilience, adequate contrast in both themes, reduced-motion support and no horizontal overflow at 320px. The theme switch must announce its state and label without relying on its icons.

## Anti-patterns

No decorative gradients, glass, glowing borders, generic cards, badges, bento layout, stock imagery, fake interfaces, decorative code, technology wall, oversized hero, repeated eyebrow labels, arbitrary numbering, automated social embed or motion on scroll. Do not repeat the same container geometry for every project. Do not use theme styling to imitate another product brand.
