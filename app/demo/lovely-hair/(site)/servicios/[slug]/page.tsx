import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, SERVICES, getService } from "../../data";
import { StarRating } from "../../ui";
import ServiceInteractive from "./ServiceInteractive";
import ProductGallery from "./ProductGallery";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  return { title: service ? `${service.name} — Lovely Hair` : "Lovely Hair" };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const category = CATEGORIES.find((c) => c.slug === service.category);
  const mainImage = category?.image ?? CATEGORIES[0].image;
  const thumbnails = CATEGORIES.filter((c) => c.slug !== service.category)
    .slice(0, 4)
    .map((c) => c.image);

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-12">
      <div className="text-[13px] text-[var(--lh-ink)]/50 mb-8">
        <Link href="/demo/lovely-hair" className="hover:text-[var(--lh-ink)]">
          Inicio
        </Link>
        {" / "}
        <Link href="/demo/lovely-hair/servicios" className="hover:text-[var(--lh-ink)]">
          Servicios
        </Link>
        {" / "}
        <span className="text-[var(--lh-ink)]/70">{service.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Galería */}
        <div>
          {/* Mobile: carrusel con puntos, para no obligar a hacer scroll infinito */}
          <div className="md:hidden">
            <ProductGallery images={[mainImage, ...thumbnails]} alt={service.name} />
          </div>

          {/* Desktop: foto principal + grid de miniaturas */}
          <div className="hidden md:block">
            <div className="relative aspect-square rounded-[24px] mb-3 overflow-hidden">
              <Image
                src={mainImage}
                alt={service.name}
                fill
                sizes="50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {thumbnails.map((src) => (
                <div key={src} className="relative aspect-square rounded-xl overflow-hidden">
                  <Image src={src} alt="" fill sizes="150px" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[var(--lh-ink)]/6 text-[var(--lh-ink)]/70 text-[11px] uppercase tracking-[0.1em] font-medium px-3 py-1 rounded-full">
              {category?.name}
            </span>
            {service.badge ? (
              <span className="bg-[var(--lh-accent-soft)] text-[var(--lh-ink)] text-[11px] uppercase tracking-[0.1em] font-medium px-3 py-1 rounded-full">
                {service.badge}
              </span>
            ) : null}
          </div>

          <div className="flex items-center gap-3">
            <StarRating rating={service.rating} count={service.reviewCount} />
            <span className="text-[var(--lh-ink)]/30">·</span>
            <span className="text-[13px] text-[var(--lh-ink)]/55">{service.duration}</span>
          </div>

          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight">
            {service.name}
          </h1>
          <p className="mt-3 text-[var(--lh-ink)]/65 leading-relaxed">{service.description}</p>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {service.perks.map((perk) => (
              <span
                key={perk}
                className="flex items-center gap-1.5 text-[13px] text-[var(--lh-ink)]/60"
              >
                <span className="text-[var(--lh-accent)]">●</span>
                {perk}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <ServiceInteractive service={service} />
          </div>
        </div>
      </div>

      {/* Reseñas */}
      <section className="mt-24 max-w-2xl">
        <h2 className="font-[family-name:var(--font-display)] text-2xl mb-6">
          Reseñas de este servicio
        </h2>
        <div className="flex items-end gap-6 mb-8">
          <span className="font-[family-name:var(--font-display)] text-5xl">
            {service.rating.toFixed(1)}
          </span>
          <div className="flex-1 space-y-1.5 mb-1">
            {[5, 4, 3, 2, 1].map((star) => {
              const pct =
                star === Math.round(service.rating)
                  ? 78
                  : star === Math.round(service.rating) - 1
                    ? 14
                    : 3;
              return (
                <div
                  key={star}
                  className="flex items-center gap-2 text-[11px] text-[var(--lh-ink)]/50"
                >
                  <span className="w-3">{star}</span>
                  <div className="flex-1 h-1.5 bg-[var(--lh-ink)]/8 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--lh-accent)] rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <p className="text-[13px] text-[var(--lh-ink)]/45">
          {service.reviewCount} clientas calificaron este servicio
        </p>
      </section>
    </div>
  );
}
