import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const baseURL = "http://127.0.0.1:4177";
const output = path.resolve(process.cwd(), "../../design-review/v2-1-system-proof");
await mkdir(output, { recursive: true });

const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const report = { captures: [], checks: {}, errors: [] };

async function capture({ name, width, height, progress, theme = "light", reducedMotion = "no-preference", disableWebGL = false, anchor = null }) {
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion, colorScheme: theme });
  if (theme === "dark") {
    await context.addInitScript(() => localStorage.setItem("signal-proof-theme", "dark"));
  }
  if (disableWebGL) {
    await context.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type, ...args) {
        if (type === "webgl2") return null;
        return original.call(this, type, ...args);
      };
    });
  }
  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") report.errors.push(`${name}: console: ${message.text()}`);
  });
  page.on("pageerror", (error) => report.errors.push(`${name}: pageerror: ${error.message}`));
  await page.goto(`${baseURL}/?progress=${progress}`, { waitUntil: "networkidle" });
  if (anchor) {
    await page.locator(anchor).evaluate((element) => element.scrollIntoView());
  } else {
    await page.evaluate((value) => {
      const max = document.documentElement.scrollHeight - innerHeight;
      scrollTo(0, max * value);
    }, progress);
  }
  await page.waitForTimeout(900);
  const metrics = await page.locator(".runtime-readout").getAttribute("data-metrics");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  const nav = await page.evaluate(() => ({
    contactVisible: Boolean(document.querySelector(".contact-link")?.getBoundingClientRect().width),
    chapter: document.querySelector(".chapter-label")?.textContent,
    caseStudyHref: document.querySelector('.project-actions a[href="/work/kairos"]')?.getAttribute("href"),
    sourceHref: document.querySelector('.project-actions a[href*="github.com"]')?.getAttribute("href"),
  }));
  await page.screenshot({ path: path.join(output, `${name}.png`), fullPage: false });
  report.captures.push({ name, width, height, progress, theme, reducedMotion, disableWebGL, metrics, overflow, nav });
  await context.close();
}

for (const [label, progress] of [["00", 0], ["25", 0.25], ["50", 0.5], ["75", 0.75], ["100", 1]]) {
  await capture({ name: `desktop-light-${label}`, width: 1440, height: 900, progress });
}
await capture({ name: "desktop-dark-00", width: 1440, height: 900, progress: 0, theme: "dark" });
await capture({ name: "desktop-dark-100", width: 1440, height: 900, progress: 1, theme: "dark" });
for (const width of [320, 375, 430, 768, 1024]) {
  await capture({ name: `responsive-${width}-hero`, width, height: width < 700 ? 812 : 900, progress: 0 });
  await capture({ name: `responsive-${width}-kairos`, width, height: width < 700 ? 812 : 900, progress: 1, anchor: "#kairos" });
}
await capture({ name: "reduced-motion-hero", width: 1440, height: 900, progress: 0, reducedMotion: "reduce" });
await capture({ name: "webgl-failure-kairos", width: 1440, height: 900, progress: 1, disableWebGL: true });

{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(baseURL, { waitUntil: "networkidle" });
  const max = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  await page.evaluate((y) => scrollTo(0, y), max);
  await page.waitForTimeout(80);
  const forward = await page.locator(".runtime-readout span").first().textContent();
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(80);
  const reverse = await page.locator(".runtime-readout span").first().textContent();
  await page.evaluate((y) => scrollTo(0, y), max);
  await page.waitForTimeout(80);
  const rapidRecovery = await page.locator(".runtime-readout span").first().textContent();
  await page.locator(".theme-control").focus();
  const focused = await page.evaluate(() => ({
    tag: document.activeElement?.tagName,
    className: document.activeElement?.className,
    outlineWidth: getComputedStyle(document.activeElement).outlineWidth,
  }));
  const typeFloor = await page.evaluate(() => {
    const selectors = [".scope", ".problem", ".evidence-grid p", ".kicker", ".meta"];
    return Object.fromEntries(selectors.map((selector) => [selector, [...document.querySelectorAll(selector)].map((node) => getComputedStyle(node).fontSize)]));
  });
  report.checks = { forward, reverse, rapidRecovery, focused, typeFloor };
  await context.close();
}

await browser.close();
await writeFile(path.join(output, "qa.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));





