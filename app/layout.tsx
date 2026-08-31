import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  weight: ["500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpectersAI: Automatizamos tu negocio con IA",
  description:
    "Automatizamos lo repetitivo y construimos software a medida con IA para tu pyme. Diagnóstico inicial gratis y sin compromiso.",
  openGraph: {
    title: "SpectersAI: Automatizamos tu negocio con IA",
    description:
      "Menos trabajo manual, más tiempo para tu negocio. Agentes de IA, CRMs a medida e integraciones. Diagnóstico gratis.",
    siteName: "SpectersAI",
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
