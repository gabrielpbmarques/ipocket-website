import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { AnimateInView } from "@/components/AnimateInView";

export function ComoComprarSection() {
  const steps = [
    { t: "Escolha modelo e cor.", d: "Curta ou longa, nas cores do primeiro lote." },
    { t: "Preencha seus dados.", d: "Nome, contato e endereço — simples e direto." },
    { t: "Pague via PIX.", d: "Após a confirmação, sua peça entra na fila de produção." },
  ];
  return (
    <Section id="como-comprar" className="bg-[var(--color-muted)]">
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
        <p className="mt-6 text-center text-sm subtle">Prazo estimado: 2 semanas a 1 mês após confirmação do pagamento.</p>
        <p className="mt-2 text-center text-xs subtle">Produção sob encomenda, com acabamento cuidadoso e sem desperdício.</p>
      </Container>
    </Section>
  );
}
