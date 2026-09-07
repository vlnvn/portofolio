# Visual calibration

Status: locked 7 September 2026. This note records the final calibration of Direction B before production work.

## Reference synthesis

The reference review is recorded in `VISUAL_REFERENCE_SYNTHESIS.md`. The transferable principles were quiet navigation, separately tuned light and dark surfaces, concentrated emphasis around real artifacts, and a grid that remains legible when it collapses. Branded gradients, large marketing headings, dense interface chrome, and motion used as decoration were rejected.

An adversarial review found one real risk in Direction B: identical rows could become a polished résumé. The answer is a controlled change in artifact scale and evidence rhythm between projects. Randomized layouts, bento composition, stock imagery, and animation were rejected because they would weaken comparison and trust.

## Calibrations

All three versions used the same copy and content order.

| Calibration | Evidence scan 25% | Credibility 20% | Distinctiveness 20% | Artifact emphasis 15% | Mobile 10% | Restraint 10% | Weighted |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1 — restrained | 9.0 | 8.5 | 6.0 | 6.0 | 8.5 | 9.5 | 7.83 |
| 2 — crafted | 9.0 | 9.0 | 8.0 | 8.0 | 9.0 | 8.5 | **8.58** |
| 3 — expressive | 8.0 | 7.5 | 8.5 | 8.5 | 7.5 | 6.5 | 7.88 |

Calibration 1 scanned well but its thin rules and plain rows felt interchangeable with an editorial résumé. Calibration 3 gave the opening surface too much visual weight and delayed the transition into evidence. Calibration 2 won because its index is a single, quiet authored device while the project rows remain direct.

## Browser findings

- At 1440×900, all required first-view facts were visible. Calibration 2 made the index easiest to parse without turning the opening into a feature panel.
- At 375×812 and 320×800, the complete three-project index remained visible before the KAIROS heading. The role, completed-business context, and community scale did not require paragraph reading.
- The original opening left too much empty space at desktop and delayed the KAIROS artifact. Production reduces its lower spacing by 32–48px.
- The mobile header hid both navigation links. Production keeps `Work` visible and leaves contact access in the footer when space is tight.
- The source action sat too far from the evidence column. Production places it beside the role/evidence group.
- The theme control communicated two modes, but its pointer target was undersized and the active icon was not distinct enough. Production uses a 44px target, compact inner track, active-icon contrast, system preference on first visit, and persisted manual choice.
- The neutral placeholder clarified the intended crop during calibration. Production omits the media block until a real safe capture exists.

## Critique decisions

| Finding | Decision | Reason |
|---|---|---|
| Increase theme-switch target and clarify active state | Accept | Improves touch, keyboard and state recognition without adding decoration |
| Reduce opening slack | Accept | Brings substantive evidence higher in the first viewport |
| Keep one mobile navigation anchor | Accept | Maintains orientation at narrow widths |
| Move source beside evidence | Accept | Connects verification with the claim it supports |
| Remove index surface entirely | Reject | The single quiet surface is the chosen authored device and improves scan grouping |
| Make every project row visually different | Reject | Variation will come from real artifact proportions and content, not arbitrary geometry |
| Add animation, gradients or a bento layout | Reject | These patterns do not improve evidence discovery or trust |
| Replace the temporary media placeholder | Accept | A real capture is required; otherwise the media area is omitted |
