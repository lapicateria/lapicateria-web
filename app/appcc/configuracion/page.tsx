import type { Metadata } from "next";
import Link from "next/link";
import { requireOwnerRole } from "@/lib/appcc/roles";
import { AdminHeader } from "../_components/AdminHeader";

export const metadata: Metadata = {
  title: "Configuración APPCC | Panel interno",
  description: "Parámetros internos del ERP APPCC.",
};

const settings = [
  ["Impresoras", "/appcc/configuracion/impresoras", "Zebra ZD421, ZPL y copias por defecto."],
  ["Usuarios", "/appcc/configuracion/usuarios", "Alta, baja, roles, permisos y restablecimiento de contraseña."],
  ["Equipos", "/appcc/equipos", "Cámaras, arcones, botelleros y mantenimiento."],
  ["Proveedores", "/appcc/proveedores", "Autorizaciones, certificados y datos administrativos."],
  ["Calendario operativo", "/appcc/configuracion/calendario", "Días abiertos, descanso, cierres y eventos especiales."],
  ["Datos establecimiento", "/appcc/configuracion", "La Picatería, responsable y datos fiscales preparados."],
  ["Parámetros APPCC", "/appcc/configuracion", "Vida útil, controles diarios y reglas operativas."],
  ["Permisos", "/appcc/configuracion/usuarios", "Permisos por área preparados para roles owner, empleado e inspector."],
];

export default async function ConfiguracionPage() {
  await requireOwnerRole();

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white">
      <AdminHeader title="Configuración" description="Ajustes internos del ERP APPCC. Acceso reservado a owner." role="owner" />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12">
        <div className="grid gap-4 md:grid-cols-2">
          {settings.map(([title, href, text]) => (
            <Link key={title} href={href} className="rounded-[1.5rem] border border-white/10 bg-[#151515] p-5 transition hover:border-[#d94b2b]">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#f2c6bb]">Configuración</p>
              <h2 className="mt-3 text-2xl font-black uppercase tracking-[-0.03em] text-[#fff8ef]">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-stone-300">{text}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
