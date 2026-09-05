"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import type { ClienteEnriquecido, ReservaClienta } from "@/lib/db/queries";
import { clp, th, thStyle, td, tdStyle, Tag, Avatar, Pagination, NIVEL_COLORS, ESTADO_COLORS } from "../../ui";
import { Modal } from "../../Modal";
import { actualizarCumpleanos, obtenerHistorialClienta } from "./actions";

const PAGE_SIZE = 50;

const NIVELES = ["Power", "Regular", "Casual", "Low", "Sin visitas 12m"];
const ESTADOS = ["Activa", "En fuga", "Perdida", "1 visita"];

const MESES = [
  "", "ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic",
];

function formatCumple(c: ClienteEnriquecido): string {
  return c.cumpleDia && c.cumpleMes
    ? `${c.cumpleDia} ${MESES[c.cumpleMes]}${c.cumpleAno ? ` ${c.cumpleAno}` : ""}`
    : "";
}

function formatFecha(f: string | null): string {
  if (!f) return "—";
  const d = new Date(f);
  if (Number.isNaN(d.getTime())) return f;
  return d.toLocaleDateString("es-CL");
}

export default function ClientasTable({
  clientas,
  initialNivel = null,
  initialEstado = null,
}: {
  clientas: ClienteEnriquecido[];
  initialNivel?: string | null;
  initialEstado?: string | null;
}) {
  const [q, setQ] = useState("");
  const [nivel, setNivel] = useState<string | null>(initialNivel);
  const [estado, setEstado] = useState<string | null>(initialEstado);
  const [page, setPage] = useState(1);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [seleccion, setSeleccion] = useState<Set<string>>(new Set());
  const [detalleId, setDetalleId] = useState<string | null>(null);

  // La matriz de Distribución (arriba, en la misma página) enlaza acá con
  // ?nivel=&estado= — como es una navegación client-side al mismo componente
  // (no un remount), hay que sincronizar el estado interno cuando cambian.
  // Se ajusta durante el render (patrón recomendado por React) en vez de un
  // efecto, para no perder un frame con los filtros viejos.
  const [prevInitialNivel, setPrevInitialNivel] = useState(initialNivel);
  const [prevInitialEstado, setPrevInitialEstado] = useState(initialEstado);
  if (initialNivel !== prevInitialNivel || initialEstado !== prevInitialEstado) {
    setPrevInitialNivel(initialNivel);
    setPrevInitialEstado(initialEstado);
    setNivel(initialNivel);
    setEstado(initialEstado);
  }

  const filtradas = useMemo(() => {
    const query = q.trim().toLowerCase();
    return clientas.filter((c) => {
      if (nivel && c.nivel !== nivel) return false;
      if (estado && c.estado !== estado) return false;
      if (query) {
        const hay = `${c.nombre} ${c.apellido} ${c.telefono ?? ""} ${c.email ?? ""}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });
  }, [clientas, q, nivel, estado]);

  const [prevFiltroKey, setPrevFiltroKey] = useState(`${q}|${nivel}|${estado}`);
  const filtroKey = `${q}|${nivel}|${estado}`;
  if (filtroKey !== prevFiltroKey) {
    setPrevFiltroKey(filtroKey);
    setPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(filtradas.length / PAGE_SIZE));
  const pagina = filtradas.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const paginaSeleccionadaCompleta = pagina.length > 0 && pagina.every((c) => seleccion.has(c.id));
  const clientaDetalle = clientas.find((c) => c.id === detalleId) ?? null;

  function toggleUno(id: string) {
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
        pagina.forEach((c) => next.delete(c.id));
      } else {
        pagina.forEach((c) => next.add(c.id));
      }
      return next;
    });
  }

  function exportarCsv() {
    const base = seleccion.size > 0 ? clientas.filter((c) => seleccion.has(c.id)) : filtradas;
    const encabezado = ["Nombre", "Apellido", "Teléfono", "Correo", "Cumpleaños", "Última visita", "Visitas", "Gasto total", "Nivel", "Estado"];
    const filas = base.map((c) => [
      c.nombre,
      c.apellido,
      c.telefono ?? "",
      c.email ?? "",
      formatCumple(c),
      c.ultimaVisita ?? "",
      String(c.visitas),
      String(c.gastoTotal),
      c.nivel,
      c.estado,
    ]);
    const escapar = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const csv = [encabezado, ...filas].map((fila) => fila.map(escapar).join(",")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clientas-lovely-hair-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar por nombre, teléfono o correo…"
        className="w-full rounded-full px-4 py-2 text-sm border outline-none mb-3"
        style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--ink)" }}
      />
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="text-xs font-medium shrink-0" style={{ color: "var(--muted)", width: 52 }}>
          Nivel:
        </span>
        <Chip active={nivel === null} onClick={() => setNivel(null)}>
          Todos los niveles
        </Chip>
        {NIVELES.map((n) => (
          <Chip
            key={n}
            active={nivel === n}
            onClick={() => setNivel(nivel === n ? null : n)}
            activeBg={NIVEL_COLORS[n]?.bg}
            activeColor={NIVEL_COLORS[n]?.color}
          >
            {n}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs font-medium shrink-0" style={{ color: "var(--muted)", width: 52 }}>
          Estado:
        </span>
        <Chip active={estado === null} onClick={() => setEstado(null)}>
          Todos los estados
        </Chip>
        {ESTADOS.map((e) => (
          <Chip
            key={e}
            active={estado === e}
            onClick={() => setEstado(estado === e ? null : e)}
            activeBg={ESTADO_COLORS[e]?.bg}
            activeColor={ESTADO_COLORS[e]?.color}
          >
            {e}
          </Chip>
        ))}
        <span className="text-xs ml-auto" style={{ color: "var(--muted)" }}>
          {seleccion.size > 0
            ? `${seleccion.size.toLocaleString("es-CL")} seleccionadas`
            : `${filtradas.length.toLocaleString("es-CL")} de ${clientas.length.toLocaleString("es-CL")}`}
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
        style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "var(--shadow-card)", maxHeight: 560 }}
      >
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className={th} style={{ ...thStyle, width: 36 }}>
                <input type="checkbox" checked={paginaSeleccionadaCompleta} onChange={toggleTodosPagina} />
              </th>
              <th className={th} style={thStyle}>Nombre</th>
              <th className={th} style={thStyle}>Apellido</th>
              <th className={th} style={thStyle}>Teléfono</th>
              <th className={th} style={thStyle}>Correo</th>
              <th className={th} style={thStyle}>Cumpleaños</th>
              <th className={th} style={{ ...thStyle, textAlign: "right" }}>Visitas</th>
              <th className={th} style={{ ...thStyle, textAlign: "right" }}>Gasto total</th>
              <th className={th} style={thStyle}>Nivel</th>
              <th className={th} style={thStyle}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {pagina.map((c) => (
              <tr
                key={c.id}
                onClick={() => setDetalleId(c.id)}
                className="cursor-pointer hover:opacity-90"
              >
                <td className={td} style={tdStyle} onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" checked={seleccion.has(c.id)} onChange={() => toggleUno(c.id)} />
                </td>
                <td className={td} style={tdStyle}>
                  <div className="flex items-center gap-2">
                    <Avatar nombre={c.nombre} apellido={c.apellido} />
                    <span>{c.nombre || "—"}</span>
                  </div>
                </td>
                <td className={td} style={tdStyle}>{c.apellido || "—"}</td>
                <td className={td} style={tdStyle}>{c.telefono ?? "—"}</td>
                <td className={td} style={tdStyle}>{c.email ?? "—"}</td>
                <td className={td} style={tdStyle} onClick={(e) => e.stopPropagation()}>
                  <CumpleanosCell
                    clienta={c}
                    editando={editandoId === c.id}
                    onAbrir={() => setEditandoId(c.id)}
                    onCerrar={() => setEditandoId(null)}
                  />
                </td>
                <td className={td} style={{ ...tdStyle, textAlign: "right" }}>{c.visitas}</td>
                <td className={td} style={{ ...tdStyle, textAlign: "right" }}>{clp(c.gastoTotal)}</td>
                <td className={td} style={tdStyle}>
                  <Tag bg={NIVEL_COLORS[c.nivel]?.bg} color={NIVEL_COLORS[c.nivel]?.color}>{c.nivel}</Tag>
                </td>
                <td className={td} style={tdStyle}>
                  <Tag bg={ESTADO_COLORS[c.estado]?.bg} color={ESTADO_COLORS[c.estado]?.color}>{c.estado}</Tag>
                </td>
              </tr>
            ))}
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

      <ClienteDetalleModal clienta={clientaDetalle} onClose={() => setDetalleId(null)} />
    </div>
  );
}

function ClienteDetalleModal({
  clienta,
  onClose,
}: {
  clienta: ClienteEnriquecido | null;
  onClose: () => void;
}) {
  const [historial, setHistorial] = useState<ReservaClienta[] | null>(null);
  const [cargando, startTransition] = useTransition();

  const [trackedClienteId, setTrackedClienteId] = useState<string | null>(clienta?.id ?? null);
  if ((clienta?.id ?? null) !== trackedClienteId) {
    setTrackedClienteId(clienta?.id ?? null);
    setHistorial(null);
  }

  useEffect(() => {
    if (!clienta) return;
    startTransition(async () => {
      const res = await obtenerHistorialClienta(clienta.id);
      setHistorial(res);
    });
  }, [clienta]);

  const conteoServicios = useMemo(() => {
    if (!historial) return [];
    const conteo = new Map<string, number>();
    for (const r of historial) conteo.set(r.servicio, (conteo.get(r.servicio) ?? 0) + 1);
    return [...conteo.entries()].sort((a, b) => b[1] - a[1]);
  }, [historial]);

  return (
    <Modal
      open={!!clienta}
      onClose={onClose}
      title={clienta ? `${clienta.nombre} ${clienta.apellido}` : ""}
      maxWidthClass="max-w-2xl"
    >
      {clienta ? (
        <div>
          <div className="grid grid-cols-2 gap-3 text-sm mb-4">
            <div>
              <p className="text-[11px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>Teléfono</p>
              <p>{clienta.telefono ?? "—"}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>Correo</p>
              <p className="truncate">{clienta.email ?? "—"}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>Cumpleaños</p>
              <p>{formatCumple(clienta) || "—"}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>Última visita</p>
              <p>{formatFecha(clienta.ultimaVisita)}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>Visitas totales</p>
              <p>{clienta.visitas}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>Gasto total</p>
              <p>{clp(clienta.gastoTotal)}</p>
            </div>
          </div>
          <div className="flex gap-1.5 mb-4">
            <Tag bg={NIVEL_COLORS[clienta.nivel]?.bg} color={NIVEL_COLORS[clienta.nivel]?.color}>{clienta.nivel}</Tag>
            <Tag bg={ESTADO_COLORS[clienta.estado]?.bg} color={ESTADO_COLORS[clienta.estado]?.color}>{clienta.estado}</Tag>
          </div>

          <p className="text-sm font-semibold mb-2">Servicios contratados</p>
          {cargando || historial === null ? (
            <p className="text-sm" style={{ color: "var(--muted)" }}>Cargando…</p>
          ) : historial.length === 0 ? (
            <p className="text-sm" style={{ color: "var(--muted)" }}>Sin reservas registradas.</p>
          ) : (
            <>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {conteoServicios.map(([servicio, n]) => (
                  <span
                    key={servicio}
                    className="text-[11px] font-medium rounded-full px-2.5 py-1 flex items-center gap-1.5"
                    style={{ background: "var(--surface-2)", color: "var(--ink-2)" }}
                  >
                    {servicio}
                    <span className="font-semibold tabular-nums" style={{ color: "var(--ink)" }}>{n}</span>
                  </span>
                ))}
              </div>
              <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
                <table className="w-full text-xs">
                  <thead>
                    <tr>
                      <th className={th} style={thStyle}>Servicio</th>
                      <th className={th} style={{ ...thStyle, whiteSpace: "nowrap" }}>Fecha</th>
                      <th className={th} style={{ ...thStyle, textAlign: "right" }}>Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historial.map((r, i) => (
                      <tr key={i} style={{ background: i % 2 === 1 ? "var(--surface-2)" : "transparent" }}>
                        <td className={td} style={tdStyle}>{r.servicio}</td>
                        <td className={td} style={{ ...tdStyle, whiteSpace: "nowrap" }}>{formatFecha(r.fecha)}</td>
                        <td className={td} style={{ ...tdStyle, textAlign: "right" }}>{clp(r.precio)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      ) : null}
    </Modal>
  );
}

function CumpleanosCell({
  clienta,
  editando,
  onAbrir,
  onCerrar,
}: {
  clienta: ClienteEnriquecido;
  editando: boolean;
  onAbrir: () => void;
  onCerrar: () => void;
}) {
  const [dia, setDia] = useState(clienta.cumpleDia ? String(clienta.cumpleDia) : "");
  const [mes, setMes] = useState(clienta.cumpleMes ? String(clienta.cumpleMes) : "");
  const [ano, setAno] = useState(clienta.cumpleAno ? String(clienta.cumpleAno) : "");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  if (!editando) {
    const texto = formatCumple(clienta) || "—";
    return (
      <button
        type="button"
        onClick={onAbrir}
        className="text-left hover:underline"
        style={{ color: clienta.cumpleDia ? "var(--ink)" : "var(--muted)" }}
      >
        {texto}
      </button>
    );
  }

  function guardar() {
    setError(null);
    const d = dia.trim() ? Number(dia) : null;
    const m = mes.trim() ? Number(mes) : null;
    const a = ano.trim() ? Number(ano) : null;
    startTransition(async () => {
      const res = await actualizarCumpleanos(clienta.id, d, m, a);
      if (res.error) {
        setError(res.error);
        return;
      }
      onCerrar();
    });
  }

  return (
    <div className="flex items-center gap-1">
      <input
        value={dia}
        onChange={(e) => setDia(e.target.value)}
        placeholder="Día"
        inputMode="numeric"
        className="w-12 rounded px-1.5 py-1 text-xs border"
        style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}
      />
      <input
        value={mes}
        onChange={(e) => setMes(e.target.value)}
        placeholder="Mes"
        inputMode="numeric"
        className="w-12 rounded px-1.5 py-1 text-xs border"
        style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}
      />
      <input
        value={ano}
        onChange={(e) => setAno(e.target.value)}
        placeholder="Año"
        inputMode="numeric"
        className="w-16 rounded px-1.5 py-1 text-xs border"
        style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}
      />
      <button
        type="button"
        onClick={guardar}
        disabled={pending}
        className="text-[11px] font-semibold px-2 py-1 rounded-full disabled:opacity-50"
        style={{ background: "var(--acc)", color: "var(--acc-ink)" }}
      >
        {pending ? "…" : "OK"}
      </button>
      <button
        type="button"
        onClick={onCerrar}
        className="text-[11px] px-2 py-1 rounded-full border"
        style={{ borderColor: "var(--border)", color: "var(--ink-2)" }}
      >
        ✕
      </button>
      {error ? (
        <span className="text-[10px]" style={{ color: "var(--lab)" }}>
          {error}
        </span>
      ) : null}
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
  activeBg,
  activeColor,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  activeBg?: string;
  activeColor?: string;
}) {
  const bg = activeBg ?? "var(--ink)";
  const color = activeColor ?? "var(--page)";
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-xs font-medium px-3 py-1.5 rounded-full border transition-colors"
      style={{
        borderColor: active ? bg : "var(--border)",
        background: active ? bg : "transparent",
        color: active ? color : "var(--ink-2)",
      }}
    >
      {children}
    </button>
  );
}
