import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Votre résultat — Réputation",
  robots: { index: false },
};

const clientsParMois: Record<string, number> = {
  moins10: 30,
  "10a30": 80,
  "30a50": 160,
  plus50: 200,
};

const avisRecus: Record<string, number> = {
  zero: 0,
  "1a2": 1,
  "3a5": 4,
  plus5: 6,
};

const sourcesLabels: Record<string, string> = {
  bouche: "le bouche à oreille",
  google: "votre fiche Google",
  reseaux: "les réseaux sociaux",
  sais_pas: "des sources difficiles à identifier",
};

export default async function Resultat({
  searchParams,
}: {
  searchParams: Promise<{ clients?: string; avis?: string; source?: string }>;
}) {
  const { clients = "10a30", avis = "zero", source = "bouche" } = await searchParams;

  const mensuel = clientsParMois[clients] ?? 80;
  const avisActuels = avisRecus[avis] ?? 0;
  const avisManques = mensuel - avisActuels;
  const sourceLabel = sourcesLabels[source] ?? "diverses sources";
  const gainEstime = Math.round(mensuel * 0.15 * 39);

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Voici ce que vos chiffres révèlent.
      </h1>

      <div className="mt-8 space-y-4">
        <div className="rounded-xl bg-fond p-6">
          <p className="text-lg leading-relaxed">
            Vous accueillez environ{" "}
            <strong className="text-nuit">{mensuel} clients par mois</strong>.
            Ce mois-ci, vous avez reçu{" "}
            <strong className="text-nuit">
              {avisActuels === 0 ? "aucun avis" : avisActuels + " avis"}
            </strong>{" "}
            sur Google.
          </p>
          <p className="mt-3 text-lg leading-relaxed">
            Cela veut dire que{" "}
            <strong className="text-rose">{avisManques} clients satisfaits</strong>{" "}
            sont repartis sans laisser de trace sur votre fiche. Ils ont apprécié
            votre travail, mais personne ne le sait.
          </p>
        </div>

        <div className="rounded-xl border-2 border-rose p-6">
          <p className="font-display text-xl font-bold">Ce que ça vous coûte</p>
          <p className="mt-2 leading-relaxed text-encre">
            Vous trouvez vos clients grâce à {sourceLabel}. Une fiche Google mieux
            notée attire en moyenne 15 % de contacts en plus. Sur votre volume,
            cela représente potentiellement{" "}
            <strong className="text-nuit">
              {gainEstime} € de chiffre d'affaires supplémentaire par mois
            </strong>
            , pour un abonnement à 39 €.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <p className="font-display text-xl font-bold">
          Un aperçu de ce que Réputation ferait pour vous
        </p>
        <div className="mt-4 rounded-xl border border-nuit/15 bg-white p-6">
          <p className="font-bold">Votre lien personnalisé (exemple)</p>
          <div className="mt-2 rounded-lg bg-fond px-4 py-3 font-mono text-sm text-encre">
            reputation-kappa.vercel.app/r/votre-etablissement
          </div>
          <p className="mt-4 leading-relaxed text-encre">
            Vous partagez ce lien après chaque prestation, ou vous affichez le QR
            code à votre caisse. Le client arrive directement sur votre fiche
            Google. Deux jours plus tard, ceux qui n'ont pas encore noté reçoivent
            un rappel automatique.
          </p>
          <div className="mt-4 rounded-lg border-l-4 border-rose bg-fond p-4 text-sm text-encre">
            La suite est disponible après activation : tableau de bord, alertes
            sur les retours privés, relances automatiques configurables.
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Link
          href="/offre"
          className="block w-full rounded-xl bg-rose px-8 py-4 text-center text-lg font-bold text-white hover:bg-rose-fonce sm:inline-block sm:w-auto"
        >
          Activer Réputation — 39 € / mois
        </Link>
        <p className="mt-3 text-sm text-encre">
          Satisfait ou remboursé 14 jours. Sans engagement.
        </p>
      </div>
    </main>
  );
}
