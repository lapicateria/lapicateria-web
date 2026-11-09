import type { Locale } from "@/lib/i18n";

const copy = {
  es: {
    title: "Horarios y espacios",
    bar: "Vitrina · puestos 32–35: lunes, jueves, viernes y sábados, 09:00–17:00. Domingos, 12:00–17:00. Viernes y sábados también 20:00–24:00.",
    dining: "Restauración · Taberna Barbadillo, Salón Faustino y Terraza: lunes, jueves, viernes, sábados y domingos, 12:00–17:00. Viernes y sábados también 20:00–24:00.",
    closed: "Martes y miércoles cerrado. Desde las 09:00, venta directa de vitrina; sin servicio de desayunos.",
  },
  en: {
    title: "Opening hours and spaces",
    bar: "Deli counter · stalls 32–35: Monday, Thursday, Friday and Saturday, 09:00–17:00. Sunday, 12:00–17:00. Also Friday and Saturday, 20:00–24:00.",
    dining: "Dining · Taberna Barbadillo, Salón Faustino and Terraza: Monday, Thursday, Friday, Saturday and Sunday, 12:00–17:00. Also Friday and Saturday, 20:00–24:00.",
    closed: "Closed Tuesday and Wednesday. From 09:00, deli counter sales only; no breakfast service.",
  },
  fr: {
    title: "Horaires et espaces",
    bar: "Vitrine · stands 32–35 : lundi, jeudi, vendredi et samedi, 09:00–17:00. Dimanche, 12:00–17:00. Vendredi et samedi également 20:00–24:00.",
    dining: "Restauration · Taberna Barbadillo, Salón Faustino et Terraza : lundi, jeudi, vendredi, samedi et dimanche, 12:00–17:00. Vendredi et samedi également 20:00–24:00.",
    closed: "Fermé mardi et mercredi. Dès 09:00, vente directe en vitrine uniquement ; pas de petit-déjeuner.",
  },
};
export function ServiceHours({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <div className="space-y-2 text-sm leading-7 text-charcoal">
      <p className="font-semibold">{c.title}</p>
      <p>{c.bar}</p>
      <p>{c.dining}</p>
      <p className="border-l-2 border-sand-300 pl-3">{c.closed}</p>
    </div>
  );
}
