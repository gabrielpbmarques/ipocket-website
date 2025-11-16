import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Placeholder: here you'd persist and/or notify via email/WhatsApp
    console.log("Nova encomenda:", data);
    return NextResponse.json({
      ok: true,
      message:
        "Recebemos sua encomenda! Em breve entraremos em contato pelo WhatsApp com os dados para pagamento via PIX e prazo estimado de entrega.",
    });
  } catch (e) {
    return NextResponse.json({ ok: false, message: "Erro ao processar.", error: String(e) }, { status: 400 });
  }
}
