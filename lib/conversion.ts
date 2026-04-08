import { promises as fs } from "node:fs";
import path from "node:path";
import defaultConversionConfig from "@/content/conversion-settings.json";

export type DemandState = "quiet" | "busy" | "very_busy" | "packed";
export type TerraceState = "available" | "limited" | "full";
export type PlanKey = "solo_tapas" | "a_la_carte" | "group_sharing";
export type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

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

const SETTINGS_PATH = path.join(process.cwd(), "content", "conversion-settings.json");

export async function readConversionConfig(): Promise<ConversionConfig> {
  try {
    const raw = await fs.readFile(SETTINGS_PATH, "utf8");
    const parsed = JSON.parse(raw) as ConversionConfig;
    return withSafeDefaults(parsed);
  } catch {
    return withSafeDefaults(defaultConversionConfig as ConversionConfig);
  }
}

export async function writeConversionConfig(config: ConversionConfig) {
  await fs.writeFile(SETTINGS_PATH, `${JSON.stringify(config, null, 2)}\n`, "utf8");
}

export async function getResolvedConversionState(
  now = new Date(),
): Promise<{ config: ConversionConfig; resolved: ResolvedConversionState }> {
  const config = await readConversionConfig();
  const normalizedOverride = normalizeOverride(config.override, now);
  const parts = getLocalParts(now, config.timezone);
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
      hoursToday: config.hoursToday,
      dayKey: parts.dayKey,
      localTime: parts.time,
      matchedRule: findMatchingRule(config.automaticRules[parts.dayKey], parts.minutes),
    },
  };
}

function withSafeDefaults(config: ConversionConfig): ConversionConfig {
  const base = defaultConversionConfig as ConversionConfig;

  return {
    ...base,
    ...config,
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
    time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
  };
}
