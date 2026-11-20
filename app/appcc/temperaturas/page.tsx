import type { Metadata } from "next";
import Link from "next/link";
import { hasAdminPermission } from "@/lib/appcc/auth/permissions";
import { requireAdminSession } from "@/lib/appcc/auth";
import { getOpenEquipmentAlerts, getRecentTemperatureRecords } from "@/lib/appcc/database";
import { resolveAppccRecordFilters } from "@/lib/appcc/appcc-record-filters";
import { temperatureEquipment } from "@/lib/appcc/temperature-rules";
import { saveTemperatureRecordAction } from "../actions";
import { AppccRecordFilters } from "../_components/AppccRecordFilters";
import { TemperatureAlerts } from "../_components/TemperatureAlerts";
import { RecordPageShell } from "../_components/RecordPageShell";
import { TemperatureForm } from "../_components/TemperatureForm";

export const metadata: Metadata = {
  title: "Registro de temperaturas | Panel interno",
  description: "Registro interno de temperaturas de equipos APPCC.",
};

export default async function TemperaturasPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | undefined>>;
}) {
  const session = await requireAdminSession();
  const params = await searchParams;
  const filters = resolveAppccRecordFilters(params);
  const hasFilters = filters.preset !== "all" || Boolean(filters.subject || filters.status || filters.source || filters.dateFrom || filters.dateTo);
  const [records, alerts] = await Promise.all([
    getRecentTemperatureRecords({ ...filters, limit: hasFilters ? 200 : 10 }),
    getOpenEquipmentAlerts(),
  ]);
  const data = records.ok ? records.data : [];

  return (
    <RecordPageShell
      title="Registro de temperaturas"
      description="Equipos APPCC de frío, congelación e hielo."
      saved={params?.saved === "1"}
      error={params?.error}
      records={data}
      recordsTitle={hasFilters ? "Registros encontrados" : "Últimos 10 registros"}
      recordsIntro="Ordenados siempre de más reciente a más antiguo."
      showRecordResponsible={false}
      beforeRecords={(
        <>
          <AppccRecordFilters
            filters={filters}
            subjectLabel="Equipo"
            subjectOptions={temperatureEquipment.filter((equipment) => equipment.active).map((equipment) => ({ label: equipment.name, value: equipment.name }))}
            statusOptions={[
              { label: "Correcto", value: "correcto" },
              { label: "Revisar", value: "revisar" },
              { label: "Incidencia", value: "incidencia" },
            ]}
            foundCount={data.length}
          />
          {hasAdminPermission(session, "appcc:manage") && (
            <aside className="mt-5 rounded-2xl border border-white/15 bg-white/5 p-4">
              <h2 className="font-bold">Histórico de temperaturas</h2>
              <p className="mt-1 text-sm text-stone-300">Consulta los listados archivados y el estado de su cotejo.</p>
              <Link className="mt-3 inline-flex rounded-full bg-[#d94b2b] px-4 py-2 text-sm font-bold text-white" href="/appcc/temperaturas/cotejo">
                Ver listados históricos
              </Link>
            </aside>
          )}
        </>
      )}
    >
      <TemperatureForm action={saveTemperatureRecordAction} />
      <TemperatureAlerts alerts={alerts.ok ? alerts.data : []} />
    </RecordPageShell>
  );
}
