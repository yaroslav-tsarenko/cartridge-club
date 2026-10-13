# Compliance pack for PayAlly

The pack is published on the site as an unlisted page (noindex, not linked from the navigation):

**https://www.cartridge-club.com/compliance** — send this link to the acquirer.

It contains the written answers to all five points plus every screenshot inline, and links to the
downloadable files.

## Files

| File | What it is |
| --- | --- |
| [`src/app/compliance/page.tsx`](../../src/app/compliance/page.tsx) | The published page |
| [`public/compliance/compliance-pack.pdf`](../../public/compliance/compliance-pack.pdf) | The same document as a single PDF with embedded screenshots, for email |
| [`public/compliance/compliance-pack.html`](../../public/compliance/compliance-pack.html) | Source of the PDF |
| [`public/compliance/order-confirmation-email.html`](../../public/compliance/order-confirmation-email.html) | The Order Confirmation email the customer receives |
| [`public/compliance/invoice.pdf`](../../public/compliance/invoice.pdf) | The PDF invoice attached to that email |
| [`public/compliance/screenshots/`](../../public/compliance/screenshots) | The 15 screenshots |

## What changed on the site

1. **Balance** — top-up and spend only. Every withdrawal / cash-out reference removed from
   [/balance-terms](https://www.cartridge-club.com/balance-terms),
   [/terms](https://www.cartridge-club.com/terms),
   [/privacy](https://www.cartridge-club.com/privacy),
   [/refund-policy](https://www.cartridge-club.com/refund-policy),
   [/pre-orders](https://www.cartridge-club.com/pre-orders) and
   [/restricted-territories](https://www.cartridge-club.com/restricted-territories). The
   non-transferable-credits disclosure is shown before payment on the checkout, on the Balance
   top-up screen and on the account Balance card.
2. **Privacy Policy** — Data retention rewritten with a maximum period per data category, automated
   deletion, a 35-day backup cycle and the legal-hold case.
3. **Checkout** — `Card statement descriptor: CartridgeClub`, and a mandatory withdrawal-waiver
   checkbox that is unticked by default and enforced server-side (also for Balance top-ups).
4. **Refund Policy** — verified to cover refund conditions, technical failures, 2 business days to
   acknowledge / 14 days to decide, the 30-day request window, the chargeback procedure and
   info@cartridge-club.com; no contradictions about cash-out.
5. **Purchase example** — customer journey, the order in the back office (`/admin`, access through
   `ADMIN_EMAILS`), and the confirmation email and invoice.

## Regenerating the pack

The screenshots are produced against a local database, never production data:

```bash
DATABASE_URL=postgresql://user@127.0.0.1:5433/ccdemo node scripts/seed-example.ts
BASE=http://localhost:3002 node scripts/capture-flow.ts
node scripts/build-pack-pdf.ts
```
