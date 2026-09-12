const LOCAL_ORIGIN = "http://localhost:3000";

function siteOrigin() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured;

  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProductionUrl) {
    return vercelProductionUrl.startsWith("http")
      ? vercelProductionUrl
      : `https://${vercelProductionUrl}`;
  }

  return LOCAL_ORIGIN;
}

export function siteUrl(path = "/") {
  return new URL(path, siteOrigin());
}
