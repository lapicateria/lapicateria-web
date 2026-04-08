"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function OwnerLoginForm({ next = "/owner/conversion" }: { next?: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/owner/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    setIsLoading(false);

    if (!response.ok) {
      setError("Contraseña incorrecta.");
      return;
    }

    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block space-y-2 text-sm text-charcoal">
        <span>Contraseña</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-2xl border border-border bg-bone px-4 py-3 text-ink"
          autoComplete="current-password"
          required
        />
      </label>
      {error ? <p className="text-sm text-[rgb(120,45,35)]">{error}</p> : null}
      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center justify-center rounded-full bg-sand-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-bone shadow-[0_18px_32px_rgba(132,81,28,0.26)] transition hover:bg-sand-500 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
