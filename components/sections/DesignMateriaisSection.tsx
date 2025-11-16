"use client";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateInView } from "@/components/AnimateInView";

export function DesignMateriaisSection() {
  return (
    <Section id="design">
      <Container>
        <SectionHeading title="Tecido tecnológico, pensado para o dia a dia." />
        <div className="grid gap-8 lg:grid-cols-2">
          <AnimateInView>
            <p className="text-lg subtle">
              O iPocket Brasil se inspira em tecidos 3D tricotados/canelados, semelhantes aos usados em peças de moda de alto padrão. O foco é ter toque agradável, leve elasticidade, boa resistência e um caimento bonito com o iPhone dentro — com a honestidade de um produto nacional, inspirado na tendência, sem prometer o material importado.
            </p>
            <ul className="mt-6 space-y-2 text-zinc-700 dark:text-zinc-300">
              <li>• Flexível e ajustável a diferentes modelos de iPhone.</li>
              <li>• Textura que cria um visual marcante, sem ser chamativo demais.</li>
              <li>• Leve e confortável para uso no dia a dia.</li>
            </ul>
          </AnimateInView>
          <AnimateInView delay={0.05}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <Image src="/mock-material.png" alt="Tecido 3D" fill className="object-cover" />
            </div>
          </AnimateInView>
        </div>
      </Container>
    </Section>
  );
}
