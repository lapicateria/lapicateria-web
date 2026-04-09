import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { TrackedPhoneLink } from "@/components/tracked-phone-link";
import { TrackedReservationLink } from "@/components/tracked-reservation-link";
import type { Dictionary, Locale } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-border/90 bg-bone/92 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-5 py-3.5 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <Link href={`/${locale}`} className="block" aria-label="La Picatería">
              <Image
                src="/images/logos/logo_picateria-negro.png"
                alt="Logo La Picatería"
                width={2363}
                height={1182}
                priority
                className="h-7 w-auto sm:h-8 lg:h-9"
              />
            </Link>
            <p className="mt-1 hidden text-xs uppercase tracking-[0.24em] text-charcoal/80 sm:block">
              {dictionary.header.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <nav className="hidden items-center gap-5 text-sm font-medium text-charcoal md:flex">
              <Link href={`/${locale}/carta`} className="transition hover:text-sand-500">
                {dictionary.navigation.menu}
              </Link>
              <Link href={`/${locale}/reservas`} className="transition hover:text-sand-500">
                {dictionary.navigation.booking}
              </Link>
              <Link href={`/${locale}/contacto`} className="transition hover:text-sand-500">
                {dictionary.navigation.contact}
              </Link>
            </nav>
            <LanguageSwitcher currentLocale={locale} />
            <TrackedPhoneLink
              phoneHref={dictionary.business.phoneHref}
              label={locale === "es" ? "Llamar" : locale === "en" ? "Call" : "Appeler"}
              locale={locale}
              eventName={locale === "es" ? "click_call_header" : "click_call_global"}
              variant="secondary"
              className="hidden rounded-full border border-border bg-white/88 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition hover:border-sand-300 lg:inline-flex"
            />
            <TrackedReservationLink
              label={dictionary.cta.reserve}
              locale={locale}
              location="header"
              className="hidden rounded-full bg-sand-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-bone shadow-[0_12px_24px_rgba(132,81,28,0.2)] transition hover:bg-sand-500 sm:inline-flex"
            />
          </div>
        </div>

        <div className="mt-3 hidden items-center justify-between border-t border-border/80 pt-3 md:flex">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-charcoal/78">
            {dictionary.business.address}
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-charcoal/78">
            {locale === "es" ? "Reserva recomendada en horas punta" : locale === "en" ? "Booking recommended at peak times" : "Reservation conseillee aux heures de pointe"}
          </p>
        </div>

        <nav className="mt-4 grid grid-cols-3 gap-2 md:hidden">
          <Link
            href={`/${locale}/carta`}
            className="rounded-full border border-border bg-white/85 px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:border-sand-300 hover:text-sand-500"
          >
            {dictionary.navigation.menu}
          </Link>
          <Link
            href={`/${locale}/reservas`}
            className="rounded-full border border-border bg-white/85 px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:border-sand-300 hover:text-sand-500"
          >
            {dictionary.navigation.booking}
          </Link>
          <Link
            href={`/${locale}/contacto`}
            className="rounded-full border border-border bg-white/85 px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:border-sand-300 hover:text-sand-500"
          >
            {dictionary.navigation.contact}
          </Link>
        </nav>
      </div>
    </header>
  );
}
