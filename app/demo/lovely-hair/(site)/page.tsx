import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, SERVICES, getCategoryImage } from "./data";
import { StarRating, formatCLP } from "./ui";
import HeroA from "./HeroA";

const BOOKING_URL = "https://lovelyhair.site.agendapro.com";

const STRENGTHS = [
  {
    title: "Clientas que vuelven",
    body: "La mayoría de quienes nos conocen, elige volver. No se compra con publicidad, es calidad de servicio.",
  },
  {
    title: "Acreditadas por K18",
    body: "Salón acreditado por K18 Chile, tecnología capilar reconocida para reparación profunda del cabello.",
  },
  {
    title: "Reservas sin drama",
    body: "Agenda online, recordatorios automáticos, cero esperas innecesarias.",
  },
];

const ABOUT_TEXT =
  "En Lovely Hair se tiene la creencia de que cada persona es única y merece un servicio adaptado a sus necesidades. Siempre abiertos a probar nuevos estilos, buscando estar al tanto de las últimas tendencias y técnicas, para potenciar la imagen personal de cada persona, que se atreva a encontrar su estilo propio y resaltar eso que las hace brillar.";

const FEATURED_SLUGS = [
  "retoque-de-raiz",
  "corte-de-cabello-mujer",
  "pack-shine",
  "corte-de-cabello-hombre",
];

export default function LovelyHairLandingPage() {
  const featured = FEATURED_SLUGS.map((slug) => SERVICES.find((s) => s.slug === slug)!).filter(
    Boolean
  );

  return (
    <div>
      <HeroA />

      {/* Sobre nosotras */}
      <section className="max-w-2xl mx-auto px-6 md:px-10 py-16 md:py-20 text-center">
        <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--lh-ink)]/50">
          / Sobre nosotras
        </span>
        <p className="mt-4 text-lg md:text-xl leading-relaxed text-[var(--lh-ink)]/80">
          {ABOUT_TEXT}
        </p>
      </section>

      {/* Categorías */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--lh-ink)]/50">
            Catálogo
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl md:text-4xl">
            Encuentra lo que buscas
          </h2>
          <p className="mt-3 text-[var(--lh-ink)]/60 text-[14px]">
            Seis categorías, para que elegir sea simple.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/demo/lovely-hair/servicios#${cat.slug}`}
              className="group relative block aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-semibold text-xl text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
                  {cat.name}
                </h3>
                <p className="text-[13px] text-white/80 mt-1 leading-relaxed [text-shadow:0_1px_6px_rgba(0,0,0,0.45)]">
                  {cat.benefitTitle}
                </p>
                <span className="inline-flex items-center gap-1 text-[12px] font-medium mt-3 text-white">
                  Ver servicios <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/demo/lovely-hair/servicios"
            className="inline-flex items-center gap-2 bg-[var(--lh-invert-bg)] text-[var(--lh-invert-ink)] px-6 py-3 rounded-full text-sm font-medium tracking-wide hover:opacity-85 transition-opacity"
          >
            Ver catálogo completo <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* Destacados */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--lh-ink)]/50">
          Recomendados
        </span>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-8">
          Lo más pedido
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((service) => (
            <Link
              key={service.slug}
              href={`/demo/lovely-hair/servicios/${service.slug}`}
              className="group block"
            >
              <div className="relative aspect-square rounded-2xl mb-3 overflow-hidden">
                <Image
                  src={getCategoryImage(service.category)}
                  alt={service.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:opacity-90 transition-opacity"
                />
                {service.badge ? (
                  <span className="absolute top-3 left-3 bg-[var(--lh-bg)] text-[var(--lh-ink)] text-[10px] uppercase tracking-[0.1em] font-medium px-2.5 py-1 rounded-full">
                    {service.badge}
                  </span>
                ) : null}
              </div>
              <h3 className="font-semibold text-base">{service.name}</h3>
              <p className="text-[13px] text-[var(--lh-ink)]/55 mt-0.5">
                Desde {formatCLP(service.basePrice)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="bg-[var(--lh-invert-bg)] text-[var(--lh-invert-ink)]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-3 gap-10">
          {STRENGTHS.map((s) => (
            <div key={s.title}>
              <h3 className="font-semibold text-xl mb-2">{s.title}</h3>
              <p className="opacity-65 text-[14px] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reseñas */}
      <section id="resenas" className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--lh-ink)]/50">
          Reseñas
        </span>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-8">
          Lo que dicen nuestras clientas
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              name: "Javiera R.",
              text: "Llevo 3 años yendo, siempre salgo feliz con el color. Se nota que usan productos buenos.",
            },
            {
              name: "Constanza M.",
              text: "El corte quedó exacto a lo que pedí. La atención es súper cercana, como llegar donde una amiga.",
            },
            {
              name: "Fernanda P.",
              text: "Hice el pack novia y fue perfecto, la prueba de peinado me dio mucha tranquilidad para el día.",
            },
          ].map((r) => (
            <div
              key={r.name}
              className="bg-[var(--lh-surface-soft)] rounded-2xl p-6 border border-[var(--lh-border)]"
            >
              <StarRating rating={5} />
              <p className="text-[14px] text-[var(--lh-ink)]/75 mt-3 leading-relaxed">
                “{r.text}”
              </p>
              <p className="text-[13px] font-medium mt-4">{r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-20">
        <div className="bg-[var(--lh-invert-bg)] rounded-[28px] px-8 py-14 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl max-w-lg mx-auto text-[var(--lh-invert-ink)]">
            Reserva tu próxima hora en un par de clics
          </h2>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-[var(--lh-accent)] text-[var(--lh-invert-bg)] px-7 py-3.5 rounded-full text-sm font-medium tracking-wide hover:opacity-85 transition-opacity"
          >
            Reservar hora
          </a>
        </div>
      </section>
    </div>
  );
}
