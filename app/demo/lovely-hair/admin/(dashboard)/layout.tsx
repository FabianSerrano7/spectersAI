import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession, destroySession } from "@/lib/auth";
import ThemeToggle from "../ThemeToggle";
import Nav from "./Nav";

export const dynamic = "force-dynamic";

async function logoutAction() {
  "use server";
  await destroySession();
  redirect("/demo/lovely-hair/admin/login");
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/demo/lovely-hair/admin/login");

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* barra superior: solo en pantallas angostas */}
      <div
        className="flex md:hidden items-center justify-between p-3 border-b sticky top-0 z-10"
        style={{ borderColor: "var(--border)", background: "var(--page)" }}
      >
        <div className="flex items-center gap-2">
          <Image src="/logo-lovelyhair.png" alt="Lovely Hair" width={28} height={28} className="rounded-lg" />
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-xs px-3 py-1.5 rounded-full border"
              style={{ borderColor: "var(--border)", color: "var(--ink-2)" }}
            >
              Salir
            </button>
          </form>
        </div>
      </div>
      <div className="flex md:hidden overflow-x-auto border-b" style={{ borderColor: "var(--border)" }}>
        <Nav horizontal />
      </div>

      {/* sidebar: solo desde md hacia arriba */}
      <aside
        className="hidden md:flex w-60 shrink-0 border-r flex-col p-4 sticky top-0 h-screen"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <div className="flex items-center gap-2.5 px-2 mb-7">
          <Image src="/logo-lovelyhair.png" alt="Lovely Hair" width={40} height={40} className="rounded-xl shrink-0" />
          <div className="min-w-0 text-[11px] leading-tight" style={{ color: "var(--muted)" }}>
            Panel de administración
          </div>
        </div>
        <Nav />
        <div
          className="mt-3 pt-3 flex items-center gap-2.5 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0"
            style={{ background: "var(--surface-2)", color: "var(--ink-2)" }}
          >
            {session.email.slice(0, 2).toUpperCase()}
          </span>
          <p className="flex-1 min-w-0 text-[11px] truncate" style={{ color: "var(--muted)" }} title={session.email}>
            {session.email}
          </p>
          <ThemeToggle />
        </div>
        <form action={logoutAction} className="mt-2">
          <button
            type="submit"
            className="w-full text-xs font-medium px-3 py-2 rounded-xl border transition-colors hover:opacity-80"
            style={{ borderColor: "var(--border)", color: "var(--ink-2)" }}
          >
            Salir
          </button>
        </form>
      </aside>
      <main className="flex-1 min-w-0 p-4 md:p-10">{children}</main>
    </div>
  );
}
