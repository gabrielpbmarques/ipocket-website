"use client";
import React from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { OrderForm } from "@/components/OrderForm";

export function EncomendaSection() {
  return (
    <Section id="encomenda">
      <Container>
        <SectionHeading
          title="Pronto para vestir o seu iPhone?"
          subtitle="Garanta o seu iPocket Brasil no primeiro lote e use antes de virar modinha por aqui."
        />
        <div className="grid gap-8">
          <Card className="p-6">
            <h3 className="text-lg font-medium">Faça sua encomenda</h3>
            <p className="mt-1 text-sm subtle">Preencha seus dados e escolha o modelo e a cor.</p>
            <div className="mt-6">
              <OrderForm />
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
