import { cache } from "react";
import { sql } from "drizzle-orm";
import { db } from "./client";
import { serviciosCatalogo } from "./schema";

export type ClienteEnriquecido = {
  id: string;
  nombre: string;
  apellido: string;
  telefono: string | null;
  email: string | null;
  cumpleDia: number | null;
  cumpleMes: number | null;
  cumpleAno: number | null;
  visitas: number;
  gastoTotal: number;
  primeraVisita: string | null;
  ultimaVisita: string | null;
  visitas12m: number;
  inversion12m: number;
  diasSinVenir: number | null;
  servicioFavorito: string | null;
  nivel: "Power" | "Regular" | "Casual" | "Low" | "Sin visitas 12m";
  estado: "Activa" | "En fuga" | "Perdida" | "1 visita";
};

/**
 * Una fila enriquecida por clienta: nivel de uso (últimos 12 meses) y
 * estado (según días sin venir), calculados con las mismas reglas que el
 * análisis de Fase 0 (ver lib/import/normalize.ts para el resto del
 * pipeline). Memoizado por request para no repetir la consulta si varias
 * páginas la necesitan en el mismo render.
 */
function fechaSql(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export const getClientasEnriquecidas = cache(
  async (asOf: Date = new Date()): Promise<ClienteEnriquecido[]> => {
    const asOfStr = fechaSql(asOf);
    const rows = await db.execute<{
      id: string;
      nombre: string;
      apellido: string;
      telefono: string | null;
      email: string | null;
      cumple_dia: number | null;
      cumple_mes: number | null;
      cumple_ano: number | null;
      visitas: number;
      gasto_total: string;
      primera_visita: string | null;
      ultima_visita: string | null;
      visitas_12m: number;
      inversion_12m: string;
      dias_sin_venir: number | null;
      servicio_favorito: string | null;
    }>(sql`
      WITH fav AS (
        SELECT DISTINCT ON (cliente_id) cliente_id, servicio_base
        FROM reservas
        GROUP BY cliente_id, servicio_base
        ORDER BY cliente_id, count(*) DESC
      ),
      r12 AS (
        SELECT cliente_id, count(*) AS visitas12, sum(precio_real) AS inv12
        FROM reservas
        WHERE fecha >= ${asOfStr}::date - INTERVAL '365 days' AND fecha <= ${asOfStr}::date
        GROUP BY cliente_id
      )
      SELECT
        c.id, c.nombre, c.apellido, c.telefono, c.email,
        c.cumple_dia, c.cumple_mes, c.cumple_ano, c.visitas, c.gasto_total,
        c.primera_visita, c.ultima_visita,
        COALESCE(r12.visitas12, 0) AS visitas_12m,
        COALESCE(r12.inv12, 0) AS inversion_12m,
        CASE WHEN c.ultima_visita IS NULL THEN NULL
             ELSE (${asOfStr}::date - c.ultima_visita) END AS dias_sin_venir,
        fav.servicio_base AS servicio_favorito
      FROM clientas c
      LEFT JOIN r12 ON r12.cliente_id = c.id
      LEFT JOIN fav ON fav.cliente_id = c.id
      ORDER BY c.gasto_total DESC
    `);

    return (rows.rows as unknown as Record<string, unknown>[]).map((r) => {
      const visitas = Number(r.visitas);
      const visitas12m = Number(r.visitas_12m);
      const inv12m = Number(r.inversion_12m);
      const dias = r.dias_sin_venir === null ? null : Number(r.dias_sin_venir);

      let nivel: ClienteEnriquecido["nivel"];
      if (visitas12m === 0) nivel = "Sin visitas 12m";
      else if (visitas12m >= 5 || inv12m >= 250000) nivel = "Power";
      else if (visitas12m >= 3 || inv12m >= 120000) nivel = "Regular";
      else if (visitas12m === 2) nivel = "Casual";
      else nivel = "Low";

      let estado: ClienteEnriquecido["estado"];
      if (visitas === 1) estado = "1 visita";
      else if (dias === null) estado = "Perdida";
      else if (dias <= 90) estado = "Activa";
      else if (dias <= 180) estado = "En fuga";
      else estado = "Perdida";

      return {
        id: String(r.id),
        nombre: String(r.nombre ?? ""),
        apellido: String(r.apellido ?? ""),
        telefono: (r.telefono as string) ?? null,
        email: (r.email as string) ?? null,
        cumpleDia: r.cumple_dia === null ? null : Number(r.cumple_dia),
        cumpleMes: r.cumple_mes === null ? null : Number(r.cumple_mes),
        cumpleAno: r.cumple_ano === null ? null : Number(r.cumple_ano),
        visitas,
        gastoTotal: Number(r.gasto_total),
        primeraVisita: (r.primera_visita as string) ?? null,
        ultimaVisita: (r.ultima_visita as string) ?? null,
        visitas12m,
        inversion12m: inv12m,
        diasSinVenir: dias,
        servicioFavorito: (r.servicio_favorito as string) ?? null,
        nivel,
        estado,
      };
    });
  },
);

export type FilaMensual = {
  mes: string; // "YYYY-MM"
  ingreso: number;
  visitas: number;
  clientasNuevas: number;
};

export const getSerieMensual = cache(async (): Promise<FilaMensual[]> => {
  const rows = await db.execute<{
    mes: string;
    ingreso: string;
    visitas: number;
  }>(sql`
    SELECT to_char(fecha, 'YYYY-MM') AS mes,
           sum(precio_real) AS ingreso,
           count(*) AS visitas
    FROM reservas
    GROUP BY 1
    ORDER BY 1
  `);

  const nuevasRows = await db.execute<{ mes: string; nuevas: number }>(sql`
    SELECT to_char(primera_visita, 'YYYY-MM') AS mes, count(*) AS nuevas
    FROM clientas
    WHERE primera_visita IS NOT NULL
    GROUP BY 1
  `);
  const nuevasPorMes = new Map(
    (nuevasRows.rows as unknown as Record<string, unknown>[]).map((r) => [
      String(r.mes),
      Number(r.nuevas),
    ]),
  );

  return (rows.rows as unknown as Record<string, unknown>[]).map((r) => ({
    mes: String(r.mes),
    ingreso: Number(r.ingreso),
    visitas: Number(r.visitas),
    clientasNuevas: nuevasPorMes.get(String(r.mes)) ?? 0,
  }));
});

export type Kpi = {
  clave: string;
  etiqueta: string;
  valor: string;
  contexto: string;
  meta: string;
  trend?: { dir: "up" | "down"; label: string };
};

/**
 * Las 6 métricas clave para el rango elegido, comparadas contra el período
 * inmediatamente anterior de igual duración. Sin `range`, por defecto son
 * los últimos 12 meses vs. los 12 anteriores (comportamiento original).
 */
export const getResumenMetricas = cache(async (range?: { desde: Date; hasta: Date }) => {
  const hoy = new Date();
  const hasta = range?.hasta ?? hoy;
  const desde = range?.desde ?? new Date(hoy.getFullYear(), hoy.getMonth() - 12, 1);
  const duracionMeses = Math.max(
    1,
    (hasta.getFullYear() - desde.getFullYear()) * 12 + (hasta.getMonth() - desde.getMonth()) + 1,
  );
  const desdeAnterior = new Date(desde.getFullYear(), desde.getMonth() - duracionMeses, 1);
  const hastaAnterior = new Date(desde.getFullYear(), desde.getMonth(), 0);

  const [clientas, mensual] = await Promise.all([
    getClientasEnriquecidas(hasta),
    getSerieMensual(),
  ]);

  const enRango = (rDesde: Date, rHasta: Date) =>
    mensual.filter((m) => {
      const [y, mo] = m.mes.split("-").map(Number);
      const d = new Date(y, mo - 1, 1);
      return d >= rDesde && d <= rHasta;
    });

  const actual = enRango(desde, hasta);
  const anterior = enRango(desdeAnterior, hastaAnterior);
  const sum = (arr: FilaMensual[], key: "ingreso" | "visitas" | "clientasNuevas") =>
    arr.reduce((a, m) => a + m[key], 0);

  const ingresoMensual = sum(actual, "ingreso") / duracionMeses;
  const ingresoMensualPrev = anterior.length ? sum(anterior, "ingreso") / duracionMeses : 0;
  const visitasActual = sum(actual, "visitas");
  const ticketProm = visitasActual ? sum(actual, "ingreso") / visitasActual : 0;
  const visitasPrev = sum(anterior, "visitas");
  const ticketPromPrev = visitasPrev ? sum(anterior, "ingreso") / visitasPrev : 0;
  const nuevasMes = sum(actual, "clientasNuevas") / duracionMeses;
  const nuevasMesPrev = anterior.length ? sum(anterior, "clientasNuevas") / duracionMeses : 0;

  const recurrentes = clientas.filter((c) => c.visitas >= 2);
  const activas = recurrentes.filter((c) => c.estado === "Activa");
  const enFuga = recurrentes.filter((c) => c.estado === "En fuga");
  const conCumple = clientas.filter((c) => c.cumpleDia !== null);

  const pct = (a: number, b: number) =>
    b === 0 ? "—" : `${a >= b ? "+" : ""}${(((a - b) / b) * 100).toFixed(1)}%`;
  const trend = (a: number, b: number): Kpi["trend"] =>
    b === 0 ? undefined : { dir: a >= b ? "up" : "down", label: pct(a, b) };

  const kpis: Kpi[] = [
    {
      clave: "ingreso_mensual",
      etiqueta: "Ingreso mensual (promedio)",
      valor: clp(ingresoMensual),
      contexto: `${pct(ingresoMensual, ingresoMensualPrev)} vs período anterior · promedio de ${duracionMeses} mes${duracionMeses === 1 ? "" : "es"}`,
      meta: "+15% con la reactivación",
      trend: trend(ingresoMensual, ingresoMensualPrev),
    },
    {
      clave: "ticket_promedio",
      etiqueta: "Ticket promedio (por visita)",
      valor: clp(ticketProm),
      contexto: `${pct(ticketProm, ticketPromPrev)} vs período anterior · ingreso del período / visitas del período`,
      meta: "+8% con combos y upsell",
      trend: trend(ticketProm, ticketPromPrev),
    },
    {
      clave: "clientas_nuevas",
      etiqueta: "Clientas nuevas (promedio/mes)",
      valor: nuevasMes.toFixed(0),
      contexto: `venían ${nuevasMesPrev.toFixed(0)}/mes en el período anterior`,
      meta: "Volver a 30/mes",
      trend: trend(nuevasMes, nuevasMesPrev),
    },
    {
      clave: "clientas_activas",
      etiqueta: "Clientas activas (al cierre)",
      valor: `${activas.length} de ${recurrentes.length}`,
      contexto: recurrentes.length
        ? `${((activas.length / recurrentes.length) * 100).toFixed(0)}% de las recurrentes, no un promedio`
        : "—",
      meta: "Subir el % de activas",
    },
    {
      clave: "clientas_fuga",
      etiqueta: "Clientas en fuga (al cierre)",
      valor: String(enFuga.length),
      contexto: "90–180 días sin venir, conteo al cierre del período",
      meta: "Bajar con la reactivación",
    },
    {
      clave: "base_cumple",
      etiqueta: "Base con cumpleaños (hoy)",
      valor: `${conCumple.length} de ${clientas.length}`,
      contexto: clientas.length
        ? `${((conCumple.length / clientas.length) * 100).toFixed(1)}%`
        : "—",
      meta: "60% en 6 meses",
    },
  ];

  return kpis;
});

export type CeldaCuadrante = {
  nivel: string;
  estado: string;
  clientas: number;
  gastoTotal: number;
};

export const getCuadrantes = cache(async (asOf: Date = new Date()): Promise<CeldaCuadrante[]> => {
  const clientas = await getClientasEnriquecidas(asOf);
  const niveles = ["Power", "Regular", "Casual", "Low", "Sin visitas 12m"];
  const estados = ["Activa", "En fuga", "Perdida", "1 visita"];
  const celdas: CeldaCuadrante[] = [];
  for (const nivel of niveles) {
    for (const estado of estados) {
      const grupo = clientas.filter((c) => c.nivel === nivel && c.estado === estado);
      if (!grupo.length) continue;
      celdas.push({
        nivel,
        estado,
        clientas: grupo.length,
        gastoTotal: grupo.reduce((a, c) => a + c.gastoTotal, 0),
      });
    }
  }
  return celdas;
});

export type ServicioCatalogo = {
  id: number;
  nombre: string;
  categoria: string;
  tallas: string[];
  precio: number;
  costo: number;
  utilidad: number;
  margen: number | null; // null si precio es 0
  activo: boolean;
};

export const getServiciosCatalogo = cache(
  async (): Promise<ServicioCatalogo[]> => {
    const rows = await db.select().from(serviciosCatalogo).orderBy(serviciosCatalogo.nombre);
    return rows.map((r) => {
      const precio = Number(r.precio);
      const costo = Number(r.costo);
      const utilidad = precio - costo;
      return {
        id: r.id,
        nombre: r.nombre,
        categoria: r.categoria,
        tallas: r.tallas,
        precio,
        costo,
        utilidad,
        margen: precio > 0 ? utilidad / precio : null,
        activo: r.activo,
      };
    });
  },
);

/** Categorías reales del catálogo, para poblar el <select> del formulario. */
export const getCategoriasServicios = cache(async (): Promise<string[]> => {
  const rows = await db.execute<{ categoria: string }>(sql`
    SELECT DISTINCT categoria FROM reservas ORDER BY categoria
  `);
  return (rows.rows as unknown as { categoria: string }[]).map((r) => r.categoria);
});

export type ServicioTop = { servicio: string; unidades: number; ingreso: number };

/** Servicios más vendidos dentro de un rango de fechas, por ingreso o por unidades. */
export const getTopServicios = cache(
  async (
    range: { desde: Date; hasta: Date },
    limit = 8,
    ordenarPor: "ingreso" | "unidades" = "ingreso",
    categoria?: string,
  ): Promise<ServicioTop[]> => {
    const desdeStr = fechaSql(range.desde);
    const hastaStr = fechaSql(range.hasta);
    const orderCol = ordenarPor === "unidades" ? sql`unidades` : sql`ingreso`;
    const filtroCategoria = categoria ? sql`AND categoria = ${categoria}` : sql``;
    const rows = await db.execute<{ servicio_base: string; unidades: number; ingreso: string }>(sql`
      SELECT servicio_base, count(*) AS unidades, sum(precio_real) AS ingreso
      FROM reservas
      WHERE fecha >= ${desdeStr}::date AND fecha <= ${hastaStr}::date ${filtroCategoria}
      GROUP BY servicio_base
      ORDER BY ${orderCol} DESC
      LIMIT ${limit}
    `);
    return (rows.rows as unknown as Record<string, unknown>[]).map((r) => ({
      servicio: String(r.servicio_base),
      unidades: Number(r.unidades),
      ingreso: Number(r.ingreso),
    }));
  },
);

/**
 * Agrega al catálogo editable los servicios que ya aparecen en `reservas`
 * pero que Pamela nunca cargó a mano — no toca los que ya existen (no pisa
 * precio/costo/activo ya editados). Devuelve cuántos servicios se agregaron.
 */
export async function sincronizarServiciosDesdeReservas(): Promise<number> {
  const result = await db.execute<{ id: number }>(sql`
    INSERT INTO servicios_catalogo (nombre, categoria, tallas, precio, costo, activo)
    SELECT servicio_base, categoria,
           coalesce(array_agg(DISTINCT talla) FILTER (WHERE talla IS NOT NULL), '{}'),
           0, 0, true
    FROM reservas
    GROUP BY servicio_base, categoria
    ON CONFLICT (nombre) DO NOTHING
    RETURNING id
  `);
  return result.rows.length;
}

export type ReservaClienta = {
  servicio: string;
  fecha: string;
  precio: number;
  prestador: string | null;
};

/** Historial de servicios contratados por una clienta, más reciente primero. */
export const getReservasDeClienta = cache(
  async (clienteId: string): Promise<ReservaClienta[]> => {
    const rows = await db.execute<{
      servicio: string;
      fecha: string;
      precio_real: string;
      prestador: string | null;
    }>(sql`
      SELECT servicio, fecha, precio_real, prestador
      FROM reservas
      WHERE cliente_id = ${clienteId}
      ORDER BY fecha DESC
    `);
    return (rows.rows as unknown as Record<string, unknown>[]).map((r) => ({
      servicio: String(r.servicio),
      fecha: String(r.fecha),
      precio: Number(r.precio_real),
      prestador: (r.prestador as string) ?? null,
    }));
  },
);

export type MetricasServicios = {
  ventasTotales: number;
  unidadesVendidas: number;
  ticketPromedio: number;
  serviciosActivos: number;
};

/** Métricas de venta del catálogo dentro de un rango de fechas. */
export const getMetricasServicios = cache(
  async (range: { desde: Date; hasta: Date }, categoria?: string): Promise<MetricasServicios> => {
    const desdeStr = fechaSql(range.desde);
    const hastaStr = fechaSql(range.hasta);
    const filtroReservas = categoria ? sql`AND categoria = ${categoria}` : sql``;
    const filtroCatalogo = categoria ? sql`AND categoria = ${categoria}` : sql``;
    const [ventas, activos] = await Promise.all([
      db.execute<{ ventas_totales: string | null; unidades: string }>(sql`
        SELECT sum(precio_real) AS ventas_totales, count(*) AS unidades
        FROM reservas
        WHERE fecha >= ${desdeStr}::date AND fecha <= ${hastaStr}::date ${filtroReservas}
      `),
      db.execute<{ count: string }>(sql`
        SELECT count(*) FROM servicios_catalogo WHERE activo = true ${filtroCatalogo}
      `),
    ]);
    const filaVentas = ventas.rows[0] as unknown as Record<string, unknown>;
    const ventasTotales = Number(filaVentas?.ventas_totales ?? 0);
    const unidadesVendidas = Number(filaVentas?.unidades ?? 0);
    return {
      ventasTotales,
      unidadesVendidas,
      ticketPromedio: unidadesVendidas > 0 ? ventasTotales / unidadesVendidas : 0,
      serviciosActivos: Number((activos.rows[0] as unknown as Record<string, unknown>)?.count ?? 0),
    };
  },
);

export type VentaCronologica = {
  id: number;
  servicio: string;
  cantidad: number;
  fecha: string;
  precio: number;
  clienta: string;
};

/** Todas las reservas (ventas) individuales, en orden cronológico. */
export const getVentasCronologico = cache(
  async (): Promise<VentaCronologica[]> => {
    const rows = await db.execute<{
      id: number;
      servicio: string;
      fecha: string;
      precio_real: string;
      nombre: string;
      apellido: string;
    }>(sql`
      SELECT r.id, r.servicio, r.fecha, r.precio_real, c.nombre, c.apellido
      FROM reservas r
      JOIN clientas c ON c.id = r.cliente_id
      ORDER BY r.fecha DESC
    `);
    return (rows.rows as unknown as Record<string, unknown>[]).map((r) => ({
      id: Number(r.id),
      servicio: String(r.servicio),
      cantidad: 1,
      fecha: String(r.fecha),
      precio: Number(r.precio_real),
      clienta: `${r.nombre ?? ""} ${r.apellido ?? ""}`.trim() || "—",
    }));
  },
);

export type VentasResumen = {
  cantidad: number;
  volumen: number;
  promedio: number;
  porCategoria: { categoria: string; cantidad: number; volumen: number }[];
};

/** Resumen de ventas (cantidad, volumen, ticket promedio) en un rango, con desglose por categoría. */
export const getVentasResumen = cache(
  async (range: { desde: Date; hasta: Date }): Promise<VentasResumen> => {
    const desdeStr = fechaSql(range.desde);
    const hastaStr = fechaSql(range.hasta);
    const [totales, categorias] = await Promise.all([
      db.execute<{ cantidad: string; volumen: string | null }>(sql`
        SELECT count(*) AS cantidad, sum(precio_real) AS volumen
        FROM reservas
        WHERE fecha >= ${desdeStr}::date AND fecha <= ${hastaStr}::date
      `),
      db.execute<{ categoria: string; cantidad: string; volumen: string }>(sql`
        SELECT categoria, count(*) AS cantidad, sum(precio_real) AS volumen
        FROM reservas
        WHERE fecha >= ${desdeStr}::date AND fecha <= ${hastaStr}::date
        GROUP BY categoria
        ORDER BY volumen DESC
      `),
    ]);
    const filaTotales = totales.rows[0] as unknown as Record<string, unknown>;
    const cantidad = Number(filaTotales?.cantidad ?? 0);
    const volumen = Number(filaTotales?.volumen ?? 0);
    return {
      cantidad,
      volumen,
      promedio: cantidad > 0 ? volumen / cantidad : 0,
      porCategoria: (categorias.rows as unknown as Record<string, unknown>[]).map((r) => ({
        categoria: String(r.categoria),
        cantidad: Number(r.cantidad),
        volumen: Number(r.volumen),
      })),
    };
  },
);

export function clp(n: number): string {
  return "$" + Math.round(n).toLocaleString("es-CL");
}
