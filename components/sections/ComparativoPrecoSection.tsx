import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { AnimateInView } from "@/components/AnimateInView";

export function ComparativoPrecoSection() {
  return (
    <Section id="preco">
      <Container>
        <SectionHeading title="Preço de acessório de luxo, sem custo de acessório de luxo." />
        <div className="grid auto-rows-fr gap-6 md:grid-cols-2">
          <AnimateInView>
            <Card className="p-6">
              <h3 className="text-lg font-medium">Lá fora</h3>
              <ul className="mt-3 space-y-2 subtle">
                <li>• Acessório similar vendido por empresa internacional.</li>
                <li>• Preço médio: US$ 149,95 (curto) e US$ 229,95 (longo).</li>
                <li>• Curto importado com frete + impostos: cerca de R$ 1.800.</li>
                <li>• Longo importado com frete + impostos: pode passar de R$ 2.300.</li>
              </ul>
            </Card>
          </AnimateInView>
          <AnimateInView delay={0.05}>
            <Card className="p-6">
              <h3 className="text-lg font-medium">iPocket Brasil</h3>
              <ul className="mt-3 space-y-2 subtle">
                <li>• Versão inspirada, feita no Brasil.</li>
                <li>• Alça curta: R$ 300.</li>
                <li>• Alça longa: R$ 600.</li>
                <li>• Pagamento via PIX, sem IOF e sem surpresa na fatura.</li>
              </ul>
            </Card>
          </AnimateInView>
        </div>
        <p className="mt-8 text-center text-sm subtle">
          Qualidade de acessório de moda internacional, com preço pensado para o mercado brasileiro. Importar versões curta ou longa pode chegar a ~R$ 1.800 e ~R$ 2.300 respectivamente após frete, impostos e IOF.
        </p>
      </Container>
    </Section>
  );
}
