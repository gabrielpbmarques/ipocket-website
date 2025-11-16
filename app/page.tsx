import { HeroSection } from "@/components/sections/HeroSection";
import { ComoFuncionaSection } from "@/components/sections/ComoFuncionaSection";
import { PorqueAgoraSection } from "@/components/sections/PorqueAgoraSection";
import { DesignMateriaisSection } from "@/components/sections/DesignMateriaisSection";
import { CoresModelosSection } from "@/components/sections/CoresModelosSection";
import { ComparativoPrecoSection } from "@/components/sections/ComparativoPrecoSection";
import { ComoComprarSection } from "@/components/sections/ComoComprarSection";
import { DepoimentosSection } from "@/components/sections/DepoimentosSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { EncomendaSection } from "@/components/sections/EncomendaSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <main className="bg-[--color-base] text-[--color-ink]">
      <HeroSection />
      <ComoFuncionaSection />
      <PorqueAgoraSection />
      <DesignMateriaisSection />
      <CoresModelosSection />
      <ComparativoPrecoSection />
      <ComoComprarSection />
      <DepoimentosSection />
      <FAQSection />
      <EncomendaSection />
      <FooterSection />
    </main>
  );
}
