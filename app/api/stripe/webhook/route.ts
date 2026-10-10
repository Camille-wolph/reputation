import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");
  if (!secret || !signature) {
    return NextResponse.json({ error: "Configuration manquante" }, { status: 400 });
  }

  const corps = await req.text();
  let evenement: Stripe.Event;
  try {
    evenement = stripe().webhooks.constructEvent(corps, signature, secret);
  } catch {
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  switch (evenement.type) {
    case "checkout.session.completed": {
      const s = evenement.data.object as Stripe.Checkout.Session;
      console.log("[paiement confirmé]", s.id, s.amount_total, s.subscription);
      break;
    }
    case "invoice.payment_failed": {
      const f = evenement.data.object as Stripe.Invoice;
      console.log("[paiement échoué]", f.id);
      break;
    }
    case "customer.subscription.deleted": {
      const a = evenement.data.object as Stripe.Subscription;
      console.log("[abonnement résilié]", a.id);
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
