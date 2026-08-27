// Reglas de negocio portadas 1:1 desde el análisis Python de Fase 0
// (ver ~/Claude/lovely-hair/analisis-fase0.html). No inventar reglas nuevas
// acá sin volver a correr el análisis — estos patrones ya fueron
// verificados contra el catálogo real de Lovely Hair.

const SZ = "XS|S|M|L|XL|XXL";
const COMBO = `(?:${SZ})(?:\\s*(?:y|Y|-|/)\\s*(?:${SZ}))*`;
const TALLA_RE = new RegExp(
  `(\\(\\s*talla\\s+${COMBO}\\s*\\)|\\(\\s*${COMBO}\\s*\\)|\\btalla\\s+${COMBO}\\b|\\s*-\\s*${COMBO}\\b)`,
  "i",
);

const ORDEN_TALLAS = ["XS", "S", "M", "L", "XL", "XXL"];

/** "Coloración Global - L" -> "Coloración Global" */
export function servicioBase(nombre: string): string {
  const sinTalla = nombre.replace(TALLA_RE, " ");
  const sinGuionAntesParentesis = sinTalla.replace(/\s*-\s*(?=\()/g, " ");
  return sinGuionAntesParentesis.replace(/\s{2,}/g, " ").trim().replace(/^[-–,\s]+|[-–,\s]+$/g, "");
}

/** "Coloración Global - L" -> "L"; "Ritual K18 TALLA S Y M" -> "S/M" */
export function tallaDe(nombre: string): string | null {
  const m = nombre.match(TALLA_RE);
  if (!m) return null;
  const bruto = m[0].replace(/\(|\)|talla/gi, "").trim();
  const partes = bruto
    .split(/[-/]|\s+y\s+/i)
    .map((p) => p.trim().toUpperCase())
    .filter((p) => ORDEN_TALLAS.includes(p));
  const unicas = [...new Set(partes)].sort(
    (a, b) => ORDEN_TALLAS.indexOf(a) - ORDEN_TALLAS.indexOf(b),
  );
  return unicas.length ? unicas.join("/") : null;
}

const CATS: [string, string[]][] = [
  ["Uñas, maquillaje y otros", ["manicure", "uñas", "pestañ", "maquillaje", "depilac", "cejas", "barba"]],
  ["Pack/Promo", ["pack", "martes", "miércoles", "miercoles", "jueves", "lovely pack", "promo"]],
  ["Alisado/Botox", ["alisado", "keratina", "botox", "btx", "bio-tox", "nanoplast", "bioplastia", "antifrizz"]],
  ["Color", ["color", "retoque", "raíz", "raiz", "mecha", "babylight", "balayage", "decolor", "tinte", "iluminac", "visos", "crecimiento", "permanente", "fondo", "bloques", "blondie", "matiz"]],
  ["Corte", ["corte", "despunte", "flequillo"]],
  ["Tratamiento", ["hidrat", "ritual", "nutritiv", "reparac", "k18", "tratamiento", "shine", "olaplex", "ampolla", "masaje", "cristaliz", "detox", "brillo"]],
  ["Peinado y lavado", ["peinado", "brushing", "ondas", "recogido", "moño", "trenza", "plancha", "lavado", "secado"]],
];

export function categoriaDe(servicioBaseNombre: string): string {
  const s = servicioBaseNombre.toLowerCase();
  for (const [cat, keys] of CATS) {
    if (keys.some((k) => s.includes(k))) return cat;
  }
  return "Otros";
}

/** Últimos 8 dígitos del teléfono, o null si no alcanza a formar uno válido. */
export function telefono8(raw: unknown): string | null {
  if (raw === null || raw === undefined) return null;
  const digitos = String(raw).replace(/\D/g, "");
  return digitos.length >= 8 ? digitos.slice(-8) : null;
}

export function emailNormalizado(raw: unknown): string | null {
  if (raw === null || raw === undefined) return null;
  const e = String(raw).trim().toLowerCase();
  return e ? e : null;
}

export function nClienteNormalizado(raw: unknown): string | null {
  if (raw === null || raw === undefined || raw === "") return null;
  const n = Math.trunc(Number(raw));
  return Number.isFinite(n) ? String(n) : null;
}

/**
 * Identidad resuelta: prioriza N° de Cliente de AgendaPro, luego email,
 * luego teléfono. El prefijo evita colisiones entre tipos de clave.
 */
export function resolverIdentidad(row: {
  nCliente: unknown;
  email: unknown;
  telefono: unknown;
}): string | null {
  const nCliente = nClienteNormalizado(row.nCliente);
  if (nCliente) return `cli:${nCliente}`;
  const email = emailNormalizado(row.email);
  if (email) return `em:${email}`;
  const tel = telefono8(row.telefono);
  if (tel) return `te:${tel}`;
  return null;
}

/** "30/06/2026 19:06" (formato AgendaPro, texto plano) -> Date local. */
export function parseFechaAgendaPro(raw: unknown): Date | null {
  if (raw === null || raw === undefined) return null;
  if (raw instanceof Date) return raw;
  const s = String(raw).trim();
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2}))?/);
  if (!m) return null;
  const [, dd, mm, yyyy, hh, min] = m;
  return new Date(
    Number(yyyy),
    Number(mm) - 1,
    Number(dd),
    hh ? Number(hh) : 0,
    min ? Number(min) : 0,
  );
}
