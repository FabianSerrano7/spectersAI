import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import LogoIcon from "@/assets/logo-icon";

const EMAIL = "fabian@specterspro.com";

export function ServiceHeader() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-10 md:px-16 lg:px-20">
        <Link href="/" className="flex items-center gap-2.5 text-2xl font-light tracking-tight text-foreground sm:text-xl">
          <LogoIcon className="size-8 text-white" />
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
            className="rounded-full bg-gradient-to-r from-coral to-[#ff9a4d] px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-coral/25 transition-all duration-200 hover:shadow-coral/40 hover:brightness-110"
          >
            Hablemos
          </a>
        </div>
      </div>
    </header>
  );
}
