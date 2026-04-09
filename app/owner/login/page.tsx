import type { Metadata } from "next";
import { OwnerLoginForm } from "@/components/owner-login-form";

export const metadata: Metadata = {
  title: "Owner login",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function OwnerLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <section className="px-5 py-14 sm:px-6 lg:px-10 lg:py-18">
      <div className="mx-auto max-w-xl rounded-[1.8rem] border border-border bg-white p-6 shadow-[0_20px_44px_rgba(31,26,23,0.1)] sm:p-8">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-500">
            Owner access
          </p>
          <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
            Acceso al panel
          </h1>
          <p className="text-base leading-8 text-charcoal">
            Introduce la contraseña del owner para acceder al panel de conversión.
          </p>
        </div>

        <div className="mt-8">
          <OwnerLoginForm next={next} />
        </div>
      </div>
    </section>
  );
}
