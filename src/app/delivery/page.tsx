import { LegalPage, LegalHeading, Mail } from "@/components/site/LegalPage";

export const metadata = { title: "Digital Delivery & Activation Policy — Cartridge Club" };

export default function DeliveryPage() {
  return (
    <LegalPage title="Digital Delivery and Activation Policy" updated="14 October 2026">
      <p>
        Cartridge Club supplies digital products electronically. This Policy explains the delivery
        channel, timing, customer responsibilities and the process for resolving delivery or
        activation problems.
      </p>

      <LegalHeading>1. Electronic delivery only</LegalHeading>
      <p>
        1.1 All products covered by this Policy are supplied digitally. No disc, cartridge, printed
        card or other physical item is shipped.
      </p>
      <p>
        1.2 An in-stock Key or code is sent to the email address provided for the order after
        successful payment and order approval.
      </p>
      <p>1.3 The order confirmation and Key delivery may be contained in the same email or in separate emails.</p>

      <LegalHeading>2. Delivery timing</LegalHeading>
      <p>
        2.1 Approved in-stock orders are normally delivered promptly after payment. A product page
        may state a different estimated timing for a pre-order or special product.
      </p>
      <p>
        2.2 Delivery may be delayed by payment authentication, fraud screening, manual review,
        supplier allocation, high demand, Platform maintenance, email service disruption or events
        outside our reasonable control.
      </p>
      <p>
        2.3 An estimated delivery time is not a guarantee unless we expressly agree a fixed deadline.
        We will take reasonable steps to deliver without undue delay.
      </p>

      <LegalHeading>3. Correct email address</LegalHeading>
      <p>
        3.1 You must provide and maintain a complete, accurate and accessible email address. Review
        the address before confirming payment.
      </p>
      <p>
        3.2 We are not responsible for delay caused solely by an incorrect address supplied by you,
        but support will make reasonable efforts to verify the order and correct an obvious mistake.
      </p>
      <p>
        3.3 For security, a request to change the delivery address after payment may require Account,
        identity and payment verification.
      </p>

      <LegalHeading>4. When delivery is completed</LegalHeading>
      <p>
        4.1 Delivery is completed when the Key or code is successfully dispatched to the order email
        address or supplied through another delivery method expressly agreed with you.
      </p>
      <p>
        4.2 An email filter, full inbox, local device issue or failure to check the correct mailbox
        does not by itself mean that dispatch failed.
      </p>
      <p>
        4.3 If our records indicate a bounce or other failed transmission, we will take reasonable
        steps to contact you or resend after verification.
      </p>

      <LegalHeading>5. Pre-order delivery</LegalHeading>
      <p>
        5.1 A pre-order Key is delivered when the publisher or supplier releases the relevant
        inventory to us and the order passes required checks.
      </p>
      <p>
        5.2 Delivery may occur before, on or shortly after the advertised release time. Time zones,
        regional release schedules, preload arrangements and publisher changes may affect timing.
      </p>
      <p>
        5.3 Bonus, beta, preload or early-access entitlements are supplied only when specifically
        included on the Cartridge Club product page.
      </p>

      <LegalHeading>6. Activation</LegalHeading>
      <p>
        6.1 The product page or delivery email identifies the applicable Platform and may provide
        general activation guidance.
      </p>
      <p>
        6.2 You must sign in to or create the appropriate third-party Platform account and comply
        with its terms, age requirements, country settings and security procedures.
      </p>
      <p>
        6.3 Enter the Key only on the official Platform identified for the product. We will never ask
        you to send a password, one-time authentication code or full payment card information to
        activate a product.
      </p>

      <LegalHeading>7. Compatibility and region</LegalHeading>
      <p>
        7.1 Before ordering, verify the Platform, region, edition, language, operating system,
        hardware, subscription and Account requirements shown on the product page.
      </p>
      <p>
        7.2 A Key may be restricted by the customer’s location, Platform Account country, device type
        or publisher rules even if the website is accessible from that location.
      </p>
      <p>
        7.3 Using a VPN, proxy, false address or other method to bypass a product or country
        restriction is prohibited and may cause activation failure or Account action by the Platform.
      </p>

      <LegalHeading>8. Protecting delivered Keys</LegalHeading>
      <p>
        8.1 Treat every delivered Key as confidential until redeemed. Anyone who obtains the code may
        be able to redeem it irreversibly.
      </p>
      <p>
        8.2 Do not publish, forward, resell or expose a Key. We are not responsible for redemption by
        a third party after you voluntarily or negligently disclose the Key, except where we failed
        to use reasonable care.
      </p>
      <p>8.3 Contact us promptly if you believe a delivery email or Account has been compromised.</p>

      <LegalHeading>9. Missing or faulty delivery</LegalHeading>
      <p>
        9.1 If an email is missing, check spam, junk, promotions, quarantine and inbox rules, then
        contact support with the order number.
      </p>
      <p>
        9.2 If a Key is invalid, previously redeemed, revoked or incorrect, capture the exact
        Platform error and contact support before making repeated activation attempts.
      </p>
      <p>
        9.3 We may coordinate with the supplier or Platform to validate the Key. Remedies are
        provided under the Refund and Cancellation Policy and mandatory law.
      </p>

      <LegalHeading>10. Support</LegalHeading>
      <p>
        10.1 Delivery and activation support is available by email at <Mail />.
      </p>
      <p>
        10.2 Include the order number, product, Platform, error message and relevant screenshots.
        Remove passwords, authentication codes and full card details before sending evidence.
      </p>
      <p>
        10.3 Third-party Platform support may be required where the issue concerns a Platform
        Account, regional setting, service outage or publisher restriction rather than the supplied
        Key.
      </p>
    </LegalPage>
  );
}
