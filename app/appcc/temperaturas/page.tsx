import type { Metadata } from "next";
import { adminSupabaseRequest } from "@/lib/appcc/repositories/legacy-core";
import { filterTemperatureHistory, historyStatuses, type TemperatureArchive } from "@/lib/appcc/temperature-history";
import { TemperatureHistory } from "./TemperatureHistory";
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
  const canReview = hasAdminPermission(session, "appcc:manage");
  const [records, alerts, archive] = await Promise.all([
    getRecentTemperatureRecords({ ...filters, limit: hasFilters ? 200 : 10 }),
    getOpenEquipmentAlerts(),
    canReview ? adminSupabaseRequest<TemperatureArchive[]>("appcc_temperature_review_batches", {
      method: "GET",
      query: "?select=id,filename,content,reviewed_at,evidence_reference&order=created_at.desc",
    }) : null,
  ]);
  const data = records.ok && !historyStatuses.includes(filters.status || "") ? records.data : [];
  const history = filterTemperatureHistory(archive?.ok ? archive.data : [], filters);
  const equipmentNames = new Set(temperatureEquipment.filter((equipment) => equipment.active).map((equipment) => equipment.name));
  if (archive?.ok) {
    for (const row of filterTemperatureHistory(archive.data, { preset: "all" })) {
      const parent = row.equipment.split(" · ")[0];
      if (!equipmentNames.has(parent)) equipmentNames.add(row.equipment);
    }
  }

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
      afterRecords={canReview && <TemperatureHistory rows={history} loadFailed={archive?.ok === false} />}
      beforeRecords={(
        <AppccRecordFilters
          filters={filters}
          subjectLabel="Equipo"
          subjectOptions={[...equipmentNames].map((name) => ({ label: name, value: name }))}
          statusOptions={[
            { label: "Correcto", value: "correcto" },
            { label: "Revisar", value: "revisar" },
            { label: "Incidencia", value: "incidencia" },
            ...(canReview ? [
              { label: "Histórico · Pendiente de cotejo", value: "historico_pendiente" },
              { label: "Histórico · Revisión documental registrada", value: "historico_revisado" },
            ] : []),
          ]}
          foundCount={data.length}
        />
      )}
    >
      <TemperatureForm action={saveTemperatureRecordAction} />
      <TemperatureAlerts alerts={alerts.ok ? alerts.data : []} />
    </RecordPageShell>
  );
}
