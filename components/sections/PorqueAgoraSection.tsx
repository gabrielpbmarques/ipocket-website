"use client";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateInView } from "@/components/AnimateInView";

export function PorqueAgoraSection() {
  return (
    <Section id="porque-agora" className="bg-[--color-muted]">
      <Container>
        <SectionHeading title="O acessório que acabou de chegar ao mundo, agora na sua mão." />
        <div className="grid auto-rows-fr gap-8 lg:grid-cols-2">
          <AnimateInView>
            <p className="text-lg subtle">
              Lá fora, o iPhone Pocket chegou como um acessório de moda tech e já está esgotando em várias lojas. Aqui no Brasil, o iPocket Brasil traz a mesma ideia: transformar o seu iPhone em parte do seu look — só que com preço em real e fabricação local.
            </p>
          </AnimateInView>
          <AnimateInView delay={0.05}>
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
              <li>• Seja um dos primeiros a usar essa tendência nas ruas do Brasil.</li>
              <li>• Enquanto o modelo oficial custa mais de mil reais lá fora, aqui você garante o seu com preço nacional e produção sob encomenda.</li>
            </ul>
          </AnimateInView>
        </div>
      </Container>
    </Section>
  );
}
