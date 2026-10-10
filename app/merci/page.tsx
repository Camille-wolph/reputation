import type { Metadata } from "next";
import Link from "next/link";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Merci — Réputation",
  robots: { index: false },
};

export default async function Merci({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  let paye = false;
  let email: string | null = null;

  if (typeof session_id === "string" && session_id.startsWith("cs_")) {
    try {
      const s = await stripe().checkout.sessions.retrieve(session_id);
      paye = s.status === "complete" && s.payment_status === "paid";
      email = s.customer_details?.email ?? null;
    } catch {
      paye = false;
    }
  }

  if (!paye) {
    return (
      <main className="mx-auto max-w-xl px-6 py-20">
        <h1 className="font-display text-3xl font-extrabold tracking-tight">
          Le paiement n’a pas abouti
        </h1>
        <p className="mt-4 leading-relaxed text-encre">
          Vous pouvez réessayer, avec la même carte ou une autre. Si le problème continue,
          écrivez-nous : nous réglons ça avec vous.
        </p>
        <Link
          href="/offre"
          className="mt-8 inline-block rounded-xl bg-rose px-6 py-3 font-bold text-white"
        >
          Réessayer le paiement
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-20">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">
        Merci, c’est réglé.
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-encre">
        Nous vous écrivons{email ? <> à <strong>{email}</strong></> : ""} sous 48 heures
        ouvrées pour configurer votre accès avec vous. Rien d’autre à faire de votre côté.
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
