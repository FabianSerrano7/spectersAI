"use client";

import { useState, useTransition } from "react";
import { sincronizarCatalogo } from "./actions";

export default function SyncButton() {
  const [pending, startTransition] = useTransition();
  const [mensaje, setMensaje] = useState<string | null>(null);

  function onClick() {
    startTransition(async () => {
      const { agregados } = await sincronizarCatalogo();
      setMensaje(
        agregados === 0
          ? "Ya estaba al día — no había servicios nuevos."
          : `Se agregaron ${agregados} servicio${agregados === 1 ? "" : "s"} nuevo${agregados === 1 ? "" : "s"}.`,
      );
    });
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        className="text-xs font-semibold px-3 py-1.5 rounded-full border disabled:opacity-50"
        style={{ borderColor: "var(--border)", color: "var(--ink-2)" }}
      >
        {pending ? "Sincronizando…" : "Sincronizar catálogo desde reservas"}
      </button>
      {mensaje ? (
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          {mensaje}
        </span>
      ) : null}
    </div>
  );
}
