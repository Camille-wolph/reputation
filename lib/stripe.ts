import Stripe from "stripe";

let client: Stripe | null = null;

export function stripe(): Stripe {
  if (!client) {
    const cle = process.env.STRIPE_SECRET_KEY;
    if (!cle) throw new Error("STRIPE_SECRET_KEY manquante");
    client = new Stripe(cle);
  }
  return client;
}
