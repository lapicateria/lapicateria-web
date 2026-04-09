import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/carta",
        destination: "/es/carta",
        permanent: true,
      },
      {
        source: "/reservas",
        destination: "/es/reservas",
        permanent: true,
      },
      {
        source: "/contacto",
        destination: "/es/contacto",
        permanent: true,
      },
      {
        source: "/aviso-legal",
        destination: "/es/aviso-legal",
        permanent: true,
      },
      {
        source: "/privacidad",
        destination: "/es/privacidad",
        permanent: true,
      },
      {
        source: "/cookies",
        destination: "/es/cookies",
        permanent: true,
      },
      {
        source: "/horario",
        destination: "/es/contacto",
        permanent: true,
      },
      {
        source: "/quienes-somos",
        destination: "/es",
        permanent: true,
      },
      {
        source: "/13-nuestra-carta-restaurante",
        destination: "/es/carta",
        permanent: true,
      },
      {
        source: "/content/:path*",
        destination: "/es",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
