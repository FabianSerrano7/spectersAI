import { ShoppingBag, CircleDollarSign, Receipt } from "lucide-react";
import { getVentasCronologico, getVentasResumen } from "@/lib/db/queries";
import { resolvePeriod } from "@/lib/date-range";
import { PageHeader, KpiCard, Card, clp } from "../../ui";
import { BarRanking } from "../../charts";
import DateRangeFilter from "../../DateRangeFilter";
import VentasTable from "./VentasTable";

export default async function VentasPage({
  searchParams,
}: {
  searchParams: Promise<{ preset?: string; desde?: string; hasta?: string }>;
}) {
  const params = await searchParams;
  const period = resolvePeriod(params, "semana");

  const [ventas, resumen] = await Promise.all([
    getVentasCronologico(),
    getVentasResumen({ desde: period.desde, hasta: period.hasta }),
  ]);

  return (
    <div>
      <PageHeader
        eyebrow="Ventas"
        title="Historial de ventas"
        subtitle="Cada servicio vendido, en orden cronológico (más reciente primero). Las tarjetas de abajo resumen el período elegido."
      />
      <DateRangeFilter defaultPreset="semana" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <KpiCard
          label="Ventas"
          value={resumen.cantidad.toLocaleString("es-CL")}
          context={period.label}
          meta="Cantidad de servicios vendidos"
          icon={ShoppingBag}
        />
        <KpiCard
          label="Volumen"
          value={clp(resumen.volumen)}
          context={period.label}
          meta="Suma de ventas del período"
          icon={CircleDollarSign}
        />
        <KpiCard
          label="Venta promedio"
          value={clp(resumen.promedio)}
          context={period.label}
          meta="Volumen / cantidad de ventas"
          icon={Receipt}
        />
      </div>
      <Card className="mb-4" title="Por categoría" subtitle={period.label}>
        <BarRanking
          items={resumen.porCategoria.map((c) => ({ label: c.categoria, value: c.volumen }))}
          formatValue={clp}
        />
      </Card>
      <VentasTable ventas={ventas} />
    </div>
  );
}
