# Production design contract

## Design principle

Use a compact project register to put role, evidence, and source access in one scan path. The page should read as an inspected body of work, with restrained project-specific changes only where the evidence needs different emphasis.

## Page composition

- A slim header contains `Work` and `Contact`.
- The opening pairs the introduction with a three-item project index.
- `Selected work` contains KAIROS, Ayam Kalintang, and The Colors of MIPA in that order.
- `More work` contains N.A.R.A. as a shorter supporting entry.
- Contact closes the page. Do not add a standalone About section unless it contains new verified facts.
- Detail routes exist only for KAIROS and Ayam Kalintang.

## Grid

- Shell: `max-width: 1200px`, centered, with `36px` inline padding at 1024px and above, `28px` from 768–1023px, and `20px` below 768px.
- Opening at 1024px and above: `380px minmax(0, 1fr)` with an `84px` gutter.
- Project row at 1024px and above: `260px minmax(0, 1fr) 124px` with `32px` gutters. Columns are project/problem, role/evidence, and source.
- At 768–1023px: `200px minmax(0, 1fr)` with a `24px` gutter; sources align under the evidence column.
- Below 768px: one column in this order: project/problem, role/context, evidence, ownership boundary, source, media.
- Align major sections to the shell edges and row content to the first text baseline where practical.

## Typography

- Family: IBM Plex Sans, self-hosted under the OFL. Load Latin subsets and weights 400, 500, and 600 only.
- Body: `18px/1.55` desktop and `17px/1.55` mobile, weight 400.
- Name: `clamp(38px, 3.1vw, 44px)`, line-height 1.05, weight 500, tracking `-0.025em`.
- Section title: `22px/1.2`, weight 500.
- Project title: `28px/1.15`, weight 500; `27px` mobile.
- Role: body size, weight 600. Context, boundaries, index context, and captions: `15–16px`, weight 400.
- The Colors contributor result may use `20px/1.35`, weight 600. This is the only result line with extra typographic emphasis.
- Body paragraphs: maximum `65ch`; project descriptions: maximum `32ch`; evidence text: maximum `68ch`.

## Color

- Canvas: `#FFFFFF`.
- Primary text: `#22282C`.
- Secondary text: `#4A5459`.
- Link and focus accent: `#244861`. Accent exists only to identify interaction and focus.
- Rules: `#CBD1CB`.
- Optional neutral media backing: `#F3F5F3`.
- Text and interactive states must meet WCAG 2.2 AA. Do not encode meaning through color alone.

## Spacing

Use `4, 8, 12, 16, 20, 24, 32, 40, 48, 64px`. Project rows use `24–30px` vertical padding on desktop and `20–24px` on mobile. Prefer a smaller value from the scale before adding a new one.

## Rules and separators

- Use one-pixel neutral rules for the header, project-row boundaries, and footer.
- The desktop project index uses row separators; its mobile version uses spacing without a rule after every item.
- Do not place multiple rules around a heading when one boundary already establishes the group.

## Radius and shadows

- Radius: `0` for structure and text; up to `4px` only when real media needs crop containment.
- Shadows: none by default.

## Project-specific composition

### KAIROS

Project/problem in column one. Column two begins with Team Lead and competition context, followed by the three evidence points and team/MVP boundary. The source sits in column three. A real review-queue capture may follow the evidence in column two; omit the media block until that capture exists.

### Ayam Kalintang

Project/business problem in column one. Column two begins with Full-Stack Engineer · Deputy Team Lead and the Bakti BCA dates, followed by completion, owned implementation areas, UAT revisions, and team boundary. The source sits in column three. Place one tightly cropped kiosk image after the evidence; reserve admin and receipt artifacts for the detail page.

### The Colors of MIPA

Keep the register columns. Put External Relations and BEM context before the two results. Emphasize the `30+ contributors / all 9 programs` line by one typographic step, then show `target 200 / result 1,002`. The Reel is the source. Do not add a decorative image or make this section smaller than the software rows.

### N.A.R.A.

Use a shorter row under `More work`. Keep role, interface ownership, recommendation mapping/persistence, teammate AI-engine boundary, and source visible. Media is optional and must not elevate it above the featured work.

## Media treatment

- Use only real repository/application artifacts. Never simulate product UI.
- Homepage captures use a consistent shallow crop around the relevant interface, without a device frame.
- Preserve readable UI labels at 1440px and avoid personal or live business data.
- Captions identify artifact state only when that affects interpretation, such as a historical interface.
- If a clean artifact is unavailable, omit the media space and record the need in `ASSET_PLAN.md`.

## Link treatment

Use descriptive, underlined text with a four-pixel underline offset. Hover increases underline weight. Focus uses a visible two-pixel outline with four-pixel offset. Minimum interactive height is 44px where layout permits. State destinations (`KAIROS source`, `Instagram Reel`) instead of generic labels.

## Motion

No motion is approved for the initial build. Anchor jumps remain immediate. Any later transition must preserve meaning with `prefers-reduced-motion` and earn its place through an interaction need.

## Mobile transformation

- Collapse each row into the specified semantic reading order; do not preserve empty desktop columns.
- Keep the complete three-project index in the first viewport at 320–430px.
- Keep KAIROS ownership and source within one normal scroll, and make the full Colors participation result visible by two normal scrolls at 320px after final media crops.
- Allow names and roles to wrap naturally. Never reduce body text below 17px to save height.

## Accessibility requirements

Use semantic landmarks, one `h1`, ordered headings, a keyboard-visible skip link, visible focus, useful alt text, 44px touch targets, resilient zoom at 200%, and no horizontal overflow at 320px. External links must remain understandable out of context. Decorative assets use empty alt text; evidence-bearing captures describe the visible task and state.

## Anti-patterns

No cards, badges, pills, gradients, shadows, glass, decorative code, fake terminals, animation, technology walls, arbitrary numbering, repeated labels, duplicate identity blocks, empty media placeholders, or generic calls to action. Do not let the register become a résumé table: project descriptions, ownership boundaries, real artifacts, and the single Colors result emphasis must keep the composition tied to this work.
