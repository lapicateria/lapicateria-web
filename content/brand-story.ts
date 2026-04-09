import type { Locale } from "@/lib/i18n";

type ReviewItem = {
  quote: string;
  tag: string;
};

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

export const reviewSummaryByLocale: Record<
  Locale,
  { title: string; rating: string; volume: string; kicker: string }
> = {
  es: {
    title: "Muy recomendado para tapear, comer con calma y reservar con criterio",
    rating: "4,4 en Google",
    volume: "+2.500 opiniones",
    kicker: "Prueba social",
  },
  en: {
    title: "A well-rated choice for tapas, proper meals and easy booking",
    rating: "4.4 on Google",
    volume: "2,500+ reviews",
    kicker: "Social proof",
  },
  fr: {
    title: "Une adresse tres recommande pour tapas, repas complets et reservation facile",
    rating: "4,4 sur Google",
    volume: "2 500+ avis",
    kicker: "Preuve sociale",
  },
};

export const featuredReviewsByLocale: Record<Locale, ReviewItem[]> = {
  es: [
    {
      quote: "De los mejores sitios para tapear en Granada si buscas producto y una mesa con ambiente.",
      tag: "Tapeo y producto",
    },
    {
      quote: "Brasa, arroces y una ubicación comodísima dentro del mercado. Muy fácil de recomendar.",
      tag: "Mercado y centro",
    },
    {
      quote: "Buen sitio para compartir, comer con calma y salir con la sensación de haber acertado.",
      tag: "Compartir y reservar",
    },
    {
      quote: "Terraza, carta clara y platos que entran por los ojos incluso antes de sentarte.",
      tag: "Terraza y carta",
    },
  ],
  en: [
    {
      quote: "A very solid choice for tapas, charcoal grill dishes and a relaxed table in central Granada.",
      tag: "Tapas and grill",
    },
    {
      quote: "The market setting makes it easy to understand and easy to recommend.",
      tag: "Location",
    },
    {
      quote: "Works especially well if you want to share dishes and book ahead for a calmer meal.",
      tag: "Sharing table",
    },
    {
      quote: "Terrace, recognisable produce and a menu that helps you decide fast.",
      tag: "Menu and terrace",
    },
  ],
  fr: [
    {
      quote: "Une adresse tres fiable pour tapas, braise et repas detendu au centre de Grenade.",
      tag: "Tapas et braise",
    },
    {
      quote: "Le cadre du marche rend l'experience tres facile a comprendre et a recommander.",
      tag: "Emplacement",
    },
    {
      quote: "Ideal pour partager les plats et reserver a l'avance si vous voulez prendre votre temps.",
      tag: "A partager",
    },
    {
      quote: "Terrasse, vrai produit et une carte qui aide a decider vite.",
      tag: "Carte et terrasse",
    },
  ],
};

export const featuredDishesByLocale: Record<Locale, FeaturedDish[]> = {
  es: [
    {
      key: "paella",
      name: "Paella",
      description: "Arroz para compartir, de los que piden mesa, tiempo y ganas de alargar la comida.",
      image: "/images/real/paella.jpg",
      alt: "Paella de La Picatería",
    },
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
      key: "paella",
      name: "Paella",
      description: "A sharing rice dish worth booking for if you want to enjoy the table properly.",
      image: "/images/real/paella.jpg",
      alt: "Paella at La Picatería",
    },
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
      key: "paella",
      name: "Paella",
      description: "Un riz a partager qui merite de reserver si vous voulez profiter de la table.",
      image: "/images/real/paella.jpg",
      alt: "Paella de La Picatería",
    },
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
