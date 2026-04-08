import type { Metadata } from "next";
import { CookieBanner } from "@/components/cookie-banner";
import { GoogleAnalytics } from "@/components/google-analytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lapicateria.es"),
  title: {
    default: "La Picatería",
    template: "%s | La Picatería",
  },
  icons: {
    icon: "/images/logos/logo_picateria-negro.png",
    shortcut: "/images/logos/logo_picateria-negro.png",
    apple: "/images/logos/logo_picateria-negro.png",
  },
  description:
    "Brasa de carbón, tapas y producto real en el centro de Granada, dentro del Mercado de San Agustín junto a la Catedral.",
  openGraph: {
    title: "La Picatería",
    description:
      "Tapas, brasa de carbón y producto real en una ubicación única del centro de Granada.",
    url: "https://lapicateria.es",
    siteName: "La Picatería",
    type: "website",
    locale: "es_ES",
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
    title: "La Picatería",
    description:
      "Tapas, brasa de carbón y producto real en una ubicación única del centro de Granada.",
    images: ["/images/logos/logo_picateria_verde.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
