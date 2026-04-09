import menuData from "@/content/menu.json";

export const locales = ["es", "en", "fr"] as const;

export type Locale = (typeof locales)[number];
export type Dictionary = (typeof dictionaries)["es"];

export const business = {
  name: "La Picatería",
  legalName: "La Picatería S.L.",
  taxId: "B19614072",
  phone: "+34 628 736 029",
  phoneHref: "+34628736029",
  phoneLabel: "Teléfono",
  email: "online@lapicateria.es",
  emailLabel: "Email",
  address: "Mercado de San Agustín, Plaza de San Agustín s/n, 18001 Granada",
  addressLabel: "Dirección",
  bookingUrl: "https://booking.qamarero.com/new-reservation/la-picateria",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Mercado+de+San+Agustin+Granada",
  instagramUrl: "https://www.instagram.com/lapicateria.granada/",
  facebookUrl: "https://www.facebook.com/lapicateria.granada",
  tiktokUrl: "https://www.tiktok.com/@lapicateriadegranada",
  neighborhood: "Mercado de San Agustín",
  city: "Granada",
  postalCode: "18001",
  country: "ES",
  bookingProvider: "Qamarero",
  bookingProviderLabel: "Reserva oficial en Qamarero",
} as const;

const dictionaries = {
  es: {
    business,
    navigation: {
      menu: "Carta",
      booking: "Reservas",
      contact: "Contacto",
    },
    header: {
      tagline: "Mercado de San Agustín · junto a la Catedral",
    },
    cta: {
      reserve: "Reservar mesa",
      menu: "Ver carta",
      contact: "Contacto",
      maps: "Abrir mapa",
      qamarero: "Reservar en Qamarero",
    },
    hero: {
      kicker: "Mercado · brasa de carbón · Granada",
      title: "Brasa de carbón y cocina de mercado en La Picatería",
      subtitle:
        "Tapas, paellas, brasa y producto de mercado en el Mercado de San Agustín, junto a la Catedral de Granada.",
      card: {
        eyebrow: "Cocina real",
        title: "Carta honesta, brasa de carbón y mesa para compartir",
        badge: "Mercado",
      },
      facts: {
        ticketTitle: "Precio orientativo",
        ticketValue: "Tapas con bebida · Comida 20 €",
        locationTitle: "Dónde estamos",
        locationValue: "Mercado de San Agustín, junto a la Catedral",
      },
    },
    highlights: [
      {
        eyebrow: "Brasa",
        title: "Carbón de verdad",
        description:
          "Secreto, pluma, vaca, verduras y cocina hecha a la brasa de carbón."
      },
      {
        eyebrow: "Mercado",
        title: "Ubicación con identidad",
        description:
          "Dentro del Mercado de San Agustín, con la Catedral a pocos pasos y ambiente real de Granada."
      },
      {
        eyebrow: "Carta",
        title: "Paellas, tapas y mesa larga",
        description:
          "Una carta clara, pensada para compartir, pedir con calma y volver."
      }
    ],
    differentials: [
      {
        title: "Más luz, más apetito",
        description:
          "La experiencia digital acompaña la identidad de La Picatería: clara, cercana y con aire de mercado."
      },
      {
        title: "Producto reconocible",
        description:
          "Tomate rosa, boquerón en vinagre, pulpo, brasas y paellas: la web habla el mismo idioma que la mesa."
      },
      {
        title: "Reserva sin fricción",
        description:
          "CTA visibles, carta real y reserva directa para decidir rápido antes de venir."
      }
    ],
    sections: {
      differentials: {
        eyebrow: "La casa",
        title: "Barra, mercado, vermut y brasa en una misma mesa",
        description:
          "La Picatería mezcla barra, cocina directa, producto reconocible y una manera muy natural de comer en el centro."
      },
      menu: {
        eyebrow: "Carta",
        title: "Tapas, paellas, brasas y bebidas con precios claros",
        description:
          "Consulta la carta real de La Picatería con precios visibles y una lectura cómoda desde el móvil."
      },
      location: {
        eyebrow: "Ubicación",
        title: "Mercado de San Agustín, en pleno centro de Granada",
        description:
          "Una parada fácil para comer en el centro, sentarse en terraza y seguir Granada a pie."
      },
      booking: {
        eyebrow: "Reservas",
        title: "Reserva oficial y directa",
        description:
          "Reserva desde la web con el canal oficial y, si el formulario falla o tarda en cargar, usa el botón principal o llámanos."
      }
    },
    location: {
      copy:
        "La Picatería respira mercado: producto fresco, terraza, brasa y una ubicación muy fácil de entender para locales y visitantes."
    },
    booking: {
      perks: [
        "Reserva oficial desde la web.",
        "Qamarero dentro de la página de reservas.",
        "Teléfono y email visibles por si el formulario no carga."
      ]
    },
    menuPage: {
      eyebrow: "Carta actual",
      title: "Carta real, clara y fácil de consultar",
      description:
        "Entrantes, mar, paellas, brasas, vegetarianos, huevos rotos y bebidas con una lectura directa y precios visibles."
    },
    bookingPage: {
      eyebrow: "Reservas oficiales",
      title: "Reserva tu mesa",
      description:
        "Reserva online desde el canal oficial de Qamarero. Si el formulario tarda o no carga, usa el botón principal o llámanos.",
      primaryCtaLabel: "Reserva oficial",
      primaryCtaCopy:
        "Usa el botón principal para confirmar tu mesa. En horas punta, mejor reservar antes de venir.",
      fallbackTitle: "Si el formulario falla",
      fallbackCopy:
        "Si el formulario embebido no responde, completa la reserva desde el enlace oficial o contacta por teléfono o email para confirmar tu mesa.",
      embedNotice:
        "El formulario oficial de Qamarero se muestra aquí siempre que el proveedor lo permita. Si tarda demasiado o falla, utiliza la reserva oficial o llámanos."
    },
    contactPage: {
      eyebrow: "Contacto",
      title: "Dónde estamos",
      description:
        "Dentro del Mercado de San Agustín, en pleno centro de Granada y a un paso de la Catedral.",
      mapEmbedUrl:
        "https://www.google.com/maps?q=Mercado+de+San+Agustin+Granada&z=17&output=embed"
    },
    footer: {
      copy:
        "La Picatería. Barra, brasa de carbón, producto de mercado y reservas directas en pleno centro de Granada."
    },
    menuNotesTitle: "Notas de carta",
    meta: {
      home: {
        title: "La Picatería · brasa de carbón y cocina de mercado en Granada",
        description:
          "La Picatería, en el Mercado de San Agustín junto a la Catedral, reúne brasa, paellas, tapas, terraza y reservas directas."
      },
      menu: {
        title: "Carta real de La Picatería",
        description:
          "Consulta la carta real actual de La Picatería: entrantes, mar, paellas, brasas, vegetarianos, huevos rotos y bebidas."
      },
      booking: {
        title: "Reservas oficiales La Picatería",
        description:
          "Reserva mesa en La Picatería desde la web con integración oficial de Qamarero, botón principal y contacto visible."
      },
      contact: {
        title: "Contacto y ubicación La Picatería",
        description:
          "Dirección, mapa, teléfono y email de La Picatería en el Mercado de San Agustín, junto a la Catedral de Granada."
      }
    }
  },
  en: {
    business,
    navigation: {
      menu: "Menu",
      booking: "Bookings",
      contact: "Contact",
    },
    header: {
      tagline: "Mercado de San Agustin · next to the Cathedral",
    },
    cta: {
      reserve: "Book a table",
      menu: "View menu",
      contact: "Contact",
      maps: "Open map",
      qamarero: "Book on Qamarero",
    },
    hero: {
      kicker: "Market kitchen · charcoal grill · Granada",
      title: "Charcoal grill and market cooking at La Picateria",
      subtitle:
        "A brighter, more product-led website that feels closer to the restaurant itself: tapas, paellas, grill dishes and a unique location inside Mercado de San Agustin.",
      card: {
        eyebrow: "Real kitchen",
        title: "An honest menu, charcoal grill and dishes made for sharing",
        badge: "Market",
      },
      facts: {
        ticketTitle: "Typical spend",
        ticketValue: "Tapas 10 EUR · Meal 20 EUR",
        locationTitle: "Where we are",
        locationValue: "Mercado de San Agustin, next to the Cathedral",
      },
    },
    highlights: [
      {
        eyebrow: "Grill",
        title: "Real charcoal",
        description:
          "Secreto, pluma, beef, vegetables and fish cooked with live-fire character."
      },
      {
        eyebrow: "Market",
        title: "A location with identity",
        description:
          "Inside Mercado de San Agustin, only a few steps from Granada Cathedral."
      },
      {
        eyebrow: "Menu",
        title: "Tapas, paellas and long-table dishes",
        description:
          "A fuller menu with clear pricing that helps guests decide and book."
      }
    ],
    differentials: [
      {
        title: "Brighter and more appetising",
        description:
          "The digital experience now reflects the real tone of the restaurant: fresh, light and market-driven."
      },
      {
        title: "Recognisable produce",
        description:
          "Pink tomatoes, marinated anchovies, octopus, grill dishes and paellas define the menu and the site."
      },
      {
        title: "Booking without friction",
        description:
          "Visible CTAs, official Qamarero flow and the real menu working together for conversion."
      }
    ],
    sections: {
      differentials: {
        eyebrow: "Identity",
        title: "A website that feels brighter, more Mediterranean and more ownable",
        description:
          "The redesign moves away from the dark steakhouse look into a lighter editorial language tied to market dining."
      },
      menu: {
        eyebrow: "Real menu",
        title: "Tapas, paellas, grill dishes and drinks with visible prices",
        description:
          "The old demo menu is gone. The page now renders the live restaurant menu from structured JSON."
      },
      location: {
        eyebrow: "Location",
        title: "Mercado de San Agustin in the heart of Granada",
        description:
          "A natural stop for terrace dining, charcoal grill dishes and reservations near the Cathedral."
      },
      booking: {
        eyebrow: "Bookings",
        title: "Official Qamarero flow with a softer brand expression",
        description:
          "The booking flow stays intact while the surrounding page now matches the rest of the site."
      }
    },
    location: {
      copy:
        "La Picateria feels like the market itself: fresh produce, terrace tables, charcoal cooking and a strong city-center location."
    },
    booking: {
      perks: [
        "Official booking CTA with conversion tracking.",
        "Qamarero kept inside the booking page.",
        "Fallback by phone and email if the provider blocks the iframe."
      ]
    },
    menuPage: {
      eyebrow: "Current menu",
      title: "The real La Picateria menu, structured for mobile",
      description:
        "Starters, seafood, paellas, grill dishes, vegetarian options, broken eggs and drinks in clear HTML."
    },
    bookingPage: {
      eyebrow: "Official bookings",
      title: "Book your table in a brighter, brand-aligned flow",
      description:
        "Qamarero stays as the official engine, now framed by a lighter and more editorial booking page.",
      primaryCtaLabel: "Official channel",
      primaryCtaCopy:
        "Use the main button to confirm your booking. If the embedded provider does not load, the official link is always available.",
      fallbackTitle: "Direct fallback",
      fallbackCopy:
        "If the embedded form does not respond, book through the official link or contact the restaurant directly.",
      embedNotice:
        "We attempt to show the official Qamarero form here. If the provider blocks embedding, use the main booking button above."
    },
    contactPage: {
      eyebrow: "Contact",
      title: "Clear contact details with a softer editorial layout",
      description:
        "Map, phone, email and booking access in a cleaner visual system aligned with the restaurant identity.",
      mapEmbedUrl:
        "https://www.google.com/maps?q=Mercado+de+San+Agustin+Granada&z=17&output=embed"
    },
    footer: {
      copy:
        "La Picateria. Market cooking, charcoal grill and direct bookings in central Granada."
    },
    menuNotesTitle: "Menu notes",
    meta: {
      home: {
        title: "La Picateria · charcoal grill and market cooking in Granada",
        description:
          "La Picateria, inside Mercado de San Agustin next to the Cathedral, serves grill dishes, paellas, tapas and direct bookings."
      },
      menu: {
        title: "The real La Picateria menu",
        description:
          "Browse the current La Picateria menu: starters, seafood, paellas, grill dishes, vegetarian plates, broken eggs and drinks."
      },
      booking: {
        title: "Official La Picateria bookings",
        description:
          "Book a table at La Picateria through the official Qamarero integration with visible fallback details."
      },
      contact: {
        title: "La Picateria contact and location",
        description:
          "Address, map, phone and email for La Picateria in Mercado de San Agustin, next to Granada Cathedral."
      }
    }
  },
  fr: {
    business,
    navigation: {
      menu: "Carte",
      booking: "Reservations",
      contact: "Contact",
    },
    header: {
      tagline: "Mercado de San Agustin · a cote de la Cathedrale",
    },
    cta: {
      reserve: "Reserver une table",
      menu: "Voir la carte",
      contact: "Contact",
      maps: "Ouvrir la carte",
      qamarero: "Reserver sur Qamarero",
    },
    hero: {
      kicker: "Cuisine de marche · braise au charbon · Grenade",
      title: "Braise au charbon et cuisine de marche a La Picateria",
      subtitle:
        "Une experience web plus lumineuse et plus fidele au restaurant : tapas, paellas, braise et une adresse singuliere dans le Mercado de San Agustin.",
      card: {
        eyebrow: "Cuisine reelle",
        title: "Une carte sincere, de la braise au charbon et des plats a partager",
        badge: "Marche",
      },
      facts: {
        ticketTitle: "Ticket moyen",
        ticketValue: "Tapas 10 EUR · Repas 20 EUR",
        locationTitle: "Ou nous sommes",
        locationValue: "Mercado de San Agustin, a cote de la Cathedrale",
      },
    },
    highlights: [
      {
        eyebrow: "Braise",
        title: "Du vrai charbon",
        description:
          "Secreto, pluma, boeuf, legumes et poisson cuits avec une vraie personnalite de braise."
      },
      {
        eyebrow: "Marche",
        title: "Une adresse qui a du caractere",
        description:
          "Dans le Mercado de San Agustin, a quelques pas de la Cathedrale de Grenade."
      },
      {
        eyebrow: "Carte",
        title: "Tapas, paellas et plats pour partager",
        description:
          "Une carte plus complete et lisible, avec des prix visibles pour aider a reserver."
      }
    ],
    differentials: [
      {
        title: "Plus lumineux et plus appetissant",
        description:
          "La nouvelle interface traduit mieux le vrai ton de La Picateria : fraiche, claire et ancree dans le marche."
      },
      {
        title: "Des produits reconnaissables",
        description:
          "Tomate rose, boquerons, poulpe, braises et paellas donnent du fond a la carte comme au site."
      },
      {
        title: "Reservation sans friction",
        description:
          "CTA visibles, moteur officiel Qamarero et carte reelle travaillent ensemble pour convertir."
      }
    ],
    sections: {
      differentials: {
        eyebrow: "Identite",
        title: "Un site plus clair, plus mediterraneen et plus juste",
        description:
          "Le redesign quitte l'esthetique sombre pour un langage editorial plus lumineux et plus gastronomique."
      },
      menu: {
        eyebrow: "Carte reelle",
        title: "Tapas, paellas, braises et boissons avec prix visibles",
        description:
          "La carte demo disparait. La page affiche maintenant la vraie carte du restaurant via JSON."
      },
      location: {
        eyebrow: "Emplacement",
        title: "Mercado de San Agustin, au coeur de Grenade",
        description:
          "Une halte naturelle pour la terrasse, la braise et les reservations pres de la Cathedrale."
      },
      booking: {
        eyebrow: "Reservations",
        title: "Le flux officiel Qamarero, dans une interface plus douce",
        description:
          "Le moteur officiel reste en place, avec un habillage visuel mieux aligne sur le reste du site."
      }
    },
    location: {
      copy:
        "La Picateria ressemble a son marche : produit frais, terrasse, cuisine a la braise et emplacement fort au centre."
    },
    booking: {
      perks: [
        "CTA officiel de reservation avec tracking de conversion.",
        "Qamarero conserve dans la page de reservations.",
        "Fallback par telephone et email si le fournisseur bloque l'iframe."
      ]
    },
    menuPage: {
      eyebrow: "Carte actuelle",
      title: "La vraie carte de La Picateria, structuree pour le mobile",
      description:
        "Entrees, mer, paellas, braises, options vegetariennes, oeufs casses et boissons dans une lecture claire."
    },
    bookingPage: {
      eyebrow: "Reservations officielles",
      title: "Reservez votre table dans un flux plus lumineux",
      description:
        "Qamarero reste le moteur officiel, integre dans une page plus claire et plus coherente avec la marque.",
      primaryCtaLabel: "Canal officiel",
      primaryCtaCopy:
        "Utilisez le bouton principal pour confirmer la reservation. Si l'embed ne charge pas, le lien officiel reste disponible.",
      fallbackTitle: "Fallback direct",
      fallbackCopy:
        "Si le formulaire integre ne repond pas, reservez via le lien officiel ou contactez directement le restaurant.",
      embedNotice:
        "Nous essayons d'afficher ici le formulaire officiel Qamarero. Si le fournisseur bloque l'integration, utilisez le bouton principal."
    },
    contactPage: {
      eyebrow: "Contact",
      title: "Coordonnees claires dans un habillage plus editorial",
      description:
        "Carte, telephone, email et acces aux reservations dans une mise en page plus douce et plus gastronomique.",
      mapEmbedUrl:
        "https://www.google.com/maps?q=Mercado+de+San+Agustin+Granada&z=17&output=embed"
    },
    footer: {
      copy:
        "La Picateria. Cuisine de marche, braise au charbon et reservations directes au centre de Grenade."
    },
    menuNotesTitle: "Notes de carte",
    meta: {
      home: {
        title: "La Picateria · braise au charbon et cuisine de marche a Grenade",
        description:
          "La Picateria, dans le Mercado de San Agustin a cote de la Cathedrale, propose tapas, paellas, braise et reservations directes."
      },
      menu: {
        title: "La vraie carte de La Picateria",
        description:
          "Consultez la carte actuelle de La Picateria : entrees, mer, paellas, braises, vegetarien, oeufs casses et boissons."
      },
      booking: {
        title: "Reservations officielles La Picateria",
        description:
          "Reservez une table a La Picateria avec l'integration officielle Qamarero et un fallback toujours visible."
      },
      contact: {
        title: "Contact et emplacement La Picateria",
        description:
          "Adresse, carte, telephone et email de La Picateria dans le Mercado de San Agustin, a cote de la Cathedrale de Grenade."
      }
    }
  }
} satisfies Record<Locale, unknown>;

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getDictionary(locale: string) {
  return dictionaries[(isValidLocale(locale) ? locale : "es") as Locale];
}

export function getMenuPreview(
  menu: typeof menuData,
  locale: Locale,
): Array<{ name: string; description: string; price: string }> {
  const featuredIds = [
    "volcan-de-tomate",
    "pulpo-a-la-brasa",
    "jamon-asado",
    "pluma-iberica"
  ];

  const items = menu.categories
    .flatMap((category) => category.items)
    .filter((item) => featuredIds.includes(item.id))
    .slice(0, 4);

  return items.map((item) => ({
    name: item.names[locale],
    description: item.descriptions[locale],
    price: item.price
  }));
}
