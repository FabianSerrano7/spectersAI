export type PeriodPreset = "semana" | "mes" | "3m" | "6m" | "12m" | "ano" | "todo" | "custom";

export type Period = {
  preset: PeriodPreset;
  desde: Date;
  hasta: Date;
  label: string;
  /** Rango real en fechas legibles, ej. "ago 2025 → jun 2026" — siempre visible, no solo el nombre del preset. */
  rangoTexto: string;
};

const MESES_CORTO = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function formatMesAno(d: Date): string {
  return `${MESES_CORTO[d.getMonth()]} ${d.getFullYear()}`;
}

function formatRangoTexto(desde: Date, hasta: Date): string {
  const a = formatMesAno(desde);
  const b = formatMesAno(hasta);
  return a === b ? a : `${a} → ${b}`;
}

export const PRESETS: { value: PeriodPreset; label: string }[] = [
  { value: "semana", label: "Esta semana" },
  { value: "mes", label: "Este mes" },
  { value: "3m", label: "Últimos 3 meses" },
  { value: "6m", label: "Últimos 6 meses" },
  { value: "12m", label: "Últimos 12 meses" },
  { value: "ano", label: "Este año" },
  { value: "todo", label: "Todo el período" },
];

const INICIO_DATOS = new Date(2000, 0, 1);

function inicioDeMes(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function finDeMesHoy(hoy: Date): Date {
  return new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
}

/** Fin del último mes ya cerrado (excluye el mes actual, que suele venir incompleto). */
function finDeMesAnterior(hoy: Date): Date {
  return new Date(hoy.getFullYear(), hoy.getMonth(), 0);
}

/** Rango de exactamente `n` meses completos, terminando en el último mes cerrado. */
function ultimosNMeses(hoy: Date, n: number): { desde: Date; hasta: Date } {
  const hasta = finDeMesAnterior(hoy);
  const desde = new Date(hasta.getFullYear(), hasta.getMonth() - (n - 1), 1);
  return { desde, hasta };
}

/** Resuelve el rango elegido desde los searchParams de la página (preset o desde/hasta custom). */
export function resolvePeriod(
  searchParams: {
    preset?: string;
    desde?: string;
    hasta?: string;
  },
  defaultPreset: PeriodPreset = "12m",
): Period {
  const hoy = new Date();

  if (searchParams.desde && searchParams.hasta) {
    const desde = parseMonthInput(searchParams.desde) ?? inicioDeMes(hoy);
    const hastaMes = parseMonthInput(searchParams.hasta) ?? hoy;
    const hasta = new Date(hastaMes.getFullYear(), hastaMes.getMonth() + 1, 0);
    return {
      preset: "custom",
      desde,
      hasta,
      label: formatRangoTexto(desde, hasta),
      rangoTexto: formatRangoTexto(desde, hasta),
    };
  }

  const preset = (searchParams.preset as PeriodPreset) || defaultPreset;
  const armar = (p: PeriodPreset, desde: Date, hasta: Date, label: string): Period => ({
    preset: p,
    desde,
    hasta,
    label,
    rangoTexto: formatRangoTexto(desde, hasta),
  });

  switch (preset) {
    case "semana": {
      const diaSemana = (hoy.getDay() + 6) % 7; // lunes=0 ... domingo=6
      const inicioSemana = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - diaSemana);
      return armar(preset, inicioSemana, hoy, "Esta semana");
    }
    case "mes":
      return armar(preset, inicioDeMes(hoy), hoy, "Este mes");
    case "3m": {
      const r = ultimosNMeses(hoy, 3);
      return armar(preset, r.desde, r.hasta, "Últimos 3 meses");
    }
    case "6m": {
      const r = ultimosNMeses(hoy, 6);
      return armar(preset, r.desde, r.hasta, "Últimos 6 meses");
    }
    case "ano":
      return armar(preset, new Date(hoy.getFullYear(), 0, 1), finDeMesHoy(hoy), "Este año");
    case "todo":
      return armar(preset, INICIO_DATOS, finDeMesHoy(hoy), "Todo el período");
    case "12m":
    default: {
      const r = ultimosNMeses(hoy, 12);
      return armar("12m", r.desde, r.hasta, "Últimos 12 meses");
    }
  }
}

/** El período inmediatamente anterior, de igual duración, para comparar KPIs. */
export function periodoAnterior(p: Period): { desde: Date; hasta: Date } {
  const duracionMs = p.hasta.getTime() - p.desde.getTime();
  return {
    desde: new Date(p.desde.getTime() - duracionMs),
    hasta: new Date(p.desde.getTime() - 1),
  };
}

function parseMonthInput(v: string): Date | null {
  const m = /^(\d{4})-(\d{2})$/.exec(v);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, 1);
}

export function formatMonthInput(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
