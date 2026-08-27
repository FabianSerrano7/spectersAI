// Prueba puntual: corre el pipeline de importación contra los archivos
// reales de Lovely Hair y compara contra los KPIs ya publicados en el
// análisis. Requiere DATABASE_URL. Uso:
//   DATABASE_URL=... node --import tsx scripts/test-ingest.mjs
import { readFileSync } from "node:fs";
import { ingestArchivos } from "../lib/import/ingest.ts";

const DIR = "/Users/fabianserrano/Downloads/Lovely Hair";

function toArrayBuffer(buf) {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

const reservasBuffer = toArrayBuffer(readFileSync(`${DIR}/HISTORIAL de reservas.xlsx`));
const listadoBuffer = toArrayBuffer(readFileSync(`${DIR}/Listado de clientes.xlsx`));

console.log("Corriendo ingest...");
const resumen = await ingestArchivos({
  reservasBuffer,
  listadoBuffer,
  uploadedBy: "test-script",
});
console.log(JSON.stringify(resumen, null, 2));
