"use client";

import { useEffect, useState } from "react";

const KEY = "admin-lh-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"day" | "night">("day");

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    const initial = saved === "night" ? "night" : "day";
    setTheme(initial);
    document
      .querySelector(".admin-root")
      ?.setAttribute("data-theme", initial === "night" ? "dark" : "light");
  }, []);

  function toggle() {
    const next = theme === "day" ? "night" : "day";
    setTheme(next);
    document
      .querySelector(".admin-root")
      ?.setAttribute("data-theme", next === "night" ? "dark" : "light");
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
