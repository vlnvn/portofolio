import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true });
async function capture(name, url, outBase, paths = ["/"]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", e => errors.push(e.message));
  const results = [];
  for (const p of paths) {
    const response = await page.goto(url + p, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(2500);
    const slug = p === "/" ? "home" : p.replaceAll("/", "-").replace(/^-/, "");
    await page.screenshot({ path: outBase + "/original/" + slug + "-full.png", fullPage: true });
    results.push({ path: p, status: response?.status(), url: page.url(), title: await page.title(), headings: await page.locator("h1,h2").allTextContents() });
  }
  await page.goto(url + paths[0], { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: outBase + "/curated/desktop.png" });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: outBase + "/curated/mobile.png" });
  await page.close();
  return { name, results, errors };
}
const out=[];
out.push(await capture("Aether3D","http://127.0.0.1:3100","design-review/v2-3/project-evidence/aether3d",["/"]));
out.push(await capture("N.A.R.A.","http://127.0.0.1:3200","design-review/v2-3/project-evidence/nara",["/","/onboarding","/dashboard","/profile"]));
console.log(JSON.stringify(out,null,2));
await browser.close();
