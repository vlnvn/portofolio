import { chromium } from "playwright";
import path from "node:path";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
const errors = [];
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
page.on("pageerror", (error) => errors.push(error.message));

await page.goto("http://127.0.0.1:8080", { waitUntil: "networkidle" });
await page.locator("#snapshot-file").setInputFiles(path.resolve("C:/College/AIC COMPFEST/kairos-ai/examples/input_snapshot.json"));
await page.locator("#run").click();
await page.locator("#results:not([hidden])").waitFor();
await page.screenshot({ path: "design-review/v2-3/project-evidence/kairos/original/queue-full.png", fullPage: true });
await page.locator("#results").screenshot({ path: "design-review/v2-3/project-evidence/kairos/curated/queue-desktop.png" });
await page.setViewportSize({ width: 375, height: 812 });
await page.locator("#results").screenshot({ path: "design-review/v2-3/project-evidence/kairos/curated/queue-mobile.png" });

console.log(JSON.stringify({ title: await page.title(), reviewCount: await page.locator("#review-count").textContent(), targetCount: await page.locator("#target-count").textContent(), errors }, null, 2));
await browser.close();
