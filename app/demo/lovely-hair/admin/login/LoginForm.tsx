"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label className="block text-xs uppercase tracking-wide mb-1.5" style={{ color: "var(--muted)" }}>
          Correo
        </label>
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          className="w-full rounded-full px-4 py-2.5 text-sm outline-none border"
          style={{
            background: "var(--surface-2)",
            borderColor: "var(--border)",
            color: "var(--ink)",
          }}
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide mb-1.5" style={{ color: "var(--muted)" }}>
          Contraseña
        </label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-full px-4 py-2.5 text-sm outline-none border"
          style={{
            background: "var(--surface-2)",
            borderColor: "var(--border)",
            color: "var(--ink)",
          }}
        />
      </div>
      {state.error ? (
        <p className="text-sm" style={{ color: "var(--lab)" }}>
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-full px-5 py-2.5 text-sm font-semibold disabled:opacity-60"
        style={{ background: "var(--acc)", color: "var(--acc-ink)" }}
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
