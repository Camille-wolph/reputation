import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

const PRIX: Record<string, string | undefined> = {
  monthly: process.env.STRIPE_PRICE_MONTHLY,
  annual: process.env.STRIPE_PRICE_ANNUAL,
};

export async function POST(req: Request) {
  let plan: unknown;
  try {
    plan = (await req.json())?.plan;
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }
  if (plan !== "monthly" && plan !== "annual") {
    return NextResponse.json({ error: "Formule inconnue" }, { status: 400 });
  }
  const prix = PRIX[plan];
  if (!prix) {
    return NextResponse.json({ error: "Formule indisponible" }, { status: 500 });
  }

  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

  try {
    const session = await stripe().checkout.sessions.create({
      ui_mode: "embedded",
      mode: "subscription",
      line_items: [{ price: prix, quantity: 1 }],
      return_url: `${base}/merci?session_id={CHECKOUT_SESSION_ID}`,
      locale: "fr",
    });
    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (e) {
    console.error("[checkout] échec de création de session", e);
    return NextResponse.json({ error: "Paiement indisponible" }, { status: 500 });
  }
}
