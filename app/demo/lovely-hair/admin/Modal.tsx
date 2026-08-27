"use client";

import { useEffect } from "react";

export function Modal({
  open,
  onClose,
  title,
  children,
  maxWidthClass = "max-w-lg",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidthClass?: string;
}) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    >
      <div
        className={`rounded-2xl border w-full ${maxWidthClass} max-h-[85vh] overflow-y-auto p-5`}
        style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 gap-3">
          <h2 className="font-display text-lg min-w-0 truncate">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-sm px-2.5 py-1 rounded-full border shrink-0"
            style={{ borderColor: "var(--border)", color: "var(--ink-2)" }}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
