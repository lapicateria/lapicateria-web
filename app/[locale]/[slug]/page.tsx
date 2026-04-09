import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RestaurantSchema } from "@/components/restaurant-schema";
import { SectionHeading } from "@/components/section-heading";
import { TrackedCtaButton } from "@/components/tracked-cta-button";
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
import { getSeoLanding, seoLandingSlugs } from "@/content/seo-landings";
import { getBusinessHoursPresentation } from "@/lib/business-hours";
import { buildMetadata } from "@/lib/metadata";
import { isValidLocale, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  const locales: Locale[] = ["es", "en", "fr"];
  return locales.flatMap((locale) =>
    seoLandingSlugs.map((slug) => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const landing = getSeoLanding(slug);
  if (!landing) return {};
  const content = landing.content[locale];

  return buildMetadata(locale, {
    title: content.title,
    description: content.description,
    path: `/${locale}/${slug}`,
  });
}

export default async function SeoLandingPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const landing = getSeoLanding(slug);
  if (!landing) notFound();

  const content = landing.content[locale];
  const hours = await getBusinessHoursPresentation(locale);
  const reviewSummary = reviewSummaryByLocale[locale];
  const featuredReviews = featuredReviewsByLocale[locale].slice(0, 2);
  const featuredDishes = featuredDishesByLocale[locale].filter((dish) =>
    content.featuredDishKeys.includes(dish.key),
  );
  const experienceStory = experienceStoryByLocale[locale];
  const quickDecision = quickDecisionByLocale[locale];
  const touristModule = touristModuleByLocale[locale];
  const whyPeopleReturn = whyPeopleReturnByLocale[locale];
  const relatedLandings = content.relatedSlugs
    .map((entrySlug) => getSeoLanding(entrySlug))
    .filter(Boolean);

  return (
    <>
      <RestaurantSchema locale={locale} />

      <section className="px-5 pb-12 pt-8 sm:px-6 lg:px-10 lg:pb-16 lg:pt-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.2rem] border border-border bg-white shadow-[0_26px_64px_rgba(31,26,23,0.12)]">
          <div className="grid gap-0 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="flex items-end bg-[linear-gradient(180deg,rgba(255,251,244,0.92),rgba(255,255,255,0.96))] px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
              <div className="max-w-3xl space-y-6">
                <p className="inline-flex rounded-full border border-sand-300 bg-sand-200/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                  {content.eyebrow}
                </p>
                <div className="space-y-4">
                  <h1 className="font-display text-5xl leading-[0.92] text-ink sm:text-6xl">
                    {content.title}
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-charcoal sm:text-lg">
                    {content.heroIntro}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    locale === "es"
                      ? "Granada centro"
                      : locale === "en"
                        ? "Central Granada"
                        : "Centre de Grenade",
                    locale === "es"
                      ? "Mercado de San Agustín"
                      : locale === "en"
                        ? "Mercado de San Agustin"
                        : "Mercado de San Agustin",
                    locale === "es"
                      ? "Brasa de carbón"
                      : locale === "en"
                        ? "Charcoal grill"
                        : "Braise au charbon",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <TrackedReservationLink
                    label={content.topCtaLabel}
                    locale={locale}
                    location="seo_page"
                    eventName={`click_seo_${slug}_reserve_top`}
                  />
                  <TrackedCtaButton
                    href={`/${locale}/carta`}
                    label={locale === "es" ? "Ver carta" : locale === "en" ? "View menu" : "Voir la carte"}
                    locale={locale}
                    location="seo_page"
                    eventName={`click_seo_${slug}_menu_top`}
                    variant="secondary"
                  />
                </div>
              </div>
            </div>
            <div className="relative min-h-[360px] lg:min-h-[560px]">
              <Image
                src={landing.image}
                alt={landing.imageAlt[locale]}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.98fr_1.02fr]">
          <div className="space-y-5">
            <div className="rounded-[1.6rem] border border-border bg-white p-6 shadow-[0_14px_28px_rgba(31,26,23,0.05)]">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                {quickDecision.title}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {quickDecision.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.2rem] border border-border bg-cream/35 px-4 py-4 text-sm leading-7 text-charcoal"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-charcoal">{hours.todayStatus}</p>
            </div>
            <SectionHeading
              eyebrow={content.whyTitle}
              title={content.localTitle}
              description={content.localText}
            />
            <div className="grid gap-3">
              {content.whyPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-[1.4rem] border border-border bg-white px-5 py-5 text-sm leading-7 text-charcoal shadow-[0_12px_24px_rgba(31,26,23,0.04)]"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>

            <div className="space-y-5 rounded-[1.8rem] border border-border bg-white p-6 shadow-[0_18px_34px_rgba(31,26,23,0.06)]">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                {reviewSummary.kicker}
              </p>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sand-500">
                {reviewSummary.rating} · {reviewSummary.volume}
              </p>
            </div>
            <div className="grid gap-3">
              {featuredReviews.map((review, index) => (
                <blockquote
                  key={`${review.tag}-${index}`}
                  className="rounded-[1.3rem] border border-border bg-cream/45 px-4 py-4 text-sm leading-7 text-charcoal"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sand-500">
                    {review.tag}
                  </p>
                  <p className="mt-2">“{review.quote}”</p>
                </blockquote>
              ))}
            </div>
            <TrackedReservationLink
              label={locale === "es" ? "Reservar mesa" : locale === "en" ? "Book a table" : "Reserver une table"}
              locale={locale}
              location="credibility_block"
              eventName={`click_seo_${slug}_reserve_reviews`}
            />
            <div className="rounded-[1.3rem] border border-border bg-cream/35 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sand-500">
                {whyPeopleReturn.title}
              </p>
              <div className="mt-3 space-y-2">
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

      <section className="bg-cream/55 px-5 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex flex-col gap-6 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                {locale === "es"
                  ? "Platos destacados"
                  : locale === "en"
                    ? "Featured dishes"
                    : "Plats mis en avant"}
              </p>
              <h2 className="font-display text-5xl leading-tight text-ink">
                {content.experienceTitle}
              </h2>
              <p className="max-w-2xl text-base leading-8 text-charcoal">
                {content.experienceText}
              </p>
            </div>
            <TrackedCtaButton
              href={`/${locale}/carta`}
              label={locale === "es" ? "Ver carta completa" : locale === "en" ? "View full menu" : "Voir toute la carte"}
              locale={locale}
              location="seo_page"
              eventName={`click_seo_${slug}_menu_featured`}
              variant="secondary"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
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
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4 px-5 py-5">
                  <div className="space-y-2">
                    <h3 className="font-display text-3xl leading-tight text-ink">{dish.name}</h3>
                    <p className="text-sm leading-7 text-charcoal">{dish.description}</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <TrackedCtaButton
                      href={`/${locale}/carta`}
                      label={locale === "es" ? "Ver carta" : locale === "en" ? "View menu" : "Voir la carte"}
                      locale={locale}
                      location="seo_page"
                      eventName={`click_seo_${slug}_${dish.key}_menu`}
                      variant="secondary"
                    />
                    <TrackedReservationLink
                      label={locale === "es" ? "Reservar mesa" : locale === "en" ? "Book a table" : "Reserver une table"}
                      locale={locale}
                      location="seo_page"
                      eventName={`click_seo_${slug}_${dish.key}_reserve`}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
          <div className="space-y-6">
            <SectionHeading
              eyebrow={experienceStory.eyebrow}
              title={content.localTitle}
              description={content.description}
            />
            <p className="max-w-2xl text-base leading-8 text-charcoal">
              {experienceStory.description}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {experienceStory.bullets.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.3rem] border border-border bg-white px-4 py-4 text-sm leading-7 text-charcoal shadow-[0_10px_24px_rgba(31,26,23,0.04)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.9rem] border border-border bg-white shadow-[0_20px_48px_rgba(31,26,23,0.11)]">
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

      <section className="bg-white/70 px-5 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl rounded-[1.9rem] border border-border bg-white px-6 py-8 shadow-[0_18px_38px_rgba(31,26,23,0.08)] sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                {locale === "es"
                  ? "Reserva recomendada"
                  : locale === "en"
                    ? "Recommended booking"
                    : "Reservation recommandee"}
              </p>
              <h2 className="font-display text-5xl leading-tight text-ink">
                {content.midCtaTitle}
              </h2>
              <p className="max-w-2xl text-base leading-8 text-charcoal">
                {content.midCtaText}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <TrackedReservationLink
                label={content.topCtaLabel}
                locale={locale}
                location="seo_page"
                eventName={`click_seo_${slug}_reserve_mid`}
              />
              <TrackedCtaButton
                href={`/${locale}/contacto`}
                label={locale === "es" ? "Ver ubicación" : locale === "en" ? "See location" : "Voir l'emplacement"}
                locale={locale}
                location="seo_page"
                eventName={`click_seo_${slug}_contact_mid`}
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl rounded-[1.9rem] border border-border bg-cream/45 px-6 py-8 shadow-[0_16px_34px_rgba(31,26,23,0.06)] sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                {touristModule.title}
              </p>
              <h2 className="font-display text-4xl leading-tight text-ink">
                {locale === "es"
                  ? "Una opción fácil de recomendar si estás por Catedral o Mercado"
                  : locale === "en"
                    ? "An easy recommendation if you are near the Cathedral or the market"
                    : "Une adresse facile a recommander si vous etes pres de la Cathedrale ou du marche"}
              </h2>
              <p className="max-w-2xl text-base leading-8 text-charcoal">
                {touristModule.description}
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {touristModule.bullets.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.2rem] border border-border bg-white px-4 py-4 text-sm leading-7 text-charcoal"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <TrackedReservationLink
                label={content.topCtaLabel}
                locale={locale}
                location="tourist_block"
                eventName={`click_seo_${slug}_tourist_reserve`}
              />
              <TrackedCtaButton
                href={`/${locale}/contacto`}
                label={locale === "es" ? "Ver ubicación" : locale === "en" ? "See location" : "Voir l'emplacement"}
                locale={locale}
                location="tourist_block"
                eventName={`click_seo_${slug}_tourist_contact`}
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </section>

      {relatedLandings.length > 0 ? (
        <section className="px-5 py-16 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
              {locale === "es"
                ? "Más búsquedas relacionadas"
                : locale === "en"
                  ? "Related local searches"
                  : "Recherches locales liees"}
            </p>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {relatedLandings.map((entry) => {
                const related = entry!.content[locale];
                return (
                  <article
                    key={entry!.slug}
                    className="rounded-[1.6rem] border border-border bg-white p-5 shadow-[0_14px_28px_rgba(31,26,23,0.05)]"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sand-500">
                      {related.eyebrow}
                    </p>
                    <h3 className="mt-3 font-display text-3xl leading-tight text-ink">
                      {related.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-charcoal">
                      {related.description}
                    </p>
                    <div className="mt-4">
                      <TrackedCtaButton
                        href={`/${locale}/${entry!.slug}`}
                        label={locale === "es" ? "Abrir página" : locale === "en" ? "Open page" : "Ouvrir la page"}
                        locale={locale}
                        location="seo_page"
                        eventName={`click_seo_${slug}_related_${entry!.slug}`}
                        variant="secondary"
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-cream/68 px-5 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl rounded-[1.9rem] border border-border bg-white px-6 py-8 text-center shadow-[0_16px_34px_rgba(31,26,23,0.08)] sm:px-8">
          <div className="mx-auto max-w-3xl space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
              {locale === "es" ? "Cerrar la reserva" : locale === "en" ? "Final CTA" : "Dernier CTA"}
            </p>
            <h2 className="font-display text-5xl leading-tight text-ink">
              {content.finalCtaTitle}
            </h2>
            <p className="text-base leading-8 text-charcoal">
              {content.finalCtaText}
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <TrackedReservationLink
                label={content.topCtaLabel}
                locale={locale}
                location="seo_page"
                eventName={`click_seo_${slug}_reserve_final`}
              />
              <TrackedCtaButton
                href={`/${locale}/carta`}
                label={locale === "es" ? "Ver carta" : locale === "en" ? "View menu" : "Voir la carte"}
                locale={locale}
                location="seo_page"
                eventName={`click_seo_${slug}_menu_final`}
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
