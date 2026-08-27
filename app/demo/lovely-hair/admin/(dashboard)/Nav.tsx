"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  BarChart3,
  Banknote,
  UploadCloud,
} from "lucide-react";

const NAV: { href: string; label: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number }> }[] = [
  { href: "/demo/lovely-hair/admin", label: "Resumen", icon: LayoutDashboard },
  { href: "/demo/lovely-hair/admin/ventas", label: "Ventas", icon: Banknote },
  { href: "/demo/lovely-hair/admin/clientas", label: "Clientas", icon: Users },
  { href: "/demo/lovely-hair/admin/servicios", label: "Catálogo", icon: Package },
  { href: "/demo/lovely-hair/admin/metricas-servicios", label: "Métricas servicios", icon: BarChart3 },
  { href: "/demo/lovely-hair/admin/upload", label: "Subir datos", icon: UploadCloud },
];

export default function Nav({ horizontal = false }: { horizontal?: boolean }) {
  const pathname = usePathname();
  return (
    <nav
      className={
        horizontal
          ? "flex gap-1 p-2 min-w-max"
          : "flex-1 flex flex-col gap-1"
      }
    >
      {NAV.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2.5 rounded-xl text-sm transition-colors whitespace-nowrap ${
              horizontal ? "shrink-0 px-3 py-2" : "px-3 py-2.5"
            }`}
            style={{
              color: active ? "var(--ink)" : "var(--ink-2)",
              background: active ? "var(--acc-soft)" : "transparent",
              fontWeight: active ? 600 : 500,
            }}
          >
            <Icon size={17} strokeWidth={active ? 2.4 : 2} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
