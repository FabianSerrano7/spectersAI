"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, SERVICES, getServicesByCategory, type Service } from "../data";
import { formatCLP } from "../ui";

function ServiceCard({ service, image }: { service: Service; image: string }) {
  return (
    <Link href={`/demo/lovely-hair/servicios/${service.slug}`} className="group block">
      <div className="relative aspect-[4/3] rounded-2xl mb-3 overflow-hidden">
        <Image
          src={image}
          alt={service.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:opacity-90 transition-opacity"
        />
        {service.badge ? (
          <span className="absolute top-3 left-3 bg-[var(--lh-bg)] text-[var(--lh-ink)] text-[10px] uppercase tracking-[0.1em] font-medium px-2.5 py-1 rounded-full">
            {service.badge}
          </span>
        ) : null}
      </div>
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold text-lg">{service.name}</h3>
        <span className="text-[13px] text-[var(--lh-ink)]/60 whitespace-nowrap ml-3">
          {service.sizes ? "Desde " : ""}
          {formatCLP(service.basePrice)}
        </span>
      </div>
      <p className="text-[12px] text-[var(--lh-ink)]/40 mt-0.5">{service.duration}</p>
      <p className="text-[13px] text-[var(--lh-ink)]/55 mt-1 leading-relaxed">
        {service.shortDescription}
      </p>
    </Link>
  );
}

export default function ServiciosCatalog() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return SERVICES.filter((s) => {
      const matchesCategory = !activeCategory || s.category === activeCategory;
      return matchesCategory && s.name.toLowerCase().includes(normalizedQuery);
    });
  }, [isSearching, activeCategory, normalizedQuery]);

  const categoriesToShow = activeCategory
    ? CATEGORIES.filter((c) => c.slug === activeCategory)
    : CATEGORIES;

  return (
    <div>
      <div className="sticky top-20 z-30 -mx-6 md:-mx-10 px-6 md:px-10 py-3 bg-[var(--lh-bg)]/95 backdrop-blur mb-12">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar un servicio…"
          className="w-full md:max-w-xs bg-[var(--lh-surface)] border border-[var(--lh-border)] rounded-full px-4 py-2 text-[13px] placeholder:text-[var(--lh-ink)]/40 focus:outline-none focus:border-[var(--lh-ink)]/30"
        />
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-[13px] font-medium border transition-colors ${
              !activeCategory
                ? "bg-[var(--lh-invert-bg)] text-[var(--lh-invert-ink)] border-[var(--lh-invert-bg)]"
                : "border-[var(--lh-ink)]/15 text-[var(--lh-ink)]/65 hover:border-[var(--lh-ink)]/40"
            }`}
          >
            Todas
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setActiveCategory(cat.slug)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-[13px] font-medium border transition-colors ${
                activeCategory === cat.slug
                  ? "bg-[var(--lh-invert-bg)] text-[var(--lh-invert-ink)] border-[var(--lh-invert-bg)]"
                  : "border-[var(--lh-ink)]/15 text-[var(--lh-ink)]/65 hover:border-[var(--lh-ink)]/40"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {isSearching ? (
        searchResults.length ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((service) => {
              const cat = CATEGORIES.find((c) => c.slug === service.category)!;
              return <ServiceCard key={service.slug} service={service} image={cat.image} />;
            })}
          </div>
        ) : (
          <p className="text-[var(--lh-ink)]/50 text-[14px]">
            No encontramos servicios para “{query}”.
          </p>
        )
      ) : (
        <div className="space-y-20">
          {categoriesToShow.map((cat) => {
            const services = getServicesByCategory(cat.slug);
            return (
              <section key={cat.slug} id={cat.slug} className="scroll-mt-40">
                <div className="mb-8">
                  <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl">
                    {cat.name}
                  </h2>
                  <span className="block text-[13px] text-[var(--lh-ink)]/50 mt-1">
                    {cat.tagline}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <ServiceCard key={service.slug} service={service} image={cat.image} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
