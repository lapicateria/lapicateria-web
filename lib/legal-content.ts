import type { Locale } from "@/lib/i18n";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalDocument = {
  eyebrow: string;
  title: string;
  description: string;
  sections: LegalSection[];
};

type LegalContent = {
  avisoLegal: Record<Locale, LegalDocument>;
  privacidad: Record<Locale, LegalDocument>;
  cookies: Record<Locale, LegalDocument>;
};

const comingSoonByLocale: Record<Exclude<Locale, "es">, LegalDocument> = {
  en: {
    eyebrow: "Legal information",
    title: "Legal information in progress",
    description:
      "The full legal information for this website is currently available in Spanish. If you need an English version, please contact us and we will help you.",
    sections: [
      {
        title: "Contact",
        paragraphs: [
          "La Picatería S.L.",
          "Mercado de San Agustín, Plaza de San Agustín s/n, 18001 Granada",
          "online@lapicateria.es · +34 628 736 029",
        ],
      },
    ],
  },
  fr: {
    eyebrow: "Informations légales",
    title: "Informations légales en cours de préparation",
    description:
      "Le contenu juridique complet du site est actuellement disponible en espagnol. Si vous avez besoin d'une version française, contactez-nous et nous vous aiderons.",
    sections: [
      {
        title: "Contact",
        paragraphs: [
          "La Picatería S.L.",
          "Mercado de San Agustín, Plaza de San Agustín s/n, 18001 Granada",
          "online@lapicateria.es · +34 628 736 029",
        ],
      },
    ],
  },
};

export const legalContent: LegalContent = {
  avisoLegal: {
    es: {
      eyebrow: "Información legal",
      title: "Aviso legal",
      description:
        "Información general sobre la titularidad del sitio web, sus condiciones de uso y el marco jurídico aplicable.",
      sections: [
        {
          title: "Titularidad del sitio web",
          paragraphs: [
            "En cumplimiento de la normativa vigente, se informa de que este sitio web es titularidad de La Picatería S.L., con CIF B19614072 y domicilio en Mercado de San Agustín, Plaza de San Agustín s/n, 18001 Granada.",
            "Puedes contactar con nosotros en el teléfono +34 628 736 029 o en el correo electrónico online@lapicateria.es.",
          ],
        },
        {
          title: "Objeto del sitio web",
          paragraphs: [
            "Esta web tiene por objeto ofrecer información sobre La Picatería, su carta, su sistema de reservas, su ubicación y sus datos de contacto.",
          ],
        },
        {
          title: "Condiciones de uso",
          paragraphs: [
            "El acceso y uso de esta web atribuye la condición de usuario e implica la aceptación de este aviso legal. El usuario se compromete a utilizar el sitio, sus contenidos y servicios de forma lícita, diligente y conforme a la buena fe, al orden público y a la normativa aplicable.",
          ],
        },
        {
          title: "Propiedad intelectual e industrial",
          paragraphs: [
            "Salvo que se indique lo contrario, los contenidos de esta web, incluyendo textos, imágenes, logotipos, diseño, código y demás elementos, están protegidos por la normativa de propiedad intelectual e industrial.",
            "Queda prohibida su reproducción, distribución, comunicación pública o transformación sin autorización previa y expresa del titular.",
          ],
        },
        {
          title: "Enlaces externos y servicios de terceros",
          paragraphs: [
            "Esta web puede incluir enlaces o integraciones de terceros, como el sistema de reservas, Google Maps o servicios analíticos. La Picatería no se responsabiliza de la disponibilidad, contenidos o políticas de privacidad de dichos servicios externos.",
          ],
        },
        {
          title: "Responsabilidad",
          paragraphs: [
            "La Picatería adopta medidas razonables para que la información del sitio sea correcta y para mantener la web en funcionamiento, pero no garantiza la ausencia de interrupciones puntuales, errores técnicos o incidencias ajenas a su control.",
          ],
        },
        {
          title: "Legislación aplicable y jurisdicción",
          paragraphs: [
            "El presente aviso legal se rige por la legislación española. Salvo que la normativa de consumidores y usuarios establezca otra cosa, cualquier controversia se someterá a los juzgados y tribunales de Granada.",
          ],
        },
      ],
    },
    en: comingSoonByLocale.en,
    fr: comingSoonByLocale.fr,
  },
  privacidad: {
    es: {
      eyebrow: "Protección de datos",
      title: "Política de privacidad",
      description:
        "Cómo tratamos los datos personales que nos facilitas al contactar, reservar o navegar por esta web.",
      sections: [
        {
          title: "Responsable del tratamiento",
          paragraphs: [
            "La Picatería S.L.",
            "CIF: B19614072",
            "Domicilio: Mercado de San Agustín, Plaza de San Agustín s/n, 18001 Granada",
            "Email: online@lapicateria.es",
            "Teléfono: +34 628 736 029",
          ],
        },
        {
          title: "Qué datos tratamos",
          paragraphs: [
            "Podemos tratar los datos que nos facilites al escribirnos, llamarnos, reservar o interactuar con la web, así como determinados datos de navegación cuando hayas aceptado las cookies correspondientes.",
          ],
        },
        {
          title: "Finalidades del tratamiento",
          bullets: [
            "Atender consultas, solicitudes de información y comunicaciones.",
            "Gestionar reservas o solicitudes relacionadas con la visita al restaurante.",
            "Mantener la relación precontractual o contractual derivada de la reserva o el contacto.",
            "Cumplir obligaciones legales, fiscales o administrativas.",
            "Analizar el uso de la web y mejorar su funcionamiento cuando el usuario haya aceptado cookies analíticas.",
          ],
        },
        {
          title: "Legitimación",
          bullets: [
            "El consentimiento del usuario, cuando contacta voluntariamente o acepta cookies analíticas.",
            "La aplicación de medidas precontractuales o contractuales, cuando solicita una reserva o una gestión vinculada al servicio.",
            "El cumplimiento de obligaciones legales.",
            "El interés legítimo en mantener la seguridad y el correcto funcionamiento del sitio web, cuando proceda.",
          ],
        },
        {
          title: "Destinatarios y encargados de tratamiento",
          paragraphs: [
            "Tus datos pueden ser tratados por proveedores que prestan servicios tecnológicos o de gestión para la web y la operativa del restaurante.",
          ],
          bullets: [
            "Proveedor del sistema de reservas.",
            "Proveedor de analítica web, como Google Analytics 4, si se aceptan cookies analíticas.",
            "Servicios de alojamiento, mantenimiento técnico y soporte.",
          ],
        },
        {
          title: "Conservación de los datos",
          paragraphs: [
            "Conservaremos los datos durante el tiempo necesario para atender tu consulta, gestionar la reserva o mantener la relación derivada del servicio, y durante los plazos exigidos por la normativa aplicable. Después, se bloquearán o eliminarán conforme a la ley.",
          ],
        },
        {
          title: "Derechos de las personas usuarias",
          paragraphs: [
            "Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, así como retirar tu consentimiento cuando el tratamiento se base en él.",
            "Para ello, puedes escribir a online@lapicateria.es indicando el derecho que deseas ejercer. Si fuera necesario, podremos solicitar un documento acreditativo de identidad.",
            "También puedes presentar una reclamación ante la Agencia Española de Protección de Datos si consideras que el tratamiento no se ajusta a la normativa vigente.",
          ],
        },
        {
          title: "Seguridad",
          paragraphs: [
            "Aplicamos medidas técnicas y organizativas razonables para proteger los datos personales frente a accesos no autorizados, alteraciones, pérdidas o divulgaciones indebidas.",
          ],
        },
      ],
    },
    en: comingSoonByLocale.en,
    fr: comingSoonByLocale.fr,
  },
  cookies: {
    es: {
      eyebrow: "Uso de cookies",
      title: "Política de cookies",
      description:
        "Información sobre las cookies y tecnologías similares utilizadas en esta web.",
      sections: [
        {
          title: "Qué son las cookies",
          paragraphs: [
            "Las cookies son pequeños archivos que se almacenan en tu dispositivo cuando navegas por una web. Sirven para que la página funcione correctamente, recordar ciertas preferencias o medir el uso del sitio.",
          ],
        },
        {
          title: "Qué cookies puede utilizar esta web",
          bullets: [
            "Cookies técnicas o necesarias: permiten el funcionamiento básico del sitio web.",
            "Cookies analíticas: permiten medir el uso de la web y mejorar su rendimiento.",
            "Cookies de terceros: pueden instalarse a través de servicios externos como el sistema de reservas, Google Maps o integraciones similares.",
          ],
        },
        {
          title: "Google Analytics 4",
          paragraphs: [
            "Esta web utiliza Google Analytics 4 para analizar el uso del sitio y mejorar contenidos y conversión. Su funcionamiento puede implicar el uso de cookies analíticas y el tratamiento de datos de navegación.",
          ],
        },
        {
          title: "Servicios externos",
          paragraphs: [
            "El sistema de reservas, los mapas embebidos u otros servicios de terceros pueden utilizar sus propias cookies o tecnologías equivalentes cuando interactúas con ellos desde esta web.",
          ],
        },
        {
          title: "Cómo desactivar o eliminar cookies",
          paragraphs: [
            "Puedes configurar tu navegador para bloquear o eliminar cookies ya instaladas. Ten en cuenta que al desactivarlas algunas funciones del sitio o de servicios externos podrían dejar de funcionar correctamente.",
          ],
          bullets: [
            "Google Chrome",
            "Safari",
            "Mozilla Firefox",
            "Microsoft Edge",
          ],
        },
        {
          title: "Actualización de la política de cookies",
          paragraphs: [
            "Podemos actualizar esta política para adaptarla a cambios normativos, técnicos o a nuevos servicios utilizados en la web.",
          ],
        },
      ],
    },
    en: comingSoonByLocale.en,
    fr: comingSoonByLocale.fr,
  },
};

export function getLegalDocument(locale: Locale, slug: keyof LegalContent) {
  return legalContent[slug][locale];
}
