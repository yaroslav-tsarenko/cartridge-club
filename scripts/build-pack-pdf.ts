/** Prints docs/payally/compliance-pack.html to a PDF. */
import { chromium } from "playwright-core";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SRC = resolve("docs/payally/compliance-pack.html");
const OUT = resolve("docs/payally/compliance-pack.pdf");

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage();
await page.goto(pathToFileURL(SRC).href, { waitUntil: "networkidle" });
await page.pdf({ path: OUT, format: "A4", printBackground: true });
await browser.close();
console.log(`Written ${OUT}`);
