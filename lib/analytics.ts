import type { Locale } from "@/lib/i18n";

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const QAMARERO_BOOKING_URL =
  "https://booking.qamarero.com/new-reservation/la-picateria";

export type TrackingLocation =
  | "hero"
  | "header"
  | "reservas_page"
  | "carta_page"
  | "home_availability"
  | "plan_simulator"
  | "phone";

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
