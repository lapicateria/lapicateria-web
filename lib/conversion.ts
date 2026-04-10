import defaultConversionConfig from "@/content/conversion-settings.json";
import {
  readStoredConversionConfig,
  writeStoredConversionConfig,
} from "@/lib/conversion-store";

export type DemandState = "quiet" | "busy" | "very_busy" | "packed";
export type TerraceState = "available" | "limited" | "full" | "unavailable";
export type PlanKey = "solo_tapas" | "a_la_carte" | "group_sharing";
export type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type BusinessHoursSlot = {
  open: string;
  close: string;
};

export type BusinessDayHours = {
  isOpen: boolean;
  primary: BusinessHoursSlot | null;
  secondary: BusinessHoursSlot | null;
  specialMessage: string;
};

export type BusinessHoursSource = {
  source: "owner_panel";
  externalSync: {
    provider: "google_business_profile" | null;
    status: "not_configured" | "ready_for_future_sync";
  };
};

export type BusinessHoursException = {
  date: string;
  label: string;
  closed: boolean;
  primary: BusinessHoursSlot | null;
  secondary: BusinessHoursSlot | null;
  specialMessage: string;
};

export type TimeRangeRule = {
  start: string;
  end: string;
  state: DemandState;
};

export type OverrideConfig = {
  mode: "automatic" | "manual";
  state: DemandState;
  terrace: TerraceState;
  customMessage: string;
  expiresAt: string | null;
};

export type PlanOption = {
  label: string;
  message: string;
  primaryAction: "reserve" | "menu" | "call";
  secondaryAction: "reserve" | "menu" | "call";
};

export type StateCopy = {
  label: string;
  reservationHint: string;
  currentSignals: string[];
};

export type ConversionConfig = {
  timezone: string;
  hoursToday: string;
  businessHours: Record<DayKey, BusinessDayHours>;
  businessHoursExceptions: BusinessHoursException[];
  businessHoursSource: BusinessHoursSource;
  automaticRules: Record<DayKey, TimeRangeRule[]>;
  override: OverrideConfig;
  planOptions: Record<PlanKey, PlanOption>;
  stateCopy: Record<DemandState, StateCopy>;
};

export type ResolvedConversionState = {
  source: "automatic" | "manual";
  state: DemandState;
  terrace: TerraceState;
  label: string;
  reservationHint: string;
  currentSignals: string[];
  customMessage: string | null;
  hoursToday: string;
  dayKey: DayKey;
  localTime: string;
  matchedRule: TimeRangeRule | null;
};

export type ResolvedBusinessHours = {
  dayKey: DayKey;
  dateKey: string;
  isOpenToday: boolean;
  labelToday: string;
  summary: string;
  currentMessage: string;
  activeException: BusinessHoursException | null;
  openingHoursSpecification: Array<{
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string;
    opens: string;
    closes: string;
  }>;
  specialOpeningHoursSpecification: Array<{
    "@type": "OpeningHoursSpecification";
    validFrom: string;
    validThrough: string;
    opens?: string;
    closes?: string;
  }>;
};

export async function readConversionConfig(): Promise<ConversionConfig> {
  try {
    const stored = await readStoredConversionConfig();
    if (!stored) {
      return withSafeDefaults(defaultConversionConfig as ConversionConfig);
    }
    return withSafeDefaults(stored);
  } catch {
    return withSafeDefaults(defaultConversionConfig as ConversionConfig);
  }
}

export async function writeConversionConfig(config: ConversionConfig) {
  await writeStoredConversionConfig(config);
}

export async function getResolvedConversionState(
  now = new Date(),
): Promise<{ config: ConversionConfig; resolved: ResolvedConversionState }> {
  const config = await readConversionConfig();
  const normalizedOverride = normalizeOverride(config.override, now);
  const parts = getLocalParts(now, config.timezone);
  const resolvedHours = resolveBusinessHoursForDate(config, parts.dayKey, parts.dateKey);
  const hoursToday = formatDaySummary(resolvedHours.hours);
  const automaticState = getAutomaticState(config, parts.dayKey, parts.minutes);
  const finalState = normalizedOverride.mode === "manual" ? normalizedOverride.state : automaticState;
  const stateCopy = config.stateCopy[finalState];
  const customMessage = normalizedOverride.mode === "manual" && normalizedOverride.customMessage.trim()
    ? normalizedOverride.customMessage.trim()
    : null;

  const currentSignals = mergeSignals(
    stateCopy.currentSignals,
    terraceSignal(normalizedOverride.terrace),
    customMessage,
  );

  return {
    config: {
      ...config,
      hoursToday,
      override: normalizedOverride,
    },
    resolved: {
      source: normalizedOverride.mode,
      state: finalState,
      terrace: normalizedOverride.terrace,
      label: stateCopy.label,
      reservationHint: stateCopy.reservationHint,
      currentSignals,
      customMessage,
      hoursToday,
      dayKey: parts.dayKey,
      localTime: parts.time,
      matchedRule: findMatchingRule(config.automaticRules[parts.dayKey], parts.minutes),
    },
  };
}

export async function getResolvedBusinessHours(now = new Date()): Promise<{
  config: ConversionConfig;
  resolved: ResolvedBusinessHours;
}> {
  const config = await readConversionConfig();
  const parts = getLocalParts(now, config.timezone);
  const resolvedHours = resolveBusinessHoursForDate(config, parts.dayKey, parts.dateKey);
  const todayHours = resolvedHours.hours;

  return {
    config,
    resolved: {
      dayKey: parts.dayKey,
      dateKey: parts.dateKey,
      isOpenToday: todayHours?.isOpen ?? false,
      labelToday: buildTodayLabel(todayHours),
      summary: summarizeBusinessHours(config.businessHours),
      currentMessage: buildCurrentHoursMessage(todayHours),
      activeException: resolvedHours.exception,
      openingHoursSpecification: toOpeningHoursSpecification(config.businessHours),
      specialOpeningHoursSpecification: toSpecialOpeningHoursSpecification(config.businessHoursExceptions ?? []),
    },
  };
}

function withSafeDefaults(config: ConversionConfig): ConversionConfig {
  const base = defaultConversionConfig as ConversionConfig;

  return {
    ...base,
    ...config,
    businessHours: {
      ...base.businessHours,
      ...config.businessHours,
    },
    businessHoursExceptions: normalizeBusinessHoursExceptions(config.businessHoursExceptions ?? base.businessHoursExceptions ?? []),
    businessHoursSource: {
      ...base.businessHoursSource,
      ...config.businessHoursSource,
      externalSync: {
        ...base.businessHoursSource.externalSync,
        ...config.businessHoursSource?.externalSync,
      },
    },
    automaticRules: {
      ...base.automaticRules,
      ...config.automaticRules,
    },
    override: {
      ...base.override,
      ...config.override,
    },
    planOptions: {
      ...base.planOptions,
      ...config.planOptions,
    },
    stateCopy: {
      ...base.stateCopy,
      ...config.stateCopy,
    },
  };
}

function normalizeOverride(override: OverrideConfig, now: Date): OverrideConfig {
  if (override.mode !== "manual" || !override.expiresAt) {
    return override;
  }

  const expires = new Date(override.expiresAt);

  if (Number.isNaN(expires.getTime()) || expires.getTime() > now.getTime()) {
    return override;
  }

  return {
    ...override,
    mode: "automatic",
  };
}

function getAutomaticState(
  config: ConversionConfig,
  dayKey: DayKey,
  minutes: number,
): DemandState {
  const rules = config.automaticRules[dayKey] ?? [];
  const match = findMatchingRule(rules, minutes);
  return match?.state ?? "quiet";
}

function findMatchingRule(rules: TimeRangeRule[], minutes: number) {
  return rules.find((rule) => {
    const startMinutes = parseTimeToMinutes(rule.start);
    const endMinutes = parseTimeToMinutes(rule.end);
    return minutes >= startMinutes && minutes <= endMinutes;
  }) ?? null;
}

function parseTimeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return (hours * 60) + minutes;
}

function terraceSignal(state: TerraceState) {
  switch (state) {
    case "limited":
      return "Terraza limitada";
    case "full":
      return "Terraza completa";
    case "unavailable":
      return "Terraza no disponible";
    default:
      return "Terraza disponible";
  }
}

function mergeSignals(base: string[], terrace: string, customMessage: string | null) {
  const unique = new Set<string>();
  const result: string[] = [];

  [terrace, ...base, customMessage ?? ""].forEach((entry) => {
    const value = entry.trim();
    if (!value || unique.has(value)) {
      return;
    }
    unique.add(value);
    result.push(value);
  });

  return result.slice(0, 3);
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
    time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
  };
}

function normalizeBusinessHoursExceptions(exceptions: BusinessHoursException[]) {
  return [...exceptions]
    .filter((entry) => /^\d{4}-\d{2}-\d{2}$/.test(String(entry?.date || "").trim()))
    .map((entry) => ({
      date: String(entry.date).trim(),
      label: String(entry.label || "").trim(),
      closed: Boolean(entry.closed),
      primary: entry.primary ?? null,
      secondary: entry.secondary ?? null,
      specialMessage: String(entry.specialMessage || "").trim(),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function resolveBusinessHoursForDate(
  config: ConversionConfig,
  dayKey: DayKey,
  dateKey: string,
): { hours: BusinessDayHours; exception: BusinessHoursException | null } {
  const exception =
    normalizeBusinessHoursExceptions(config.businessHoursExceptions ?? []).find((entry) => entry.date === dateKey) ?? null;

  if (exception) {
    return {
      hours: {
        isOpen: !exception.closed && Boolean(exception.primary),
        primary: !exception.closed ? exception.primary : null,
        secondary: !exception.closed ? exception.secondary : null,
        specialMessage: exception.specialMessage,
      },
      exception,
    };
  }

  return {
    hours: config.businessHours[dayKey] ?? {
      isOpen: false,
      primary: null,
      secondary: null,
      specialMessage: "",
    },
    exception: null,
  };
}

function formatSlot(slot: BusinessHoursSlot | null) {
  if (!slot) return "";
  return `${slot.open}–${slot.close}`;
}

function buildTodayLabel(day: BusinessDayHours | undefined) {
  if (!day || !day.isOpen || !day.primary) {
    return "Cerrado hoy";
  }

  const slots = [formatSlot(day.primary), formatSlot(day.secondary)].filter(Boolean);
  return `Abierto hoy de ${slots.join(" · ")}`;
}

function buildCurrentHoursMessage(day: BusinessDayHours | undefined) {
  if (!day || !day.isOpen || !day.primary) {
    return day?.specialMessage?.trim() || "Cerrado hoy";
  }

  if (day.specialMessage.trim()) {
    return day.specialMessage.trim();
  }

  if (day.primary && !day.secondary) {
    return `Hoy ${formatSlot(day.primary)}`;
  }

  return `Hoy ${[formatSlot(day.primary), formatSlot(day.secondary)].filter(Boolean).join(" · ")}`;
}

function summarizeBusinessHours(hours: Record<DayKey, BusinessDayHours>) {
  const mondayToSaturday = ([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ] as DayKey[]).every((dayKey) => haveSameHours(hours.monday, hours[dayKey]));

  const sunday = hours.sunday;
  if (mondayToSaturday && hours.monday?.isOpen && hours.monday?.primary && !hours.monday?.secondary) {
    const mondaySummary = formatDaySummary(hours.monday);
    const sundaySummary = sunday?.isOpen ? formatDaySummary(sunday) : "cerrado";
    return `Lunes a sábado ${mondaySummary} · Domingo ${sundaySummary}`;
  }

  return ([
    ["Lun", hours.monday],
    ["Mar", hours.tuesday],
    ["Mié", hours.wednesday],
    ["Jue", hours.thursday],
    ["Vie", hours.friday],
    ["Sáb", hours.saturday],
    ["Dom", hours.sunday],
  ] as const)
    .map(([label, day]) => `${label} ${formatDaySummary(day)}`)
    .join(" · ");
}

function formatDaySummary(day: BusinessDayHours | undefined) {
  if (!day || !day.isOpen || !day.primary) {
    return "cerrado";
  }

  return [formatSlot(day.primary), formatSlot(day.secondary)].filter(Boolean).join(" · ");
}

function haveSameHours(a: BusinessDayHours | undefined, b: BusinessDayHours | undefined) {
  return JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
}

function toOpeningHoursSpecification(hours: Record<DayKey, BusinessDayHours>) {
  const mapping: Record<DayKey, string> = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  };

  const specs: ResolvedBusinessHours["openingHoursSpecification"] = [];

  (Object.keys(mapping) as DayKey[]).forEach((dayKey) => {
    const day = hours[dayKey];
    if (!day?.isOpen) return;

    [day.primary, day.secondary].forEach((slot) => {
      if (!slot) return;
      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: mapping[dayKey],
        opens: slot.open,
        closes: slot.close,
      });
    });
  });

  return specs;
}

function toSpecialOpeningHoursSpecification(exceptions: BusinessHoursException[]) {
  const specs: ResolvedBusinessHours["specialOpeningHoursSpecification"] = [];

  exceptions.forEach((entry) => {
    const base = {
      "@type": "OpeningHoursSpecification" as const,
      validFrom: entry.date,
      validThrough: entry.date,
    };

    if (entry.closed || !entry.primary) {
      specs.push(base);
      return;
    }

    [entry.primary, entry.secondary].forEach((slot) => {
      if (!slot) return;
      specs.push({
        ...base,
        opens: slot.open,
        closes: slot.close,
      });
    });
  });

  return specs;
}
