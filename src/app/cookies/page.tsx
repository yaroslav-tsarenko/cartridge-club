import { LegalPage, LegalHeading } from "@/components/site/LegalPage";

export const metadata = { title: "Cookie Policy — Cartridge Club" };

const EMAIL = "info@cartridge-club.com";

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" updated="26 August 2026">
      <p>
        This Cookie Policy explains how Cartridge Club uses cookies and similar technologies and how
        visitors can control non-essential technologies.
      </p>

      <LegalHeading>What cookies are</LegalHeading>
      <p>
        Cookies are small data files stored or accessed on a browser or device. Similar technologies
        include local storage, pixels, tags and software development kit identifiers.
      </p>
      <p>
        Some technologies are required for a requested service, while others support preferences,
        analytics or advertising.
      </p>
      <p>This Policy should be read with the Privacy Policy.</p>

      <LegalHeading>Who uses cookies</LegalHeading>
      <p>
        First-party cookies are set by Cartridge Club. Third-party technologies may be provided by
        service providers acting for us or by separate controllers.
      </p>
      <p>
        The live cookie settings tool identifies available categories and provides the current details
        of relevant technologies, providers, purposes and durations.
      </p>
      <p>A third party may also describe its processing in its own privacy or cookie information.</p>

      <LegalHeading>Strictly necessary cookies</LegalHeading>
      <p>
        Necessary cookies support security, fraud prevention, network management, session continuity,
        Account login, cart functions, checkout and consent choices.
      </p>
      <p>
        These technologies are used because they are necessary to provide a service requested by the
        user or to secure that service and are not used for unrelated advertising.
      </p>
      <p>
        Blocking necessary cookies through browser settings may prevent Account access, cart use,
        payment or other core functions.
      </p>

      <LegalHeading>Preference and functionality cookies</LegalHeading>
      <p>
        Preference technologies may remember display settings, language, supported currency, interface
        choices and other optional features.
      </p>
      <p>
        Where a preference technology is not strictly necessary, it is used only with the consent
        required by applicable law.
      </p>
      <p>Removing a preference cookie may require the user to select the setting again.</p>

      <LegalHeading>Analytics cookies</LegalHeading>
      <p>
        Analytics technologies help us understand visits, navigation, errors, performance and
        aggregate use of Cartridge Club.
      </p>
      <p>Where required, analytics technologies are disabled until the visitor provides consent.</p>
      <p>
        We seek to minimise collected data and use aggregated or truncated information where reasonably
        available.
      </p>

      <LegalHeading>Advertising and measurement</LegalHeading>
      <p>
        Advertising or measurement technologies may help attribute campaigns, limit repeated adverts or
        measure whether marketing led to a visit or purchase.
      </p>
      <p>
        These technologies may involve identifiers or interaction data shared with advertising or
        measurement providers and are used only where the required consent has been obtained.
      </p>
      <p>
        Rejecting advertising cookies does not prevent all advertising but should prevent Cartridge
        Club from using rejected technologies on the device.
      </p>

      <LegalHeading>Email technologies</LegalHeading>
      <p>
        Marketing emails may contain pixels or tagged links that indicate delivery, opening or
        interaction where lawful and configured.
      </p>
      <p>
        A recipient may unsubscribe from marketing at any time. Device or email settings may also block
        remote images.
      </p>
      <p>
        Transactional messages about orders, security, Balance or support are not converted into
        marketing merely because technical delivery information is recorded.
      </p>

      <LegalHeading>Consent</LegalHeading>
      <p>
        On the first relevant visit, the cookie interface allows the visitor to accept, reject or
        manage non-essential categories.
      </p>
      <p>
        Consent must be a freely given, specific and informed positive choice. Non-essential categories
        are not treated as accepted merely because the visitor continues browsing.
      </p>
      <p>
        A consent choice is recorded for a limited period and may be requested again when it expires or
        the technologies materially change.
      </p>

      <LegalHeading>Managing cookies</LegalHeading>
      <p>You may change non-essential choices through the cookie settings link available on Cartridge Club.</p>
      <p>
        Browser controls can delete or block cookies, although blocking necessary cookies may impair
        website functions.
      </p>
      <p>
        Withdrawal of consent does not affect processing that occurred lawfully before withdrawal, but
        the relevant non-essential technology will be disabled for future use on that device where
        technically possible.
      </p>

      <LegalHeading>Duration</LegalHeading>
      <p>
        A session cookie normally expires when the browser session ends. A persistent cookie remains
        until its stated expiry or earlier deletion.
      </p>
      <p>The cookie settings tool provides the current duration or duration criterion for individual technologies.</p>
      <p>We review durations and avoid retaining cookie identifiers longer than necessary for their disclosed purpose.</p>

      <LegalHeading>Changes and contact</LegalHeading>
      <p>We may update this Policy when technologies, providers, purposes or legal requirements change.</p>
      <p>
        Questions about cookies or privacy may be sent to{" "}
        <a className="text-cobalt hover:underline" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        .
      </p>
      <p>The current Policy and effective date will be published on Cartridge Club.</p>
    </LegalPage>
  );
}
