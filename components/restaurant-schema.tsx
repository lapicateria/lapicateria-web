import { getDictionary, type Locale } from "@/lib/i18n";

type RestaurantSchemaProps = {
  locale: Locale;
};

export function RestaurantSchema({ locale }: RestaurantSchemaProps) {
  const dictionary = getDictionary(locale);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "La Picatería",
    url: `https://lapicateria.es/${locale}`,
    telephone: "+34 628 736 029",
    email: "online@lapicateria.es",
    priceRange: "€€",
    servesCuisine: ["Tapas", "Spanish", "Grill"],
    acceptsReservations: true,
    menu: `https://lapicateria.es/${locale}/carta`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mercado de San Agustín, Plaza de San Agustín s/n",
      postalCode: "18001",
      addressLocality: "Granada",
      addressCountry: "ES",
    },
    description: dictionary.meta.home.description,
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
