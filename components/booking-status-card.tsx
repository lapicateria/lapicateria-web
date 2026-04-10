"use client";

import { useEffect, useState } from "react";
import type { BusinessHoursSnapshot } from "@/lib/business-hours";
import type { ResolvedConversionState } from "@/lib/conversion";
import type { Locale } from "@/lib/i18n";

type BookingStatusCardProps = {
  locale: Locale;
};

type StatusResponse = {
  businessStatus: BusinessHoursSnapshot;
  resolved: ResolvedConversionState;
};

export function BookingStatusCard({ locale }: BookingStatusCardProps) {
  const [data, setData] = useState<StatusResponse | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timeoutId = window.setTimeout(() => {
      if (!cancelled) {
        setHasError(true);
      }
    }, 3500);

    async function load() {
      try {
        const response = await fetch("/api/conversion/status", { cache: "no-store" });
        if (!response.ok) {
          if (!cancelled) {
            setHasError(true);
          }
          return;
        }
        const payload = (await response.json()) as StatusResponse;
        if (!cancelled) {
          setData(payload);
          setHasError(false);
        }
      } catch {
        if (!cancelled) {
          setHasError(true);
        }
        return;
      }
    }

    void load();
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  const copy =
    locale === "en"
      ? {
          eyebrow: "Availability",
          title: "Current service mood",
          loading: "Loading current service information...",
          fallback:
            "Live availability is not responding right now. You can still book through the official button or call us directly.",
        }
      : locale === "fr"
        ? {
            eyebrow: "Disponibilite",
            title: "Etat du service en ce moment",
            loading: "Chargement des informations du service...",
            fallback:
              "La disponibilite en direct ne repond pas pour le moment. Vous pouvez quand meme reserver via le bouton officiel ou nous appeler.",
          }
        : {
            eyebrow: "Disponibilidad",
            title: "Estado actual del servicio",
            loading: "Cargando información del servicio...",
            fallback:
              "La disponibilidad en tiempo real no está respondiendo ahora mismo. Puedes reservar igualmente desde el botón oficial o llamarnos.",
        };
  const resolvedState = data?.resolved ?? null;
  const effectiveState = resolvedState ? getEffectiveServiceState(locale, resolvedState, data?.businessStatus ?? null) : null;

  return (
    <div className="rounded-[1.6rem] border border-border bg-white p-6 shadow-[0_18px_36px_rgba(31,26,23,0.08)]">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
        {copy.eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl leading-tight text-ink">{copy.title}</h2>
      {!resolvedState && !hasError ? (
        <p className="mt-4 text-sm leading-7 text-charcoal">{copy.loading}</p>
      ) : hasError && !resolvedState ? (
        <p className="mt-4 text-sm leading-7 text-charcoal">{copy.fallback}</p>
      ) : (
        <div className="mt-5 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-sand-200/24 px-4 py-2 text-sm font-semibold text-ink">
            <span className="h-2.5 w-2.5 rounded-full bg-sand-500" />
            {effectiveState?.label}
          </div>
          <p className="text-base leading-8 text-charcoal">{effectiveState?.reservationHint}</p>
          <div className="space-y-3">
            {effectiveState?.currentSignals.map((signal) => (
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

function getEffectiveServiceState(
  locale: Locale,
  resolved: ResolvedConversionState,
  businessStatus: BusinessHoursSnapshot | null,
) {
  if (!businessStatus || businessStatus.isOpenNow) {
    return resolved;
  }

  const nextOpening =
    businessStatus.nextOpenTime && businessStatus.nextOpenOffset !== null
      ? businessStatus.nextOpenOffset === 0
        ? locale === "es"
          ? `Abrimos hoy a las ${businessStatus.nextOpenTime}`
          : locale === "en"
            ? `We open today at ${businessStatus.nextOpenTime}`
            : `Ouverture aujourd'hui à ${businessStatus.nextOpenTime}`
        : businessStatus.nextOpenOffset === 1
          ? locale === "es"
            ? `Abrimos mañana a las ${businessStatus.nextOpenTime}`
            : locale === "en"
              ? `We open tomorrow at ${businessStatus.nextOpenTime}`
              : `Ouverture demain à ${businessStatus.nextOpenTime}`
          : locale === "es"
            ? `Próxima apertura a las ${businessStatus.nextOpenTime}`
            : locale === "en"
              ? `Next opening at ${businessStatus.nextOpenTime}`
              : `Prochaine ouverture à ${businessStatus.nextOpenTime}`
      : locale === "es"
        ? "Consulta horarios antes de venir"
        : locale === "en"
          ? "Check opening hours before coming"
          : "Consultez les horaires avant de venir";

  const reserveMessage =
    locale === "es"
      ? "Puedes reservar ya tu mesa"
      : locale === "en"
        ? "You can already book your table"
        : "Vous pouvez deja reserver votre table";

  const specialMessage = businessStatus.specialMessage.trim();

  return {
    ...resolved,
    label:
      locale === "es"
        ? "Ahora mismo estamos cerrados"
        : locale === "en"
          ? "We are closed right now"
          : "Nous sommes fermes en ce moment",
    reservationHint: nextOpening,
    currentSignals: [nextOpening, reserveMessage, specialMessage].filter(Boolean),
  };
}
