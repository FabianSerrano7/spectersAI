"use client";

import { useState, useTransition } from "react";
import type { ServicioCatalogo } from "@/lib/db/queries";
import { guardarServicio, actualizarPrecioCosto } from "./actions";
import { clp, td, tdStyle } from "../../ui";

export const TALLAS = ["XS", "S", "M", "L", "XL", "XXL"];

export function TallaChipsField({
  value,
  onChange,
}: {
  value: string[];
  onChange: (tallas: string[]) => void;
}) {
  function toggle(t: string) {
    onChange(value.includes(t) ? value.filter((x) => x !== t) : [...value, t]);
  }
  return (
    <div className="flex flex-nowrap gap-1">
      {TALLAS.map((t) => {
        const on = value.includes(t);
        return (
          <button
            key={t}
            type="button"
            onClick={() => toggle(t)}
            className="text-[9px] font-medium flex items-center justify-center rounded border shrink-0 transition-colors"
            style={{
              borderColor: on ? "var(--acc)" : "var(--border)",
              background: on ? "var(--acc)" : "transparent",
              color: on ? "var(--acc-ink)" : "var(--ink-2)",
              width: 22,
              height: 20,
            }}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

export function TallaPills({ tallas }: { tallas: string[] }) {
  if (tallas.length === 0) return <span style={{ color: "var(--muted)" }}>—</span>;
  return (
    <div className="flex flex-wrap gap-1">
      {tallas.map((t) => (
        <span
          key={t}
          className="text-[10px] font-medium rounded px-1.5 py-0.5"
          style={{ background: "var(--surface-2)", color: "var(--ink-2)" }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export function ServicioRow({
  servicio,
  seleccionado,
  onToggleSeleccion,
  onClick,
}: {
  servicio: ServicioCatalogo;
  seleccionado: boolean;
  onToggleSeleccion: () => void;
  onClick: () => void;
}) {
  const [precio, setPrecio] = useState(servicio.precio);
  const [costo, setCosto] = useState(servicio.costo);
  const [pending, startTransition] = useTransition();
  const utilidad = precio - costo;
  const margen = precio > 0 ? (utilidad / precio) * 100 : null;

  const [prevPrecio, setPrevPrecio] = useState(servicio.precio);
  const [prevCosto, setPrevCosto] = useState(servicio.costo);
  if (servicio.precio !== prevPrecio || servicio.costo !== prevCosto) {
    setPrevPrecio(servicio.precio);
    setPrevCosto(servicio.costo);
    setPrecio(servicio.precio);
    setCosto(servicio.costo);
  }

  function guardarSiCambio() {
    if (precio === servicio.precio && costo === servicio.costo) return;
    startTransition(() => {
      actualizarPrecioCosto(servicio.id, precio, costo);
    });
  }

  return (
    <tr onClick={onClick} className="cursor-pointer hover:opacity-90">
      <td className={td} style={tdStyle} onClick={(e) => e.stopPropagation()}>
        <input type="checkbox" checked={seleccionado} onChange={onToggleSeleccion} />
      </td>
      <td className={td} style={tdStyle}>{servicio.nombre}</td>
      <td className={td} style={tdStyle}>{servicio.categoria}</td>
      <td className={td} style={tdStyle}>
        <TallaPills tallas={servicio.tallas} />
      </td>
      <td className={td} style={{ ...tdStyle, textAlign: "right" }} onClick={(e) => e.stopPropagation()}>
        <input
          type="number"
          value={precio || ""}
          placeholder="0"
          disabled={pending}
          onChange={(e) => setPrecio(Number(e.target.value) || 0)}
          onBlur={guardarSiCambio}
          className="w-24 rounded-lg px-2 py-1.5 border text-sm text-right disabled:opacity-60"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        />
      </td>
      <td className={td} style={{ ...tdStyle, textAlign: "right" }} onClick={(e) => e.stopPropagation()}>
        <input
          type="number"
          value={costo || ""}
          placeholder="0"
          disabled={pending}
          onChange={(e) => setCosto(Number(e.target.value) || 0)}
          onBlur={guardarSiCambio}
          className="w-24 rounded-lg px-2 py-1.5 border text-sm text-right disabled:opacity-60"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        />
      </td>
      <td
        className={td}
        style={{ ...tdStyle, textAlign: "right", color: utilidad >= 0 ? "var(--good)" : "var(--lab)" }}
      >
        {clp(utilidad)}
      </td>
      <td className={td} style={{ ...tdStyle, textAlign: "right" }}>
        {margen === null ? "—" : `${margen.toFixed(0)}%`}
      </td>
    </tr>
  );
}

export function NuevoServicioRow({ categorias }: { categorias: string[] }) {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState(categorias[0] ?? "Otros");
  const [tallas, setTallas] = useState<string[]>([]);
  const [precio, setPrecio] = useState(0);
  const [costo, setCosto] = useState(0);
  const [pending, setPending] = useState(false);
  const utilidad = precio - costo;
  const margen = precio > 0 ? (utilidad / precio) * 100 : null;

  async function agregar() {
    if (!nombre.trim() || pending) return;
    setPending(true);
    await guardarServicio(null, { nombre, categoria, tallas, precio, costo });
    setNombre("");
    setCategoria(categorias[0] ?? "Otros");
    setTallas([]);
    setPrecio(0);
    setCosto(0);
    setPending(false);
  }

  return (
    <tr style={{ background: "var(--surface-2)" }}>
      <td className={td} style={tdStyle} />
      <td className={td} style={tdStyle}>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del servicio nuevo"
          className="w-full rounded-lg px-2.5 py-1.5 border text-sm"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        />
      </td>
      <td className={td} style={tdStyle}>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="rounded-lg px-2 py-1.5 border text-sm"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          {categorias.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </td>
      <td className={td} style={tdStyle}>
        <TallaChipsField value={tallas} onChange={setTallas} />
      </td>
      <td className={td} style={{ ...tdStyle, textAlign: "right" }}>
        <input
          type="number"
          value={precio || ""}
          placeholder="0"
          onChange={(e) => setPrecio(Number(e.target.value) || 0)}
          className="w-24 rounded-lg px-2 py-1.5 border text-sm text-right"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        />
      </td>
      <td className={td} style={{ ...tdStyle, textAlign: "right" }}>
        <input
          type="number"
          value={costo || ""}
          placeholder="0"
          onChange={(e) => setCosto(Number(e.target.value) || 0)}
          className="w-24 rounded-lg px-2 py-1.5 border text-sm text-right"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        />
      </td>
      <td className={td} style={{ ...tdStyle, textAlign: "right" }}>{clp(utilidad)}</td>
      <td className={td} style={{ ...tdStyle, textAlign: "right" }}>
        <div className="flex items-center justify-end gap-2">
          <span>{margen === null ? "—" : `${margen.toFixed(0)}%`}</span>
          <button
            type="button"
            onClick={agregar}
            disabled={!nombre.trim() || pending}
            className="text-[11px] font-semibold px-2.5 py-1.5 rounded-full disabled:opacity-40"
            style={{ background: "var(--acc)", color: "var(--acc-ink)" }}
          >
            {pending ? "…" : "Agregar"}
          </button>
        </div>
      </td>
    </tr>
  );
}
