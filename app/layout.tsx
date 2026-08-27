import type { Metadata } from "next";
import { Schibsted_Grotesk, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpectersAI — Automatización e IA para tu negocio",
  description:
    "Diagnosticamos tus procesos y construimos agentes de IA, integraciones y CRMs a medida. IA donde suma, control humano donde es crítico.",
  openGraph: {
    title: "SpectersAI — Automatización e IA para tu negocio",
    description:
      "Diagnóstico de automatización + agentes de IA, CRMs a medida e integraciones. Implementación real, medida y con control humano donde importa.",
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
    <html
      lang="es"
      className={`${schibsted.variable} ${instrumentSerif.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
