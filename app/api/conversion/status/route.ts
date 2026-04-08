import { NextResponse } from "next/server";
import { getResolvedConversionState } from "@/lib/conversion";

export const dynamic = "force-dynamic";

export async function GET() {
  const { config, resolved } = await getResolvedConversionState();
  return NextResponse.json({
    planOptions: config.planOptions,
    resolved,
  });
}
