import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true, channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 1 });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));

const url = "https://www.instagram.com/reel/DL_5D0XxNnq/";
const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(5000);
const metadata = await page.evaluate(() => ({
  title: document.title,
  canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
  ogImage: document.querySelector('meta[property="og:image"]')?.content ?? null,
  ogDescription: document.querySelector('meta[property="og:description"]')?.content ?? null,
}));
await page.screenshot({ path: "design-review/v2-3/project-evidence/colors-of-mipa/original/reel-page.png", fullPage: true });
if (metadata.ogImage) {
  const still = await browser.newPage({ viewport: { width: 640, height: 640 }, deviceScaleFactor: 1 });
  await still.goto(metadata.ogImage, { waitUntil: "load", timeout: 60000 });
  await still.screenshot({ path: "design-review/v2-3/project-evidence/colors-of-mipa/curated/reel-poster.png" });
  await still.close();
}
console.log(JSON.stringify({ status: response?.status(), ...metadata, errors }, null, 2));
await browser.close();
