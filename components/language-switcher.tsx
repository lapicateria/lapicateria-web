"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackLanguageSwitch } from "@/lib/analytics";
import { locales, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  currentLocale: Locale;
};

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const pathWithoutLocale = pathname.replace(/^\/(es|en|fr)/, "") || "";

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-white/90 p-1 shadow-[0_10px_24px_rgba(31,26,23,0.06)]">
      {locales.map((locale) => {
        const href = `/${locale}${pathWithoutLocale}` || `/${locale}`;
        const isActive = locale === currentLocale;

        return (
          <Link
            key={locale}
            href={href}
            onClick={() => {
              if (!isActive) {
                trackLanguageSwitch({ fromLocale: currentLocale, toLocale: locale });
              }
            }}
            className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition ${
              isActive
                ? "bg-sand-400 text-bone"
                : "text-charcoal hover:text-sand-500"
            }`}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
