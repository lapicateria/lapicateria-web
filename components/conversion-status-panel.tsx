"use client";

import { useEffect, useMemo, useState } from "react";
import { CtaButton } from "@/components/cta-button";
import { TrackedReservationLink } from "@/components/tracked-reservation-link";
import type { DemandState, PlanKey, PlanOption, ResolvedConversionState } from "@/lib/conversion";
import type { Locale } from "@/lib/i18n";

type StatusResponse = {
  planOptions: Record<PlanKey, PlanOption>;
  resolved: ResolvedConversionState;
};

type ConversionStatusPanelProps = {
  locale: Locale;
  phoneHref: string;
};

export function ConversionStatusPanel({
  locale,
  phoneHref,
}: ConversionStatusPanelProps) {
  const [data, setData] = useState<StatusResponse | null>(createFallbackStatus());
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>("a_la_carte");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/conversion/status", { cache: "no-store" });
        if (!response.ok) {
          return;
        }
        const payload = (await response.json()) as StatusResponse;
        if (!cancelled) {
          setData(payload);
        }
      } catch {
        return;
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const content = useMemo(() => getPanelCopy(locale), [locale]);

  if (!data) {
    return (
      <section className="px-5 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl rounded-[1.8rem] border border-border bg-white px-6 py-6 text-sm text-charcoal shadow-[0_18px_36px_rgba(31,26,23,0.08)] sm:px-8">
          {content.loading}
        </div>
      </section>
    );
  }

  const selectedOption = data.planOptions[selectedPlan];
  const badgeClassName = stateClassNames[data.resolved.state];
  const primaryLocation = selectedOption.primaryAction === "reserve" ? "plan_simulator" : "hero";
  const secondaryLocation = selectedOption.secondaryAction === "reserve" ? "plan_simulator" : "hero";

  return (
    <section className="px-5 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="rounded-[1.8rem] border border-border bg-white px-6 py-6 shadow-[0_18px_36px_rgba(31,26,23,0.08)] sm:px-8">
            <div className="space-y-5">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                  {content.availabilityEyebrow}
                </p>
                <h2 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
                  {content.availabilityTitle}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${badgeClassName}`}>
                  <span className="h-2.5 w-2.5 rounded-full bg-current" />
                  {data.resolved.label}
                </span>
                <p className="text-sm font-medium text-charcoal">{data.resolved.reservationHint}</p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {content.bookingPoints.map((item, index) => (
                  <div
                    key={item}
                    className={`rounded-[1.2rem] border px-4 py-4 text-sm leading-7 ${
                      index === 0
                        ? "border-sand-300 bg-sand-200/22 font-semibold text-ink"
                        : "border-border bg-bone text-charcoal"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="rounded-[1.2rem] bg-cream/76 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand-500">
                  {content.todayOpen}
                </p>
                <p className="mt-2 text-lg font-semibold text-ink">{data.resolved.hoursToday}</p>
              </div>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <TrackedReservationLink
                  label={content.reserveLabel}
                  locale={locale}
                  location="home_availability"
                  className="inline-flex items-center justify-center rounded-full bg-sand-400 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-bone shadow-[0_20px_34px_rgba(132,81,28,0.34)] transition hover:bg-sand-500 hover:shadow-[0_26px_42px_rgba(132,81,28,0.44)]"
                />
                <CtaButton href={`tel:${phoneHref}`} label={content.callLabel} variant="secondary" />
              </div>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-border bg-cream/68 px-6 py-6 sm:px-8">
            <div className="space-y-5">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                  {content.planEyebrow}
                </p>
                <h2 className="font-display text-4xl leading-tight text-ink">
                  {content.planTitle}
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {(Object.keys(data.planOptions) as PlanKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedPlan(key)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      selectedPlan === key
                        ? "border-sand-400 bg-sand-400 text-bone shadow-[0_10px_20px_rgba(132,81,28,0.18)]"
                        : "border-border bg-white text-ink hover:border-sand-300"
                    }`}
                  >
                    {data.planOptions[key].label}
                  </button>
                ))}
              </div>

              <div className="rounded-[1.3rem] bg-white/86 px-5 py-5">
                <p className="text-base leading-8 text-charcoal">{selectedOption.message}</p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  {renderPlanAction(selectedOption.primaryAction, content, locale, phoneHref, primaryLocation)}
                  {renderPlanAction(selectedOption.secondaryAction, content, locale, phoneHref, secondaryLocation, "secondary")}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-border bg-white px-6 py-6 shadow-[0_18px_36px_rgba(31,26,23,0.08)] sm:px-8">
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
                {content.nowEyebrow}
              </p>
              <h2 className="font-display text-4xl leading-tight text-ink">{content.nowTitle}</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {data.resolved.currentSignals.map((signal) => (
                <span
                  key={signal}
                  className="inline-flex rounded-full border border-border bg-bone px-4 py-2 text-sm font-medium text-charcoal"
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function createFallbackStatus(): StatusResponse {
  return {
    planOptions: {
      solo_tapas: {
        label: "Solo tapas",
        message: "Perfecto para pasar, tapear y sentarte con más flexibilidad.",
        primaryAction: "menu",
        secondaryAction: "call",
      },
      a_la_carte: {
        label: "Comer a la carta",
        message: "Si vienes a comer con calma o en hora punta, mejor reservar mesa.",
        primaryAction: "reserve",
        secondaryAction: "menu",
      },
      group_sharing: {
        label: "Compartir en grupo",
        message: "Si venís a compartir paellas, brasa o mesa larga, mejor venir con reserva.",
        primaryAction: "reserve",
        secondaryAction: "call",
      },
    },
    resolved: {
      source: "automatic",
      state: "quiet",
      terrace: "available",
      label: "Tranquilo",
      reservationHint: "Buen momento para venir",
      currentSignals: [
        "Terraza disponible",
        "Buen momento para venir",
        "Servicio más tranquilo",
      ],
      customMessage: null,
      hoursToday: "13:00–16:30 · 20:00–23:30",
      dayKey: "monday",
      localTime: "12:00",
      matchedRule: null,
    },
  };
}

const stateClassNames: Record<DemandState, string> = {
  quiet: "bg-olive-700/12 text-olive-700",
  busy: "bg-sand-200/48 text-sand-600",
  very_busy: "bg-[rgba(141,91,39,0.16)] text-[rgb(128,81,33)]",
  packed: "bg-[rgba(54,31,17,0.12)] text-[rgb(66,38,19)]",
};

function renderPlanAction(
  action: PlanOption["primaryAction"],
  content: ReturnType<typeof getPanelCopy>,
  locale: Locale,
  phoneHref: string,
  location: "hero" | "plan_simulator" | "home_availability",
  variant: "primary" | "secondary" = "primary",
) {
  if (action === "reserve") {
    return (
      <TrackedReservationLink
        label={content.reserveLabel}
        locale={locale}
        location={location}
        variant={variant}
      />
    );
  }

  if (action === "call") {
    return <CtaButton href={`tel:${phoneHref}`} label={content.callLabel} variant={variant} />;
  }

  return <CtaButton href={`/${locale}/carta`} label={content.menuLabel} variant={variant} />;
}

function getPanelCopy(locale: Locale) {
  if (locale === "en") {
    return {
      loading: "Loading live service information...",
      availabilityEyebrow: "Availability",
      availabilityTitle: "Check availability before booking",
      bookingPoints: [
        "Tapas included with each drink",
        "Come for tapas or stay for a full meal",
        "Average meal around 20 EUR",
        "Mercado de San Agustin, central Granada",
      ],
      todayOpen: "Open today",
      reserveLabel: "Book a table",
      callLabel: "Call",
      menuLabel: "View menu",
      planEyebrow: "Plan your visit",
      planTitle: "How are you coming today?",
      nowEyebrow: "Right now",
      nowTitle: "Right now at La Picatería",
    };
  }

  if (locale === "fr") {
    return {
      loading: "Chargement des informations du service...",
      availabilityEyebrow: "Disponibilite",
      availabilityTitle: "Voir la disponibilite avant de reserver",
      bookingPoints: [
        "Tapas incluses avec chaque boisson",
        "Vous pouvez venir pour taper ou manger a la carte",
        "Repas moyen autour de 20 €",
        "Mercado de San Agustin, centre de Grenade",
      ],
      todayOpen: "Ouvert aujourd'hui",
      reserveLabel: "Reserver une table",
      callLabel: "Appeler",
      menuLabel: "Voir la carte",
      planEyebrow: "Votre plan",
      planTitle: "Comment venez-vous aujourd'hui ?",
      nowEyebrow: "En ce moment",
      nowTitle: "En ce moment a La Picatería",
    };
  }

  return {
    loading: "Cargando información del servicio...",
    availabilityEyebrow: "Disponibilidad",
    availabilityTitle: "Ver disponibilidad antes de reservar",
    bookingPoints: [
      "Tapas incluidas con cada bebida",
      "Puedes venir a tapear o sentarte a comer a la carta",
      "Comida media alrededor de 20 €",
      "Ubicación: Mercado de San Agustín, centro de Granada",
    ],
    todayOpen: "Abierto hoy",
    reserveLabel: "Reservar mesa",
    callLabel: "Llamar",
    menuLabel: "Ver carta",
    planEyebrow: "Tu plan",
    planTitle: "¿Cómo vienes hoy?",
    nowEyebrow: "Ahora mismo",
    nowTitle: "Ahora mismo en La Picatería",
  };
}
