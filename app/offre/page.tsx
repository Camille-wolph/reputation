import type { Metadata } from "next";
import Formules from "./Formules";

export const metadata: Metadata = {
  title: "Votre plan est prêt — Réputation",
  description:
    "Activez Réputation : lien et QR code, relance automatique, tableau de bord. Satisfait ou remboursé 14 jours.",
  robots: { index: false },
};

const contact = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

const questions = [
  {
    q: "Est-ce que ça marche pour mon activité ?",
    r: "Réputation est fait pour les professionnels de proximité qui ont une fiche Google : toiletteurs, pensions, éducateurs, vétérinaires, mais aussi coiffeurs ou instituts. Si vos clients peuvent vous noter sur Google, ça fonctionne.",
  },
  {
    q: "Combien de temps ça me prend ?",
    r: "Il n’y a rien à installer : nous configurons votre compte avec vous, par email. Ensuite, un geste par client, montrer le QR code ou envoyer le lien. La relance part toute seule.",
  },
  {
    q: "Que se passe-t-il si je veux arrêter ?",
    r: "Vous résiliez à tout moment, sans frais ni justification. L’abonnement s’arrête à la fin de la période déjà payée. Et pendant 14 jours, vous pouvez demander un remboursement complet.",
  },
  {
    q: "À quoi sert exactement ce que je paie ?",
    r: "À un outil qui récolte vos avis à votre place : lien et QR code, relance automatique après deux jours, retours privés et tableau de bord avec alertes. Nous ne publions rien à votre place.",
  },
];

export default function Offre() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
        Voilà votre plan, prêt.
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-encre">
        Un lien et un QR code à donner après chaque prestation, une relance automatique
        au bout de deux jours, un tableau de bord avec alertes. Il ne reste qu’à l’activer.
      </p>

      <div className="mt-6 rounded-xl border-2 border-rose bg-fond p-5">
        <h2 className="font-display text-xl font-bold">Satisfait ou remboursé, 14 jours</h2>
        <p className="mt-2 leading-relaxed">
          Si Réputation ne vous convient pas, écrivez-nous dans les 14 jours qui suivent
          votre paiement{contact ? <> à <strong>{contact}</strong></> : " par email (adresse dans les mentions légales)"}.
          Vous êtes remboursé intégralement sous 5 jours ouvrés, sans justification.
        </p>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-encre">
        Vous rejoignez Réputation dès son lancement (accès fondateur) : nous configurons
        votre compte avec vous par email, et les nouveautés sont incluses.
      </p>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold tracking-tight">
          Le prix, comparé à ce que ça peut rapporter
        </h2>
        <p className="mt-3 max-w-xl leading-relaxed text-encre">
          39 € par mois, c’est 1,28 € par jour. Si votre prestation moyenne coûte plus de
          39 €, un seul client de plus par mois suffit à couvrir l’abonnement.
        </p>
      </section>

      <Formules />

      <section className="mt-14" aria-labelledby="titre-faq">
        <h2 id="titre-faq" className="font-display text-2xl font-bold tracking-tight">
          Vos questions
        </h2>
        <div className="mt-4 divide-y divide-nuit/10 border-y border-nuit/10">
          {questions.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="cursor-pointer list-none font-bold">{item.q}</summary>
              <p className="mt-2 leading-relaxed text-encre">{item.r}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
