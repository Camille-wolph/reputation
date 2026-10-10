import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Réputation — Plus d'avis Google, sans relancer un par un",
  description:
    "Réputation envoie un lien ou un QR code après chaque prestation et relance automatiquement vos clients. Bientôt disponible.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-white text-neutral-900 antialiased">{children}</body>
    </html>
  );
}
