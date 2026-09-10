# V2.1 runtime contract

Status: corrective prototype contract. Measurements describe experiments/signal-form-proof, not the future production portfolio.

## Measured proof

- Vite 8.2.2 production build passed.
- Initial application chunk: 199.27 KB minified / 63.48 KB gzip.
- Deferred Signal Form chunk: 883.66 KB minified / 234.87 KB gzip.
- CSS: 5.78 KB minified / 2.05 KB gzip.
- HTML: 0.64 KB / 0.42 KB gzip.
- Prototype opening total before fonts, portrait or project media: approximately 300.8 KB gzip.
- Scene: 9 persistent meshes, 3 reusable geometry types, 3 material roles and 0 textures.
- Observed desktop render: 12 draw calls and 5,148 triangles.
- Observed 768px render: up to 10 draw calls and 3,708 triangles.
- Renderer DPR is clamped to 1–1.5.
- Browser proof covered 320, 375, 430, 768, 1024 and 1440 with no final horizontal overflow or console errors.
- Experiment typography uses local fallbacks; Sora/Manrope transfer cost is not measured here.
- React Three Fiber 9.7.0 with Three.js 0.185.1 emits a development-only THREE.Clock deprecation warning; resolve the version pairing before production.

The audit’s approximate 1.65 MB first-experience figure is the planning gate. The PRD’s 2–3 MB figure is an upper ceiling.

## Desktop high

- One lazily loaded Canvas and one persistent actor assembly.
- Use demand rendering. Invalidate for scroll progress, pointer response, state changes and bounded settling only.
- DPR starts at 1 and cannot exceed 1.5 without device evidence.
- The proof uses no post-processing. Bloom remains optional and must survive removal.
- Initial DOM and deterministic poster render before the deferred 3D chunk.

## Desktop reduced

- Canvas and its deferred chunk are not required.
- Use the deterministic semantic-chapter poster.
- Disable spatial morph, tilt, parallax and autonomous motion.
- Preserve route access and content.

## Mobile fallback

- Below the validated 700px policy boundary, use deterministic posters.
- The initial mobile experience does not request the 3D chunk.
- Hero and KAIROS posters share the ribbon, plane and node identity.
- Any later mobile WebGL proposal requires separate measured approval.

## WebGL failure

- Feature-detect WebGL2 before mounting Canvas.
- Initialization failure selects the poster without hiding content.
- On context loss, prevent default recovery, select the poster and unmount Canvas.
- The proof performs no retry loop.

## Resource and load policy

- Reuse node and plane geometry and materials.
- Dispose ribbon, plane and node geometries and materials on teardown.
- Dispose temporary deformation geometry after copying into the persistent ribbon geometry.
- Do not allocate chapter-specific replacement meshes.
- Load 3D after the static page is available, using an idle callback with a bounded timeout.
- Suspend rendering when no input or state change requires a frame.


