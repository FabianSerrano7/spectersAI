"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { FaArrowLeft, FaBars, FaXmark } from "react-icons/fa6";

const EMAIL = "fabian@specterspro.com";

const NAV_ITEMS = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Cómo trabajamos", href: "/#diagnostico" },
  { label: "Tecnología", href: "/#stack" },
  { label: "Quién soy", href: "/#nosotros" },
  { label: "FAQ", href: "/#faq" },
];

export function ServiceHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-10 md:px-16 lg:px-20">
          <Link href="/" className="flex items-center gap-2.5 text-2xl font-light tracking-tight text-foreground sm:text-xl">
            <span>SpectersAI</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/#servicios"
              className="hidden items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground sm:flex"
            >
              <FaArrowLeft className="h-3 w-3" />
              <span>Todos los servicios</span>
            </Link>
            <a
              href={`mailto:${EMAIL}`}
              className="hidden rounded-full bg-gradient-to-r from-coral to-[#ff9a4d] px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-coral/25 transition-all duration-200 hover:shadow-coral/40 hover:brightness-110 sm:block"
            >
              Hablemos
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center justify-center rounded-full p-2 text-foreground transition-colors hover:bg-accent sm:hidden"
              aria-label="Abrir menú"
            >
              <FaBars className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-background/95 p-6 backdrop-blur-md sm:hidden"
          >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                <span>SpectersAI</span>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center rounded-full p-2 text-foreground transition-colors hover:bg-accent"
                aria-label="Cerrar menú"
              >
                <FaXmark className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-12 flex flex-col gap-6">
              <Link
                href="/"
                className="flex items-center border-b border-border/40 pb-3 text-lg font-medium text-foreground transition-colors hover:text-coral"
                onClick={() => setMenuOpen(false)}
              >
                Inicio
              </Link>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center border-b border-border/40 pb-3 text-lg font-medium text-foreground transition-colors hover:text-coral"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto">
              <a
                href={`mailto:${EMAIL}`}
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-coral to-[#ff9a4d] py-3 text-base font-medium text-white shadow-lg shadow-coral/25 transition-all"
              >
                Hablemos
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
