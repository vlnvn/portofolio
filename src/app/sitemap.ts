import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap { return [{url:siteUrl("/").href,priority:1,changeFrequency:"monthly"},{url:siteUrl("/work/kairos").href,priority:.8,changeFrequency:"monthly"},{url:siteUrl("/work/ayam-kalintang").href,priority:.8,changeFrequency:"monthly"}]; }
