"use client";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ModelCard } from "@/components/ModelCard";

export function CoresModelosSection() {
  return (
    <Section id="cores" className="bg-[--color-muted]">
      <Container>
        <SectionHeading title="Escolha como você quer usar" />
        <div className="grid gap-8 lg:grid-cols-2">
          <ModelCard
            title="Modelo Alça Curta"
            priceLabel="R$ 600"
            description="Para usar na mão ou preso à bolsa."
            imageSrc="/mock-curta.svg"
            imageAlt="Modelo alça curta"
            swatches={[
              { key: "preto", name: "Preto", var: "--swatch-preto" },
              { key: "canela", name: "Canela", var: "--swatch-canela" },
              { key: "safira", name: "Safira", var: "--swatch-safira" },
              { key: "limao", name: "Limão", var: "--swatch-limao" },
              { key: "tangerina", name: "Tangerina", var: "--swatch-tangerina" },
              { key: "roxo", name: "Roxo", var: "--swatch-roxo" },
              { key: "rosa", name: "Rosa", var: "--swatch-rosa" },
              { key: "pavao", name: "Pavão", var: "--swatch-pavao" },
            ]}
          />
          <ModelCard
            title="Modelo Alça Longa"
            priceLabel="R$ 1.200"
            description="Estilo tiracolo / crossbody, pra usar no corpo."
            imageSrc="/mock-longa.svg"
            imageAlt="Modelo alça longa"
            swatches={[
              { key: "safira", name: "Safira", var: "--swatch-safira" },
              { key: "canela", name: "Canela", var: "--swatch-canela" },
              { key: "preto", name: "Preto", var: "--swatch-preto" },
            ]}
          />
        </div>
        <p className="mt-8 text-center text-sm subtle">
          Lá fora, modelos semelhantes chegam a quase R$ 1.300 na conversão direta. Aqui, você leva a ideia com tecido premium e acabamento artesanal brasileiro.
        </p>
      </Container>
    </Section>
  );
}
