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
  const payload = (await request.json()) as ConversionConfig;
  await writeConversionConfig(payload);
  const { config, resolved } = await getResolvedConversionState();
  return NextResponse.json({ config, resolved });
}
