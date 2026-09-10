# Valensius Alven portfolio

Production candidate for Valensius Alven, an Informatics Engineering student at Universitas Padjadjaran. The site presents six projects through verified roles, ownership boundaries, real artifacts and recorded outcomes.

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
- `PRD_V2_KINETIC_BLUEPRINT.md` and `research/V2_3_1_FINAL_FREEZE.md` define the approved product direction.
- `DESIGN.md` records the implemented V2.3.1 design contract.
- `research/PRODUCTION_ASSET_MANIFEST.md` records real media and boundaries.
- `research/V3_PRODUCTION_GATE.md` records the production QA result and remaining launch inputs.

Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin before deployment. No résumé action is published until a verified PDF is supplied.
