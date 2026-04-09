import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { GlobalBookingBar } from "@/components/global-booking-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary, isValidLocale } from "@/lib/i18n";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }, { locale: "fr" }];
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <div className="relative flex min-h-screen flex-col bg-bone text-ink">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(142,162,143,0.18),_transparent_28%),radial-gradient(circle_at_80%_0,_rgba(178,125,58,0.14),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.44),_rgba(255,255,255,0)_20%)]" />
      <SiteHeader locale={locale} dictionary={dictionary} />
      <main className="relative z-10 flex-1 pb-28 md:pb-0">{children}</main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <GlobalBookingBar locale={locale} dictionary={dictionary} />
    </div>
  );
}
