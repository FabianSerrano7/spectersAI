"use client";

import { useState } from "react";
import type { Service } from "../../data";
import { formatCLP } from "../../ui";

const BOOKING_URL = "https://lovelyhair.site.agendapro.com";

export default function ServiceInteractive({ service }: { service: Service }) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [openDetail, setOpenDetail] = useState<number | null>(0);

  const price = service.sizes ? service.basePrice + service.sizes[sizeIndex].extra : service.basePrice;

  return (
    <div>
      {service.sizes ? (
        <div className="mb-6">
          <div className="text-[12px] uppercase tracking-[0.12em] text-[var(--lh-ink)]/50 mb-2">
            Talla, según largo de pelo
          </div>
          <div className="flex gap-2">
            {service.sizes.map((size, i) => (
              <button
                key={size.label}
                type="button"
                onClick={() => setSizeIndex(i)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${
                  i === sizeIndex
                    ? "bg-[var(--lh-invert-bg)] text-[var(--lh-invert-ink)] border-[var(--lh-invert-bg)]"
                    : "border-[var(--lh-ink)]/20 text-[var(--lh-ink)]/70 hover:border-[var(--lh-ink)]/50"
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="flex items-center gap-3 mb-1">
        <span className="font-[family-name:var(--font-display)] text-3xl">
          {formatCLP(price)}
        </span>
      </div>

      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block text-center bg-[var(--lh-invert-bg)] text-[var(--lh-invert-ink)] px-6 py-3.5 rounded-full text-sm font-medium tracking-wide hover:opacity-85 transition-opacity"
      >
        Reservar hora
      </a>
      <p className="text-center text-[12px] text-[var(--lh-ink)]/45 mt-2">
        Confirmas el día y la hora directo en nuestra agenda
      </p>

      <div className="mt-10">
        {service.details.map((d, i) => {
          const open = openDetail === i;
          return (
            <div key={d.title} className="border-b border-[var(--lh-border)]">
              <button
                type="button"
                onClick={() => setOpenDetail(open ? null : i)}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <span className="font-medium text-[14px]">{d.title}</span>
                <span className="text-xl text-[var(--lh-ink)]/40 leading-none">
                  {open ? "−" : "+"}
                </span>
              </button>
              {open ? (
                <p className="text-[13px] text-[var(--lh-ink)]/60 leading-relaxed pb-4 pr-8">
                  {d.body}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
