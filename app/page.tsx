"use client";

import { motion, type Variants } from "motion/react";
import {
  FaArrowRight,
  FaCheck,
  FaRobot,
  FaPlug,
  FaLayerGroup,
  FaHandshake,
  FaMagnifyingGlassChart,
  FaScaleBalanced,
  FaLinkedin,
} from "react-icons/fa6";
import { Hero3 } from "@/components/ui/hero-3";
import { Avatar, LogoChip } from "./Avatar";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.6, bounce: 0 },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

function Reveal({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
}) {
  const Comp = motion[as];
  return (
    <Comp
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className={className}
    >
      {children}
    </Comp>
  );
}

/* ---------- Datos ---------- */

const NAV_ITEMS = [
  { label: "Diagnóstico", href: "#diagnostico" },
  { label: "Casos", href: "#casos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Quién soy", href: "#nosotros" },
  { label: "FAQ", href: "#faq" },
];

const HERO_STATS = [
  { value: "5+", label: "Sistemas y CRMs construidos" },
  { value: "120h → 40h", label: "Horas ahorradas al mes en un caso real" },
  { value: "2020", label: "Trabajando con IA aplicada a negocios" },
];

/* Fondo del hero: el mismo asset de la referencia Watermelon/Hero3. */
const HERO_BG = "https://assets.watermelon.sh/hero-3-bg.avif";

const PASOS = [
  {
    numero: "01",
    titulo: "Mapeamos tus procesos",
    texto: "Revisamos cómo opera hoy tu equipo: qué hacen a mano, en qué herramientas, y dónde se pierde más tiempo.",
  },
  {
    numero: "02",
    titulo: "Priorizamos por impacto",
    texto: "No todo se automatiza igual de bien. Encontramos los procesos donde la IA suma de verdad y el ROI se nota rápido.",
  },
  {
    numero: "03",
    titulo: "Construimos e integramos",
    texto: "Agentes de IA, automatizaciones o un CRM a medida, conectados a lo que ya usas: Shopify, WhatsApp, planillas, tus APIs.",
  },
  {
    numero: "04",
    titulo: "Medimos y dejamos control humano donde importa",
    texto: "La IA decide lo operativo; una persona revisa lo crítico. Medimos resultados y ajustamos con datos reales.",
  },
];

const ESCENARIOS = [
  {
    situacion: "Tu equipo pierde horas copiando información entre planillas y sistemas.",
    paso: "Partimos automatizando ese proceso",
    detalle: "Detectamos la tarea manual de mayor volumen y la conectamos para que fluya sola, sin errores humanos.",
  },
  {
    situacion: "Tienes datos de clientes desordenados en Excel, WhatsApp y el correo.",
    paso: "Partimos con un CRM a medida",
    detalle: "Centralizamos la información de tus clientes en una herramienta hecha para cómo trabaja tu equipo.",
  },
  {
    situacion: "Ya tienes procesos digitales y quieres sumar IA con criterio, no por moda.",
    paso: "Ahí diseñamos agentes de IA",
    detalle: "Aplicamos IA donde realmente suma valor, dejando control humano en las decisiones críticas.",
  },
];

const CASOS = [
  {
    numero: "01",
    cliente: "Lovely Hair",
    titulo: "Diagnóstico y plan de automatización",
    texto:
      "Análisis completo del negocio (agenda, clientes, ventas) y un plan priorizado de qué automatizar primero, con portal de seguimiento para el cliente.",
    logo: "/logo-lovelyhair.png",
  },
  {
    numero: "02",
    cliente: "Ramaeduc",
    titulo: "CRM educativo",
    texto: "CRM a medida construido con Lovable para centralizar la información de alumnos y automatizar el seguimiento administrativo.",
  },
  {
    numero: "03",
    cliente: "Postulo.cl",
    titulo: "Plataforma de postulaciones",
    texto: "Sistema que ordena y automatiza el flujo de postulantes, desde el registro hasta el seguimiento, reemplazando planillas sueltas.",
  },
  {
    numero: "04",
    cliente: "Fyno",
    titulo: "CRM a medida",
    texto: "Herramienta interna para gestionar clientes y operación diaria, construida con Lovable a la medida del flujo de trabajo del equipo.",
  },
  {
    numero: "05",
    cliente: "SumUp",
    titulo: "CRM de Retention",
    texto: "Durante mi paso por SumUp diseñé un CRM interno orientado a Retention, para dar seguimiento a clientes en riesgo de fuga.",
    logo: "/logo-sumup.png",
  },
];

const SERVICIOS = [
  {
    icon: FaRobot,
    titulo: "Agentes de IA y Automatización",
    texto:
      "Agentes que atienden clientes, califican leads o hacen seguimiento por WhatsApp, email o tu web, integrados a tus sistemas y con reglas claras de cuándo escalar a una persona.",
  },
  {
    icon: FaLayerGroup,
    titulo: "CRMs y Plataformas a Medida",
    texto:
      "Construimos CRMs y herramientas internas a medida (con Lovable y stack propio) para gestionar clientes, postulaciones o retención sin depender de un software genérico.",
  },
  {
    icon: FaPlug,
    titulo: "Integraciones y APIs",
    texto:
      "Conectamos tus herramientas entre sí: Shopify, pasarelas de pago, WhatsApp Business, planillas, CRMs y APIs propias o de terceros.",
  },
  {
    icon: FaHandshake,
    titulo: "Acompañamiento Continuo",
    texto: "La automatización no se instala y se olvida. Monitoreamos, ajustamos y sumamos nuevos procesos a medida que tu negocio crece.",
  },
];

const VENTAJAS = [
  {
    tag: "Menos trabajo repetitivo",
    titulo: "Tu equipo se enfoca en lo que importa",
    texto: "Sacamos de las manos de tu equipo las tareas mecánicas, para que dediquen su tiempo a decisiones y relaciones con clientes.",
  },
  {
    tag: "IA aplicada con criterio",
    titulo: "IA donde suma, control humano donde es crítico",
    texto: "Definimos junto contigo qué decisiones puede tomar un agente y cuáles siempre pasan por una persona.",
  },
  {
    tag: "Integrado a tu operación",
    titulo: "Conectado a lo que ya usas",
    texto: "Shopify, WhatsApp Business, planillas, CRMs, APIs propias. No te pedimos cambiar todo tu stack.",
  },
  {
    tag: "Enfoque data-driven",
    titulo: "Medimos el impacto real",
    texto: "Horas ahorradas, tiempos de respuesta, tasas de conversión. Medimos cada automatización para saber qué mover después.",
  },
];

const PERFIL_STATS = [
  { valor: "5+ sistemas", etiqueta: "CRMs y plataformas a medida construidos y en uso" },
  { valor: "APIs & Shopify", etiqueta: "experiencia integrando sistemas y tiendas online" },
  { valor: "Data-driven", etiqueta: "mido, priorizo y optimizo cada automatización" },
  { valor: "IA con criterio", etiqueta: "IA donde suma, control humano donde es crítico" },
];

const COMPANIES = [
  { name: "SumUp", src: "/logo-sumup.png" },
  { name: "Capitaria", src: "/logo-capitaria.png" },
  { name: "Grupo Air", src: "/logo-grupoair.png" },
];

const CERTS = [
  "Reforge · Growth",
  "Reforge · Growth Marketing",
  "Reforge · Retention & Engagement",
  "Reforge · Growth Leadership",
  "UC Berkeley · Marketing Analytics (MicroMasters)",
  "Wharton · Customer Analytics",
  "Wharton · Connected Strategy",
  "Wharton · Business Strategy",
  "Curtin · Digital Branding & Engagement",
];

const FAQS = [
  {
    q: "¿La IA va a reemplazar a mi equipo?",
    a: "No es el objetivo. Automatizamos las tareas repetitivas y de bajo valor para que tu equipo se dedique a lo que realmente requiere criterio humano.",
  },
  {
    q: "¿Qué tan rápido se ven resultados?",
    a: "Depende del proceso, pero priorizamos siempre por impacto y velocidad de implementación. Muchas automatizaciones e integraciones se pueden tener funcionando en semanas.",
  },
  {
    q: "¿Necesito saber de tecnología para trabajar con ustedes?",
    a: "No. Partimos con un diagnóstico en tu idioma, sin tecnicismos, y te explicamos cada decisión en el camino.",
  },
  {
    q: "¿Qué pasa con mis datos y los de mis clientes?",
    a: "Trabajamos con las herramientas e integraciones que tú definas, respetando tus políticas de datos. Donde hay decisiones sensibles, dejamos control humano explícito.",
  },
  {
    q: "¿Con qué plataformas trabajan?",
    a: "Shopify, WhatsApp Business, CRMs, planillas, APIs propias y de terceros, y herramientas de IA aplicadas a tu operación.",
  },
  {
    q: "¿Cómo cobran por su servicio?",
    a: "Para proyectos puntuales cobramos un valor fijo definido en la primera conversación, según alcance y complejidad. Para acompañamiento continuo, el modelo es un fee de puesta en marcha más una mensualidad.",
  },
];

const EMAIL = "fabian@specterspro.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/fserranop/";

/* ---------- Página ---------- */

export default function Home() {
  return (
    <>
      <Hero3
        logoText="SpectersAI"
        navItems={NAV_ITEMS}
        signInText="Hablemos"
        signInHref={`mailto:${EMAIL}`}
        tagline="IA aplicada. Diseñada para pymes reales."
        titleLine1="Automatizamos lo repetitivo"
        titleLine2="de tu negocio con IA."
        description="Diagnosticamos tus procesos y construimos agentes de IA, integraciones y CRMs a medida — IA donde suma, control humano donde es crítico."
        primaryCtaText="Agenda una llamada"
        primaryCtaHref={`mailto:${EMAIL}`}
        secondaryCtaText="Cómo trabajamos"
        secondaryCtaHref="#diagnostico"
        backgroundImage={HERO_BG}
        stats={HERO_STATS}
        scrollText="Descubre cómo"
        scrollHref="#diagnostico"
      />

      <div className="dark bg-background text-foreground">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-20">
          {/* ---------- Diagnóstico ---------- */}
          <section id="diagnostico" className="py-20 lg:py-28 scroll-mt-24 relative">
            <div className="grid-fade absolute inset-x-0 top-0 h-[420px] -z-10" />
            <Reveal className="max-w-2xl">
              <motion.p variants={fadeUp} className="text-xs font-medium uppercase tracking-widest text-coral">
                Primero, el diagnóstico
              </motion.p>
              <motion.h2 variants={fadeUp} className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                No toda tarea merece un agente de IA
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-6 text-lg text-zinc-400 leading-relaxed">
                La mayoría de las agencias de IA parte vendiéndote un chatbot.
                Nosotros partimos entendiendo tu operación: qué hace tu equipo
                hoy a mano y dónde se pierde más tiempo. Priorizamos según
                impacto real, no según lo que está de moda.
              </motion.p>
            </Reveal>

            <Reveal className="mt-8 rounded-2xl border border-coral/25 bg-coral/[0.08] p-6 sm:p-7 max-w-2xl">
              <motion.p variants={fadeUp} className="text-xl font-light tracking-tight text-coral">
                IA donde suma, control humano donde es crítico.
              </motion.p>
              <motion.p variants={fadeUp} className="mt-2 text-zinc-400 leading-relaxed">
                Automatizamos lo repetitivo y dejamos las decisiones críticas en
                manos de tu equipo. Trabajamos con IA desde 2020, así que
                sabemos dónde de verdad aporta.
              </motion.p>
            </Reveal>

            <Reveal className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PASOS.map((p) => (
                <motion.div
                  key={p.numero}
                  variants={fadeUp}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors"
                >
                  <span className="text-sm font-medium text-coral">{p.numero}</span>
                  <h3 className="mt-2 text-lg font-medium tracking-tight">{p.titulo}</h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{p.texto}</p>
                </motion.div>
              ))}
            </Reveal>
          </section>

          {/* ---------- Escenarios ---------- */}
          <section className="py-20 lg:py-28 border-t border-white/10">
            <Reveal className="max-w-2xl">
              <motion.p variants={fadeUp} className="text-xs font-medium uppercase tracking-widest text-coral">
                Cómo se ve en la práctica
              </motion.p>
              <motion.h2 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                El diagnóstico define por dónde partir
              </motion.h2>
            </Reveal>
            <Reveal className="mt-12 grid md:grid-cols-3 gap-4">
              {ESCENARIOS.map((e, i) => (
                <motion.article
                  key={i}
                  variants={fadeUp}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 flex flex-col"
                >
                  <span className="text-sm font-medium text-coral">Escenario {i + 1}</span>
                  <p className="mt-4 text-lg font-medium tracking-tight leading-snug">“{e.situacion}”</p>
                  <div className="mt-auto pt-6">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <FaArrowRight className="h-3 w-3 text-coral" />
                      <span>{e.paso}</span>
                    </div>
                    <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{e.detalle}</p>
                  </div>
                </motion.article>
              ))}
            </Reveal>
          </section>

          {/* ---------- Casos ---------- */}
          <section id="casos" className="py-20 lg:py-28 border-t border-white/10 scroll-mt-24">
            <Reveal className="max-w-2xl">
              <motion.p variants={fadeUp} className="text-xs font-medium uppercase tracking-widest text-coral">
                Trabajo en producción
              </motion.p>
              <motion.h2 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                Sistemas que ya construí
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-5 text-lg text-zinc-400 leading-relaxed">
                No es teoría: esto es parte de lo que he construido para negocios y equipos reales.
              </motion.p>
            </Reveal>
            <Reveal className="mt-12 grid sm:grid-cols-2 gap-4">
              {CASOS.map((c) => (
                <motion.article
                  key={c.numero}
                  variants={fadeUp}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 flex flex-col"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-coral">{c.numero}</span>
                    {c.logo ? (
                      <LogoChip src={c.logo} name={c.cliente} />
                    ) : (
                      <span className="text-lg font-light tracking-tight text-zinc-400">{c.cliente}</span>
                    )}
                  </div>
                  <h3 className="mt-4 text-xl font-medium tracking-tight">{c.titulo}</h3>
                  <p className="mt-3 text-zinc-400 leading-relaxed">{c.texto}</p>
                </motion.article>
              ))}
            </Reveal>
          </section>

          {/* ---------- Servicios ---------- */}
          <section id="servicios" className="py-20 lg:py-28 border-t border-white/10 scroll-mt-24">
            <Reveal className="max-w-2xl">
              <motion.p variants={fadeUp} className="text-xs font-medium uppercase tracking-widest text-coral">
                Nuestros servicios
              </motion.p>
              <motion.h2 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                Lo que hacemos para que tu operación se ordene sola
              </motion.h2>
            </Reveal>

            <Reveal className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-br from-coral/[0.10] via-white/[0.02] to-coral/[0.03] p-8 lg:p-10 grid lg:grid-cols-[1.3fr_1fr] gap-8 items-center">
              <motion.div variants={fadeUp}>
                <span className="text-sm font-medium text-coral flex items-center gap-2">
                  <FaMagnifyingGlassChart /> 00 · Lo primero
                </span>
                <h3 className="mt-3 text-2xl sm:text-3xl font-light tracking-tight">Diagnóstico de Automatización</h3>
                <p className="mt-4 text-zinc-400 leading-relaxed">
                  Antes de construir nada, mapeamos tu operación completa y
                  priorizamos qué automatizar primero según impacto y esfuerzo.
                </p>
              </motion.div>
              <motion.ul variants={fadeUp} className="space-y-3">
                {[
                  "Mapeo de procesos manuales y herramientas actuales",
                  "Priorización por impacto: horas, errores y costo",
                  "Plan de acción concreto, con alcance y plazos",
                ].map((it) => (
                  <li key={it} className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm">
                    <FaCheck className="mt-0.5 h-3.5 w-3.5 text-coral shrink-0" />
                    {it}
                  </li>
                ))}
              </motion.ul>
            </Reveal>

            <Reveal className="mt-4 grid sm:grid-cols-2 gap-4">
              {SERVICIOS.map((s) => (
                <motion.article
                  key={s.titulo}
                  variants={fadeUp}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 lg:p-9 hover:bg-white/[0.04] transition-colors"
                >
                  <s.icon className="h-5 w-5 text-coral" />
                  <h3 className="mt-4 text-xl font-medium tracking-tight">{s.titulo}</h3>
                  <p className="mt-3 text-zinc-400 leading-relaxed">{s.texto}</p>
                </motion.article>
              ))}
            </Reveal>
          </section>

          {/* ---------- Ventajas ---------- */}
          <section className="py-20 lg:py-28 border-t border-white/10">
            <Reveal className="max-w-2xl">
              <motion.p variants={fadeUp} className="text-xs font-medium uppercase tracking-widest text-coral">
                Por qué funciona
              </motion.p>
              <motion.h2 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                Ventajas de automatizar con criterio
              </motion.h2>
            </Reveal>
            <Reveal className="mt-12 grid sm:grid-cols-2 gap-x-12 gap-y-10">
              {VENTAJAS.map((v) => (
                <motion.div key={v.titulo} variants={fadeUp} className="border-t border-white/10 pt-6">
                  <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">{v.tag}</p>
                  <h3 className="mt-2 text-xl font-medium tracking-tight">{v.titulo}</h3>
                  <p className="mt-3 text-zinc-400 leading-relaxed">{v.texto}</p>
                </motion.div>
              ))}
            </Reveal>
          </section>

          {/* ---------- Quién soy ---------- */}
          <section id="nosotros" className="py-20 lg:py-28 border-t border-white/10 scroll-mt-24">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 lg:items-start">
              <Reveal>
                <motion.p variants={fadeUp} className="text-xs font-medium uppercase tracking-widest text-coral">
                  Quién soy
                </motion.p>
                <motion.h2 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                  Hola, soy Fabián
                </motion.h2>
                <motion.p variants={fadeUp} className="mt-3 font-medium text-zinc-400">
                  Fundador de SpectersAI · Ingeniero Civil Industrial
                </motion.p>

                <motion.div variants={fadeUp} className="lg:hidden mt-8 grid grid-cols-2 gap-4">
                  <div className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex items-center gap-4">
                    <Avatar src="/fabian.jpg" initials="FS" alt="Fabián Serrano" className="w-16 h-16" />
                    <div>
                      <p className="text-lg font-medium tracking-tight">Fabián Serrano</p>
                      <p className="text-sm text-zinc-400">Santiago, Chile</p>
                    </div>
                  </div>
                  {PERFIL_STATS.map((s) => (
                    <div key={s.valor} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                      <p className="text-xl font-medium tracking-tight text-coral">{s.valor}</p>
                      <p className="mt-2 text-sm text-zinc-400 leading-snug">{s.etiqueta}</p>
                    </div>
                  ))}
                </motion.div>

                <motion.p variants={fadeUp} className="mt-8 text-lg text-zinc-400 leading-relaxed">
                  Llevo más de 7 años entre ventas, growth, retención y customer
                  success, y en paralelo construyendo software: CRMs,
                  integraciones y automatizaciones para negocios reales.
                </motion.p>
                <motion.p variants={fadeUp} className="mt-4 text-lg text-zinc-400 leading-relaxed">
                  He construido CRMs a medida con Lovable para Ramaeduc,
                  Postulo.cl y Fyno, diseñé el CRM de Retention que usamos en
                  SumUp, e hice el diagnóstico y plan de automatización de
                  Lovely Hair. Tengo experiencia integrando APIs, Shopify y
                  herramientas de IA a operaciones reales, además de fundar
                  Conquerspro, un ecommerce que hice crecer con más de $250M
                  CLP en ventas.
                </motion.p>

                <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-normal text-black shadow-lg transition-all hover:bg-zinc-200"
                  >
                    Conversemos <FaArrowRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                  >
                    <FaLinkedin className="h-4 w-4" /> Ver mi LinkedIn
                  </a>
                </motion.div>

                <motion.div variants={fadeUp} className="mt-10">
                  <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">He trabajado en</p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4">
                    {COMPANIES.map((c) => (
                      <LogoChip key={c.name} src={c.src} name={c.name} />
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="lg:hidden mt-10">
                  <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">Certificaciones</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {CERTS.map((c) => (
                      <li key={c} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-400">
                        {c}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Reveal>

              <div className="hidden lg:block">
                <Reveal className="grid grid-cols-2 gap-4">
                  <motion.div variants={fadeUp} className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex items-center gap-4">
                    <Avatar src="/fabian.jpg" initials="FS" alt="Fabián Serrano" className="w-16 h-16" />
                    <div>
                      <p className="text-lg font-medium tracking-tight">Fabián Serrano</p>
                      <p className="text-sm text-zinc-400">Santiago, Chile</p>
                    </div>
                  </motion.div>
                  {PERFIL_STATS.map((s) => (
                    <motion.div key={s.valor} variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                      <p className="text-xl font-medium tracking-tight text-coral">{s.valor}</p>
                      <p className="mt-2 text-sm text-zinc-400 leading-snug">{s.etiqueta}</p>
                    </motion.div>
                  ))}
                </Reveal>
                <div className="mt-10">
                  <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">Certificaciones</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {CERTS.map((c) => (
                      <li key={c} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-400">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ---------- FAQ ---------- */}
          <section id="faq" className="py-20 lg:py-28 border-t border-white/10 scroll-mt-24">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12">
              <Reveal>
                <motion.p variants={fadeUp} className="text-xs font-medium uppercase tracking-widest text-coral">
                  Dudas comunes
                </motion.p>
                <motion.h2 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                  Preguntas frecuentes
                </motion.h2>
                <motion.p variants={fadeUp} className="mt-5 text-zinc-400 leading-relaxed">
                  ¿Tienes otra duda? Escríbenos a{" "}
                  <a href={`mailto:${EMAIL}`} className="font-medium text-white underline decoration-coral decoration-2 underline-offset-4">
                    {EMAIL}
                  </a>{" "}
                  y te respondemos a la brevedad.
                </motion.p>
              </Reveal>
              <Reveal className="space-y-3">
                {FAQS.map((f) => (
                  <motion.details key={f.q} variants={fadeUp} className="group rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-5">
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-lg font-medium tracking-tight">
                      {f.q}
                      <span className="faq-icon grid place-items-center w-8 h-8 rounded-full bg-coral text-white text-xl shrink-0 transition-transform">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-zinc-400 leading-relaxed">{f.a}</p>
                  </motion.details>
                ))}
              </Reveal>
            </div>
          </section>

          {/* ---------- CTA final ---------- */}
          <section className="py-20 lg:py-28 border-t border-white/10">
            <Reveal className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-coral/[0.08] to-transparent px-6 sm:px-12 lg:px-16 pt-16 pb-10 relative overflow-hidden">
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight max-w-3xl">
                ¿Listo para <span className="text-coral">automatizar</span> tu negocio?
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-6 text-lg text-zinc-400 leading-relaxed max-w-xl">
                Conversemos. Partimos con un diagnóstico, y de ahí vemos si lo
                tuyo es un agente de IA, una integración o un CRM a medida.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 inline-flex items-start gap-3 rounded-2xl border border-coral/25 bg-coral/[0.08] px-5 py-4 max-w-xl">
                <FaScaleBalanced className="mt-0.5 h-5 w-5 text-coral shrink-0" />
                <p className="text-sm text-zinc-300 leading-relaxed">
                  <span className="font-medium text-white">Trabajamos hasta que quedes conforme.</span>{" "}
                  Si algún entregable no te convence, lo seguimos desarrollando. Sin letra chica.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-5">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-full bg-coral px-7 py-3.5 font-medium text-white hover:bg-coral/85 transition-colors"
                >
                  Escríbenos <FaArrowRight className="h-3.5 w-3.5" />
                </a>
                <p className="text-sm text-zinc-500">
                  Te respondemos a la brevedad,
                  <br className="sm:hidden" /> sin vueltas.
                </p>
              </motion.div>
            </Reveal>
          </section>

          {/* ---------- Footer ---------- */}
          <footer className="py-10 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="text-lg font-light tracking-tight">SpectersAI</div>
            <nav className="flex flex-wrap gap-6 text-sm text-zinc-400">
              {NAV_ITEMS.map((l) => (
                <a key={l.href} href={l.href} className="hover:text-white transition-colors">
                  {l.label}
                </a>
              ))}
            </nav>
            <p className="text-sm text-zinc-600">© {new Date().getFullYear()} SpectersAI</p>
          </footer>
        </div>
      </div>
    </>
  );
}
