import { LegalPage, LegalHeading } from "@/components/site/LegalPage";

export const metadata = { title: "Terms & Conditions — Cartridge Club" };

const COMPANY = process.env.COMPANY_NAME ?? "ALDERROCK LTD";
const NUMBER = process.env.COMPANY_NUMBER ?? "";
const ADDRESS = process.env.COMPANY_ADDRESS ?? "";
const EMAIL = process.env.COMPANY_EMAIL ?? "info@cartridge-club.com";

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions">
      <p>
        These terms govern your use of Cartridge Club, an online store operated by{" "}
        {COMPANY}
        {NUMBER && ` (Company No. ${NUMBER})`}
        {ADDRESS && `, ${ADDRESS}`}. By placing an order you agree to these terms.
      </p>

      <LegalHeading>1. Products & delivery</LegalHeading>
      <p>
        We sell digital game keys and gift cards for third-party platforms. Keys are
        delivered by email and shown in your account after a successful purchase. Delivery is
        typically instant; in rare cases an order may take a little longer to process.
      </p>

      <LegalHeading>2. Prices & payment</LegalHeading>
      <p>
        Prices are shown in your selected currency and include our retail margin. Payment is
        taken from your account balance or by card at checkout. We reserve the right to
        correct pricing errors and to refuse or cancel an order where a key cannot be fulfilled.
      </p>

      <LegalHeading>3. Activation & compatibility</LegalHeading>
      <p>
        Keys are region- and platform-specific where stated on the product page. It is your
        responsibility to check activation region and platform before purchase. A revealed or
        used key is treated as delivered.
      </p>

      <LegalHeading>4. Refunds</LegalHeading>
      <p>
        Refund eligibility is described in our Refund Policy. Because keys are supplied as
        digital goods, statutory withdrawal rights may not apply once a key has been revealed.
      </p>

      <LegalHeading>5. Accounts</LegalHeading>
      <p>
        You are responsible for keeping your account credentials secure and for all activity
        under your account. We may suspend accounts involved in fraud or abuse.
      </p>

      <LegalHeading>6. Trademarks</LegalHeading>
      <p>
        Steam, Epic Games, Xbox, PlayStation, Nintendo and other names are trademarks of their
        respective owners. Cartridge Club is an independent retailer and is not affiliated with
        or endorsed by these companies.
      </p>

      <LegalHeading>7. Contact</LegalHeading>
      <p>
        Questions about these terms? Email{" "}
        <a className="text-cobalt hover:underline" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        .
      </p>
    </LegalPage>
  );
}
