import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const { etablissementId, note, message } = body as {
    etablissementId?: string;
    note?: number;
    message?: string;
  };

  if (
    typeof etablissementId !== "string" ||
    typeof note !== "number" ||
    note < 1 || note > 5 ||
    typeof message !== "string" ||
    message.trim().length === 0
  ) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  const supabase = supabaseAdmin();
  const { error } = await supabase.from("avis_prives").insert({
    etablissement_id: etablissementId,
    note,
    message: message.trim(),
  });

  if (error) {
    console.error("[avis-prive]", error);
    return NextResponse.json({ error: "Enregistrement échoué" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
