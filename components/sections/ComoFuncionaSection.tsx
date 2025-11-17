import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { AnimateInView } from "@/components/AnimateInView";

export function ComoFuncionaSection() {
  const items = [
    { t: "Envolve", d: "Envolve o seu iPhone com segurança e conforto." },
    { t: "Expande", d: "O tecido se expande para acomodar outros itens essenciais." },
    { t: "Revela", d: "Quando esticado, deixa você ver a tela e notificações." },
    { t: "Veste", d: "Use na mão, no corpo ou preso à sua bolsa." },
  ];
  return (
    <Section id="como-funciona">
      <Container>
        <SectionHeading
          title="Um bolso extra para o seu iPhone"
          subtitle="O iPocket Brasil é um bolso em tecido 3D elástico que envolve o seu iPhone e se adapta também a cartões, chaves e pequenos itens do dia a dia."
        />
        <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((c, i) => (
            <AnimateInView key={c.t} delay={i * 0.05}>
              <Card className="p-6">
                <h3 className="text-lg font-medium">{c.t}</h3>
                <p className="mt-2 subtle">{c.d}</p>
              </Card>
            </AnimateInView>
          ))}
        </div>
      </Container>
    </Section>
  );
}
