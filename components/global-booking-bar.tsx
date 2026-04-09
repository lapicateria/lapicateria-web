"use client";

import { TrackedPhoneLink } from "@/components/tracked-phone-link";
import { TrackedReservationLink } from "@/components/tracked-reservation-link";
import type { Dictionary, Locale } from "@/lib/i18n";

type GlobalBookingBarProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function GlobalBookingBar({ locale, dictionary }: GlobalBookingBarProps) {
  const reserveLabel =
    locale === "es" ? "Reservar mesa" : locale === "en" ? "Book a table" : "Reserver une table";
  const callLabel =
    locale === "es" ? "Llamar" : locale === "en" ? "Call" : "Appeler";

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.65rem)] pt-2.5 shadow-[0_-8px_24px_rgba(31,26,23,0.1)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-[1.55fr_1fr] gap-2">
        <TrackedReservationLink
          label={reserveLabel}
          locale={locale}
          location="sticky_bar"
          eventName={locale === "es" ? "click_reserve_sticky_bar" : undefined}
          className="inline-flex w-full items-center justify-center rounded-full bg-sand-400 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-bone shadow-[0_12px_24px_rgba(132,81,28,0.24)] transition hover:bg-sand-500"
        />
        <TrackedPhoneLink
          phoneHref={dictionary.business.phoneHref}
          label={callLabel}
          locale={locale}
          eventName={locale === "es" ? "click_call_sticky_bar" : "click_call_global"}
          variant="secondary"
          className="inline-flex w-full items-center justify-center rounded-full border border-border bg-white px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition hover:border-sand-300"
        />
      </div>
    </div>
  );
}
