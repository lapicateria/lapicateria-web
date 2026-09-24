import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RestaurantSchema } from "@/components/restaurant-schema";
import { SectionHeading } from "@/components/section-heading";
import { TrackedCtaButton } from "@/components/tracked-cta-button";
import { TrackedPhoneLink } from "@/components/tracked-phone-link";
import { TrackedReservationLink } from "@/components/tracked-reservation-link";
import {
  experienceStoryByLocale,
  featuredDishesByLocale,
} from "@/content/brand-story";
import menuData from "@/content/menu.json";
import { getBusinessHoursPresentation } from "@/lib/business-hours";
import { buildMetadata } from "@/lib/metadata";
import { getDictionary, getMenuPreview, isValidLocale } from "@/lib/i18n";

const heroImage = "/images/real/chuleton.jpg";
const barImage = "/images/real/barra-madera.jpg";
const terraceImage = "/images/real/terraza.jpg";

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
  const featuredDishes = featuredDishesByLocale[locale];
  const experienceStory = experienceStoryByLocale[locale];
  const preview = getMenuPreview(menuData, locale);

  const heroCopy =
    locale === "es"
      ? {
          eyebrow: "Mercado · brasa de carbón · Granada",
          title: "Brasa de carbón, tapas y producto real en el centro de Granada",
          subtitle:
            "Dentro del Mercado de San Agustín, junto a la Catedral. Tapeo, platos para compartir y cocina a la brasa.",
          reserve: "Reservar mesa",
          menu: "Ver carta",
          call: "Llamar",
        }
      : locale === "en"
        ? {
            eyebrow: "Market · charcoal grill · Granada",
            title: "Charcoal grill and real produce in the heart of Granada",
            subtitle:
              "Inside Mercado de San Agustin, next to the Cathedral. Tapas, sharing plates and charcoal-grilled dishes.",
            reserve: "Book a table",
            menu: "View menu",
            call: "Call",
          }
        : {
            eyebrow: "Marché · braise au charbon · Grenade",
            title: "Braise au charbon et produits de qualité au centre de Grenade",
            subtitle:
              "Dans le Mercado de San Agustin, près de la Cathédrale. Tapas, plats à partager et cuisine à la braise.",
            reserve: "Réserver une table",
            menu: "Voir la carte",
            call: "Appeler",
          };

  const featuredCopy =
    locale === "es"
      ? {
          eyebrow: "Especialidades de la casa",
          title: "Sabores que definen La Picatería",
          text: "Producto reconocible, brasa de carbón y platos pensados para compartir.",
        }
      : locale === "en"
        ? {
            eyebrow: "House specialities",
            title: "Flavours that define La Picatería",
            text: "Recognisable produce, charcoal grilling and dishes made for sharing.",
          }
        : {
            eyebrow: "Spécialités de la maison",
            title: "Les saveurs de La Picatería",
            text: "Des produits reconnaissables, une cuisson à la braise et des plats à partager.",
          };

  const locationCopy =
    locale === "es"
      ? {
          eyebrow: "Ubicación",
          title: "Dentro del mercado, a un minuto de la Catedral",
          text: "Estamos en el Mercado de San Agustín, en pleno centro de Granada. Puedes venir a tapear, sentarte a comer o reservar antes de acercarte.",
          contact: "Cómo llegar",
        }
      : locale === "en"
        ? {
            eyebrow: "Location",
            title: "Inside the market, one minute from the Cathedral",
            text: "Find us inside Mercado de San Agustin, in central Granada. Stop for tapas, sit down for a meal or book before you arrive.",
            contact: "How to get here",
          }
        : {
            eyebrow: "Emplacement",
            title: "Dans le marché, à une minute de la Cathédrale",
            text: "Nous sommes dans le Mercado de San Agustin, au centre de Grenade. Venez pour des tapas, un repas ou réservez avant votre arrivée.",
            contact: "Nous trouver",
          };

  return (
    <>
      <RestaurantSchema locale={locale} />

      <section className="px-5 pb-12 pt-8 sm:px-6 lg:px-10 lg:pb-16 lg:pt-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.3rem] bg-white shadow-[0_28px_70px_rgba(31,26,23,0.14)]">
          <div className="relative min-h-[620px]">
            <Image
              src={heroImage}
              alt="Chuletón a la brasa de carbón en La Picatería"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center saturate-[1.04] contrast-[1.04]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,16,14,0.8)_0%,rgba(16,16,14,0.5)_42%,rgba(16,16,14,0.12)_100%)]" />
            <div className="relative z-10 flex min-h-[620px] items-end px-6 py-9 sm:px-10 lg:px-14 lg:py-14">
              <div className="max-w-3xl space-y-6">
                <p className="inline-flex rounded-full border border-white/20 bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-sm">
                  {heroCopy.eyebrow}
                </p>
                <div className="space-y-4">
                  <h1 className="font-display text-5xl leading-[0.92] text-white sm:text-6xl lg:text-7xl">
                    {heroCopy.title}
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-white/90 sm:text-xl">
                    {heroCopy.subtitle}
                  </p>
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/85">
                  {hours.todayStatus}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <TrackedReservationLink
                    label={heroCopy.reserve}
                    locale={locale}
                    location="hero"
                    eventName={locale === "es" ? "click_reserve_hero" : undefined}
                  />
                  <TrackedCtaButton
                    href={`/${locale}/carta`}
                    label={heroCopy.menu}
                    locale={locale}
                    location="hero"
                    eventName="click_menu_hero"
                    variant="secondary"
                  />
                  <TrackedPhoneLink
                    phoneHref={dictionary.business.phoneHref}
                    label={heroCopy.call}
                    locale={locale}
                    eventName={locale === "es" ? "click_call_hero" : "click_call_global"}
                    variant="secondary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream/55 px-5 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex flex-col gap-6 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow={featuredCopy.eyebrow}
              title={featuredCopy.title}
              description={featuredCopy.text}
            />
            <TrackedCtaButton
              href={`/${locale}/carta`}
              label={dictionary.cta.menu}
              locale={locale}
              location="featured_dishes"
              eventName="click_featured_dishes_menu"
              variant="secondary"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {featuredDishes.map((dish) => (
              <article
                key={dish.key}
                className="overflow-hidden rounded-[1.7rem] border border-border bg-white shadow-[0_18px_38px_rgba(31,26,23,0.08)]"
              >
                <div className="relative min-h-[280px]">
                  <Image
                    src={dish.image}
                    alt={dish.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 px-5 py-5">
                  <h2 className="font-display text-3xl leading-tight text-ink">{dish.name}</h2>
                  <p className="text-sm leading-7 text-charcoal">{dish.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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
              <TrackedReservationLink
                label={dictionary.cta.reserve}
                locale={locale}
                location="carta_page"
                eventName="click_booking_preview"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.9rem] bg-white shadow-[0_20px_48px_rgba(31,26,23,0.11)]">
            <div className="relative min-h-[520px]">
              <Image
                src={barImage}
                alt="Barra de La Picatería en el Mercado de San Agustín"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream/72 px-5 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
          <div className="space-y-7">
            <SectionHeading
              eyebrow={experienceStory.eyebrow}
              title={experienceStory.title}
              description={experienceStory.description}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {experienceStory.bullets.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.3rem] border border-border bg-white/86 px-4 py-4 text-sm leading-7 text-charcoal"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-[1.9rem] bg-white shadow-[0_20px_48px_rgba(31,26,23,0.11)]">
            <div className="relative min-h-[460px]">
              <Image
                src={experienceStory.image}
                alt={experienceStory.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="overflow-hidden rounded-[1.9rem] bg-cream shadow-[0_20px_48px_rgba(31,26,23,0.11)]">
            <div className="relative min-h-[480px]">
              <Image
                src={terraceImage}
                alt="Terraza de La Picatería en el Mercado de San Agustín"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="space-y-6">
            <SectionHeading
              eyebrow={locationCopy.eyebrow}
              title={locationCopy.title}
              description={locationCopy.text}
            />
            <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row">
              <TrackedCtaButton
                href={`/${locale}/contacto`}
                label={locationCopy.contact}
                locale={locale}
                location="experience_block"
                eventName="click_contact_location_block"
                variant="secondary"
              />
              <TrackedReservationLink
                label={dictionary.cta.reserve}
                locale={locale}
                location="experience_block"
                eventName="click_reserve_location_block"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/70 px-5 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-border bg-cream/68 px-6 py-8 shadow-[0_18px_36px_rgba(31,26,23,0.08)] sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                {dictionary.sections.booking.eyebrow}
              </p>
              <h2 className="font-display text-5xl leading-tight text-ink">
                {dictionary.sections.booking.title}
              </h2>
              <p className="text-base leading-8 text-charcoal">
                {dictionary.sections.booking.description}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <TrackedReservationLink
                label={dictionary.cta.reserve}
                locale={locale}
                location="hero"
                eventName="click_reserve_final"
              />
              <TrackedPhoneLink
                phoneHref={dictionary.business.phoneHref}
                label={heroCopy.call}
                locale={locale}
                eventName={locale === "es" ? "click_call_home" : "click_call_global"}
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
