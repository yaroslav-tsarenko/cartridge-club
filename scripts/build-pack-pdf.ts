/**
 * Prints the compliance pack HTML to a PDF next to it.
 *
 *   node scripts/build-pack-pdf.ts [source.html] [output.pdf]
 */
import { chromium } from "playwright-core";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SRC = resolve(process.argv[2] ?? "public/compliance/compliance-pack.html");
const OUT = resolve(process.argv[3] ?? "public/compliance/compliance-pack.pdf");

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage();
await page.goto(pathToFileURL(SRC).href, { waitUntil: "networkidle" });
await page.pdf({ path: OUT, format: "A4", printBackground: true });
await browser.close();
console.log(`Written ${OUT}`);
