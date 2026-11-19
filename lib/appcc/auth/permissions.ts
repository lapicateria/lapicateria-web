import { redirect } from "next/navigation";
import { getCurrentAdminSession, requireAdminSession, type AdminSession } from "../auth";

export type AdminRole = "owner" | "employee";

export type AdminPermission =
  | "admin:all"
  | "users:manage"
  | "audit:view"
  | "appcc:manage"
  | "appcc:basic_view"
  | "temperatures:create"
  | "goods_reception:basic_create"
  | "goods_reception:advanced_create"
  | "cleaning:create"
  | "incidents:create"
  | "inventory:manage"
  | "inventory:basic_view"
  | "inventory_opening:count"
  | "inventory_opening:manage"
  | "inventory_opening:approve"
  | "inventory_opening:apply"
  | "traceability:manage"
  | "print:manage"
  | "labels:basic_print"
  | "reports:view"
  | "settings:manage";

export const ownerPermissions: AdminPermission[] = [
  "admin:all",
  "users:manage",
  "audit:view",
  "appcc:manage",
  "inventory:manage",
  "inventory_opening:count",
  "inventory_opening:manage",
  "inventory_opening:approve",
  "inventory_opening:apply",
  "traceability:manage",
  "print:manage",
  "reports:view",
  "settings:manage",
];

export const employeePermissions: AdminPermission[] = [
  "temperatures:create",
  "goods_reception:basic_create",
  "cleaning:create",
  "incidents:create",
  "appcc:basic_view",
  "labels:basic_print",
  "inventory:basic_view",
  "inventory_opening:count",
];

export function getPermissionsForRole(role: AdminRole) {
  return role === "owner" ? ownerPermissions : employeePermissions;
}

export function hasAdminPermission(session: Pick<AdminSession, "role">, permission: AdminPermission) {
  if (session.role === "owner") return true;
  return getPermissionsForRole(session.role).includes(permission);
}

export async function requireAdminRole(role: AdminRole) {
  const session = await requireAdminSession();
  if (session.role !== role) redirect("/appcc/403");
  return session;
}

export async function requireAdminPermission(permission: AdminPermission) {
  const session = await requireAdminSession();
  if (!hasAdminPermission(session, permission)) redirect("/appcc/403");
  return session;
}

export async function getOptionalAdminSession() {
  return getCurrentAdminSession();
}
