export const focusableSelector = "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])";
export function prefersReducedMotion() { return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
