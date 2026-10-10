"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

type Plan = "annual" | "monthly";
type Etat =
  | { statut: "chargement" }
  | { statut: "pret"; secret: string }
  | { statut: "erreur" };

const cle = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = cle ? loadStripe(cle) : null;

const formules = [
  {
    id: "annual" as Plan,
    nom: "Annuel",
    prix: "390 €",
    periode: "par an",
    detail: "Soit 32,50 € par mois, ou 1,07 € par jour",
    badge: "2 mois offerts",
  },
  {
    id: "monthly" as Plan,
    nom: "Mensuel",
    prix: "39 €",
    periode: "par mois",
    detail: "Soit 1,28 € par jour",
    badge: null,
  },
];

export default function Formules() {
  const [plan, setPlan] = useState<Plan>("annual");
  const [etat, setEtat] = useState<Etat>({ statut: "chargement" });
  const [essai, setEssai] = useState(0);

  useEffect(() => {
    let annule = false;
    setEtat({ statut: "chargement" });
    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (annule) return;
        if (d?.clientSecret) setEtat({ statut: "pret", secret: d.clientSecret });
        else setEtat({ statut: "erreur" });
      })
      .catch(() => {
        if (!annule) setEtat({ statut: "erreur" });
      });
    return () => {
      annule = true;
    };
  }, [plan, essai]);

  return (
    <section aria-labelledby="titre-formules" className="mt-12">
      <h2
        id="titre-formules"
        className="font-display text-2xl font-bold tracking-tight sm:text-3xl"
      >
        Choisissez votre formule
      </h2>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {formules.map((f) => {
          const actif = plan === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={actif}
              onClick={() => setPlan(f.id)}
              className={`rounded-xl border-2 p-5 text-left ${
                actif ? "border-rose bg-white ring-2 ring-rose/20" : "border-nuit/15 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold">{f.nom}</span>
                {f.badge && (
                  <span className="rounded-full bg-rose px-3 py-1 text-xs font-bold text-white">
                    {f.badge}
                  </span>
                )}
              </div>
              <p className="mt-3">
                <span className="font-display text-3xl font-extrabold">{f.prix}</span>{" "}
                <span className="text-encre">{f.periode}</span>
              </p>
              <p className="mt-1 text-sm text-encre">{f.detail}</p>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-center font-bold">
        Sans engagement, résiliable à tout moment.
      </p>

      <div className="mt-4 min-h-[320px]">
        {!stripePromise && (
          <p role="alert" className="rounded-xl bg-fond p-5">
            Le paiement n’est pas disponible pour le moment. Revenez dans quelques minutes.
          </p>
        )}
        {stripePromise && etat.statut === "chargement" && (
          <p className="p-5 text-encre">Chargement du paiement sécurisé…</p>
        )}
        {stripePromise && etat.statut === "erreur" && (
          <div role="alert" className="rounded-xl bg-fond p-5">
            <p>Le paiement n’a pas pu se charger. Ce n’est pas de votre faute.</p>
            <button
              type="button"
              onClick={() => setEssai((n) => n + 1)}
              className="mt-4 rounded-xl bg-rose px-6 py-3 font-bold text-white"
            >
              Réessayer
            </button>
          </div>
        )}
        {stripePromise && etat.statut === "pret" && (
          <EmbeddedCheckoutProvider
            key={etat.secret}
            stripe={stripePromise}
            options={{ fetchClientSecret: () => Promise.resolve(etat.secret) }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        )}
      </div>

      <p className="mt-4 text-center text-sm text-encre">
        Paiement sécurisé par Stripe. Vos données de carte ne passent jamais par nos serveurs.
      </p>
    </section>
  );
}
