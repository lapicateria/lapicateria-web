import { AllergenBadge } from "@/components/allergen-badge";
import {
  ALLERGEN_ORDER,
  getAllergenLabel,
  getAllergenLegendCopy,
} from "@/lib/allergens";
import type { Locale } from "@/lib/i18n";

export function AllergenLegend({ locale }: { locale: Locale }) {
  const copy = getAllergenLegendCopy(locale);

  return (
    <section className="rounded-[1.6rem] border border-border bg-white px-5 py-6 shadow-[0_12px_28px_rgba(31,26,23,0.05)] sm:px-6">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand-500">
          {copy.title}
        </p>
        <p className="mt-3 text-sm leading-7 text-charcoal">{copy.legal}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        {ALLERGEN_ORDER.map((allergen) => (
          <div
            key={allergen}
            className="inline-flex items-center gap-2 rounded-full bg-cream/75 px-2.5 py-1.5"
          >
            <AllergenBadge allergen={allergen} locale={locale} />
            <span className="text-xs font-medium leading-6 text-charcoal">
              {getAllergenLabel(allergen, locale)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
