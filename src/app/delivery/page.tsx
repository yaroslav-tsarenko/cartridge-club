import { LegalPage, LegalHeading } from "@/components/site/LegalPage";

export const metadata = { title: "Digital Delivery & Activation Policy — Cartridge Club" };

const EMAIL = "info@cartridge-club.com";

export default function DeliveryPage() {
  return (
    <LegalPage title="Digital Delivery and Activation Policy" updated="26 August 2026">
      <p>
        Cartridge Club supplies digital products electronically. This Policy explains the delivery
        channel, timing, customer responsibilities and the process for resolving delivery or
        activation problems.
      </p>

      <LegalHeading>Electronic delivery only</LegalHeading>
      <p>
        All products covered by this Policy are supplied digitally. No disc, cartridge, printed card or
        other physical item is shipped.
      </p>
      <p>
        An in-stock Key or code is sent to the email address provided for the order after successful
        payment and order approval.
      </p>
      <p>The order confirmation and Key delivery may be contained in the same email or in separate emails.</p>

      <LegalHeading>Delivery timing</LegalHeading>
      <p>
        Approved in-stock orders are normally delivered promptly after payment. A product page may
        state a different estimated timing for a pre-order or special product.
      </p>
      <p>
        Delivery may be delayed by payment authentication, fraud screening, manual review, supplier
        allocation, high demand, Platform maintenance, email service disruption or events outside our
        reasonable control.
      </p>
      <p>
        An estimated delivery time is not a guarantee unless we expressly agree a fixed deadline. We
        will take reasonable steps to deliver without undue delay.
      </p>

      <LegalHeading>Correct email address</LegalHeading>
      <p>
        You must provide and maintain a complete, accurate and accessible email address. Review the
        address before confirming payment.
      </p>
      <p>
        We are not responsible for delay caused solely by an incorrect address supplied by you, but
        support will make reasonable efforts to verify the order and correct an obvious mistake.
      </p>
      <p>
        For security, a request to change the delivery address after payment may require Account,
        identity and payment verification.
      </p>

      <LegalHeading>When delivery is completed</LegalHeading>
      <p>
        Delivery is completed when the Key or code is successfully dispatched to the order email
        address or supplied through another delivery method expressly agreed with you.
      </p>
      <p>
        An email filter, full inbox, local device issue or failure to check the correct mailbox does
        not by itself mean that dispatch failed.
      </p>
      <p>
        If our records indicate a bounce or other failed transmission, we will take reasonable steps to
        contact you or resend after verification.
      </p>

      <LegalHeading>Pre-order delivery</LegalHeading>
      <p>
        A pre-order Key is delivered when the publisher or supplier releases the relevant inventory to
        us and the order passes required checks.
      </p>
      <p>
        Delivery may occur before, on or shortly after the advertised release time. Time zones,
        regional release schedules, preload arrangements and publisher changes may affect timing.
      </p>
      <p>
        Bonus, beta, preload or early-access entitlements are supplied only when specifically included
        on the Cartridge Club product page.
      </p>

      <LegalHeading>Activation</LegalHeading>
      <p>The product page or delivery email identifies the applicable Platform and may provide general activation guidance.</p>
      <p>
        You must sign in to or create the appropriate third-party Platform account and comply with its
        terms, age requirements, country settings and security procedures.
      </p>
      <p>
        Enter the Key only on the official Platform identified for the product. We will never ask you to
        send a password, one-time authentication code or full payment card information to activate a
        product.
      </p>

      <LegalHeading>Compatibility and region</LegalHeading>
      <p>
        Before ordering, verify the Platform, region, edition, language, operating system, hardware,
        subscription and Account requirements shown on the product page.
      </p>
      <p>
        A Key may be restricted by the customer’s location, Platform Account country, device type or
        publisher rules even if the website is accessible from that location.
      </p>
      <p>
        Using a VPN, proxy, false address or other method to bypass a product or country restriction is
        prohibited and may cause activation failure or Account action by the Platform.
      </p>

      <LegalHeading>Protecting delivered Keys</LegalHeading>
      <p>Treat every delivered Key as confidential until redeemed. Anyone who obtains the code may be able to redeem it irreversibly.</p>
      <p>
        Do not publish, forward, resell or expose a Key. We are not responsible for redemption by a
        third party after you voluntarily or negligently disclose the Key, except where we failed to
        use reasonable care.
      </p>
      <p>Contact us promptly if you believe a delivery email or Account has been compromised.</p>

      <LegalHeading>Missing or faulty delivery</LegalHeading>
      <p>
        If an email is missing, check spam, junk, promotions, quarantine and inbox rules, then contact
        support with the order number.
      </p>
      <p>
        If a Key is invalid, previously redeemed, revoked or incorrect, capture the exact Platform
        error and contact support before making repeated activation attempts.
      </p>
      <p>
        We may coordinate with the supplier or Platform to validate the Key. Remedies are provided
        under the Refund, Cancellation and Withdrawal Policy and mandatory law.
      </p>

      <LegalHeading>Support</LegalHeading>
      <p>
        Delivery and activation support is available by email at{" "}
        <a className="text-cobalt hover:underline" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        .
      </p>
      <p>
        Include the order number, product, Platform, error message and relevant screenshots. Remove
        passwords, authentication codes and full card details before sending evidence.
      </p>
      <p>
        Third-party Platform support may be required where the issue concerns a Platform Account,
        regional setting, service outage or publisher restriction rather than the supplied Key.
      </p>
    </LegalPage>
  );
}
