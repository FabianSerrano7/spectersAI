import * as XLSX from "xlsx";

export type ReservaRaw = {
  fechaRealizacion: unknown;
  nCliente: unknown;
  nombre: unknown;
  apellido: unknown;
  email: unknown;
  telefono: unknown;
  servicio: unknown;
  precioReal: unknown;
  prestador: unknown;
  estado: unknown;
};

export type ClienteListadoRaw = {
  email: unknown;
  nombres: unknown;
  apellidos: unknown;
  telefono: unknown;
  cumpleDia: unknown;
  cumpleMes: unknown;
};

function firstSheet(wb: XLSX.WorkBook, preferido: string) {
  const nombre = wb.SheetNames.includes(preferido) ? preferido : wb.SheetNames[0];
  return wb.Sheets[nombre];
}

export function parseReservas(buffer: ArrayBuffer): ReservaRaw[] {
  const wb = XLSX.read(buffer, { type: "array" });
  const ws = firstSheet(wb, "Reservas");
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, {
    defval: null,
  });
  return rows.map((r) => ({
    fechaRealizacion: r["Fecha de realización"],
    nCliente: r["N° de Cliente"],
    nombre: r["Nombre"],
    apellido: r["Apellido"],
    email: r["E-mail"],
    telefono: r["Teléfono"],
    servicio: r["Servicio"],
    precioReal: r["Precio real"],
    prestador: r["Prestador"],
    estado: r["Estado"],
  }));
}

export function parseListadoClientes(buffer: ArrayBuffer): ClienteListadoRaw[] {
  const wb = XLSX.read(buffer, { type: "array" });
  const ws = firstSheet(wb, "sheets3");
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, {
    defval: null,
  });
  return rows.map((r) => ({
    email: r["Email"],
    nombres: r["Nombres"],
    apellidos: r["Apellidos"],
    telefono: r["Teléfono"],
    cumpleDia: r["Día del nacimiento"],
    cumpleMes: r["Mes del nacimiento"],
  }));
}
