export function siteUrl(path = "/") { return new URL(path, process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"); }
