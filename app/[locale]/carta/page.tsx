import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaButton } from "@/components/cta-button";
import { TrackedReservationLink } from "@/components/tracked-reservation-link";
import menuData from "@/content/menu.json";
import { buildMetadata } from "@/lib/metadata";
import { getDictionary, isValidLocale, type Locale } from "@/lib/i18n";

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
    title: dictionary.meta.menu.title,
    description: dictionary.meta.menu.description,
    path: `/${locale}/carta`,
  });
}

export default async function MenuPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const eatingGuide =
    locale === "es"
      ? {
          title: "Antes de pedir",
          points: [
            "Carta pensada para compartir",
            "Brasa de carbón, tapas, paellas y platos para poner al centro",
            "Si vienes con idea de paella o de mesa larga, mejor reservar",
          ],
        }
      : locale === "en"
        ? {
            title: "How to eat at La Picateria",
            points: [
              "A menu built for sharing",
              "Charcoal grill, tapas, paellas and dishes designed for the middle of the table",
              "If you are coming for paella or a larger table, it is better to book ahead",
            ],
          }
        : {
            title: "Comment manger a La Picateria",
            points: [
              "Une carte pensee pour partager",
              "Braise au charbon, tapas, paellas et plats de centre de table",
              "Si vous venez pour une paella ou une grande table, mieux vaut reserver",
            ],
          };
  const getTags = (itemId: string) => {
    const tags: string[] = [];
    if (["jamon-asado", "croquetas-caseras", "nachos-con-guacamole", "tablas-a-tu-gusto", "paella-marisco", "paella-carne", "arroz-negro", "paella-verduras"].includes(itemId)) {
      tags.push(locale === "es" ? "Para compartir" : locale === "en" ? "To share" : "A partager");
    }
    if (["pulpo-a-la-brasa", "entrecot", "solomillo", "chuleton", "t-bone", "secreto-iberico", "churrasco", "abanico", "pluma-iberica", "contramuslo-de-pollo"].includes(itemId)) {
      tags.push(locale === "es" ? "Brasa" : locale === "en" ? "Grill" : "Braise");
    }
    if (["pulpo-a-la-brasa", "jamon-asado", "paella-marisco", "pluma-iberica"].includes(itemId)) {
      tags.push(locale === "es" ? "Recomendado" : locale === "en" ? "Recommended" : "Recommande");
    }
    return tags;
  };

  return (
    <section className="px-5 py-14 sm:px-6 lg:px-10 lg:py-18">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
              {dictionary.menuPage.eyebrow}
            </p>
            <h1 className="font-display text-5xl leading-tight text-ink sm:text-6xl">
              {dictionary.menuPage.title}
            </h1>
            <p className="text-base leading-8 text-charcoal">
              {dictionary.menuPage.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <TrackedReservationLink
              label={dictionary.cta.reserve}
              locale={locale}
              location="carta_page"
            />
            <CtaButton href={`/${locale}/contacto`} label={dictionary.cta.contact} variant="secondary" />
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {menuData.notes[locale as Locale].map((note) => (
            <div key={note} className="border-b border-border/70 pb-3 text-sm leading-7 text-charcoal">
              {note}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[1.6rem] border border-border bg-cream/55 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
            {eatingGuide.title}
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {eatingGuide.points.map((point) => (
              <div key={point} className="text-sm leading-7 text-charcoal">
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-[1.8rem] bg-white shadow-[0_18px_44px_rgba(95,106,100,0.1)]">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[320px]">
              <Image
                src="/images/real/barra-madera.jpg"
                alt="Barra de madera y personalidad interior de La Picatería"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-center bg-cream/60 p-6 sm:p-8">
              <p className="max-w-md text-base leading-8 text-charcoal">
                Carta clara, precios visibles y una selección pensada para decidir rápido qué pedir.
              </p>
            </div>
          </div>
        </div>

        {locale === "es" ? (
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[1.6rem] bg-white shadow-[0_16px_34px_rgba(31,26,23,0.08)]">
              <div className="relative min-h-[260px]">
                <Image
                  src="/images/real/barra-producto.jpg"
                  alt="Producto real y barra de La Picatería"
                  fill
                  className="object-cover object-[58%_42%]"
                />
              </div>
            </div>
            <div className="overflow-hidden rounded-[1.6rem] bg-white shadow-[0_16px_34px_rgba(31,26,23,0.08)]">
              <div className="relative min-h-[260px]">
                <Image
                  src="/images/real/barra-madera.jpg"
                  alt="Barra de madera y ambiente de La Picatería"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-12 space-y-14">
          {menuData.categories.map((category) => (
            <section key={category.id} className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                  {category.names[locale as Locale]}
                </p>
                <p className="max-w-3xl text-sm leading-7 text-charcoal">
                  {category.descriptions[locale as Locale]}
                </p>
              </div>

              <div className="space-y-5 border-t border-border pt-2">
                {category.items.map((item) => (
                  <article key={item.id} className="border-b border-border/70 pb-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="font-display text-3xl leading-tight text-ink">
                          {item.names[locale as Locale]}
                        </h2>
                        {getTags(item.id).length > 0 ? (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {getTags(item.id).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-cream px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sand-500"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : null}
                        <p className="mt-2 max-w-3xl text-sm leading-7 text-charcoal">
                          {item.descriptions[locale as Locale]}
                        </p>
                      </div>
                      <span className="shrink-0 text-2xl font-semibold text-sand-500">
                        {item.price}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-[1.8rem] border border-border bg-cream/68 px-6 py-8 text-center sm:px-8">
          <div className="mx-auto max-w-2xl space-y-5">
            <h2 className="font-display text-4xl leading-tight text-ink">
              {locale === "es" ? "¿Te apetece probarlo?" : locale === "en" ? "Fancy trying it?" : "Envie de gouter ?"}
            </h2>
            <TrackedReservationLink
              label={dictionary.cta.reserve}
              locale={locale}
              location="carta_page"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
