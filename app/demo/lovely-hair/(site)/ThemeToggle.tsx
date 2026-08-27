"use client";

import { useEffect, useState } from "react";

const KEY = "lh-demo-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"day" | "night">("night");

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    const initial = saved === "day" ? "day" : "night";
    setTheme(initial);
    document.querySelector(".lh-root")?.setAttribute("data-theme", initial);
  }, []);

  function toggle() {
    const next = theme === "day" ? "night" : "day";
    setTheme(next);
    document.querySelector(".lh-root")?.setAttribute("data-theme", next);
    localStorage.setItem(KEY, next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "day" ? "Cambiar a modo noche" : "Cambiar a modo día"}
      className="w-10 h-10 rounded-full border border-[var(--lh-border)] flex items-center justify-center text-[var(--lh-ink)] hover:opacity-70 transition-opacity shrink-0"
    >
      {theme === "day" ? "☾" : "☀"}
    </button>
  );
}
