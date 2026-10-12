import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import NotationClient from "./NotationClient";

export const metadata: Metadata = {
  title: "Donnez votre avis — Réputation",
  robots: { index: false },
};

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}

export default async function PageNotation({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = supabaseAdmin();

  const { data: etablissement } = await supabase
    .from("etablissements")
    .select("id, nom, google_url, abonnement_actif")
    .eq("slug", slug)
    .single();

  if (!etablissement || !etablissement.abonnement_actif) {
    notFound();
  }

  return (
    <NotationClient
      etablissementId={etablissement.id}
      nom={etablissement.nom}
      googleUrl={etablissement.google_url ?? "https://www.google.com/maps"}
    />
  );
}
