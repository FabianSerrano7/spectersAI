"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function CategoriaFilter({ categorias }: { categorias: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activa = searchParams.get("categoria") ?? "";

  function elegir(categoria: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (categoria) next.set("categoria", categoria);
    else next.delete("categoria");
    router.push(`${pathname}?${next.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5 mb-5">
      <span className="text-xs font-medium mr-0.5" style={{ color: "var(--muted)" }}>
        Categoría:
      </span>
      <button
        type="button"
        onClick={() => elegir("")}
        className="text-xs font-medium px-3 py-1.5 rounded-full border transition-colors"
        style={{
          borderColor: activa === "" ? "var(--ink)" : "var(--border)",
          background: activa === "" ? "var(--ink)" : "transparent",
          color: activa === "" ? "var(--page)" : "var(--ink-2)",
        }}
      >
        Todas
      </button>
      {categorias.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => elegir(c)}
          className="text-xs font-medium px-3 py-1.5 rounded-full border transition-colors"
          style={{
            borderColor: activa === c ? "var(--ink)" : "var(--border)",
            background: activa === c ? "var(--ink)" : "transparent",
            color: activa === c ? "var(--page)" : "var(--ink-2)",
          }}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
