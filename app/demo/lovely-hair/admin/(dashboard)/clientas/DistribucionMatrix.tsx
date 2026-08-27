import Link from "next/link";
import { getCuadrantes } from "@/lib/db/queries";
import type { Period } from "@/lib/date-range";
import { clp, NIVEL_COLORS, ESTADO_COLORS } from "../../ui";
import DateRangeFilter from "../../DateRangeFilter";

const NIVELES = ["Power", "Regular", "Casual", "Low", "Sin visitas 12m"];
const ESTADOS = ["Activa", "En fuga", "Perdida", "1 visita"];

// Agrega transparencia a un color hex (#rrggbb + alpha en hex de 2 dígitos),
// para dar dos intensidades del mismo tono según cuántas clientas trae la celda.
function conAlpha(hex: string, alpha: string): string {
  return `${hex}${alpha}`;
}

export default async function DistribucionMatrix({
  period,
  dateParams,
  abierta,
}: {
  period: Period;
  dateParams: { preset?: string; desde?: string; hasta?: string };
  abierta: boolean;
}) {
  const celdas = await getCuadrantes(period.hasta);
  const max = Math.max(...celdas.map((c) => c.clientas), 1);
  const total = celdas.reduce((a, c) => a + c.clientas, 0);

  const find = (nivel: string, estado: string) =>
    celdas.find((c) => c.nivel === nivel && c.estado === estado);

  function hrefCelda(nivel: string, estado: string): string {
    const qs = new URLSearchParams();
    qs.set("nivel", nivel);
    qs.set("estado", estado);
    if (dateParams.preset) qs.set("preset", dateParams.preset);
    if (dateParams.desde) qs.set("desde", dateParams.desde);
    if (dateParams.hasta) qs.set("hasta", dateParams.hasta);
    return `/demo/lovely-hair/admin/clientas?${qs.toString()}`;
  }

  return (
    <details
      className="rounded-2xl border mb-4"
      open={abierta}
      style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "var(--shadow-card)" }}
    >
      <summary className="text-sm font-semibold cursor-pointer select-none p-4">
        Distribución por nivel × estado
        <span className="font-normal ml-1.5" style={{ color: "var(--muted)" }}>
          ({total.toLocaleString("es-CL")} clientas, al cierre de {period.label})
        </span>
      </summary>
      <div className="px-4 pb-4">
        <DateRangeFilter />
        <p className="text-[11px] mb-2" style={{ color: "var(--muted)" }}>
          Color = estado de la columna (mismo criterio que los chips de Clientas); más saturado, más clientas.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-separate" style={{ borderSpacing: 2 }}>
            <thead>
              <tr>
                <th className="text-left text-[10px] uppercase tracking-wide px-1.5 py-1" style={{ color: "var(--muted)" }}>
                  Nivel \ Estado
                </th>
                {ESTADOS.map((e) => (
                  <th key={e} className="text-[10px] uppercase tracking-wide px-1.5 py-1" style={{ color: "var(--muted)" }}>
                    {e}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {NIVELES.map((nivel) => {
                const nivelColor = NIVEL_COLORS[nivel];
                return (
                  <tr key={nivel}>
                    <td className="px-1.5 py-1 whitespace-nowrap">
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded"
                        style={{
                          background: nivelColor?.bg ?? "var(--surface-2)",
                          color: nivelColor?.color ?? "var(--ink-2)",
                        }}
                      >
                        {nivel}
                      </span>
                    </td>
                    {ESTADOS.map((estado) => {
                      const c = find(nivel, estado);
                      const t = c ? c.clientas / max : 0;
                      const estadoColor = ESTADO_COLORS[estado];
                      const fuerte = t > 0.35;
                      const bg = !c
                        ? "transparent"
                        : fuerte
                          ? estadoColor.bg
                          : conAlpha(estadoColor.bg, "26");
                      const color = !c ? "var(--muted)" : fuerte ? estadoColor.color : "var(--ink)";
                      const contenido = c ? (
                        <>
                          <div className="font-display text-sm">{c.clientas}</div>
                          <div className="text-[9px] opacity-80">{clp(c.gastoTotal)}</div>
                        </>
                      ) : (
                        <span className="text-xs" style={{ color: "var(--muted)" }}>—</span>
                      );
                      return (
                        <td key={estado} className="text-center rounded-lg p-0" style={{ background: bg, color }}>
                          {c ? (
                            <Link
                              href={hrefCelda(nivel, estado)}
                              className="block px-2 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
                            >
                              {contenido}
                            </Link>
                          ) : (
                            <div className="px-2 py-1.5">{contenido}</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </details>
  );
}
