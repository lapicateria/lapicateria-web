import { business, getDictionary, type Locale } from "@/lib/i18n";

type RestaurantSchemaProps = {
  locale: Locale;
};

export function RestaurantSchema({ locale }: RestaurantSchemaProps) {
  const dictionary = getDictionary(locale);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `https://lapicateria.es/${locale}#restaurant`,
    name: business.name,
    url: `https://lapicateria.es/${locale}`,
    telephone: business.phone,
    email: business.email,
    priceRange: "€€",
    servesCuisine: ["Tapas", "Spanish", "Grill"],
    acceptsReservations: true,
    menu: `https://lapicateria.es/${locale}/carta`,
    hasMap: business.mapsUrl,
    image: [
      "https://lapicateria.es/images/real/barra-producto.jpg",
      "https://lapicateria.es/images/real/terraza.jpg",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mercado de San Agustín, Plaza de San Agustín s/n",
      postalCode: business.postalCode,
      addressLocality: business.city,
      addressCountry: business.country,
    },
    description: dictionary.meta.home.description,
    areaServed: {
      "@type": "City",
      name: business.city,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: business.phone,
      email: business.email,
      availableLanguage: ["es", "en", "fr"],
    },
    sameAs: [
      dictionary.business.mapsUrl,
      dictionary.business.bookingUrl,
      dictionary.business.instagramUrl,
      dictionary.business.facebookUrl,
      dictionary.business.tiktokUrl,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
