import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { getLegalDocument } from "@/lib/legal-content";
import { isValidLocale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const document = getLegalDocument(locale, "privacidad");

  return buildMetadata(locale, {
    title: document.title,
    description: document.description,
    path: `/${locale}/privacidad`,
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const document = getLegalDocument(locale, "privacidad");

  return (
    <section className="px-5 py-14 sm:px-6 lg:px-10 lg:py-18">
      <div className="mx-auto max-w-4xl">
        <div className="border-b border-border pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
            {document.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
            {document.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-charcoal">
            {document.description}
          </p>
        </div>

        <div className="mt-8 space-y-8">
          {document.sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <h2 className="font-display text-2xl text-ink sm:text-3xl">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-charcoal sm:text-base">
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="space-y-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="text-sm leading-7 text-charcoal sm:text-base">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
