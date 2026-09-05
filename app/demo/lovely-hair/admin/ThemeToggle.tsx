"use client";

import { useEffect, useState } from "react";

const KEY = "admin-lh-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"day" | "night">(() => {
    if (typeof window === "undefined") return "day";
    return localStorage.getItem(KEY) === "night" ? "night" : "day";
  });

  useEffect(() => {
    document
      .querySelector(".admin-root")
      ?.setAttribute("data-theme", theme === "night" ? "dark" : "light");
  }, [theme]);

  function toggle() {
    const next = theme === "day" ? "night" : "day";
    setTheme(next);
    localStorage.setItem(KEY, next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "day" ? "Cambiar a modo noche" : "Cambiar a modo día"}
      className="w-8 h-8 rounded-full border flex items-center justify-center hover:opacity-70 transition-opacity shrink-0 text-sm"
      style={{ borderColor: "var(--border)", color: "var(--ink)" }}
    >
      {theme === "day" ? "☾" : "☀"}
    </button>
  );
}
