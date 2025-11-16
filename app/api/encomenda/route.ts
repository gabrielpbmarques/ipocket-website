import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// MailerSend API key deve ser definida em .env.local como MAILERSEND_API_KEY
// (Não é recomendado hardcodear a chave no código-fonte.)
const MAILERSEND_API_KEY = process.env.MAILERSEND_API_KEY;
const EMAIL_FROM = process.env.MAILERSEND_EMAIL_DEFAULT_FROM; // ex: "no-reply@seudominio.com"
const EMAIL_TO = process.env.ENCOMENDA_EMAIL_TO || EMAIL_FROM; // destinatário da notificação interna

interface EncomendaData {
  nome?: string;
  email?: string;
  whatsapp?: string;
  modelo?: string;
  cor?: string;
  endereco?: string;
  cep?: string;
  [k: string]: unknown;
}

function montarResumo(data: EncomendaData) {
  return [
    `Nome: ${data?.nome ?? "-"}`,
    `E-mail: ${data?.email ?? "-"}`,
    `WhatsApp: ${data?.whatsapp ?? "-"}`,
    `Modelo: ${data?.modelo ?? "-"}`,
    `Cor: ${data?.cor ?? "-"}`,
    data?.endereco ? `Endereço: ${data.endereco}` : undefined,
    data?.cep ? `CEP: ${data.cep}` : undefined,
  ]
    .filter(Boolean)
    .join("\n");
}

function montarHtml(resumo: string) {
  return `
    <h2 style="margin:0 0 8px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto;">Nova encomenda iPocket Brasil</h2>
    <p style="white-space:pre-line;margin:0 0 16px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto;">${resumo}</p>
    <p style="color:#71717a;font-size:12px;margin:0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto;">Recebida via site · ${new Date().toLocaleString("pt-BR")}</p>
  `;
}

async function enviarEmail(data: EncomendaData) {
  if (!MAILERSEND_API_KEY || !EMAIL_FROM || !EMAIL_TO) {
    console.warn(
      "MailerSend não configurado. Defina MAILERSEND_API_KEY, MAILERSEND_EMAIL_DEFAULT_FROM e opcional ENCOMENDA_EMAIL_TO."
    );
    return;
  }

  const assunto = `Nova encomenda iPocket Brasil — ${data?.nome || "cliente"}`;
  const resumo = montarResumo(data);
  const html = montarHtml(resumo);

  // Estrutura conforme documentação MailerSend
  const payload: Record<string, unknown> = {
    from: { email: EMAIL_FROM },
    to: [{ email: EMAIL_TO }],
    subject: assunto,
    text: resumo,
    html,
    reply_to: data?.email ? { email: data.email } : undefined,
  };

  // Remove chaves undefined para payload limpo
  Object.keys(payload).forEach((k) => {
    if (payload[k] === undefined) delete payload[k];
  });

  const res = await fetch("https://api.mailersend.com/v1/email", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MAILERSEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "(sem corpo)");
    console.error("Falha ao enviar email MailerSend", res.status, body);
  }
}

export async function POST(req: NextRequest) {
  try {
    const data: EncomendaData = await req.json();
    console.log("Nova encomenda:", data);

    // Envia email (não bloqueia resposta caso dê erro)
    enviarEmail(data).catch((e) => console.error("Erro envio MailerSend", e));

    return NextResponse.json({
      ok: true,
      message:
        "Recebemos sua encomenda! Em breve entraremos em contato pelo WhatsApp com os dados para pagamento via PIX e prazo estimado de entrega.",
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, message: "Erro ao processar.", error: String(e) },
      { status: 400 }
    );
  }
}
