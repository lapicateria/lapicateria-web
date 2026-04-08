import { NextResponse } from "next/server";
import {
  createOwnerSessionValue,
  getOwnerPassword,
  OWNER_SESSION_COOKIE,
} from "@/lib/owner-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { password } = (await request.json()) as { password?: string };
  const ownerPassword = getOwnerPassword();

  if (!ownerPassword || !password || password !== ownerPassword) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: OWNER_SESSION_COOKIE,
    value: await createOwnerSessionValue(ownerPassword),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}
