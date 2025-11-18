/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) throw new Error("STRIPE_SECRET_KEY ausente no ambiente.");
  return new Stripe(secret);
}

const PRICE_MAP: Record<string, number> = {
  curta: 29990,
  longa: 59990,
};

export async function POST(req: Request) {
  try {
    const { modelo } = await req.json();
    if (!modelo || !PRICE_MAP[modelo]) {
      return NextResponse.json({ error: "Modelo inválido." }, { status: 400 });
    }
    const stripe = getStripe();
    const intent = await stripe.paymentIntents.create({
      amount: PRICE_MAP[modelo],
      currency: "brl",
      automatic_payment_methods: { enabled: true, allow_redirects: "always" },
      payment_method_options: {
        card: { installments: { enabled: true } },
        boleto: { expires_after_days: 3 },
      },
      metadata: { modelo },
    });
    return NextResponse.json({ clientSecret: intent.client_secret, paymentIntentId: intent.id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { paymentIntentId, metadata, description } = body as {
      paymentIntentId?: string;
      metadata?: Record<string, string>;
      description?: string;
    };
    if (!paymentIntentId) {
      return NextResponse.json({ error: "paymentIntentId ausente." }, { status: 400 });
    }
    const stripe = getStripe();
    await stripe.paymentIntents.update(paymentIntentId, {
      metadata: metadata || {},
      ...(description ? { description } : {}),
    });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
