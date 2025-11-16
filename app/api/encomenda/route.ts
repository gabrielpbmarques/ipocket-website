import { NextRequest, NextResponse } from "next/server";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

export const runtime = "nodejs";

// MailerSend API key deve ser definida em .env.local como MAILERSEND_API_KEY
// EMAIL_FROM: remetente padrão (ex: "no-reply@seudominio.com")
// ENCOMENDA_EMAIL_TO: destinatário interno (fallback para EMAIL_FROM)
const MAILERSEND_API_KEY = process.env.MAILERSEND_API_KEY;
const EMAIL_FROM = process.env.MAILERSEND_EMAIL_DEFAULT_FROM;
const EMAIL_TO = process.env.ENCOMENDA_EMAIL_TO || EMAIL_FROM;

// IDs de template MailerSend
const TEMPLATE_INTERNO_ID = "vywj2lpkvd1g7oqz"; // notificação para você
const TEMPLATE_CLIENTE_ID = "3z0vklovn0eg7qrx"; // confirmação para o cliente

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

// Mapeia cor -> caminho de imagem (deve existir em /public/assets/colors)
const COLOR_IMAGE_MAP: Record<string, string> = {
  limao: "/assets/colors/limao.png",
  tangerina: "/assets/colors/tangerina.png",
  roxo: "/assets/colors/roxo.png",
  rosa: "/assets/colors/rosa.png",
  pavao: "/assets/colors/pavao.png",
  safira: "/assets/colors/safira.png",
  canela: "/assets/colors/canela.png",
  preto: "/assets/colors/preto.png",
};

function normalizarCor(cor?: string) {
  if (!cor) return undefined;
  return cor.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function gerarWhatsappLink(whatsapp?: string) {
  if (!whatsapp) return "";
  const digits = whatsapp.replace(/\D+/g, "");
  if (!digits) return "";
  // Brasil: se tiver 11 dígitos já deve estar ok (DDD + 9 + número)
  return `https://wa.me/${digits}`;
}

async function enviarEmailInterno(data: EncomendaData): Promise<void> {
  if (!MAILERSEND_API_KEY || !EMAIL_FROM || !EMAIL_TO) {
    console.warn(
      "MailerSend não configurado. Defina MAILERSEND_API_KEY, MAILERSEND_EMAIL_DEFAULT_FROM e opcional ENCOMENDA_EMAIL_TO."
    );
    return;
  }

  const mailerSend = new MailerSend({ apiKey: MAILERSEND_API_KEY });
  const assunto = `Nova encomenda iPocket Brasil — ${data?.nome || "cliente"}`;
  const from = new Sender(EMAIL_FROM!, "iPocket Brasil");
  const to: Recipient[] = [
    new Recipient(EMAIL_TO!, "Notificação de encomenda iPocket Brasil"),
  ];

  // Variáveis para template conforme exemplo oficial
  const corSlug = normalizarCor(data.cor);
  const imageUrl = corSlug && COLOR_IMAGE_MAP[corSlug] ? COLOR_IMAGE_MAP[corSlug] : "";
  const userName = data.nome || "Cliente";
  const whatsappLink = gerarWhatsappLink(data.whatsapp);

  const emailParams = new EmailParams()
    .setFrom(from)
    .setTo(to)
    .setSubject(assunto)
    .setTemplateId(TEMPLATE_INTERNO_ID);

  if (data?.email) {
    emailParams.setReplyTo(new Sender(data.email, data.nome || data.email));
  }

  // Personalização para templates: usa {{chave}} no template
  emailParams.setPersonalization([
    {
      email: EMAIL_TO!,
      data: {
        imageUrl,
        userName,
        whatsappLink,
        modelo: data.modelo || "-",
        cor: data.cor || "-",
        recebidaEm: new Date().toLocaleString("pt-BR"),
        email: data.email || "-",
        whatsapp: data.whatsapp || "-",
        endereco: data.endereco || "-",
      },
    },
  ]);

  try {
    await mailerSend.email.send(emailParams);
  } catch (error) {
    console.error("Falha ao enviar email MailerSend", error);
  }
}

async function enviarEmailCliente(data: EncomendaData) {
  if (!MAILERSEND_API_KEY || !EMAIL_FROM || !data.email) {
    console.warn(
      "MailerSend não configurado para cliente. Verifique MAILERSEND_API_KEY, MAILERSEND_EMAIL_DEFAULT_FROM e se o cliente informou e-mail."
    );
    return;
  }

  const mailerSend = new MailerSend({ apiKey: MAILERSEND_API_KEY });
  const assunto = "Recebemos sua encomenda iPocket Brasil";
  const from = new Sender(EMAIL_FROM!, "iPocket Brasil");
  const to: Recipient[] = [
    new Recipient(data.email, data.nome || "Cliente iPocket"),
  ];

  const corSlug = normalizarCor(data.cor);
  const imageUrl = corSlug && COLOR_IMAGE_MAP[corSlug] ? COLOR_IMAGE_MAP[corSlug] : "";
  const userName = data.nome || "Cliente";
  const whatsappLink = gerarWhatsappLink(data.whatsapp);

  const emailParams = new EmailParams()
    .setFrom(from)
    .setTo(to)
    .setSubject(assunto)
    .setTemplateId(TEMPLATE_CLIENTE_ID)
    .setReplyTo(from);

  emailParams.setPersonalization([
    {
      email: data.email,
      data: {
        imageUrl,
        userName,
        whatsappLink,
        modelo: data.modelo || "-",
        cor: data.cor || "-",
        recebidaEm: new Date().toLocaleString("pt-BR"),
      },
    },
  ]);

  try {
    await mailerSend.email.send(emailParams);
  } catch (error) {
    console.error("Falha ao enviar email de confirmação ao cliente", error);
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data: EncomendaData = await req.json();
    console.log("Nova encomenda:", data);

    // Envia e-mail interno (para você) e confirmação para o cliente
    enviarEmailInterno(data).catch((e) =>
      console.error("Erro envio MailerSend (interno)", e)
    );
    enviarEmailCliente(data).catch((e) =>
      console.error("Erro envio MailerSend (cliente)", e)
    );

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
