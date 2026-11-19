import Link from "next/link";
import { requireAdminPermission } from "@/lib/appcc/auth/permissions";
import { adminSupabaseRequest } from "@/lib/appcc/repositories/legacy-core";
import { AdminHeader } from "../../_components/AdminHeader";
import { archiveTemperatureBatch, validateTemperatureReview } from "./actions";

type Batch = {
  id: string;
  filename: string;
  content: string;
  created_at: string;
  uploaded_by: string;
  evidence_reference: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
};

const dateTime = new Intl.DateTimeFormat("es-ES", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/Madrid" });
const button = "rounded-full bg-[#d94b2b] px-5 py-2 font-bold text-white";
const panel = "space-y-4 rounded-2xl border border-white/15 bg-white/5 p-5";

export default async function TemperatureReviewPage({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string }> }) {
  await requireAdminPermission("appcc:manage");
  const params = await searchParams;
  const batches = await adminSupabaseRequest<Batch[]>("appcc_temperature_review_batches", {
    method: "GET",
    query: "?select=id,filename,content,created_at,uploaded_by,evidence_reference,reviewed_at,reviewed_by&order=created_at.desc&limit=20",
  });

  return (
    <main className="min-h-screen bg-[#151515] text-white">
      <AdminHeader title="Cotejo de temperaturas" description="Archivo de listados históricos y constancia de su revisión." />
      <section className="mx-auto max-w-6xl space-y-5 px-4 py-8">
        <Link className="underline" href="/appcc/temperaturas">Volver a Temperaturas</Link>
        <p className="text-stone-300">Los listados archivados se consultan aquí. El cotejo registra quién los revisó, cuándo y con qué documento original.</p>
        {params.saved && <p role="status">{params.saved === "cotejo" ? "Cotejo guardado." : "Archivo disponible para cotejo."}</p>}
        {params.error && <p role="alert">{params.error === "archivo" ? "Selecciona un TXT, CSV o Markdown de hasta 250 KB." : params.error === "cotejo" ? "Indica la referencia del original y confirma el cotejo." : "No se pudo guardar el cambio."}</p>}
        <form action={archiveTemperatureBatch} className={panel}>
          <label className="block">Listado para cotejar
            <input type="file" name="document" accept=".txt,.csv,.md" required className="mt-2 block" />
          </label>
          <button className={button}>Archivar pendiente de cotejo</button>
        </form>
        {!batches.ok && <p role="alert">No se pudo consultar el archivo de cotejo.</p>}
        {batches.ok && batches.data.map((batch) => (
          <article key={batch.id} className={panel}>
            <h2 className="text-xl font-bold">{batch.filename}</h2>
            <p className="text-stone-300">Archivado por {batch.uploaded_by} el {dateTime.format(new Date(batch.created_at))}</p>
            <details>
              <summary className="cursor-pointer underline">Ver listado aportado</summary>
              <pre className="mt-3 max-h-96 overflow-auto rounded-lg bg-black/30 p-3 text-sm">{batch.content}</pre>
            </details>
            {batch.reviewed_at ? (
              <p>Revisión registrada por {batch.reviewed_by} el {dateTime.format(new Date(batch.reviewed_at))}. Original cotejado: {batch.evidence_reference}</p>
            ) : (
              <form action={validateTemperatureReview} className="space-y-3">
                <p className="font-semibold text-amber-300">Pendiente de cotejo</p>
                <input type="hidden" name="id" value={batch.id} />
                <label className="block">Referencia de la hoja original o exportación del termómetro
                  <input name="reference" required minLength={8} maxLength={500} className="mt-1 block w-full rounded-lg bg-white p-2 text-stone-950" />
                </label>
                <label className="block"><input type="checkbox" name="confirmed" required /> He cotejado este listado con el original indicado.</label>
                <button className={button}>Validar cotejo</button>
              </form>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
