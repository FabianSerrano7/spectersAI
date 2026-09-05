import { ChevronLeft, ChevronRight } from "lucide-react";

export function clp(n: number): string {
  return "$" + Math.round(n).toLocaleString("es-CL");
}

/** Versión compacta en millones, para etiquetas donde no cabe el monto completo (ej. sobre puntos de un gráfico). */
export function clpMillones(n: number): string {
  const millones = n / 1_000_000;
  const texto = millones >= 10 || Number.isInteger(millones) ? millones.toFixed(0) : millones.toFixed(1);
  return `$${texto}M`;
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-7">
      <span
        className="text-[11px] uppercase tracking-widest font-semibold"
        style={{ color: "var(--lab)" }}
      >
        {eyebrow}
      </span>
      <h1 className="font-display text-2xl md:text-3xl mt-1.5">{title}</h1>
      {subtitle ? (
        <p className="mt-2 text-sm max-w-2xl" style={{ color: "var(--ink-2)" }}>
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

export function Card({
  title,
  subtitle,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${className}`}
      style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "var(--shadow-card)" }}
    >
      {title ? <p className="text-sm font-semibold mb-0.5">{title}</p> : null}
      {subtitle ? (
        <p className="text-xs mb-3" style={{ color: "var(--muted)" }}>
          {subtitle}
        </p>
      ) : null}
      {children}
    </div>
  );
}

export function TrendBadge({ dir, label }: { dir: "up" | "down"; label: string }) {
  const color = dir === "up" ? "var(--good)" : "var(--lab)";
  return (
    <span
      className="inline-flex items-center gap-0.5 text-[11px] font-semibold px-1.5 py-0.5 rounded-full"
      style={{ color, background: dir === "up" ? "var(--good-soft)" : "var(--lab-soft)" }}
    >
      {dir === "up" ? "↑" : "↓"} {label}
    </span>
  );
}

export function KpiCard({
  label,
  value,
  context,
  meta,
  icon: Icon,
  trend,
}: {
  label: string;
  value: string;
  context: string;
  meta: string;
  icon?: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  trend?: { dir: "up" | "down"; label: string };
}) {
  return (
    <div
      className="rounded-2xl border p-4 min-w-0"
      style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          {Icon ? (
            <span
              className="inline-flex items-center justify-center rounded-full shrink-0"
              style={{ background: "var(--acc-soft)", color: "var(--ink)", width: 28, height: 28 }}
            >
              <Icon size={14} strokeWidth={2} />
            </span>
          ) : null}
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--ink-2)" }}>
            {label}
          </p>
        </div>
        {trend ? (
          <span className="shrink-0">
            <TrendBadge dir={trend.dir} label={trend.label} />
          </span>
        ) : null}
      </div>
      <p className="font-display text-xl md:text-2xl leading-tight break-words">{value}</p>
      <p className="text-[11px] mt-2" style={{ color: "var(--muted)" }}>
        {context}
      </p>
      <p className="text-[11px] mt-0.5" style={{ color: "var(--acc)" }}>
        Meta: {meta}
      </p>
    </div>
  );
}

const AVATAR_TONES = [
  { bg: "var(--acc-soft)", fg: "var(--ink)" },
  { bg: "var(--lab-soft)", fg: "var(--ink)" },
  { bg: "var(--surface-2)", fg: "var(--ink-2)" },
];

export function Avatar({ nombre, apellido }: { nombre: string; apellido: string }) {
  const iniciales = `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase() || "—";
  const hash = `${nombre}${apellido}`
    .split("")
    .reduce((a, c) => a + c.charCodeAt(0), 0);
  const tone = AVATAR_TONES[hash % AVATAR_TONES.length];
  return (
    <span
      className="inline-flex items-center justify-center rounded-full text-[11px] font-semibold shrink-0"
      style={{ background: tone.bg, color: tone.fg, width: 28, height: 28 }}
    >
      {iniciales}
    </span>
  );
}

export function Pagination({
  page,
  totalPages,
  total,
  pageSize,
  onChange,
}: {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;
  const desde = (page - 1) * pageSize + 1;
  const hasta = Math.min(page * pageSize, total);
  return (
    <div className="flex items-center justify-between gap-3 mt-3 text-xs" style={{ color: "var(--muted)" }}>
      <span>
        {desde.toLocaleString("es-CL")}–{hasta.toLocaleString("es-CL")} de {total.toLocaleString("es-CL")}
      </span>
      <div
        className="flex items-center gap-2 rounded-full p-1"
        style={{ background: "var(--surface-2)" }}
      >
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
          aria-label="Página anterior"
          className="flex items-center justify-center rounded-full transition-opacity disabled:opacity-30"
          style={{ width: 28, height: 28, background: "var(--ink)", color: "var(--page)" }}
        >
          <ChevronLeft size={15} strokeWidth={2.5} />
        </button>
        <span className="text-xs font-semibold tabular-nums px-1" style={{ color: "var(--ink)" }}>
          {page} / {totalPages}
        </span>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1)}
          aria-label="Página siguiente"
          className="flex items-center justify-center rounded-full transition-opacity disabled:opacity-30"
          style={{ width: 28, height: 28, background: "var(--ink)", color: "var(--page)" }}
        >
          <ChevronRight size={15} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

export const th = "text-left text-[11px] uppercase tracking-wide px-3 py-2 font-semibold sticky top-0";
export const thStyle = { color: "#ffffff", background: "#0f1115" };
export const td = "px-3 py-2 text-sm border-t";
export const tdStyle = { borderColor: "var(--border)" };

// Paleta compartida de clasificación de clientas: verde gradual por nivel
// de uso, semáforo por estado. Se usa en la tabla de Clientas, sus chips
// de filtro, y la matriz de Distribución para que el mismo color siempre
// signifique lo mismo en todo el panel.
export const NIVEL_COLORS: Record<string, { bg: string; color: string }> = {
  Power: { bg: "#15803d", color: "#ffffff" },
  Regular: { bg: "#4ade80", color: "#052e16" },
  Casual: { bg: "#bbf7d0", color: "#14532d" },
  Low: { bg: "#ecfdf5", color: "#166534" },
};

export const ESTADO_COLORS: Record<string, { bg: string; color: string }> = {
  Activa: { bg: "#16a34a", color: "#ffffff" },
  "En fuga": { bg: "#eab308", color: "#422006" },
  Perdida: { bg: "#dc2626", color: "#ffffff" },
  "1 visita": { bg: "#9333ea", color: "#ffffff" },
};

export function Tag({
  children,
  tone = "neutral",
  bg: bgOverride,
  color: colorOverride,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "good" | "warn";
  bg?: string;
  color?: string;
}) {
  const bg = bgOverride ?? (tone === "good" ? "var(--acc-soft)" : tone === "warn" ? "var(--lab-soft)" : "var(--surface-2)");
  const color = colorOverride ?? (tone === "good" ? "var(--ink)" : tone === "warn" ? "var(--ink)" : "var(--ink-2)");
  return (
    <span
      className="inline-block text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded"
      style={{ background: bg, color }}
    >
      {children}
    </span>
  );
}
