"use client";

import { useEffect, useState } from "react";
import type { ResolvedConversionState } from "@/lib/conversion";
import type { Locale } from "@/lib/i18n";

type BookingStatusCardProps = {
  locale: Locale;
};

type StatusResponse = {
  resolved: ResolvedConversionState;
};

export function BookingStatusCard({ locale }: BookingStatusCardProps) {
  const [resolved, setResolved] = useState<ResolvedConversionState | null>(null);

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
          setResolved(payload.resolved);
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

  const copy =
    locale === "en"
      ? { eyebrow: "Availability", title: "Current service mood", loading: "Loading..." }
      : locale === "fr"
        ? { eyebrow: "Disponibilite", title: "Etat du service en ce moment", loading: "Chargement..." }
        : { eyebrow: "Disponibilidad", title: "Estado actual del servicio", loading: "Cargando..." };

  return (
    <div className="rounded-[1.6rem] border border-border bg-white p-6 shadow-[0_18px_36px_rgba(31,26,23,0.08)]">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
        {copy.eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl leading-tight text-ink">{copy.title}</h2>
      {!resolved ? (
        <p className="mt-4 text-sm leading-7 text-charcoal">{copy.loading}</p>
      ) : (
        <div className="mt-5 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-sand-200/24 px-4 py-2 text-sm font-semibold text-ink">
            <span className="h-2.5 w-2.5 rounded-full bg-sand-500" />
            {resolved.label}
          </div>
          <p className="text-base leading-8 text-charcoal">{resolved.reservationHint}</p>
          <div className="space-y-3">
            {resolved.currentSignals.map((signal) => (
              <p key={signal} className="border-b border-border pb-3 text-sm leading-7 text-charcoal">
                {signal}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
