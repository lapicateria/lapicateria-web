import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingEmbedPanel } from "@/components/booking-embed-panel";
import { TrackedCtaButton } from "@/components/tracked-cta-button";
import { TrackedPhoneLink } from "@/components/tracked-phone-link";
import { TrackedReservationLink } from "@/components/tracked-reservation-link";
import { getBusinessHoursPresentation } from "@/lib/business-hours";
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
  const hours = await getBusinessHoursPresentation(locale);

  const copy =
    locale === "es"
      ? {
          eyebrow: "Reservas oficiales",
          title: "Reserva tu mesa",
          intro:
            "Selecciona día, hora y número de personas en el formulario oficial de Qamarero.",
          direct: "Abrir reserva oficial",
          call: "Llamar",
          detailsTitle: "Antes de venir",
          location: "Mercado de San Agustín, junto a la Catedral",
          note: "En horas punta, fines de semana y festivos recomendamos reservar con antelación.",
          fallbackTitle: "Si el formulario no carga",
          fallback:
            "Puedes abrir la reserva en una ventana nueva o llamarnos directamente.",
          contact: "Ver ubicación y contacto",
        }
      : locale === "en"
        ? {
            eyebrow: "Official bookings",
            title: "Book your table",
            intro:
              "Choose the date, time and number of guests in the official Qamarero form.",
            direct: "Open official booking",
            call: "Call",
            detailsTitle: "Before you visit",
            location: "Mercado de San Agustin, next to the Cathedral",
            note: "Booking ahead is recommended at peak times, weekends and public holidays.",
            fallbackTitle: "If the form does not load",
            fallback: "Open the booking page in a new window or call us directly.",
            contact: "View location and contact",
          }
        : {
            eyebrow: "Réservations officielles",
            title: "Réservez votre table",
            intro:
              "Choisissez la date, l’heure et le nombre de personnes dans le formulaire officiel Qamarero.",
            direct: "Ouvrir la réservation officielle",
            call: "Appeler",
            detailsTitle: "Avant votre visite",
            location: "Mercado de San Agustin, près de la Cathédrale",
            note: "Nous recommandons de réserver aux heures de pointe, le week-end et les jours fériés.",
            fallbackTitle: "Si le formulaire ne charge pas",
            fallback: "Ouvrez la réservation dans une nouvelle fenêtre ou appelez-nous.",
            contact: "Voir l’emplacement et le contact",
          };

  return (
    <section className="px-5 py-14 sm:px-6 lg:px-10 lg:py-18">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
              {copy.eyebrow}
            </p>
            <h1 className="font-display text-5xl leading-tight text-ink sm:text-6xl">
              {copy.title}
            </h1>
            <p className="text-base leading-8 text-charcoal">{copy.intro}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <TrackedReservationLink
              label={copy.direct}
              locale={locale}
              location="reservas_page"
              eventName={locale === "es" ? "click_reserve_reservas_page" : undefined}
            />
            <TrackedPhoneLink
              phoneHref={dictionary.business.phoneHref}
              label={copy.call}
              locale={locale}
              eventName={locale === "es" ? "click_call_reservas_page" : "click_call_global"}
              variant="secondary"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.64fr_1.36fr] lg:items-start">
          <aside className="space-y-5">
            <div className="rounded-[1.6rem] border border-border bg-white p-6 shadow-[0_14px_28px_rgba(31,26,23,0.05)]">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                {copy.detailsTitle}
              </p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-charcoal">
                <p className="font-semibold text-ink">{copy.location}</p>
                <p>{hours.todayStatus}</p>
                <p>{copy.note}</p>
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-sand-300 bg-sand-200/22 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-600">
                {copy.fallbackTitle}
              </p>
              <p className="mt-4 text-sm leading-7 text-charcoal">{copy.fallback}</p>
              <div className="mt-5 flex flex-col gap-3">
                <TrackedReservationLink
                  label={copy.direct}
                  locale={locale}
                  location="reservas_page"
                  eventName="click_booking_fallback_reserve"
                />
                <TrackedPhoneLink
                  phoneHref={dictionary.business.phoneHref}
                  label={`${copy.call}: ${dictionary.business.phone}`}
                  locale={locale}
                  eventName={locale === "es" ? "click_call_reservas_fallback" : "click_call_global"}
                  variant="secondary"
                />
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-border bg-cream/55 p-6">
              <p className="text-sm leading-7 text-charcoal">{dictionary.business.address}</p>
              <p className="mt-2 text-sm leading-7 text-charcoal">
                <a href={`mailto:${dictionary.business.email}`} className="transition hover:text-sand-500">
                  {dictionary.business.email}
                </a>
              </p>
              <div className="mt-5">
                <TrackedCtaButton
                  href={`/${locale}/contacto`}
                  label={copy.contact}
                  locale={locale}
                  location="reservas_page"
                  eventName="click_booking_contact"
                  variant="secondary"
                />
              </div>
            </div>
          </aside>

          <BookingEmbedPanel
            locale={locale}
            bookingUrl={dictionary.business.bookingUrl}
            phoneHref={dictionary.business.phoneHref}
          />
        </div>
      </div>
    </section>
  );
}
