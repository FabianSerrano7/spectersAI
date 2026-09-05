import ServiciosCatalog from "./ServiciosCatalog";

export const metadata = {
  title: "Servicios — Lovely Hair",
};

export default function ServiciosPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
      <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--lh-ink)]/50">
        Catálogo
      </span>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl md:text-5xl mb-4">
        Nuestros servicios
      </h1>
      <p className="text-[var(--lh-ink)]/60 max-w-lg mb-10">
        Un catálogo corto, pensado para que elegir sea fácil.
      </p>

      <ServiciosCatalog />
    </div>
  );
}
