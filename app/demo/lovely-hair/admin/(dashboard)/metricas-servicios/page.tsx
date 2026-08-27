import { CircleDollarSign, Receipt, ShoppingBag, CheckCircle2 } from "lucide-react";
import { getServiciosCatalogo, getMetricasServicios, getTopServicios, getCategoriasServicios } from "@/lib/db/queries";
import { resolvePeriod } from "@/lib/date-range";
import { PageHeader, KpiCard, Card, clp } from "../../ui";
import { BarRanking } from "../../charts";
import DateRangeFilter from "../../DateRangeFilter";
import CategoriaFilter from "./CategoriaFilter";

export default async function MetricasServiciosPage({
  searchParams,
}: {
  searchParams: Promise<{ preset?: string; desde?: string; hasta?: string; categoria?: string }>;
}) {
  const params = await searchParams;
  const period = resolvePeriod(params);
  const categoria = params.categoria || undefined;

  const [servicios, categorias, metricas, topPorCantidad, topPorVolumen] = await Promise.all([
    getServiciosCatalogo(),
    getCategoriasServicios(),
    getMetricasServicios({ desde: period.desde, hasta: period.hasta }, categoria),
    getTopServicios({ desde: period.desde, hasta: period.hasta }, 8, "unidades", categoria),
    getTopServicios({ desde: period.desde, hasta: period.hasta }, 8, "ingreso", categoria),
  ]);

  return (
    <div>
      <PageHeader
        eyebrow="Servicios"
        title="Métricas de venta por servicio"
        subtitle="Ticket promedio, ventas totales y estado del catálogo para el período y la categoría elegidos abajo."
      />
      <DateRangeFilter />
      <CategoriaFilter categorias={categorias} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <KpiCard
          label="Ventas totales"
          value={clp(metricas.ventasTotales)}
          context={period.label}
          meta="Sumatoria de reservas del período"
          icon={CircleDollarSign}
        />
        <KpiCard
          label="Ticket promedio"
          value={clp(metricas.ticketPromedio)}
          context={`${metricas.unidadesVendidas.toLocaleString("es-CL")} servicios vendidos`}
          meta="Ventas / unidades vendidas"
          icon={Receipt}
        />
        <KpiCard
          label="Unidades vendidas"
          value={metricas.unidadesVendidas.toLocaleString("es-CL")}
          context={period.label}
          meta="Reservas con estado Asiste"
          icon={ShoppingBag}
        />
        <KpiCard
          label="Servicios activos"
          value={metricas.serviciosActivos.toLocaleString("es-CL")}
          context={categoria ? `en ${categoria}` : `de ${servicios.length.toLocaleString("es-CL")} en el catálogo`}
          meta="Estado del catálogo, no del período"
          icon={CheckCircle2}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Más vendidos por cantidad" subtitle={period.label}>
          <BarRanking
            items={topPorCantidad.map((s) => ({ label: s.servicio, value: s.unidades }))}
            formatValue={(v) => `${v.toLocaleString("es-CL")} ${v === 1 ? "venta" : "ventas"}`}
          />
        </Card>
        <Card title="Más vendidos por volumen de venta" subtitle={period.label}>
          <BarRanking
            items={topPorVolumen.map((s) => ({ label: s.servicio, value: s.ingreso }))}
            formatValue={clp}
          />
        </Card>
      </div>
    </div>
  );
}
