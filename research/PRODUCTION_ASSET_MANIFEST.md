# Production asset manifest

All files below are committed production assets and are served through `next/image`. The production branch intentionally keeps runtime media compact; evidence and claim boundaries remain documented here and in `EVIDENCE.md`.

| Project | Production file | Dimensions | Bytes | What it proves | Boundary / crop |
|---|---|---:|---:|---|---|
| Portrait | `public/media/portrait/valensius-alven.jpg` | 1200×1235 | 364,074 | Real portrait candidate 6397 | Environmental upper-body crop; face exclusion zone remains clear |
| KAIROS | `public/media/kairos/queue-desktop.png` | 1344×792 | 18,875 | Ordered review queue and capacity cutoff in a local replay | Public LaDe replay; not production operations |
| Ayam Kalintang | `public/media/kalintang/kiosk-menu-desktop.png` | 2048×1536 | 1,080,217 | Real kiosk menu and order controls | Preserve readable items; no usage/revenue implication |
| SAMBUT patient | `public/media/sambut/patient-desktop.png` | 1024×768 | 14,599 | Real patient terminal UI | Local in-memory session; detector disabled |
| SAMBUT staff | `public/media/sambut/staff-desktop.png` | 1440×998 | 22,633 | Real staff terminal and queue UI | Team-built prototype; no deployment/clinical claim |
| Colors | `public/media/colors/reel-poster.png` | 640×640 | 364,944 | Authentic project/content artifact | Verified Reel still; no fabricated event photography |
| Aether3D | `public/media/aether3d/desktop.png` | 1440×1000 | 229,393 | Browser UI and preview | Simplified browser preview/proxy, not executed Blender geometry |
| N.A.R.A. dashboard | `public/media/nara/dashboard-desktop.png` | 1440×1000 | 51,233 | Dashboard and meal-plan interface | No medical outcome claim |
| N.A.R.A. onboarding | `public/media/nara/onboarding-secondary.png` | 1440×1000 | 37,850 | Onboarding interface | Recommendation engine remains team-owned |

The 1.08 MB Kalintang source is retained for legibility; runtime delivery is resized and encoded by Next Image. No remote image allowlist is required.
