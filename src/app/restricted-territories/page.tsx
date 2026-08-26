import { LegalPage, LegalHeading } from "@/components/site/LegalPage";

export const metadata = { title: "Restricted Territories & Compliance Policy — Cartridge Club" };

const EMAIL = "info@cartridge-club.com";

export default function RestrictedTerritoriesPage() {
  return (
    <LegalPage title="Restricted Territories and Compliance Policy" updated="26 August 2026">
      <p>
        Cartridge Club is generally available internationally, but orders, Account services, Balance
        functions and delivery are not supported in the territories listed in this Policy.
      </p>

      <LegalHeading>Restricted Territories</LegalHeading>
      <p>
        Cartridge Club does not accept or fulfil orders from Afghanistan, Belarus, Central African
        Republic, Cuba, Democratic Republic of the Congo, Haiti, Iran, Iraq, Mali, Myanmar (Burma),
        North Korea, Russia, Somalia, South Sudan, Sudan, Syria, Venezuela, Yemen or Zimbabwe.
      </p>
      <p>
        The restriction applies to persons located in or ordinarily resident in a Restricted Territory
        and to transactions materially connected with a Restricted Territory.
      </p>
      <p>
        A territory may be unsupported because of law, sanctions, card network or payment provider
        rules, publisher restrictions, fraud exposure, operational limitations or commercial risk.
        Inclusion does not necessarily mean that every transaction with that territory is prohibited by
        law.
      </p>

      <LegalHeading>Customer confirmations</LegalHeading>
      <p>By creating an Account, funding Balance or ordering, you confirm that you are not located in, ordinarily resident in, or acting on behalf of a person in a Restricted Territory.</p>
      <p>You confirm that you are not a person or entity subject to an applicable asset freeze, sanctions designation or prohibition that prevents us from providing the service.</p>
      <p>You must provide accurate country, billing, Account and payment information and update it if circumstances change.</p>

      <LegalHeading>No circumvention</LegalHeading>
      <p>You must not use a VPN, proxy, remote desktop, false address, third-party Account, payment intermediary or other method to conceal location or bypass this Policy.</p>
      <p>You must not purchase a Digital Product or fund Balance for delivery, resale or use by a person in a Restricted Territory where doing so would bypass our controls.</p>
      <p>Circumvention may result in order cancellation, delayed delivery, Balance restriction or Account closure, subject to fair investigation and mandatory rights.</p>

      <LegalHeading>Verification and screening</LegalHeading>
      <p>We may use Account country, IP-derived country, billing information, card issuing country, payment signals and other proportionate indicators to assess eligibility.</p>
      <p>We may request reasonable information to resolve conflicting location data or a sanctions match. Failure to provide necessary information may prevent us from completing the transaction.</p>
      <p>Screening is used for compliance and risk management and does not guarantee that every prohibited attempt will be identified.</p>

      <LegalHeading>Product-level region restrictions</LegalHeading>
      <p>This Policy is separate from a product’s Platform or activation region. A customer in a supported country must still purchase a Key compatible with the relevant country and Platform Account.</p>
      <p>A product described as region-free remains subject to this Policy, Platform terms, sanctions and local law.</p>
      <p>The product page controls where it contains a narrower activation restriction than this Policy.</p>

      <LegalHeading>Orders and delivery</LegalHeading>
      <p>We may decline or cancel an order before delivery if Restricted Territory, sanctions or related compliance concerns arise.</p>
      <p>If we cancel before delivery, authorised funds are released or refunded and Balance deductions are restored, subject to payment provider processing.</p>
      <p>If circumvention is discovered after a valid Key has been delivered, change-of-mind refunds are not guaranteed, but statutory rights concerning faulty or misdescribed content remain unaffected.</p>

      <LegalHeading>Balance</LegalHeading>
      <p>Balance top-ups, purchases and withdrawals are unavailable where the customer or transaction is connected to a Restricted Territory or prohibited person.</p>
      <p>We may temporarily hold a withdrawal while completing sanctions, identity, payment-source or location checks required by law or proportionate risk controls.</p>
      <p>We will not transfer Balance to a third party or to an unsupported destination as a means of bypassing this Policy.</p>

      <LegalHeading>Changes to the list</LegalHeading>
      <p>We may add or remove territories when legal, payment, publisher, security or operational conditions change.</p>
      <p>A change does not retrospectively invalidate a lawfully completed order, but it may prevent future orders, top-ups or delivery not yet begun.</p>
      <p>Where practicable, affected Account holders will be given information about available Balance withdrawal or outstanding orders, subject to legal restrictions.</p>

      <LegalHeading>Local law and contact</LegalHeading>
      <p>Customers are responsible for complying with laws applicable to their purchase, import, possession, activation and use of Digital Products.</p>
      <p>
        Questions about country availability or a declined transaction may be sent to{" "}
        <a className="text-cobalt hover:underline" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        .
      </p>
      <p>Do not send passports, payment card details or other sensitive documents unless support specifically requests a secure verification method.</p>
    </LegalPage>
  );
}
