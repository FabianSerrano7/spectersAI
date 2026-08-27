import { CircleDollarSign, Receipt, UserPlus, Users, UserMinus, Cake } from "lucide-react";
import { getResumenMetricas, getSerieMensual, getTopServicios } from "@/lib/db/queries";
import { resolvePeriod, formatMonthInput } from "@/lib/date-range";
import { PageHeader, KpiCard, Card, clp, th, thStyle } from "../ui";
import { LineChart } from "../LineChart";
import DateRangeFilter from "../DateRangeFilter";

const ICONOS: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  ingreso_mensual: CircleDollarSign,
  ticket_promedio: Receipt,
  clientas_nuevas: UserPlus,
  clientas_activas: Users,
  clientas_fuga: UserMinus,
  base_cumple: Cake,
};

export default async function ResumenPage({
  searchParams,
}: {
  searchParams: Promise<{ preset?: string; desde?: string; hasta?: string }>;
}) {
  const params = await searchParams;
  const period = resolvePeriod(params);
  const desdeStr = formatMonthInput(period.desde);
  const hastaStr = formatMonthInput(period.hasta);

  const [kpis, mensual, topServicios] = await Promise.all([
    getResumenMetricas({ desde: period.desde, hasta: period.hasta }),
    getSerieMensual(),
    getTopServicios({ desde: period.desde, hasta: period.hasta }),
  ]);
  const enRango = mensual.filter((m) => m.mes >= desdeStr && m.mes <= hastaStr);

  return (
    <div>
      <PageHeader
        eyebrow="Resumen"
        title="Resumen de tu negocio"
        subtitle="Se recalculan solas cada vez que subes el export mensual de AgendaPro. Ingreso, ticket y clientas nuevas son promedios del período elegido abajo; clientas activas/en fuga y cumpleaños son un conteo al cierre de ese período, no un promedio."
      />
      <DateRangeFilter />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {kpis.map((k) => (
          <KpiCard
            key={k.clave}
            label={k.etiqueta}
            value={k.valor}
            context={k.contexto}
            meta={k.meta}
            icon={ICONOS[k.clave]}
            trend={k.trend}
          />
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <Card title="Ingreso mensual" subtitle={period.label}>
          <LineChart
            data={enRango.map((m) => ({ mes: m.mes, v: m.ingreso }))}
            formato="clp"
            puntoFormato="clpMillones"
          />
        </Card>
        <Card title="Clientas nuevas por mes" subtitle="en rojo, los meses bajo 25">
          <LineChart
            data={enRango.map((m) => ({ mes: m.mes, v: m.clientasNuevas }))}
            formato="numero"
            resaltarBajo={25}
          />
        </Card>
      </div>

      <Card className="mb-4" title="Servicios más vendidos" subtitle={period.label}>
        {topServicios.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Sin ventas en este período.
          </p>
        ) : (
          <div className="flex flex-col gap-1.5">
            {(() => {
              const maxIngreso = Math.max(...topServicios.map((s) => s.ingreso), 1);
              return topServicios.map((s, i) => {
                const pct = (s.ingreso / maxIngreso) * 100;
                return (
                  <div key={s.servicio} className="relative rounded-lg overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0"
                      style={{ width: `${pct}%`, background: "var(--acc-soft)" }}
                    />
                    <div className="relative flex items-center gap-3 px-3 py-2.5">
                      <span
                        className="text-[11px] font-semibold shrink-0 tabular-nums"
                        style={{ color: "var(--muted)", width: 16, textAlign: "right" }}
                      >
                        {i + 1}
                      </span>
                      <span className="flex-1 text-sm font-medium truncate min-w-0" title={s.servicio}>
                        {s.servicio}
                      </span>
                      <span className="text-[11px] shrink-0 whitespace-nowrap" style={{ color: "var(--muted)" }}>
                        {s.unidades} {s.unidades === 1 ? "venta" : "ventas"}
                      </span>
                      <span
                        className="text-sm font-semibold shrink-0 text-right tabular-nums"
                        style={{ minWidth: 92 }}
                      >
                        {clp(s.ingreso)}
                      </span>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        )}
      </Card>

      <details className="rounded-2xl border p-4" style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "var(--shadow-card)" }}>
        <summary className="text-sm font-semibold cursor-pointer select-none">Detalle mensual completo</summary>
        <div className="overflow-auto mt-3 rounded-xl" style={{ maxHeight: 420 }}>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className={th} style={thStyle}>Mes</th>
                <th className={th} style={{ ...thStyle, textAlign: "right" }}>Ingreso</th>
                <th className={th} style={{ ...thStyle, textAlign: "right" }}>Visitas</th>
                <th className={th} style={{ ...thStyle, textAlign: "right" }}>Clientas nuevas</th>
              </tr>
            </thead>
            <tbody>
              {[...mensual].reverse().map((m, i) => (
                <tr key={m.mes} style={{ background: i % 2 === 1 ? "var(--surface-2)" : "transparent" }}>
                  <td className="px-3 py-2">{m.mes}</td>
                  <td className="px-3 py-2 text-right" style={{ fontVariantNumeric: "tabular-nums" }}>{clp(m.ingreso)}</td>
                  <td className="px-3 py-2 text-right" style={{ fontVariantNumeric: "tabular-nums" }}>{m.visitas}</td>
                  <td className="px-3 py-2 text-right" style={{ fontVariantNumeric: "tabular-nums" }}>{m.clientasNuevas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
