import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commencer — Réputation",
  robots: { index: false },
};

export default function Commencer() {
  return (
    <main className="mx-auto max-w-xl px-6 py-20">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">
        Ouverture très bientôt
      </h1>
      <p className="mt-4 leading-relaxed text-encre">
        Le parcours de démarrage est en cours de finition. Revenez dans
        quelques jours.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-xl bg-nuit px-6 py-3 font-bold text-white"
      >
        Retour à l’accueil
      </Link>
    </main>
  );
}
