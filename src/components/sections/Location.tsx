import { Clock, ExternalLink, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { contact, ctas, location } from "@/content/site";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { buttonClasses } from "@/components/ui/button-styles";
import { Container, Section } from "@/components/ui/Layout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCta } from "@/components/ui/WhatsAppCta";

/** Item da lista de informações: dt/dd como filhos diretos do grupo (HTML válido), ícone dentro do dt. */
function InfoRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="relative min-h-10 pl-13 sm:min-h-11 sm:pl-15">
      <dt className="text-xs font-bold tracking-[0.14em] text-graphite/80 uppercase">
        <span className="absolute top-0 left-0 grid size-10 place-items-center rounded-xl bg-baby-blue/40 text-deep-blue sm:size-11">
          {icon}
        </span>
        {label}
      </dt>
      <dd className="mt-0.5 text-graphite sm:mt-1">{children}</dd>
    </div>
  );
}

/**
 * Localização: endereço, horário de visitas e mapa centralizado em Americana/SP.
 * Mobile: informações, mapa e, logo abaixo, os botões em largura total.
 */
export function Location() {
  return (
    <Section id="localizacao" labelledBy="localizacao-title" spacing="bottom">
      <Container className="grid gap-6 sm:gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-x-12 lg:gap-y-7">
        <div className="lg:col-start-1 lg:row-start-1">
          <SectionHeading
            id="localizacao-title"
            eyebrow={location.eyebrow}
            title={location.title}
            description={location.description}
          />

          <dl className="mt-6 grid gap-4 sm:mt-7 sm:gap-5">
            <InfoRow icon={<MapPin aria-hidden="true" className="size-5" strokeWidth={1.75} />} label={location.addressLabel}>
              {contact.address.full}
            </InfoRow>
            <InfoRow icon={<Clock aria-hidden="true" className="size-5" strokeWidth={1.75} />} label={location.hoursLabel}>
              {contact.visitHours.label}
            </InfoRow>
            <InfoRow icon={<WhatsAppIcon className="size-5" />} label={location.whatsappLabel}>
              {contact.phoneDisplay}
            </InfoRow>
            <InfoRow icon={<InstagramIcon className="size-5" />} label={location.instagramLabel}>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="-my-2 inline-flex min-h-11 items-center font-medium text-deep-blue underline-offset-4 hover:underline active:opacity-70"
              >
                {contact.instagram}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </InfoRow>
          </dl>
        </div>

        <div className="overflow-hidden rounded-3xl bg-baby-blue/30 shadow-soft ring-1 ring-graphite/10 sm:rounded-[2rem] lg:col-start-2 lg:row-span-2 lg:row-start-1">
          {/* Endereço fictício: o mapa fica centralizado na cidade (contact.mapEmbedUrl). Carrega só perto da tela. */}
          <iframe
            title={location.mapTitle}
            src={contact.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block aspect-[4/3] w-full border-0 lg:aspect-auto lg:h-[30rem]"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:col-start-1 lg:row-start-2">
          <a
            href={contact.mapLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("secondary", "md", "w-full sm:w-auto")}
          >
            <ExternalLink aria-hidden="true" className="size-4 shrink-0" />
            {location.mapLinkLabel}
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
          <WhatsAppCta cta={ctas.location} className="w-full sm:w-auto" />
        </div>
      </Container>
    </Section>
  );
}
