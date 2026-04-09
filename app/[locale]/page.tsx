import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConversionStatusPanel } from "@/components/conversion-status-panel";
import { CtaButton } from "@/components/cta-button";
import { RestaurantSchema } from "@/components/restaurant-schema";
import { SectionHeading } from "@/components/section-heading";
import { TrackedPhoneLink } from "@/components/tracked-phone-link";
import { TrackedReservationLink } from "@/components/tracked-reservation-link";
import menuData from "@/content/menu.json";
import { buildMetadata } from "@/lib/metadata";
import { getDictionary, getMenuPreview, isValidLocale } from "@/lib/i18n";

const heroImage = "/images/real/barra-producto.jpg";
const terraceImage = "/images/real/terraza.jpg";
const brandImage = "/images/real/barra-madera.jpg";

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
    title: dictionary.meta.home.title,
    description: dictionary.meta.home.description,
    path: `/${locale}`,
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const preview = getMenuPreview(menuData, locale);
  const featureList =
    locale === "es"
      ? [
          "Tapas incluidas con cada bebida",
          "Brasa de carbón real",
          "Paellas y platos para compartir",
          "Terraza en pleno centro",
        ]
      : locale === "en"
        ? [
            "Real charcoal grill",
            "Tapas and paellas made for sharing",
            "Terrace in the city centre",
            "Inside Mercado de San Agustin",
          ]
        : [
            "Vraie braise au charbon",
            "Tapas et paellas a partager",
            "Terrasse en plein centre",
            "Dans le Mercado de San Agustin",
          ];
  const specialties =
    locale === "es"
      ? [
          {
            name: "Pulpo a la brasa",
            note: "Muy pedido",
            description: "Marcado a fuego y pensado para compartir.",
          },
          {
            name: "Jamón asado",
            note: "Especialidad de la casa",
            description: "Un clásico de la casa, jugoso y hecho para volver.",
          },
          {
            name: "Paellas y arroces",
            note: "Para compartir",
            description: "Para venir con tiempo, pedir mesa y compartir de verdad.",
          },
        ]
      : locale === "en"
        ? [
            {
              name: "Chargrilled octopus",
              note: "Frequently ordered",
              description: "Octopus leg over parmentier. One of the dishes that best represents the place.",
            },
            {
              name: "Roast ham",
              note: "House specialty",
              description: "La Picatería's signature dish, made for the middle of the table and easy sharing.",
            },
            {
              name: "Paellas and rice",
              note: "To share",
              description: "If you are coming for rice, it is better to book ahead and enjoy the table without rushing.",
            },
          ]
        : [
            {
              name: "Poulpe a la braise",
              note: "Tres demande",
              description: "Patte de poulpe sur parmentier. Un des plats qui resume le mieux la maison.",
            },
            {
              name: "Jambon roti",
              note: "Specialite",
              description: "La specialite de La Picatería, pensee pour etre posee au centre de la table et partagee.",
            },
            {
              name: "Paellas et riz",
              note: "A partager",
              description: "Si vous venez avec l'idee d'un riz, mieux vaut reserver et prendre le temps de profiter de la table.",
            },
          ];
  const socialProof =
    locale === "es"
      ? {
          title: "Lo que más valoran quienes vienen",
          points: [
            "Producto bien trabajado, especialmente la brasa, el pulpo y los arroces.",
            "La ubicación dentro del mercado y a un paso de la Catedral suma mucho a la experiencia.",
            "Es un sitio que funciona bien para compartir, alargar la mesa y venir con terraza en mente.",
          ],
        }
      : locale === "en"
        ? {
            title: "What guests tend to value most",
            points: [
              "Well-handled produce, especially the grill dishes, octopus and rice.",
              "The market setting and the location near the Cathedral make the visit easy to understand.",
              "It works especially well for sharing plates, terrace tables and slower meals.",
            ],
          }
        : {
            title: "Ce que les clients valorisent le plus",
            points: [
              "Un produit bien travaille, surtout sur la braise, le poulpe et les riz.",
              "L'emplacement dans le marche et a deux pas de la Cathedrale rend la proposition tres claire.",
              "C'est une adresse qui fonctionne bien pour partager, profiter de la terrasse et prendre son temps.",
            ],
          };
  const beforeYouCome =
    locale === "es"
      ? {
          title: "Antes de venir",
          points: [
            "Tapas incluidas con cada bebida",
            "Puedes venir a tapear o sentarte a comer a la carta",
            "Comida media alrededor de 20 €",
            "Mejor reservar en horas punta",
          ],
        }
      : locale === "en"
        ? {
            title: "Before you come",
            points: [
              "Tapas from 10 EUR",
              "Average meal around 20 EUR",
              "Booking is recommended at peak times",
              "Best for sharing at the table, not for rushing through lunch",
            ],
          }
        : {
            title: "Avant de venir",
            points: [
              "Tapas a partir de 10 EUR",
              "Repas moyen autour de 20 EUR",
              "Reservation conseillee aux heures de pointe",
              "Ideal pour partager a table, pas pour manger a la hate",
            ],
          };
  const locationBlock =
    locale === "es"
      ? {
          title: "En el centro de Granada y dentro del mercado",
          text: "A 1 minuto de la Catedral y dentro del Mercado de San Agustín. Un sitio fácil de entender y muy cómodo para parar, comer y seguir por el centro.",
        }
      : locale === "en"
        ? {
            title: "In central Granada and inside the market",
            text: "One minute from the Cathedral and inside Mercado de San Agustin. Easy to find, easy to understand and ideal for stopping, eating and carrying on through the city centre.",
          }
        : {
            title: "Au centre de Grenade et dans le marche",
            text: "A une minute de la Cathedrale et dans le Mercado de San Agustin. Une adresse simple a comprendre et tres pratique pour s'arreter, dejeuner et continuer dans le centre.",
          };

  const heroCopy =
    locale === "es"
      ? {
          eyebrow: "Mercado · brasa de carbón · Granada",
          title: "Brasa de carbón, tapas y producto real en el centro de Granada",
          subtitle:
            "En el Mercado de San Agustín, junto a la Catedral. Un sitio para tapear, compartir paellas y sentarse a comer con calma.",
          reserve: "Reservar mesa",
          menu: "Ver carta",
        }
      : locale === "en"
        ? {
            eyebrow: "MARKET · CHARCOAL GRILL · GRANADA",
            title: "Charcoal grill and real produce in the heart of Granada",
            subtitle:
              "Tapas, paellas and sharing plates inside Mercado de San Agustin, next to the Cathedral.",
            reserve: "Book a table",
            menu: "View menu",
          }
        : {
            eyebrow: "MARCHE · BRAISE AU CHARBON · GRENADE",
            title: "Braise au charbon et vrai produit au centre de Grenade",
            subtitle:
              "Tapas, paellas et plats a partager dans le Mercado de San Agustin, a cote de la Cathedrale.",
            reserve: "Reserver une table",
            menu: "Voir la carte",
          };

  const terraceCopy =
    locale === "es"
      ? {
          title: "Comer en el centro, dentro del mercado",
          text:
            "Terraza, mercado y centro histórico: La Picatería está en el corazón de Granada, a pocos pasos de la Catedral.",
          cta: "Ver contacto",
        }
      : locale === "en"
        ? {
            title: "A location that makes sense the moment you see it",
            text:
              "Terrace, market and historic centre: La Picatería sits in the heart of Granada, just a few steps from the Cathedral.",
            cta: "View contact",
          }
        : {
            title: "Un emplacement qui se comprend au premier regard",
            text:
              "Terrasse, marche et centre historique : La Picatería est au coeur de Grenade, a quelques pas de la Cathedrale.",
            cta: "Voir le contact",
          };
  const kitchenMoments =
    locale === "es"
      ? [
          {
            title: "Pulpo a la brasa",
            description: "Marcado al fuego y pensado para compartir.",
            image: heroImage,
            alt: "Producto real y cocina de La Picatería",
            position: "object-[45%_40%]",
          },
          {
            title: "Carne a la brasa",
            description: "Brasa de carbón y punto de cocina directo.",
            image: brandImage,
            alt: "Barra de madera y cocina de La Picatería",
            position: "object-center",
          },
          {
            title: "Paella",
            description: "Para venir con tiempo, pedir mesa y compartir.",
            image: heroImage,
            alt: "Barra con producto y ambiente gastronómico de La Picatería",
            position: "object-[62%_45%]",
          },
          {
            title: "Plato destacado",
            description: "Producto real, barra y una cocina que apetece.",
            image: terraceImage,
            alt: "Terraza y experiencia real de La Picatería",
            position: "object-center",
          },
        ]
      : null;

  const brandCopy =
    locale === "es"
      ? {
          title: "Producto de mercado, cocina directa y una casa con personalidad",
          text:
            "La Picatería combina barra, brasa, vermut, conservas, vinos y cocina para compartir en un espacio con identidad propia.",
        }
      : locale === "en"
        ? {
            title: "Market produce, straightforward cooking and a place with character",
            text:
              "La Picatería brings together bar culture, charcoal grill, vermouth, tinned delicacies, wine and sharing dishes in a space with its own personality.",
          }
        : {
            title: "Produit de marche, cuisine directe et une maison avec de la personnalite",
            text:
              "La Picatería melange comptoir, braise, vermouth, conserves, vins et cuisine a partager dans un lieu avec une vraie identite.",
          };
  return (
    <>
      <RestaurantSchema locale={locale} />

      <section className="px-5 pb-16 pt-8 sm:px-6 lg:px-10 lg:pb-20 lg:pt-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.3rem] bg-white shadow-[0_28px_70px_rgba(31,26,23,0.14)]">
          <div className="relative min-h-[680px]">
              <Image
                src={heroImage}
                alt="Barra con producto, vitrina y ambiente real de La Picatería"
                fill
                priority
                className="object-cover object-center saturate-[1.04] contrast-[1.04]"
              />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,16,14,0.78)_0%,rgba(16,16,14,0.54)_32%,rgba(16,16,14,0.22)_58%,rgba(16,16,14,0.08)_100%)]" />
            <div className="relative z-10 flex min-h-[680px] items-end px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-14">
              <div className="max-w-3xl space-y-7">
                <p className="inline-flex rounded-full border border-white/18 bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-sm">
                  {heroCopy.eyebrow}
                </p>
                <div className="space-y-5">
                  <h1 className="max-w-4xl font-display text-5xl leading-[0.9] text-white sm:text-6xl lg:text-7xl">
                    {heroCopy.title}
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-white/88 sm:text-xl">
                    {heroCopy.subtitle}
                  </p>
                </div>
                <div className="space-y-3">
                  {locale === "es" ? (
                    <>
                      <p className="inline-flex rounded-full border border-white/16 bg-white/12 px-4 py-2 text-sm font-semibold text-white/95 backdrop-blur-sm">
                        ⭐ 4,4 en Google · +2.500 opiniones
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Tapas incluidas con cada bebida",
                          "Mercado de San Agustín · centro de Granada",
                          "Si vienes en hora punta, mejor reservar",
                        ].map((item, index) => (
                          <p
                            key={item}
                            className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold backdrop-blur-sm ${
                              index === 0
                                ? "bg-bone text-ink shadow-[0_12px_24px_rgba(16,16,14,0.14)]"
                                : "border border-white/16 bg-white/12 text-white/92"
                            }`}
                          >
                            {item}
                          </p>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
                  <TrackedReservationLink
                    label={heroCopy.reserve}
                    locale={locale}
                    location="hero"
                    eventName={locale === "es" ? "click_reserve_hero" : undefined}
                    className="inline-flex items-center justify-center rounded-full bg-sand-400 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-bone shadow-[0_24px_40px_rgba(132,81,28,0.4)] transition hover:bg-sand-500 hover:shadow-[0_28px_46px_rgba(132,81,28,0.48)]"
                  />
                  <CtaButton
                    href={`/${locale}/carta`}
                    label={heroCopy.menu}
                    variant="secondary"
                  />
                  {locale === "es" ? (
                    <TrackedPhoneLink
                      phoneHref={dictionary.business.phoneHref}
                      label="Llamar ahora"
                      locale={locale}
                      eventName="click_call_hero"
                      variant="secondary"
                    />
                  ) : null}
                </div>
                {locale === "es" ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      "Dentro del Mercado de San Agustín",
                      "A 1 minuto de la Catedral",
                      "Terraza disponible",
                    ].map((item) => (
                      <span
                        key={item}
                        className="inline-flex rounded-full border border-white/16 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/88 backdrop-blur-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="space-y-5 border-y border-border py-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
              {locale === "es"
                ? "Qué encontrarás"
                : locale === "en"
                  ? "What you will find"
                  : "Ce que vous allez trouver"}
            </p>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {featureList.map((item, index) => (
                <div key={item} className="space-y-3 border-t border-border pt-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-sand-500">
                    {`0${index + 1}`}
                  </span>
                  <p className="max-w-[18rem] text-base font-medium leading-7 text-ink">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {locale === "es" ? (
        <ConversionStatusPanel locale={locale} phoneHref={dictionary.business.phoneHref} />
      ) : null}

      <section className="bg-cream/55 px-5 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                {locale === "es"
                  ? "Especialidades reales"
                  : locale === "en"
                    ? "Real specialties"
                    : "Specialites de la maison"}
              </p>
              <h2 className="font-display text-5xl leading-tight text-ink">
                {locale === "es"
                  ? "Tres platos para entender la casa"
                  : locale === "en"
                    ? "Dishes that help you decide quickly"
                    : "Des plats qui aident a decider vite"}
              </h2>
            </div>
            <CtaButton href={`/${locale}/carta`} label={dictionary.cta.menu} />
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {specialties.map((item) => (
              <article key={item.name} className="space-y-3 border-b border-border pb-5 lg:border-b-0 lg:border-r lg:pr-6 last:border-r-0">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand-500">
                  {item.note}
                </p>
                <h3 className="font-display text-3xl text-ink">{item.name}</h3>
                <p className="text-sm leading-7 text-charcoal">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {locale === "es" && kitchenMoments ? (
        <section className="px-5 py-16 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="space-y-3 border-b border-border pb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                Cocina
              </p>
              <h2 className="font-display text-5xl leading-tight text-ink">
                Lo que sale de cocina
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {kitchenMoments.map((item) => (
                <article key={item.title} className="space-y-4">
                  <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_16px_34px_rgba(31,26,23,0.08)]">
                    <div className="relative min-h-[250px]">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        className={`object-cover ${item.position}`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-3xl text-ink">{item.title}</h3>
                    <p className="text-sm leading-7 text-charcoal">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="pt-2">
              <TrackedReservationLink
                label={dictionary.cta.reserve}
                locale={locale}
                location="hero"
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-5 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
              {locale === "es"
                ? "Lo que más valoran quienes vienen"
                : locale === "en"
                  ? "Social proof without the fluff"
                  : "Preuve sociale sans effet de manche"}
            </p>
            {locale === "es" ? (
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sand-500">
                4,4 en Google · más de 2.500 opiniones
              </p>
            ) : null}
            <h2 className="font-display text-5xl leading-tight text-ink">
              {socialProof.title}
            </h2>
            <div className="space-y-4">
              {socialProof.points.map((item) => (
                <p key={item} className="border-b border-border pb-4 text-base leading-8 text-charcoal">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
              {beforeYouCome.title}
            </p>
            <div className="space-y-3">
              {beforeYouCome.points.map((item, index) => (
                <div
                  key={item}
                  className={`rounded-[1.4rem] border px-5 py-4 text-sm font-medium leading-7 ${
                    index === 0
                      ? "border-sand-300 bg-sand-200/22 text-ink"
                      : "border-border bg-white text-ink"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/70 px-5 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                {dictionary.sections.location.eyebrow}
              </p>
              <h2 className="font-display text-5xl leading-tight text-ink">
                {locationBlock.title}
              </h2>
              <p className="max-w-2xl text-base leading-8 text-charcoal">
                {locationBlock.text}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <TrackedReservationLink
                label={dictionary.cta.reserve}
                locale={locale}
                location="hero"
              />
              <CtaButton href={`/${locale}/contacto`} label={dictionary.cta.contact} variant="secondary" />
            </div>
          </div>
        </div>
      </section>

      {locale === "es" ? (
        <section className="px-5 py-16 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-border bg-cream/68 px-6 py-8 shadow-[0_18px_36px_rgba(31,26,23,0.08)] sm:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                  Reserva
                </p>
                <h2 className="font-display text-5xl leading-tight text-ink">
                  Reserva tu mesa en el centro de Granada
                </h2>
                <p className="text-base leading-8 text-charcoal">
                  Tapas, brasa, terraza y una ubicación perfecta dentro del Mercado de San Agustín.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <TrackedReservationLink
                  label="Reservar mesa"
                  locale={locale}
                  location="hero"
                  eventName="click_reserve_hero"
                />
                <TrackedPhoneLink
                  phoneHref={dictionary.business.phoneHref}
                  label="Llamar"
                  locale={locale}
                  eventName="click_call_home"
                  variant="secondary"
                />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-5 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeading
              eyebrow={dictionary.sections.menu.eyebrow}
              title={dictionary.sections.menu.title}
              description={dictionary.sections.menu.description}
            />
            <div className="space-y-4 border-t border-border pt-4">
              {preview.map((item) => (
                <article key={item.name} className="border-b border-border/70 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-3xl text-ink">{item.name}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-charcoal">
                        {item.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-xl font-semibold text-sand-500">
                      {item.price}
                    </span>
                  </div>
                </article>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <CtaButton href={`/${locale}/carta`} label={dictionary.cta.menu} />
              <CtaButton href={`/${locale}/reservas`} label={dictionary.navigation.booking} variant="secondary" />
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.9rem] bg-white shadow-[0_20px_48px_rgba(31,26,23,0.11)]">
            <div className="relative min-h-[520px]">
              <Image
                src={brandImage}
                alt="Barra de madera e identidad interior de La Picatería"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream/72 px-5 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                {dictionary.sections.differentials.eyebrow}
              </p>
              <h2 className="max-w-2xl font-display text-5xl leading-tight text-ink">
                {brandCopy.title}
              </h2>
              <p className="max-w-xl text-base leading-8 text-charcoal">
                {brandCopy.text}
              </p>
            </div>

            <div className="space-y-4 border-t border-border pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sand-500">
                {dictionary.sections.booking.eyebrow}
              </p>
              <p className="max-w-xl text-base leading-8 text-charcoal">
                {dictionary.sections.booking.description}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <CtaButton href={`/${locale}/reservas`} label={dictionary.navigation.booking} />
                <CtaButton href={`/${locale}/carta`} label={dictionary.cta.menu} variant="secondary" />
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.9rem] bg-white shadow-[0_20px_48px_rgba(31,26,23,0.11)]">
            <div className="relative min-h-[460px]">
              <Image
                src={brandImage}
                alt="Interior con barra de madera y branding de La Picatería"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="overflow-hidden rounded-[1.9rem] bg-cream shadow-[0_20px_48px_rgba(31,26,23,0.11)]">
            <div className="relative min-h-[520px]">
              <Image
                src={terraceImage}
                alt="Terraza real de La Picatería en el Mercado de San Agustín"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <SectionHeading
              eyebrow={dictionary.sections.location.eyebrow}
              title={terraceCopy.title}
              description={terraceCopy.text}
            />
            <div className="border-t border-border pt-5">
              <CtaButton
                href={`/${locale}/contacto`}
                label={terraceCopy.cta}
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/94 px-4 py-2.5 shadow-[0_-8px_20px_rgba(31,26,23,0.08)] backdrop-blur md:hidden">
        <div className="grid grid-cols-[1.5fr_1fr] gap-2">
          <TrackedReservationLink
            label={locale === "es" ? "Reservar mesa" : locale === "en" ? "Book a table" : "Reserver une table"}
            locale={locale}
            location="hero"
            className="inline-flex w-full items-center justify-center rounded-full bg-sand-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-bone shadow-[0_12px_22px_rgba(132,81,28,0.22)] transition hover:bg-sand-500"
          />
          <TrackedPhoneLink
            phoneHref={dictionary.business.phoneHref}
            label={locale === "es" ? "Llamar" : locale === "en" ? "Call" : "Appeler"}
            locale={locale}
            eventName="click_call_home"
            variant="secondary"
          />
        </div>
      </div>
    </>
  );
}
