import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Source_Sans_3 } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const titre = "Réputation — Vos clients sont contents. Votre fiche Google ne le sait pas.";
const description =
  "Un lien ou un QR code après chaque prestation, une relance automatique deux jours plus tard : récoltez des avis Google sans y penser.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: titre,
  description,
  openGraph: {
    title: titre,
    description,
    type: "website",
    locale: "fr_FR",
    siteName: "Réputation",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const liens = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "CGV" },
  { href: "/confidentialite", label: "Confidentialité" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${display.variable} ${body.variable} flex min-h-screen flex-col bg-white font-sans text-nuit antialiased`}
      >
        <div className="flex-1">{children}</div>
        <footer className="border-t border-nuit/10 bg-white px-6 py-8 text-sm text-encre">
          <nav
            aria-label="Informations légales"
            className="mx-auto flex max-w-3xl flex-wrap gap-x-6"
          >
            {liens.map((l) => (
              <Link key={l.href} href={l.href} className="py-2 underline">
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="mx-auto mt-2 max-w-3xl">© 2026 Réputation</p>
        </footer>
      </body>
    </html>
  );
}
