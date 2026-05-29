import { ALLERGENS, getAllergenLabel, type AllergenKey } from "@/lib/allergens";
import type { Locale } from "@/lib/i18n";

export function AllergenBadge({
  allergen,
  locale,
}: {
  allergen: AllergenKey;
  locale: Locale;
}) {
  const label = getAllergenLabel(allergen, locale);
  const symbol = ALLERGENS[allergen].symbol;

  return (
    <span
      title={label}
      aria-label={label}
      className="inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-border bg-white px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-sand-500 shadow-[0_4px_10px_rgba(31,26,23,0.04)]"
    >
      {symbol}
    </span>
  );
}
