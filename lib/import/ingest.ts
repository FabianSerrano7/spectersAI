import { sql, eq } from "drizzle-orm";
import { db } from "../db/client";
import { clientas, reservas, importBatches } from "../db/schema";
import { sincronizarServiciosDesdeReservas } from "../db/queries";
import { parseReservas, parseListadoClientes } from "./parse";
import {
  resolverIdentidad,
  servicioBase,
  tallaDe,
  categoriaDe,
  parseFechaAgendaPro,
  telefono8,
  emailNormalizado,
} from "./normalize";

export type IngestResumen = {
  filasHistorial: number;
  filasAsiste: number;
  filasClientes: number;
  filasNuevas: number;
  identidadesSinResolver: number;
  clientasCumpleBackfill: number;
  periodoMin: string | null;
  periodoMax: string | null;
};

function chunks<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function toIsoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function ingestArchivos(opts: {
  reservasBuffer: ArrayBuffer;
  listadoBuffer: ArrayBuffer | null;
  uploadedBy: string;
}): Promise<IngestResumen> {
  const reservasRaw = parseReservas(opts.reservasBuffer);
  const listadoRaw = opts.listadoBuffer
    ? parseListadoClientes(opts.listadoBuffer)
    : [];

  const asiste = reservasRaw.filter(
    (r) => String(r.estado ?? "").trim() === "Asiste",
  );

  let sinResolver = 0;
  let periodoMin: Date | null = null;
  let periodoMax: Date | null = null;

  const filasParaInsertar: (typeof reservas.$inferInsert)[] = [];
  const ocurrencias = new Map<string, number>();
  const contactos = new Map<
    string,
    { nombre: string; apellido: string; telefono: string | null; email: string | null; fecha: Date }
  >();

  for (const r of asiste) {
    const id = resolverIdentidad({
      nCliente: r.nCliente,
      email: r.email,
      telefono: r.telefono,
    });
    if (!id) {
      sinResolver++;
      continue;
    }
    const fecha = parseFechaAgendaPro(r.fechaRealizacion);
    const servicioNombre = String(r.servicio ?? "").trim();
    if (!fecha || !servicioNombre) continue;

    if (!periodoMin || fecha < periodoMin) periodoMin = fecha;
    if (!periodoMax || fecha > periodoMax) periodoMax = fecha;

    const base = servicioBase(servicioNombre);
    const precio = Math.round(Number(r.precioReal ?? 0));
    const claveOcurrencia = `${id}|${servicioNombre}|${fecha.toISOString()}|${precio}`;
    const ocurrencia = ocurrencias.get(claveOcurrencia) ?? 0;
    ocurrencias.set(claveOcurrencia, ocurrencia + 1);

    filasParaInsertar.push({
      clienteId: id,
      servicio: servicioNombre,
      servicioBase: base,
      talla: tallaDe(servicioNombre),
      categoria: categoriaDe(base),
      fecha,
      precioReal: String(precio),
      filaOrigen: ocurrencia,
      prestador: r.prestador ? String(r.prestador) : null,
    });

    const telRaw = r.telefono ? String(r.telefono) : null;
    const emailNorm = emailNormalizado(r.email);
    const prev = contactos.get(id);
    if (!prev || fecha >= prev.fecha) {
      contactos.set(id, {
        nombre: String(r.nombre ?? "").trim(),
        apellido: String(r.apellido ?? "").trim(),
        telefono: telRaw,
        email: emailNorm,
        fecha,
      });
    }
  }

  // 1) upsert de clientas (identidad + mejor dato de contacto conocido)
  const clientasValues = [...contactos.entries()].map(([id, c]) => ({
    id,
    nombre: c.nombre,
    apellido: c.apellido,
    telefono: c.telefono,
    email: c.email,
  }));

  for (const chunk of chunks(clientasValues, 300)) {
    if (!chunk.length) continue;
    await db
      .insert(clientas)
      .values(chunk)
      .onConflictDoUpdate({
        target: clientas.id,
        set: {
          nombre: sql`excluded.nombre`,
          apellido: sql`excluded.apellido`,
          telefono: sql`coalesce(excluded.telefono, ${clientas.telefono})`,
          email: sql`coalesce(excluded.email, ${clientas.email})`,
          updatedAt: sql`now()`,
        },
      });
  }

  // 2) insertar reservas nuevas (dedup por la unique constraint)
  let filasNuevas = 0;
  for (const chunk of chunks(filasParaInsertar, 300)) {
    if (!chunk.length) continue;
    const inserted = await db
      .insert(reservas)
      .values(chunk)
      .onConflictDoNothing({
        target: [reservas.clienteId, reservas.servicio, reservas.fecha, reservas.precioReal, reservas.filaOrigen],
      })
      .returning({ id: reservas.id });
    filasNuevas += inserted.length;
  }

  // 3) recomputar agregados de TODAS las clientas contra el histórico completo
  //    (no solo el batch nuevo) — así el número siempre es correcto sin
  //    importar cuántas veces se haya re-importado un mes.
  await db.execute(sql`
    UPDATE clientas c SET
      visitas = agg.visitas,
      gasto_total = agg.gasto,
      primera_visita = agg.primera,
      ultima_visita = agg.ultima,
      updated_at = now()
    FROM (
      SELECT cliente_id,
             count(*) AS visitas,
             sum(precio_real) AS gasto,
             min(fecha)::date AS primera,
             max(fecha)::date AS ultima
      FROM reservas
      GROUP BY cliente_id
    ) agg
    WHERE c.id = agg.cliente_id
  `);

  // 4) backfill de cumpleaños desde el listado de clientes (no viene en el historial)
  const porTel = new Map<string, { dia: number; mes: number }>();
  const porEmail = new Map<string, { dia: number; mes: number }>();
  for (const c of listadoRaw) {
    const dia = Number(c.cumpleDia);
    const mes = Number(c.cumpleMes);
    if (!Number.isFinite(dia) || !Number.isFinite(mes) || dia < 1 || mes < 1) continue;
    const tel = telefono8(c.telefono);
    if (tel) porTel.set(tel, { dia, mes });
    const em = emailNormalizado(c.email);
    if (em) porEmail.set(em, { dia, mes });
  }

  let cumpleBackfill = 0;
  if (porTel.size || porEmail.size) {
    const existentes = await db
      .select({
        id: clientas.id,
        telefono: clientas.telefono,
        email: clientas.email,
        cumpleDia: clientas.cumpleDia,
      })
      .from(clientas);

    const aActualizar = existentes
      .filter((c) => c.cumpleDia === null)
      .map((c) => {
        const tel = telefono8(c.telefono);
        const match = (tel && porTel.get(tel)) || (c.email && porEmail.get(c.email));
        return match ? { id: c.id, ...match } : null;
      })
      .filter((x): x is { id: string; dia: number; mes: number } => x !== null);

    for (const chunk of chunks(aActualizar, 100)) {
      await Promise.all(
        chunk.map((b) =>
          db
            .update(clientas)
            .set({ cumpleDia: b.dia, cumpleMes: b.mes, updatedAt: sql`now()` })
            .where(eq(clientas.id, b.id)),
        ),
      );
    }
    cumpleBackfill = aActualizar.length;
  }

  // 5) agregar al catálogo editable los servicios nuevos que aparezcan
  //    (no toca los que Pamela ya editó — ver sincronizarServiciosDesdeReservas)
  await sincronizarServiciosDesdeReservas();

  // 6) registrar el batch
  await db.insert(importBatches).values({
    uploadedBy: opts.uploadedBy,
    filasHistorial: reservasRaw.length,
    filasClientes: listadoRaw.length,
    filasNuevas,
    periodoMin: periodoMin ? toIsoDate(periodoMin) : null,
    periodoMax: periodoMax ? toIsoDate(periodoMax) : null,
  });

  return {
    filasHistorial: reservasRaw.length,
    filasAsiste: asiste.length,
    filasClientes: listadoRaw.length,
    filasNuevas,
    identidadesSinResolver: sinResolver,
    clientasCumpleBackfill: cumpleBackfill,
    periodoMin: periodoMin ? toIsoDate(periodoMin) : null,
    periodoMax: periodoMax ? toIsoDate(periodoMax) : null,
  };
}
