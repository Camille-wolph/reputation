import Link from "next/link";

function Etoiles({ taille = 36 }: { taille?: number }) {
  return (
    <div className="flex gap-1" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          width={taille}
          height={taille}
          viewBox="0 0 24 24"
          className="text-rose"
          fill="currentColor"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
        </svg>
      ))}
    </div>
  );
}

function Bouton() {
  return (
    <Link
      href="/commencer"
      className="block w-full rounded-xl bg-rose px-8 py-4 text-center text-lg font-bold text-white hover:bg-rose-fonce sm:inline-block sm:w-auto"
    >
      Commencer, c’est gratuit
    </Link>
  );
}

const benefices = [
  {
    titre: "Un lien ou un QR code, à donner après la prestation",
    texte:
      "Vous le montrez à la caisse, vous l’envoyez par message. Le client arrive directement sur votre fiche Google, en deux touches.",
  },
  {
    titre: "Une relance automatique au bout de deux jours",
    texte:
      "Les clients qui n’ont pas eu le temps reçoivent un rappel poli. Vous n’avez rien à écrire, rien à planifier.",
  },
  {
    titre: "Une alerte quand quelqu’un n’est pas satisfait",
    texte:
      "Chaque client peut aussi vous écrire en privé. Vous êtes prévenu et vous pouvez rattraper la situation avant qu’elle devienne un avis public.",
  },
];

export default function Accueil() {
  return (
    <main>
      <section className="mx-auto max-w-3xl px-6 pb-14 pt-12 sm:pt-20">
        <Etoiles />
        <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          Vos clients sont contents. Votre fiche Google ne le sait pas.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-encre">
          Réputation envoie un lien après chaque visite, puis relance vos
          clients deux jours plus tard. Vous récoltez des avis sans y penser.
        </p>
        <div className="mt-8">
          <Bouton />
          <p className="mt-3 text-sm text-encre">
            Sans carte bancaire. Pour toiletteurs, pensions, éducateurs et
            vétérinaires.
          </p>
        </div>
      </section>

      <section className="bg-fond px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Seuls les mécontents prennent le temps d’écrire.
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-encre">
            Un client déçu laisse un avis en cinq minutes. Un client content
            referme la porte et passe à autre chose. Votre note finit par ne
            plus refléter votre travail, et celui qui cherche un professionnel
            près de chez lui appelle le mieux noté, pas forcément le meilleur.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-encre">
            Relancer chaque client à la main, personne n’en a le temps.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Ce que Réputation fait à votre place
          </h2>
          <div className="mt-8 space-y-8">
            {benefices.map((b) => (
              <div key={b.titre} className="border-l-4 border-rose pl-5">
                <h3 className="font-display text-xl font-bold">{b.titre}</h3>
                <p className="mt-2 max-w-xl leading-relaxed text-encre">
                  {b.texte}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-xl text-sm leading-relaxed text-encre">
            Dans les règles : Google interdit de trier les clients selon leur
            note. Réputation ne le fait pas. Tout le monde peut laisser un avis
            public.
          </p>
        </div>
      </section>

      <section className="bg-nuit px-6 py-14 text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Votre prochaine note se joue cette semaine.
          </h2>
          <div className="mt-8">
            <Bouton />
          </div>
        </div>
      </section>
    </main>
  );
}
