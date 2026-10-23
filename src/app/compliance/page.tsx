import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

// Unlisted: reachable by direct link for payment-provider review, kept out of
// search results and out of the site navigation.
export const metadata = {
  title: "Compliance pack — Cartridge Club",
  robots: { index: false, follow: false },
};

const SHOTS = "/compliance/screenshots";

export default function CompliancePage() {
  return (
    <>
      {/* Site chrome and the download list are omitted when the page is printed
          to PDF for sending — the PDF is the document itself. */}
      <div className="print:hidden">
        <Header />
      </div>
      <main id="main" className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <p className="cc-tag text-[0.65rem] text-muted">For payment provider review</p>
        <h1 className="mt-2 font-display text-4xl">Compliance pack</h1>
        <p className="mt-3 text-sm text-muted">
          ALDERROCK LTD · Company No. 17381132 · Dept 6984, 196 High Road, Wood Green, London,
          N22 8HH, United Kingdom · Billing contact{" "}
          <a className="text-cobalt hover:underline" href="mailto:support@cartridge-club.com">
            support@cartridge-club.com
          </a>{" "}
          · Last updated 14 October 2026
        </p>

        <p className="mt-5 text-sm leading-relaxed text-ink/90">
          This page documents the changes made to the website and contains the requested purchase
          example: the customer journey, the order as it appears in the back office, and the Order
          Confirmation email and invoice the customer receives after payment.
        </p>

        <div className="cc-outline-plate mt-6 rounded-card bg-card p-5 print:hidden">
          <h2 className="font-heading text-lg">Attachments</h2>
          <p className="mt-1 text-sm text-muted">
            Everything in this pack, downloadable from this page.
          </p>
          <ul className="mt-4 divide-y divide-line">
            <Attachment
              href="/compliance/cartridge-club-compliance-pack.zip"
              name="cartridge-club-compliance-pack.zip"
              note="Everything below in one archive — the PDF pack, the email, the invoice and all 15 screenshots"
            />
            <Attachment
              href="/compliance/compliance-pack.pdf"
              name="compliance-pack.pdf"
              note="This document as a single PDF with every screenshot embedded"
            />
            <Attachment
              href="/compliance/order-confirmation-email.html"
              name="order-confirmation-email.html"
              note="The Order Confirmation email the customer receives after payment"
            />
            <Attachment
              href="/compliance/invoice.pdf"
              name="invoice.pdf"
              note="The payment receipt / invoice attached to that email"
            />
            <Attachment
              href={`${SHOTS}/13-admin-order-detail.png`}
              name="screenshots/ (16 files)"
              note="Customer journey, back office and the confirmation email — all shown inline below"
            />
          </ul>
        </div>

        {/* ── 1 ───────────────────────────────────────── */}
        <Section n="1" title="Balance — top-up and spend only, no withdrawals">
          <p>
            All references to withdrawing, cashing out or transferring Balance have been removed from
            the website. Balance can only be topped up and used to pay for digital products on the
            platform; there is no withdrawal, payout or transfer function in the product or in the
            policies.
          </p>

          <Table
            head={["Page", "Change"]}
            rows={[
              [
                <Lnk key="bt" href="/balance-terms">/balance-terms</Lnk>,
                "Rewritten. Clauses 1.2 and 1.3 define Credits as non-transferable virtual credits that are not redeemable for cash and cannot be sold, assigned, gifted or transferred between Accounts. The former cash-redemption section is gone; clause 7 covers top-up corrections and payment errors without creating a right to redeem Credits for money.",
              ],
              [
                <Lnk key="t" href="/terms">/terms</Lnk>,
                "Clause 9 defines Balance as the feature displaying Credits and repeats the non-transferable, not-redeemable-for-cash wording. Clause 8.5 states the card statement descriptor; clause 10 covers immediate supply and the withdrawal acknowledgement.",
              ],
              [
                <Lnk key="p" href="/privacy">/privacy</Lnk>,
                "Section 8 covers Balance and payment transactions — recording top-ups, purchases, restored Credits, refunds and reversals. No payout instructions or third-party beneficiary data are processed.",
              ],
              [
                <Lnk key="r" href="/refund-policy">/refund-policy</Lnk>,
                "Section 17 repeats that Credits are not redeemable for cash. Card purchases are refunded to the original payment route and Credits-funded purchases restore Credits (section 12); a payment correction does not create an entitlement to redeem Credits for money (clause 3.3).",
              ],
              [
                <span key="o" className="flex flex-wrap gap-x-1">
                  <Lnk href="/pre-orders">/pre-orders</Lnk>,{" "}
                  <Lnk href="/restricted-territories">/restricted-territories</Lnk>
                </span>,
                "Cancelled pre-orders are refunded through the original payment route and restore Credits. Credits cannot be transferred to another Account or used to bypass territory restrictions, and paid Credits are not forfeited merely because the territory list changes.",
              ],
            ]}
          />

          <p>
            The required disclosure is shown before payment on the Balance top-up screen, on the
            checkout, and on the Balance card in the customer account:
          </p>
          <Quote>
            Credits are non-transferable virtual credits usable only within this platform. They are
            not cryptocurrency, not tradable, and not redeemable for cash.
          </Quote>

          <Fig
            src={`${SHOTS}/09-balance-topup-notice.png`}
            caption="Balance top-up — the disclosure and the card statement descriptor are shown above the payment button."
          />
          <Fig
            src={`${SHOTS}/03-account-balance.png`}
            caption="Customer account — the same disclosure appears under the Balance card. No withdrawal option exists."
          />
        </Section>

        {/* ── 2 ───────────────────────────────────────── */}
        <Section n="2" title="Privacy Policy — data retention">
          <p>
            The <Lnk href="/privacy">Privacy Policy</Lnk> sets a defined maximum retention period for
            every category of data, with automated monthly deletion, and states the backup retention
            explicitly. Periods follow UK and EU requirements.
          </p>
          <Table
            head={["Data category", "Retention"]}
            rows={[
              [
                "Account profile, settings and login data",
                "While the Account is active; after closure, data not needed for another identified purpose is automatically deleted within 30 days",
              ],
              [
                "Inactive Accounts",
                "After 24 months without a login, purchase or top-up an Account may be scheduled for closure, but only if it holds no Credits, orders, disputes or other obligations, and only after at least 30 days’ notice",
              ],
              [
                "Order, payment, top-up, refund and accounting records",
                "Six years after the end of the accounting period, limited to the identifiers and records needed for accounting, tax and proof of delivery. Longer only under a specific law, tax enquiry or documented legal hold",
              ],
              [
                "Support correspondence and attachments",
                "24 months after the ticket is closed; evidence needed for an accounting record or identified claim is kept separately",
              ],
              [
                "Identity verification documents",
                "Copies deleted within 90 days of completed verification; only a minimal verification result is kept with the transaction record",
              ],
              ["Routine technical and security logs", "180 days; incident or fraud evidence kept separately while that matter requires it"],
              ["Identifiable analytics data", "No more than 12 months from the recorded event"],
              [
                "Marketing profile and preferences",
                "Until unsubscribe or 24 months without relevant interaction; profile data deleted within 30 days, minimal suppression information retained",
              ],
              [
                "Consent evidence and suppression records",
                "Up to six years after consent is withdrawn or an opt-out is recorded, only while needed to demonstrate lawful processing or honour the opt-out",
              ],
              [
                "Expiry of any ordinary period",
                "Live-system data automatically deleted or irreversibly anonymised within 30 days",
              ],
              [
                "Backups and disaster recovery copies",
                "Overwritten or deleted no later than 35 days after creation. Data deleted from live systems may persist in an existing backup for no more than a further 35 days, placed beyond ordinary use; deletion instructions are reapplied before a restored backup returns to use",
              ],
              [
                "Legal holds",
                "Applied only to records needed for an identified dispute, investigation or legal obligation, access restricted and reviewed at least every six months; deleted within 30 days after the hold ends",
              ],
            ]}
          />
          <p>
            The schedule applies to data under our control, including processors acting on our
            instructions. Banks, payment providers and Platforms acting as separate controllers keep
            their own records under their own notices, which the policy does not present as deletion
            controlled by Cartridge Club. Accounts holding Credits are excluded from automatic
            inactivity closure, so Credits are never lost to a deletion routine.
          </p>
        </Section>

        {/* ── 3 ───────────────────────────────────────── */}
        <Section n="3" title="Checkout">
          <h3 className="font-heading text-base">Card statement descriptor</h3>
          <p>
            <strong>Card statement descriptor: CartridgeClub</strong> is shown in the payment panel
            and repeated in the Seller &amp; billing block (“The charge will appear on your card
            statement as CartridgeClub”). It is also stated in the Terms, Payment section, and on the
            Balance top-up screen.
          </p>

          <h3 className="mt-4 font-heading text-base">Statutory withdrawal waiver</h3>
          <p>
            A mandatory checkbox, unticked by default, must be accepted before payment can be
            submitted. It is shown to every customer, not only to EU/UK customers, and is enforced
            both in the form and on the server — a request without the acknowledgement is rejected.
            The checkbox records both the express request for immediate delivery and the
            acknowledgement, and the order confirmation email repeats them so the customer keeps the
            confirmation on a durable medium.
          </p>
          <Quote>
            I understand that by purchasing digital goods and requesting immediate delivery, I waive
            my statutory right of withdrawal once delivery begins.
          </Quote>

          <Fig
            src={`${SHOTS}/07-checkout-card-notices.png`}
            caption="Checkout as first presented: statement descriptor, credits disclosure, and both consent boxes unticked. The Pay button is disabled."
          />
          <Fig
            src={`${SHOTS}/08-checkout-consents-accepted.png`}
            caption="After the customer accepts the terms and the withdrawal waiver, payment becomes available."
          />
        </Section>

        {/* ── 4 ───────────────────────────────────────── */}
        <Section n="4" title="Refund Policy">
          <p>
            The <Lnk href="/refund-policy">Refund and Cancellation Policy</Lnk> has been reviewed
            against each item requested and contains:
          </p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>
              <strong>Refund conditions and exclusions</strong> — invalid, already redeemed, revoked
              or misdescribed keys; non-delivery; pre-orders; third-party gift card codes; customer
              selection errors; and the delivered-key rule.
            </li>
            <li>
              <strong>Technical failures</strong> — payment captured without a key issued, duplicate
              charge, or a delivery system error: redelivery or a full refund at the customer’s
              choice; confirmed duplicate charges refunded to the original payment method without
              deduction.
            </li>
            <li>
              <strong>Response times</strong> (section 16) — acknowledged within 2 business days,
              Monday to Friday excluding public holidays in England and Wales; substantive decision
              within 14 calendar days of receiving the request, with any shorter statutory deadline
              taking precedence.
            </li>
            <li>
              <strong>Refund release</strong> (section 12) — released without undue delay and, for
              applicable UK statutory digital-content refunds, no later than 14 calendar days after
              agreeing entitlement; card refunds go to the original payment route and are not
              replaced with Credits without the customer’s agreement.
            </li>
            <li>
              <strong>Submission window</strong> (section 15) — standard requests within 30 calendar
              days of purchase. This administrative window does not shorten statutory rights, and
              pre-orders and later-discovered problems are not rejected merely because 30 days have
              passed.
            </li>
            <li>
              <strong>Chargeback procedure</strong> (section 13) — customers are encouraged to
              contact support first so we can resolve the issue, but that is expressly not a
              condition of their right to contact their bank or dispute a transaction. No duplicate
              recovery for the same amount; a good-faith dispute is not treated as abuse.
            </li>
            <li>
              <strong>Billing contact</strong> — support@cartridge-club.com, linked in the
              cancellation, chargeback and support sections.
            </li>
            <li>
              <strong>No contradictions on Balance</strong> (section 17) — Credits are not redeemable
              for cash; a payment correction does not create an entitlement to redeem Credits for
              money, and refunds of Credits-funded purchases restore Credits.
            </li>
          </ul>
        </Section>

        {/* ── 5 ───────────────────────────────────────── */}
        <Section n="5" title="Purchase process and order confirmation">
          <p>
            The screenshots below follow one order from the catalogue through the cart, the checkout
            and the pre-payment confirmations to the result of a successful purchase, then show the
            same order in the back office, and finally the Order Confirmation and Payment Receipt the
            customer receives.
          </p>
          <p>
            Card acquiring is not connected yet — that is what this application is for — so the
            example is a test transaction placed with the standard test card number
            4242&nbsp;4242&nbsp;4242&nbsp;4242 and no money moved. Everything else is the live flow:
            the order is created and recorded, the key is delivered, the confirmation email and the
            PDF receipt are generated by the production code, and the order appears in the back
            office exactly as shown.
          </p>

          <h3 className="mt-5 font-heading text-base">5.1 Screenshots of the purchase process</h3>
          <Fig src={`${SHOTS}/01-home.png`} caption="1. Home page — official keys, instant email delivery, payment methods and company details in the footer." />
          <Fig src={`${SHOTS}/02-store-catalogue.png`} caption="2. Catalogue with genre, platform and price filters. Prices include VAT." />
          <Fig src={`${SHOTS}/04-product-page.png`} caption="3. Product page — price including VAT, stock and delivery method, activation instructions, platform and region." />
          <Fig src={`${SHOTS}/05-cart.png`} caption="4. Cart with the selected item and the total." />
          <Fig src={`${SHOTS}/06-checkout-balance-option.png`} caption="5. Checkout — Merchant of Record, company number, registered address, statement descriptor and billing details. Payment by Balance or card." />
          <Fig src={`${SHOTS}/07-checkout-card-notices.png`} caption="6. Card payment selected — credits disclosure, statement descriptor, and both consents unticked." />
          <Fig src={`${SHOTS}/08-checkout-consents-accepted.png`} caption="7. Consents accepted — the customer can now pay. The amount charged is shown on the button." />
          <Fig src={`${SHOTS}/10-order-confirmation.png`} caption="8. Order confirmation — status, item, total paid, the delivered key, and confirmation that a receipt with a PDF invoice was emailed." />
          <Fig src={`${SHOTS}/11-account-order-history.png`} caption="9. Customer account — Balance, Balance activity and order history with status and amounts." />

          <h3 className="mt-5 font-heading text-base">5.2 Order in the back office</h3>
          <Fig src={`${SHOTS}/12-admin-orders-list.png`} caption="10. Order list — order reference, date and time, customer, items, payment method, status and total, with search and status filters." />
          <Fig src={`${SHOTS}/13-admin-order-detail.png`} caption="11. Order detail — items and keys (masked in the back office), fulfilment timeline with payment capture and supplier reference, customer and billing address, and the payment block showing the statement descriptor, Merchant of Record and the consents recorded at checkout." />
          <Fig src={`${SHOTS}/14-admin-customers.png`} caption="12. Customer list — registration date, country, email verification status, order count and Balance." />

          <h3 className="mt-5 font-heading text-base">
            5.3 Sample Order Confirmation / Payment Receipt
          </h3>
          <p>
            After payment the customer receives the confirmation email below. It lists the delivered
            key or keys and the total paid, repeats the card statement descriptor and the
            immediate-supply acknowledgement recorded at checkout, and carries the PDF receipt as an
            attachment. The receipt states the payment status, method, descriptor, amount and date
            alongside the seller and billing details.
          </p>
          <Fig
            src={`${SHOTS}/15-order-confirmation-email.png`}
            caption="13. Order Confirmation email as received by the customer: the delivered key, the total paid, the card statement descriptor, the recorded immediate-supply acknowledgement and the company details."
          />
          <Fig
            src={`${SHOTS}/16-payment-receipt.png`}
            caption="14. The PDF payment receipt attached to that email — payment status, seller and billing details, order reference, line items, total paid, payment method, statement descriptor and payment date."
          />
          <div className="flex flex-wrap gap-2">
            <Download href="/compliance/order-confirmation-email.html">Open the email</Download>
            <Download href="/compliance/invoice.pdf">Open the payment receipt</Download>
          </div>
        </Section>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 border-t-2 border-line pt-6">
      <h2 className="font-display text-2xl">
        <span className="text-cobalt">{n}.</span> {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink/90">{children}</div>
    </section>
  );
}

function Fig({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="mt-4">
      {/* Static evidence images; next/image adds no value for one-off assets. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={caption} loading="lazy" className="cc-outline w-full rounded-xl bg-card" />
      <figcaption className="mt-2 text-xs text-muted">{caption}</figcaption>
    </figure>
  );
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="rounded-xl border-l-4 border-cobalt bg-band px-4 py-3 text-sm">
      {children}
    </blockquote>
  );
}

function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="cc-outline-plate overflow-x-auto rounded-card bg-card">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="border-b-2 border-line text-[0.7rem] uppercase tracking-wide text-muted">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-2.5">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line align-top">
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td key={j} className={`px-4 py-3 ${j === 0 ? "whitespace-nowrap font-heading" : "text-ink/90"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Lnk({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-cobalt hover:underline">
      {children}
    </a>
  );
}

function Attachment({ href, name, note }: { href: string; name: string; note: string }) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-3 py-3">
      <div className="min-w-0">
        <p className="font-heading text-sm">{name}</p>
        <p className="text-xs text-muted">{note}</p>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="cc-outline shrink-0 rounded-lg bg-bg px-3 py-1.5 text-sm hover:bg-band"
      >
        Open ↗
      </a>
    </li>
  );
}

function Download({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="cc-outline rounded-lg bg-card px-3 py-2 text-sm hover:bg-band"
    >
      {children} ↗
    </a>
  );
}
