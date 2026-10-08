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

const heroImage = "/images/logos/smash-lab-fenix.webp";
const barImage = "/images/real/barra-madera.jpg";
const terraceImage = "/images/real/terraza-actual.jpg";

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
          eyebrow: "NOVEDAD · LLEGA SMASH LAB",
          title: "La Picatería renace. Más fuego. Más sabor.",
          subtitle:
            "La Picatería reabre al completo. SMASH LAB se suma a nuestra oferta tradicional con siete burgers y patatas caseras, junto a la brasa y los sabores de siempre. Mercado de San Agustín, Granada.",
          reserve: "Reservar mesa",
          menu: "Ver carta",
          call: "Llamar",
        }
      : locale === "en"
        ? {
            eyebrow: "NEW · SMASH LAB HAS ARRIVED",
            title: "La Picatería rises again. More fire. More flavour.",
            subtitle:
              "La Picatería fully reopens. SMASH LAB joins our traditional menu with seven burgers and homemade fries, alongside our signature charcoal grill. Mercado de San Agustín, Granada.",
            reserve: "Book a table",
            menu: "View menu",
            call: "Call",
          }
        : {
            eyebrow: "NOUVEAUTÉ · SMASH LAB EST ARRIVÉ",
            title: "La Picatería renaît. Plus de feu. Plus de saveur.",
            subtitle:
              "La Picatería rouvre au complet. SMASH LAB complète notre offre traditionnelle avec sept burgers et des frites maison, aux côtés de nos grillades au charbon. Mercado de San Agustín, Grenade.",
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

      <section className="launch-section px-5 pb-12 pt-6 sm:px-6 lg:px-10">
        <div className="launch-card mx-auto max-w-6xl overflow-hidden">
          <div className="relative aspect-[3/1] bg-cream">
            <Image src={heroImage} alt="La Picatería · SMASH LAB, con el ave fénix de fuego naranja" fill preload sizes="(max-width: 1200px) 100vw, 1152px" className="object-contain" />
          </div>
          <div className="launch-copy grid gap-6 px-6 py-6 sm:px-10 lg:grid-cols-[1.4fr_1fr] lg:px-10 lg:py-8">
            <div className="space-y-5">
              <p className="launch-badge">{heroCopy.eyebrow}</p>
              <h1 className="launch-title">{heroCopy.title}</h1>
              <p className="max-w-2xl text-base leading-8 text-white/85 sm:text-lg">{heroCopy.subtitle}</p>
            </div>
            <div className="flex flex-col justify-end gap-4">
              <p className="text-2xl font-bold text-[#ff8b3d]">THE SHOW MUST GO ON.</p>
              <p className="text-sm text-white/80">{hours.todayStatus}</p>
              <div className="flex flex-col gap-3">
                <TrackedCtaButton href={`/${locale}/carta#smash-lab`} label={locale === "es" ? "Descubre la nueva carta" : locale === "en" ? "Discover the new menu" : "Découvrez la nouvelle carte"} locale={locale} location="hero" eventName="click_menu_hero" />
                <TrackedReservationLink label={heroCopy.reserve} locale={locale} location="hero" eventName={locale === "es" ? "click_reserve_hero" : undefined} />
                <TrackedPhoneLink phoneHref={dictionary.business.phoneHref} label={heroCopy.call} locale={locale} eventName={locale === "es" ? "click_call_hero" : "click_call_global"} variant="secondary" />
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
