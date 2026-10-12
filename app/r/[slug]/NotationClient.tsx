"use client";

import { useState } from "react";

type Etat = "notation" | "redirect" | "formulaire" | "envoye" | "erreur";

function Etoile({
  remplie,
  survol,
  onClick,
  onMouseEnter,
  onMouseLeave,
  index,
}: {
  remplie: boolean;
  survol: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  index: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={`${index + 1} étoile${index > 0 ? "s" : ""}`}
      className="p-1 focus:outline-none"
    >
      <svg
        width="52"
        height="52"
        viewBox="0 0 24 24"
        className={`transition-colors ${remplie || survol ? "text-rose" : "text-nuit/20"}`}
        fill="currentColor"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
      </svg>
    </button>
  );
}

export default function NotationClient({
  etablissementId,
  nom,
  googleUrl,
}: {
  etablissementId: string;
  nom: string;
  googleUrl: string;
}) {
  const [note, setNote] = useState(0);
  const [survol, setSurvol] = useState(0);
  const [etat, setEtat] = useState<Etat>("notation");
  const [message, setMessage] = useState("");
  const [envoi, setEnvoi] = useState(false);

  function choisirNote(n: number) {
    setNote(n);
    if (n >= 4) {
      setEtat("redirect");
      setTimeout(() => {
        window.location.href = googleUrl;
      }, 1500);
    } else {
      setEtat("formulaire");
    }
  }

  async function envoyerRetour(e: React.FormEvent) {
    e.preventDefault();
    setEnvoi(true);
    try {
      const res = await fetch("/api/avis-prive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ etablissementId, note, message }),
      });
      if (res.ok) {
        setEtat("envoye");
      } else {
        setEtat("erreur");
      }
    } catch {
      setEtat("erreur");
    }
    setEnvoi(false);
  }

  if (etat === "redirect") {
    return (
      <main className="mx-auto max-w-sm px-6 py-20 text-center">
        <div className="flex justify-center gap-1">
          {[0,1,2,3,4].map((i) => (
            <svg key={i} width="36" height="36" viewBox="0 0 24 24" className="text-rose" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
            </svg>
          ))}
        </div>
        <p className="mt-6 font-display text-2xl font-bold">Merci pour votre confiance !</p>
        <p className="mt-3 text-encre">Vous allez être redirigé vers Google…</p>
      </main>
    );
  }

  if (etat === "envoye") {
    return (
      <main className="mx-auto max-w-sm px-6 py-20 text-center">
        <p className="font-display text-2xl font-bold">Merci pour votre retour.</p>
        <p className="mt-3 text-encre">
          Nous avons bien reçu votre message. Nous ferons notre possible pour améliorer votre expérience.
        </p>
      </main>
    );
  }

  if (etat === "erreur") {
    return (
      <main className="mx-auto max-w-sm px-6 py-20 text-center">
        <p className="font-display text-2xl font-bold">Une erreur est survenue.</p>
        <p className="mt-3 text-encre">Votre message n'a pas pu être envoyé. Réessayez plus tard.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-sm px-6 py-12">
      <h1 className="font-display text-2xl font-extrabold tracking-tight">
        Comment s'est passée votre visite chez {nom} ?
      </h1>

      {etat === "notation" && (
        <div className="mt-8">
          <p className="text-encre">Touchez une étoile pour noter.</p>
          <div className="mt-4 flex justify-center gap-1">
            {[1,2,3,4,5].map((n) => (
              <Etoile
                key={n}
                index={n - 1}
                remplie={n <= note}
                survol={n <= survol}
                onClick={() => choisirNote(n)}
                onMouseEnter={() => setSurvol(n)}
                onMouseLeave={() => setSurvol(0)}
              />
            ))}
          </div>
        </div>
      )}

      {etat === "formulaire" && (
        <form onSubmit={envoyerRetour} className="mt-8 space-y-4">
          <div className="flex justify-center gap-1">
            {[1,2,3,4,5].map((n) => (
              <svg key={n} width="28" height="28" viewBox="0 0 24 24"
                className={n <= note ? "text-rose" : "text-nuit/20"}
                fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
              </svg>
            ))}
          </div>
          <div>
            <label htmlFor="message" className="block font-bold">
              Qu'est-ce qui n'a pas fonctionné ?
            </label>
            <p className="mt-1 text-sm text-encre">
              Votre retour reste privé et aide {nom} à s'améliorer.
            </p>
            <textarea
              id="message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Décrivez votre expérience…"
              className="mt-2 block w-full rounded-xl border-2 border-nuit/15 px-4 py-3 focus:border-rose focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={envoi}
            className="block w-full rounded-xl bg-nuit px-6 py-3 font-bold text-white hover:bg-nuit/80 disabled:opacity-60"
          >
            {envoi ? "Envoi en cours…" : "Envoyer mon retour"}
          </button>
        </form>
      )}
    </main>
  );
}
