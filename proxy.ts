import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  createOwnerSessionValue,
  getOwnerPassword,
  OWNER_SESSION_COOKIE,
} from "@/lib/owner-auth";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname.startsWith("/owner/login") || pathname.startsWith("/api/owner/login")) {
    return NextResponse.next();
  }

  const protectedOwnerPath =
    pathname.startsWith("/owner/") || pathname.startsWith("/api/owner/");

  if (!protectedOwnerPath) {
    return NextResponse.next();
  }

  const ownerPassword = getOwnerPassword();
  const session = request.cookies.get(OWNER_SESSION_COOKIE)?.value;

  if (!ownerPassword) {
    if (pathname.startsWith("/api/owner/")) {
      return NextResponse.json({ error: "Owner access is not configured." }, { status: 503 });
    }

    const loginUrl = new URL("/owner/login", request.url);
    loginUrl.searchParams.set("next", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  const expected = await createOwnerSessionValue(ownerPassword);

  if (session === expected) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/owner/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/owner/login", request.url);
  loginUrl.searchParams.set("next", pathname + search);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/owner/:path*", "/api/owner/:path*"],
};
