"use client";

import { getCtaButtonClassName } from "@/components/cta-button";
import {
  QAMARERO_BOOKING_URL,
  trackEvent,
  trackReservationClick,
  type TrackingLocation,
} from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";

type TrackedReservationLinkProps = {
  label: string;
  locale: Locale;
  location: TrackingLocation;
  variant?: "primary" | "secondary";
  className?: string;
};

export function TrackedReservationLink({
  label,
  locale,
  location,
  variant = "primary",
  className,
}: TrackedReservationLinkProps) {
  const baseClassName = getCtaButtonClassName(variant);

  return (
    <a
      href={QAMARERO_BOOKING_URL}
      target="_blank"
      rel="noreferrer"
      className={className ?? baseClassName}
      onClick={() => {
        trackEvent("cta_click", { locale, location });
        trackReservationClick({ locale, location });
      }}
    >
      {label}
    </a>
  );
}
