import {
  getResolvedBusinessHours,
  readConversionConfig,
  type BusinessDayHours,
  type DayKey,
} from "@/lib/conversion";
import type { Locale } from "@/lib/i18n";

const dayLabelsByLocale: Record<Locale, Record<DayKey, string>> = {
  es: {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
  },
  en: {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  },
  fr: {
    monday: "Lundi",
    tuesday: "Mardi",
    wednesday: "Mercredi",
    thursday: "Jeudi",
    friday: "Vendredi",
    saturday: "Samedi",
    sunday: "Dimanche",
  },
};

function formatSlot(open: string, close: string) {
  return `${open}–${close}`;
}

function formatDay(day: BusinessDayHours, locale: Locale) {
  if (!day.isOpen || !day.primary) {
    return locale === "es" ? "Cerrado" : locale === "en" ? "Closed" : "Fermé";
  }

  const slots = [formatSlot(day.primary.open, day.primary.close)];
  if (day.secondary) {
    slots.push(formatSlot(day.secondary.open, day.secondary.close));
  }
  return slots.join(" · ");
}

export async function getBusinessHoursPresentation(locale: Locale) {
  const config = await readConversionConfig();
  const { resolved } = await getResolvedBusinessHours();

  const labels = dayLabelsByLocale[locale];
  const weekly = (Object.keys(labels) as DayKey[]).map((dayKey) => ({
    dayKey,
    label: labels[dayKey],
    summary: formatDay(config.businessHours[dayKey], locale),
    specialMessage: config.businessHours[dayKey]?.specialMessage?.trim() || "",
  }));

  const todayLabelPrefix =
    locale === "es"
      ? resolved.isOpenToday
        ? "Abierto hoy"
        : "Cerrado hoy"
      : locale === "en"
        ? resolved.isOpenToday
          ? "Open today"
          : "Closed today"
        : resolved.isOpenToday
          ? "Ouvert aujourd'hui"
          : "Fermé aujourd'hui";

  return {
    weekly,
    summary: resolved.summary,
    todayStatus:
      resolved.isOpenToday && !resolved.currentMessage.toLowerCase().includes("cerrado")
        ? `${todayLabelPrefix}: ${resolved.currentMessage.replace(/^Hoy\s*/i, "")}`
        : todayLabelPrefix,
    todayMessage: resolved.currentMessage,
    openingHoursSpecification: resolved.openingHoursSpecification,
    source: config.businessHoursSource,
  };
}
