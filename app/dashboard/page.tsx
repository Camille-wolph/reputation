import { redirect } from "next/navigation";
import { supabaseServeur } from "@/lib/supabase-server";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tableau de bord — Réputation",
  robots: { index: false },
};

export default async function Dashboard() {
  const supabase = await supabaseServeur();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  const { data: etablissements } = await supabase
    .from("etablissements")
    .select("*")
    .eq("profile_id", user.id)
    .order("created_at", { ascending: false });

  const aAuMoinsUnEtablissement = etablissements && etablissements.length > 0;

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-extrabold tracking-tight">
          Tableau de bord
        </h1>
        <form action="/api/auth/deconnexion" method="post">
          <button
            type="submit"
            className="rounded-lg border border-nuit/15 px-4 py-2 text-sm text-encre hover:bg-fond"
          >
            Se déconnecter
          </button>
        </form>
      </div>
      <p className="mt-1 text-encre">{user.email}</p>

      {!aAuMoinsUnEtablissement ? (
        <div className="mt-12 rounded-xl border-2 border-dashed border-nuit/20 p-10 text-center">
          <p className="font-display text-xl font-bold">Votre compte est en cours de configuration.</p>
          <p className="mt-3 text-encre">
            Nous vous écrivons sous 48 heures ouvrées pour finaliser votre accès.
            Si vous avez une question, répondez simplement à notre email.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {etablissements.map((e) => (
            <div key={e.id} className="rounded-xl border border-nuit/15 p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-bold">{e.nom}</h2>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    e.abonnement_actif
                      ? "bg-green-100 text-green-800"
                      : "bg-fond text-encre"
                  }`}
                >
                  {e.abonnement_actif ? "Actif" : "Inactif"}
                </span>
              </div>
              {e.google_url && (
                <p className="mt-2 text-sm text-encre">
                  Fiche Google :{" "}
                  <a
                    href={e.google_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Voir la fiche
                  </a>
                </p>
              )}
              <div className="mt-4 rounded-lg bg-fond p-4">
                <p className="text-sm font-bold">Votre lien de notation</p>
                <p className="mt-1 font-mono text-sm text-encre">
                  {process.env.NEXT_PUBLIC_SITE_URL ?? "https://reputation-kappa.vercel.app"}/r/{e.slug}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
