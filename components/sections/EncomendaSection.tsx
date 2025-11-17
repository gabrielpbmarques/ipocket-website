"use client";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OrderForm } from "@/components/OrderForm";
import { AnimateInView } from "@/components/AnimateInView";

export function EncomendaSection() {
  return (
    <Section id="encomenda">
      <Container>
        <AnimateInView>
          <SectionHeading
            title="Pronto para vestir o seu iPhone?"
            subtitle="Garanta o seu iPocket Brasil no primeiro lote e use antes de virar modinha por aqui."
          />
        </AnimateInView>
        <AnimateInView delay={0.05}>
          <OrderForm />
        </AnimateInView>
      </Container>
    </Section>
  );
}
