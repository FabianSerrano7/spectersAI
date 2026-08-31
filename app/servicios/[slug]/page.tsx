import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FaArrowRight, FaCheck } from "react-icons/fa6";
import { SERVICIOS_DETALLE, getServicioBySlug } from "@/lib/servicios";
import { ServiceHeader } from "@/components/service-header";

const EMAIL = "fabian@specterspro.com";

export function generateStaticParams() {
  return SERVICIOS_DETALLE.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const servicio = getServicioBySlug(slug);
  if (!servicio) return {};
  return {
    title: `${servicio.titulo} — SpectersAI`,
    description: servicio.resumen,
  };
}

export default async function ServicioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const servicio = getServicioBySlug(slug);
  if (!servicio) notFound();

  const otros = SERVICIOS_DETALLE.filter((s) => s.slug !== slug).slice(0, 3);
  const Icon = servicio.icon;

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <ServiceHeader />

      <main className="w-full max-w-[1600px] px-6 sm:px-10 md:px-16 lg:px-20">
        <section className="reveal py-16 lg:py-24">
          <p className="text-xs font-medium uppercase tracking-widest text-coral">{servicio.kicker}</p>
          <div className="mt-4 flex items-start gap-4">
            <Icon className="mt-2 h-8 w-8 shrink-0 text-coral" />
            <h1 className="text-3xl font-light tracking-tight sm:text-4xl lg:text-5xl">{servicio.titulo}</h1>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">{servicio.resumen}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral to-[#ff9a4d] px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-coral/25 transition-all duration-200 hover:shadow-coral/40 hover:brightness-110"
            >
              Agenda tu diagnóstico <FaArrowRight className="h-3.5 w-3.5" />
            </a>
            <Link
              href="/#servicios"
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              Ver todos los servicios
            </Link>
          </div>
        </section>

        <section className="reveal grid gap-10 border-t border-white/10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <h2 className="text-xl font-medium tracking-tight">Qué incluye</h2>
            <ul className="mt-6 space-y-4">
              {servicio.incluye.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <FaCheck className="mt-1 h-3.5 w-3.5 shrink-0 text-coral" />
                  <span className="text-zinc-400 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-medium tracking-tight">Cómo lo hacemos</h2>
            <ol className="mt-6 space-y-5">
              {servicio.comoFunciona.map((paso, i) => (
                <li key={paso} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-coral/30 text-xs font-medium text-coral">
                    {i + 1}
                  </span>
                  <span className="text-zinc-400 leading-relaxed">{paso}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="reveal border-t border-white/10 py-16 lg:py-20">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">Para quién es</p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">{servicio.paraQuien}</p>
        </section>

        <section className="reveal rounded-[2rem] border border-white/10 bg-gradient-to-br from-coral/[0.08] to-transparent px-6 py-14 sm:px-12 lg:px-16">
          <h2 className="max-w-xl text-2xl font-light tracking-tight sm:text-3xl">
            Hablemos de cómo aplicarlo en tu negocio.
          </h2>
          <p className="mt-4 max-w-xl text-zinc-400 leading-relaxed">
            Agenda tu diagnóstico y en 30 minutos vemos si esto es lo que necesitas primero.
          </p>
          <div className="mt-8">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral to-[#ff9a4d] px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-coral/25 transition-all duration-200 hover:shadow-coral/40 hover:brightness-110"
            >
              Agenda tu diagnóstico <FaArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>

        <section className="reveal border-t border-white/10 py-16 lg:py-20">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">Otros servicios</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {otros.map((s) => {
              const OtroIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/servicios/${s.slug}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04]"
                >
                  <OtroIcon className="h-5 w-5 text-coral" />
                  <h3 className="mt-4 text-base font-medium tracking-tight">{s.titulo}</h3>
                </Link>
              );
            })}
          </div>
        </section>

        <footer className="border-t border-white/10 py-10 text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-300">
            ← Volver al inicio
          </Link>
        </footer>
      </main>
    </div>
  );
}
