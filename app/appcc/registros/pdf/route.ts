import { NextRequest, NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/appcc/auth/permissions";

export async function GET(request: NextRequest) {
  await requireAdminPermission("appcc:manage");

  const target = new URL("/appcc/registros/informe", request.url);
  request.nextUrl.searchParams.forEach((value, key) => {
    target.searchParams.set(key, value);
  });

  return NextResponse.redirect(target);
}
