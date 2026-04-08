import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 text-center">
      <div className="max-w-xl space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
          404
        </p>
        <h1 className="font-display text-5xl text-ink">La ruta no existe</h1>
        <p className="text-base leading-8 text-charcoal">
          Vuelve a la home en español para seguir navegando por la carta o la reserva.
        </p>
        <Link
          href="/es"
          className="inline-flex rounded-full bg-sand-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-bone transition hover:bg-sand-500"
        >
          Ir a /es
        </Link>
      </div>
    </main>
  );
}
