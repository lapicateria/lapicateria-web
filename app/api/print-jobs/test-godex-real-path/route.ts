import { enqueuePrintJob } from "@/lib/appcc/database";
import { buildGodex80x50TestEzpl, isValidGodex80x50Ezpl, summarizeGodexEzpl } from "@/lib/appcc/printing/godex-80x50-ezpl.mjs";
import { DEFAULT_GODEX_G500_PRINTER_KEY } from "@/lib/appcc/printing/print-service";
import { printJobCreatedResponse } from "@/lib/appcc/printing/print-job-response";
import { requirePrintApiToken } from "@/lib/appcc/printing/print-api-auth";

export async function POST(request: Request) {
  const auth = requirePrintApiToken(request);
  if (!auth.ok) return auth.response;

  const rawCommand = buildGodex80x50TestEzpl();
  if (!isValidGodex80x50Ezpl(rawCommand)) {
    return Response.json({ error: "Generated diagnostic EZPL is invalid." }, { status: 500 });
  }

  const summary = summarizeGodexEzpl(rawCommand);
  console.info("[PRINT JOB TEST REAL PATH] Generated EZPL", {
    template: "test_godex_real_path",
    printerKey: DEFAULT_GODEX_G500_PRINTER_KEY,
    rawCommandLength: summary.rawCommandLength,
    firstLines: summary.firstLines,
    lastLines: summary.lastLines,
  });

  const result = await enqueuePrintJob({
    printerKey: DEFAULT_GODEX_G500_PRINTER_KEY,
    payload: {
      title: "TEST GODEX REAL PATH",
      line1: "TCP DIRECT EZPL",
      line2: "QUEUE PATH",
      template: "test_godex_real_path",
      raw_command: rawCommand,
      metadata: {
        reason: "test_real_path_same_ezpl_as_tcp",
      },
    },
  });

  if (!result.ok) {
    return Response.json({ error: result.error }, { status: 500 });
  }

  return Response.json({
    ...printJobCreatedResponse(result.data),
    ezpl: {
      rawCommandLength: summary.rawCommandLength,
      firstLines: summary.firstLines,
      lastLines: summary.lastLines,
    },
  }, { status: 201 });
}
