"use client";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import dynamic from "next/dynamic";

const Carousel = dynamic(
  () => import("@/components/ui/TestimonialsCarousel").then((m) => m.TestimonialsCarousel),
  { ssr: false, loading: () => null },
);

export function DepoimentosSection() {
  return (
    <Section id="depoimentos">
      <Container>
        <SectionHeading
          title="Pensado para quem vive com o iPhone na mão."
          subtitle="Em breve, aqui entram fotos reais de clientes usando o iPocket Brasil nas ruas."
        />
        <Carousel
          items={[
            { quote: "Minimalista, prático e com cara de peça internacional.", author: "Marina", role: "São Paulo" },
            { quote: "Uso no corpo e fico com as mãos livres o dia todo.", author: "Lucas", role: "Rio de Janeiro" },
            { quote: "Preço brasileiro com acabamento caprichado. Surpreendeu.", author: "Bruna", role: "Curitiba" },
            { quote: "Melhor que carregar no bolso da calça. Virou parte do look.", author: "André", role: "Belo Horizonte" },
          ]}
        />
      </Container>
    </Section>
  );
}
