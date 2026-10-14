import { LegalPage, LegalHeading, Mail } from "@/components/site/LegalPage";

export const metadata = { title: "Restricted Territories & Compliance Policy — Cartridge Club" };

export default function RestrictedTerritoriesPage() {
  return (
    <LegalPage title="Restricted Territories and Compliance Policy" updated="14 October 2026">
      <p>
        Cartridge Club is generally available internationally, but orders, Account services, Balance
        functions and delivery are not supported in the territories listed in this Policy.
      </p>

      <LegalHeading>1. Restricted Territories</LegalHeading>
      <p>
        1.1 Cartridge Club does not accept or fulfil orders from Afghanistan, Belarus, Central
        African Republic, Cuba, Democratic Republic of the Congo, Haiti, Iran, Iraq, Mali, Myanmar
        (Burma), North Korea, Russia, Somalia, South Sudan, Sudan, Syria, Venezuela, Yemen or
        Zimbabwe.
      </p>
      <p>
        1.2 The restriction applies to persons located in or ordinarily resident in a Restricted
        Territory and to transactions materially connected with a Restricted Territory.
      </p>
      <p>
        1.3 A territory may be unsupported because of law, sanctions, card network or payment
        provider rules, publisher restrictions, fraud exposure, operational limitations or commercial
        risk. Inclusion does not necessarily mean that every transaction with that territory is
        prohibited by law.
      </p>

      <LegalHeading>2. Customer confirmations</LegalHeading>
      <p>
        2.1 By creating an Account, funding Balance or ordering, you confirm that you are not located
        in, ordinarily resident in, or acting on behalf of a person in a Restricted Territory.
      </p>
      <p>
        2.2 You confirm that you are not a person or entity subject to an applicable asset freeze,
        sanctions designation or prohibition that prevents us from providing the service.
      </p>
      <p>
        2.3 You must provide accurate country, billing, Account and payment information and update it
        if circumstances change.
      </p>

      <LegalHeading>3. No circumvention</LegalHeading>
      <p>
        3.1 You must not use a VPN, proxy, remote desktop, false address, third-party Account,
        payment intermediary or other method to conceal location or bypass this Policy.
      </p>
      <p>
        3.2 You must not purchase a Digital Product or fund Balance for delivery, resale or use by a
        person in a Restricted Territory where doing so would bypass our controls.
      </p>
      <p>
        3.3 Circumvention may result in order cancellation, delayed delivery, Balance restriction or
        Account closure, subject to fair investigation and mandatory rights.
      </p>

      <LegalHeading>4. Verification and screening</LegalHeading>
      <p>
        4.1 We may use Account country, IP-derived country, billing information, card issuing
        country, payment signals and other proportionate indicators to assess eligibility.
      </p>
      <p>
        4.2 We may request reasonable information to resolve conflicting location data or a sanctions
        match. Failure to provide necessary information may prevent us from completing the
        transaction.
      </p>
      <p>
        4.3 Screening is used for compliance and risk management and does not guarantee that every
        prohibited attempt will be identified.
      </p>

      <LegalHeading>5. Product-level region restrictions</LegalHeading>
      <p>
        5.1 This Policy is separate from a product’s Platform or activation region. A customer in a
        supported country must still purchase a Key compatible with the relevant country and Platform
        Account.
      </p>
      <p>
        5.2 A product described as region-free remains subject to this Policy, Platform terms,
        sanctions and local law.
      </p>
      <p>5.3 The product page controls where it contains a narrower activation restriction than this Policy.</p>

      <LegalHeading>6. Orders and delivery</LegalHeading>
      <p>
        6.1 We may decline or cancel an order before delivery if Restricted Territory, sanctions or
        related compliance concerns arise.
      </p>
      <p>
        6.2 If we cancel before delivery, authorised funds are released or refunded and Balance
        deductions are restored, subject to payment provider processing.
      </p>
      <p>
        6.3 If circumvention is discovered after a valid Key has been delivered, change-of-mind
        refunds are not guaranteed, but statutory rights concerning faulty or misdescribed content
        remain unaffected.
      </p>

      <LegalHeading>7. Balance</LegalHeading>
      <p>
        7.1 Balance top-ups and purchases using Credits are unavailable where the customer or
        transaction is connected to a Restricted Territory or prohibited person.
      </p>
      <p>
        7.2 We may restrict affected transactions while completing necessary sanctions, identity or
        location checks. Any refund or payment reversal that is legally required is handled through a
        lawful payment route and remains subject to applicable sanctions restrictions.
      </p>
      <p>7.3 Credits cannot be transferred to another Account or used to bypass territory restrictions.</p>

      <LegalHeading>8. Changes to the list</LegalHeading>
      <p>
        8.1 We may add or remove territories when legal, payment, publisher, security or operational
        conditions change.
      </p>
      <p>
        8.2 A change does not retrospectively invalidate a lawfully completed order, but it may
        prevent future orders, top-ups or delivery not yet begun.
      </p>
      <p>
        8.3 Where practicable and lawful, affected Account holders will be informed about outstanding
        orders and the treatment of legitimate remaining Credits, subject to mandatory rights and
        sanctions restrictions. Paid Credits are not automatically forfeited merely because this list
        changes.
      </p>

      <LegalHeading>9. Local law and contact</LegalHeading>
      <p>
        9.1 Customers are responsible for complying with laws applicable to their purchase, import,
        possession, activation and use of Digital Products.
      </p>
      <p>
        9.2 Questions about country availability or a declined transaction may be sent to <Mail />.
      </p>
      <p>
        9.3 Do not send passports, payment card details or other sensitive documents unless support
        specifically requests a secure verification method.
      </p>
    </LegalPage>
  );
}
