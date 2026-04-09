"use client";

import { getCtaButtonClassName } from "@/components/cta-button";
import { trackEvent } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";

type TrackedPhoneLinkProps = {
  phoneHref: string;
  label: string;
  locale: Locale;
  eventName: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export function TrackedPhoneLink({
  phoneHref,
  label,
  locale,
  eventName,
  variant = "secondary",
  className,
}: TrackedPhoneLinkProps) {
  return (
    <a
      href={`tel:${phoneHref}`}
      className={className ?? getCtaButtonClassName(variant)}
      onClick={() => {
        trackEvent(eventName, { locale });
        trackEvent("cta_click", { locale, location: "phone" });
      }}
    >
      {label}
    </a>
  );
}
