# V2.3 visual QA

Status: initial registry recorded before V2.3 corrections. `Open` findings must be verified against final V2.3 frames; historical V2.2 node IDs are retained as evidence.

| ID | Severity | Frame | Node(s) | Domain | Observation | Objective evidence | Why it matters | Correction direction | Status |
|---|---|---|---|---|---|---|---|---|---|
| VQA-01 | P0 | V2.2 Ayam Kalintang | `110:10`, `110:11`, `110:12` | Collision / semantic layout | The two-line project title overlaps the role and context. | Programmatic bounds show about `600 × 21 px` title/role and `600 × 19 px` title/context intersections. Root uses `layoutMode = NONE`; title height grew to about 149 px. | Role and context are unreadable, and the composition is not resilient to browser font metrics. | Rebuild the marker, title, role, and context as a content-driven semantic group; preserve art layers separately. | Open |
| VQA-02 | P1 | All V2.2 desktop chapters | Major chapter roots | Responsive structure | Semantic text relationships rely on absolute coordinates. | Major roots use `layoutMode = NONE`; titles, roles, metadata, evidence, and actions are individually positioned. | Copy changes, font loading, text spacing, and narrow layouts can create collisions or clipping. | Use nested Auto Layout for semantic groups and keep Signal Form/collage layers absolute. | Open |
| VQA-03 | P1 | Full desktop and mobile V2.2 | `111:2`, `111:184`, `111:366`, `111:455` | Rhythm | Chapters repeat fixed 900/920 px heights. | Desktop is 900/960/900/900/900/900/900/640; mobile repeats 920 px after the first two chapters. | The page reads as a slide deck and ignores media ratio and copy density. | Set varied content-led chapter heights and transition breathing room. | Open |
| VQA-04 | P1 | Full desktop V2.2 | `111:2`, `111:184` | Composition | Five chapters repeat title/evidence left and media right. | The same spatial template recurs across KAIROS, Kalintang, Colors, Aether, and N.A.R.A. | Equal chapter dignity becomes mechanical repetition; evidence does not shape composition. | Give each chapter the PRD-defined evidence-led composition while retaining shared type, nav, Signal Form, and blue identity. | Open |
| VQA-05 | P1 | Hero and project chapters | `107:2`, `107:26`, `107:96`, `110:2`, `110:30`, `110:59`, `110:86`, `110:112` | Typography | ExtraBold 800 carries nearly every major heading. | Current major display sizes use Sora 76–96 px at weight 800. | Weight replaces scale, line break, contrast, and negative space; the result resembles a generic bold-tech portfolio. | Test 300/400/500 for the hero and use 700/800 only for a justified focal moment. | Open |
| VQA-06 | P2 | Project chapters | Repeated eyebrow nodes | Content hierarchy | Labels such as “PRIMARY PROJECT” repeat information already expressed by chapter navigation. | The labels recur across project chapters without adding role, context, or evidence. | Repetition adds interface noise and an AI-template tell. | Remove redundant category eyebrows; retain functional chapter identity and numbering. | Open |
| VQA-07 | P1 | Hero variants | `107:2`, `107:26`, `107:50`, `107:73` | Portrait | The real 6397 portrait remains an environmental rounded rectangle with lower-body context. | Existing frames show the supplied photo as a framed image rather than an integrated waist-up cutout. | The frozen typography + portrait + Signal Form relationship is not yet proven. | Produce a non-generative waist-up alpha cutout, inspect the matte, and compare it with a waist-up environmental fallback. | Open |
| VQA-08 | P0 | KAIROS, Kalintang, Colors, Aether, N.A.R.A. | Project media areas | Evidence | Only SAMBUT has a complete real-media package with revision and capture qualification. | V2.2 handoff and asset matrix mark the other project visuals as missing, historical-only, or pending capture. | A final homepage cannot substantiate six primary projects with placeholders or Signal Form alone. | Acquire safe real media, preserve originals/crops, and write one `PROVENANCE.md` per project. | Open |
| VQA-09 | P1 | SAMBUT | `110:30` and full-page descendants | Evidence occlusion | Signal Form approaches the top portion of the patient/staff interface treatment. | Visual review shows the art layer close to evidence-bearing controls; a bounds and critical-zone check remains required. | Decorative narrative cannot hide the workflow being used as proof. | Define the question/action region as protected and move/mask the Signal Form outside it. | Open |
| VQA-10 | P1 | Navigation across final widths | Navigation nodes | Navigation | V2.2 visually repeats a header in each chapter instead of clearly representing one persistent adaptive control. | Full-page compositions reintroduce the same header at chapter boundaries. | The design can be misread as separate screens and long labels may compete with Contact/theme controls. | Create one reusable navigation component with chapter-state variants and test six labels at all required widths. | Open |
| VQA-11 | P1 | All final targets | Semantic text nodes | Reflow / accessibility | Fixed-height semantic text boxes have not been stress-tested with extra line height, tracking, word spacing, and wrapping. | V2.2 includes an actual collision caused by text growth; no complete text-spacing simulation is recorded. | The future implementation must survive 320 px reflow, 200% zoom, and user text spacing. | Use Hug/content-driven text groups and run controlled stress variants before approval. | Open |
| VQA-12 | P2 | Dark full homepage | `111:184` | Theme / media | Dark mode was designed before most real project assets existed. | Only SAMBUT media has been evaluated in context; portrait and five project visuals remain absent. | New image colors may weaken caption contrast, portrait separation, and Signal Form hierarchy. | Re-audit the complete dark page after all real media is inserted; do not add blanket glows. | Open |
| VQA-13 | P2 | Full page | Signal Form layers | Motion / occlusion | Transition travel paths have not been revalidated against final media placement. | V2.2 motion was proved before evidence-complete chapter compositions. | A correct static frame can still yield motion that crosses critical UI or creates fatigue over six chapters. | Preserve the proven actor/state system, replot travel around protected media zones, and vary transition energy. | Open |
| VQA-14 | P2 | Project chapters | Source/action nodes | Discoverability | Actions must remain visible beside evidence without being treated as decorative metadata. | Prior V2.2 audit identified possible weak source/case-study paths; final project media may further compete for attention. | Reviewers need a visible path to source, artifact, or the KAIROS/Kalintang case-study routes. | Keep meaningful action labels in semantic groups and test scanning plus collision at every final width. | Open |

## Collision classification protocol

- **Intentional / safe:** art-direction overlap stays outside protected content and improves the composition.
- **Intentional / questionable:** overlap is conceptually motivated but reduces legibility, evidence interpretation, or resilient reflow.
- **Unintentional / fail:** semantic collision, clipping, overflow, control obstruction, or decorative occlusion of a protected evidence zone.

Final approval requires zero unintentional collisions at 1440, 1024, 768, 430, 375, and 320 px. Final results and offending node IDs, if any, will be appended after the V2.3 frames exist.


## V2.3 closure

| ID | Final status | V2.3 evidence |
|---|---|---|
| VQA-01 | Closed | Kalintang semantic content is Auto Layout in `141:69`; title, role, and context no longer intersect. |
| VQA-02 | Closed | Semantic copy uses content-driven inner Auto Layout. Portrait, media, and Signal Form remain separate art-direction layers. |
| VQA-03 | Closed | Desktop chapter heights vary from 960 to 1100px; mobile chapters vary from 850 to 980px. |
| VQA-04 | Closed | Six distinct compositions are visible in `152:188` and `153:201`. |
| VQA-05 | Closed | V2.3 display styles use Sora Light/Regular; higher weight is limited to compact identity or evidence. |
| VQA-06 | Closed | Redundant `PRIMARY PROJECT` eyebrows were removed. Functional `xx / 06` markers remain. |
| VQA-07 | Closed by approved fallback | `147:134` shows the failed alpha matte and selected environmental upper-body crop. Hero proofs: `150:162`, `150:199`, `156:398`, `156:560`, `160:263`. |
| VQA-08 | Closed | All six chapters contain real media. Inventory and provenance are shown in `157:263`. |
| VQA-09 | Closed | SAMBUT Signal Form `142:122` was moved outside both protected terminals; the follow-up bounds audit reports no intersection. |
| VQA-10 | Closed | Component sets `136:100` and `137:86` cover light/dark `00–06`, Contact, and eclipse control `135:14`. |
| VQA-11 | Closed for design | Stress frame `164:272` uses 150% line height and 12% letter spacing. One Kalintang collision was corrected by moving media node `164:315`; the follow-up reports none. Browser zoom remains production QA. |
| VQA-12 | Closed for design | Complete dark pages `153:201` and `160:263` include the portrait and all real project media. |
| VQA-13 | Design closed / runtime pending | Static protected zones pass. Production must validate continuous 3D travel, fatigue, reduced motion, and performance. |
| VQA-14 | Closed | KAIROS and Kalintang expose case-study/source paths; all other chapters expose their artifact or source action beside evidence. |

## Final collision result

- Programmatic checks covered text/text, text/media, Signal Form/media, and Signal Form/text relationships in the final desktop, 1024, 768, 430, 375, and 320 frames.
- Corrected intersections: SAMBUT desktop edge contact, Colors semantic-zone contact, five 768px Signal Form/media contacts, the mobile hero portrait/scope collision, and one 320px text-spacing Kalintang collision.
- Final result: zero unintentional semantic or protected-media collisions at the required widths.
- The hero Signal Form group has a large geometric bounding box that intersects title and portrait bounds. Visual inspection classifies this as intentional/safe: visible segments remain outside the face and readable glyphs, the portrait masks the behind layer, and foreground emergence stays at the outer chair edge.

## Contrast and remaining runtime gates

- Light accent/background: `9.49:1`; light muted/background: `5.17:1`.
- Dark accent/background: `8.53:1`; dark muted/background: `8.42:1`; dark text/background: `16.64:1`.
- Runtime-only gates: keyboard order, visible browser focus, reduced motion, forced colors, persistent WebGL behavior, image loading, and measured mobile performance.
