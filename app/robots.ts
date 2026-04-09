import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/owner/", "/api/owner/"],
      },
    ],
    sitemap: "https://lapicateria.es/sitemap.xml",
  };
}
