# Compliance pack for PayAlly

The pack is published on the site as an unlisted page (noindex, not linked from the navigation):

**https://www.cartridge-club.com/compliance** — send this link to the acquirer.

That page is the single source of truth: it answers all five points, shows every screenshot inline
and links to the downloadable files. The PDF is printed from the same page, so the two cannot drift
apart.

## Files

| File | What it is |
| --- | --- |
| [`src/app/compliance/page.tsx`](../../src/app/compliance/page.tsx) | The published page |
| [`public/compliance/cartridge-club-compliance-pack.zip`](../../public/compliance/cartridge-club-compliance-pack.zip) | Everything below in one archive |
| [`public/compliance/compliance-pack.pdf`](../../public/compliance/compliance-pack.pdf) | The page as a single PDF with embedded screenshots, for email |
| [`public/compliance/order-confirmation-email.html`](../../public/compliance/order-confirmation-email.html) | The Order Confirmation email the customer receives |
| [`public/compliance/invoice.pdf`](../../public/compliance/invoice.pdf) | The payment receipt / invoice attached to that email |
| [`public/compliance/screenshots/`](../../public/compliance/screenshots) | The 16 screenshots |

The purchase example is a test transaction: card acquiring is not connected yet, so it was placed
with the standard test card number and no money moved. Order creation, key delivery, the
confirmation email, the receipt and the back-office record are the production code paths.

## Published policies

The policy pages carry the prepared text adopted on 14 October 2026:

| Policy | Page |
| --- | --- |
| Terms and Conditions of Sale and Website Use | [/terms](https://www.cartridge-club.com/terms) |
| Refund and Cancellation Policy | [/refund-policy](https://www.cartridge-club.com/refund-policy) |
| Digital Delivery and Activation Policy | [/delivery](https://www.cartridge-club.com/delivery) |
| Balance Terms | [/balance-terms](https://www.cartridge-club.com/balance-terms) |
| Pre-order Policy | [/pre-orders](https://www.cartridge-club.com/pre-orders) |
| Privacy Policy | [/privacy](https://www.cartridge-club.com/privacy) |
| Cookie Policy | [/cookies](https://www.cartridge-club.com/cookies) |
| Restricted Territories and Compliance Policy | [/restricted-territories](https://www.cartridge-club.com/restricted-territories) |

Interface requirements that sit outside the policy text and are implemented in the checkout:

- the Credits notice before a Balance top-up;
- `Card statement descriptor: CartridgeClub` before card payment;
- the unselected immediate-supply acknowledgement, enforced server-side, repeated in the order
  confirmation email as the durable record of the consent;
- back office at `/admin`, access granted through `ADMIN_EMAILS`.

## Regenerating the pack

The screenshots are produced against a local database, never production data:

```bash
DATABASE_URL=postgresql://user@127.0.0.1:5433/ccdemo node scripts/seed-example.ts
BASE=http://localhost:3002 node scripts/capture-flow.ts
BASE=http://localhost:3002 node scripts/build-pack-pdf.ts
cd public/compliance && zip -r cartridge-club-compliance-pack.zip compliance-pack.pdf order-confirmation-email.html invoice.pdf screenshots
```
