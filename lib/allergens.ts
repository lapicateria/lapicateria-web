import type { Locale } from "@/lib/i18n";

export const ALLERGEN_ORDER = [
  "gluten",
  "crustaceans",
  "eggs",
  "fish",
  "peanuts",
  "soy",
  "milk",
  "tree_nuts",
  "celery",
  "mustard",
  "sesame",
  "sulfites",
  "lupins",
  "molluscs",
] as const;

export type AllergenKey = (typeof ALLERGEN_ORDER)[number];

type AllergenDefinition = {
  symbol: string;
  labels: Record<Locale, string>;
};

export const ALLERGENS: Record<AllergenKey, AllergenDefinition> = {
  gluten: {
    symbol: "GL",
    labels: { es: "Gluten", en: "Gluten", fr: "Gluten" },
  },
  crustaceans: {
    symbol: "CR",
    labels: { es: "Crustáceos", en: "Crustaceans", fr: "Crustacés" },
  },
  eggs: {
    symbol: "HU",
    labels: { es: "Huevos", en: "Eggs", fr: "Œufs" },
  },
  fish: {
    symbol: "PE",
    labels: { es: "Pescado", en: "Fish", fr: "Poisson" },
  },
  peanuts: {
    symbol: "CA",
    labels: { es: "Cacahuetes", en: "Peanuts", fr: "Arachides" },
  },
  soy: {
    symbol: "SO",
    labels: { es: "Soja", en: "Soy", fr: "Soja" },
  },
  milk: {
    symbol: "LA",
    labels: { es: "Leche / lácteos", en: "Milk / dairy", fr: "Lait / produits laitiers" },
  },
  tree_nuts: {
    symbol: "FS",
    labels: { es: "Frutos secos", en: "Tree nuts", fr: "Fruits à coque" },
  },
  celery: {
    symbol: "AP",
    labels: { es: "Apio", en: "Celery", fr: "Céleri" },
  },
  mustard: {
    symbol: "MO",
    labels: { es: "Mostaza", en: "Mustard", fr: "Moutarde" },
  },
  sesame: {
    symbol: "SE",
    labels: { es: "Sésamo", en: "Sesame", fr: "Sésame" },
  },
  sulfites: {
    symbol: "SU",
    labels: { es: "Sulfitos", en: "Sulfites", fr: "Sulfites" },
  },
  lupins: {
    symbol: "AL",
    labels: { es: "Altramuces", en: "Lupins", fr: "Lupins" },
  },
  molluscs: {
    symbol: "ML",
    labels: { es: "Moluscos", en: "Molluscs", fr: "Mollusques" },
  },
};

export function getAllergenLabel(key: AllergenKey, locale: Locale) {
  return ALLERGENS[key].labels[locale];
}

export function getAllergenLegendCopy(locale: Locale) {
  if (locale === "en") {
    return {
      title: "Allergen information",
      legal:
        "Ask our team if you have allergies or intolerances. Cross-contamination may exist.",
    };
  }

  if (locale === "fr") {
    return {
      title: "Information sur les allergènes",
      legal:
        "Consultez notre équipe si vous avez des allergies ou des intolérances. Une contamination croisée peut exister.",
    };
  }

  return {
    title: "Información de alérgenos",
    legal:
      "Consulta con nuestro equipo si tienes alergias o intolerancias. Puede existir contaminación cruzada.",
  };
}
