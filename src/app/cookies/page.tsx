import { LegalPage, LegalHeading } from "@/components/site/LegalPage";

export const metadata = { title: "Cookie Policy — Cartridge Club" };

const EMAIL = process.env.COMPANY_EMAIL ?? "info@cartridge-club.com";

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy">
      <p>
        Cookies are small files stored on your device. We use a small number of them to keep the
        site working and to remember your preferences.
      </p>

      <LegalHeading>Essential cookies</LegalHeading>
      <p>
        Used to keep you signed in (your session) and to secure checkout. The site cannot
        function without these, so they are always on.
      </p>

      <LegalHeading>Preference cookies</LegalHeading>
      <p>
        Remember your selected currency and theme so the store looks the way you left it. These
        store only your choice, not personal data.
      </p>

      <LegalHeading>Managing cookies</LegalHeading>
      <p>
        You can clear or block cookies in your browser settings. Blocking essential cookies will
        prevent sign-in and checkout from working.
      </p>

      <LegalHeading>Contact</LegalHeading>
      <p>
        Questions? Email{" "}
        <a className="text-cobalt hover:underline" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        .
      </p>
    </LegalPage>
  );
}
