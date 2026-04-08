import { OwnerConversionDashboard } from "@/components/owner-conversion-dashboard";

export const dynamic = "force-dynamic";

export default function OwnerConversionPage() {
  return (
    <section className="px-5 py-14 sm:px-6 lg:px-10 lg:py-18">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="space-y-4 border-b border-border pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
            Owner dashboard
          </p>
          <h1 className="font-display text-5xl leading-tight text-ink sm:text-6xl">
            Conversión y demanda
          </h1>
          <p className="max-w-3xl text-base leading-8 text-charcoal">
            Panel simple para ajustar el estado actual, los mensajes comerciales y las reglas automáticas sin tocar código.
          </p>
        </div>

        <OwnerConversionDashboard />
      </div>
    </section>
  );
}
