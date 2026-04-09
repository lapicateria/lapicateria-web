import type { MetadataRoute } from "next";
import { seoLandingSlugs } from "@/content/seo-landings";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/carta",
    "/reservas",
    "/contacto",
    "/aviso-legal",
    "/privacidad",
    "/cookies",
    ...seoLandingSlugs.map((slug) => `/${slug}`),
  ];

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `https://lapicateria.es/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.8,
    })),
  );
}
