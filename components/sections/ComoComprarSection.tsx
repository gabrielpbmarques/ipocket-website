"use client";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { AnimateInView } from "@/components/AnimateInView";

export function ComoComprarSection() {
  const steps = [
    { t: "Você escolhe modelo e cor.", d: "Alça curta ou longa, e a cor que combina com você." },
    { t: "Preenche seus dados e endereço.", d: "Formulário simples, sem burocracia." },
    { t: "Recebe a chave PIX.", d: "Confirmou o pagamento? Sua peça entra na fila de produção." },
  ];
  return (
    <Section id="como-comprar" className="bg-[--color-muted]">
      <Container>
        <SectionHeading title="Como funciona a sua encomenda." />
        <div className="grid auto-rows-fr gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <AnimateInView key={s.t} delay={i * 0.05}>
              <Card className="p-6">
                <h3 className="text-base font-medium">{s.t}</h3>
                <p className="mt-2 subtle">{s.d}</p>
              </Card>
            </AnimateInView>
          ))}
        </div>
        <p className="mt-6 text-center text-sm subtle">Prazo estimado de produção e envio: entre 2 semanas e 1 mês.</p>
        <p className="mt-2 text-center text-xs subtle">Cada peça é feita sob encomenda, com acabamento cuidadoso e sem desperdício.</p>
      </Container>
    </Section>
  );
}
