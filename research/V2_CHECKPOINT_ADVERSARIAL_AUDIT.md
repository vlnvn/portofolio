# V2 Checkpoint Adversarial Audit

**Audit date:** 8 September 2026  
**Scope:** V2 art direction checkpoint through KAIROS chapter only  
**Authority:** `EVIDENCE.md` for facts; `PRD_V2_KINETIC_BLUEPRINT.md` for product, visual, motion, and interaction decisions  
**Mutation boundary:** Audit only. No Figma, production, `DESIGN.md`, or project 02–05 changes were made.

## Executive decision

| Gate | Decision | Reason |
|---|---|---|
| Art direction | **CONDITIONAL GO** | The blue identity, hero composition, typography, and evidence-led tone are credible. Signal Form is not yet proven as the distinctive living 3D actor required by the PRD. |
| Extend the system to projects 02–05 | **NO-GO** | Responsive navigation, Signal Form continuity, chapter motion, portrait treatment, and artifact rules remain unresolved system questions. Extending now would multiply ambiguity. |
| Production implementation | **NO-GO** | The checkpoint still has accessibility, navigation, real-asset, motion-control, responsive, and performance-specification blockers. |

**Overall score: 5.5/10.** This is an editorial checkpoint score, not a mathematical average or a production-quality claim.

### Scorecard

| Area | Score /10 | Audit conclusion |
|---|---:|---|
| PRD fidelity | 6.5 | The major ingredients are present, but Signal Form, portrait, adaptive navigation, cinematic depth, and chapter continuity are not yet proven. |
| Art direction | 6.5 | Authored hero and disciplined blue system; KAIROS becomes more conventional. |
| First-view identity | 8.0 | Name, discipline, university, and software/AI scope are quickly legible. |
| Evidence discovery | 7.0 | Role, context, boundary, and source exist, but contribution and artifact arrive late. |
| KAIROS technical credibility | 7.5 | Claims are supported and bounded; the real interface artifact is still absent. |
| Mobile quality | 4.5 | Clear identity, but weak route access, undersized type, delayed evidence, and unresolved narrow/intermediate widths. |
| Accessibility readiness | **3.0** | Small type, light-blue contrast, theme-control specification, and continuous-motion control require revision. |
| Motion coherence | **3.5** | Storyboard intent is clear; scroll ownership, reverse behavior, idle behavior, and failure states are not. |
| Performance feasibility | 5.0 | A feasible hybrid exists, but no measured budget or degraded-mode contract is attached to the current proposal. |
| Signal Form specificity | **3.0** | It currently reads partly as an ascending technical network or diagram instead of one identifiable spatial actor. |
| Originality | 5.5 | The hero feels authored; the motif and chapter template could still fit many AI/software portfolios. |
| Long-term portfolio value | 6.5 | The evidence-first content can age well once the kinetic system stops competing with discovery. |

The three lowest scores are Signal Form specificity (3.0), accessibility readiness (3.0), and motion coherence (3.5).

## Strong aspects to protect

- The hero names Valensius plainly and establishes Informatics Engineering, Universitas Padjadjaran, and software/AI scope without slogan copy.
- Dusty/slate blue gives the work a coherent identity without imitating Anthropic or falling into neon developer styling.
- Sora and Manrope create useful contrast while keeping the page readable and technical.
- The KAIROS chapter states Team Lead, competition context, the human decision boundary, and team-built MVP status without inflating deployment or autonomy.
- Light and dark palettes are independently tuned; dark mode is calm and readable rather than a simple inversion.
- The evidence structure can support a strong portfolio once real artifacts and route access move closer to the claims.

## PRD conformance

| Frozen requirement | Status | Evidence and implication |
|---|---|---|
| Portrait remains part of the system | **Present as an allowed placeholder; unproven as an asset** | The composition reserves the role, but crop, consent, resolution, light/dark treatment, and mobile behavior cannot be audited until the real portrait exists. |
| Signal Form is a living 3D actor | **Not yet proven** | Current frames show related blue node/ribbon drawings, but they do not establish depth, stable parts, or continuous morph identity. |
| Asymmetric collage and high visual variance | **Partly met** | The hero is asymmetric. KAIROS returns to a comparatively conventional evidence document with a late artifact. |
| Chapter-based scrollytelling | **Specified, not demonstrated** | The storyboard supplies endpoints; it does not resolve continuous progress, reverse scroll, skipped chapters, restoration, or layout change. |
| Adaptive navigation | **Desktop partial; mobile fails checkpoint** | Mobile chapter navigation shows `VA`, `01 / KAIROS`, progress, and theme glyph but no visible Contact or route/menu path. |
| Dusty/slate-blue identity | **Met** | The palette is controlled and distinctive enough to continue. |
| Cinematic dark mode | **Partly met** | Color hierarchy works, but material depth and spatial lighting are not demonstrated by the flat Signal Form. |
| Equal homepage dignity for five projects | **Not testable yet** | Only the hero and first chapter are developed. The system must be resolved before extending to projects 02–05. |

No frozen PRD requirement is changed by this audit.
## Finding registry

### P0 — critical

**None confirmed.** The audit found no fabricated claim, ownership breach, destructive accessibility defect, or PRD contradiction severe enough to invalidate the entire direction immediately.

### P1 — must resolve before the stated gate

| ID | Class | Scope | Finding | Blocks |
|---|---|---|---|---|
| V2-01 | Visual | System | Signal Form reads as a generic connected-node/vector diagram and can imply an ascending chart. Its identity as one living spatial actor is not visually established. | Art acceptance, extension, production |
| V2-02 | 3D | System | Hero, KAIROS, and storyboard states do not show stable part correspondence or a credible continuous morph. Node counts, planes, and silhouette logic change without an implementation grammar. | Art acceptance, extension, production |
| V2-03 | Visual | System | KAIROS reads primarily as polished documentation. The real product artifact is a shallow placeholder near the end, so technical evidence leads less strongly than the PRD intends. | Art acceptance, extension, production |
| V2-04 | Accessibility | System | Light-mode blue `#2F74E8` measures about **4.05:1** on `#F3F6FB` and about **3.70:1** on `#E6ECF6`. It cannot be used for normal-size text at those pairings without adjustment. | Extension, production |
| V2-05 | Responsive/accessibility | System | Public mobile frames use roughly 9–13px metadata, 11–12px explanatory copy, and a 14px scope line. These violate the project floors of 14px metadata and 16px body copy and weaken legibility. | Extension, production |
| V2-06 | UX | System | Mobile chapter navigation omits a visible Contact path and offers no demonstrated route/menu replacement. This breaks the PRD expectation that contact and route access remain persistent. | Extension, production |
| V2-07 | UX | Local | KAIROS has a GitHub source link but no visible route into the required future `/work/kairos` case study. | Production |
| V2-08 | Asset | System | The real portrait is absent. The placeholder is permitted, but crop, consent, resolution, theme treatment, art direction, and small-screen legibility remain high-risk unknowns. | Extension, production |
| V2-09 | Asset/evidence | System | The real KAIROS review interface is absent. The current approximately 926×250 placeholder is too shallow to prove queue, cutoff, and human-review context reliably. | Art acceptance, extension, production |
| V2-10 | Motion | System | The motion spec mixes threshold-timed transitions with scroll-led chapters and leaves reverse scroll, rapid skipping, restoration, resize, orientation changes, and dynamic media-height behavior undefined. | Extension, production |
| V2-11 | Accessibility/motion | System | A 6–10 second ambient breathing loop can continue beside reading content without a demonstrated finite duration or pause/stop/hide control. `prefers-reduced-motion` alone does not cover default users under WCAG 2.2.2. | Production |
| V2-12 | Responsive | System | No resolved 320px, tablet, or intermediate desktop behavior exists. Fixed-position pressure is already visible, and longer future chapter names will not fit the current mobile label geometry. | Extension, production |
| V2-13 | Interaction/accessibility | System | The public theme control is a 24×24 `◐` text glyph, visually different from the designed aperture device. No 44px project target, focus state, semantic state, or stable accessible-label behavior is demonstrated. | Extension, production |
| V2-14 | Performance | System | The kinetic layer has no measured byte/draw-call/frame-time budget, idle-render policy, context-loss behavior, or poster/degraded-mode acceptance criteria. | Production |

### P2 — important refinement

| ID | Class | Scope | Finding |
|---|---|---|---|
| V2-15 | Tooling/handoff | Local | Review notes say dashed connectors were reduced and a depth shadow was added, but inspected Signal Form layers have full-opacity dashed connectors and no effects. The note does not match the actual layer state. |
| V2-16 | Visual craft | Local | The KAIROS contribution separator intersects or cuts through the contribution-title text box. |
| V2-17 | Content | Local | Internal source-placement rationale appears inside the public KAIROS proposal, and it describes an evidence-adjacent source although the source sits in a separate lower column. |
| V2-18 | Content/evidence | Local | Personal-contribution copy is accurate but underuses supported KAIROS evidence for validation and reproducibility work. Any expansion must stay within `EVIDENCE.md`. |
| V2-19 | Technical semantics | Local | “CatBoost ranking” is acceptable approved shorthand, but the implementation uses classifier scores to order cases rather than a proven learning-to-rank objective. The ascending motif increases the chance of a chart interpretation. |
| V2-20 | UX | System | The source link arrives late in both desktop and mobile scans, increasing recruiter friction even when paragraphs are skipped. |
| V2-21 | Visual | System | Dark colors are independently tuned, but cinematic material depth remains partial because the actor is still rendered mainly as flat vectors. |
| V2-22 | Figma implementation | System | Public frames contain no auto-layout containers, text styles, variable bindings, instances, or prototype reactions. This is a design-to-production translation risk, not proof that the final site will be unresponsive. |
| V2-23 | Repository handoff | Local | Current V2 authority and supporting design documents remain untracked. Preserve this audit before any cleanup; do not infer that those documents are committed. |
| V2-25 | Performance/motion | System | Continuous ambient breathing conflicts with a true demand-render strategy unless it stops after a bounded interval or switches to a low-cost mechanism. |
| V2-26 | Visual hierarchy | System | Blue is used across labels, links, rules, and nodes, flattening the distinction between interaction, evidence emphasis, and decoration. |

### P3 — minor

- **V2-24:** The review frame says “two tests” while presenting three review columns. Correct the documentation when design work resumes.

## Provisional findings: confirmation and reclassification

| Provisional finding | Final disposition | Reason |
|---|---|---|
| Contact may be missing from mobile chapter navigation | **Confirmed — P1, V2-06** | Neither a Contact action nor an alternative route/menu control is visible in the inspected mobile chapter frame. |
| KAIROS may lack a visible path to its future case-study route | **Confirmed — P1, V2-07** | GitHub is available, but no visible “Read case study” or equivalent route action exists. |
| Signal Form reads partly as a vector/technical diagram | **Confirmed — P1, V2-01/V2-02** | Flat dashed connectors, changing node grammar, and insufficient spatial evidence prevent a convincing persistent-actor reading. |
| Light-mode small blue text is around 4.05:1 | **Confirmed — P1, V2-04** | The measured pairing fails the 4.5:1 requirement for normal text. It remains valid for large text or meaningful non-text graphics at 3:1. |
| Review notes may differ from layer state on shadow/dash reduction | **Confirmed — P2, V2-15** | Inspected actor nodes have no effects and inspected dashed vectors remain opacity 1. This is a handoff discrepancy, not proof of design misconduct. |
| “CatBoost ranking” may be an overclaim | **Reclassified — P2 precision issue** | The phrase is approved shorthand and does not create a false result claim. Later copy should make clear that classifier scores order review cases, not imply a learning-to-rank objective. |
| The 24×24 theme glyph automatically fails WCAG AA target size | **Withdrawn as stated; retained as P1 project-contract issue** | WCAG 2.5.8 AA sets a 24 CSS px minimum with exceptions; the project itself requires a 44px target. Missing focus, state, semantics, and faithful aperture treatment remain unresolved. |
| Missing portrait contradicts the PRD | **Withdrawn** | The PRD permits a placeholder at this checkpoint. The real asset remains a high-risk P1 dependency before extension or production. |
| Rounded internal review/storyboard cards are public bento/template slop | **Withdrawn** | These are documentation devices in internal frames, not the public homepage composition. |
| Dark mode is merely an inversion | **Withdrawn** | The dark tokens are independently tuned and pass the measured text contrasts. Material/spatial depth remains a P2 issue. |
| Lack of Figma auto layout proves responsive failure | **Reclassified — P2 handoff risk** | It makes translation harder but does not itself prove the implemented page will fail. Separate fixed-geometry evidence supports the P1 responsive finding. |

## Cross-pass verdicts

### Signal Form

**Verdict: reject the current checkpoint execution; retain the underlying product requirement.**

The form supplies a consistent color and connected-node vocabulary, but it is not yet recognizable as one object moving through different states. Hero and KAIROS frames use roughly five nodes, while storyboard states use four or five; planes appear and disappear; and there is no stable mapping from one node, ribbon segment, or plane to its next state. The flat dashed-line construction reads as a network diagram, workflow, or rising chart before it reads as a spatial character.

Acceptance evidence for the next checkpoint must show the same persistent parts at hero, KAIROS, and at least one later chapter state, including intermediate 25%, 50%, and 75% progress and reverse motion. Depth must be visible through perspective, occlusion, material response, and controlled lighting rather than a drop shadow documented only in review notes.

### Portrait risk

**Risk: high; permitted at this checkpoint, blocking before system extension.**

The reserved portrait role is compositionally sound, but the actual image can change the visual center of gravity, contrast with Signal Form, crop under mobile headings, and alter both theme modes. Before extension, audit the real asset for consent, source resolution, neutral color treatment, light/dark compatibility, focal crop at 375 and 320px, and alternate text intent. Do not use an AI-generated stand-in as approval evidence.

### KAIROS chapter

**Verdict: factually credible, visually incomplete, and not yet a passing flagship chapter.**

The chapter accurately exposes Team Lead, COMPFEST 18 context, CatBoost/public LaDe context, personal validation and reproducibility work, the human decision boundary, and the team-built local MVP boundary. It does not fabricate production deployment, autonomy, users, or competition placement.

The sequence behaves like a clean technical brief. The contribution proof, source, and artifact are too late; the placeholder is too shallow to demonstrate the operational review surface; and the case-study route is absent. The eventual artifact should be a real local replay of the review UI at a recorded commit, showing capacity, queue context, ordered cases, selected/review cutoff, and the human decision boundary. If a canonical fixture is used, label values such as 134 target tasks and 14 selected at a 10% review budget as demo/replay data, never users or live deliveries. Preserve native interface colors inside a neutral frame and record commit, fixture, capture date, and local-run provenance.

### Motion and scroll

**Verdict: conceptually promising, operationally underspecified.**

Use a hybrid model: scroll-linked actor and progress over explicit chapter ranges; normal-flow, static DOM content; threshold-updated chapter labels with hysteresis. Avoid replaying fixed-duration sequences every time a threshold is crossed.

The next specification must define reverse motion, rapid multi-chapter skips, browser history/scroll restoration, page reload at a deep chapter, resize and orientation changes, content/media height changes, background-tab return, keyboard focus movement, and a live change to reduced-motion preference. Reduced motion should present deterministic chapter poster states without transition. Any ambient loop that exceeds five seconds while other content is readable needs a finite stop or pause/stop/hide mechanism.

### Recommended 3D architecture

Use one persistent assembly rather than unrelated scene swaps:

- A procedural ribbon backbone generated from a stable curve.
- Persistent planes with chapter-specific transforms.
- Stable node identities attached to normalized positions on the backbone.
- One normalized state per chapter, interpolating control points, tangents, width, twist, transforms, material values, and node positions.
- Morph targets only where meshes retain compatible topology; do not force morph targets across incompatible silhouettes.
- Instancing only if repeated geometry grows enough to justify it; five nodes alone do not.
- One active canvas, with DOM content remaining semantic and independent.
- A deterministic poster for reduced motion, unsupported WebGL2, context loss, initialization failure, and sustained poor performance.
- Bounded retries and explicit resource disposal on teardown or scene replacement.

This recommendation is feasible with React Three Fiber/Three.js, but it is an audit recommendation rather than authorization to implement.

### Mobile

**Verdict: no-go for system extension.**

The mobile hero preserves name, discipline, scope, and the main visual idea within the first viewport. The chapter view then loses persistent Contact/route access, compresses metadata below the project’s legibility floor, gives a large vertical interval to Signal Form before personal contribution, and leaves no visible case-study entry. At 320px, the current fixed name/theme geometry would collide or overflow if reused unchanged. At intermediate widths, the desktop absolute composition has no documented transformation.

Future labels such as “02 / AYAM KALINTANG” and “03 / THE COLORS OF MIPA” will not fit the current approximately 110px chapter-label region. Resolve label behavior, navigation access, type floors, artifact order, and 320/768/1024 transformations before applying the pattern to more projects.

### Accessibility readiness

**Verdict: 3.0/10; no-go for production.**

Measured contrast:

| Pair | Ratio | Result |
|---|---:|---|
| Light primary #0A1730 on #F3F6FB | 16.45:1 | Pass |
| Light muted #56657D on #F3F6FB | 5.46:1 | Pass normal text |
| Light blue #2F74E8 on #F3F6FB | 4.05:1 | Fail normal text; pass large/non-text |
| Light blue #2F74E8 on #E6ECF6 | 3.70:1 | Fail normal text |
| Dark primary on dark background | 17.10:1 | Pass |
| Dark muted on dark background | 7.66:1 | Pass |
| Dark blue on dark background | 7.84:1 | Pass |
| Dark blue on dark surface | 7.05:1 | Pass |
| Dark muted on dark surface | 6.89:1 | Pass |

Decorative rules have low contrast and may remain decorative. Any rule used as a state or control indicator must reach 3:1. Raise mobile copy to the project floors, provide a real 44px theme-control target and visible focus, and use stable accessible naming while exposing state. Reconcile the project instruction that suggests changing the accessible label with the ARIA switch convention that keeps the label stable while state changes.

The DOM must retain normal semantic order independent of the canvas. The real artifact needs useful alternate text and a full-size access path when a mobile crop cannot preserve its evidence. Motion controls and reduced-motion posters must work without requiring WebGL.

### Performance feasibility

**Verdict: feasible with constraints; not yet approved.**

A single lazy persistent scene, simple geometry, stable object reuse, reduced device-pixel ratio, no initial bloom or transmission, and a poster fallback can fit this portfolio. The current proposal supplies no measurements, so the following are planning caps to validate rather than claims:

| Budget area | Preliminary cap |
|---|---:|
| Core HTML/CSS/Next/React and page JavaScript | 300 KB |
| Lazy Three.js/R3F opening cost | 250 KB |
| Fonts | 100 KB |
| Portrait | 300 KB |
| Geometry and chapter-state data | 80 KB |
| Textures/environment | 150 KB |
| Signal Form poster | 120 KB |
| Motion layer | 40 KB |
| First project preview | 250 KB |
| Other critical assets | 60 KB |
| **Total first experience** | **1.65 MB** |

The PRD permits a larger earned experience, but the older constraint of 1 MB total and 200 KB JavaScript must be explicitly reconciled before implementation. Test on an integrated-GPU Windows laptop and a mid-range Android device. Define frame-time acceptance, sustained sub-30fps fallback, maximum draw calls (start near 30), DPR range (start near 1–1.5), canvas visibility suspension, idle behavior, WebGL2 absence, context loss, and initialization failure. A demand renderer does not save work while a perpetual breathing loop is active.

### Extension pressure test: projects 02–05

The system has theoretical range but the current checkpoint has not demonstrated it:

- **Ayam Kalintang:** a modular, tactile workflow can foreground the real kiosk/admin/receipt artifact. Avoid implying live payments or repeating the KAIROS evidence-column template.
- **The Colors of MIPA:** a distributed form can support the 9-program/30+ coordination evidence and Reel artifact. Node counts must not falsely encode the figures; avoid a KPI dashboard.
- **Aether3D:** an explicit wireframe state can create range. The browser preview must remain labeled as a proxy and never imply it is the executed Blender result.
- **N.A.R.A.:** connected planes may suit its interface contribution. Preserve the team boundary around the recommendation engine and avoid medical or performance claims.

Equal dignity means equal chapter status, evidence access, and artifact consideration. It does not require identical page height, identical geometry, or five repeated cards. Extending before the actor and chapter grammar are solved would lock in repetition.

### Originality and reference independence

There is no evidence of copying a specific reference. The hero is the most authored part; without the name and institution, the current connected-node motif could still belong to many software/AI student portfolios. KAIROS falls toward a conventional documentation template, and the storyboard promises more variation than the current frames prove.

The approved blue palette, 3D premise, type pairing, overlap, and chapter structure must not be penalized merely for being frozen user decisions. Sora/Manrope is defensible. Internal rounded review cards are not public bento design. The reference synthesis can later improve traceability for Daniel Sun, Stripe, Figma, Robin, and Karina, but no new inspiration crawl is needed.

### Typography feasibility

Sora and Manrope are licensed under the SIL Open Font License and both provide variable weight axes suitable for the proposed hierarchy. Keep the pairing. Do not assume optical-size behavior because the inspected metadata does not expose an optical-size axis.

Before production approval, test Sora Light/300 on low-DPI Windows rendering, fallback-metric shifts, numerals, punctuation, long Indonesian project names, and 320px wrapping. A combined Latin font allowance of roughly 60–100 KB is a planning estimate, not a measured result.

### Recruiter scan

At the desktop first view, a reviewer can identify Valensius, Informatics Engineering at Universitas Padjadjaran, software/AI scope, and the distinctive blue form. KAIROS and Team Lead are near the transition and may be remembered depending on the exact viewport. On mobile, the name is stronger than the technical scope.

Within a short scan, the KAIROS role, competition context, and human-review boundary become discoverable. Personal reliability work, the source link, and artifact evidence require deeper scrolling. The missing case-study action and missing mobile Contact path are concrete navigation failures, not hypothetical user-study results.

## Verification required at the next checkpoint

The following evidence is required before changing either no-go:

1. Signal Form state sheet showing stable parts at hero, KAIROS, one later chapter, intermediate morph states, and reverse progression.
2. Real portrait in light/dark desktop and 375/320 mobile crops.
3. Real KAIROS local-replay artifact with provenance and a readable mobile treatment.
4. Mobile and intermediate navigation frames preserving Work/case-study and Contact access.
5. Corrected body/metadata sizes and re-measured contrast for every blue text role.
6. A defined theme control with 44px project target, visible focus, stable label, and exposed state.
7. A scroll state diagram covering forward, reverse, rapid skips, restoration, resize, reduced motion, and background return.
8. A performance prototype with recorded transfer size, draw calls, frame timing, fallback trigger, idle behavior, and WebGL failure behavior.
9. A finite ambient-motion or pause/stop/hide rule.
10. A handoff check proving review annotations match the actual Figma layers.

## Impeccable review and update recommendation

The current installed Impeccable skill reports version 4.2.1. The latest inspected skill release is 4.2.2. The update mainly adds a DeepSeek harness and strengthens local launcher/decision-page guidance, including disclosure and reference-based fallback when a launcher cannot run. It does not appear to change the substantive visual standard used in this audit.

**Recommendation: update Impeccable before the next design stage, after this report is preserved.** Do not update during this audit. Re-run critique only on the revised checkpoint; repeating it on unchanged frames would add no evidence.

## Evidence basis and limits

This audit combines direct inspection of the current Figma checkpoint, measured design tokens and geometry, the factual boundaries in EVIDENCE.md, the frozen contract in PRD_V2_KINETIC_BLUEPRINT.md, the existing V2 reference/art/motion documents, and independent creative-director, recruiter, technical-recruiter, frontend/3D, and originality passes.

Accessibility conclusions use WCAG 2.2 contrast, reflow, focus, target-size, and motion criteria. Technical architecture conclusions use current Three.js, React Three Fiber, Motion, and WebGL context-loss/disposal guidance already gathered for this audit. No user-study timing claim, browser implementation result, real-device frame rate, bundle measurement, or final portfolio QA is asserted.

## Final gate recommendation

Preserve the art direction: dusty/slate blue, asymmetric hero, Sora/Manrope, evidence-first factual copy, chapter structure, portrait role, and the requirement for one persistent Signal Form. Do not extend the current visual execution to projects 02–05 and do not enter production.

The next checkpoint should revise only the system questions that block honest reuse: persistent actor grammar, real portrait and KAIROS artifact, responsive/adaptive navigation, readable mobile type, light-mode blue roles, scroll/reduced-motion behavior, and measurable performance/fallback rules. This audit does not authorize those revisions; it records the acceptance evidence they must provide.

## Sources consulted during the audit

- [WCAG 2.2 — Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [WCAG 2.2 — Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [WCAG 2.2 — Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- [WCAG 2.2 — Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- [WCAG 2.2 — Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)
- [Three.js Curve](https://threejs.org/docs/pages/Curve.html)
- [Three.js BufferGeometry](https://threejs.org/docs/pages/BufferGeometry.html)
- [Three.js InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)
- [Three.js cleanup guidance](https://threejs.org/manual/en/how-to-dispose-of-objects.html)
- [React Three Fiber performance scaling](https://raw.githubusercontent.com/pmndrs/react-three-fiber/master/docs/advanced/scaling-performance.mdx)
- [MDN WEBGL_lose_context](https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_lose_context)
- [Motion bundle-size guidance](https://motion.dev/docs/react-reduce-bundle-size)
- [Google Fonts Sora metadata](https://raw.githubusercontent.com/google/fonts/main/ofl/sora/METADATA.pb)
- [Google Fonts Manrope metadata](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/METADATA.pb)

