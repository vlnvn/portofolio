# V2 motion specification

Status: V2.1 locked hybrid model. The PRD remains the grand-design authority.

## Motion ownership

### Scroll-linked

- Signal Form interpolation uses current normalized chapter progress.
- The chapter progress line follows the same value.
- Limited actor repositioning may follow progress when it does not cover text or controls.
- Rendering converges to current scroll position; it never queues missed chapter animations.

### Threshold and state-based

- Active chapter labels use hysteresis around chapter boundaries.
- Navigation contracts or expands once per stable state.
- Project activation and discrete media state follow the settled chapter.
- Threshold changes do not restart the actor from an old state.

### Static and immediately available

Project name, role, context, essential evidence, source and case-study actions exist in semantic DOM and are never hidden behind intersection animation.

## Hero to KAIROS

- State 0 is Hero resting; State 1 is the KAIROS directional state.
- The same ribbon geometry object, three planes and five node identities survive the interpolation.
- Control points, plane transforms, node positions, actor rotation and material values interpolate continuously.
- Pointer response is secondary: restrained rotation/depth response only, with no OrbitControls.
- After scroll or pointer input ends, the actor settles. There is no permanent decorative loop.

## Edge cases

- Forward scroll samples current progress and renders the matching state.
- Reverse scroll uses the same mapping in reverse without a separate exit animation.
- Rapid multi-chapter skipping cancels stale settling work and converges on the newest position.
- Initial non-zero load calculates state after layout and before optional smoothing.
- History restoration restores semantic scroll first, then derives actor and navigation state.
- Resize and orientation changes preserve the active semantic chapter, recalculate ranges and resample.
- Late image or font shifts trigger chapter-range recalculation; obsolete pixel thresholds are discarded.
- Entry and exit hysteresis prevents label flicker near a chapter boundary.
- Background return discards elapsed animation time and renders current scroll-derived state.
- Focus movement never triggers spatial travel or changes reading order.

## Reduced motion

- Select a deterministic Hero or KAIROS poster from semantic chapter state.
- Disable spatial morph, tilt, parallax and animated navigation travel.
- Update progress, labels and project state immediately.
- Present media immediately; any opacity transition is non-spatial and no longer than 150ms.
- Preserve the same information, actions and identity.

## Failure behavior

WebGL2 initialization failure, unrecoverable context loss or device policy selects the same deterministic posters. Context loss unmounts the canvas and disposes owned resources. No fallback introduces an unrelated visual.

## V2.2 chapter extension — 01–06

The addendum supersedes earlier five-chapter numbering. Stable states are Hero, 01 KAIROS, 02 Ayam Kalintang, 03 SAMBUT, 04 The Colors of MIPA, 05 Aether3D, 06 N.A.R.A., then Contact/end.

| Transition | Signal Form change | Media behavior | Nav / progress | Type / accent | Reduced motion |
|---|---|---|---|---|---|
| 01→02 | Directional path compacts into modular bends; same ribbon, planes and five nodes | KAIROS artifact settles before kiosk media becomes active | Label switches at threshold; line advances one sixth | Technical blue yields to restrained warm accent | Static KAIROS poster switches to Kalintang poster |
| 02→03 | Modular state opens into two reciprocal sides joined by the same backbone | Kiosk media settles; patient/staff pair activates without autoplay | Label becomes `03 SAMBUT`; no extra progress ornament | Paired heading rhythm; blue with accessible teal | Direct poster and media swap at semantic threshold |
| 03→04 | Reciprocal form expands into a wider social sweep | SAMBUT pair settles; real Reel/still becomes active | Label becomes `04 COLORS`; full accessible name retained | Participation figures enter as static hierarchy; restrained coral | No kinetic type; static evidence and artifact |
| 04→05 | Wide sweep twists into the most spatial state | Reel/still settles; Aether proxy activates | Label becomes `05 AETHER3D` | Technical annotation appears only after artifact | Static geometric poster and proxy still |
| 05→06 | Spatial twist resolves into layered connected planes | Aether media settles; N.A.R.A. interfaces layer calmly | Label becomes `06 N.A.R.A.` | Chromatic intensity reduces | Static layered poster and interface crop |
| 06→END | Actor recedes without dissolving identity | Project media remains still | Contact becomes primary; progress reaches endpoint | No finale slogan or decorative flourish | Immediate static end state |

Six transitions must not create six ambient loops. Only the current transition may render, it settles after input, and project text/actions remain static. Rapid skips interpolate from the current materialized state to the requested target without replaying every intermediate chapter.
