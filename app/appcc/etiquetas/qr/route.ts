import { NextRequest } from "next/server";
import QRCode from "qrcode";
import { requireAdminPermission } from "@/lib/appcc/auth/permissions";

export async function GET(request: NextRequest) {
  await requireAdminPermission("labels:basic_print");
  const payload = request.nextUrl.searchParams.get("p")?.trim();
  if (!payload || new TextEncoder().encode(payload).length > 1024) {
    return new Response("El contenido del código QR es obligatorio y debe tener hasta 1024 bytes.", { status: 400 });
  }

  const svg = await QRCode.toString(payload, { type: "svg", errorCorrectionLevel: "M" });
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
