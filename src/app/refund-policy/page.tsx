import { LegalPage, LegalHeading } from "@/components/site/LegalPage";

export const metadata = { title: "Refund Policy — Cartridge Club" };

const EMAIL = process.env.COMPANY_EMAIL ?? "info@cartridge-club.com";

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund Policy">
      <p>
        We want every purchase to work first time. This policy explains when a refund is
        possible for digital keys and gift cards.
      </p>

      <LegalHeading>Unrevealed keys</LegalHeading>
      <p>
        If you have not yet revealed the key and the order is less than 14 days old, contact us
        and we will cancel the order and refund your original payment method or account balance.
      </p>

      <LegalHeading>Faulty or invalid keys</LegalHeading>
      <p>
        If a key does not activate on the stated platform and region, contact us within 7 days
        of delivery. Once verified, we will replace the key or issue a full refund.
      </p>

      <LegalHeading>Revealed keys</LegalHeading>
      <p>
        Because a revealed key can be used immediately, revealed keys are generally
        non-refundable except where the key is faulty as described above.
      </p>

      <LegalHeading>How refunds are paid</LegalHeading>
      <p>
        Refunds are returned to your account balance or original payment method, usually within
        5–10 business days depending on your provider.
      </p>

      <LegalHeading>Request a refund</LegalHeading>
      <p>
        Email{" "}
        <a className="text-cobalt hover:underline" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>{" "}
        with your order number and we will help.
      </p>
    </LegalPage>
  );
}
