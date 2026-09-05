"use client";

import { useActionState } from "react";
import { uploadAction, uploadInitialState } from "./actions";

export default function UploadForm() {
  const [state, formAction, pending] = useActionState(uploadAction, uploadInitialState);

  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-lg">
      <Field
        name="reservas"
        label="Historial de reservas"
        hint='El archivo "HISTORIAL de reservas.xlsx" que exportas de AgendaPro.'
        required
      />
      <Field
        name="listado"
        label="Listado de clientes (opcional)"
        hint="Se usa para completar teléfono, correo y cumpleaños cuando la reserva no trae ficha."
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-full px-5 py-2.5 text-sm font-semibold self-start disabled:opacity-60"
        style={{ background: "var(--acc)", color: "var(--acc-ink)" }}
      >
        {pending ? "Procesando…" : "Subir y actualizar"}
      </button>

      {state.status === "error" ? (
        <p className="text-sm" style={{ color: "var(--lab)" }}>
          {state.error}
        </p>
      ) : null}

      {state.status === "ok" ? (
        <div
          className="rounded-2xl border p-4 text-sm"
          style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "var(--shadow-card)" }}
        >
          <p className="font-semibold mb-2">Listo — base actualizada</p>
          <ul className="space-y-1" style={{ color: "var(--ink-2)" }}>
            <li>{state.resumen.filasHistorial.toLocaleString("es-CL")} filas en el archivo</li>
            <li>{state.resumen.filasAsiste.toLocaleString("es-CL")} con estado &quot;Asiste&quot;</li>
            <li>{state.resumen.filasNuevas.toLocaleString("es-CL")} reservas nuevas cargadas (el resto ya estaba)</li>
            <li>{state.resumen.clientasCumpleBackfill} cumpleaños completados desde el listado</li>
            {state.resumen.identidadesSinResolver > 0 ? (
              <li style={{ color: "var(--lab)" }}>
                {state.resumen.identidadesSinResolver} filas sin teléfono, correo ni N° de cliente — no se pudieron asociar
              </li>
            ) : null}
            <li>
              Período: {state.resumen.periodoMin} → {state.resumen.periodoMax}
            </li>
          </ul>
        </div>
      ) : null}
    </form>
  );
}

function Field({
  name,
  label,
  hint,
  required,
}: {
  name: string;
  label: string;
  hint: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <p className="text-xs mb-1.5" style={{ color: "var(--muted)" }}>
        {hint}
      </p>
      <input
        type="file"
        name={name}
        accept=".xlsx"
        required={required}
        className="block w-full text-sm rounded-xl border px-3 py-2"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      />
    </div>
  );
}
