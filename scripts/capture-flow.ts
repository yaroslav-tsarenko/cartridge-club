/**
 * Captures the customer purchase flow, the back-office order view, the order
 * confirmation email and the PDF invoice into docs/payally.
 *
 *   BASE=http://localhost:3002 node scripts/capture-flow.ts
 *
 * Run it against a server backed by a local database seeded with
 * scripts/seed-example.ts — never against production data.
 */
import { chromium, type Page } from "playwright-core";
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:3002";
const OUT = "docs/payally/screenshots";
const DOCS = "docs/payally";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const CUSTOMER = { email: "oliver.bennett@example.com", password: "Shopper!2026" };
const ADMIN = { email: "admin@cartridge-club.com", password: "BackOffice!2026" };

async function shot(page: Page, name: string, fullPage = true) {
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage });
  console.log(`  ✓ ${name}.png`);
}

async function login(page: Page, who: { email: string; password: string }, next = "/account") {
  await page.goto(`${BASE}/login?next=${encodeURIComponent(next)}`, { waitUntil: "networkidle" });
  await page.fill('input[type="email"]', who.email);
  await page.fill('input[type="password"]', who.password);
  await Promise.all([
    page.waitForURL(`**${next}**`, { timeout: 30000 }),
    page.click('button[type="submit"]'),
  ]);
}

async function dismissCookies(page: Page) {
  const btn = page.getByRole("button", { name: /essential only|accept all/i }).first();
  if (await btn.isVisible().catch(() => false)) await btn.click();
  await page.waitForTimeout(300);
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: CHROME });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  // ── Customer: browse ───────────────────────────────────
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await dismissCookies(page);
  await shot(page, "01-home");

  await page.goto(`${BASE}/store`, { waitUntil: "networkidle" });
  await shot(page, "02-store-catalogue");

  const productHref = await page.locator('a[href^="/product/"]').first().getAttribute("href");
  if (!productHref) throw new Error("No product link found on the catalogue page.");

  await login(page, CUSTOMER);
  await shot(page, "03-account-balance");

  await page.goto(`${BASE}${productHref}`, { waitUntil: "networkidle" });
  await shot(page, "04-product-page");

  // ── Customer: cart and checkout ────────────────────────
  await page.getByRole("button", { name: /add to cart/i }).first().click();
  await page.waitForFunction(
    () => {
      const raw = localStorage.getItem("cc_cart");
      return !!raw && JSON.parse(raw).length > 0;
    },
    undefined,
    { timeout: 15000 }
  );

  await page.goto(`${BASE}/cart`, { waitUntil: "networkidle" });
  await shot(page, "05-cart");

  await page.goto(`${BASE}/checkout`, { waitUntil: "networkidle" });
  await shot(page, "06-checkout-balance-option");

  await page.getByRole("button", { name: "Card", exact: true }).click();
  await page.fill('input[autocomplete="cc-number"]', "4242 4242 4242 4242");
  await page.fill('input[autocomplete="cc-exp"]', "12/29");
  await page.fill('input[autocomplete="cc-csc"]', "123");
  await page.fill('input[autocomplete="cc-name"]', "Oliver Bennett");
  await shot(page, "07-checkout-card-notices");

  const boxes = page.locator('input[type="checkbox"]');
  await boxes.nth(0).check();
  await boxes.nth(1).check();
  await shot(page, "08-checkout-consents-accepted");

  await page.goto(`${BASE}/checkout?topup=25&currency=GBP`, { waitUntil: "networkidle" });
  await shot(page, "09-balance-topup-notice");

  // ── Customer: the completed order ──────────────────────
  await page.goto(`${BASE}/account`, { waitUntil: "networkidle" });
  await shot(page, "11-account-order-history");

  const orderHref = await page.locator('a[href^="/account/orders/"]').first().getAttribute("href");
  if (!orderHref) throw new Error("No order found for the customer.");
  await page.goto(`${BASE}${orderHref}`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /reveal/i }).first().click();
  await shot(page, "10-order-confirmation");

  // ── Back office ────────────────────────────────────────
  const actx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const apage = await actx.newPage();
  await login(apage, ADMIN, "/admin");
  await dismissCookies(apage);
  await apage.goto(`${BASE}/admin`, { waitUntil: "networkidle" });
  await shot(apage, "12-admin-orders-list");

  const adminOrderHref = await apage.locator('a[href^="/admin/orders/"]').first().getAttribute("href");
  await apage.goto(`${BASE}${adminOrderHref}`, { waitUntil: "networkidle" });
  await shot(apage, "13-admin-order-detail");

  await apage.goto(`${BASE}/admin/customers`, { waitUntil: "networkidle" });
  await shot(apage, "14-admin-customers");

  // ── Order confirmation email and invoice ───────────────
  await apage.goto(`${BASE}${adminOrderHref}/email`, { waitUntil: "networkidle" });
  await shot(apage, "15-order-confirmation-email", false);

  const mail = await apage.request.get(`${BASE}${adminOrderHref}/email`);
  writeFileSync(`${DOCS}/order-confirmation-email.html`, await mail.text());
  console.log("  ✓ order-confirmation-email.html");

  const pdf = await apage.request.get(`${BASE}${adminOrderHref}/invoice`);
  writeFileSync(`${DOCS}/invoice.pdf`, await pdf.body());
  console.log("  ✓ invoice.pdf");

  await browser.close();
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
