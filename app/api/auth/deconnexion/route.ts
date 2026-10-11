import { NextResponse } from "next/server";
import { supabaseServeur } from "@/lib/supabase-server";

export async function POST(req: Request) {
  const supabase = await supabaseServeur();
  await supabase.auth.signOut();
  const origin = new URL(req.url).origin;
  return NextResponse.redirect(`${origin}/connexion`, { status: 303 });
}
