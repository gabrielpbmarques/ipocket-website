import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateInView } from "@/components/AnimateInView";

export function PorqueAgoraSection() {
  return (
    <Section id="porque-agora" className="bg-[var(--color-muted)]">
      <Container>
        <SectionHeading title="O acessório que acabou de chegar ao mundo, agora na sua mão." />
        <div className="grid auto-rows-fr gap-8 lg:grid-cols-2">
          <AnimateInView>
            <p className="text-lg subtle">
              Lá fora, o iPhone Pocket chegou como um acessório de moda tech e já está esgotando em várias lojas. Aqui no Brasil, o iPocket Brasil traz a mesma ideia: transformar o seu iPhone em parte do seu look — com preço em real e fabricação local.
            </p>
          </AnimateInView>
          <AnimateInView delay={0.05}>
            <ul className="space-y-2 subtle">
              <li>• Seja um dos primeiros a usar essa tendência no Brasil.</li>
              <li>• Lá fora custa em dólar. Aqui, você paga em real — com produção sob encomenda.</li>
            </ul>
          </AnimateInView>
        </div>
      </Container>
    </Section>
  );
}
