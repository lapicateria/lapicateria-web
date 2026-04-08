"use client";

import { useState, useSyncExternalStore } from "react";
import {
  COOKIE_CONSENT_EVENT,
  createConsent,
  readStoredConsent,
  writeStoredConsent,
} from "@/lib/cookies";

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener(COOKIE_CONSENT_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(COOKIE_CONSENT_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function CookieBanner() {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    readStoredConsent,
    () => null,
  );
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  function acceptAll() {
    const nextConsent = createConsent("accepted", true);
    writeStoredConsent(nextConsent);
    setAnalyticsEnabled(true);
    setIsConfigOpen(false);
  }

  function rejectAll() {
    const nextConsent = createConsent("rejected", false);
    writeStoredConsent(nextConsent);
    setAnalyticsEnabled(false);
    setIsConfigOpen(false);
  }

  function saveCustomPreferences() {
    const nextConsent = createConsent("customized", analyticsEnabled);
    writeStoredConsent(nextConsent);
    setIsConfigOpen(false);
  }

  if (consent) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-x-0 bottom-4 z-50 px-4 sm:bottom-6 sm:px-6">
        <div className="mx-auto max-w-5xl rounded-[1.8rem] border border-border bg-white/96 p-5 shadow-[0_22px_50px_rgba(31,26,23,0.18)] backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand-500">
                Cookies
              </p>
              <p className="text-sm leading-7 text-charcoal sm:text-base">
                Usamos cookies propias y de terceros para analizar el uso de la web y mejorar la experiencia.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex items-center justify-center rounded-full bg-sand-400 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-bone shadow-[0_16px_28px_rgba(132,81,28,0.26)] transition hover:bg-sand-500"
              >
                Aceptar todas
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="inline-flex items-center justify-center rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition hover:border-sand-300"
              >
                Rechazar
              </button>
              <button
                type="button"
                onClick={() => {
                  setAnalyticsEnabled(readStoredConsent()?.analytics ?? true);
                  setIsConfigOpen(true);
                }}
                className="inline-flex items-center justify-center rounded-full border border-border bg-bone px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition hover:border-sand-300"
              >
                Configurar
              </button>
            </div>
          </div>
        </div>
      </div>

      {isConfigOpen ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(16,16,14,0.45)] px-4">
          <div className="w-full max-w-xl rounded-[1.8rem] border border-border bg-white p-6 shadow-[0_24px_56px_rgba(16,16,14,0.2)] sm:p-7">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand-500">
                  Configuración de cookies
                </p>
                <h2 className="font-display text-3xl leading-tight text-ink">
                  Elige qué cookies quieres permitir
                </h2>
              </div>

              <div className="rounded-[1.3rem] border border-border bg-bone p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-ink">Cookies necesarias</p>
                    <p className="mt-1 text-sm leading-7 text-charcoal">
                      Son imprescindibles para que la web funcione correctamente.
                    </p>
                  </div>
                  <span className="rounded-full bg-olive-700/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-olive-700">
                    Siempre activas
                  </span>
                </div>
              </div>

              <div className="rounded-[1.3rem] border border-border bg-bone p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-ink">Cookies analíticas</p>
                    <p className="mt-1 text-sm leading-7 text-charcoal">
                      Nos ayudan a medir el uso de la web para mejorar contenidos y conversión.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAnalyticsEnabled((value) => !value)}
                    aria-pressed={analyticsEnabled}
                    className={`relative inline-flex h-8 w-14 rounded-full transition ${
                      analyticsEnabled ? "bg-sand-400" : "bg-border"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${
                        analyticsEnabled ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsConfigOpen(false)}
                  className="inline-flex items-center justify-center rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition hover:border-sand-300"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  onClick={saveCustomPreferences}
                  className="inline-flex items-center justify-center rounded-full bg-sand-400 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-bone shadow-[0_16px_28px_rgba(132,81,28,0.26)] transition hover:bg-sand-500"
                >
                  Guardar preferencias
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
