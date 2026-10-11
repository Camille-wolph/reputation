"use client";

import { useState } from "react";
import { supabaseClient } from "@/lib/supabase-client";
import type { Metadata } from "next";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [etat, setEtat] = useState<"idle" | "envoi" | "envoye" | "erreur">("idle");

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setEtat("envoi");
    const supabase = supabaseClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
    if (error) {
      setEtat("erreur");
    } else {
      setEtat("envoye");
    }
  }

  return (
    <main className="mx-auto max-w-sm px-6 py-20">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">
        Se connecter
      </h1>
      <p className="mt-3 text-encre">
        Entrez votre email. Nous vous envoyons un lien de connexion, sans mot
        de passe à retenir.
      </p>

      {etat === "envoye" ? (
        <div className="mt-8 rounded-xl bg-fond p-6">
          <p className="font-bold">Vérifiez votre boîte mail.</p>
          <p className="mt-2 text-encre">
            Un lien de connexion vient d'être envoyé à{" "}
            <strong>{email}</strong>. Il est valable 10 minutes.
          </p>
        </div>
      ) : (
        <form onSubmit={envoyer} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="block font-bold">
              Adresse email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.fr"
              className="mt-2 block w-full rounded-xl border-2 border-nuit/15 px-4 py-3 focus:border-rose focus:outline-none"
            />
          </div>
          {etat === "erreur" && (
            <p role="alert" className="text-sm text-rose">
              Une erreur est survenue. Vérifiez votre email et réessayez.
            </p>
          )}
          <button
            type="submit"
            disabled={etat === "envoi"}
            className="block w-full rounded-xl bg-rose px-6 py-3 font-bold text-white hover:bg-rose-fonce disabled:opacity-60"
          >
            {etat === "envoi" ? "Envoi en cours…" : "Recevoir mon lien de connexion"}
          </button>
        </form>
      )}
    </main>
  );
}
