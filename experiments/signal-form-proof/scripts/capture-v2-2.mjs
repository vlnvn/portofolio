import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const out = resolve("../../design-review/v2-2/signal-form");
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });

for (const progress of [0, 0.25, 0.5, 0.75, 1]) {
  await page.goto(`http://127.0.0.1:4174/?from=1&to=2&progress=${progress}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  await page.screenshot({ path: resolve(out, `kairos-kalintang-${String(progress * 100).padStart(3, "0")}.png`) });
}
for (const state of [3, 4, 5, 6]) {
  await page.goto(`http://127.0.0.1:4174/?from=${state}&to=${state}&progress=1`, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  await page.screenshot({ path: resolve(out, `state-${state}.png`) });
}
console.log(JSON.stringify({ errors, captures: 9 }));
await browser.close();
