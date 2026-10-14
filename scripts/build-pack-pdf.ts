/**
 * Prints the published compliance page to the PDF handed to the acquirer, so
 * the page stays the single source of truth for that document.
 *
 *   BASE=http://localhost:3002 node scripts/build-pack-pdf.ts
 */
import { chromium } from "playwright-core";
import { resolve } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const URL = `${process.env.BASE ?? "http://localhost:3002"}/compliance`;
const OUT = resolve(process.argv[2] ?? "public/compliance/compliance-pack.pdf");

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage();
await page.goto(URL, { waitUntil: "networkidle" });
// Lazy-loaded screenshots only decode once scrolled into view.
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 600) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 60));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1500);
await page.pdf({
  path: OUT,
  format: "A4",
  printBackground: true,
  margin: { top: "14mm", bottom: "14mm", left: "12mm", right: "12mm" },
});
await browser.close();
console.log(`Written ${OUT}`);
