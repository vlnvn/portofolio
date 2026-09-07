# A/B browser review

## Method

Both variants used one shared HTML content source and the same real Ayam Kalintang screenshot. Captures were made in Chromium at exactly 1440×900, 375×812, and 320×800. A normal-scroll simulation moved 0.85 viewport heights per step. This is a visibility inspection, not a timed user study.

Pre- and post-distillation captures are stored under `design-review/a/` and `design-review/b/`. Machine-recorded positions are in `pre-visibility.json` and `post-visibility.json`.

## First viewport, post-distillation

At all three widths, both variants show the name, discipline/university, work scope, complete project index, KAIROS Team Lead preview, Ayam Kalintang real-business/completed-July preview, and Colors 9-program/30+ preview. The actual KAIROS role is also visible. At 1440px, B additionally shows the complete KAIROS evidence set, boundary, and source; A's source falls below the fold.

## Discovery simulation, post-distillation

| Viewport | Direction A | Direction B |
|---|---|---|
| 1440, first | Identity/index plus KAIROS role and evidence; source below fold | Identity/index plus complete KAIROS role, evidence, boundary, and source; kiosk completion line enters the fold |
| 1440, one scroll | Complete kiosk text; Colors below the viewport | Kiosk completion/source plus complete Colors evidence and Reel |
| 1440, two scrolls | Complete Colors evidence and Reel | Page bottom; Colors, N.A.R.A., and contact available |
| 375, one scroll | KAIROS evidence, boundary, source, and kiosk start | KAIROS evidence, boundary, source, and kiosk start |
| 375, two scrolls | Colors heading, role, 30+/nine-program line, and likes result visible; Reel below | Colors heading/role visible; 30+/nine-program line clipped at fold; Reel below |
| 320, two scrolls | Colors heading, description, and role are visible; numeric result lines remain below | Colors heading, description, and role are visible; numeric result lines remain below |

GitHub/source destinations are discoverable without paragraph reading. On mobile, KAIROS source appears within one scroll, Kalintang source within two, and the Reel after more than two. Neither variant introduced horizontal overflow. Local font faces reported loaded: Newsreader/Source Sans 3 for A and IBM Plex Sans for B.

## Visual critique and classification

The critique combined screenshot inspection with recorded DOM positions, viewport dimensions, font status, and overflow checks.

| Finding | Decision | Reason |
|---|---|---|
| Remove the KAIROS placeholder | ACCEPT | It delayed real evidence without adding trust |
| Remove duplicate About, duplicate header name, and View work | ACCEPT | They repeated the introduction or an immediately visible destination |
| Keep the project index | ACCEPT | It exposes kiosk completion and Colors participation in every first viewport |
| Keep roles and team/engine boundaries before media | ACCEPT | They establish ownership and trust before presentation |
| Tighten B's title/source columns | ACCEPT | It reduces detached links and unnecessary title wraps |
| Remove B's per-row rules on mobile | ACCEPT | The opening otherwise resembles a résumé table |
| Give Colors one stronger result line in B | ACCEPT | It corrects observed community visibility without changing B's grammar |
| Moderate A's serif scale and Colors statement | ACCEPT | It retains identity while reducing editorial/pull-quote signals |
| Add cards, colors, icons, animation, or decorative media | REJECT | None improves discovery or evidence quality |
| Remove all separators | REJECT | A limited set still groups an undecorated page |
| Remove ownership boundaries to gain height | REJECT | The saved height would reduce attribution clarity |
| Let B use full-height homepage screenshots | REJECT | Media height is the remaining mobile obstacle to Colors discovery |

## Distillation

Removed from both: empty KAIROS media scaffold/caption, repeated header name, `View work`, About navigation, and the verbatim duplicate About section. Shared project, evidence, heading, and opening spacing was tightened. A reduced the name and Colors serif sizes and tightened its grid. B narrowed the source column, widened the project-title column, removed mobile register rules, and gave the 30+/nine-program result one controlled type step.

## Final score

| Criterion | Weight | A | B |
|---|---:|---:|---:|
| First viewport clarity | 15% | 8 | 9 |
| 30–60 second discoverability | 20% | 8 | 9 |
| Personal ownership clarity | 15% | 8 | 9 |
| Colors/community visibility | 15% | 9 | 8 |
| Technical evidence clarity | 10% | 8 | 9 |
| Mobile quality | 10% | 9 | 8 |
| Distinctiveness | 10% | 9 | 7 |
| Long-term portfolio value | 5% | 8 | 9 |
| **Weighted score** | **100%** | **8.35** | **8.55** |

## Decision

**Winner: B — compact project register.**

- It is the only variant that keeps KAIROS role, technical evidence, boundary, and source together in the desktop first viewport.
- It exposes the completed real-business row and full Colors evidence one desktop scroll earlier.
- The one-font system and register scale to detail pages without turning each project into a separate editorial composition.
- A is stronger for community emphasis and identity, but its evidence-margin advantage disappears on mobile.
- B still needs a shallower homepage media crop so the full Colors participation result enters the second-scroll viewport at 320px.
- B still needs the approved single-step Colors result emphasis and careful source proximity so it does not read as a generic CV/README.
