import {
  getResolvedBusinessHours,
  readConversionConfig,
  type BusinessDayHours,
  type BusinessHoursException,
  type BusinessHoursSlot,
  type DayKey,
  resolveBusinessHoursForDate,
} from "@/lib/conversion";
import type { Locale } from "@/lib/i18n";

export type BusinessHoursSnapshot = {
  isOpenNow: boolean;
  nextOpenDayKey: DayKey | null;
  nextOpenTime: string | null;
  nextOpenOffset: number | null;
  specialMessage: string;
  activeException: BusinessHoursException | null;
  todayStatus: string;
  todayMessage: string;
};

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
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
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
    dateKey: `${parts.find((part) => part.type === "year")?.value ?? "0000"}-${parts.find((part) => part.type === "month")?.value ?? "01"}-${parts.find((part) => part.type === "day")?.value ?? "01"}`,
    minutes: (hour * 60) + minute,
  };
}

function getSlots(day: BusinessDayHours | undefined) {
  if (!day?.isOpen) {
    return [];
  }

  return [day.primary, day.secondary].filter((slot): slot is BusinessHoursSlot => Boolean(slot));
}

function getDateKeyForOffset(now: Date, offset: number, timeZone: string) {
  const shifted = new Date(now);
  shifted.setDate(now.getDate() + offset);
  return getLocalParts(shifted, timeZone);
}

function getNextOpening(
  config: Awaited<ReturnType<typeof readConversionConfig>>,
  now: Date,
  currentDayKey: DayKey,
  currentMinutes: number,
) {
  const currentDayIndex = dayOrder.indexOf(currentDayKey);

  for (let offset = 0; offset < 14; offset += 1) {
    const dayKey = dayOrder[(currentDayIndex + offset) % dayOrder.length];
    const shiftedParts = getDateKeyForOffset(now, offset, config.timezone);
    const resolved = resolveBusinessHoursForDate(config, dayKey, shiftedParts.dateKey);
    const slots = getSlots(resolved.hours);
    if (slots.length === 0) {
      continue;
    }

    const slot = offset === 0
      ? slots.find((entry) => parseTimeToMinutes(entry.open) > currentMinutes)
      : slots[0];

    if (slot) {
      return { dayKey, slot, offset, exception: resolved.exception, dateKey: shiftedParts.dateKey };
    }
  }

  return null;
}

function getLiveStatus(
  locale: Locale,
  config: Awaited<ReturnType<typeof readConversionConfig>>,
  now: Date,
  currentDayKey: DayKey,
  currentDateKey: string,
  currentMinutes: number,
) {
  const currentDayResolution = resolveBusinessHoursForDate(config, currentDayKey, currentDateKey);
  const currentDay = currentDayResolution.hours;
  const currentSlots = getSlots(currentDay);
  const labels = dayLabelsByLocale[locale];
  const specialMessage = currentDay?.specialMessage?.trim() ?? "";
  const currentLabel = currentDayResolution.exception?.label?.trim() ?? "";

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
              : currentLabel
                ? `Abierto ahora hasta las ${slot.close}. ${currentLabel}.`
                : `Abierto ahora hasta las ${slot.close}.`
            : locale === "en"
              ? specialMessage
                ? `Open now until ${slot.close}. ${specialMessage}`
                : currentLabel
                  ? `Open now until ${slot.close}. ${currentLabel}.`
                  : `Open now until ${slot.close}.`
              : specialMessage
                ? `Ouvert maintenant jusqu'à ${slot.close}. ${specialMessage}`
                : currentLabel
                  ? `Ouvert maintenant jusqu'à ${slot.close}. ${currentLabel}.`
                  : `Ouvert maintenant jusqu'à ${slot.close}.`,
      };
    }
  }

  const nextOpening = getNextOpening(config, now, currentDayKey, currentMinutes);

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
            ? `Cerrado hoy${currentLabel ? ` · ${currentLabel.toLowerCase()}` : ""} · abre ${nextDayLabel} a las ${nextOpening.slot.open}`
            : locale === "en"
              ? `Closed today${currentLabel ? ` · ${currentLabel}` : ""} · opens ${nextDayLabel} at ${nextOpening.slot.open}`
              : `Fermé aujourd'hui${currentLabel ? ` · ${currentLabel}` : ""} · ouvre ${nextDayLabel} à ${nextOpening.slot.open}`,
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

export async function getBusinessHoursSnapshot(now = new Date()): Promise<BusinessHoursSnapshot> {
  const config = await readConversionConfig();
  const localParts = getLocalParts(now, config.timezone);
  const currentDayResolution = resolveBusinessHoursForDate(config, localParts.dayKey, localParts.dateKey);
  const currentDay = currentDayResolution.hours;
  const currentSlots = getSlots(currentDay);
  const specialMessage = currentDay?.specialMessage?.trim() ?? "";

  for (const slot of currentSlots) {
    const openMinutes = parseTimeToMinutes(slot.open);
    const closeMinutes = parseTimeToMinutes(slot.close);

    if (localParts.minutes >= openMinutes && localParts.minutes < closeMinutes) {
      return {
        isOpenNow: true,
        nextOpenDayKey: localParts.dayKey,
        nextOpenTime: slot.close,
        nextOpenOffset: 0,
        specialMessage,
        activeException: currentDayResolution.exception,
        todayStatus: "open_now",
        todayMessage: `until:${slot.close}`,
      };
    }
  }

  const nextOpening = getNextOpening(config, now, localParts.dayKey, localParts.minutes);

  if (!currentDay?.isOpen || currentSlots.length === 0) {
    return {
      isOpenNow: false,
      nextOpenDayKey: nextOpening?.dayKey ?? null,
      nextOpenTime: nextOpening?.slot.open ?? null,
      nextOpenOffset: nextOpening?.offset ?? null,
      specialMessage,
      activeException: currentDayResolution.exception,
      todayStatus: "closed_today",
      todayMessage: nextOpening ? `opens:${nextOpening.slot.open}` : "closed",
    };
  }

  return {
    isOpenNow: false,
    nextOpenDayKey: nextOpening?.dayKey ?? null,
    nextOpenTime: nextOpening?.slot.open ?? null,
    nextOpenOffset: nextOpening?.offset ?? null,
    specialMessage,
    activeException: currentDayResolution.exception,
    todayStatus: nextOpening?.offset === 0 ? "closed_now_opens_today" : "closed_now",
    todayMessage: nextOpening ? `opens:${nextOpening.slot.open}` : "closed",
  };
}

export async function getBusinessHoursPresentation(locale: Locale) {
  const config = await readConversionConfig();
  const { resolved } = await getResolvedBusinessHours();
  const localParts = getLocalParts(new Date(), config.timezone);
  const liveStatus = getLiveStatus(locale, config, new Date(), localParts.dayKey, localParts.dateKey, localParts.minutes);

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
    activeException: resolved.activeException,
    openingHoursSpecification: resolved.openingHoursSpecification,
    specialOpeningHoursSpecification: resolved.specialOpeningHoursSpecification,
    source: config.businessHoursSource,
  };
}
