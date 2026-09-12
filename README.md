# Valensius Alven — Portfolio

Personal engineering portfolio built with Next.js, TypeScript, React Three Fiber and Three.js. The site presents selected software and AI work through concise case studies, real project media and progressive 3D interaction.

## Stack

- Next.js 16
- React 19
- TypeScript
- React Three Fiber / Three.js
- Playwright
- GitHub Actions

## Architecture

The content layer is server-rendered and statically generated. WebGL is loaded only on capable desktop devices and falls back to a deterministic static poster when WebGL is unavailable or reduced motion is requested.

The site has no database, authentication layer or application API. Project media is served from the repository and optimized through Next.js Image.

## Local development

```bash
npm ci
npm run dev
```

## Quality gates

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e:critical
npm run audit:prod
```

The CI release gate runs linting, type checking, a production build, production-dependency auditing and the critical Playwright suite across Chromium, Firefox and WebKit.

## Environment

`NEXT_PUBLIC_SITE_URL` can be set when using a custom canonical domain. On Vercel, the site automatically falls back to `VERCEL_PROJECT_PRODUCTION_URL` for canonical URLs, Open Graph metadata, robots and the sitemap.

See `.env.example` for the local format.

## Deployment

The application is designed for Vercel's standard Next.js deployment with the repository root as the project root. No database migrations, background workers or external runtime services are required.
