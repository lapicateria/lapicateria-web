import { markPrintJobError } from "@/lib/appcc/database";
import { requirePrintApiToken } from "@/lib/appcc/printing/print-api-auth";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = requirePrintApiToken(request);
  if (!auth.ok) return auth.response;

  const { id } = await params;
  const body = await request.json().catch(() => ({})) as { error_message?: string; error?: string };
  const result = await markPrintJobError(id, body.error_message || body.error || "Error de impresión no especificado.");

  if (!result.ok) {
    return Response.json({ error: result.error }, { status: 400 });
  }

  console.error("[PRINT JOB ERROR]", {
    id,
    printer_key: result.data.printer_key,
    attempts: result.data.attempts,
    statusPrevious: "claimed",
    statusNew: result.data.status,
    error: result.data.error_message,
  });
  return Response.json({ job: result.data });
}
