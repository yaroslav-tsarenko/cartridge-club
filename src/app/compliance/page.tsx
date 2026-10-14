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
      <Header />
      <main id="main" className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <p className="cc-tag text-[0.65rem] text-muted">For payment provider review</p>
        <h1 className="mt-2 font-display text-4xl">Compliance pack</h1>
        <p className="mt-3 text-sm text-muted">
          ALDERROCK LTD · Company No. 17381132 · Dept 6984, 196 High Road, Wood Green, London,
          N22 8HH, United Kingdom · Billing contact{" "}
          <a className="text-cobalt hover:underline" href="mailto:info@cartridge-club.com">
            info@cartridge-club.com
          </a>{" "}
          · Last updated 13 October 2026
        </p>

        <p className="mt-5 text-sm leading-relaxed text-ink/90">
          This page documents the changes made to the website and contains the requested purchase
          example: the customer journey, the order as it appears in the back office, and the Order
          Confirmation email and invoice the customer receives after payment.
        </p>

        <div className="cc-outline-plate mt-6 rounded-card bg-card p-5">
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
              note="The PDF invoice attached to that email"
            />
            <Attachment
              href={`${SHOTS}/13-admin-order-detail.png`}
              name="screenshots/ (15 files)"
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
                'Rewritten. The former “Withdrawal of available Balance” section is replaced by “No cash-out, no transfer”. Eligibility, currency conversion, refunds, payment reversals, security, account closure and records no longer reference withdrawals.',
              ],
              [
                <Lnk key="t" href="/terms">/terms</Lnk>,
                "The Balance clause no longer offers withdrawal through customer support and now carries the non-transferable-credits wording. The Payment section states the card statement descriptor.",
              ],
              [
                <Lnk key="p" href="/privacy">/privacy</Lnk>,
                "“Balance and withdrawals” renamed to “Balance”; the policy states that no payout instructions or third-party beneficiary data are processed.",
              ],
              [
                <Lnk key="r" href="/refund-policy">/refund-policy</Lnk>,
                "Credits cannot be withdrawn, cashed out, paid to a bank account or transferred. Where mandatory law or a confirmed error requires a reimbursement, it goes to the original payment method only.",
              ],
              [
                <span key="o" className="flex flex-wrap gap-x-1">
                  <Lnk href="/pre-orders">/pre-orders</Lnk>,{" "}
                  <Lnk href="/restricted-territories">/restricted-territories</Lnk>
                </span>,
                "Remaining withdrawal references replaced: refunded amounts return to Balance and stay usable for purchases.",
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
              ["Account and profile data", "24 months after account closure or last interaction"],
              [
                "Orders, invoices, Balance transactions, payment records",
                "6 years from the end of the financial year (Companies Act 2006 s.388, HMRC); up to 10 years where an EU member state’s VAT rules require it. Delivered keys masked after 12 months",
              ],
              ["Customer support and complaint correspondence", "24 months after the ticket closes, or until a related dispute ends"],
              ["Fraud, chargeback and dispute evidence", "6 years"],
              ["Security, access and technical logs", "12 months; 30 days for routine logs without a security event"],
              ["Password reset / email verification tokens", "1 hour / 24 hours, deleted on use or expiry"],
              [
                "Marketing and consent records",
                "Until opt-out or 24 months without interaction; hashed suppression record kept while marketing operates; cookie consent 12 months",
              ],
              ["Analytics and cookie data", "13 months"],
              [
                "Backups and disaster recovery copies",
                "Encrypted, rolling 35-day cycle, automatically overwritten. Data deleted from live systems, including after an erasure request, disappears from backups within 35 days",
              ],
            ]}
          />
          <p>
            The policy also covers legal holds: where an erasure request or an expiring retention
            period conflicts with a statutory obligation, an unresolved dispute, a live fraud
            investigation or a limitation period, processing is restricted instead of deleted, the
            data is deleted once the obligation ends, and the customer is told that this applies.
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
            The same acknowledgement is required for a Balance top-up.
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
            The <Lnk href="/refund-policy">Refund, Cancellation and Withdrawal Policy</Lnk> has been
            reviewed against each item requested and contains:
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
              <strong>Response times</strong> — acknowledged within 2 business days, substantive
              decision within 14 days of receiving the information needed to investigate.
            </li>
            <li>
              <strong>Submission window</strong> — refund and dispute requests within 30 days of
              purchase, longer where mandatory consumer law provides.
            </li>
            <li>
              <strong>Chargeback procedure</strong> — contact support first, no duplicate recovery
              for the same transaction, handling of abusive chargebacks, without limiting the right
              to dispute an unauthorised transaction.
            </li>
            <li>
              <strong>Billing contact</strong> — info@cartridge-club.com, linked in the
              technical-failure, cancellation, chargeback and dispute sections.
            </li>
            <li>
              <strong>No contradictions on Balance</strong> — credits are non-withdrawable;
              reimbursement, where legally required, is made to the original payment method only.
            </li>
          </ul>
        </Section>

        {/* ── 5 ───────────────────────────────────────── */}
        <Section n="5" title="Purchase example">
          <p>
            The screenshots below follow one order from the catalogue to the delivered key, then show
            the same order in the back office, and finally the Order Confirmation email and the PDF
            invoice the customer receives. The card number shown is the standard test number
            4242&nbsp;4242&nbsp;4242&nbsp;4242.
          </p>

          <h3 className="mt-5 font-heading text-base">5.1 Customer journey</h3>
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

          <h3 className="mt-5 font-heading text-base">5.3 Order Confirmation and invoice</h3>
          <p>
            After payment the customer receives the confirmation email below with the key or keys,
            the total paid, and the PDF invoice attached.
          </p>
          <Fig src={`${SHOTS}/15-order-confirmation-email.png`} caption="13. Order Confirmation email as received by the customer, with the company details in the footer." />
          <div className="flex flex-wrap gap-2">
            <Download href="/compliance/order-confirmation-email.html">Open the email</Download>
            <Download href="/compliance/invoice.pdf">Open the invoice</Download>
          </div>
        </Section>
      </main>
      <Footer />
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
