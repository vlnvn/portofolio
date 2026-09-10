# Valensius Alven portfolio

Production candidate for Valensius Alven, an Informatics Engineering student at Universitas Padjadjaran. The site presents six projects through verified roles, ownership boundaries, real artifacts and recorded outcomes. The Kinetic Lightfield layer progressively enhances the static HTML with a demand-rendered Three.js hero aperture, responsive lighting and restrained media depth.

## Run locally

```bash
npm ci
npm run dev
```

Quality gates:

```bash
npm run lint
npm run typecheck
npm run build
npx playwright test --project=chromium
npx playwright test tests/foundation.spec.ts --project=webkit --workers=1
```

## Routes

- `/`
- `/work/kairos`
- `/work/ayam-kalintang`
- `/sitemap.xml`
- `/robots.txt`

## Authority and handoff

- `EVIDENCE.md` is the factual source of truth.
- `DESIGN.md` is the current runtime design authority, including the later human-approved Kinetic Lightfield changes.
- `PRD_V2_KINETIC_BLUEPRINT.md` and `research/V2_3_1_FINAL_FREEZE.md` preserve the earlier product/static-design baseline; they do not override later approved runtime decisions.
- `research/PRODUCTION_ASSET_MANIFEST.md` records real media and evidence boundaries.
- `research/V3_1_RC_ACCEPTANCE.md` records the release-candidate gate and remaining launch inputs.

Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin before deployment. No résumé action is published until a verified PDF is supplied.
