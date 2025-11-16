"use client";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialsCarousel } from "@/components/ui/TestimonialsCarousel";

export function DepoimentosSection() {
  return (
    <Section id="depoimentos">
      <Container>
        <SectionHeading
          title="Pensado para quem vive com o iPhone na mão."
          subtitle="Em breve, aqui entram fotos reais de clientes usando o iPocket Brasil nas ruas."
        />
        <TestimonialsCarousel
          items={[
            { quote: "Design limpo e funcional. Fica lindo no look.", author: "Marina, SP" },
            { quote: "Finalmente dá pra sair leve, sem bolsos cheios.", author: "Lucas, RJ" },
            { quote: "Versão nacional com cara de produto premium.", author: "Bruna, PR" },
          ]}
        />
      </Container>
    </Section>
  );
}
