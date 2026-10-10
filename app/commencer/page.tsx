"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CleReponse = "clients" | "avis" | "source";
type Reponses = Record<CleReponse, string>;

const questions: {
  id: CleReponse;
  texte: string;
  options: { valeur: string; label: string }[];
}[] = [
  {
    id: "clients",
    texte: "Combien de clients accueillez-vous par semaine en moyenne ?",
    options: [
      { valeur: "moins10", label: "Moins de 10" },
      { valeur: "10a30", label: "Entre 10 et 30" },
      { valeur: "30a50", label: "Entre 30 et 50" },
      { valeur: "plus50", label: "Plus de 50" },
    ],
  },
  {
    id: "avis",
    texte: "Combien de nouveaux avis Google avez-vous reçus ce mois-ci ?",
    options: [
      { valeur: "zero", label: "Aucun" },
      { valeur: "1a2", label: "1 à 2" },
      { valeur: "3a5", label: "3 à 5" },
      { valeur: "plus5", label: "Plus de 5" },
    ],
  },
  {
    id: "source",
    texte: "Comment obtenez-vous actuellement vos nouveaux clients ?",
    options: [
      { valeur: "bouche", label: "Bouche à oreille" },
      { valeur: "google", label: "Ma fiche Google" },
      { valeur: "reseaux", label: "Les réseaux sociaux" },
      { valeur: "sais_pas", label: "Je ne sais pas vraiment" },
    ],
  },
];

export default function Commencer() {
  const router = useRouter();
  const [etape, setEtape] = useState(0);
  const [reponses, setReponses] = useState<Partial<Reponses>>({});

  const question = questions[etape];
  const progression = Math.round((etape / questions.length) * 100);

  function choisir(valeur: string) {
    const nouvellesReponses = { ...reponses, [question.id]: valeur };
    setReponses(nouvellesReponses);
    if (etape < questions.length - 1) {
      setEtape(etape + 1);
    } else {
      const params = new URLSearchParams(nouvellesReponses as Record<string, string>);
      router.push("/resultat?" + params.toString());
    }
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <div className="mb-8">
        <div className="mb-2 flex justify-between text-sm text-encre">
          <span>Question {etape + 1} sur {questions.length}</span>
          <span>{progression === 0 ? "Début" : progression + " %"}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-fond">
          <div
            className="h-2 rounded-full bg-rose transition-all duration-300"
            style={{ width: progression + "%" }}
            role="progressbar"
            aria-valuenow={progression}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
      <h1 className="font-display text-2xl font-extrabold leading-snug tracking-tight sm:text-3xl">
        {question.texte}
      </h1>
      <div className="mt-8 space-y-3">
        {question.options.map((option) => (
          <button
            key={option.valeur}
            type="button"
            onClick={() => choisir(option.valeur)}
            className="block w-full rounded-xl border-2 border-nuit/15 bg-white px-6 py-4 text-left font-bold hover:border-rose hover:bg-fond active:scale-[0.98]"
          >
            {option.label}
          </button>
        ))}
      </div>
    </main>
  );
}
