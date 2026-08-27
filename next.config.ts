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
      // Links antiguos → portal del cliente
      {
        source: "/propuestas/lovely-hair-propuesta-1.html",
        destination: "/clientes/lovely-hair/propuesta",
        permanent: true,
      },
      {
        source: "/mockups/lovely-hair",
        destination: "/demo/lovely-hair",
        permanent: true,
      },
      {
        source: "/mockups/lovely-hair/:path*",
        destination: "/demo/lovely-hair/:path*",
        permanent: true,
      },
      // La propuesta ahora vive dentro del portal del cliente
      {
        source: "/propuestas/lovely-hair",
        destination: "/clientes/lovely-hair/propuesta",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/clientes/lovely-hair",
        destination: "/clientes/lovely-hair-portal.html",
      },
      {
        source: "/clientes/lovely-hair/analisis",
        destination: "/clientes/lovely-hair-analisis.html",
      },
      {
        source: "/clientes/lovely-hair/plan",
        destination: "/clientes/lovely-hair-plan.html",
      },
      {
        source: "/clientes/lovely-hair/propuesta",
        destination: "/clientes/lovely-hair-propuesta.html",
      },
    ];
  },
};

export default nextConfig;
