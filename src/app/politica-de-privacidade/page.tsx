import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { privacyPolicy } from "@/content/site";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Container } from "@/components/ui/Layout";
import { WhatsAppDock } from "@/components/ui/WhatsAppDock";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main id="conteudo" className="py-section">
        <Container className="max-w-3xl">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-deep-blue hover:underline"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            {privacyPolicy.backLabel}
          </Link>

          <h1 className="mt-6 font-display text-4xl font-medium tracking-tight text-deep-blue sm:text-5xl">
            {privacyPolicy.title}
          </h1>
          <p className="mt-4 text-sm text-graphite/80">{privacyPolicy.updatedAt}</p>

          <div className="mt-section-gap space-y-8">
            {privacyPolicy.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl font-medium text-deep-blue">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 leading-relaxed text-graphite/90">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-graphite/90 marker:text-deep-blue">
                    {section.list.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
      <WhatsAppDock />
    </>
  );
}
