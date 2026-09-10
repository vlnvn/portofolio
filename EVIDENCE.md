# Portfolio evidence ledger

Research date: 6 September 2026. Subject: Valensius Alven, Informatics Engineering, Universitas Padjadjaran.

This is an internal claim ledger, not homepage copy. Research and evidence come before the specification, visual concepts, or implementation. No homepage has been written.

## Rules for using this ledger

- Priority: explicit user facts → source code/git history → grounded project documentation → resume → authoritative external sources → inference.
- **High / user** means explicitly confirmed by Valensius. It does not mean independently verified by a third party.
- **High / source** means directly supported by inspected implementation or artifact. Runtime and deployment claims require additional evidence.
- **Medium / recorded** means documented results or attribution that were not independently reproduced, or whose provenance needs qualification.
- Ownership is **mine**, **shared/team**, or **unclear**. An authored commit, imported file, or merged PR alone does not establish exclusive ownership.
- **Publish** permits a factual statement within the recorded boundary. **Qualify** requires the qualifier in the same passage. **Hold** excludes the claim until resolved. **Omit** means the claim adds little or is contradicted.
- Project test counts and metrics are evidence about those projects, never about the new portfolio's QA.
- Repository terminology such as “production V1” identifies a frozen artifact; it does not establish a production deployment.

## Inspected snapshots

| Repository | Default branch | Inspected commit | Scope |
|---|---|---|---|
| [vlnvn/kairos-ai](https://github.com/vlnvn/kairos-ai) | develop | `c10670180ca56ce1a9c21f766d6e854c3b46b866` | Source, tests, cards, evaluation artifacts, release scripts, Docker/CI, git history, PRs 1–11, latest CI status |
| [Faruuuqqq/project-bca](https://github.com/Faruuuqqq/project-bca) | main | `a9301ce5872c3d9bb70334be30134fb8e09b42d4` | Kiosk/admin structure, order/payment implementation, Midtrans adapter/webhook, migrations, printing/UAT history, test scripts, deployment docs, existing screenshot |
| [ZeitakuXIV/nara-ai](https://github.com/ZeitakuXIV/nara-ai) | development | `a8e80745d2520274c7bd386bdc551e904d2b6f62` | Team attribution, recommendation adapter, frontend/integration history, project structure, dependencies, documentation, existing debug screenshot |
| [vlnvn/aether3d](https://github.com/vlnvn/aether3d) | main | `1b3ace2c3f0c76feaf274f20dd3bcd4b429e7c6d` | Generation action, preview renderer, dependency manifest, Docker/Cloud Build configuration presence, git history, README conflicts |
| [vlnvn/color-picker](https://github.com/vlnvn/color-picker) | main | Source blob `35383c3bb4b04a3764f2cfce85472ccb36693287` | Repository contents and complete `color-picker.py` read through GitHub |

Source references below use the pinned commits above wherever possible. Local review material is excluded from portfolio version control.

## Personal context

| ID | Claim | Source | Confidence | Personal ownership | Decision / boundary |
|---|---|---|---|---|---|
| P1 | Name: Valensius Alven | User brief, heading | High / user | mine | Publish |
| P2 | Informatics Engineering student at Universitas Padjadjaran | User brief, heading and hero context | High / user | mine | Publish; do not infer GPA, graduation date, honors, or scholarship status |
| P3 | GitHub profile is `vlnvn` | User-supplied repositories; authored PRs and public repository profile | High / source + user | mine | Publish [GitHub](https://github.com/vlnvn) |
| P4 | Public email: alvenvalensius93@gmail.com; LinkedIn: https://linkedin.com/in/valensiusalven | User follow-up, 6 September 2026 | High / user | mine | Publish these exact contact destinations; LinkedIn content could not be fetched, so no profile-content claims inferred |
| P6 | Approved resume and canonical site domain | Not supplied | Unverified | unclear | Hold these assets; do not invent a resume file or domain |
| P5 | Prior Claude/API experience, ambassador selection, or club leadership | Not confirmed | Unverified | unclear | Omit; applying does not imply affiliation or selection |

## KAIROS — primary AI case study

| ID | Claim | Source | Confidence | Personal ownership | Decision / boundary |
|---|---|---|---|---|---|
| K1 | Team Lead for KAIROS, COMPFEST 18 AI Innovation Challenge, 2026 | User brief §6A | High / user | mine | Publish; no placement or award claim |
| K2 | Dispatcher decision-support for capacity-constrained pickup-promise review | User brief; [engine](https://github.com/vlnvn/kairos-ai/blob/c10670180ca56ce1a9c21f766d6e854c3b46b866/src/kairos_ai/engine.py); [README](https://github.com/vlnvn/kairos-ai/blob/c10670180ca56ce1a9c21f766d6e854c3b46b866/README.md) | High / source + user | shared/team | Publish |
| K3 | Human dispatcher retains all operational decisions | User brief; [model card](https://github.com/vlnvn/kairos-ai/blob/c10670180ca56ce1a9c21f766d6e854c3b46b866/MODEL_CARD.md); engine output only ranks/marks queue decisions | High / source + user | shared/team | Publish beside product explanation |
| K4 | Frozen CatBoost classifier with 21 decision-time features | Engine feature schema/model loader; [release manifest](https://github.com/vlnvn/kairos-ai/blob/c10670180ca56ce1a9c21f766d6e854c3b46b866/artifacts/ai_release_manifest.json) | High / source | shared/team | Publish; dependency and artifact inspected, inference not rerun locally |
| K5 | Ranking sorts by model score descending, then task ID; capacity changes the cutoff | `engine.py` lines 297–319; [robustness tests](https://github.com/vlnvn/kairos-ai/blob/c10670180ca56ce1a9c21f766d6e854c3b46b866/tests/test_engine_robustness.py) | High / source | shared/team | Publish as implemented behavior; avoid absolute correctness guarantees |
| K6 | Unknown fields, outcome fields, invalid numeric/geospatial inputs and model/schema corruption have rejection checks | Engine validation; tests; [AI reliability PR #4](https://github.com/vlnvn/kairos-ai/pull/4); inspected diff `e9fd5c6` | High / source | mine | Publish personal contribution as hardening inference validation and adding invariant tests, not authorship of every project layer |
| K7 | Valensius finalized AI evidence, cards, release verification and fixed-recipe reproducibility work | [PR #3](https://github.com/vlnvn/kairos-ai/pull/3), [PR #5](https://github.com/vlnvn/kairos-ai/pull/5); branches `docs/alven-ai-evidence-readiness`, `chore/alven-ai-release-closure`; commits `763cc9c`, `13b1978`, `ff25d49`, `e20eb39` | High / source attribution | mine | Publish these bounded contributions |
| K8 | Public LaDe-P pickup data is the documented research source | [Data card](https://github.com/vlnvn/kairos-ai/blob/c10670180ca56ce1a9c21f766d6e854c3b46b866/DATA_CARD.md), [dataset manifest](https://github.com/vlnvn/kairos-ai/blob/c10670180ca56ce1a9c21f766d6e854c3b46b866/research/v2_closure/dataset_manifest.json), closure script | High for documented provenance | shared/team | Publish “evaluated on public LaDe pickup data”; raw corpus not downloaded or independently audited here |
| K9 | Canonical fixture has 134 target tasks; 10% cutoff selects 14 | [Fixture](https://github.com/vlnvn/kairos-ai/blob/c10670180ca56ce1a9c21f766d6e854c3b46b866/examples/input_snapshot.json); capacity formula; fixture checked locally | High / source | shared/team | Qualify as replay/demo fixture; never 134 users or live customer deliveries |
| K10 | V2 fixed-recipe CatBoost reproduction recorded Recall@10 of 0.2158666 versus 0.1718439 for logistic regression | [Final results](https://github.com/vlnvn/kairos-ai/blob/c10670180ca56ce1a9c21f766d6e854c3b46b866/research/v2_closure/final_results.json); [reproduction report](https://github.com/vlnvn/kairos-ai/blob/c10670180ca56ce1a9c21f766d6e854c3b46b866/research/v2_closure/V2_REPRODUCIBILITY_REPORT.md) | Medium / recorded | shared/team; mine for recorded closure contribution | Qualify as repository-recorded offline V2 reproduction: +4.40 percentage points, not a gain achieved by the frozen V1 binary or in operations |
| K11 | V2 final split contains 1,009,739 tasks, dated 5–31 October 2022 | Final results and reproduction report | Medium / recorded | shared/team | Optional case-study detail; never users, customers, or tasks handled live |
| K12 | V2 chronological evaluation and preregistration artifacts exist; fresh recipes fitted on TRAIN plus VALIDATION for FINAL | `PREREGISTRATION.json`, `run_closure.py`, final results and reproduction report | High for artifact presence; medium for recorded execution | mine for closure; shared/team for broader research | Publish bounded process; full raw-data reproduction not performed here |
| K13 | Frozen V1 evidence records +5.23 pp aggregate Recall@10 versus logistic across four independent city holdouts | [Final lock evidence](https://github.com/vlnvn/kairos-ai/blob/c10670180ca56ce1a9c21f766d6e854c3b46b866/artifacts/final_lock_evidence.json); model card | Medium / recorded | shared/team | Prefer omitting from homepage to avoid mixing V1 and V2; if used, preserve historical V1/offline qualifier |
| K14 | Artifact hash matches the frozen release identity | Local SHA-256 on `artifacts/kairos_final.cbm` matched `b3d8f13e73d0faee1389b1a51d3db581403502d8ce85c6fca45bd6688505c315` | High / independently checked artifact | shared/team | Useful reproducibility evidence; do not display a giant hash as decoration |
| K15 | Exact inspected commit has a successful GitHub Actions Release quality run | [Run 32824788107](https://github.com/vlnvn/kairos-ai/actions/runs/32824788107), commit `c106701…`; [workflow](https://github.com/vlnvn/kairos-ai/blob/c10670180ca56ce1a9c21f766d6e854c3b46b866/.github/workflows/release-quality.yml) | High / observed CI status | shared/team | Publish as successful CI at this revision, not a fresh local test run |
| K16 | Current source contains 51 unit-test methods; PR #11 reports 51 passing | Tests and [PR #11](https://github.com/vlnvn/kairos-ai/pull/11) | High for source count; recorded for PR count | shared/team | Optional; release manifest's older 29-test figure describes earlier AI closure, not current whole-project count |
| K17 | Valensius personally built the entire frontend, backend, platform and original model | Initial vertical slice authored `KAIROS Team`; [PR #6](https://github.com/vlnvn/kairos-ai/pull/6) branch names Adriel, [#7](https://github.com/vlnvn/kairos-ai/pull/7) and [#10](https://github.com/vlnvn/kairos-ai/pull/10) name Daniel, [#8](https://github.com/vlnvn/kairos-ai/pull/8) names Eze, even though PR account is `vlnvn` | Insufficient for exclusive attribution | unclear | Omit; team product + bounded personal AI reliability/reproducibility ownership is supported |
| K18 | Live deployment, Indonesian validation, improved deliveries/costs, calibrated probability, autonomous dispatch, route optimization, competition award | Explicitly disclaimed or absent in user brief/cards/claims register | Unsupported or contradicted | unclear | Omit |

Recall@10 here means recall among off-window pickups when reviewing approximately the top 10% within defined groups. It is not “90% accuracy.” Group rounding means the reviewed count need not equal exactly 10% globally. The target combines early and late pickups and is early-heavy. Intervention benefit has not been measured.

## Ayam Kalintang — real small-business engineering case study

| ID | Claim | Source | Confidence | Personal ownership | Decision / boundary |
|---|---|---|---|---|---|
| B1 | Built for a real local culinary MSME in the Bakti BCA project, Jan–Jul 2026 | User brief §6B | High / user | shared/team | Publish client context and timeline; do not infer customer counts or business improvement |
| B2 | Full-Stack Engineer and Deputy Team Lead | User brief §6B; substantial authored implementation history corroborates engineering role | High / user | mine | Publish exact roles |
| B3 | Customer kiosk plus staff tools for menu, order, inventory and payment workflows | `src/app/(kiosk)`, `src/components/kiosk`, `src/components/admin`, `src/actions` | High / source | shared/team | Publish the implemented scope |
| B4 | Next.js 16.2.4, React 19.2.4, Supabase and Zustand are in the current app | [package.json](https://github.com/Faruuuqqq/project-bca/blob/a9301ce5872c3d9bb70334be30134fb8e09b42d4/package.json), order/payment code | High / source | shared/team | Use only where relevant to an engineering decision; not a technology wall |
| B5 | Valensius worked on kiosk/admin implementation and menu customization | Commits `a697ea8`, `4846343`, `1e5470a`, `bbeac1d`, `3b0483d`; current components | High / source attribution | mine | Publish contribution, not exclusive authorship of team system |
| B6 | Valensius implemented revisions for user acceptance: serving options, menu ordering, optional order name and local-time receipt printing | [Commit 325608a](https://github.com/Faruuuqqq/project-bca/commit/325608a1461f5a30fb980281a647af0cf170d148), inspected diff; `edfb64c` | High / source attribution | mine | Publish as response to user-acceptance feedback; commits do not prove every acceptance criterion was signed off |
| B7 | Valensius worked on RawBT receipt printing and repeated-payment/printing paths | Commits `6e166cd`, `655eb06`, `1ada59a`; `src/lib/printer.ts`, `src/lib/rawbt-client.ts`, kiosk payment screens | High / source attribution | mine | Publish integration work; don't claim guaranteed silent printing across devices |
| B8 | Orders perform server-side menu/stock lookup and price calculation; atomic RPC migration and a compatibility fallback exist | [order.ts](https://github.com/Faruuuqqq/project-bca/blob/a9301ce5872c3d9bb70334be30134fb8e09b42d4/src/actions/order.ts), `docs/migrations/001_create_order_atomic.sql`, `e10346d`, `54d1507` | High / source | mine for cited contributions; team system | Qualify; do not claim complete tamper resistance or all-path atomicity. Some option-price fallback uses client values; installed database migrations are unverified |
| B9 | Current code contains Midtrans charge/status integration, payment notification signature checks, and conditional unpaid-to-paid webhook updates | [Midtrans library](https://github.com/Faruuuqqq/project-bca/blob/a9301ce5872c3d9bb70334be30134fb8e09b42d4/src/lib/midtrans/index.ts), `src/actions/payment.ts`, [webhook](https://github.com/Faruuuqqq/project-bca/blob/a9301ce5872c3d9bb70334be30134fb8e09b42d4/src/app/api/webhook/midtrans/route.ts); commit `516f918` | High / source | mine for integration contribution | Publish “implemented”; live merchant setup/payment use remains unverified |
| B10 | Ayam Kalintang project was completed in July 2026 | User follow-up: “project kalintang sudah selesai juli”; original timeline establishes 2026 | High / user | shared/team | Publish completion. This does not separately establish daily usage, live transactions, handover date or actual payment mode; omit those details |
| B11 | A documented Vercel URL exists | `docs/MIDTRANS_DEPLOYMENT_GUIDE.md` names `https://ayam-kalintang.vercel.app` | Medium / documented only | shared/team | Hold public “live demo” link until checked; docs/checklists are not deployment evidence |
| B12 | Existing tablet screenshots and browser scripts exist | `test-results/ipad_portrait_768px__menu.png` visually inspected; `test-ipad-breakpoints.py` read | High / artifact presence | shared/team | Screenshot can document a historical interface; do not treat screenshot capture as comprehensive test success |
| B13 | Enterprise-grade, unhackable, race-free, guaranteed double-payment prevention, revenue/user/order counts, improved wait time | README marketing; no adequate operational evidence | Unsupported | unclear | Omit |

README conflict: its older simulated BCA QRIS description is not the whole current implementation. Current source includes Midtrans and static QRIS assets. Neither code nor assets identify the payment mode actually used at the business. Resolve through user confirmation; do not choose whichever version sounds stronger.

## The Colors of MIPA — featured campus project

| ID | Claim | Source | Confidence | Personal ownership | Decision / boundary |
|---|---|---|---|---|---|
| C1 | BEM FMIPA Universitas Padjadjaran; External Relations; led/coordinated The Colors of MIPA | User brief §6C | High / user | mine | Publish “coordinated” or “led”; do not invent a formal project-head title |
| C2 | Involved all 9 undergraduate programs in FMIPA | User brief §6C | High / user | shared/team | Publish exact scope; do not imply the entire university |
| C3 | Coordinated 30+ contributors | User brief §6C | High / user | mine | Publish; contributors are not event attendees or club members |
| C4 | Engagement target was 200 likes; result was 1,002 likes | User brief §6C | High / user | shared/team | Publish target and outcome together; no invented reach, unique users, platform, post date or organic/paid attribution |
| C5 | User identifies this Instagram Reel as The Colors of MIPA artifact: https://www.instagram.com/reel/DL_5D0XxNnq/ | User follow-up, 6 September 2026 | High / user attribution | shared/team | Publish external artifact link. Fetch failed; video content, publication date, account identity and current counters are not independently verified. The confirmed 1,002 likes remains a reported result, not a live count |

This project remains featured alongside the two software projects. Its coordination evidence is distinct and should not be reduced to an incidental About bullet. Likes are an engagement outcome, not proof of technical workshop attendance.

## N.A.R.A. — supporting full-stack and interface work

| ID | Claim | Source | Confidence | Personal ownership | Decision / boundary |
|---|---|---|---|---|---|
| N1 | Full-Stack & UI/UX Engineering | User brief §6D; [README team section](https://github.com/ZeitakuXIV/nara-ai/blob/a8e80745d2520274c7bd386bdc551e904d2b6f62/README.md) | High / user + source | mine | Publish |
| N2 | Nutrition-planning interface with onboarding, dashboard and profile flows connected to a Python recommendation service | App source and [recommendation adapter](https://github.com/ZeitakuXIV/nara-ai/blob/a8e80745d2520274c7bd386bdc551e904d2b6f62/app/api/recommend/route.ts) | High / source | shared/team | Publish as prototype/application implementation; no clinical efficacy claim |
| N3 | Valensius built frontend flows, Supabase auth/profile integration, recommendation-response mapping and meal-plan persistence work | Commits `0935917`, `692f23e`, [9a23591](https://github.com/ZeitakuXIV/nara-ai/commit/9a235918b5a2f45b6f4413ff127d1f3e6c79e2cc), `d61b192`, `44af2c9`; current adapter | High / source attribution | mine | Publish bounded integration contributions |
| N4 | Valensius personally built the core AI engine and optimization pipeline | README assigns AI Engine & Optimization to M Nurrizal Zid Maulana; Lead Systems Architect to Sammy Farrel Zebua | Contradicted as exclusive attribution | shared/team | Omit personal core-engine authorship; moving/importing engine files does not establish ownership |
| N5 | Clinically validated, 100% safe, 45 ms inference, 97.7% accuracy, high availability, production deployment | Promotional README assertions; no independent validation inspected | Insufficient | unclear | Omit; do not present benchmark charts as personal achievements |
| N6 | Existing mobile debug screenshots document layout issues | `docs/assets/debug_logs/whitebar.png` visually inspected | High / artifact presence | shared/team | Research only: annotations and clipping make it unsuitable as the primary finished-product visual |

The adapter currently includes fallback images/nutrition values and an empty `clinical_conditions` payload. This is additional reason to avoid unqualified medical-safety claims. A real local screenshot must be accurately described; a fallback food photo is not evidence of a generated recipe's appearance.

## Additional candidates

| ID | Claim | Source | Confidence | Personal ownership | Decision / boundary |
|---|---|---|---|---|---|
| A1 | Aether3D requests Blender Python and simplified browser-preview geometry from Gemini | [generate.ts](https://github.com/vlnvn/aether3d/blob/1b3ace2c3f0c76feaf274f20dd3bcd4b429e7c6d/src/app/actions/generate.ts), `preview-3d.tsx` | High / source | mine, supported by focused authored commits | Optional supporting experiment; preview is a simplified proxy, not executed Blender geometry |
| A2 | Current Aether3D source selects `gemini-2.0-flash`; manifest pins Next.js 16.2.6 | Generation action and `package.json` | High / source | mine | If mentioned, use source details; README's Gemini 3.1 Pro and Next.js 15 claims conflict |
| A3 | Aether3D won JuaraVibeCoding, is live on Cloud Run, generates verified production-ready assets, or measures 60 FPS | README; configuration presence; preview hardcodes FPS label | Unsupported | unclear | Omit. “Winner's Entry” is not placement evidence; a hardcoded label is not telemetry |
| A4 | Color-picker uses KMeans to extract image palettes, highlight a cluster and export CSS/JSON/text | [Source](https://github.com/vlnvn/color-picker/blob/main/color-picker.py), blob recorded above | High / source; attribution indicated in app | mine | Omit from default selection: adds less evidence than the primary cases; avoid exposing student identifier from app caption |
| A5 | `ven` and `self-order-app-mobile` offer further substantial evidence | GitHub repository search returned size 0 | Insufficient | unclear | Do not feature based on empty metadata |
| A6 | IMK Simple FPS repository | GitHub repository search returned coursework-style repository title | Metadata only | unclear | Not deeply inspected; no stronger user/outcome evidence surfaced to justify replacing selected work |


## SAMBUT — primary accessible software and AI project

Targeted snapshot: frontend branch `alven/p88-final-release-lock` at `033616fa77ff6c2933baa59d0cd390faf6aa970f`; AI/backend branch `alven/p88-final-release-lock` at `9f8a979857e68b10bafaed0ef6b3d9ea5949632b`. The default branches are older and do not represent the final-release implementation inspected here.

| ID | Claim | Source | Confidence | Personal ownership | Publication decision / boundary |
|---|---|---|---|---|---|
| S1 | SAMBUT is a GEMASTIK XIX 2026 project for a two-terminal Puskesmas registration interaction | User addendum; [frontend final branch](https://github.com/Phsoderma/sambut-fe/tree/033616fa77ff6c2933baa59d0cd390faf6aa970f); [AI/backend final branch](https://github.com/danial-computer/sambut-ai/tree/9f8a979857e68b10bafaed0ef6b3d9ea5949632b) | High / user + source | shared/team | Publish as competition project; do not claim placement, deployment, adoption, or clinical validation |
| S2 | The implemented frontend has separate patient and staff terminals connected through session pairing | `app/user/page.tsx`, `app/staff/page.tsx`, `SessionContext.tsx` at frontend snapshot; locally observed in an isolated in-memory session | High / source + observed | shared/team | Publish. Describe the interface and workflow, not real Puskesmas use |
| S3 | The final-branch backend is FastAPI with role-scoped workflow transitions, in-memory sessions, idempotency/version checks, TTL, and WebSocket snapshots | `api/main.py`, `api/sessions.py`, `api/workflow.py`, `api/websocket_manager.py` at AI/backend snapshot | High / source | shared/team | Publish selectively; single-instance/in-memory preliminary-demo boundary must remain available in detailed copy |
| S4 | The active final-branch detector uses a checked-in YOLO11n artifact derived from a named public Roboflow dataset and maps three target classes to the workflow | [final-branch README](https://github.com/danial-computer/sambut-ai/blob/9f8a979857e68b10bafaed0ef6b3d9ea5949632b/README.md); detector source; license file | High / source | shared/team | May publish as public-data detector. Do not call it qualified BISINDO validation or general sign-language translation |
| S5 | A MediaPipe Holistic 30×261 feature contract and BiLSTM/Keras path exist, but are retained as a future human-data research path rather than the active final-branch runtime | final-branch README; `training/run_pipeline.py`; legacy bundle gate in `api/inference.py` | High / source | shared/team | Do not present MediaPipe/BiLSTM as the active final-release detector; safe only with this boundary |
| S6 | Valensius contributed across frontend, backend, and AI implementation | User confirmation; 16 frontend and 21 AI/backend commits authored `Valensius Alven <valensius24001@mail.unpad.ac.id>` across `alven/*` and precursor branches | High / user + git attribution | mine within shared/team project | Publish restrained wording: “Contributed across the AI, backend and frontend implementation.” Do not claim exclusive authorship or team lead |
| S7 | Bounded frontend contributions include rebuilding the networked workflow UI, session pairing, camera diagnostics/rehearsal, and related tests | Frontend commits `6436f40`, `6796c9f`, `e8df4a8`, `66b531c`, `033616f` and intervening authored commits | High / git attribution | mine | Publish a short subset when detail is useful; avoid claiming every current UI line |
| S8 | Bounded AI/backend contributions include the authoritative workflow backend, fail-closed inference, evidence-gated training plumbing, public-data detector integration, temporal hardening, and tests | AI/backend commits `e7f0f47`, `eff9e7b`, `5030819`, `4dfff77`, `4b05aff`, `9f8a979` and intervening authored commits | High / git attribution | mine | Publish as contributed components; do not imply that all model research or data work was personal |
| S9 | At the inspected revisions, frontend lint/typecheck, 26 Vitest tests, and production build passed; 41 backend API/workflow tests passed | Local verification, 8 September 2026 | High / observed at snapshot | shared/team | Internal support. If published, include revision and local-test qualifier; not performance or deployment evidence |
| S10 | Real staff and patient interface captures were made from a safe local in-memory session with the detector disabled | `design-review/v2-2/sambut/`; local capture script; inspected revisions above | High / observed | shared/team | Approved visual evidence. Caption must state local demo session and that sign recognition was not active |
| S11 | Accuracy, latency and demo-stability numbers in the older README are targets, not achieved measurements | Default-branch README “Target Metrics”; final branch does not assert them as achieved | High / source | shared/team | Omit all target values from public results |

## Evidence checks performed in this research stage

- Read the four priority repositories at their actual default branches; did not silently assume `main` for KAIROS or N.A.R.A.
- Inspected implementation, selected diffs, authored history and KAIROS PR branch ownership; distinguished code presence from operational proof.
- Checked KAIROS frozen model SHA-256 locally. Parsed its fixture and evaluation JSON for internal consistency.
- Observed a successful exact-revision KAIROS CI run. Did not claim fresh local inference or benchmark reproduction: available local Python is 3.14, while the documented release runtime is 3.12 and required ML packages are absent.
- Inspected one kiosk screenshot and one N.A.R.A. debug screenshot visually. No new portfolio or project browser QA has been performed.
- Did not connect to project databases, send payments, or modify source projects.
- Did not build or deploy the portfolio. Build/lint/typecheck/Playwright/a11y/performance gates remain pending for implementation.

## Publication decisions after research

1. Keep KAIROS first: strongest combination of bounded AI behavior, evaluation records, explicit personal reliability/reproducibility work, and team-lead context.
2. Keep Ayam Kalintang second: completed July 2026 for a real business, with traceable implementation and user-acceptance revisions. Omit unconfirmed daily-use/payment details.
3. Keep The Colors of MIPA third as a full featured case: 9 programs, 30+ contributors, 200-like target and 1,002-like result.
4. Keep N.A.R.A. in More Work with integration/UI ownership. Aether3D is optional and currently unnecessary for a compact portfolio.
5. Do not publish awards, adoption, live-payment claims, business impact, medical validation, blanket security claims, or exclusive team-system authorship without additional evidence.

## Facts still needed

- Approved existing resume path or URL remains needed before providing a download.
- Ayam Kalintang actual payment mode and daily usage remain unspecified; the current narrative does not depend on them and no repeat question is necessary.
- Instagram and LinkedIn are user-confirmed destinations; external retrieval failed. Verify usability during the later link-check stage without changing confirmed metrics.
- Canonical site origin once hosting is chosen; do not invent a domain.
- KAIROS original model-training/feature-design ownership only if the case study goes beyond the already supported AI reliability and reproducibility contribution.
