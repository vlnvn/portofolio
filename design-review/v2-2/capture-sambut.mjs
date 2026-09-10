import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const out = new URL("./sambut/", import.meta.url);
await mkdir(out, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});

const staffContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const staff = await staffContext.newPage();
await staff.goto("http://127.0.0.1:3100/staff", { waitUntil: "networkidle" });
await staff.screenshot({ path: fileURLToPath(new URL("staff-create.png", out)), fullPage: true });
await staff.getByRole("button", { name: "Buat sesi" }).click();
await staff.getByText("Sesi aktif").waitFor();
const pairUrl = await staff.locator(".pair-link a").getAttribute("href");
if (!pairUrl) throw new Error("Pair URL was not created");

const userContext = await browser.newContext({ viewport: { width: 1024, height: 768 } });
const user = await userContext.newPage();
await user.goto(pairUrl, { waitUntil: "networkidle" });
await user.getByText("Terhubung dengan petugas", { exact: true }).waitFor();
await staff.reload({ waitUntil: "networkidle" });
await staff.getByRole("button", { name: "Kirim pertanyaan berobat" }).click();
await user.getByText("Pertanyaan petugas").waitFor();

await Promise.all([
  staff.screenshot({ path: fileURLToPath(new URL("staff-active.png", out)), fullPage: true }),
  user.screenshot({ path: fileURLToPath(new URL("patient-question.png", out)), fullPage: true }),
]);

const mobileContext = await browser.newContext({ viewport: { width: 375, height: 812 } });
const mobile = await mobileContext.newPage();
await mobile.goto(pairUrl, { waitUntil: "networkidle" });
await mobile.getByText("Pertanyaan petugas").waitFor();
await mobile.screenshot({ path: fileURLToPath(new URL("patient-question-mobile.png", out)), fullPage: true });

console.log(JSON.stringify({ pairUrl, consoleErrors: [] }));
await browser.close();



