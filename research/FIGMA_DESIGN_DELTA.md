# Figma design delta

Status: proposed on 7 September 2026. These differences are not approved production changes until the Figma review is accepted.

| Area | Current `DESIGN.md` | Proposed Figma design |
|---|---|---|
| Tokens | Light and dark color tokens are fixed | No token changes. Figma variables use the exact contract values. |
| Typography | IBM Plex Sans with restrained display and project scales | Same family. Project titles gain slightly stronger size contrast; repeated category eyebrows were removed during distillation. |
| Grid | `5/7` opening and documented `3/7/2` desktop project rows | Opening remains `5/7`. Source access stays inside the evidence column, so featured sections use two reading columns rather than a third source track. |
| Project index | Neutral `10px` surface with ruled rows | Same surface and geometry, plus a single `4px` accent rail. This is the only recurring visual signature. |
| Spacing | Compact scale with `48–64px` opening top and `64–88px` bottom | Desktop opening uses `64px / 80px`. Mobile uses tighter first-screen spacing so the full index remains visible. |
| Depth | No shadow by default; one restrained artifact shadow is allowed | Only the verified Ayam Kalintang image uses a low-spread shadow. |
| KAIROS | Two-column evidence row; real artifact only in production | Two-column evidence row with source directly after the boundary. The internal review frame contains a reduced, labeled pending area that must not ship. |
| Ayam Kalintang | Evidence followed by a real kiosk crop | Header/problem split, then evidence beside the real kiosk menu crop. Its caption states that staff and receipt claims need separate verified captures. |
| The Colors of MIPA | Full featured-row weight, text led | A text-led surface band breaks the software rhythm. The result receives one controlled accent; its contrast and footprint were reduced after critique. |
| Aether3D | Short supporting row before N.A.R.A. | Flat supporting row with the proxy boundary beside the description. No unverified preview or special container remains. |
| N.A.R.A. | Compact supporting row | Flat supporting row with personal role and team-owned recommendation-engine boundary. |
| Mobile | One semantic column; keep identity, scope and complete index in the first viewport | Same order. Redundant About/View work actions and repeated category labels were removed. Work remains in the 320px header. |
| Dark mode | Independently tuned tokens and semantic switch behavior | Same geometry with dark-specific surfaces, rules, media surround and accent. The production switch semantics and persistence remain requirements. |
| Interaction | Underlined descriptive links, visible focus, `44px` controls, brief theme transitions | Project source labels become specific to the destination. Index hover/focus and theme behavior must be verified in production; no new motion is proposed. |

## Review outcome

- Evidence-adjacent source access is recommended over a dedicated narrow source column.
- The index accent rail is retained despite the detector's side-tab warning because it carries navigation and evidence-preview meaning.
- Pale teal warnings in dark mode are treated as detector overcounting; sampled text contrast passed.
- The KAIROS artifact remains the only blocker to treating the proposed hierarchy as final.
- Production must optimize the Ayam Kalintang image and retain native switch state, persistence, focus, and reduced-motion behavior.
