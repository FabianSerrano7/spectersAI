"use client";

import { useEffect, useRef, useState } from "react";

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

type Formato = "clp" | "clpMillones" | "numero";

function formatear(v: number, formato: Formato): string {
  const n = Math.round(v);
  if (formato === "clp") return "$" + n.toLocaleString("es-CL");
  if (formato === "clpMillones") {
    const millones = n / 1_000_000;
    const texto = millones >= 10 || Number.isInteger(millones) ? millones.toFixed(0) : millones.toFixed(1);
    return `$${texto}M`;
  }
  return String(n);
}

function nicerMax(max: number): number {
  if (max <= 0) return 10;
  const magnitud = Math.pow(10, Math.floor(Math.log10(max)));
  const norm = max / magnitud;
  const niceNorm = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
  return niceNorm * magnitud;
}

function mesLabel(mes: string): string {
  const [y, m] = mes.split("-");
  return `${MESES[Number(m) - 1]}·${y.slice(2)}`;
}

export function LineChart({
  data,
  formato,
  puntoFormato,
  resaltarBajo,
  height = 200,
}: {
  data: { mes: string; v: number }[];
  /** Formato del eje Y y del tooltip. */
  formato: Formato;
  /** Formato de la etiqueta sobre cada punto, si distinto de `formato` (ej. clp completo en eje, millones sobre el punto). */
  puntoFormato?: Formato;
  /** Si se pasa, resalta en rojo los puntos bajo este valor. */
  resaltarBajo?: number;
  height?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setContainerWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const valorLabel = (v: number) => formatear(v, formato);
  const puntoLabel = (v: number) => formatear(v, puntoFormato ?? formato);

  const marginLeft = 52;
  const marginRight = 28;
  const marginBottom = 28;
  const marginTop = 22;
  const naturalWidth = Math.max(data.length * 56, 320);
  const width = Math.max(naturalWidth, containerWidth);
  const plotW = width - marginLeft - marginRight;
  const plotH = height - marginTop - marginBottom;

  const rawMax = Math.max(...data.map((d) => d.v), 0);
  const niceMax = nicerMax(rawMax);
  const ticks = [0, niceMax / 3, (niceMax * 2) / 3, niceMax];

  const x = (i: number) => marginLeft + (data.length <= 1 ? plotW / 2 : (i / (data.length - 1)) * plotW);
  const y = (v: number) => marginTop + plotH - (v / niceMax) * plotH;

  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(d.v)}`).join(" ");
  const areaPath = `${linePath} L ${x(data.length - 1)} ${marginTop + plotH} L ${x(0)} ${marginTop + plotH} Z`;

  return (
    <div ref={containerRef} className="overflow-x-auto">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block", overflow: "visible" }}>
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={marginLeft}
              x2={width - marginRight}
              y1={y(t)}
              y2={y(t)}
              stroke="var(--border)"
              strokeWidth={1}
            />
            <text x={marginLeft - 8} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize={9} fill="var(--muted)">
              {valorLabel(t)}
            </text>
          </g>
        ))}

        <path d={areaPath} fill="var(--acc)" opacity={0.12} stroke="none" />
        <path d={linePath} fill="none" stroke="var(--acc)" strokeWidth={2} />

        {data.map((d, i) => {
          const resaltado = resaltarBajo !== undefined && d.v < resaltarBajo;
          return (
            <circle key={d.mes} cx={x(i)} cy={y(d.v)} r={3.5} fill={resaltado ? "var(--lab)" : "var(--acc)"}>
              <title>{`${d.mes}: ${valorLabel(d.v)}`}</title>
            </circle>
          );
        })}

        {data.map((d, i) => (
          <text
            key={`v-${d.mes}`}
            x={x(i)}
            y={y(d.v) - 8}
            textAnchor="middle"
            fontSize={9}
            fontWeight={600}
            fill="var(--ink)"
          >
            {puntoLabel(d.v)}
          </text>
        ))}

        {data.map((d, i) => (
          <text
            key={d.mes}
            x={x(i)}
            y={height - 6}
            textAnchor="middle"
            fontSize={9}
            fill="var(--muted)"
          >
            {mesLabel(d.mes)}
          </text>
        ))}
      </svg>
    </div>
  );
}
