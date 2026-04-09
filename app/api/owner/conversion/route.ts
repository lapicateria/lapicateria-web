import { NextResponse } from "next/server";
import {
  getResolvedConversionState,
  type ConversionConfig,
  writeConversionConfig,
} from "@/lib/conversion";

export const dynamic = "force-dynamic";

export async function GET() {
  const { config, resolved } = await getResolvedConversionState();
  return NextResponse.json({ config, resolved });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ConversionConfig;
    await writeConversionConfig(payload);
    const { config, resolved } = await getResolvedConversionState();
    return NextResponse.json({ config, resolved });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "No se ha podido guardar la configuración de conversión.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
