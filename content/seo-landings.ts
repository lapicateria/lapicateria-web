import type { Locale } from "@/lib/i18n";

export const seoLandingSlugs = [
  "tapas-granada",
  "tapas-granada-centro",
  "comer-en-granada-centro",
  "restaurante-mercado-san-agustin",
] as const;

export type SeoLandingSlug = (typeof seoLandingSlugs)[number];

type SeoLandingContent = {
  eyebrow: string;
  title: string;
  description: string;
  heroIntro: string;
  whyTitle: string;
  whyPoints: string[];
  localTitle: string;
  localText: string;
  experienceTitle: string;
  experienceText: string;
  featuredDishKeys: string[];
  relatedSlugs: SeoLandingSlug[];
  topCtaLabel: string;
  midCtaTitle: string;
  midCtaText: string;
  finalCtaTitle: string;
  finalCtaText: string;
};

type SeoLandingEntry = {
  slug: SeoLandingSlug;
  image: string;
  imageAlt: Record<Locale, string>;
  content: Record<Locale, SeoLandingContent>;
};

export const seoLandings: Record<SeoLandingSlug, SeoLandingEntry> = {
  "tapas-granada": {
    slug: "tapas-granada",
    image: "/images/real/pinchos_picateria.jpg",
    imageAlt: {
      es: "Pinchos y producto de barra en La Picatería",
      en: "Pinchos and bar bites at La Picatería",
      fr: "Pinchos et comptoir a La Picatería",
    },
    content: {
      es: {
        eyebrow: "Tapas en Granada",
        title: "Tapas en Granada con producto real y brasa de carbón",
        description:
          "La Picatería reúne tapeo, brasa, platos para compartir y una ubicación muy cómoda en el Mercado de San Agustín, junto a la Catedral de Granada.",
        heroIntro:
          "Si estás buscando tapas en Granada y quieres una opción fácil de entender, bien situada y con carta de verdad, La Picatería encaja por producto, ambiente y reserva directa.",
        whyTitle: "Por qué elegir La Picatería si buscas tapas en Granada",
        whyPoints: [
          "Tapas con cada bebida y una carta que va más allá del picoteo rápido.",
          "Brasa de carbón, jamón asado, arroces y platos para compartir.",
          "Ubicación dentro del Mercado de San Agustín, muy útil para local y visitante.",
        ],
        localTitle: "Tapear en Granada con una ubicación que te lo pone fácil",
        localText:
          "Estar dentro del mercado y a un paso de la Catedral convierte a La Picatería en una opción muy clara para quien quiere comer en el centro sin perder tiempo comparando demasiado.",
        experienceTitle: "Más que tapas: una mesa para alargar el plan",
        experienceText:
          "Puedes venir a tapear, pedir una comida más completa o sentarte con calma. Esa mezcla de barra, terraza, mercado y cocina directa es parte del atractivo.",
        featuredDishKeys: ["pinchos", "jamon_asado", "paella"],
        relatedSlugs: ["tapas-granada-centro", "comer-en-granada-centro"],
        topCtaLabel: "Reservar mesa",
        midCtaTitle: "Si ya te encaja el plan, mejor reservar",
        midCtaText:
          "En hora punta, fines de semana o si vienes con idea de comer con calma, es más cómodo llegar con la mesa resuelta.",
        finalCtaTitle: "¿Buscabas tapas en Granada y quieres cerrar el plan?",
        finalCtaText:
          "Consulta la carta o reserva directamente desde la web oficial de La Picatería.",
      },
      en: {
        eyebrow: "Tapas in Granada",
        title: "Tapas in Granada with real produce and charcoal grill cooking",
        description:
          "La Picatería combines tapas, grill dishes, sharing plates and a very easy central location inside Mercado de San Agustin, next to the Cathedral.",
        heroIntro:
          "If you are searching for tapas in Granada and want a place that feels local, easy to reach and worth booking, La Picatería is a strong fit.",
        whyTitle: "Why choose La Picatería for tapas in Granada",
        whyPoints: [
          "Tapas with drinks plus a fuller menu when you want more than a quick stop.",
          "Charcoal grill dishes, roast ham, rice dishes and plates made for sharing.",
          "Inside Mercado de San Agustin, useful for both visitors and locals.",
        ],
        localTitle: "A central Granada location that makes the choice easier",
        localText:
          "Being inside the market and close to the Cathedral makes La Picatería an easy option for anyone trying to find a good tapas place without overthinking it.",
        experienceTitle: "Not only tapas, but a place to stay longer",
        experienceText:
          "You can come for bar bites, a proper meal or a slower table with terrace atmosphere. That flexibility is part of the appeal.",
        featuredDishKeys: ["pinchos", "jamon_asado", "paella"],
        relatedSlugs: ["tapas-granada-centro", "comer-en-granada-centro"],
        topCtaLabel: "Book a table",
        midCtaTitle: "If the plan already makes sense, book it now",
        midCtaText:
          "Peak times and slower meals work better when you arrive with the table already sorted.",
        finalCtaTitle: "Looking for tapas in Granada and ready to decide?",
        finalCtaText:
          "Check the menu or book directly through La Picatería's official booking link.",
      },
      fr: {
        eyebrow: "Tapas a Grenade",
        title: "Tapas a Grenade avec vrai produit et braise au charbon",
        description:
          "La Picatería melange tapas, braise, plats a partager et emplacement tres pratique dans le Mercado de San Agustin, a cote de la Cathedrale.",
        heroIntro:
          "Si vous cherchez des tapas a Grenade et voulez une adresse locale, simple a comprendre et facile a reserver, La Picatería fonctionne tres bien.",
        whyTitle: "Pourquoi choisir La Picatería pour des tapas a Grenade",
        whyPoints: [
          "Tapas avec boisson et une vraie carte pour aller plus loin qu'un arret rapide.",
          "Braise au charbon, jambon roti, riz et plats a partager.",
          "Dans le Mercado de San Agustin, tres pratique pour visiteurs et locaux.",
        ],
        localTitle: "Une localisation centrale qui simplifie le choix",
        localText:
          "Etre dans le marche et proche de la Cathedrale fait de La Picatería une option tres lisible pour manger au centre sans perdre du temps.",
        experienceTitle: "Pas seulement des tapas, mais une table ou rester",
        experienceText:
          "Vous pouvez venir pour le comptoir, pour un vrai repas ou pour prendre votre temps en terrasse. Cette souplesse fait partie du charme.",
        featuredDishKeys: ["pinchos", "jamon_asado", "paella"],
        relatedSlugs: ["tapas-granada-centro", "comer-en-granada-centro"],
        topCtaLabel: "Reserver une table",
        midCtaTitle: "Si le plan vous convient deja, reservez",
        midCtaText:
          "Aux heures fortes ou pour un repas plus calme, mieux vaut arriver avec la table deja prevue.",
        finalCtaTitle: "Vous cherchiez des tapas a Grenade ?",
        finalCtaText:
          "Consultez la carte ou reservez directement depuis le site officiel de La Picatería.",
      },
    },
  },
  "tapas-granada-centro": {
    slug: "tapas-granada-centro",
    image: "/images/real/barra-producto.jpg",
    imageAlt: {
      es: "Barra y producto real en La Picatería",
      en: "Bar and real product at La Picatería",
      fr: "Comptoir et vrai produit a La Picatería",
    },
    content: {
      es: {
        eyebrow: "Tapas Granada centro",
        title: "Tapas en Granada centro dentro del Mercado de San Agustín",
        description:
          "La Picatería está en pleno centro de Granada, junto a la Catedral, y combina tapas, brasa, terraza y carta para compartir.",
        heroIntro:
          "Para quien busca tapas en Granada centro, La Picatería tiene dos ventajas claras: ubicación muy fácil y una propuesta que sirve tanto para tapear como para sentarse a comer.",
        whyTitle: "Qué hace distinta esta parada en Granada centro",
        whyPoints: [
          "Estás dentro del mercado y a pocos pasos de la Catedral.",
          "Hay tapeo, producto reconocible, platos de brasa y opción de terraza.",
          "La carta ayuda a decidir rápido si vienes con hambre de tapas o de comida completa.",
        ],
        localTitle: "Una opción muy clara si te mueves por el centro",
        localText:
          "Si comparas sitios para comer en el centro de Granada, aquí tienes un restaurante fácil de ubicar, cómodo para llegar andando y con una propuesta local muy reconocible.",
        experienceTitle: "Centro, ambiente y mesa con ritmo propio",
        experienceText:
          "La Picatería funciona para el aperitivo, la comida y la sobremesa. Ese equilibrio entre tapeo, cocina y ambiente le da más recorrido que un bar de paso.",
        featuredDishKeys: ["pinchos", "paella", "chuleton"],
        relatedSlugs: ["tapas-granada", "comer-en-granada-centro", "restaurante-mercado-san-agustin"],
        topCtaLabel: "Reservar en Granada centro",
        midCtaTitle: "Granada centro suele invitar a improvisar. Aquí es mejor llegar con plan.",
        midCtaText:
          "Si vienes en horas fuertes o fines de semana, reservar evita vueltas innecesarias por el centro.",
        finalCtaTitle: "¿Tapas en Granada centro y una mesa ya clara?",
        finalCtaText:
          "Revisa la carta, confirma la ubicación y reserva directamente desde la web.",
      },
      en: {
        eyebrow: "Tapas Granada centre",
        title: "Tapas in central Granada inside Mercado de San Agustin",
        description:
          "La Picatería sits in central Granada, next to the Cathedral, with tapas, charcoal grill dishes, terrace seating and sharing plates.",
        heroIntro:
          "If you are looking for tapas in central Granada, La Picatería makes sense because the location is easy and the menu works for both quick bites and longer meals.",
        whyTitle: "Why it works well in central Granada",
        whyPoints: [
          "Inside the market and only a few steps from the Cathedral.",
          "Tapas, recognisable produce, grill dishes and terrace seating.",
          "A menu that helps you decide fast whether you want tapas or a fuller meal.",
        ],
        localTitle: "A simple option when you are moving around the centre",
        localText:
          "If you are comparing places in central Granada, this is a restaurant that is easy to reach on foot and easy to understand from the first glance.",
        experienceTitle: "City centre, atmosphere and a table worth keeping",
        experienceText:
          "La Picatería works for aperitivo, lunch and slower meals, which gives it more range than a stop-and-go tapas bar.",
        featuredDishKeys: ["pinchos", "paella", "chuleton"],
        relatedSlugs: ["tapas-granada", "comer-en-granada-centro", "restaurante-mercado-san-agustin"],
        topCtaLabel: "Book in central Granada",
        midCtaTitle: "Central Granada often pushes people to improvise. Better to arrive with a plan.",
        midCtaText:
          "Peak slots and weekends are easier when the table is already booked.",
        finalCtaTitle: "Looking for tapas in central Granada?",
        finalCtaText:
          "Check the menu, confirm the location and book directly from the website.",
      },
      fr: {
        eyebrow: "Tapas centre de Grenade",
        title: "Tapas au centre de Grenade dans le Mercado de San Agustin",
        description:
          "La Picatería est en plein centre, a cote de la Cathedrale, avec tapas, braise, terrasse et plats a partager.",
        heroIntro:
          "Si vous cherchez des tapas dans le centre de Grenade, La Picatería est pratique par sa localisation et convaincante par sa carte.",
        whyTitle: "Pourquoi cette adresse fonctionne tres bien au centre",
        whyPoints: [
          "Dans le marche et a quelques pas de la Cathedrale.",
          "Tapas, vrai produit, braise et terrasse.",
          "Une carte qui permet de choisir vite entre tapeo et vrai repas.",
        ],
        localTitle: "Une option tres lisible quand on bouge dans le centre",
        localText:
          "Si vous comparez plusieurs adresses au centre de Grenade, c'est un restaurant facile a rejoindre a pied et facile a comprendre.",
        experienceTitle: "Centre-ville, ambiance et table ou rester",
        experienceText:
          "La Picatería fonctionne pour l'aperitif, le dejeuner et les repas plus calmes, avec plus d'ampleur qu'un simple bar a tapas.",
        featuredDishKeys: ["pinchos", "paella", "chuleton"],
        relatedSlugs: ["tapas-granada", "comer-en-granada-centro", "restaurante-mercado-san-agustin"],
        topCtaLabel: "Reserver au centre de Grenade",
        midCtaTitle: "Au centre de Grenade, mieux vaut arriver avec un plan clair",
        midCtaText:
          "Les heures fortes et les week-ends sont plus faciles si la table est deja reservee.",
        finalCtaTitle: "Vous cherchez des tapas dans le centre de Grenade ?",
        finalCtaText:
          "Consultez la carte, confirmez l'emplacement et reservez directement depuis le site.",
      },
    },
  },
  "comer-en-granada-centro": {
    slug: "comer-en-granada-centro",
    image: "/images/real/paella_entrecot.jpg",
    imageAlt: {
      es: "Paella y carne a la brasa en La Picatería",
      en: "Paella and grilled meat at La Picatería",
      fr: "Paella et viande a la braise a La Picatería",
    },
    content: {
      es: {
        eyebrow: "Comer en Granada centro",
        title: "Dónde comer en Granada centro si buscas producto, brasa y una mesa cómoda",
        description:
          "La Picatería es una opción muy sólida para comer en Granada centro: mercado, Catedral cerca, brasa de carbón, tapas y platos para compartir.",
        heroIntro:
          "Si tu búsqueda es dónde comer en Granada centro, aquí encuentras una propuesta completa: buena ubicación, cocina reconocible y posibilidad de reservar sin salir de la web.",
        whyTitle: "Por qué funciona para comer en el centro de Granada",
        whyPoints: [
          "Brasa, arroces, tapas y platos para comer con calma.",
          "Ubicación dentro del Mercado de San Agustín, a un paso de la Catedral.",
          "Carta clara para decidir si quieres tapeo, comida completa o comida para compartir.",
        ],
        localTitle: "Comer cerca de la Catedral con una propuesta muy redonda",
        localText:
          "Para turistas, parejas, grupos pequeños o gente de Granada que quiere quedar en el centro, La Picatería ofrece una ubicación práctica y una propuesta más completa que la de un sitio de paso.",
        experienceTitle: "Producto real y una mesa que merece quedarse un rato",
        experienceText:
          "Aquí no todo va de entrar y salir. La terraza, la brasa y los platos al centro ayudan a convertir la comida en una experiencia más redonda.",
        featuredDishKeys: ["paella", "chuleton", "jamon_asado"],
        relatedSlugs: ["tapas-granada-centro", "restaurante-mercado-san-agustin"],
        topCtaLabel: "Reservar para comer",
        midCtaTitle: "Si vienes a comer en Granada centro, mejor no dejarlo para el último minuto",
        midCtaText:
          "Reservar te permite llegar al mercado con la mesa ya cerrada, sobre todo los días fuertes.",
        finalCtaTitle: "¿Ya sabes dónde comer en Granada centro?",
        finalCtaText:
          "Mira la carta de La Picatería y reserva desde la web oficial.",
      },
      en: {
        eyebrow: "Where to eat in central Granada",
        title: "Where to eat in central Granada for grill dishes, tapas and a proper table",
        description:
          "La Picatería is a strong option for eating in central Granada: market setting, Cathedral nearby, charcoal grill dishes and sharing plates.",
        heroIntro:
          "If you are searching for where to eat in central Granada, this is a complete option with an easy location, recognisable cooking and direct booking.",
        whyTitle: "Why it works for lunch or dinner in central Granada",
        whyPoints: [
          "Grill dishes, rice, tapas and plates for a slower meal.",
          "Inside Mercado de San Agustin, a short walk from the Cathedral.",
          "A clear menu whether you want tapas, a full meal or dishes to share.",
        ],
        localTitle: "Eating near the Cathedral with a fuller proposal",
        localText:
          "For visitors, couples or small groups meeting in the centre, La Picatería offers a practical location and a broader concept than a simple pass-through spot.",
        experienceTitle: "Real produce and a table worth keeping for a while",
        experienceText:
          "This is not only about stopping quickly. Terrace seating, charcoal grill cooking and sharing dishes make the meal feel more complete.",
        featuredDishKeys: ["paella", "chuleton", "jamon_asado"],
        relatedSlugs: ["tapas-granada-centro", "restaurante-mercado-san-agustin"],
        topCtaLabel: "Book for lunch or dinner",
        midCtaTitle: "If you want to eat in central Granada, do not leave it too late",
        midCtaText:
          "Booking helps you arrive at the market with the table already sorted, especially on busy days.",
        finalCtaTitle: "Already found where to eat in central Granada?",
        finalCtaText:
          "Check La Picatería's menu and book directly from the official website.",
      },
      fr: {
        eyebrow: "Ou manger au centre de Grenade",
        title: "Ou manger au centre de Grenade si vous cherchez braise, tapas et vraie table",
        description:
          "La Picatería est une option tres solide pour manger au centre de Grenade : marche, Cathedrale proche, braise au charbon et plats a partager.",
        heroIntro:
          "Si vous cherchez ou manger au centre de Grenade, vous trouvez ici une option complete avec emplacement pratique, cuisine reconnaissable et reservation directe.",
        whyTitle: "Pourquoi cela fonctionne tres bien pour dejeuner ou diner au centre",
        whyPoints: [
          "Braise, riz, tapas et plats pour manger plus calmement.",
          "Dans le Mercado de San Agustin, a quelques pas de la Cathedrale.",
          "Une carte claire selon que vous vouliez tapas, vrai repas ou partage.",
        ],
        localTitle: "Manger pres de la Cathedrale avec une proposition plus complete",
        localText:
          "Pour visiteurs, couples ou petits groupes qui se retrouvent au centre, La Picatería offre un emplacement pratique et une proposition plus riche qu'une adresse de passage.",
        experienceTitle: "Vrai produit et une table qui merite qu'on y reste",
        experienceText:
          "Ici, il ne s'agit pas seulement d'un arret rapide. Terrasse, braise et plats a partager rendent le repas plus complet.",
        featuredDishKeys: ["paella", "chuleton", "jamon_asado"],
        relatedSlugs: ["tapas-granada-centro", "restaurante-mercado-san-agustin"],
        topCtaLabel: "Reserver pour manger",
        midCtaTitle: "Pour manger au centre de Grenade, mieux vaut ne pas attendre",
        midCtaText:
          "Reserver aide a arriver au marche avec la table deja prevue, surtout les jours plus forts.",
        finalCtaTitle: "Vous savez deja ou manger au centre de Grenade ?",
        finalCtaText:
          "Consultez la carte de La Picatería et reservez depuis le site officiel.",
      },
    },
  },
  "restaurante-mercado-san-agustin": {
    slug: "restaurante-mercado-san-agustin",
    image: "/images/real/terraza.jpg",
    imageAlt: {
      es: "Terraza de La Picatería en el Mercado de San Agustín",
      en: "Terrace at La Picatería in Mercado de San Agustin",
      fr: "Terrasse de La Picatería au Mercado de San Agustin",
    },
    content: {
      es: {
        eyebrow: "Restaurante Mercado San Agustín",
        title: "Restaurante en el Mercado de San Agustín con brasa, tapas y terraza",
        description:
          "La Picatería está dentro del Mercado de San Agustín y ofrece una propuesta muy completa de tapas, brasa de carbón, paellas y platos para compartir.",
        heroIntro:
          "Si estás buscando un restaurante en el Mercado de San Agustín, La Picatería destaca por combinar ubicación, cocina de mercado, brasa y una experiencia muy fácil de recomendar.",
        whyTitle: "Qué aporta La Picatería dentro del Mercado de San Agustín",
        whyPoints: [
          "Ubicación muy clara dentro del mercado, junto a la Catedral.",
          "Tapeo, terraza y platos de comida real para sentarte con calma.",
          "Reserva directa desde la web si no quieres improvisar al llegar.",
        ],
        localTitle: "Una referencia natural dentro del mercado",
        localText:
          "Para quien busca restaurantes en el Mercado de San Agustín, La Picatería reúne varias señales fuertes: producto real, propuesta reconocible, ambiente y facilidad para reservar.",
        experienceTitle: "Mercado, centro histórico y mesa con personalidad",
        experienceText:
          "La combinación de mercado, terraza, centro de Granada y cocina con brasa hace que la experiencia tenga más recorrido que una simple parada turística.",
        featuredDishKeys: ["pinchos", "jamon_asado", "paella"],
        relatedSlugs: ["tapas-granada-centro", "comer-en-granada-centro"],
        topCtaLabel: "Reservar en el mercado",
        midCtaTitle: "Si quieres venir al Mercado de San Agustín con la mesa hecha, reserva antes",
        midCtaText:
          "Es la forma más cómoda de asegurar sitio cuando vienes al centro con plan de comida o cena.",
        finalCtaTitle: "¿Buscabas restaurante en el Mercado de San Agustín?",
        finalCtaText:
          "Consulta la carta de La Picatería o reserva directamente desde la web.",
      },
      en: {
        eyebrow: "Restaurant Mercado de San Agustin",
        title: "Restaurant in Mercado de San Agustin with tapas, grill dishes and terrace seating",
        description:
          "La Picatería sits inside Mercado de San Agustin with tapas, charcoal grill dishes, paellas and a sharing-friendly menu.",
        heroIntro:
          "If you are looking for a restaurant in Mercado de San Agustin, La Picatería stands out because it combines location, market produce and a very easy dining concept.",
        whyTitle: "Why La Picatería stands out inside the market",
        whyPoints: [
          "A clear location inside the market, next to the Cathedral.",
          "Tapas, terrace and proper dishes when you want more than a quick stop.",
          "Direct booking from the website if you do not want to improvise on arrival.",
        ],
        localTitle: "A natural reference point inside Mercado de San Agustin",
        localText:
          "For guests searching restaurants in Mercado de San Agustin, La Picatería brings together recognisable produce, atmosphere and an easy booking path.",
        experienceTitle: "Market setting, city centre and a restaurant with character",
        experienceText:
          "The mix of market atmosphere, terrace seating, central Granada and charcoal grill cooking gives the visit more depth than a simple tourist stop.",
        featuredDishKeys: ["pinchos", "jamon_asado", "paella"],
        relatedSlugs: ["tapas-granada-centro", "comer-en-granada-centro"],
        topCtaLabel: "Book inside the market",
        midCtaTitle: "If you want Mercado de San Agustin with the table already solved, book ahead",
        midCtaText:
          "It is the easiest way to secure a spot when you are coming into the centre for lunch or dinner.",
        finalCtaTitle: "Looking for a restaurant in Mercado de San Agustin?",
        finalCtaText:
          "Check La Picatería's menu or book directly from the website.",
      },
      fr: {
        eyebrow: "Restaurant Mercado de San Agustin",
        title: "Restaurant dans le Mercado de San Agustin avec tapas, braise et terrasse",
        description:
          "La Picatería est dans le Mercado de San Agustin avec tapas, braise au charbon, paellas et carte pensee pour partager.",
        heroIntro:
          "Si vous cherchez un restaurant dans le Mercado de San Agustin, La Picatería se distingue par son emplacement, son vrai produit et sa reservation facile.",
        whyTitle: "Pourquoi La Picatería ressort bien dans le marche",
        whyPoints: [
          "Un emplacement tres clair dans le marche, a cote de la Cathedrale.",
          "Tapas, terrasse et vrais plats quand vous voulez plus qu'un arret rapide.",
          "Reservation directe depuis le site si vous ne voulez pas improviser.",
        ],
        localTitle: "Une reference naturelle dans le Mercado de San Agustin",
        localText:
          "Pour ceux qui cherchent des restaurants dans le Mercado de San Agustin, La Picatería rassemble vrai produit, ambiance et reservation simple.",
        experienceTitle: "Marche, centre-ville et un restaurant avec personnalite",
        experienceText:
          "Le melange du marche, de la terrasse, du centre de Grenade et de la braise donne plus de relief qu'une simple halte touristique.",
        featuredDishKeys: ["pinchos", "jamon_asado", "paella"],
        relatedSlugs: ["tapas-granada-centro", "comer-en-granada-centro"],
        topCtaLabel: "Reserver dans le marche",
        midCtaTitle: "Si vous voulez venir au Mercado de San Agustin avec la table prevue, reservez avant",
        midCtaText:
          "C'est la solution la plus simple pour assurer votre place au centre de Grenade.",
        finalCtaTitle: "Vous cherchiez un restaurant dans le Mercado de San Agustin ?",
        finalCtaText:
          "Consultez la carte de La Picatería ou reservez directement depuis le site.",
      },
    },
  },
};

export function getSeoLanding(slug: string) {
  if ((seoLandingSlugs as readonly string[]).includes(slug)) {
    return seoLandings[slug as SeoLandingSlug];
  }
  return null;
}
