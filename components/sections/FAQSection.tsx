"use client";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";

export function FAQSection() {
  return (
    <Section id="faq" className="bg-[var(--color-muted)]">
      <Container>
        <SectionHeading title="FAQ" />
        <div className="grid gap-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="a1">
              <AccordionTrigger>É produto oficial Apple?</AccordionTrigger>
              <AccordionContent>
                Não. É um produto nacional inspirado na tendência do iPhone Pocket, sem vínculo com Apple ou ISSEY MIYAKE.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="a2" className="mt-3">
              <AccordionTrigger>Serve em qualquer iPhone?</AccordionTrigger>
              <AccordionContent>
                O tecido é flexível e foi pensado para se adaptar à maioria dos modelos recentes de iPhone.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="a3" className="mt-3">
              <AccordionTrigger>Posso levar outros itens junto?</AccordionTrigger>
              <AccordionContent>
                Sim. Cartões, chaves e pequenos itens do dia a dia também cabem no bolso com seu iPhone.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="a4" className="mt-3">
              <AccordionTrigger>Qual o prazo de entrega?</AccordionTrigger>
              <AccordionContent>
                Entre 2 semanas e 1 mês após a confirmação do pagamento.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="a5" className="mt-3">
              <AccordionTrigger>Como funciona o pagamento?</AccordionTrigger>
              <AccordionContent>
                Pagamento via PIX. Após o envio do formulário, enviaremos a chave e a confirmação do pedido.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Container>
    </Section>
  );
}
