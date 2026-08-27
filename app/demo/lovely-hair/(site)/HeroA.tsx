import Image from "next/image";
import Link from "next/link";
import { HERO_IMAGE, getCategoryImage, SERVICES } from "./data";

const BOOKING_URL = "https://lovelyhair.site.agendapro.com";

export default function HeroA() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--lh-ink)]/50">
          Peluquería · Providencia
        </span>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl md:text-6xl leading-[1.05]">
          Un salón <span className="text-[var(--lh-accent)]">boutique</span>, hecho a la medida de tu pelo
        </h1>
        <p className="mt-6 text-[var(--lh-ink)]/70 text-lg max-w-md">
          Estilistas certificadas y productos profesionales, en cada servicio.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <Link
            href="/demo/lovely-hair/servicios"
            className="bg-[var(--lh-invert-bg)] text-[var(--lh-invert-ink)] px-7 py-3.5 rounded-full text-sm font-medium tracking-wide hover:opacity-85 transition-opacity"
          >
            Ver servicios
          </Link>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium underline underline-offset-4"
          >
            Reservar hora
          </a>
        </div>
        <div className="mt-12 flex items-center gap-8">
          <div>
            <div className="font-[family-name:var(--font-display)] text-3xl">1.100+</div>
            <div className="text-[12px] text-[var(--lh-ink)]/50 uppercase tracking-wide mt-1">
              Clientas atendidas
            </div>
          </div>
          <div className="w-px h-10 bg-[var(--lh-ink)]/15" />
          <div>
            <div className="font-[family-name:var(--font-display)] text-3xl">{SERVICES.length}+</div>
            <div className="text-[12px] text-[var(--lh-ink)]/50 uppercase tracking-wide mt-1">
              Servicios para tu pelo
            </div>
          </div>
          <div className="w-px h-10 bg-[var(--lh-ink)]/15" />
          <div>
            <div className="font-[family-name:var(--font-display)] text-3xl">45d</div>
            <div className="text-[12px] text-[var(--lh-ink)]/50 uppercase tracking-wide mt-1">
              Vuelven en promedio
            </div>
          </div>
        </div>
      </div>
      <div className="relative grid grid-cols-[1.4fr_1fr] gap-3 h-[520px]">
        <div className="relative rounded-[28px] overflow-hidden">
          <Image
            src={HERO_IMAGE}
            alt="Estilista trabajando en el cabello de una clienta en Lovely Hair"
            fill
            sizes="(max-width: 768px) 60vw, 35vw"
            className="object-cover"
            priority
          />
          <div className="absolute bottom-4 left-4 right-4 bg-[var(--lh-bg)]/95 backdrop-blur rounded-2xl pl-3 pr-2 py-3 flex items-center gap-3 shadow-lg border border-[var(--lh-border)]">
            <span className="w-10 h-10 rounded-full bg-[var(--lh-accent)] flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-[var(--lh-invert-bg)]"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <div className="flex-1">
              <div className="text-[13px] font-semibold text-[var(--lh-ink)]">
                Acreditadas por K18
              </div>
              <div className="text-[11px] text-[var(--lh-ink)]/55">Tecnología capilar profesional</div>
            </div>
            <span className="text-[11px] font-semibold text-[var(--lh-ink)] bg-[var(--lh-accent-soft)] px-2.5 py-1 rounded-full shrink-0">
              K18
            </span>
          </div>
        </div>
        <div className="grid grid-rows-2 gap-3">
          <div className="relative rounded-[24px] overflow-hidden">
            <Image
              src={getCategoryImage("coloraciones")}
              alt="Coloración de cabello en Lovely Hair"
              fill
              sizes="(max-width: 768px) 30vw, 18vw"
              className="object-cover"
            />
          </div>
          <div className="relative rounded-[24px] overflow-hidden">
            <Image
              src={getCategoryImage("peinados")}
              alt="Peinado de evento en Lovely Hair"
              fill
              sizes="(max-width: 768px) 30vw, 18vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
