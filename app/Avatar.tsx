"use client";

import { useState } from "react";

export function Avatar({
  src,
  initials,
  alt,
  className,
}: {
  src: string;
  initials: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative grid place-items-center shrink-0 overflow-hidden rounded-full bg-lime ${className ?? ""}`}
    >
      {failed ? (
        <span className="text-2xl font-bold text-ink">{initials}</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

export function LogoChip({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="text-xl font-bold tracking-tight text-ink-soft/80">
        {name}
      </span>
    );
  }

  return (
    <div className="flex h-16 w-32 shrink-0 items-center justify-center rounded-2xl border border-ink/10 bg-white p-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        className="max-h-full max-w-full object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
