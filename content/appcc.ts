export type InternalAdminLink = {
  title: string;
  description: string;
  href: string;
  category: "sanitario" | "operativo" | "documentacion";
};

export const internalAdminSections: Array<{ title: string; description: string; items: InternalAdminLink[] }> = [
  {
    title: "Consulta APPCC",
    description: "Búsqueda, filtros y exportación de registros sanitarios.",
    items: [
      {
        title: "Centro documental APPCC",
        description: "Documentación oficial, registros, planes y protocolos.",
        href: "/appcc/documentacion",
        category: "documentacion",
      },
      {
        title: "Calendario APPCC",
        description: "Vista mensual de registros, pendientes e incidencias.",
        href: "/appcc/calendario",
        category: "documentacion",
      },
      {
        title: "Consultar y descargar registros",
        description: "Filtra registros APPCC y descarga CSV para revisión interna.",
        href: "/appcc/registros",
        category: "documentacion",
      },
    ],
  },
  {
    title: "Registros sanitarios diarios",
    description: "Controles recurrentes para dejar constancia diaria de seguridad alimentaria.",
    items: [
      {
        title: "Registro de temperaturas",
        description: "Equipos APPCC de frío, congelación e hielo.",
        href: "/appcc/temperaturas",
        category: "sanitario",
      },
      {
        title: "Control de aceite de freidora",
        description: "Revisión de estado, cambios y observaciones.",
        href: "/appcc/aceite-freidora",
        category: "sanitario",
      },
      {
        title: "Registro de limpieza diaria",
        description: "Zonas, turnos y tareas completadas.",
        href: "/appcc/limpieza",
        category: "sanitario",
      },
      {
        title: "Control de recepción de mercancía",
        description: "Entrada de productos, temperatura y conformidad.",
        href: "/appcc/recepcion-mercancia",
        category: "sanitario",
      },
      {
        title: "Control de trazabilidad",
        description: "Lotes, fechas y seguimiento de producto.",
        href: "/appcc/recepcion-mercancia",
        category: "sanitario",
      },
      {
        title: "Registro de incidencias sanitarias",
        description: "Anotación y seguimiento de incidencias.",
        href: "/appcc/incidencias",
        category: "sanitario",
      },
    ],
  },
  {
    title: "Checklists operativos",
    description: "Apertura, cierre y revisión rápida por zonas de trabajo.",
    items: [
      {
        title: "Apertura de cocina",
        description: "Preparación inicial, equipos y mise en place.",
        href: "/appcc/checklists/apertura",
        category: "operativo",
      },
      {
        title: "Cierre de cocina",
        description: "Limpieza, apagado y control final de equipos.",
        href: "/appcc/checklists/cierre",
        category: "operativo",
      },
      {
        title: "Apertura de barra",
        description: "Caja, bebidas, hielo, TPV y zona de servicio.",
        href: "/appcc/checklists?tipo=apertura-barra",
        category: "operativo",
      },
      {
        title: "Cierre de barra",
        description: "Reposición, limpieza, caja y cierre de servicio.",
        href: "/appcc/checklists?tipo=cierre-barra",
        category: "operativo",
      },
      {
        title: "Revisión de terraza",
        description: "Mesas, sillas, orden, seguridad y limpieza.",
        href: "/appcc/checklists?tipo=terraza",
        category: "operativo",
      },
      {
        title: "Revisión de baños",
        description: "Limpieza, consumibles y estado general.",
        href: "/appcc/checklists?tipo=banos",
        category: "operativo",
      },
    ],
  },
  {
    title: "Documentación importante",
    description: "Accesos preparados para documentación de consulta interna.",
    items: [
      {
        title: "APPCC / Plan sanitario",
        description: "Plan de autocontrol y documentación sanitaria.",
        href: "/appcc/checklists?documento=appcc",
        category: "documentacion",
      },
      {
        title: "Fichas técnicas de producto",
        description: "Información técnica de ingredientes y elaboraciones.",
        href: "/appcc/checklists?documento=fichas-tecnicas",
        category: "documentacion",
      },
      {
        title: "Alérgenos",
        description: "Consulta interna de alérgenos por producto.",
        href: "/appcc/checklists?documento=alergenos",
        category: "documentacion",
      },
      {
        title: "Proveedores",
        description: "Contactos, datos y documentación de proveedores.",
        href: "/appcc/proveedores",
        category: "documentacion",
      },
      {
        title: "Mantenimiento de maquinaria",
        description: "Revisiones, incidencias y mantenimiento preventivo.",
        href: "/appcc/mantenimiento",
        category: "documentacion",
      },
      {
        title: "Contratos y revisiones",
        description: "Documentación administrativa y revisiones periódicas.",
        href: "/appcc/checklists?documento=contratos",
        category: "documentacion",
      },
    ],
  },
  {
    title: "Gestión sanitaria avanzada",
    description: "Secciones preparadas para inspecciones y verificación documental.",
    items: [
      { title: "Inspecciones", description: "Histórico, requerimientos y acciones realizadas.", href: "/appcc/inspecciones", category: "sanitario" },
      { title: "Equipos", description: "Fichas de maquinaria y estado de mantenimiento.", href: "/appcc/equipos", category: "operativo" },
      { title: "Agua", description: "Control de color, olor, sabor y cloro si aplica.", href: "/appcc/agua", category: "sanitario" },
      { title: "Verificación anual", description: "Checklist anual de documentación y APPCC.", href: "/appcc/verificacion-anual", category: "documentacion" },
    ],
  },
];
