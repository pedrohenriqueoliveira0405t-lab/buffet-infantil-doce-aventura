import { buildLocalBusinessJsonLd, serializeJsonLd } from "@/lib/structured-data";
import { Commitments } from "@/components/sections/Commitments";
import { Faq } from "@/components/sections/Faq";
import { Families } from "@/components/sections/Families";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Location } from "@/components/sections/Location";
import { Packages } from "@/components/sections/Packages";
import { Safety } from "@/components/sections/Safety";
import { Schedule } from "@/components/sections/Schedule";
import { Space } from "@/components/sections/Space";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyUs } from "@/components/sections/WhyUs";
import { FloatingBalloon } from "@/components/ui/FloatingBalloon";
import { WhatsAppDock } from "@/components/ui/WhatsAppDock";

/*
 * ORDEM DAS SEÇÕES (foco em autoridade)
 *
 * A ordem base é a do CLAUDE.md (seção 6). As seções novas de autoridade foram encaixadas
 * entre elas, sem inverter nenhuma posição definida lá.
 *
 * Primeiros 5 segundos: provar que este é o buffet mais confiável da região.
 *  1. Hero ............... O que é + onde + autoridade ("+1.800 festas") + CTA e nota 4,9.
 *  2. Barra de confiança . Dois números concretos e animados (+1.800 festas, 4,9 no Google).
 *
 * Desejo: mostrar o padrão antes de falar de preço.
 *  3. Por que nos escolher  Diferenciais concretos, não adjetivos.
 *  4. O espaço ........... Prova visual do alto padrão (o que o Instagram mais valoriza).
 *  5. Quem cuida ......... [novo] Pessoas com credencial por trás da experiência. Alto padrão
 *                          é sobre confiar em quem executa; vem antes do método e do preço.
 *  6. Como funciona ...... Método em 4 etapas: mostra profissionalismo e reduz o "dá trabalho?".
 *
 * Decisão: preço e, logo em seguida, redução de risco e prova social.
 *  7. Pacotes ............ Ancoragem no Fantasia.
 *  8. Compromissos ....... [novo] Garantias por contrato imediatamente após o preço, que é
 *                          quando a objeção "será que vale?" é mais forte.
 *  9. Depoimentos ........ Prova social qualificada (nome, cidade, idade, tema) + selo Google.
 * 10. Famílias ........... [novo] Mosaico de festas: volume e variedade reforçam as 1.800 festas.
 * 11. Segurança .......... Selos e credenciais técnicas: responde à objeção mais emocional
 *                          dos pais depois que eles já desejam a festa.
 *
 * Fechamento: urgência honesta, dúvidas finais e ação.
 * 12. Agenda ............. Escassez real (uma festa por vez = poucos horários).
 * 13. FAQ ................ Remove as últimas objeções práticas.
 * 14. CTA final .......... Apelo emocional + botão.
 * 15. Localização ........ Endereço, horário de visitas e mapa.
 * 16. Rodapé
 */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildLocalBusinessJsonLd()) }}
      />
      <Header />
      <main id="conteudo">
        <Hero />
        <TrustBar />
        <WhyUs />
        <Space />
        <Team />
        <HowItWorks />
        <Packages />
        <Commitments />
        <Testimonials />
        <Families />
        <Safety />
        <Schedule />
        <Faq />
        <FinalCta />
        <Location />
      </main>
      <Footer />
      <FloatingBalloon />
      <WhatsAppDock />
    </>
  );
}
