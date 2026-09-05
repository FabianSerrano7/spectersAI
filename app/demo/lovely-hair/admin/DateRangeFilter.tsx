"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { CalendarRange } from "lucide-react";
import { PRESETS, formatMonthInput, resolvePeriod, type PeriodPreset } from "@/lib/date-range";
import { MonthPicker } from "./MonthPicker";

export default function DateRangeFilter({ defaultPreset = "12m" }: { defaultPreset?: PeriodPreset }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [customOpen, setCustomOpen] = useState(false);

  const params = {
    preset: searchParams.get("preset") ?? undefined,
    desde: searchParams.get("desde") ?? undefined,
    hasta: searchParams.get("hasta") ?? undefined,
  };
  const period = resolvePeriod(params, defaultPreset);
  const activePreset = params.desde ? "custom" : (params.preset as PeriodPreset) || defaultPreset;
  const desdeParam = params.desde ?? "";
  const hastaParam = params.hasta ?? "";
  const esUnSoloMes = Boolean(desdeParam && hastaParam && desdeParam === hastaParam);

  function conOtrosParams(entradas: Record<string, string>) {
    const next = new URLSearchParams(searchParams.toString());
    next.delete("preset");
    next.delete("desde");
    next.delete("hasta");
    for (const [k, v] of Object.entries(entradas)) next.set(k, v);
    return `${pathname}?${next.toString()}`;
  }

  function setPreset(preset: PeriodPreset) {
    setCustomOpen(false);
    router.push(conOtrosParams({ preset }));
  }

  function setCustom(desde: string, hasta: string) {
    if (!desde || !hasta) return;
    router.push(conOtrosParams({ desde, hasta }));
  }

  function setMes(mes: string) {
    if (!mes) return;
    router.push(conOtrosParams({ desde: mes, hasta: mes }));
  }

  return (
    <div className="mb-5">
      <div
        className="inline-flex items-center gap-2.5 rounded-xl px-3 py-2 mb-3"
        style={{ background: "var(--acc-soft)" }}
      >
        <span
          className="inline-flex items-center justify-center rounded-full shrink-0"
          style={{ background: "var(--surface)", color: "var(--acc)", width: 28, height: 28 }}
        >
          <CalendarRange size={15} strokeWidth={2.2} />
        </span>
        <div className="leading-tight">
          <div className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
            {period.label}
          </div>
          {period.rangoTexto !== period.label ? (
            <div className="text-[11px]" style={{ color: "var(--ink-2)" }}>
              {period.rangoTexto}
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {PRESETS.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPreset(p.value)}
            className="text-xs font-medium px-3 py-1.5 rounded-full border transition-colors"
            style={{
              borderColor: activePreset === p.value ? "var(--ink)" : "var(--border)",
              background: activePreset === p.value ? "var(--ink)" : "transparent",
              color: activePreset === p.value ? "var(--page)" : "var(--ink-2)",
            }}
          >
            {p.label}
          </button>
        ))}

        <MonthPicker
          value={esUnSoloMes ? desdeParam : ""}
          onChange={setMes}
          placeholder="Un mes"
          active={esUnSoloMes}
        />

        <button
          type="button"
          onClick={() => setCustomOpen((v) => !v)}
          className="text-xs font-medium px-3 py-1.5 rounded-full border transition-colors"
          style={{
            borderColor: activePreset === "custom" && !esUnSoloMes ? "var(--ink)" : "var(--border)",
            background: activePreset === "custom" && !esUnSoloMes ? "var(--ink)" : "transparent",
            color: activePreset === "custom" && !esUnSoloMes ? "var(--page)" : "var(--ink-2)",
          }}
        >
          Rango personalizado
        </button>
        {customOpen ? (
          <CustomRangeInputs
            defaultDesde={desdeParam || formatMonthInput(new Date(new Date().getFullYear(), new Date().getMonth() - 11, 1))}
            defaultHasta={hastaParam || formatMonthInput(new Date())}
            onApply={setCustom}
          />
        ) : null}
      </div>
    </div>
  );
}

function CustomRangeInputs({
  defaultDesde,
  defaultHasta,
  onApply,
}: {
  defaultDesde: string;
  defaultHasta: string;
  onApply: (desde: string, hasta: string) => void;
}) {
  const [desde, setDesde] = useState(defaultDesde);
  const [hasta, setHasta] = useState(defaultHasta);
  return (
    <div className="flex items-center gap-1.5">
      <MonthPicker value={desde} onChange={setDesde} placeholder="Desde" active />
      <span className="text-xs" style={{ color: "var(--muted)" }}>→</span>
      <MonthPicker value={hasta} onChange={setHasta} placeholder="Hasta" active />
      <button
        type="button"
        onClick={() => onApply(desde, hasta)}
        className="text-xs font-semibold px-3 py-1.5 rounded-full"
        style={{ background: "var(--acc)", color: "var(--acc-ink)" }}
      >
        Aplicar
      </button>
    </div>
  );
}
