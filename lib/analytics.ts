import { business, type Locale } from "@/lib/i18n";

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const QAMARERO_BOOKING_URL = business.bookingUrl;

export type TrackingLocation =
  | "hero"
  | "header"
  | "reservas_page"
  | "carta_page"
  | "contact_page"
  | "home_availability"
  | "plan_simulator"
  | "phone"
  | "sticky_bar"
  | "social_proof"
  | "featured_dishes"
  | "experience_block"
  | "language_switcher"
  | "seo_page";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const payload =
    process.env.NODE_ENV === "production"
      ? params
      : { ...params, debug_mode: true };

  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", name, payload);
  }

  window.gtag?.("event", name, payload);
}

export function trackReservationClick({
  locale,
  location,
}: {
  locale: Locale;
  location: TrackingLocation;
}) {
  trackEvent("reservation_click", { locale, location });
}

export function trackLanguageSwitch({
  fromLocale,
  toLocale,
}: {
  fromLocale: Locale;
  toLocale: Locale;
}) {
  trackEvent("language_switch", {
    from_locale: fromLocale,
    to_locale: toLocale,
    location: "language_switcher",
  });
}
