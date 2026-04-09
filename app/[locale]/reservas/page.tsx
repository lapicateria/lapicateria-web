import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingStatusCard } from "@/components/booking-status-card";
import { CtaButton } from "@/components/cta-button";
import { TrackedPhoneLink } from "@/components/tracked-phone-link";
import { TrackedReservationLink } from "@/components/tracked-reservation-link";
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
    title: dictionary.meta.booking.title,
    description: dictionary.meta.booking.description,
    path: `/${locale}/reservas`,
  });
}

export default async function BookingPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const trustModule =
    locale === "es"
      ? {
          title: "Reserva en pocos pasos",
          points: [
            "Dentro del Mercado de San Agustín",
            "Terraza disponible",
            "Mejor reservar en horas punta",
            "Un sitio pensado para compartir y disfrutar sin prisa",
          ],
        }
      : locale === "en"
        ? {
            title: "Book in just a few steps",
            points: [
              "Inside Mercado de San Agustin",
              "Terrace available",
              "Booking is recommended at peak times",
              "A place built for sharing and taking your time",
            ],
        }
      : {
            title: "Reservez en quelques etapes",
            points: [
              "Dans le Mercado de San Agustin",
              "Terrasse disponible",
              "Mieux vaut reserver aux heures de pointe",
              "Une table pensee pour partager et prendre son temps",
            ],
          };

  return (
    <section className="px-5 py-14 sm:px-6 lg:px-10 lg:py-18">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
              {dictionary.bookingPage.eyebrow}
            </p>
            <h1 className="font-display text-5xl leading-tight text-ink sm:text-6xl">
              {locale === "es" ? "Reserva tu mesa" : dictionary.bookingPage.title}
            </h1>
            <p className="text-base leading-8 text-charcoal">
              {locale === "es"
                ? "Si vienes en hora punta o quieres sentarte con calma, mejor reservar antes de venir."
                : dictionary.bookingPage.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <TrackedReservationLink
              label={locale === "es" ? "Reservar en Qamarero" : dictionary.cta.qamarero}
              locale={locale}
              location="reservas_page"
              eventName={locale === "es" ? "click_reserve_reservas_page" : undefined}
              className="inline-flex items-center justify-center rounded-full bg-sand-400 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-bone shadow-[0_18px_30px_rgba(132,81,28,0.28)] transition hover:bg-sand-500"
            />
            {locale === "es" ? (
              <TrackedPhoneLink
                phoneHref={dictionary.business.phoneHref}
                label="Llamar ahora"
                locale={locale}
                eventName="click_call_reservas_page"
                variant="secondary"
              />
            ) : null}
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.62fr_1.38fr]">
          <div className="space-y-8">
            {locale === "es" ? <BookingStatusCard locale={locale} /> : null}

            <div className="rounded-[1.6rem] border border-border bg-cream/55 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                {trustModule.title}
              </p>
              <div className="mt-4 space-y-3">
                {trustModule.points.map((point) => (
                  <p key={point} className="text-sm leading-7 text-charcoal">
                    {point}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sand-500">
                {dictionary.bookingPage.primaryCtaLabel}
              </p>
              <p className="text-base leading-8 text-charcoal">
                {dictionary.bookingPage.primaryCtaCopy}
              </p>
              {locale === "es" ? (
                <p className="text-sm leading-7 text-charcoal">
                  Puedes venir tanto a tapear como a comer a la carta.
                </p>
              ) : null}
            </div>

            <div className="space-y-4 border-t border-border pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sand-500">
                {dictionary.bookingPage.fallbackTitle}
              </p>
              <p className="text-base leading-8 text-charcoal">
                {dictionary.bookingPage.fallbackCopy}
              </p>
              <div className="space-y-3 text-sm leading-7 text-charcoal">
                <p>
                  <span className="font-semibold text-ink">{dictionary.business.phoneLabel}: </span>
                  <a href={`tel:${dictionary.business.phoneHref}`} className="transition hover:text-sand-500">
                    {dictionary.business.phone}
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-ink">{dictionary.business.emailLabel}: </span>
                  <a href={`mailto:${dictionary.business.email}`} className="transition hover:text-sand-500">
                    {dictionary.business.email}
                  </a>
                </p>
              </div>
              {locale === "es" ? (
                <TrackedPhoneLink
                  phoneHref={dictionary.business.phoneHref}
                  label="Llamar y preguntar mesa"
                  locale={locale}
                  eventName="click_call_reservas_page"
                  variant="secondary"
                />
              ) : (
                <CtaButton href={`tel:${dictionary.business.phoneHref}`} label={dictionary.business.phone} variant="secondary" />
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.8rem] bg-white shadow-[0_24px_58px_rgba(31,26,23,0.1)]">
            <iframe
              title="Reserva oficial Qamarero La Picatería"
              src={dictionary.business.bookingUrl}
              className="min-h-[820px] w-full bg-white"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

        <div className="mt-5 text-sm leading-7 text-charcoal">
          {dictionary.bookingPage.embedNotice}
        </div>
      </div>
    </section>
  );
}
