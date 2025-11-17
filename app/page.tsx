import { HeroSection } from "@/components/sections/HeroSection";
import { ComoFuncionaSection } from "@/components/sections/ComoFuncionaSection";
import { PorqueAgoraSection } from "@/components/sections/PorqueAgoraSection";
import { DesignMateriaisSection } from "@/components/sections/DesignMateriaisSection";
import { CoresModelosSection } from "@/components/sections/CoresModelosSection";
import { ComparativoPrecoSection } from "@/components/sections/ComparativoPrecoSection";
import { ComoComprarSection } from "@/components/sections/ComoComprarSection";
import { DepoimentosSection } from "@/components/sections/DepoimentosSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { EncomendaSection } from "@/components/sections/EncomendaSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "iPocket Brasil",
    description:
      "Bolso em tecido 3D inspirado no iPhone Pocket, feito no Brasil, compatível com qualquer iPhone.",
    brand: {
      "@type": "Brand",
      name: "iPocket Brasil",
    },
    url: "https://www.ipocketbrasil.com/",
    image: ["https://www.ipocketbrasil.com/opengraph-image"],
    offers: [
      {
        "@type": "Offer",
        sku: "ipocket-alca-curta",
        price: "600",
        priceCurrency: "BRL",
        availability: "https://schema.org/PreOrder",
        url: "https://www.ipocketbrasil.com/#encomenda",
      },
      {
        "@type": "Offer",
        sku: "ipocket-alca-longa",
        price: "1200",
        priceCurrency: "BRL",
        availability: "https://schema.org/PreOrder",
        url: "https://www.ipocketbrasil.com/#encomenda",
      },
    ],
  } as const;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "É produto oficial Apple?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Não. É um produto nacional inspirado na tendência do iPhone Pocket, sem vínculo com Apple ou ISSEY MIYAKE.",
        },
      },
      {
        "@type": "Question",
        name: "Serve em qualquer iPhone?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "O tecido é flexível e foi pensado para se adaptar à maioria dos modelos recentes de iPhone.",
        },
      },
      {
        "@type": "Question",
        name: "Posso levar outros itens junto?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Sim. Cartões, chaves e pequenos itens do dia a dia também cabem no bolso com seu iPhone.",
        },
      },
      {
        "@type": "Question",
        name: "Qual o prazo de entrega?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Entre 2 semanas e 1 mês após a confirmação do pagamento.",
        },
      },
      {
        "@type": "Question",
        name: "Como funciona o pagamento?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Pagamento via PIX. Após o envio do formulário, enviaremos a chave e a confirmação do pedido.",
        },
      },
    ],
  } as const;

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Como funciona a sua encomenda",
    description:
      "Escolha modelo e cor, preencha seus dados e pague via PIX para entrar na fila de produção.",
    totalTime: "P14D",
    step: [
      {
        "@type": "HowToStep",
        name: "Escolha modelo e cor",
        text: "Curta ou longa, nas cores do primeiro lote.",
      },
      {
        "@type": "HowToStep",
        name: "Preencha seus dados",
        text: "Nome, contato e endereço — simples e direto.",
      },
      {
        "@type": "HowToStep",
        name: "Pague via PIX",
        text: "Após a confirmação, sua peça entra na fila de produção.",
      },
    ],
  } as const;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <main className="bg-[--color-base] text-[--color-ink]">
      <HeroSection />
      <ComoFuncionaSection />
      <PorqueAgoraSection />
      <DesignMateriaisSection />
      <CoresModelosSection />
      <ComparativoPrecoSection />
      <ComoComprarSection />
      <DepoimentosSection />
      <FAQSection />
      <EncomendaSection />
      <FooterSection />
      </main>
    </>
  );
}
