import type { Locale } from "@/lib/i18n";

type FeaturedDish = {
  key: string;
  name: string;
  description: string;
  image: string;
  alt: string;
};

type ExperienceStory = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
  alt: string;
};

type QuickDecisionModule = {
  title: string;
  items: string[];
};

type TouristModule = {
  title: string;
  description: string;
  bullets: string[];
};

export const featuredDishesByLocale: Record<Locale, FeaturedDish[]> = {
  es: [
    {
      key: "chuleton",
      name: "Chuletón",
      description: "Brasa de carbón y corte potente para quien viene con hambre de plan serio.",
      image: "/images/real/chuleton.jpg",
      alt: "Chuletón a la brasa de La Picatería",
    },
    {
      key: "jamon_asado",
      name: "Jamón asado",
      description: "Uno de los platos de casa más reconocibles y de los que mejor resumen la propuesta.",
      image: "/images/real/jamon_asado.jpg",
      alt: "Jamón asado de La Picatería",
    },
    {
      key: "pinchos",
      name: "Pinchos y barra",
      description: "Producto de barra, tapeo y picoteo para entrar rápido en el ambiente de la casa.",
      image: "/images/real/pinchos_picateria.jpg",
      alt: "Pinchos y producto de barra en La Picatería",
    },
  ],
  en: [
    {
      key: "chuleton",
      name: "Chuleta steak",
      description: "Charcoal-grilled beef for guests looking for a more substantial meal.",
      image: "/images/real/chuleton.jpg",
      alt: "Charcoal-grilled chuleta steak at La Picatería",
    },
    {
      key: "jamon_asado",
      name: "Roast ham",
      description: "One of the house signatures and one of the easiest dishes to remember.",
      image: "/images/real/jamon_asado.jpg",
      alt: "Roast ham at La Picatería",
    },
    {
      key: "pinchos",
      name: "Pinchos and bar bites",
      description: "A fast way to understand the bar side of the restaurant and start sharing.",
      image: "/images/real/pinchos_picateria.jpg",
      alt: "Pinchos and bar bites at La Picatería",
    },
  ],
  fr: [
    {
      key: "chuleton",
      name: "Chuletón",
      description: "Une grande piece a la braise pour ceux qui viennent avec envie d'un vrai repas.",
      image: "/images/real/chuleton.jpg",
      alt: "Chuletón a la braise de La Picatería",
    },
    {
      key: "jamon_asado",
      name: "Jambon roti",
      description: "Un des plats signatures de la maison, facile a retenir apres le repas.",
      image: "/images/real/jamon_asado.jpg",
      alt: "Jambon roti de La Picatería",
    },
    {
      key: "pinchos",
      name: "Pinchos et comptoir",
      description: "Pour comprendre vite le cote tapeo et comptoir de l'adresse.",
      image: "/images/real/pinchos_picateria.jpg",
      alt: "Pinchos et comptoir de La Picatería",
    },
  ],
};

export const experienceStoryByLocale: Record<Locale, ExperienceStory> = {
  es: {
    eyebrow: "La experiencia La Picatería",
    title: "Mercado, brasa y una forma muy granadina de comer en el centro",
    description:
      "Dentro del Mercado de San Agustín, a un paso de la Catedral, La Picatería mezcla tapeo, platos para compartir, brasa de carbón, terraza y producto real en una experiencia muy fácil de entender para local y visitante.",
    bullets: [
      "Mercado de San Agustín, junto a la Catedral",
      "Brasa de carbón y carta para compartir",
      "Tapeo rápido o comida con calma",
      "Terraza y ambiente de centro de Granada",
    ],
    image: "/images/real/barra-producto.jpg",
    alt: "Barra y producto real en La Picatería",
  },
  en: {
    eyebrow: "The La Picatería experience",
    title: "Market setting, charcoal grill and a very local way to eat in central Granada",
    description:
      "Inside Mercado de San Agustin and only a short walk from the Cathedral, La Picatería combines tapas, sharing dishes, charcoal grill cooking, terrace tables and recognisable produce in a concept that feels local from the first glance.",
    bullets: [
      "Inside Mercado de San Agustin",
      "Charcoal grill and dishes to share",
      "Quick tapas or a slower meal",
      "Terrace and central Granada atmosphere",
    ],
    image: "/images/real/barra-producto.jpg",
    alt: "Bar and real produce at La Picatería",
  },
  fr: {
    eyebrow: "L'experience La Picatería",
    title: "Marche, braise et une facon tres locale de manger au centre de Grenade",
    description:
      "Dans le Mercado de San Agustin et a deux pas de la Cathedrale, La Picatería combine tapas, plats a partager, braise au charbon, terrasse et vrai produit dans une proposition tres lisible pour locaux et visiteurs.",
    bullets: [
      "Dans le Mercado de San Agustin",
      "Braise au charbon et plats a partager",
      "Tapeo rapide ou repas plus calme",
      "Terrasse et ambiance du centre",
    ],
    image: "/images/real/barra-producto.jpg",
    alt: "Comptoir et vrai produit a La Picatería",
  },
};

export const quickDecisionByLocale: Record<Locale, QuickDecisionModule> = {
  es: {
    title: "Información útil",
    items: [
      "Centro de Granada · junto a la Catedral",
      "Tapas, brasa y platos para compartir",
      "Dentro del Mercado de San Agustín",
      "Muy recomendable reservar en hora punta",
    ],
  },
  en: {
    title: "Useful information",
    items: [
      "Central Granada · next to the Cathedral",
      "Tapas, charcoal grill and sharing dishes",
      "Inside Mercado de San Agustin",
      "Booking is advisable at peak times",
    ],
  },
  fr: {
    title: "Informations utiles",
    items: [
      "Centre de Grenade · près de la Cathédrale",
      "Tapas, braise et plats à partager",
      "Dans le Mercado de San Agustin",
      "Réservation conseillée aux heures de pointe",
    ],
  },
};

export const touristModuleByLocale: Record<Locale, TouristModule> = {
  es: {
    title: "Si estás visitando Granada centro",
    description:
      "La Picatería es una parada fácil de recomendar si quieres comer cerca de la Catedral, dentro del Mercado de San Agustín y sin complicarte demasiado comparando opciones.",
    bullets: [
      "A 1 minuto de la Catedral",
      "Dentro del mercado y muy fácil de ubicar",
      "Sirve para tapear o sentarte a comer",
    ],
  },
  en: {
    title: "If you are visiting central Granada",
    description:
      "La Picatería is an easy recommendation if you want to eat near the Cathedral, inside Mercado de San Agustin and without overcomplicating the choice.",
    bullets: [
      "1 minute from the Cathedral",
      "Inside the market and easy to find",
      "Works for tapas or a proper meal",
    ],
  },
  fr: {
    title: "Si vous visitez le centre de Grenade",
    description:
      "La Picatería est une adresse facile a recommander si vous voulez manger pres de la Cathedrale, dans le Mercado de San Agustin et sans compliquer votre choix.",
    bullets: [
      "A une minute de la Cathedrale",
      "Dans le marche et tres facile a trouver",
      "Convient pour tapas ou vrai repas",
    ],
  },
};
