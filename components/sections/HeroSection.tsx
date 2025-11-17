import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimateInView } from "@/components/AnimateInView";
import { blurDataURL } from "@/lib/blur";

export function HeroSection() {
  return (
    <Section id="topo">
      <Container className="grid items-center gap-10 sm:grid-cols-2">
        <AnimateInView>
        <div>
          <h1 className="heading-hero">Um bolso pensado para o seu iPhone.</h1>
          <p className="mt-4 text-lg subtle">
            Inspirado na tendência global do iPhone Pocket, agora em uma versão feita no Brasil, com preço nacional.
          </p>
          <ul className="mt-6 space-y-2 subtle">
            <li>• Compatível com qualquer iPhone.</li>
            <li>• Tecido 3D flexível que abraça o aparelho.</li>
            <li>• Ideal para usar no corpo, preso em bolsas ou na mão.</li>
          </ul>
          <div className="mt-8 flex items-center gap-4">
            <a href="#encomenda" className="cursor-pointer">
              <Button>Encomende já o seu</Button>
            </a>
          </div>
          <p className="mt-2 text-sm subtle font-bold">Primeiro lote com quantidade limitada.</p>
          <p className="mt-2 text-sm subtle font-bold">Prazo de produção de 2 semanas a 1 mês por unidade.</p>
        </div>
        </AnimateInView>
        <AnimateInView delay={0.05}>
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[var(--radius-lg)] bg-[--color-surface] muted-border">
          <Image
            src="/mock-hero.png"
            alt="iPocket Brasil com iPhone"
            fill
            priority
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={blurDataURL(400, 500)}
          />
        </div>
        </AnimateInView>
      </Container>
    </Section>
  );
}
