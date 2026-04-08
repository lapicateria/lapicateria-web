import { cookies } from "next/headers";

export const OWNER_SESSION_COOKIE = "lp_owner_session";

export function getOwnerPassword() {
  return process.env.OWNER_DASHBOARD_PASSWORD ?? "";
}

export async function createOwnerSessionValue(secret: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(secret);
  const digest = await globalThis.crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function isOwnerAuthenticated() {
  const password = getOwnerPassword();
  if (!password) {
    return false;
  }

  const cookieStore = await cookies();
  const session = cookieStore.get(OWNER_SESSION_COOKIE)?.value;
  if (!session) {
    return false;
  }

  const expected = await createOwnerSessionValue(password);
  return session === expected;
}
