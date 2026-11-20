import Link from "next/link";
import { filterTemperatureHistory } from "@/lib/appcc/temperature-history";

export function TemperatureHistory({ rows, loadFailed }: {
  rows: ReturnType<typeof filterTemperatureHistory>;
  loadFailed: boolean;
}) {
  const days = new Map<string, typeof rows>();
  for (const row of rows) {
    const day = days.get(row.rawDate);
    if (day) day.push(row);
    else days.set(row.rawDate, [row]);
  }

  return (
    <section aria-label="Histórico de temperaturas" className="mt-5 space-y-3 rounded-2xl border border-white/15 bg-white/5 p-4">
      <h2 className="font-bold">Histórico de temperaturas</h2>
      <p className="text-sm text-stone-300">Lecturas de los listados aportados. El estado indica la revisión documental de cada lote.</p>
      <Link className="inline-block font-semibold underline" href="/appcc/temperaturas/cotejo">
        Gestionar cotejo de listados
      </Link>
      {loadFailed ? <p role="alert">No se pudo cargar el histórico.</p> : (
        <p className="text-sm text-stone-300">
          {rows.length ? `${rows.length} lecturas archivadas en ${days.size} días` : "Ninguna lectura archivada coincide con los filtros."}
        </p>
      )}
      {[...days].map(([date, day], index) => (
        <details key={date} open={index === 0} className="rounded-xl border border-white/10 p-3">
          <summary className="cursor-pointer font-semibold">{date} · {day.length} lecturas</summary>
          <ul className="mt-2 divide-y divide-white/10">
            {day.map((row) => (
              <li key={row.id} className="py-2 text-sm">
                <p>{row.time} · {row.equipment} · <strong>{row.temperature} °C</strong></p>
                <p className="text-stone-300">
                  {row.zone} · {row.batch.reviewed_at ? "Revisión documental registrada" : "Pendiente de cotejo"}
                  {row.batch.evidence_reference ? ` · ${row.batch.evidence_reference}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </section>
  );
}
