"use client";

import { useMemo, useState } from "react";
import type { VentaCronologica } from "@/lib/db/queries";
import { clp, Pagination, th, thStyle, td, tdStyle } from "../../ui";

const PAGE_SIZE = 50;

function formatFecha(f: string): string {
  const d = new Date(f);
  if (Number.isNaN(d.getTime())) return f;
  return d.toLocaleDateString("es-CL");
}

export default function VentasTable({ ventas }: { ventas: VentaCronologica[] }) {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const filtradas = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return ventas;
    return ventas.filter(
      (v) => v.servicio.toLowerCase().includes(query) || v.clienta.toLowerCase().includes(query),
    );
  }, [ventas, q]);

  const [prevQ, setPrevQ] = useState(q);
  if (q !== prevQ) {
    setPrevQ(q);
    setPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(filtradas.length / PAGE_SIZE));
  const pagina = filtradas.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function exportarCsv() {
    const encabezado = ["Servicio", "Cantidad", "Fecha de venta", "Precio", "Clienta"];
    const filas = filtradas.map((v) => [v.servicio, String(v.cantidad), formatFecha(v.fecha), String(v.precio), v.clienta]);
    const escapar = (val: string) => `"${val.replace(/"/g, '""')}"`;
    const csv = [encabezado, ...filas].map((fila) => fila.map(escapar).join(",")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ventas-lovely-hair-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por servicio o clienta…"
          className="flex-1 min-w-[220px] rounded-full px-4 py-2 text-sm border outline-none"
          style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--ink)" }}
        />
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          {filtradas.length.toLocaleString("es-CL")} de {ventas.length.toLocaleString("es-CL")}
        </span>
        <button
          type="button"
          onClick={exportarCsv}
          disabled={filtradas.length === 0}
          className="text-xs font-semibold px-3 py-1.5 rounded-full disabled:opacity-40"
          style={{ background: "var(--acc)", color: "var(--acc-ink)" }}
        >
          Descargar CSV
        </button>
      </div>

      <div
        className="rounded-2xl border overflow-auto"
        style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "var(--shadow-card)", maxHeight: 640 }}
      >
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className={th} style={thStyle}>Servicio</th>
              <th className={th} style={{ ...thStyle, textAlign: "right" }}>Cantidad</th>
              <th className={th} style={{ ...thStyle, whiteSpace: "nowrap" }}>Fecha de venta</th>
              <th className={th} style={{ ...thStyle, textAlign: "right" }}>Precio</th>
              <th className={th} style={thStyle}>Clienta</th>
            </tr>
          </thead>
          <tbody>
            {pagina.map((v, i) => (
              <tr key={v.id} style={{ background: i % 2 === 1 ? "var(--surface-2)" : "transparent" }}>
                <td className={td} style={tdStyle}>{v.servicio}</td>
                <td className={td} style={{ ...tdStyle, textAlign: "right" }}>{v.cantidad}</td>
                <td className={td} style={{ ...tdStyle, whiteSpace: "nowrap" }}>{formatFecha(v.fecha)}</td>
                <td className={td} style={{ ...tdStyle, textAlign: "right" }}>{clp(v.precio)}</td>
                <td className={td} style={tdStyle}>{v.clienta}</td>
              </tr>
            ))}
            {pagina.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-sm py-4 px-3" style={{ color: "var(--muted)" }}>
                  Sin resultados.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        total={filtradas.length}
        pageSize={PAGE_SIZE}
        onChange={setPage}
      />
    </div>
  );
}
