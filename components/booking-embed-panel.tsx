"use client";

import { useEffect, useState } from "react";
import { CtaButton } from "@/components/cta-button";

type BookingEmbedPanelProps = {
  locale: "es" | "en" | "fr";
  bookingUrl: string;
  phoneHref: string;
};

type EmbedState = "loading" | "slow" | "ready" | "blocked";

export function BookingEmbedPanel({
  locale,
  bookingUrl,
  phoneHref,
}: BookingEmbedPanelProps) {
  const [embedState, setEmbedState] = useState<EmbedState>("loading");

  useEffect(() => {
    const slowTimer = window.setTimeout(() => {
      setEmbedState((current) => (current === "loading" ? "slow" : current));
    }, 3500);
    const blockedTimer = window.setTimeout(() => {
      setEmbedState((current) => (current === "ready" ? current : "blocked"));
    }, 9000);

    return () => {
      window.clearTimeout(slowTimer);
      window.clearTimeout(blockedTimer);
    };
  }, []);

  const copy =
    locale === "en"
      ? {
          loading: "Loading the official booking form.",
          slow: "The booking form is taking longer than expected. You can still book in a new tab or call us now.",
          blocked: "The provider may be blocking the embedded form on this device. Open the official booking page or call us directly.",
          primary: "Open official booking",
          secondary: "Call now",
        }
      : locale === "fr"
        ? {
            loading: "Chargement du formulaire officiel de reservation.",
            slow: "Le formulaire met plus de temps a charger. Vous pouvez reserver dans un nouvel onglet ou nous appeler.",
            blocked: "Le fournisseur peut bloquer l'integration sur cet appareil. Ouvrez la reservation officielle ou appelez-nous.",
            primary: "Ouvrir la reservation",
            secondary: "Appeler",
          }
        : {
            loading: "Cargando la reserva oficial.",
            slow: "El formulario está tardando más de lo normal. Puedes abrir la reserva en una pestaña nueva o llamarnos ahora mismo.",
            blocked: "Puede que el proveedor esté bloqueando el formulario embebido en este dispositivo. Abre la reserva oficial o llámanos directamente.",
            primary: "Abrir reserva oficial",
            secondary: "Llamar ahora",
          };

  const helperText =
    embedState === "blocked"
      ? copy.blocked
      : embedState === "slow"
        ? copy.slow
        : copy.loading;

  return (
    <div className="overflow-hidden rounded-[1.8rem] bg-white shadow-[0_24px_58px_rgba(31,26,23,0.1)]">
      <div className="border-b border-border bg-cream/55 px-5 py-4">
        <p className="text-sm leading-7 text-charcoal">{helperText}</p>
        {embedState !== "ready" ? (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <CtaButton href={bookingUrl} label={copy.primary} external />
            <CtaButton href={`tel:${phoneHref}`} label={copy.secondary} variant="secondary" />
          </div>
        ) : null}
      </div>

      <iframe
        title="Reserva oficial Qamarero La Picatería"
        src={bookingUrl}
        className="min-h-[820px] w-full bg-white"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => setEmbedState("ready")}
      />
    </div>
  );
}
