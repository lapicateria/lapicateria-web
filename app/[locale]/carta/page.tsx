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
            "Si vienes con idea de paella, brasa o mesa larga, mejor reservar",
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
  const menuVisuals =
    locale === "es"
      ? [
          {
            image: "/images/real/paella.jpg",
            alt: "Paella de La Picatería",
            title: "Paella para compartir",
            text: "Si vienes con idea de arroz, mejor reservar y venir con tiempo.",
          },
          {
            image: "/images/real/chuleton.jpg",
            alt: "Chuletón a la brasa de La Picatería",
            title: "Brasa de carbón",
            text: "Chuletón, cortes a la brasa y platos de mesa larga para venir con ganas de comer.",
          },
        ]
      : null;

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
            {locale === "es" ? (
              <p className="text-sm font-medium leading-7 text-charcoal">
                Si vienes en hora punta, con idea de arroz o a comer con calma, mejor reservar antes de venir.
              </p>
            ) : null}
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
          {locale === "es" ? (
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <TrackedReservationLink
                label="¿Te encaja? Reserva tu mesa"
                locale={locale}
                location="carta_page"
                eventName="click_reserve_menu_decision"
              />
              <CtaButton href={`/${locale}/reservas`} label="Ver reservas" variant="secondary" />
            </div>
          ) : null}
        </div>

        <div className="mt-10 overflow-hidden rounded-[1.8rem] bg-white shadow-[0_18px_44px_rgba(95,106,100,0.1)]">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[320px]">
              <Image
                src="/images/real/paella_entrecot.jpg"
                alt="Paella y carne a la brasa en La Picatería"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-center bg-cream/60 p-6 sm:p-8">
              <p className="max-w-md text-base leading-8 text-charcoal">
                Carta clara, precios visibles y platos reales que ayudan a decidir rápido desde el móvil si hoy vienes de tapas o a comer con calma.
              </p>
            </div>
          </div>
        </div>

        {locale === "es" && menuVisuals ? (
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {menuVisuals.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-[1.6rem] bg-white shadow-[0_16px_34px_rgba(31,26,23,0.08)]"
              >
                <div className="relative min-h-[260px]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand-500">
                    {item.title}
                  </p>
                  <p className="text-sm leading-7 text-charcoal">{item.text}</p>
                </div>
              </article>
            ))}
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

              {locale === "es" && category.id === "arroces-y-fideua" ? (
                <div className="overflow-hidden rounded-[1.6rem] border border-border bg-white shadow-[0_14px_30px_rgba(31,26,23,0.05)]">
                  <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="relative min-h-[260px]">
                      <Image
                        src="/images/real/paella.jpg"
                        alt="Paella de La Picatería"
                        fill
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-center p-6">
                      <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand-500">
                          Puente carta → reserva
                        </p>
                        <p className="text-sm leading-7 text-charcoal">
                          Si vienes a por arroz, fines de semana o con idea de alargar la mesa, mejor reservar antes y llegar con el plan hecho.
                        </p>
                        <TrackedReservationLink
                          label="Reservar mesa"
                          locale={locale}
                          location="carta_page"
                          eventName="click_reserve_menu_rice_block"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </section>
          ))}
        </div>

        {locale === "es" ? (
          <div className="mt-12 rounded-[1.8rem] border border-border bg-white px-6 py-7 shadow-[0_14px_30px_rgba(31,26,23,0.06)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand-500">
                  Reserva recomendada
                </p>
                <h2 className="font-display text-4xl leading-tight text-ink">
                  ¿Te apetece venir? Reserva tu mesa
                </h2>
                <p className="text-sm leading-7 text-charcoal">
                  La carta está hecha para compartir y decidir rápido. Si ya sabes que vienes, deja la mesa cerrada antes de acercarte.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <TrackedReservationLink
                  label="Reservar mesa"
                  locale={locale}
                  location="carta_page"
                  eventName="click_reserve_menu_mid"
                />
                <CtaButton href={`/${locale}/contacto`} label="Cómo llegar" variant="secondary" />
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-14 rounded-[1.8rem] border border-border bg-cream/68 px-6 py-8 text-center sm:px-8">
          <div className="mx-auto max-w-2xl space-y-5">
            <h2 className="font-display text-4xl leading-tight text-ink">
              {locale === "es" ? "¿Te apetece probarlo?" : locale === "en" ? "Fancy trying it?" : "Envie de gouter ?"}
            </h2>
            {locale === "es" ? (
              <p className="text-sm leading-7 text-charcoal">
                Si vienes en hora punta o quieres venir con calma, mejor reservar antes.
              </p>
            ) : null}
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
