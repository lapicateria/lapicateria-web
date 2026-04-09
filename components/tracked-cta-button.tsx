"use client";

import Link from "next/link";
import { getCtaButtonClassName } from "@/components/cta-button";
import { trackEvent, type TrackingLocation } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";

type TrackedCtaButtonProps = {
  href: string;
  label: string;
  locale: Locale;
  location: TrackingLocation;
  eventName: string;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
};

export function TrackedCtaButton({
  href,
  label,
  locale,
  location,
  eventName,
  variant = "primary",
  external = false,
  className,
}: TrackedCtaButtonProps) {
  const resolvedClassName = className ?? getCtaButtonClassName(variant);
  const isDirectLink = href.startsWith("tel:") || href.startsWith("mailto:");

  const handleClick = () => {
    trackEvent(eventName, { locale, location });
    trackEvent("cta_click", { locale, location, href });
  };

  if (external || isDirectLink) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className={resolvedClassName}
        onClick={handleClick}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={resolvedClassName} onClick={handleClick}>
      {label}
    </Link>
  );
}
