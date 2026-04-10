import { NextResponse } from "next/server";
import { getBusinessHoursSnapshot } from "@/lib/business-hours";
import { getResolvedConversionState } from "@/lib/conversion";

export const dynamic = "force-dynamic";

export async function GET() {
  const { config, resolved } = await getResolvedConversionState();
  const businessStatus = await getBusinessHoursSnapshot();
  return NextResponse.json({
    planOptions: config.planOptions,
    resolved,
    businessStatus,
  });
}
