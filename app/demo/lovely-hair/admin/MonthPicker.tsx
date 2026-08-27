"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MESES_CORTO = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export function MonthPicker({
  value,
  onChange,
  placeholder = "Elegir mes",
  active = false,
}: {
  /** "YYYY-MM" o "" */
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  active?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [y, m] = value ? value.split("-").map(Number) : [null, null];
  const [viewYear, setViewYear] = useState(y ?? new Date().getFullYear());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const label = y && m ? `${MESES_CORTO[m - 1]} ${y}` : placeholder;

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={() => {
          setViewYear(y ?? new Date().getFullYear());
          setOpen((v) => !v);
        }}
        className="text-xs font-medium px-3 py-1.5 rounded-full border transition-colors"
        style={{
          borderColor: active ? "var(--ink)" : "var(--border)",
          background: active ? "var(--ink)" : "var(--surface)",
          color: active ? "var(--page)" : "var(--ink-2)",
        }}
      >
        {label}
      </button>
      {open ? (
        <div
          className="absolute z-30 mt-1.5 rounded-2xl border p-3"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
            boxShadow: "0 16px 32px rgba(0,0,0,0.18)",
            width: 216,
          }}
        >
          <div className="flex items-center justify-between mb-2 px-0.5">
            <button
              type="button"
              onClick={() => setViewYear((v) => v - 1)}
              className="w-6 h-6 rounded-full flex items-center justify-center hover:opacity-70"
              style={{ color: "var(--ink-2)" }}
              aria-label="Año anterior"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="text-sm font-semibold">{viewYear}</span>
            <button
              type="button"
              onClick={() => setViewYear((v) => v + 1)}
              className="w-6 h-6 rounded-full flex items-center justify-center hover:opacity-70"
              style={{ color: "var(--ink-2)" }}
              aria-label="Año siguiente"
            >
              <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {MESES_CORTO.map((mes, i) => {
              const activo = y === viewYear && m === i + 1;
              return (
                <button
                  key={mes}
                  type="button"
                  onClick={() => {
                    onChange(`${viewYear}-${String(i + 1).padStart(2, "0")}`);
                    setOpen(false);
                  }}
                  className="text-xs font-medium rounded-lg py-1.5 transition-colors"
                  style={{
                    background: activo ? "var(--acc)" : "transparent",
                    color: activo ? "var(--acc-ink)" : "var(--ink-2)",
                  }}
                >
                  {mes}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
