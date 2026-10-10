"use client";

import Link from "next/link";

export default function Erreur({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto max-w-xl px-6 py-20">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">
        Un problème est survenu
      </h1>
      <p className="mt-4 leading-relaxed text-encre">
        Ce n’est pas de votre faute. Réessayez, ou revenez à l’accueil.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={() => reset()}
          className="rounded-xl bg-rose px-6 py-3 font-bold text-white"
        >
          Réessayer
        </button>
        <Link
          href="/"
          className="rounded-xl border border-nuit px-6 py-3 font-bold"
        >
          Retour à l’accueil
        </Link>
      </div>
    </main>
  );
}
