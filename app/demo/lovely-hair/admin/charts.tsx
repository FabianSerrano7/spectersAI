const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export { LineChart } from "./LineChart";

export function BarRanking({
  items,
  formatValue,
}: {
  items: { label: string; value: number }[];
  formatValue: (v: number) => string;
}) {
  if (items.length === 0) {
    return (
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        Sin ventas en este período.
      </p>
    );
  }
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="flex flex-col gap-1.5">
      {items.map((item, i) => {
        const pct = (item.value / max) * 100;
        return (
          <div key={item.label} className="relative rounded-lg overflow-hidden">
            <div
              className="absolute inset-y-0 left-0"
              style={{ width: `${pct}%`, background: "var(--acc-soft)" }}
            />
            <div className="relative flex items-center gap-3 px-3 py-2.5">
              <span
                className="text-[11px] font-semibold shrink-0 tabular-nums"
                style={{ color: "var(--muted)", width: 16, textAlign: "right" }}
              >
                {i + 1}
              </span>
              <span className="flex-1 text-sm font-medium truncate min-w-0" title={item.label}>
                {item.label}
              </span>
              <span className="text-sm font-semibold shrink-0 text-right tabular-nums" style={{ minWidth: 92 }}>
                {formatValue(item.value)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Bars({
  data,
  valor,
  formato,
}: {
  data: { mes: string; v: number }[];
  valor: (v: number) => string;
  formato?: (v: number) => boolean; // resalta si true
}) {
  const max = Math.max(...data.map((d) => d.v), 1);
  return (
    <div className="flex items-end gap-1.5" style={{ height: 140 }}>
      {data.map((d) => {
        const [y, m] = d.mes.split("-");
        const h = Math.max(3, (d.v / max) * 120);
        const resaltado = formato ? formato(d.v) : false;
        return (
          <div key={d.mes} className="flex-1 flex flex-col items-center gap-1 min-w-0" title={`${d.mes}: ${valor(d.v)}`}>
            <div
              className="w-full rounded-t"
              style={{
                height: h,
                background: resaltado ? "var(--lab)" : "var(--acc)",
                opacity: resaltado ? 1 : 0.85,
              }}
            />
            <span className="text-[9px] rotate-[-90deg] whitespace-nowrap" style={{ color: "var(--muted)" }}>
              {MESES[Number(m) - 1]}·{y.slice(2)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
