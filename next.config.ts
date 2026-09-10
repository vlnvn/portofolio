import type { NextConfig } from "next";
const hasHttpsOrigin=process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://")??false;
const csp=["default-src 'self'","script-src 'self' 'unsafe-inline'","style-src 'self' 'unsafe-inline'","img-src 'self' data: blob:","font-src 'self' data:","connect-src 'self'","worker-src 'self' blob:","object-src 'none'","base-uri 'self'","form-action 'self'","frame-ancestors 'none'",...(hasHttpsOrigin?["upgrade-insecure-requests"]:[])].join("; ");
const isPreviewDeployment=process.env.VERCEL_ENV==="preview";
const securityHeaders=[{key:"Content-Security-Policy",value:csp},{key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},{key:"X-Content-Type-Options",value:"nosniff"},{key:"X-Frame-Options",value:"DENY"},{key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=()"},...(isPreviewDeployment?[{key:"X-Robots-Tag",value:"noindex, nofollow"}]:[])];
const nextConfig:NextConfig={reactStrictMode:true,async headers(){return process.env.NODE_ENV==="production"?[{source:"/:path*",headers:securityHeaders}]:[];}};
export default nextConfig;
