import type { Locale } from "@/lib/i18n";

const copy = {
  es: { title: "Horarios por zona", bar: "Puesto 32: lunes a sábado, 09:00–17:00.", dining: "Centro y terraza: jueves a lunes, 12:00–17:00. Viernes y sábados también 20:00–24:00.", bridge: "Puente de octubre: todos los puestos abiertos hasta el lunes 12. Martes 13, cierre completo. Miércoles 14, solo Puesto 32. Desde el domingo 18, horario habitual." },
  en: { title: "Opening hours by area", bar: "Stall 32: Monday–Saturday, 09:00–17:00.", dining: "Central area and terrace: Thursday–Monday, 12:00–17:00. Also Friday and Saturday, 20:00–24:00.", bridge: "October holiday: all stalls open through Monday 12. Closed Tuesday 13. Only Stall 32 opens Wednesday 14. Regular hours from Sunday 18." },
  fr: { title: "Horaires par espace", bar: "Stand 32 : lundi–samedi, 09:00–17:00.", dining: "Espace central et terrasse : jeudi–lundi, 12:00–17:00. Vendredi et samedi également 20:00–24:00.", bridge: "Pont d’octobre : tous les stands ouverts jusqu’au lundi 12. Fermeture mardi 13. Mercredi 14, seul le stand 32 ouvre. Horaires habituels dès le dimanche 18." },
};
export function ServiceHours({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const showBridge = new Date() < new Date("2026-10-18T00:00:00+02:00");
  return <div className="space-y-2 text-sm leading-7 text-charcoal"><p className="font-semibold">{c.title}</p><p>{c.bar}</p><p>{c.dining}</p>{showBridge && <p className="border-l-2 border-sand-300 pl-3">{c.bridge}</p>}</div>;
}
