"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div>
      <div className="relative rounded-[24px] overflow-hidden">
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((src, i) => (
            <div key={src} className="relative aspect-square w-full shrink-0 snap-center">
              <Image
                src={src}
                alt={i === 0 ? alt : ""}
                fill
                sizes="100vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
      {images.length > 1 ? (
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-5 bg-[var(--lh-ink)]" : "w-1.5 bg-[var(--lh-ink)]/25"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
