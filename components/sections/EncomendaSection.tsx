"use client";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OrderForm } from "@/components/OrderForm";

export function EncomendaSection() {
  return (
    <Section id="encomenda">
      <Container>
        <SectionHeading
          title="Pronto para vestir o seu iPhone?"
          subtitle="Garanta o seu iPocket Brasil no primeiro lote e use antes de virar modinha por aqui."
        />
        <OrderForm />
      </Container>
    </Section>
  );
}
