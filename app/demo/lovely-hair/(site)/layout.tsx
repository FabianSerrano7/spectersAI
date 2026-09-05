import type { Metadata } from "next";
import { DM_Serif_Display, Work_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./theme.css";
import ThemeToggle from "./ThemeToggle";

const display = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Lovely Hair — Demo",
  robots: { index: false, follow: false },
};

const BOOKING_URL = "https://lovelyhair.site.agendapro.com";

export default function LovelyHairDemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      data-theme="night"
      className={`lh-root ${display.variable} ${workSans.variable} font-[family-name:var(--font-work-sans)] bg-[var(--lh-bg)] text-[var(--lh-ink)] min-h-screen flex flex-col transition-colors duration-300`}
    >
      <header className="sticky top-0 z-40 bg-[var(--lh-bg)]/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <Link href="/demo/lovely-hair" className="flex items-center gap-3">
            <Image
              src="/logo-lovelyhair.png"
              alt="Lovely Hair"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="font-semibold text-lg tracking-wide">Lovely Hair</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-[13px] uppercase tracking-[0.12em] text-[var(--lh-ink-soft)]">
            <Link href="/demo/lovely-hair" className="hover:text-[var(--lh-ink)] transition-colors">
              Inicio
            </Link>
            <Link
              href="/demo/lovely-hair/servicios"
              className="hover:text-[var(--lh-ink)] transition-colors"
            >
              Servicios
            </Link>
            <a href="#resenas" className="hover:text-[var(--lh-ink)] transition-colors">
              Reseñas
            </a>
            <a href="#contacto" className="hover:text-[var(--lh-ink)] transition-colors">
              Contacto
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--lh-invert-bg)] text-[var(--lh-invert-ink)] text-[13px] font-medium tracking-wide px-5 py-2.5 rounded-full hover:opacity-85 transition-opacity"
            >
              Reservar hora
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer id="contacto" className="bg-[var(--lh-invert-bg)] text-[var(--lh-invert-ink)]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 grid gap-10 md:grid-cols-3">
          <div>
            <span className="font-semibold text-xl">Lovely Hair</span>
            <p className="mt-3 text-sm opacity-60 max-w-xs">
              Tobalaba 1517, Local 4, Providencia, Santiago.
            </p>
          </div>
          <div className="text-sm">
            <div className="uppercase tracking-[0.12em] text-[11px] opacity-50 mb-3">
              Horario
            </div>
            <p className="opacity-80">Martes a sábado</p>
            <p className="opacity-80">10:00 – 19:30</p>
          </div>
          <div className="text-sm">
            <div className="uppercase tracking-[0.12em] text-[11px] opacity-50 mb-3">
              Contacto
            </div>
            <p className="opacity-80">+56 9 5796 5110</p>
            <a
              href="https://www.instagram.com/lovelyhairchile/"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-1 opacity-80 hover:opacity-100"
            >
              @lovelyhairchile
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 underline underline-offset-4"
            >
              Reservar hora →
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-10 pb-8 text-[11px] opacity-40">
          Demo — contenido y precios de referencia, no definitivos.
        </div>
      </footer>
    </div>
  );
}
