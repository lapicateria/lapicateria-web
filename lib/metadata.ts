import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";

const socialProfiles = [
  "https://www.instagram.com/lapicateria.granada/",
  "https://www.facebook.com/lapicateria.granada",
  "https://www.tiktok.com/@lapicateriadegranada",
];

type MetadataOptions = {
  title: string;
  description: string;
  path: string;
};

export function buildMetadata(
  locale: Locale,
  { title, description, path }: MetadataOptions,
): Metadata {
  const canonical = `https://lapicateria.es${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        locales.map((entry) => [entry, `https://lapicateria.es/${entry}${path.replace(/^\/(es|en|fr)/, "")}`]),
      ),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "La Picatería",
      locale: locale === "es" ? "es_ES" : locale === "en" ? "en_GB" : "fr_FR",
      type: "website",
      images: [
        {
          url: "/images/logos/logo_picateria_verde.jpg",
          width: 1281,
          height: 459,
          alt: "Logo La Picatería",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/logos/logo_picateria_verde.jpg"],
    },
    other: {
      "social:instagram": socialProfiles[0],
      "social:facebook": socialProfiles[1],
      "social:tiktok": socialProfiles[2],
    },
  };
}
