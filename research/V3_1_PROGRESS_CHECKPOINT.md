# V3.1 progress checkpoint

Saved: 10 September 2026, Asia/Jakarta. This checkpoint continues the V3.1 Remote Preview + Release Candidate Acceptance stage.

## Repository

- Current branch: `codex/v3-1-preview`
- Current HEAD: `b052b97a1ca7dbb1efd0513c7fe6be0ae4bb24a6` (`b052b97`)
- `993fa33` remains the first V3.1 release-candidate commit: it added the V3 portfolio, verified production media, browser tests, Playwright remote-base support, and the GitHub Actions quality workflow.
- `b052b97` is the current tested HEAD because it follows `993fa33` with the npm 10 lockfile compatibility repair required for Ubuntu `npm ci`.

Commits created during V3.1:

1. `993fa339964c1b6d75756ec9e8580eb0d1bb1994` — `feat: prepare V3 preview release candidate`
2. `b052b97a1ca7dbb1efd0513c7fe6be0ae4bb24a6` — `ci: repair npm 10 lockfile compatibility`

Current `git status --short`:

```text
 M DESIGN.md
 M next.config.ts
?? .tmp-tools/
?? AGENTS.md
?? CLAUDE.md
?? IMG_3294.JPG.jpeg
?? IMG_3529.JPG.jpeg
?? IMG_3697.JPG.jpeg
?? IMG_4849.JPG.jpeg
?? IMG_6397.JPG.jpeg
?? PRD_V2_KINETIC_BLUEPRINT.md
?? design-review/v2-1-system-proof/
?? design-review/v2-2/
?? design-review/v2-3/
?? experiments/
?? research/V2_1_CORRECTION_PLAN.md
?? research/V2_1_RUNTIME_CONTRACT.md
?? research/V2_2_ASSET_MATRIX.md
?? research/V2_2_FIGMA_HANDOFF.md
?? research/V2_2_SIGNAL_STATE_MODEL.md
?? research/V2_3_FIGMA_HANDOFF.md
?? research/V2_3_PROGRESS_CHECKPOINT.md
?? research/V2_3_VISUAL_QA.md
?? research/V2_ART_DIRECTION.md
?? research/V2_CHECKPOINT_ADVERSARIAL_AUDIT.md
?? research/V2_MOTION_SPEC.md
?? research/V2_REFERENCE_SYNTHESIS.md
?? research/V3_1_PROGRESS_CHECKPOINT.md
```

The existing empty `DESIGN.md` working-tree modification was deliberately left unstaged rather than committed. Local agent/tool files, raw portrait candidates, design-review captures, experiments, build output, Playwright output, and unrelated research remain uncommitted.

## CI

- Workflow: `Quality`
- Successful run: https://github.com/vlnvn/portofolio/actions/runs/34465672119
- Commit tested: `b052b97a1ca7dbb1efd0513c7fe6be0ae4bb24a6`
- Status: completed / success
- Install, lint, typecheck, production build, Playwright browser installation, production-critical Playwright suite, and report upload all succeeded on Ubuntu.
- Chromium: PASS in Linux CI.
- Firefox: PASS in Linux CI. The earlier Windows launch failure is reclassified as host-environment-only and non-blocking.
- WebKit: PASS in Linux CI.

The first run for `993fa33` failed only at `npm ci` because npm 10 found two missing transitive lockfile records (`@emnapi/core` and `@emnapi/runtime`). `b052b97` repaired the lockfile without changing declared dependency versions.

## Vercel

- Authentication: complete through the official Vercel device flow; do not repeat login.
- Account/team: `vlnvns-projects`.
- Existing projects before deployment: none.
- Vercel project created: no.
- Project name/id: not created / none.
- Preview deployment: not started.
- Preview URL: none.
- Deployment IDs: none.
- Production deployment: not attempted.
- Final custom domain: not attached.
- Environment variables configured: none observed or added.
- `NEXT_PUBLIC_SITE_URL`: unset; final canonical HTTPS origin remains open. Do not invent a final domain for Preview.

A clean commit archive exists at `C:\Users\VALENS~1\AppData\Local\Temp\valensius-alven-portfolio-b052b97`, contains 106 files, and was verified to exclude agent files, `.env` files, `.next`, `test-results`, and `playwright-report`. It predates the local noindex change and must not be used for the eventual deployment after that change is committed.

## Preview noindex deployment fix

A minimal deployment fix is applied locally but is not committed or pushed yet:

- `next.config.ts` now detects `process.env.VERCEL_ENV === "preview"`.
- Preview builds add `X-Robots-Tag: noindex, nofollow` to the existing production response headers.
- The frozen design and public copy are unchanged.
- `npm run typecheck`: PASS after the edit.
- `npm run lint`: PASS after the edit.
- Preview-mode production build and header verification: not started.

## Exact resume point

Last completed action: lint and strict typecheck both passed for the uncommitted preview-only noindex header change.

Next action:

1. Run a production build with `VERCEL_ENV=preview` and verify that a locally served response contains `X-Robots-Tag: noindex, nofollow` while the existing CSP and security headers remain intact.
2. Commit only `next.config.ts` as a deployment fix, push it, and wait for the new GitHub Actions run to pass. Do not include the empty `DESIGN.md` or unrelated untracked files.
3. Create a new clean archive from that new HEAD.
4. Deploy that clean archive with the authenticated Vercel CLI to a Preview target only, using project name `valensius-alven-portfolio`; do not use `--prod`, attach a custom domain, or set a fake `NEXT_PUBLIC_SITE_URL`.

## Remaining V3.1 work

- Verify preview noindex header in a preview-mode build.
- Commit/push the deployment fix and obtain a green CI run for the new HEAD.
- Create the first Vercel project and Preview deployment from a clean commit archive.
- Record Preview URL, project ID, deployment ID, and actual environment state.
- Run remote HTTPS route, 404, metadata asset, MIME, mixed-content, first-party request, security-header, real-media, and Linux filename-casing checks.
- Run the critical remote Playwright suite against the Preview URL.
- Check the remote Signal Form, reverse/rapid navigation, settle behavior, mobile/touch widths, theme persistence, reduced motion, and WebGL fallback.
- Run three mobile and three desktop remote cold-load diagnostics and record medians for available lab metrics; do not infer INP.
- Capture 1440 light/dark, 375 light, and 320 light remote screenshots and classify parity differences.
- Create the maximum-12-item human acceptance checklist.
- Create only the final durable report `research/V3_1_RC_ACCEPTANCE.md` after remote QA.
- Issue the V3.1 verdicts and stop before Production.