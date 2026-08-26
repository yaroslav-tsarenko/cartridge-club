import { LegalPage, LegalHeading } from "@/components/site/LegalPage";

export const metadata = { title: "Privacy Policy — Cartridge Club" };

const COMPANY = process.env.COMPANY_NAME ?? "ALDERROCK LTD";
const ADDRESS = process.env.COMPANY_ADDRESS ?? "";
const EMAIL = process.env.COMPANY_EMAIL ?? "info@cartridge-club.com";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        {COMPANY} (&ldquo;we&rdquo;) is the data controller for personal data collected through
        Cartridge Club. This policy explains what we collect and why.
      </p>

      <LegalHeading>What we collect</LegalHeading>
      <p>
        Account details (name, email, address, date of birth, phone), order history and
        balance transactions, and technical data such as your IP address and session cookies.
        We do not store full card numbers; card payments are handled by our payment processor.
      </p>

      <LegalHeading>How we use it</LegalHeading>
      <p>
        To create and secure your account, process orders and deliver keys, send order
        confirmations and service emails, prevent fraud, and meet our legal obligations.
      </p>

      <LegalHeading>Sharing</LegalHeading>
      <p>
        We share the minimum necessary data with our key supplier to fulfil orders, with our
        payment processor to take payment, and with email providers to deliver receipts. We do
        not sell your personal data.
      </p>

      <LegalHeading>Your rights</LegalHeading>
      <p>
        You may request access to, correction of, or deletion of your personal data, and object
        to certain processing. To exercise these rights, contact us using the details below.
      </p>

      <LegalHeading>Contact</LegalHeading>
      <p>
        {COMPANY}
        {ADDRESS && `, ${ADDRESS}`}. Email{" "}
        <a className="text-cobalt hover:underline" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        .
      </p>
    </LegalPage>
  );
}
