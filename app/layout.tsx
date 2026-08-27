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
  metadataBase: new URL("https://specterspro.com"),
  title: "Specters, Te ayudamos a escalar tu negocio | Diagnóstico, Meta Ads y Google Ads",
  description:
    "Primero diagnosticamos tu negocio, después ejecutamos lo que hace más sentido: publicidad en Meta y Google, optimización de tu web o priorización de tu oferta. Enfoque 80/20, medido de verdad.",
  alternates: {
    canonical: "https://specterspro.com",
  },
  openGraph: {
    title: "Specters, Te ayudamos a escalar tu negocio",
    description:
      "Diagnóstico de negocio + publicidad digital en Meta y Google Ads. Encontramos el 20% de acciones que genera el 80% de tus resultados.",
    url: "https://specterspro.com",
    siteName: "Specters",
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
