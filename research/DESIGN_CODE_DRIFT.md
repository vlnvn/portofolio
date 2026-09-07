# Design/code drift

Compared on 7 September 2026 against commit `557b7a9` and the current working tree. This file records differences; it does not revise `DESIGN.md`.

| Area | Design contract | Current slice | Classification | Resolution |
|---|---|---|---|---|
| Desktop project rows and source placement | The grid section names `3/7/2` tracks, while project-specific guidance places source after evidence | Two tracks: `0.72fr / 2.05fr`; source follows evidence | UNRESOLVED DESIGN DECISION | The Figma comparison favors evidence-adjacent source access. Keep this provisional until the proposal is approved. |
| Breakpoints | Two-column rows at `≤900px`; single column at `≤680px` | Opening changes at `820px`; project rows remain two-column until `680px` | INTENTIONAL IMPLEMENTATION REVISION | Browser calibration kept the evidence register compact at tablet widths. Verify again when full project content lands. |
| Name measure | Fluid display size; no fixed wrap is required | `max-width: 8ch` forces a desktop line break | UNRESOLVED DESIGN DECISION | The Figma proposal retains the composed break for desktop review; test a wider measure during implementation. |
| Body sizing | Fluid `1rem–1.125rem` | `17px` desktop and `16px` mobile | INTENTIONAL IMPLEMENTATION REVISION | Fixed values produced stable wraps in the validated slice. |
| Opening spacing | Desktop `48–64px / 64–88px`; mobile bottom `48px` | `54px / 68px`; mobile `32px / 40px` | INTENTIONAL IMPLEMENTATION REVISION | The tighter mobile ending keeps all three index signals in the first viewport. |
| Featured index destination | Index previews featured sections | Colors currently opens the Reel because its section is absent | BUG / DRIFT | The complete proposal links the index to Colors; the Reel stays inside the section. |
| Homepage scope | Full featured and supporting work, contact and footer | Current slice ends after an Ayam Kalintang preview | INTENTIONAL IMPLEMENTATION REVISION | This is the recorded production slice, not final homepage QA. |

No drift was found in the `5/7` opening grid, IBM Plex Sans family, light/dark tokens, project-index geometry, mobile semantic order, focus treatment, reduced-motion handling or theme-control interaction contract.
