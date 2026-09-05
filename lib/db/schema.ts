import {
  pgTable,
  serial,
  text,
  integer,
  numeric,
  timestamp,
  date,
  boolean,
  unique,
} from "drizzle-orm/pg-core";

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Identidad resuelta de cada clienta (cruce N° cliente / email / teléfono).
export const clientas = pgTable("clientas", {
  id: text("id").primaryKey(), // "cli:<n° cliente>" | "em:<email>" | "te:<tel8>"
  nombre: text("nombre").notNull().default(""),
  apellido: text("apellido").notNull().default(""),
  telefono: text("telefono"),
  email: text("email"),
  cumpleDia: integer("cumple_dia"),
  cumpleMes: integer("cumple_mes"),
  cumpleAno: integer("cumple_ano"),
  primeraVisita: date("primera_visita"),
  ultimaVisita: date("ultima_visita"),
  visitas: integer("visitas").notNull().default(0),
  gastoTotal: numeric("gasto_total", { precision: 12, scale: 0 })
    .notNull()
    .default("0"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Una fila por servicio vendido. Clave de dedup: cliente + servicio + fecha exacta + precio.
export const reservas = pgTable(
  "reservas",
  {
    id: serial("id").primaryKey(),
    clienteId: text("cliente_id")
      .notNull()
      .references(() => clientas.id, { onDelete: "cascade" }),
    servicio: text("servicio").notNull(), // nombre original de AgendaPro
    servicioBase: text("servicio_base").notNull(), // agrupado (sin talla)
    talla: text("talla"),
    categoria: text("categoria").notNull(),
    fecha: timestamp("fecha", { withTimezone: false }).notNull(), // fecha+hora exacta
    precioReal: numeric("precio_real", { precision: 12, scale: 0 }).notNull(),
    prestador: text("prestador"),
    // Ocurrencia (0, 1, 2...) de esta combinación exacta cliente+servicio+
    // fecha+precio DENTRO del archivo importado, en el mismo orden de fila
    // que trae el export. AgendaPro no expone un ID de reserva único y la
    // fecha solo tiene precisión de minuto, así que dos reservas legítimas
    // (ej. dos hermanas, mismo corte, mismo minuto, mismo precio) pueden
    // compartir la misma clave — este ordinal las distingue sin perder
    // ninguna, y sigue siendo estable si se vuelve a subir el mismo archivo.
    filaOrigen: integer("fila_origen").notNull().default(0),
    importBatchId: integer("import_batch_id").references(
      () => importBatches.id,
    ),
  },
  (t) => [
    unique("reservas_dedup").on(
      t.clienteId,
      t.servicio,
      t.fecha,
      t.precioReal,
      t.filaOrigen,
    ),
  ],
);

export const importBatches = pgTable("import_batches", {
  id: serial("id").primaryKey(),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
  uploadedBy: text("uploaded_by"),
  filasHistorial: integer("filas_historial").notNull().default(0),
  filasClientes: integer("filas_clientes").notNull().default(0),
  filasNuevas: integer("filas_nuevas").notNull().default(0), // reservas realmente insertadas (post-dedup)
  periodoMin: date("periodo_min"),
  periodoMax: date("periodo_max"),
  notas: text("notas"),
});

// Dato manual, no viene de AgendaPro: costo y tallas del catálogo vigente.
export const serviciosCatalogo = pgTable("servicios_catalogo", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull().unique(),
  categoria: text("categoria").notNull().default("Otros"),
  tallas: text("tallas").array().notNull().default([]),
  precio: numeric("precio", { precision: 12, scale: 0 }).notNull().default("0"),
  costo: numeric("costo", { precision: 12, scale: 0 }).notNull().default("0"),
  activo: boolean("activo").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
