import type { Metadata, Viewport } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const description = "Valensius Alven is an Informatics Engineering student at Universitas Padjadjaran building software, AI systems and student-led projects.";

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  alternates: { canonical: "/" },
  title: { default: "Valensius Alven — Software, AI systems and student projects", template: "%s — Valensius Alven" },
  description,
  applicationName: "Valensius Alven Portfolio",
  authors: [{ name: "Valensius Alven" }], creator: "Valensius Alven",
  openGraph: { title: "Valensius Alven", description, type: "website", locale: "en_US", siteName: "Valensius Alven", url: "/" },
  twitter: { card: "summary_large_image", title: "Valensius Alven", description },
};
export const viewport: Viewport = { colorScheme: "light dark", themeColor: [{ media: "(prefers-color-scheme: light)", color: "#E9EFF6" }, { media: "(prefers-color-scheme: dark)", color: "#070C16" }] };
const themeScript = `(function(){try{var s=localStorage.getItem('portfolio-theme');var t=s==='light'||s==='dark'?s:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){}})()`;
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body className={`${manrope.variable} ${sora.variable}`}>{children}</body></html>;
}
