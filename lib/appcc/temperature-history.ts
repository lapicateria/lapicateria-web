import type { AppccRecordListFilters } from "./appcc-record-filters";

export type TemperatureArchive = {
  id: string;
  filename: string;
  content: string;
  reviewed_at: string | null;
  evidence_reference: string | null;
};

export const historyStatuses = ["historico_pendiente", "historico_revisado"];

export function matchesTemperatureArchiveStatus(status?: string) {
  return !status || historyStatuses.includes(status);
}

function splitCsv(line: string) {
  return Array.from(line.matchAll(/(?:^|;)(?:"((?:[^"]|"")*)"|([^;]*))/g), (match) =>
    (match[1]?.replaceAll('""', '"') ?? match[2]).trim(),
  );
}

export function filterTemperatureHistory(batches: TemperatureArchive[], filters: AppccRecordListFilters) {
  if (!matchesTemperatureArchiveStatus(filters.status) || filters.source === "manual") return [];

  return batches.flatMap((batch) => {
    const status = batch.reviewed_at ? "historico_revisado" : "historico_pendiente";
    if (filters.status && filters.status !== status) return [];

    return batch.content.split(/\r?\n/).flatMap((line, index) => {
      const cells = line.startsWith("|") ? line.trim().slice(1, -1).split("|").map((cell) => cell.trim())
        : line.includes("\t") ? line.split("\t").map((cell) => cell.trim())
          : splitCsv(line);
      const [rawDate, , time, zone, equipment, temperature] = cells;
      const dateParts = rawDate?.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (!dateParts || !/^\d{2}:\d{2}$/.test(time) || !equipment || !/^[+-]?\d+(?:[.,]\d+)?$/.test(temperature)) return [];
      const [, day, month, year] = dateParts;
      const date = `${year}-${month}-${day}`;
      if ((filters.dateFrom && date < filters.dateFrom) || (filters.dateTo && date > filters.dateTo)) return [];
      if (filters.subject && equipment !== filters.subject && !equipment.startsWith(filters.subject + " · ")) return [];
      return [{ id: `${batch.id}-${index}`, date, rawDate, time, zone, equipment, temperature, batch }];
    });
  }).sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time));
}
