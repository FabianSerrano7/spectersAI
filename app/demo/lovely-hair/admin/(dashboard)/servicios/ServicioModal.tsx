"use client";

import { useEffect, useState } from "react";
import type { ServicioCatalogo } from "@/lib/db/queries";
import { clp } from "../../ui";
import { Modal } from "../../Modal";
import { guardarServicio, deleteServicio } from "./actions";
import { TallaChipsField } from "./ServicioForm";

export default function ServicioModal({
  servicio,
  categorias,
  onClose,
}: {
  servicio: ServicioCatalogo | null;
  categorias: string[];
  onClose: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("Otros");
  const [tallas, setTallas] = useState<string[]>([]);
  const [precio, setPrecio] = useState(0);
  const [costo, setCosto] = useState(0);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!servicio) return;
    setNombre(servicio.nombre);
    setCategoria(servicio.categoria);
    setTallas(servicio.tallas);
    setPrecio(servicio.precio);
    setCosto(servicio.costo);
    setError(null);
  }, [servicio]);

  const utilidad = precio - costo;
  const margen = precio > 0 ? (utilidad / precio) * 100 : null;

  async function guardar() {
    if (!servicio) return;
    setPending(true);
    const res = await guardarServicio(servicio.id, { nombre, categoria, tallas, precio, costo });
    setPending(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    onClose();
  }

  async function borrar() {
    if (!servicio) return;
    if (!confirm(`¿Borrar "${servicio.nombre}" del catálogo?`)) return;
    setPending(true);
    await deleteServicio(servicio.id);
    setPending(false);
    onClose();
  }

  return (
    <Modal open={!!servicio} onClose={onClose} title="Editar servicio">
      {servicio ? (
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-[11px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>Nombre</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full mt-1 rounded-lg px-2.5 py-1.5 border text-sm"
              style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>Categoría</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full mt-1 rounded-lg px-2.5 py-1.5 border text-sm"
              style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}
            >
              {categorias.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>Tallas</label>
            <div className="mt-1">
              <TallaChipsField value={tallas} onChange={setTallas} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>Precio</label>
              <input
                type="number"
                value={precio || ""}
                onChange={(e) => setPrecio(Number(e.target.value) || 0)}
                className="w-full mt-1 rounded-lg px-2.5 py-1.5 border text-sm text-right"
                style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>Costo</label>
              <input
                type="number"
                value={costo || ""}
                onChange={(e) => setCosto(Number(e.target.value) || 0)}
                className="w-full mt-1 rounded-lg px-2.5 py-1.5 border text-sm text-right"
                style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}
              />
            </div>
          </div>
          <p className="text-sm" style={{ color: "var(--ink-2)" }}>
            Utilidad: <strong style={{ color: utilidad >= 0 ? "var(--good)" : "var(--lab)" }}>{clp(utilidad)}</strong>
            {"  ·  "}
            Margen: <strong>{margen === null ? "—" : `${margen.toFixed(0)}%`}</strong>
          </p>
          {error ? <p className="text-xs" style={{ color: "var(--lab)" }}>{error}</p> : null}

          <div className="flex items-center justify-between gap-2 pt-2 border-t" style={{ borderColor: "var(--border)" }}>
            <button
              type="button"
              onClick={borrar}
              disabled={pending}
              className="text-xs px-3 py-1.5 rounded-full border disabled:opacity-50"
              style={{ borderColor: "var(--border)", color: "var(--lab)" }}
            >
              Borrar
            </button>
            <button
              type="button"
              onClick={guardar}
              disabled={pending || !nombre.trim()}
              className="text-xs font-semibold px-4 py-1.5 rounded-full disabled:opacity-50"
              style={{ background: "var(--acc)", color: "var(--acc-ink)" }}
            >
              {pending ? "Guardando…" : "Guardar"}
            </button>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
