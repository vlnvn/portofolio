# Content architecture

Status: production content structure locked 7 September 2026. Facts come exclusively from EVIDENCE.md and its approved updates. This is a content contract, not polished public prose.

## Positioning

Valensius is an Informatics Engineering student whose work spans an AI competition project, a completed small-business kiosk, and faculty-wide student coordination. These are different kinds of evidence. The public site should state the work and the contribution instead of naming desirable personality traits.

| Project | Why it belongs | Evidence IDs |
|---|---|---|
| KAIROS | AI reliability/evaluation decisions and technical team-lead context | K1–K8, K10, K12, K17–K18 |
| Ayam Kalintang | Completed software for a real business, revised through user feedback | B1–B7, B10 |
| The Colors of MIPA | Coordination across 9 programs, 30+ contributors and a documented engagement result | C1–C5 |
| Aether3D | Supporting personal experiment linking generated Blender Python with a simplified browser preview | A1–A3 |
| N.A.R.A. | Supporting interface and full-stack integration work in a team AI application | N1–N4 |

No public Claude application section, program pitch, trait slogan or AI affiliation claim. Color Picker remains omitted. Aether3D appears only as supporting work and must keep the proxy/verification boundary explicit.

## Exact homepage order and density budgets

Budgets are ceilings, not word-count goals. Labels, role and date are metadata, not extra evidence bullets. Evidence should be visible without hover or expansion.

| Order / section | Purpose | Key evidence | Maximum density | Primary action |
|---|---|---|---|---|
| Navigation | Provide predictable orientation | Work and Contact anchors | 2 links; no separate menu on mobile | Work → `/#work` |
| Introduction | Identify the person and scope within 10 seconds | P1–P2; software, AI systems, student projects | Name, 2 sentences / 45 words, GitHub; compact 3-project text index under introduction | GitHub / project index |
| Selected work: KAIROS | Establish strongest technical evidence | K1, K3, K6–K8 | Description ≤30 words; role/context; 3 evidence points ≤18 words each; 1 real screenshot with caption ≤20 words | Read KAIROS case study |
| Selected work: Ayam Kalintang | Show business context, completion and specific contribution | B1–B2, B5–B7, B10 | Description ≤30 words; role/context; 3 evidence points ≤18 words each; 1 real screenshot + caption | Read kiosk case study |
| Selected work: The Colors of MIPA | Make student coordination a featured outcome | C1–C5 | Description ≤30 words; role/context; 2 evidence points ≤24 words each; 1 short context paragraph ≤45 words; artifact link | Watch The Colors of MIPA on Instagram |
| More work: Aether3D | Add a focused personal AI/3D experiment without overstating output verification | A1–A3 | One description ≤30 words, implementation boundary, source; optional real proxy capture | Inspect repository |
| More work: N.A.R.A. | Supply supporting full-stack evidence without competing with lead cases | N1–N4 | One description ≤25 words, exact role, 2 contribution points ≤18 words each; text presentation | Inspect repository |
| Contact and footer | Enable a concrete next step | P3–P4 | Email, GitHub, LinkedIn; resume only when provided; name/copyright | Email |

The three-project text index repeats only navigational titles/context. It exists because a reviewer may not scroll to the third feature in a minute. It must include “The Colors of MIPA — 9 programs, 30+ contributors” as a concise linked preview, not a detached statistic. It is under the introduction, part of the Work entry, never a hero counter strip. Avoid repeating these figures anywhere except the actual community feature.

Homepage prose target: 300–500 words, hard ceiling 600 excluding navigation/link labels and metadata. Selected work must begin in the initial 900px-high desktop viewport and initial 812px-high mobile viewport; do not add decorative height to achieve a composition.

## Featured project content

### KAIROS

- **Factual description:** Dispatcher decision-support for reviewing pickup promises within a limited human review capacity.
- **Role:** Team Lead.
- **Context/year:** COMPFEST 18 AI Innovation Challenge, 2026; local competition MVP.
- **Homepage evidence:** (1) CatBoost ranking evaluated on public LaDe pickup data; (2) personal work on input validation, invariant tests and reproducibility records; (3) dispatcher retains operational decisions.
- **Case study only:** why capacity changes cutoff instead of order; rejection of outcome/future inputs; why an ordering score is not a probability; one qualified V2 result if useful: recorded +4.40 percentage-point Recall@10 difference versus logistic, explicitly an offline reproduction rather than the frozen V1 binary. Include plain-language metric definition and limitations in the same passage.
- **GitHub only:** hashes, feature enumeration, raw evaluation tables, historical V1/V2 artifact lineage, detailed test counts, full model/data cards, reproduction scripts.
- **Never publish:** autonomous dispatch, route optimization, operational savings, Indonesian validation, award/placement, exclusive authorship of the whole stack. Do not imply lead role means ownership of teammates' layers.
- **Visual:** real interface capture with replay caption. Rank/capacity context must be legible; no invented dashboard or decorative model chart.

### Ayam Kalintang Self-Order Kiosk

- **Factual description:** A self-order kiosk and staff tools built for Ayam Kalintang, a local culinary business.
- **Role:** Full-Stack Engineer; Deputy Team Lead.
- **Context/year:** Bakti BCA, January–July 2026; completed July 2026.
- **Homepage evidence:** (1) completed project for a real local business; (2) personal kiosk/admin and menu-customization work; (3) receipt printing and revisions from user-acceptance feedback.
- **Case study only:** one concrete feedback-to-change example from B6; ordering/customization/receipt workflow; printer integration constraints; implementation versus deployment boundary for payments. Midtrans code may be described as implemented, without claiming active merchant processing.
- **GitHub only:** schema/RPC details, payment code, rollback paths, individual UI commits.
- **Never publish:** daily active users, order volume, revenue, reduced queues, live payment mode, blanket security guarantees. Completion in July is confirmed; daily operations are not a required narrative detail.
- **Visual:** existing genuine kiosk screenshot with historical caption, or a later safe local capture. No mock customer records, fake receipts or live admin data. Do not present food stock photos as photos of the business's actual dishes.

### The Colors of MIPA

- **Factual description:** A BEM FMIPA student project involving all nine undergraduate programs in the faculty.
- **Role:** External Relations; coordinated the project. Do not invent a formal project-head title.
- **Context/year:** BEM FMIPA Universitas Padjadjaran; year omitted until established. Do not date it from the Instagram short code.
- **Homepage evidence:** (1) coordinated 30+ contributors across all 9 undergraduate programs; (2) 1,002 likes against a target of 200.
- **Detailed treatment:** stays on the homepage; role, scale and outcome are already compact. Do not create a sparse separate page. A short context paragraph may distinguish participation from engagement without inventing the coordination process.
- **Never publish:** workshop attendance, club membership, university-wide coverage, reach/views, current live likes, invented channels/process/timeline, claims of sole production.
- **Visual/artifact:** user-supplied [Instagram Reel](https://www.instagram.com/reel/DL_5D0XxNnq/). Link works as the artifact even without a thumbnail. No automatic social embed; no invented still or synthetic people. A future verified still may replace empty media space; none is required for layout.

## Supporting projects

**Aether3D.** Draft factual description: “Personal AI/3D experiment that requests Blender Python and a simplified browser preview from Gemini.” Current source uses Gemini. The preview is a proxy and must not be presented as executed Blender output. Do not claim a competition win, active Cloud Run deployment, measured 60 FPS, production readiness or adoption. Link directly to https://github.com/vlnvn/aether3d. Homepage only.

**N.A.R.A.** Draft factual description: “Nutrition-planning interface connected to a Python recommendation service.” Role: Full-Stack & UI/UX Engineering. Context: team project, 2026 supported by source history. Homepage points: onboarding/dashboard/profile flows; recommendation mapping and meal-plan persistence. Link directly to repository. Core engine ownership remains with the team attribution in N4. No clinical-safety or performance numbers. No dedicated route or annotated debug screenshot in the initial portfolio.

## Contact

Do not add a standalone About block unless it introduces a new verified fact. Omit inferred motivations, availability, career ambitions, personality adjectives, age, student identifier, GPA and graduation date.

Contact destinations:

- `mailto:alvenvalensius93@gmail.com`
- `https://github.com/vlnvn`
- `https://linkedin.com/in/valensiusalven`

Resume remains a delivery dependency, not a disabled/fake link. No form, appointment scheduler, contact API or unsolicited social profile. Instagram belongs with the project, not the personal contact list.

## Route decision: homepage plus two case studies

**Choose Option A:** `/`, `/work/kairos`, `/work/ayam-kalintang`. Add framework 404 and technical metadata endpoints, not additional content pages.

KAIROS requires explaining model judgment and human boundaries; the kiosk requires a user-feedback example and real operating constraints. Putting both in full on the homepage would delay discovery of the community project. Detail pages provide depth through one intentional click. Colors, Aether3D and N.A.R.A. do not have enough distinct approved detail to justify separate routes.

**Reject Option B:** a long single page either buries the community work under engineering detail or strips useful technical reasoning. Accordions would add interaction cost and can hide critical ownership/limitations. No project tabs or filter UI for five entries.

## First-60-seconds walkthrough — design hypothesis to validate later

| Time | Reviewer question | Intended visible answer / action | Failure response |
|---|---|---|---|
| 0–10s | Who and what? | Name, university/discipline, factual work scope | Reduce introduction height or wrapping; do not shrink body text |
| 10–30s | Technical proof and completed work? | KAIROS lead/AI contribution; kiosk completion in index/feature; direct case-study links | Move completion/role ahead of image; shorten feature text |
| 30–60s | Leadership, participation, sources? | KAIROS Team Lead; community index/feature with 9 programs and 30+ contributors; source/Reel links | Shorten prior sections; retain all three featured projects rather than collapsing Colors into About |

This timing is a proposed information path, not measured user-test evidence. First-minute questions must be answerable without reading the two detail pages or playing a video.
