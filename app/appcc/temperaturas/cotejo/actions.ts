"use server";

import { createHash } from "node:crypto";
import { redirect } from "next/navigation";
import { requireAdminPermission } from "@/lib/appcc/auth/permissions";
import { adminSupabaseRequest } from "@/lib/appcc/repositories/legacy-core";

const route = "/appcc/temperaturas/cotejo";
const table = "appcc_temperature_review_batches";

export async function archiveTemperatureBatch(formData: FormData) {
  const session = await requireAdminPermission("appcc:manage");
  const file = formData.get("document");
  if (!(file instanceof File) || !/\.(md|txt|csv)$/i.test(file.name) || !file.size || file.size > 250000) {
    redirect(route + "?error=archivo");
  }

  const content = (await file.text()).replace(/\r\n?/g, "\n").trim();
  if (!content || content.includes("\0")) redirect(route + "?error=archivo");

  const result = await adminSupabaseRequest(table, {
    method: "POST",
    query: "?on_conflict=content_sha256",
    headers: { Prefer: "resolution=ignore-duplicates,return=minimal" },
    body: JSON.stringify({
      filename: file.name,
      content,
      content_sha256: createHash("sha256").update(content).digest("hex"),
      uploaded_by: session.username,
    }),
  });
  redirect(route + (result.ok ? "?saved=archivo" : "?error=guardar"));
}

export async function validateTemperatureReview(formData: FormData) {
  const session = await requireAdminPermission("appcc:manage");
  const id = formData.get("id");
  const reference = formData.get("reference");
  if (typeof id !== "string" || !/^[a-f0-9-]{36}$/i.test(id)
    || typeof reference !== "string" || reference.trim().length < 8 || reference.trim().length > 500
    || formData.get("confirmed") !== "on") {
    redirect(route + "?error=cotejo");
  }
  const result = await adminSupabaseRequest<{ id: string }[]>(table, {
    method: "PATCH",
    query: `?id=eq.${encodeURIComponent(id)}&reviewed_at=is.null&select=id`,
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({
      evidence_reference: reference.trim(),
      reviewed_at: new Date().toISOString(),
      reviewed_by: session.username,
    }),
  });
  redirect(route + (result.ok && result.data.length ? "?saved=cotejo" : "?error=guardar"));
}
