import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AllergenBadge } from "@/components/allergen-badge";
import { AllergenLegend } from "@/components/allergen-legend";
import { CtaButton } from "@/components/cta-button";
import { TrackedReservationLink } from "@/components/tracked-reservation-link";
import menuData from "@/content/menu.json";
import type { AllergenKey } from "@/lib/allergens";
import { buildMetadata } from "@/lib/metadata";
import { getDictionary, isValidLocale, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };
type MenuItem = { id: string; names: Record<Locale, string>; descriptions: Record<Locale, string>; price: string; allergens?: AllergenKey[] };

const copy = {
  es: { badge: "NOVEDAD · SMASH LAB", title: "Nueva carta. Mismo espíritu. Más fuego.", text: "Las burgers de SMASH LAB llegan a La Picatería. Descubre las siete, con patatas caseras incluidas, y nuestra carta renovada para compartir y disfrutar de la brasa.", pdf: "Ver carta impresa (PDF)", nav: "Secciones de la carta", new: "NOVEDAD" },
  en: { badge: "NEW · SMASH LAB", title: "New menu. Same spirit. More fire.", text: "SMASH LAB burgers have arrived at La Picatería. Discover all seven, served with homemade fries, alongside our refreshed sharing plates and charcoal grill.", pdf: "View printed menu (PDF, Spanish)", nav: "Menu sections", new: "NEW" },
  fr: { badge: "NOUVEAUTÉ · SMASH LAB", title: "Nouvelle carte. Même esprit. Plus de feu.", text: "Les burgers SMASH LAB arrivent à La Picatería. Découvrez les sept, servis avec des frites maison, ainsi que notre carte renouvelée et nos grillades au charbon.", pdf: "Voir la carte imprimée (PDF, espagnol)", nav: "Rubriques de la carte", new: "NOUVEAUTÉ" },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, { title: dictionary.meta.menu.title, description: dictionary.meta.menu.description, path: `/${locale}/carta` });
}

export default async function MenuPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const c = copy[locale];
  return (
    <section className="px-5 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="launch-card overflow-hidden">
          <div className="relative aspect-[3/1] bg-cream">
            <Image src="/images/logos/smash-lab-fenix.webp" alt="La Picatería · SMASH LAB · Fénix" fill preload sizes="(max-width: 1200px) 100vw, 1152px" className="object-contain" />
          </div>
          <div className="launch-copy space-y-5 px-6 py-8 sm:px-10">
            <p className="launch-badge">{c.badge}</p>
            <h1 className="launch-title">{c.title}</h1>
            <p className="max-w-3xl text-base leading-8 text-white/85">{c.text}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedReservationLink label={dictionary.cta.reserve} locale={locale} location="carta_page" />
              <CtaButton href="/carta/la-picateria-smash-lab.pdf" label={c.pdf} variant="secondary" external />
            </div>
          </div>
        </div>
        <nav aria-label={c.nav} className="my-8 flex flex-wrap gap-3">
          {menuData.categories.map(category => <a key={category.id} href={`#${category.id}`} className="rounded-full border border-border bg-white px-4 py-3 text-sm font-semibold text-sand-500 hover:bg-cream">{category.names[locale]}</a>)}
        </nav>
        <div className="mb-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-charcoal">
          {menuData.notes[locale].map(note => <p key={note}>{note}</p>)}
        </div>
        <div className="space-y-12">
          {menuData.categories.map(category => (
            <section id={category.id} key={category.id} className={`menu-category ${category.id === "smash-lab" ? "smash-category" : ""}`}>
              <div className="mb-6 space-y-3">
                {category.id === "smash-lab" && <p className="launch-badge">{c.new}</p>}
                <h2 className="category-title font-display text-4xl text-ink">{category.names[locale]}</h2>
                {category.descriptions[locale] && <p className="dish-copy max-w-3xl text-base leading-7 text-charcoal">{category.descriptions[locale]}</p>}
              </div>
              <div className="grid gap-x-10 md:grid-cols-2">
                {(category.items as MenuItem[]).map(item => (
                  <article key={item.id} className="border-t border-border py-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="dish-name min-w-0 font-display text-2xl leading-tight text-ink">{item.names[locale]}</h3>
                      <span className="dish-price shrink-0 whitespace-nowrap text-lg font-semibold text-sand-500">{item.price}</span>
                    </div>
                    {item.descriptions[locale] && <p className="dish-copy mt-3 text-base leading-7 text-charcoal">{item.descriptions[locale]}</p>}
                    {item.allergens && item.allergens.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{item.allergens.map(allergen => <AllergenBadge key={allergen} allergen={allergen} locale={locale} />)}</div>}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
        <div className="mt-12"><AllergenLegend locale={locale} /></div>
        <div className="mt-10 flex justify-center"><TrackedReservationLink label={dictionary.cta.reserve} locale={locale} location="carta_page" /></div>
      </div>
    </section>
  );
}
