import { LegalPage, LegalHeading, Mail } from "@/components/site/LegalPage";

export const metadata = { title: "Cookie Policy — Cartridge Club" };

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" updated="14 October 2026">
      <p>
        This Cookie Policy explains how Cartridge Club uses cookies and similar technologies and how
        visitors can control non-essential technologies.
      </p>

      <LegalHeading>1. What cookies are</LegalHeading>
      <p>
        1.1 Cookies are small data files stored or accessed on a browser or device. Similar
        technologies include local storage, pixels, tags and software development kit identifiers.
      </p>
      <p>
        1.2 Some technologies are required for a requested service, while others support preferences,
        analytics or advertising.
      </p>
      <p>1.3 This Policy should be read with the Privacy Policy.</p>

      <LegalHeading>2. Who uses cookies</LegalHeading>
      <p>
        2.1 First-party cookies are set by Cartridge Club. Third-party technologies may be provided
        by service providers acting for us or by separate controllers.
      </p>
      <p>
        2.2 The live cookie settings tool identifies available categories and provides the current
        details of relevant technologies, providers, purposes and durations.
      </p>
      <p>2.3 A third party may also describe its processing in its own privacy or cookie information.</p>

      <LegalHeading>3. Strictly necessary cookies</LegalHeading>
      <p>
        3.1 Necessary cookies support security, fraud prevention, network management, session
        continuity, Account login, cart functions, checkout and consent choices.
      </p>
      <p>
        3.2 These technologies are used because they are necessary to provide a service requested by
        the user or to secure that service and are not used for unrelated advertising.
      </p>
      <p>
        3.3 Blocking necessary cookies through browser settings may prevent Account access, cart use,
        payment or other core functions.
      </p>

      <LegalHeading>4. Preference and functionality cookies</LegalHeading>
      <p>
        4.1 Preference technologies may remember display settings, language, supported currency,
        interface choices and other optional features.
      </p>
      <p>
        4.2 Where a preference technology is not strictly necessary, it is used only with the consent
        required by applicable law.
      </p>
      <p>4.3 Removing a preference cookie may require the user to select the setting again.</p>

      <LegalHeading>5. Analytics cookies</LegalHeading>
      <p>
        5.1 Analytics technologies help us understand visits, navigation, errors, performance and
        aggregate use of Cartridge Club.
      </p>
      <p>5.2 Where required, analytics technologies are disabled until the visitor provides consent.</p>
      <p>
        5.3 We seek to minimise collected data and use aggregated or truncated information where
        reasonably available.
      </p>

      <LegalHeading>6. Advertising and measurement</LegalHeading>
      <p>
        6.1 Advertising or measurement technologies may help attribute campaigns, limit repeated
        adverts or measure whether marketing led to a visit or purchase.
      </p>
      <p>
        6.2 These technologies may involve identifiers or interaction data shared with advertising or
        measurement providers and are used only where the required consent has been obtained.
      </p>
      <p>
        6.3 Rejecting advertising cookies does not prevent all advertising but should prevent
        Cartridge Club from using rejected technologies on the device.
      </p>

      <LegalHeading>7. Email technologies</LegalHeading>
      <p>
        7.1 Marketing emails may contain pixels or tagged links that indicate delivery, opening or
        interaction where lawful and configured.
      </p>
      <p>
        7.2 A recipient may unsubscribe from marketing at any time. Device or email settings may also
        block remote images.
      </p>
      <p>
        7.3 Transactional messages about orders, security, Balance or support are not converted into
        marketing merely because technical delivery information is recorded.
      </p>

      <LegalHeading>8. Consent</LegalHeading>
      <p>
        8.1 On the first relevant visit, the cookie interface allows the visitor to accept, reject or
        manage non-essential categories.
      </p>
      <p>
        8.2 Consent must be a freely given, specific and informed positive choice. Non-essential
        categories are not treated as accepted merely because the visitor continues browsing.
      </p>
      <p>
        8.3 A consent choice is recorded for a limited period and may be requested again when it
        expires or the technologies materially change.
      </p>

      <LegalHeading>9. Managing cookies</LegalHeading>
      <p>9.1 You may change non-essential choices through the cookie settings link available on Cartridge Club.</p>
      <p>
        9.2 Browser controls can delete or block cookies, although blocking necessary cookies may
        impair website functions.
      </p>
      <p>
        9.3 Withdrawal of consent does not affect processing that occurred lawfully before
        withdrawal, but the relevant non-essential technology will be disabled for future use on that
        device where technically possible.
      </p>

      <LegalHeading>10. Duration</LegalHeading>
      <p>
        10.1 A session cookie normally expires when the browser session ends. A persistent cookie
        remains until its stated expiry or earlier deletion.
      </p>
      <p>10.2 The cookie settings tool provides the current duration or duration criterion for individual technologies.</p>
      <p>
        10.3 We review durations and avoid retaining cookie identifiers longer than necessary for
        their disclosed purpose.
      </p>

      <LegalHeading>11. Changes and contact</LegalHeading>
      <p>11.1 We may update this Policy when technologies, providers, purposes or legal requirements change.</p>
      <p>
        11.2 Questions about cookies or privacy may be sent to <Mail />.
      </p>
      <p>11.3 The current Policy and effective date will be published on Cartridge Club.</p>
    </LegalPage>
  );
}
