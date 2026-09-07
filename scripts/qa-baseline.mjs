import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const baseURL = "http://127.0.0.1:4175";
const outputDir = "design-review/production-slice";
const viewports = [
  { width: 320, height: 800 },
  { width: 375, height: 812 },
  { width: 768, height: 900 },
  { width: 1440, height: 900 },
];

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const report = { pages: [], theme: {}, keyboard: [] };

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport, colorScheme: "light" });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("requestfailed", (request) => {
    failedRequests.push({ url: request.url(), error: request.failure()?.errorText });
  });
  const response = await page.goto(baseURL, { waitUntil: "networkidle" });
  const diagnostics = await page.evaluate(() => {
    const root = document.documentElement;
    const overflowing = [...document.querySelectorAll("*")]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.right > root.clientWidth + 0.5 || rect.left < -0.5;
      })
      .map((element) => ({ tag: element.tagName, className: element.className }));
    const index = document.querySelector(".project-index");
    const kairos = document.querySelector("#kairos");
    return {
      clientWidth: root.clientWidth,
      scrollWidth: root.scrollWidth,
      overflowing,
      fontStatus: document.fonts.status,
      fontLoaded: document.fonts.check('16px "IBM Plex Sans"'),
      theme: root.dataset.theme,
      indexBottom: index?.getBoundingClientRect().bottom ?? null,
      kairosTop: kairos?.getBoundingClientRect().top ?? null,
      text: document.body.innerText,
    };
  });
  await page.screenshot({ path: `${outputDir}/${viewport.width}-light.png` });
  report.pages.push({
    viewport,
    status: response?.status(),
    ...diagnostics,
    consoleErrors,
    pageErrors,
    failedRequests,
  });
  await context.close();
}

const themeContext = await browser.newContext({
  viewport: { width: 375, height: 812 },
  colorScheme: "dark",
});
const themePage = await themeContext.newPage();
await themePage.goto(baseURL, { waitUntil: "networkidle" });
await themePage.screenshot({ path: `${outputDir}/375-dark.png` });
report.theme.initial = await themePage.evaluate(() => {
  const button = document.querySelector(".theme-switch");
  return {
    theme: document.documentElement.dataset.theme,
    checked: button?.getAttribute("aria-checked"),
    label: button?.getAttribute("aria-label"),
  };
});
await themePage.locator(".theme-switch").click();
report.theme.afterToggle = await themePage.evaluate(() => {
  const button = document.querySelector(".theme-switch");
  return {
    theme: document.documentElement.dataset.theme,
    checked: button?.getAttribute("aria-checked"),
    label: button?.getAttribute("aria-label"),
    stored: localStorage.getItem("portfolio-theme"),
  };
});
await themePage.reload({ waitUntil: "networkidle" });
report.theme.afterReload = await themePage.evaluate(() => {
  const button = document.querySelector(".theme-switch");
  return {
    theme: document.documentElement.dataset.theme,
    checked: button?.getAttribute("aria-checked"),
    label: button?.getAttribute("aria-label"),
  };
});

await themePage.keyboard.press("Home");
for (let index = 0; index < 8; index += 1) {
  await themePage.keyboard.press("Tab");
  report.keyboard.push(
    await themePage.evaluate(() => {
      const element = document.activeElement;
      return {
        tag: element?.tagName,
        text: element?.textContent?.trim().replace(/\s+/g, " ").slice(0, 80),
        label: element?.getAttribute("aria-label"),
      };
    }),
  );
}

await themeContext.close();
await browser.close();
await writeFile(
  `${outputDir}/qa.json`,
  JSON.stringify(report, null, 2),
  "utf8",
);
console.log(JSON.stringify(report, null, 2));
