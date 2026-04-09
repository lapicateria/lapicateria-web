import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConversionStatusPanel } from "@/components/conversion-status-panel";
import { CtaButton } from "@/components/cta-button";
import { RestaurantSchema } from "@/components/restaurant-schema";
import { SectionHeading } from "@/components/section-heading";
import { TrackedCtaButton } from "@/components/tracked-cta-button";
import { TrackedPhoneLink } from "@/components/tracked-phone-link";
import { TrackedReservationLink } from "@/components/tracked-reservation-link";
import {
  experienceStoryByLocale,
  featuredDishesByLocale,
  featuredReviewsByLocale,
  quickDecisionByLocale,
  reviewSummaryByLocale,
  touristModuleByLocale,
  whyPeopleReturnByLocale,
} from "@/content/brand-story";
import menuData from "@/content/menu.json";
import { getSeoLanding, seoLandingSlugs } from "@/content/seo-landings";
import { getBusinessHoursPresentation } from "@/lib/business-hours";
import { buildMetadata } from "@/lib/metadata";
import { getDictionary, getMenuPreview, isValidLocale } from "@/lib/i18n";

const heroImage = "/images/real/paella_entrecot.jpg";
const terraceImage = "/images/real/terraza.jpg";
const brandImage = "/images/real/jamon_asado.jpg";
const chuletonImage = "/images/real/chuleton.jpg";
const paellaImage = "/images/real/paella.jpg";
const pinchosImage = "/images/real/pinchos_picateria.jpg";
const atmosphereImage = "/images/real/barra-producto.jpg";

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
  const hours = await getBusinessHoursPresentation(locale);
  const reviewSummary = reviewSummaryByLocale[locale];
  const featuredReviews = featuredReviewsByLocale[locale];
  const featuredDishes = featuredDishesByLocale[locale];
  const experienceStory = experienceStoryByLocale[locale];
  const quickDecision = quickDecisionByLocale[locale];
  const touristModule = touristModuleByLocale[locale];
  const whyPeopleReturn = whyPeopleReturnByLocale[locale];
  const seoIntentLinks = seoLandingSlugs
    .map((slug) => getSeoLanding(slug))
    .filter(Boolean)
    .map((entry) => ({
      slug: entry!.slug,
      title: entry!.content[locale].title,
      description: entry!.content[locale].description,
      eyebrow: entry!.content[locale].eyebrow,
    }));
  const decisionCards =
    locale === "es"
      ? [
          {
            eyebrow: "Dónde",
            title: "Mercado de San Agustín",
            text: "Junto a la Catedral y muy fácil de ubicar si estás por el centro.",
          },
          {
            eyebrow: "Qué tipo de sitio",
            title: "Brasa, tapas y carta para compartir",
            text: "Una casa pensada para tapear, comer con calma o alargar la mesa.",
          },
          {
            eyebrow: "Por qué ir",
            title: "Terraza y producto reconocible",
            text: "Pulpo, jamón asado, arroces y brasa de carbón con un tono muy de mercado.",
          },
          {
            eyebrow: "Qué hacer ahora",
            title: "Ver carta o reservar",
            text: "Si vienes en hora punta o el fin de semana, mejor llegar con mesa confirmada.",
          },
        ]
      : null;
  const preview = getMenuPreview(menuData, locale);
  const beforeYouCome =
    locale === "es"
      ? {
          title: "Antes de venir",
          points: [
            "Tapas incluidas con cada bebida",
            "Puedes venir a tapear o sentarte a comer a la carta",
            "Comida media alrededor de 20 €",
            "Fines de semana y horas punta: mejor reservar antes",
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
            "En el Mercado de San Agustín, junto a la Catedral. Un sitio para tapear, compartir paellas, sentarse con calma y decidir rápido si reservas o vienes directo.",
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
            "Terraza, mercado y centro histórico: La Picatería está en el corazón de Granada, a pocos pasos de la Catedral y muy fácil de ubicar.",
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
  const realGallery =
    locale === "es"
      ? [
          {
            title: "Paella",
            note: "Para compartir",
            image: paellaImage,
            alt: "Paella servida en La Picatería",
            className: "md:col-span-2",
          },
          {
            title: "Chuletón",
            note: "Brasa de carbón",
            image: chuletonImage,
            alt: "Chuletón a la brasa de La Picatería",
            className: "",
          },
          {
            title: "Jamón asado",
            note: "Especialidad",
            image: brandImage,
            alt: "Jamón asado de La Picatería",
            className: "",
          },
          {
            title: "Ambiente",
            note: "Barra y producto real",
            image: atmosphereImage,
            alt: "Barra con producto real en La Picatería",
            className: "md:col-span-2",
          },
        ]
      : null;
  return (
    <>
      <RestaurantSchema locale={locale} />

      <section className="px-5 pb-16 pt-8 sm:px-6 lg:px-10 lg:pb-20 lg:pt-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.3rem] bg-white shadow-[0_28px_70px_rgba(31,26,23,0.14)]">
          <div className="relative min-h-[680px]">
              <Image
                src={heroImage}
                alt="Paella y carne a la brasa en La Picatería"
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
                          "Precio medio orientativo: 20 €",
                          hours.todayStatus,
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
                  <TrackedCtaButton
                    href={`/${locale}/carta`}
                    label={heroCopy.menu}
                    locale={locale}
                    location="hero"
                    eventName="click_menu_hero"
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
          {locale === "es" && decisionCards ? (
            <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {decisionCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-[1.5rem] border border-border bg-white/92 p-5 shadow-[0_14px_28px_rgba(31,26,23,0.06)]"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sand-500">
                    {card.eyebrow}
                  </p>
                  <h2 className="mt-3 font-display text-3xl leading-tight text-ink">
                    {card.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-charcoal">{card.text}</p>
                </article>
              ))}
            </div>
          ) : null}

          <div className="grid gap-8 border-y border-border py-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-start">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                {quickDecision.title}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {quickDecision.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[1.3rem] border border-border bg-white px-4 py-4 shadow-[0_12px_24px_rgba(31,26,23,0.04)]"
                  >
                    <span className="mt-0.5 text-base font-semibold text-sand-500">✔</span>
                    <p className="text-sm font-medium leading-7 text-ink">{item}</p>
                  </div>
                ))}
              </div>
              {locale === "es" ? (
              <div className="rounded-[1.5rem] border border-sand-300 bg-sand-200/20 px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand-500">
                    Microdecisión
                  </p>
                  <p className="mt-3 text-sm leading-7 text-charcoal">
                    Si vienes en hora punta, a por paella o con idea de terraza, mejor reservar antes.
                  </p>
                  <p className="mt-2 text-sm leading-7 text-charcoal">
                    {hours.todayMessage}
                  </p>
                  <div className="mt-4">
                    <TrackedReservationLink
                      label="Reservar mesa"
                      locale={locale}
                      location="decision_block"
                      eventName="click_home_decision_reserve"
                    />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="space-y-5 rounded-[1.7rem] border border-border bg-white p-6 shadow-[0_18px_34px_rgba(31,26,23,0.06)]">
              <div className="grid gap-4 sm:grid-cols-[0.74fr_1.26fr] sm:items-start">
                <div className="rounded-[1.4rem] border border-sand-300 bg-sand-200/22 px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                    {reviewSummary.kicker}
                  </p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-sand-500">
                    {reviewSummary.rating}
                  </p>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-sand-500">
                    {reviewSummary.volume}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-charcoal">{reviewSummary.title}</p>
                </div>
                <div className="grid gap-3">
                  {featuredReviews.slice(0, 2).map((item, index) => (
                    <blockquote
                      key={`${item.tag}-${index}`}
                      className="rounded-[1.3rem] border border-border bg-cream/45 px-4 py-4 text-sm leading-7 text-charcoal"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sand-500">
                        {item.tag}
                      </p>
                      <p className="mt-2 font-medium">“{item.quote}”</p>
                    </blockquote>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <TrackedCtaButton
                  href={`/${locale}/carta`}
                  label={locale === "es" ? "Ver carta" : locale === "en" ? "View menu" : "Voir la carte"}
                  locale={locale}
                  location="social_proof"
                  eventName="click_social_proof_menu"
                  variant="secondary"
                />
                <TrackedReservationLink
                  label={locale === "es" ? "Reservar mesa" : locale === "en" ? "Book a table" : "Reserver une table"}
                  locale={locale}
                  location="social_proof"
                  eventName="click_social_proof_reserve"
                />
              </div>
            </div>
          </div>

          {locale === "es" && realGallery ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {realGallery.map((item) => (
                <article
                  key={item.title}
                  className={`overflow-hidden rounded-[1.8rem] bg-white shadow-[0_18px_38px_rgba(31,26,23,0.09)] ${item.className}`}
                >
                  <div className="relative min-h-[280px] sm:min-h-[320px]">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(16,16,14,0)_0%,rgba(16,16,14,0.72)_100%)] px-5 py-5 text-white">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/72">
                        {item.note}
                      </p>
                      <h2 className="mt-2 font-display text-3xl leading-tight">{item.title}</h2>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {locale === "es" ? (
        <section className="px-5 pb-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 rounded-[1.9rem] border border-border bg-white p-5 shadow-[0_18px_38px_rgba(31,26,23,0.08)] lg:grid-cols-[0.94fr_1.06fr] lg:items-center sm:p-6">
              <div className="relative min-h-[260px] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={pinchosImage}
                  alt="Pinchos y producto real de La Picatería"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                  Decidir rápido
                </p>
                <h2 className="font-display text-4xl leading-tight text-ink">
                  Producto reconocible, carta clara y un plan fácil de cerrar
                </h2>
                <p className="text-sm leading-8 text-charcoal">
                  Vienes, ves brasa, tapas, platos para compartir y entiendes enseguida si te apetece reservar o pasar a tapear.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <TrackedReservationLink
                    label="Reservar mesa"
                    locale={locale}
                    location="hero"
                    eventName="click_reserve_home_visual_block"
                  />
                  <TrackedCtaButton
                    href={`/${locale}/carta`}
                    label="Ver carta"
                    locale={locale}
                    location="hero"
                    eventName="click_menu_visual_block"
                    variant="secondary"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {locale === "es" ? (
        <ConversionStatusPanel locale={locale} phoneHref={dictionary.business.phoneHref} />
      ) : null}

      <section className="bg-cream/55 px-5 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex flex-col gap-6 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                {locale === "es"
                  ? "Platos estrella"
                  : locale === "en"
                    ? "Featured dishes"
                    : "Plats signatures"}
              </p>
              <h2 className="font-display text-5xl leading-tight text-ink">
                {locale === "es"
                  ? "Cuatro razones muy fáciles para querer venir"
                  : locale === "en"
                    ? "Four fast reasons to picture the table"
                    : "Quatre raisons simples d'avoir envie d'y aller"}
              </h2>
              <p className="max-w-2xl text-base leading-8 text-charcoal">
                {locale === "es"
                  ? "Producto real, platos reconocibles y una lectura muy rápida para el usuario que compara varios restaurantes antes de reservar."
                  : locale === "en"
                    ? "Recognisable dishes, real product and a fast read for guests comparing several places before booking."
                    : "Des plats reconnaissables, du vrai produit et une lecture rapide pour ceux qui comparent plusieurs adresses avant de reserver."}
              </p>
            </div>
            <TrackedCtaButton
              href={`/${locale}/carta`}
              label={dictionary.cta.menu}
              locale={locale}
              location="featured_dishes"
              eventName="click_featured_dishes_menu"
              variant="secondary"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredDishes.map((dish) => (
              <article
                key={dish.key}
                className="overflow-hidden rounded-[1.7rem] border border-border bg-white shadow-[0_18px_38px_rgba(31,26,23,0.08)]"
              >
                <div className="relative min-h-[260px]">
                  <Image
                    src={dish.image}
                    alt={dish.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4 px-5 py-5">
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sand-500">
                      {locale === "es"
                        ? "Imprescindible"
                        : locale === "en"
                          ? "Must try"
                          : "A ne pas manquer"}
                    </p>
                    <h3 className="font-display text-3xl leading-tight text-ink">{dish.name}</h3>
                    <p className="text-sm leading-7 text-charcoal">{dish.description}</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <TrackedCtaButton
                      href={`/${locale}/carta`}
                      label={locale === "es" ? "Ver carta" : locale === "en" ? "View menu" : "Voir la carte"}
                      locale={locale}
                      location="featured_dishes"
                      eventName={`click_featured_dish_${dish.key}_menu`}
                      variant="secondary"
                    />
                    <TrackedReservationLink
                      label={locale === "es" ? "Reservar mesa" : locale === "en" ? "Book a table" : "Reserver une table"}
                      locale={locale}
                      location="featured_dishes"
                      eventName={`click_featured_dish_${dish.key}_reserve`}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
              {reviewSummary.kicker}
            </p>
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sand-500">
                {reviewSummary.rating} · {reviewSummary.volume}
              </p>
              <h2 className="font-display text-5xl leading-tight text-ink">
                {reviewSummary.title}
              </h2>
            </div>
            <div className="grid gap-3">
              {featuredReviews.map((item, index) => (
                <blockquote
                  key={`${item.tag}-${index}`}
                  className="rounded-[1.4rem] border border-border bg-white px-5 py-5 shadow-[0_14px_28px_rgba(31,26,23,0.05)]"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sand-500">
                    {item.tag}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-charcoal">“{item.quote}”</p>
                </blockquote>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <TrackedCtaButton
                href={`/${locale}/carta`}
                label={locale === "es" ? "Ver carta" : locale === "en" ? "View menu" : "Voir la carte"}
                locale={locale}
                location="social_proof"
                eventName="click_reviews_menu"
                variant="secondary"
              />
              <TrackedReservationLink
                label={locale === "es" ? "Reservar mesa" : locale === "en" ? "Book a table" : "Reserver une table"}
                locale={locale}
                location="social_proof"
                eventName="click_reviews_reserve"
              />
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
            {locale === "es" ? (
              <div className="rounded-[1.5rem] border border-border bg-white px-5 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand-500">
                  Reserva recomendada
                </p>
                <p className="mt-3 text-sm leading-7 text-charcoal">
                  Si vienes a por arroz, terraza o mesa con calma, lo más cómodo es reservar antes desde la web.
                </p>
                <div className="mt-4">
                  <TrackedReservationLink
                    label="Reservar mesa"
                    locale={locale}
                    location="social_proof"
                    eventName="click_reviews_sidebar_reserve"
                  />
                </div>
                <p className="mt-4 text-sm leading-7 text-charcoal">{hours.summary}</p>
              </div>
            ) : null}
            <div className="rounded-[1.5rem] border border-border bg-cream/45 px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand-500">
                {whyPeopleReturn.title}
              </p>
              <div className="mt-4 space-y-3">
                {whyPeopleReturn.points.map((item) => (
                  <p key={item} className="text-sm leading-7 text-charcoal">
                    {item}
                  </p>
                ))}
              </div>
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
                eventName="click_reserve_location_block"
              />
              <TrackedCtaButton
                href={`/${locale}/contacto`}
                label={dictionary.cta.contact}
                locale={locale}
                location="experience_block"
                eventName="click_contact_location_block"
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl rounded-[1.9rem] border border-border bg-white px-6 py-8 shadow-[0_18px_38px_rgba(31,26,23,0.07)] sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                {touristModule.title}
              </p>
              <h2 className="font-display text-4xl leading-tight text-ink">
                {locale === "es"
                  ? "Una parada muy fácil de entender si te mueves por la zona de Catedral"
                  : locale === "en"
                    ? "An easy choice if you are moving around the Cathedral area"
                    : "Une adresse tres simple a comprendre si vous passez par la zone de la Cathedrale"}
              </h2>
              <p className="max-w-2xl text-base leading-8 text-charcoal">
                {touristModule.description}
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {touristModule.bullets.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.3rem] border border-border bg-cream/40 px-4 py-4 text-sm leading-7 text-charcoal"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <TrackedReservationLink
                label={locale === "es" ? "Reservar mesa" : locale === "en" ? "Book a table" : "Reserver une table"}
                locale={locale}
                location="tourist_block"
                eventName="click_home_tourist_reserve"
              />
              <TrackedCtaButton
                href={`/${locale}/contacto`}
                label={locale === "es" ? "Ver ubicación" : locale === "en" ? "See location" : "Voir l'emplacement"}
                locale={locale}
                location="tourist_block"
                eventName="click_home_tourist_contact"
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </section>

      {locale === "es" ? (
        <section className="px-5 py-16 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                Búsquedas locales
              </p>
              <h2 className="font-display text-5xl leading-tight text-ink">
                Páginas pensadas para quien compara dónde comer en Granada
              </h2>
              <p className="max-w-3xl text-base leading-8 text-charcoal">
                Si vienes desde Google buscando tapas, mercado, centro o restaurantes cerca de la Catedral, aquí tienes accesos directos a la información más útil.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {seoIntentLinks.map((item) => (
                <article
                  key={item.slug}
                  className="rounded-[1.6rem] border border-border bg-white p-5 shadow-[0_14px_28px_rgba(31,26,23,0.05)]"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sand-500">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-3 font-display text-3xl leading-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-charcoal">
                    {item.description}
                  </p>
                  <div className="mt-4">
                    <TrackedCtaButton
                      href={`/${locale}/${item.slug}`}
                      label="Abrir página"
                      locale={locale}
                      location="seo_page"
                      eventName={`click_home_seo_link_${item.slug}`}
                      variant="secondary"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

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
              <TrackedCtaButton
                href={`/${locale}/carta`}
                label={dictionary.cta.menu}
                locale={locale}
                location="carta_page"
                eventName="click_menu_preview"
              />
              <TrackedCtaButton
                href={`/${locale}/reservas`}
                label={dictionary.navigation.booking}
                locale={locale}
                location="carta_page"
                eventName="click_booking_preview"
                variant="secondary"
              />
            </div>
            {locale === "es" ? (
              <div className="rounded-[1.5rem] border border-border bg-cream/55 px-5 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand-500">
                  Carta a un paso de reservar
                </p>
                <p className="mt-3 text-sm leading-7 text-charcoal">
                  La carta está pensada para decidir rápido. Si ya sabes que vienes, reserva mesa y deja resuelto el plan.
                </p>
              </div>
            ) : null}
          </div>

          <div className="overflow-hidden rounded-[1.9rem] bg-white shadow-[0_20px_48px_rgba(31,26,23,0.11)]">
            <div className="relative min-h-[520px]">
              <Image
                src={paellaImage}
                alt="Paella real de La Picatería"
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
                {experienceStory.eyebrow}
              </p>
              <h2 className="max-w-2xl font-display text-5xl leading-tight text-ink">
                {experienceStory.title}
              </h2>
              <p className="max-w-xl text-base leading-8 text-charcoal">
                {experienceStory.description}
              </p>
              <div className="grid gap-3 pt-1 sm:grid-cols-2">
                {experienceStory.bullets.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.3rem] border border-border bg-white/86 px-4 py-4 text-sm leading-7 text-charcoal shadow-[0_10px_24px_rgba(31,26,23,0.04)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 border-t border-border pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sand-500">
                {dictionary.sections.booking.eyebrow}
              </p>
              <p className="max-w-xl text-base leading-8 text-charcoal">
                {dictionary.sections.booking.description}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <TrackedCtaButton
                  href={`/${locale}/reservas`}
                  label={dictionary.navigation.booking}
                  locale={locale}
                  location="experience_block"
                  eventName="click_experience_booking"
                />
                <TrackedCtaButton
                  href={`/${locale}/carta`}
                  label={dictionary.cta.menu}
                  locale={locale}
                  location="experience_block"
                  eventName="click_experience_menu"
                  variant="secondary"
                />
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.9rem] bg-white shadow-[0_20px_48px_rgba(31,26,23,0.11)]">
            <div className="relative min-h-[460px]">
              <Image
                src={experienceStory.image}
                alt={experienceStory.alt}
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

    </>
  );
}
