"use client";

import { useEffect, useState } from "react";
import type {
  ConversionConfig,
  DayKey,
  DemandState,
  PlanKey,
  TerraceState,
  TimeRangeRule,
} from "@/lib/conversion";

const dayLabels: Record<DayKey, string> = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
};

const stateOptions: { value: DemandState; label: string }[] = [
  { value: "quiet", label: "Tranquilo" },
  { value: "busy", label: "Concurrido" },
  { value: "very_busy", label: "Muy concurrido" },
  { value: "packed", label: "A rebosar" },
];

const terraceOptions: { value: TerraceState; label: string }[] = [
  { value: "available", label: "Disponible" },
  { value: "limited", label: "Limitada" },
  { value: "full", label: "Completa" },
  { value: "unavailable", label: "No disponible" },
];

type OwnerResponse = {
  config: ConversionConfig;
  resolved: {
    label: string;
    reservationHint: string;
    source: "automatic" | "manual";
    localTime: string;
  };
  error?: string;
};

export function OwnerConversionDashboard() {
  const [config, setConfig] = useState<ConversionConfig | null>(null);
  const [status, setStatus] = useState<OwnerResponse["resolved"] | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/owner/conversion", { cache: "no-store" });
        if (!response.ok) {
          if (!cancelled) {
            setFeedback("No se ha podido cargar la configuración actual.");
          }
          return;
        }
        const payload = (await response.json()) as OwnerResponse;
        if (!cancelled) {
          setConfig(payload.config);
          setStatus(payload.resolved);
          setFeedback(null);
        }
      } catch {
        if (!cancelled) {
          setFeedback("No se ha podido cargar la configuración actual.");
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function saveConfig() {
    if (!config) {
      return;
    }

    setSaving(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/owner/conversion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      });

      const payload = (await response.json()) as OwnerResponse;

      setSaving(false);

      if (!response.ok) {
        setFeedback(payload.error ?? "No se ha podido guardar la configuración.");
        return;
      }

      setConfig(payload.config);
      setStatus(payload.resolved);
      setFeedback("Cambios guardados y publicados.");
    } catch {
      setSaving(false);
      setFeedback("No se ha podido guardar la configuración.");
    }
  }

  if (!config) {
    return <p className="text-sm text-charcoal">Cargando panel de conversión...</p>;
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[1.6rem] border border-border bg-white p-6 shadow-[0_18px_36px_rgba(31,26,23,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
          Estado actual automático
        </p>
        {status ? (
          <div className="mt-4 space-y-2">
            <p className="font-display text-3xl text-ink">{status.label}</p>
            <p className="text-sm leading-7 text-charcoal">{status.reservationHint}</p>
            <p className="text-sm text-charcoal">
              Origen: {status.source === "manual" ? "manual" : "automático"} · Hora local: {status.localTime}
            </p>
          </div>
        ) : null}
      </section>

      <section className="rounded-[1.6rem] border border-border bg-white p-6 shadow-[0_18px_36px_rgba(31,26,23,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
          Override manual
        </p>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm text-charcoal">
            <span>Modo</span>
            <select
              value={config.override.mode}
              onChange={(event) =>
                setConfig({
                  ...config,
                  override: {
                    ...config.override,
                    mode: event.target.value as ConversionConfig["override"]["mode"],
                  },
                })
              }
              className="w-full rounded-2xl border border-border bg-bone px-4 py-3 text-ink"
            >
              <option value="automatic">Automático</option>
              <option value="manual">Manual</option>
            </select>
          </label>

          <label className="space-y-2 text-sm text-charcoal">
            <span>Estado manual</span>
            <select
              value={config.override.state}
              onChange={(event) =>
                setConfig({
                  ...config,
                  override: {
                    ...config.override,
                    state: event.target.value as DemandState,
                  },
                })
              }
              className="w-full rounded-2xl border border-border bg-bone px-4 py-3 text-ink"
            >
              {stateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm text-charcoal">
            <span>Terraza</span>
            <select
              value={config.override.terrace}
              onChange={(event) =>
                setConfig({
                  ...config,
                  override: {
                    ...config.override,
                    terrace: event.target.value as TerraceState,
                  },
                })
              }
              className="w-full rounded-2xl border border-border bg-bone px-4 py-3 text-ink"
            >
              {terraceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm text-charcoal">
            <span>Fin del override</span>
            <input
              type="datetime-local"
              value={config.override.expiresAt ? config.override.expiresAt.slice(0, 16) : ""}
              onChange={(event) =>
                setConfig({
                  ...config,
                  override: {
                    ...config.override,
                    expiresAt: event.target.value ? new Date(event.target.value).toISOString() : null,
                  },
                })
              }
              className="w-full rounded-2xl border border-border bg-bone px-4 py-3 text-ink"
            />
          </label>
        </div>

        <label className="mt-5 block space-y-2 text-sm text-charcoal">
          <span>Mensaje corto opcional</span>
          <input
            type="text"
            value={config.override.customMessage}
            onChange={(event) =>
              setConfig({
                ...config,
                override: {
                  ...config.override,
                  customMessage: event.target.value,
                },
              })
            }
            className="w-full rounded-2xl border border-border bg-bone px-4 py-3 text-ink"
            placeholder="Ej. Mucho movimiento en terraza"
          />
        </label>
      </section>

      <section className="rounded-[1.6rem] border border-border bg-white p-6 shadow-[0_18px_36px_rgba(31,26,23,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
          Simula tu plan
        </p>
        <div className="mt-5 grid gap-6 lg:grid-cols-3">
          {(Object.keys(config.planOptions) as PlanKey[]).map((key) => (
            <div key={key} className="rounded-[1.3rem] border border-border bg-bone p-4">
              <label className="space-y-2 text-sm text-charcoal">
                <span>Etiqueta</span>
                <input
                  type="text"
                  value={config.planOptions[key].label}
                  onChange={(event) =>
                    setConfig({
                      ...config,
                      planOptions: {
                        ...config.planOptions,
                        [key]: {
                          ...config.planOptions[key],
                          label: event.target.value,
                        },
                      },
                    })
                  }
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-ink"
                />
              </label>
              <label className="mt-4 block space-y-2 text-sm text-charcoal">
                <span>Mensaje</span>
                <textarea
                  value={config.planOptions[key].message}
                  onChange={(event) =>
                    setConfig({
                      ...config,
                      planOptions: {
                        ...config.planOptions,
                        [key]: {
                          ...config.planOptions[key],
                          message: event.target.value,
                        },
                      },
                    })
                  }
                  rows={4}
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-ink"
                />
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[1.6rem] border border-border bg-white p-6 shadow-[0_18px_36px_rgba(31,26,23,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
          Mensajes de pico de demanda
        </p>
        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          {stateOptions.map((option) => (
            <div key={option.value} className="rounded-[1.3rem] border border-border bg-bone p-4">
              <p className="font-semibold text-ink">{option.label}</p>
              <label className="mt-4 block space-y-2 text-sm text-charcoal">
                <span>Etiqueta visible</span>
                <input
                  type="text"
                  value={config.stateCopy[option.value].label}
                  onChange={(event) =>
                    setConfig({
                      ...config,
                      stateCopy: {
                        ...config.stateCopy,
                        [option.value]: {
                          ...config.stateCopy[option.value],
                          label: event.target.value,
                        },
                      },
                    })
                  }
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-ink"
                />
              </label>
              <label className="mt-4 block space-y-2 text-sm text-charcoal">
                <span>Pista de reserva</span>
                <input
                  type="text"
                  value={config.stateCopy[option.value].reservationHint}
                  onChange={(event) =>
                    setConfig({
                      ...config,
                      stateCopy: {
                        ...config.stateCopy,
                        [option.value]: {
                          ...config.stateCopy[option.value],
                          reservationHint: event.target.value,
                        },
                      },
                    })
                  }
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-ink"
                />
              </label>
              {config.stateCopy[option.value].currentSignals.map((signal, index) => (
                <label key={`${option.value}-${index}`} className="mt-4 block space-y-2 text-sm text-charcoal">
                  <span>Señal {index + 1}</span>
                  <input
                    type="text"
                    value={signal}
                    onChange={(event) => {
                      const nextSignals = [...config.stateCopy[option.value].currentSignals];
                      nextSignals[index] = event.target.value;
                      setConfig({
                        ...config,
                        stateCopy: {
                          ...config.stateCopy,
                          [option.value]: {
                            ...config.stateCopy[option.value],
                            currentSignals: nextSignals,
                          },
                        },
                      });
                    }}
                    className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-ink"
                  />
                </label>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[1.6rem] border border-border bg-white p-6 shadow-[0_18px_36px_rgba(31,26,23,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
          Reglas automáticas por día y franja
        </p>
        <div className="mt-5 space-y-6">
          {(Object.keys(config.automaticRules) as DayKey[]).map((dayKey) => (
            <div key={dayKey} className="rounded-[1.3rem] border border-border bg-bone p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="font-semibold text-ink">{dayLabels[dayKey]}</p>
                <button
                  type="button"
                  onClick={() =>
                    setConfig({
                      ...config,
                      automaticRules: {
                        ...config.automaticRules,
                        [dayKey]: [
                          ...config.automaticRules[dayKey],
                          { start: "12:00", end: "13:00", state: "quiet" },
                        ],
                      },
                    })
                  }
                  className="text-sm font-semibold text-sand-500"
                >
                  Añadir franja
                </button>
              </div>
              <div className="mt-4 space-y-3">
                {config.automaticRules[dayKey].map((rule, index) => (
                  <RuleEditor
                    key={`${dayKey}-${index}`}
                    rule={rule}
                    onChange={(nextRule) => {
                      const nextRules = [...config.automaticRules[dayKey]];
                      nextRules[index] = nextRule;
                      setConfig({
                        ...config,
                        automaticRules: {
                          ...config.automaticRules,
                          [dayKey]: nextRules,
                        },
                      });
                    }}
                    onRemove={() => {
                      const nextRules = config.automaticRules[dayKey].filter((_, itemIndex) => itemIndex !== index);
                      setConfig({
                        ...config,
                        automaticRules: {
                          ...config.automaticRules,
                          [dayKey]: nextRules,
                        },
                      });
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex items-center justify-between gap-4">
        <div className={`text-sm ${feedback?.includes("guardados") ? "text-olive-700" : "text-charcoal"}`}>
          {feedback}
        </div>
        <button
          type="button"
          onClick={() => void saveConfig()}
          disabled={saving}
          className="inline-flex items-center justify-center rounded-full bg-sand-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-bone shadow-[0_18px_32px_rgba(132,81,28,0.26)] transition hover:bg-sand-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}

function RuleEditor({
  rule,
  onChange,
  onRemove,
}: {
  rule: TimeRangeRule;
  onChange: (rule: TimeRangeRule) => void;
  onRemove: () => void;
}) {
  return (
    <div className="grid gap-3 rounded-2xl border border-border bg-white p-4 md:grid-cols-[1fr_1fr_1.2fr_auto] md:items-center">
      <input
        type="time"
        value={rule.start}
        onChange={(event) => onChange({ ...rule, start: event.target.value })}
        className="rounded-xl border border-border bg-bone px-3 py-2 text-ink"
      />
      <input
        type="time"
        value={rule.end}
        onChange={(event) => onChange({ ...rule, end: event.target.value })}
        className="rounded-xl border border-border bg-bone px-3 py-2 text-ink"
      />
      <select
        value={rule.state}
        onChange={(event) => onChange({ ...rule, state: event.target.value as DemandState })}
        className="rounded-xl border border-border bg-bone px-3 py-2 text-ink"
      >
        {stateOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button type="button" onClick={onRemove} className="text-sm font-semibold text-[rgb(120,45,35)]">
        Eliminar
      </button>
    </div>
  );
}
