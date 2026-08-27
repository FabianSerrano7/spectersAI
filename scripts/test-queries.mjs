import { getResumenMetricas, getCuadrantes, getClientasEnriquecidas, getSerieMensual } from "../lib/db/queries.ts";

const kpis = await getResumenMetricas();
console.log("=== 6 MÉTRICAS ===");
for (const k of kpis) console.log(`${k.etiqueta.padEnd(24)} ${k.valor.padEnd(16)} ${k.contexto}`);

const clientas = await getClientasEnriquecidas();
console.log("\n=== CLIENTAS ===");
console.log("total:", clientas.length);
console.log("primera:", clientas[0]);

const cuadrantes = await getCuadrantes();
console.log("\n=== CUADRANTES ===");
for (const c of cuadrantes) console.log(`${c.nivel.padEnd(16)} ${c.estado.padEnd(10)} ${c.clientas} clientas  $${c.gastoTotal.toLocaleString('es-CL')}`);

const mensual = await getSerieMensual();
console.log("\n=== MENSUAL (últimos 3) ===");
console.log(mensual.slice(-3));
