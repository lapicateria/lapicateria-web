import {
  getResolvedBusinessHours,
  readConversionConfig,
  type BusinessDayHours,
  type BusinessHoursSlot,
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

const dayOrder: DayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

function formatSlot(open: string, close: string) {
  return `${open}–${close}`;
}

function parseTimeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return (hours * 60) + minutes;
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

function getLocalParts(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const weekday = parts.find((part) => part.type === "weekday")?.value.toLowerCase() as DayKey;
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");

  return {
    dayKey: weekday,
    minutes: (hour * 60) + minute,
  };
}

function getSlots(day: BusinessDayHours | undefined) {
  if (!day?.isOpen) {
    return [];
  }

  return [day.primary, day.secondary].filter((slot): slot is BusinessHoursSlot => Boolean(slot));
}

function getNextOpening(
  hours: Record<DayKey, BusinessDayHours>,
  currentDayKey: DayKey,
  currentMinutes: number,
) {
  const currentDayIndex = dayOrder.indexOf(currentDayKey);

  for (let offset = 0; offset < dayOrder.length; offset += 1) {
    const dayKey = dayOrder[(currentDayIndex + offset) % dayOrder.length];
    const slots = getSlots(hours[dayKey]);
    if (slots.length === 0) {
      continue;
    }

    const slot = offset === 0
      ? slots.find((entry) => parseTimeToMinutes(entry.open) > currentMinutes)
      : slots[0];

    if (slot) {
      return { dayKey, slot, offset };
    }
  }

  return null;
}

function getLiveStatus(
  locale: Locale,
  hours: Record<DayKey, BusinessDayHours>,
  currentDayKey: DayKey,
  currentMinutes: number,
) {
  const currentDay = hours[currentDayKey];
  const currentSlots = getSlots(currentDay);
  const labels = dayLabelsByLocale[locale];
  const specialMessage = currentDay?.specialMessage?.trim() ?? "";

  for (const slot of currentSlots) {
    const openMinutes = parseTimeToMinutes(slot.open);
    const closeMinutes = parseTimeToMinutes(slot.close);

    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      return {
        status:
          locale === "es"
            ? `Abierto ahora · hasta las ${slot.close}`
            : locale === "en"
              ? `Open now · until ${slot.close}`
              : `Ouvert maintenant · jusqu'à ${slot.close}`,
        message:
          locale === "es"
            ? specialMessage
              ? `Abierto ahora hasta las ${slot.close}. ${specialMessage}`
              : `Abierto ahora hasta las ${slot.close}.`
            : locale === "en"
              ? specialMessage
                ? `Open now until ${slot.close}. ${specialMessage}`
                : `Open now until ${slot.close}.`
              : specialMessage
                ? `Ouvert maintenant jusqu'à ${slot.close}. ${specialMessage}`
                : `Ouvert maintenant jusqu'à ${slot.close}.`,
      };
    }
  }

  const nextOpening = getNextOpening(hours, currentDayKey, currentMinutes);

  if (nextOpening && nextOpening.offset === 0) {
    return {
      status:
        locale === "es"
          ? `Cerrado ahora · abre hoy a las ${nextOpening.slot.open}`
          : locale === "en"
            ? `Closed now · opens today at ${nextOpening.slot.open}`
            : `Fermé maintenant · ouvre aujourd'hui à ${nextOpening.slot.open}`,
      message:
        locale === "es"
          ? specialMessage
            ? `Cerrado ahora. Abre hoy a las ${nextOpening.slot.open}. ${specialMessage}`
            : `Cerrado ahora. Abre hoy a las ${nextOpening.slot.open}.`
          : locale === "en"
            ? specialMessage
              ? `Closed now. Opens today at ${nextOpening.slot.open}. ${specialMessage}`
              : `Closed now. Opens today at ${nextOpening.slot.open}.`
            : specialMessage
              ? `Fermé maintenant. Ouvre aujourd'hui à ${nextOpening.slot.open}. ${specialMessage}`
              : `Fermé maintenant. Ouvre aujourd'hui à ${nextOpening.slot.open}.`,
    };
  }

  if (!currentDay?.isOpen || currentSlots.length === 0) {
    if (nextOpening) {
      const nextDayLabel =
        nextOpening.offset === 1
          ? locale === "es"
            ? "mañana"
            : locale === "en"
              ? "tomorrow"
              : "demain"
          : labels[nextOpening.dayKey];

      return {
        status:
          locale === "es"
            ? `Cerrado hoy · abre ${nextDayLabel} a las ${nextOpening.slot.open}`
            : locale === "en"
              ? `Closed today · opens ${nextDayLabel} at ${nextOpening.slot.open}`
              : `Fermé aujourd'hui · ouvre ${nextDayLabel} à ${nextOpening.slot.open}`,
        message:
          locale === "es"
            ? specialMessage
              ? `Cerrado hoy. Abre ${nextDayLabel} a las ${nextOpening.slot.open}. ${specialMessage}`
              : `Cerrado hoy. Abre ${nextDayLabel} a las ${nextOpening.slot.open}.`
            : locale === "en"
              ? specialMessage
                ? `Closed today. Opens ${nextDayLabel} at ${nextOpening.slot.open}. ${specialMessage}`
                : `Closed today. Opens ${nextDayLabel} at ${nextOpening.slot.open}.`
              : specialMessage
                ? `Fermé aujourd'hui. Ouvre ${nextDayLabel} à ${nextOpening.slot.open}. ${specialMessage}`
                : `Fermé aujourd'hui. Ouvre ${nextDayLabel} à ${nextOpening.slot.open}.`,
      };
    }

    return {
      status: locale === "es" ? "Cerrado hoy" : locale === "en" ? "Closed today" : "Fermé aujourd'hui",
      message:
        locale === "es"
          ? specialMessage || "Cerrado hoy."
          : locale === "en"
            ? specialMessage || "Closed today."
            : specialMessage || "Fermé aujourd'hui.",
    };
  }

  if (nextOpening) {
    const nextDayLabel =
      nextOpening.offset === 1
        ? locale === "es"
          ? "mañana"
          : locale === "en"
            ? "tomorrow"
            : "demain"
        : labels[nextOpening.dayKey];

    return {
      status:
        locale === "es"
          ? `Cerrado ahora · abre ${nextDayLabel} a las ${nextOpening.slot.open}`
          : locale === "en"
            ? `Closed now · opens ${nextDayLabel} at ${nextOpening.slot.open}`
            : `Fermé maintenant · ouvre ${nextDayLabel} à ${nextOpening.slot.open}`,
      message:
        locale === "es"
          ? specialMessage
            ? `Cerrado ahora. Abre ${nextDayLabel} a las ${nextOpening.slot.open}. ${specialMessage}`
            : `Cerrado ahora. Abre ${nextDayLabel} a las ${nextOpening.slot.open}.`
          : locale === "en"
            ? specialMessage
              ? `Closed now. Opens ${nextDayLabel} at ${nextOpening.slot.open}. ${specialMessage}`
              : `Closed now. Opens ${nextDayLabel} at ${nextOpening.slot.open}.`
            : specialMessage
              ? `Fermé maintenant. Ouvre ${nextDayLabel} à ${nextOpening.slot.open}. ${specialMessage}`
              : `Fermé maintenant. Ouvre ${nextDayLabel} à ${nextOpening.slot.open}.`,
    };
  }

  return {
    status: locale === "es" ? "Cerrado ahora" : locale === "en" ? "Closed now" : "Fermé maintenant",
    message:
      locale === "es"
        ? specialMessage || "Cerrado ahora."
        : locale === "en"
          ? specialMessage || "Closed now."
          : specialMessage || "Fermé maintenant.",
  };
}

export async function getBusinessHoursPresentation(locale: Locale) {
  const config = await readConversionConfig();
  const { resolved } = await getResolvedBusinessHours();
  const localParts = getLocalParts(new Date(), config.timezone);
  const liveStatus = getLiveStatus(locale, config.businessHours, localParts.dayKey, localParts.minutes);

  const labels = dayLabelsByLocale[locale];
  const weekly = (Object.keys(labels) as DayKey[]).map((dayKey) => ({
    dayKey,
    label: labels[dayKey],
    summary: formatDay(config.businessHours[dayKey], locale),
    specialMessage: config.businessHours[dayKey]?.specialMessage?.trim() || "",
  }));

  return {
    weekly,
    summary: resolved.summary,
    todayStatus: liveStatus.status,
    todayMessage: liveStatus.message,
    openingHoursSpecification: resolved.openingHoursSpecification,
    source: config.businessHoursSource,
  };
}
