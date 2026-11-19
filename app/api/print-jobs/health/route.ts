import { DEFAULT_GODEX_G500_PRINTER_KEY } from "@/lib/appcc/printing/print-service";
import { requirePrintApiToken } from "@/lib/appcc/printing/print-api-auth";

export async function GET(request: Request) {
  const auth = requirePrintApiToken(request);
  if (!auth.ok) return auth.response;

  return Response.json({
    ok: true,
    service: "print-jobs",
    printerKey: process.env.PRINTER_KEY || DEFAULT_GODEX_G500_PRINTER_KEY,
    statuses: ["queued", "claimed", "sending", "sent_unconfirmed", "printed", "error", "cancelled"],
  });
}
