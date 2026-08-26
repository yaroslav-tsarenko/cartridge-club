import type { Metadata } from "next";
import { Anton, Archivo, Archivo_Black } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { CookieConsent } from "@/components/site/CookieConsent";
import { CURRENCIES, DEFAULT_CURRENCY, type CurrencyCode } from "@/lib/currency";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://cartridge-club.com"),
  title: "Cartridge Club — Great games. Real keys. Instant joy.",
  description:
    "A modern collector's store for official game keys. Instant email delivery, official distributors, collector-approved. Buying a game here feels like an event.",
  icons: { icon: "/favicon.svg" },
};

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('cc-theme');
    var dark = stored ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const stored = cookieStore.get("cc_currency")?.value as CurrencyCode | undefined;
  const currency = stored && CURRENCIES[stored] ? stored : DEFAULT_CURRENCY;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${archivoBlack.variable} ${anton.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers currency={currency}>
          {children}
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
