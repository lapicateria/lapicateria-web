import { getAllergenLabel, type AllergenKey } from "@/lib/allergens";
import type { Locale } from "@/lib/i18n";
import type { ReactNode } from "react";

function AllergenIcon({ allergen }: { allergen: AllergenKey }) {
  const iconClassName = "h-4 w-4";
  const strokeProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const icons: Record<AllergenKey, ReactNode> = {
    gluten: (
      <svg viewBox="0 0 16 16" className={iconClassName} aria-hidden="true">
        <path {...strokeProps} d="M8 2.2v11.6" />
        <path {...strokeProps} d="M8 4.2c-1-.9-2-.9-2.8 0" />
        <path {...strokeProps} d="M8 6.3c1-.9 2-.9 2.8 0" />
        <path {...strokeProps} d="M8 8.2c-1-.9-2-.9-2.8 0" />
        <path {...strokeProps} d="M8 10.2c1-.9 2-.9 2.8 0" />
        <path {...strokeProps} d="M5.8 12.6h4.4" />
      </svg>
    ),
    crustaceans: (
      <svg viewBox="0 0 16 16" className={iconClassName} aria-hidden="true">
        <path {...strokeProps} d="M4.3 9.5c0-2 1.6-3.7 3.7-3.7s3.7 1.7 3.7 3.7" />
        <path {...strokeProps} d="M5.2 9.8c0 1.7 1.2 3 2.8 3s2.8-1.3 2.8-3" />
        <path {...strokeProps} d="M4.8 7.1 3.3 5.7" />
        <path {...strokeProps} d="M11.2 7.1l1.5-1.4" />
        <path {...strokeProps} d="M4.8 11.4 3 12.3" />
        <path {...strokeProps} d="M11.2 11.4l1.8.9" />
        <circle cx="8" cy="4.3" r="1.1" fill="currentColor" />
      </svg>
    ),
    eggs: (
      <svg viewBox="0 0 16 16" className={iconClassName} aria-hidden="true">
        <path {...strokeProps} d="M8 2.4c2.3 0 3.9 2.8 3.9 5.6 0 2.7-1.7 5-3.9 5s-3.9-2.3-3.9-5C4.1 5.2 5.7 2.4 8 2.4Z" />
      </svg>
    ),
    fish: (
      <svg viewBox="0 0 16 16" className={iconClassName} aria-hidden="true">
        <path {...strokeProps} d="M2.5 8c1.7-2.6 4.2-3.9 7.2-4.1 1.1 1 1.8 2.4 2 4.1-.2 1.7-.9 3.1-2 4.1-3-.2-5.5-1.5-7.2-4.1Z" />
        <path {...strokeProps} d="m11.7 6.1 2.1-1.7v7.2l-2.1-1.7" />
        <circle cx="7.1" cy="7.2" r=".5" fill="currentColor" />
      </svg>
    ),
    peanuts: (
      <svg viewBox="0 0 16 16" className={iconClassName} aria-hidden="true">
        <path {...strokeProps} d="M6.4 3.1c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2-.9 0-1.6.7-1.6 1.6v1.2c0 1.1-.9 2-2 2" />
        <path {...strokeProps} d="M9.6 12.9c-1.1 0-2-.9-2-2v-1c0-1.1.9-2 2-2 .9 0 1.6-.7 1.6-1.6V5.1c0-1.1.9-2 2-2" />
      </svg>
    ),
    soy: (
      <svg viewBox="0 0 16 16" className={iconClassName} aria-hidden="true">
        <path {...strokeProps} d="M4.4 11.6c2.9.2 5.2-1 6.9-3.8-2.8-.2-5.1 1-6.9 3.8Z" />
        <path {...strokeProps} d="M7 10.2 4.7 7.4" />
        <path {...strokeProps} d="M8.4 8.9 6.1 6" />
        <path {...strokeProps} d="M11.1 5.8c-.2 3-1.8 5.1-4.8 6.4" />
      </svg>
    ),
    milk: (
      <svg viewBox="0 0 16 16" className={iconClassName} aria-hidden="true">
        <path {...strokeProps} d="M6 2.5h4" />
        <path {...strokeProps} d="M6.4 2.5v2l-1.4 2v5.1c0 .8.6 1.4 1.4 1.4h3.2c.8 0 1.4-.6 1.4-1.4V6.5l-1.4-2v-2" />
        <path {...strokeProps} d="M5 6.5h6" />
      </svg>
    ),
    tree_nuts: (
      <svg viewBox="0 0 16 16" className={iconClassName} aria-hidden="true">
        <path {...strokeProps} d="M8 3.1c2.2 0 3.8 2 3.8 4.6 0 2.8-1.8 5.2-3.8 5.2s-3.8-2.4-3.8-5.2C4.2 5.1 5.8 3.1 8 3.1Z" />
        <path {...strokeProps} d="M8 3.1c0-1 .7-1.8 1.8-2" />
      </svg>
    ),
    celery: (
      <svg viewBox="0 0 16 16" className={iconClassName} aria-hidden="true">
        <path {...strokeProps} d="M5.1 12.7V6.9" />
        <path {...strokeProps} d="M8 12.7V5.6" />
        <path {...strokeProps} d="M10.9 12.7V7.5" />
        <path {...strokeProps} d="M8 5.6c0-1.7 1.3-3 3-3-.1 1.8-1.2 3-3 3Z" />
        <path {...strokeProps} d="M5.1 6.9c-1.4 0-2.5-1-2.8-2.6 1.6-.1 2.8.9 2.8 2.6Z" />
      </svg>
    ),
    mustard: (
      <svg viewBox="0 0 16 16" className={iconClassName} aria-hidden="true">
        <path {...strokeProps} d="M6.2 2.5h3.6" />
        <path {...strokeProps} d="M6.8 2.5v2.1l-1.4 2.1v4.6c0 .9.7 1.7 1.7 1.7h1.8c1 0 1.7-.8 1.7-1.7V6.7L9.2 4.6V2.5" />
        <path {...strokeProps} d="M5.4 8.6h5.2" />
      </svg>
    ),
    sesame: (
      <svg viewBox="0 0 16 16" className={iconClassName} aria-hidden="true">
        <path {...strokeProps} d="M5.3 5.1c.7 0 1.2.6 1.2 1.3s-.5 1.3-1.2 1.3-1.2-.6-1.2-1.3.5-1.3 1.2-1.3Z" />
        <path {...strokeProps} d="M10.7 4.2c.7 0 1.2.6 1.2 1.3s-.5 1.3-1.2 1.3-1.2-.6-1.2-1.3.5-1.3 1.2-1.3Z" />
        <path {...strokeProps} d="M8.3 8c.7 0 1.2.6 1.2 1.3s-.5 1.3-1.2 1.3-1.2-.6-1.2-1.3S7.6 8 8.3 8Z" />
        <path {...strokeProps} d="M4.9 9.4c.7 0 1.2.6 1.2 1.3S5.6 12 4.9 12s-1.2-.6-1.2-1.3.5-1.3 1.2-1.3Z" />
      </svg>
    ),
    sulfites: (
      <svg viewBox="0 0 16 16" className={iconClassName} aria-hidden="true">
        <path {...strokeProps} d="M6 2.8h4" />
        <path {...strokeProps} d="M8 2.8v6.1" />
        <path {...strokeProps} d="M5.4 5.2c.2 2 1.2 3.2 2.6 3.7 1.4-.5 2.4-1.7 2.6-3.7" />
        <path {...strokeProps} d="M6.2 11.4h3.6" />
        <path {...strokeProps} d="M5.5 13.1h5" />
      </svg>
    ),
    lupins: (
      <svg viewBox="0 0 16 16" className={iconClassName} aria-hidden="true">
        <path {...strokeProps} d="M8 13.2V3.2" />
        <circle cx="8" cy="4.5" r="1" fill="currentColor" />
        <circle cx="6.3" cy="6.5" r="1" fill="currentColor" />
        <circle cx="9.7" cy="6.9" r="1" fill="currentColor" />
        <circle cx="6.6" cy="9.2" r="1" fill="currentColor" />
        <circle cx="9.3" cy="9.6" r="1" fill="currentColor" />
      </svg>
    ),
    molluscs: (
      <svg viewBox="0 0 16 16" className={iconClassName} aria-hidden="true">
        <path {...strokeProps} d="M3.8 8.2c0-2.7 1.9-4.8 4.2-4.8s4.2 2.1 4.2 4.8c0 2.6-1.9 4.8-4.2 4.8S3.8 10.8 3.8 8.2Z" />
        <path {...strokeProps} d="M8 3.7v9" />
        <path {...strokeProps} d="M5.6 5.3 10.4 11" />
        <path {...strokeProps} d="M10.4 5.3 5.6 11" />
      </svg>
    ),
  };

  return icons[allergen];
}

export function AllergenBadge({
  allergen,
  locale,
}: {
  allergen: AllergenKey;
  locale: Locale;
}) {
  const label = getAllergenLabel(allergen, locale);

  return (
    <span
      title={label}
      aria-label={label}
      className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-border bg-white px-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap text-sand-500 shadow-[0_4px_10px_rgba(31,26,23,0.04)]"
    >
      <AllergenIcon allergen={allergen} />
    </span>
  );
}
