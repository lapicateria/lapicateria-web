import Image from "next/image";
import Link from "next/link";
import { getBusinessHoursPresentation } from "@/lib/business-hours";
import type { Dictionary, Locale } from "@/lib/i18n";

type SiteFooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export async function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  const hours = await getBusinessHoursPresentation(locale);
  const legalLinks =
    locale === "es"
      ? [
          { href: `/${locale}/aviso-legal`, label: "Aviso legal" },
          { href: `/${locale}/privacidad`, label: "Política de privacidad" },
          { href: `/${locale}/cookies`, label: "Política de cookies" },
        ]
      : locale === "en"
        ? [
            { href: `/${locale}/aviso-legal`, label: "Legal notice" },
            { href: `/${locale}/privacidad`, label: "Privacy policy" },
            { href: `/${locale}/cookies`, label: "Cookie policy" },
          ]
        : [
            { href: `/${locale}/aviso-legal`, label: "Mentions légales" },
            { href: `/${locale}/privacidad`, label: "Politique de confidentialité" },
            { href: `/${locale}/cookies`, label: "Politique de cookies" },
          ];

  const sectionLabels =
    locale === "es"
      ? { legal: "Legal", follow: "Síguenos" }
      : locale === "en"
        ? { legal: "Legal", follow: "Follow us" }
        : { legal: "Mentions", follow: "Suivez-nous" };

  const socialLinks = [
    { href: dictionary.business.facebookUrl, label: "Facebook", icon: <FacebookIcon /> },
    { href: dictionary.business.instagramUrl, label: "Instagram", icon: <InstagramIcon /> },
    { href: dictionary.business.tiktokUrl, label: "TikTok", icon: <TikTokIcon /> },
  ];

  return (
    <footer className="relative z-10 border-t border-border/90 bg-cream/72 px-5 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.3fr_1fr_0.9fr] lg:items-start">
        <div>
          <Image
            src="/images/logos/logo_picateria-negro.png"
            alt="Logo La Picatería"
            width={2363}
            height={1182}
            className="h-6 w-auto sm:h-7"
          />
          <p className="mt-3 max-w-xl text-sm leading-7 text-charcoal">
            {dictionary.footer.copy}
          </p>
        </div>

        <div className="grid gap-3 text-sm text-charcoal">
          <p className="leading-7">{dictionary.business.address}</p>
          <p className="leading-7">{hours.summary}</p>
          <p className="text-xs uppercase tracking-[0.16em] text-charcoal/76">{hours.todayStatus}</p>
          <Link href={`/${locale}/reservas`} className="transition hover:text-sand-500">
            {dictionary.cta.reserve}
          </Link>
          <a href={`tel:${dictionary.business.phoneHref}`} className="transition hover:text-sand-500">
            {dictionary.business.phone}
          </a>
          <Link href={`/${locale}/contacto`} className="transition hover:text-sand-500">
            {dictionary.cta.contact}
          </Link>
          <a href={`mailto:${dictionary.business.email}`} className="transition hover:text-sand-500">
            {dictionary.business.email}
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand-500">
              {sectionLabels.legal}
            </p>
            <div className="mt-3 grid gap-2 text-sm text-charcoal">
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-sand-500">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand-500">
              {sectionLabels.follow}
            </p>
            <div className="mt-3 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/88 text-ink transition hover:border-sand-300 hover:text-sand-500"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.2-1.6 1.5-1.6H16V4.8c-.4 0-1.2-.1-2.2-.1-2.2 0-3.8 1.3-3.8 4V11H7.5v3H10v7h3.5Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.9" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M15.9 3.5c.4 1.7 1.5 3 3.1 3.6v2.6c-1.2 0-2.3-.3-3.3-.9v5.1c0 3.1-2.5 5.6-5.6 5.6S4.5 17 4.5 13.9s2.5-5.6 5.6-5.6c.3 0 .6 0 .9.1v2.8a3.2 3.2 0 0 0-.9-.1c-1.6 0-2.8 1.3-2.8 2.8s1.2 2.8 2.8 2.8 2.8-1.2 2.8-2.8V3.5h3Z" />
    </svg>
  );
}
