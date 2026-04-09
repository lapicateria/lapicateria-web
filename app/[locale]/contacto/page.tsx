import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaButton } from "@/components/cta-button";
import { buildMetadata } from "@/lib/metadata";
import { getDictionary, isValidLocale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);

  return buildMetadata(locale, {
    title: dictionary.meta.contact.title,
    description: dictionary.meta.contact.description,
    path: `/${locale}/contacto`,
  });
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const beforeYouCome =
    locale === "es"
      ? {
          title: "Antes de venir",
          points: [
            "Tapas incluidas con cada bebida",
            "Puedes venir solo de tapas o comer a la carta",
            "Comida media alrededor de 20 €",
            "Mejor reservar si vienes en hora punta o con idea de terraza",
          ],
        }
      : locale === "en"
        ? {
            title: "Before you come",
            points: [
              "Inside Mercado de San Agustin and 1 minute from the Cathedral",
              "Average meal around 20 EUR",
              "Better to book at peak times",
              "A good fit for terrace tables, the city centre and sharing dishes",
            ],
          }
        : {
            title: "Avant de venir",
            points: [
              "Dans le Mercado de San Agustin et a 1 minute de la Cathedrale",
              "Repas moyen autour de 20 EUR",
              "Mieux vaut reserver aux heures de pointe",
              "Une bonne adresse pour la terrasse, le centre et les plats a partager",
            ],
          };

  return (
    <section className="px-5 py-14 sm:px-6 lg:px-10 lg:py-18">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
              {dictionary.contactPage.eyebrow}
            </p>
            <h1 className="font-display text-5xl leading-tight text-ink sm:text-6xl">
              {dictionary.contactPage.title}
            </h1>
            <p className="text-base leading-8 text-charcoal">
              {dictionary.contactPage.description}
            </p>
            {locale === "es" ? (
              <p className="text-sm font-medium text-charcoal">
                A 1 minuto andando de la Catedral y dentro del Mercado de San Agustín.
              </p>
            ) : null}
          </div>
          <CtaButton href={`/${locale}/reservas`} label={dictionary.cta.reserve} />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-start">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sand-500">
                {dictionary.business.addressLabel}
              </p>
              <p className="text-lg leading-8 text-ink">{dictionary.business.address}</p>
            </div>

            <div className="space-y-3 border-t border-border pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sand-500">
                {dictionary.business.phoneLabel}
              </p>
              <a href={`tel:${dictionary.business.phoneHref}`} className="text-lg text-ink transition hover:text-sand-500">
                {dictionary.business.phone}
              </a>
            </div>

            <div className="space-y-3 border-t border-border pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sand-500">
                {dictionary.business.emailLabel}
              </p>
              <a href={`mailto:${dictionary.business.email}`} className="text-lg text-ink transition hover:text-sand-500">
                {dictionary.business.email}
              </a>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <CtaButton href={dictionary.business.mapsUrl} label={dictionary.cta.maps} external />
              <CtaButton href={`/${locale}/reservas`} label={dictionary.navigation.booking} variant="secondary" />
            </div>

            <div className="rounded-[1.6rem] border border-border bg-cream/55 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                {beforeYouCome.title}
              </p>
              <div className="mt-4 space-y-3">
                {beforeYouCome.points.map((point) => (
                  <p key={point} className="text-sm leading-7 text-charcoal">
                    {point}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.8rem] bg-white shadow-[0_24px_58px_rgba(31,26,23,0.1)]">
            <iframe
              title="Mapa de La Picatería"
              src={dictionary.contactPage.mapEmbedUrl}
              className="min-h-[520px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
