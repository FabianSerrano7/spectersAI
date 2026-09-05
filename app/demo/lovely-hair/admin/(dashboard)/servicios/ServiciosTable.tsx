"use client";

import { useMemo, useState } from "react";
import type { ServicioCatalogo } from "@/lib/db/queries";
import { Pagination, th, thStyle } from "../../ui";
import { ServicioRow, NuevoServicioRow } from "./ServicioForm";
import ServicioModal from "./ServicioModal";
import { eliminarServicios } from "./actions";

const PAGE_SIZE = 20;

type Columna = "nombre" | "categoria" | "precio" | "costo" | "utilidad" | "margen";

export default function ServiciosTable({
  servicios,
  categorias,
}: {
  servicios: ServicioCatalogo[];
  categorias: string[];
}) {
  const [q, setQ] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState<string | null>(null);
  const [orden, setOrden] = useState<{ col: Columna; dir: "asc" | "desc" } | null>(null);
  const [page, setPage] = useState(1);
  const [seleccion, setSeleccion] = useState<Set<number>>(new Set());
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [borrando, setBorrando] = useState(false);

  const categoriaCounts = useMemo(() => {
    const conteo = new Map<string, number>();
    for (const s of servicios) conteo.set(s.categoria, (conteo.get(s.categoria) ?? 0) + 1);
    return categorias
      .map((c) => ({ categoria: c, count: conteo.get(c) ?? 0 }))
      .filter((c) => c.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [servicios, categorias]);

  const filtrados = useMemo(() => {
    const query = q.trim().toLowerCase();
    let lista = servicios;
    if (categoriaFiltro) {
      lista = lista.filter((s) => s.categoria === categoriaFiltro);
    }
    if (query) {
      lista = lista.filter(
        (s) => s.nombre.toLowerCase().includes(query) || s.categoria.toLowerCase().includes(query),
      );
    }
    if (orden) {
      lista = [...lista].sort((a, b) => {
        const av = a[orden.col];
        const bv = b[orden.col];
        const cmp = typeof av === "string" ? av.localeCompare(String(bv)) : Number(av ?? 0) - Number(bv ?? 0);
        return orden.dir === "asc" ? cmp : -cmp;
      });
    }
    return lista;
  }, [servicios, categoriaFiltro, q, orden]);

  const filtroKey = `${q}|${categoriaFiltro}|${orden?.col}|${orden?.dir}`;
  const [prevFiltroKey, setPrevFiltroKey] = useState(filtroKey);
  if (filtroKey !== prevFiltroKey) {
    setPrevFiltroKey(filtroKey);
    setPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(filtrados.length / PAGE_SIZE));
  const pagina = filtrados.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const paginaSeleccionadaCompleta = pagina.length > 0 && pagina.every((s) => seleccion.has(s.id));
  const servicioEditando = servicios.find((s) => s.id === editandoId) ?? null;

  function ordenarPor(col: Columna) {
    setOrden((prev) =>
      prev?.col === col ? { col, dir: prev.dir === "asc" ? "desc" : "asc" } : { col, dir: "asc" },
    );
  }

  function flecha(col: Columna) {
    if (orden?.col !== col) return "";
    return orden.dir === "asc" ? " ↑" : " ↓";
  }

  function toggleUno(id: number) {
    setSeleccion((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleTodosPagina() {
    setSeleccion((prev) => {
      const next = new Set(prev);
      if (paginaSeleccionadaCompleta) {
        pagina.forEach((s) => next.delete(s.id));
      } else {
        pagina.forEach((s) => next.add(s.id));
      }
      return next;
    });
  }

  async function borrarSeleccionados() {
    if (seleccion.size === 0) return;
    if (!confirm(`¿Borrar ${seleccion.size} servicio${seleccion.size === 1 ? "" : "s"} seleccionado${seleccion.size === 1 ? "" : "s"}?`)) return;
    setBorrando(true);
    await eliminarServicios([...seleccion]);
    setSeleccion(new Set());
    setBorrando(false);
  }

  function exportarCsv() {
    const base = seleccion.size > 0 ? servicios.filter((s) => seleccion.has(s.id)) : filtrados;
    const encabezado = ["Nombre", "Categoría", "Tallas", "Precio", "Costo", "Utilidad", "Margen", "Activo"];
    const filas = base.map((s) => [
      s.nombre,
      s.categoria,
      s.tallas.join(" "),
      String(s.precio),
      String(s.costo),
      String(s.utilidad),
      s.margen === null ? "" : `${(s.margen * 100).toFixed(0)}%`,
      s.activo ? "Sí" : "No",
    ]);
    const escapar = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const csv = [encabezado, ...filas].map((fila) => fila.map(escapar).join(",")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `servicios-lovely-hair-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-4">
        <button
          type="button"
          onClick={() => setCategoriaFiltro(null)}
          className="rounded-xl border px-3 py-2.5 text-center transition-colors"
          style={{
            background: categoriaFiltro === null ? "var(--ink)" : "var(--surface)",
            borderColor: categoriaFiltro === null ? "var(--ink)" : "var(--border)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div className="font-display text-lg" style={{ color: categoriaFiltro === null ? "var(--page)" : "var(--ink)" }}>
            {servicios.length}
          </div>
          <div
            className="text-[11px] mt-0.5 truncate"
            style={{ color: categoriaFiltro === null ? "var(--page)" : "var(--ink-2)" }}
          >
            Todas
          </div>
        </button>
        {categoriaCounts.map(({ categoria, count }) => {
          const activa = categoriaFiltro === categoria;
          return (
            <button
              key={categoria}
              type="button"
              onClick={() => setCategoriaFiltro(activa ? null : categoria)}
              className="rounded-xl border px-3 py-2.5 text-center transition-colors"
              style={{
                background: activa ? "var(--ink)" : "var(--surface)",
                borderColor: activa ? "var(--ink)" : "var(--border)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="font-display text-lg" style={{ color: activa ? "var(--page)" : "var(--ink)" }}>
                {count}
              </div>
              <div
                className="text-[11px] mt-0.5 truncate"
                style={{ color: activa ? "var(--page)" : "var(--ink-2)" }}
                title={categoria}
              >
                {categoria}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nombre o categoría…"
          className="flex-1 min-w-[220px] rounded-full px-4 py-2 text-sm border outline-none"
          style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--ink)" }}
        />
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          {seleccion.size > 0
            ? `${seleccion.size.toLocaleString("es-CL")} seleccionados`
            : `${filtrados.length.toLocaleString("es-CL")} de ${servicios.length.toLocaleString("es-CL")}`}
        </span>
        {seleccion.size > 0 ? (
          <button
            type="button"
            onClick={borrarSeleccionados}
            disabled={borrando}
            className="text-xs font-semibold px-3 py-1.5 rounded-full border disabled:opacity-50"
            style={{ borderColor: "var(--border)", color: "var(--lab)" }}
          >
            {borrando ? "Borrando…" : "Borrar seleccionados"}
          </button>
        ) : null}
        <button
          type="button"
          onClick={exportarCsv}
          disabled={filtrados.length === 0}
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
              <th className={th} style={{ ...thStyle, width: 36 }}>
                <input type="checkbox" checked={paginaSeleccionadaCompleta} onChange={toggleTodosPagina} />
              </th>
              <th className={th} style={thStyle}>
                <button type="button" onClick={() => ordenarPor("nombre")}>Servicio{flecha("nombre")}</button>
              </th>
              <th className={th} style={thStyle}>
                <button type="button" onClick={() => ordenarPor("categoria")}>Categoría{flecha("categoria")}</button>
              </th>
              <th className={th} style={thStyle}>Tallas</th>
              <th className={th} style={{ ...thStyle, textAlign: "right" }}>
                <button type="button" onClick={() => ordenarPor("precio")}>Precio{flecha("precio")}</button>
              </th>
              <th className={th} style={{ ...thStyle, textAlign: "right" }}>
                <button type="button" onClick={() => ordenarPor("costo")}>Costo{flecha("costo")}</button>
              </th>
              <th className={th} style={{ ...thStyle, textAlign: "right" }}>
                <button type="button" onClick={() => ordenarPor("utilidad")}>Utilidad{flecha("utilidad")}</button>
              </th>
              <th className={th} style={{ ...thStyle, textAlign: "right" }}>
                <button type="button" onClick={() => ordenarPor("margen")}>Margen{flecha("margen")}</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {pagina.map((s) => (
              <ServicioRow
                key={s.id}
                servicio={s}
                seleccionado={seleccion.has(s.id)}
                onToggleSeleccion={() => toggleUno(s.id)}
                onClick={() => setEditandoId(s.id)}
              />
            ))}
            {pagina.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-sm py-4 px-3" style={{ color: "var(--muted)" }}>
                  Sin resultados.
                </td>
              </tr>
            ) : null}
            <NuevoServicioRow categorias={categorias} />
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        total={filtrados.length}
        pageSize={PAGE_SIZE}
        onChange={setPage}
      />

      <ServicioModal servicio={servicioEditando} categorias={categorias} onClose={() => setEditandoId(null)} />
    </div>
  );
}
