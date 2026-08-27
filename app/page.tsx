"use client";

import { motion, type Variants } from "motion/react";
import {
  FaArrowRight,
  FaCheck,
  FaRobot,
  FaPlug,
  FaLayerGroup,
  FaHandshake,
  FaScaleBalanced,
  FaLinkedin,
} from "react-icons/fa6";
import { Hero3 } from "@/components/ui/hero-3";
import { RotatingWord } from "@/components/rotating-word";
import {
  ClaudeIcon,
  GeminiIcon,
  LovableIcon,
  ChatGPTIcon,
  CloudflareIcon,
  VercelIcon,
  GitHubIcon,
} from "@/components/brand-icons";
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
  { label: "Cómo trabajamos", href: "#diagnostico" },
  { label: "Servicios", href: "#servicios" },
  { label: "Stack", href: "#stack" },
  { label: "Quién soy", href: "#nosotros" },
  { label: "FAQ", href: "#faq" },
];

const BUSINESS_TYPES = [
  "Peluquería",
  "Barbería",
  "Automotora",
  "Taller Mecánico",
  "Panadería",
  "Estudio Jurídico",
  "Clínica",
  "Consulta Médica",
  "Veterinaria",
  "Restaurante",
  "Inmobiliaria",
  "Empresa",
];

const HERO_STATS = [
  { value: "120h → 40h", label: "Horas ahorradas al mes, en un caso real" },
  { value: "5+", label: "Sistemas y automatizaciones en producción" },
  { value: "Gratis", label: "El diagnóstico inicial, sin costo ni compromiso" },
];

/* Fondo del hero: el mismo asset de la referencia Watermelon/Hero3. */
const HERO_BG = "https://assets.watermelon.sh/hero-3-bg.avif";

const DOLORES = [
  "Agendas y confirmas horas a mano, por WhatsApp, todo el día.",
  "La info de tus clientes está repartida entre Excel, WhatsApp y el cuaderno del mostrador.",
  "Si alguien pregunta algo fuera de horario, tiene que esperar hasta el día siguiente.",
  "Sabes que hay tareas que se podrían automatizar, pero no sabes por dónde partir ni si vale la pena.",
];

const BENEFICIOS = [
  {
    tag: "Menos trabajo manual",
    titulo: "Recuperas horas cada semana",
    texto: "Tu equipo deja de hacer a mano lo que un sistema puede hacer solo: agendar, cotizar, ordenar.",
  },
  {
    tag: "Respuesta inmediata",
    titulo: "Tus clientes nunca esperan",
    texto: "Un agente de IA contesta, agenda y deriva, incluso fuera de horario y los fines de semana.",
  },
  {
    tag: "Todo en un solo lugar",
    titulo: "Se acabaron las planillas sueltas",
    texto: "Un CRM hecho a tu medida centraliza clientes, ventas e historial. Nada se pierde ni se duplica.",
  },
  {
    tag: "Decisiones con datos",
    titulo: "Sabes qué automatizar y qué no",
    texto: "Medimos el impacto de cada automatización, para invertir tu tiempo y plata donde realmente rinde.",
  },
];

const PASOS = [
  {
    numero: "01",
    titulo: "Diagnóstico gratis",
    texto: "Revisamos tu operación real: qué haces a mano, en qué se te va más tiempo. Sin costo, sin compromiso.",
  },
  {
    numero: "02",
    titulo: "Plan priorizado",
    texto: "Te decimos, en tu idioma, qué automatizar primero y cuánto tiempo o plata te ahorra.",
  },
  {
    numero: "03",
    titulo: "Construcción",
    texto: "Armamos el agente, la integración o el CRM, conectado a lo que ya usas hoy.",
  },
  {
    numero: "04",
    titulo: "Acompañamiento",
    texto: "Medimos el resultado real y seguimos ajustando contigo, mes a mes.",
  },
];

const PROYECTOS = [
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
    titulo: "Agentes de IA que nunca duermen",
    texto:
      "Atienden clientes, cotizan y agendan por WhatsApp, mail o tu web, las 24 horas, con reglas claras de cuándo pasarte la conversación a ti.",
  },
  {
    icon: FaLayerGroup,
    titulo: "Un CRM hecho para cómo trabajas tú",
    texto:
      "Nada de forzar tu negocio a encajar en un software genérico. Construimos el CRM a tu medida, con Lovable y stack propio.",
  },
  {
    icon: FaPlug,
    titulo: "Todo tu software hablando entre sí",
    texto:
      "Shopify, WhatsApp Business, pasarelas de pago, planillas, APIs propias o de terceros: conectado, sin trabajo doble.",
  },
  {
    icon: FaHandshake,
    titulo: "No te dejamos solo después de lanzar",
    texto: "Monitoreamos, ajustamos y sumamos automatizaciones nuevas a medida que tu negocio crece.",
  },
];

const STACK = [
  {
    name: "Claude",
    icon: ClaudeIcon,
    texto: "El modelo de IA con el que construimos agentes y automatizaciones a medida.",
  },
  {
    name: "ChatGPT",
    icon: ChatGPTIcon,
    texto: "Otra pieza del stack de IA, según el caso de uso y lo que pida el proyecto.",
  },
  {
    name: "Gemini",
    icon: GeminiIcon,
    texto: "Motor de IA de Google, integrado cuando el negocio ya trabaja en ese ecosistema.",
  },
  {
    name: "Lovable",
    icon: LovableIcon,
    texto: "Con esto construimos CRMs y apps a medida rápido, con código real y editable.",
  },
  {
    name: "Vercel",
    icon: VercelIcon,
    texto: "Despliegue y hosting de lo que construimos, con CI/CD automático en cada cambio.",
  },
  {
    name: "Cloudflare",
    icon: CloudflareIcon,
    texto: "Infraestructura y seguridad para que tus sitios y APIs corran rápido y protegidos.",
  },
  {
    name: "GitHub",
    icon: GitHubIcon,
    texto: "Control de versiones y colaboración en cada proyecto que entregamos.",
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
    q: "¿Cuánto cuesta el diagnóstico inicial?",
    a: "Nada. Es gratis y sin compromiso, así ambos vemos si tiene sentido trabajar juntos.",
  },
  {
    q: "¿Cuánto se demora en verse resultados?",
    a: "Semanas, no meses. Priorizamos por impacto para que notes el cambio rápido.",
  },
  {
    q: "¿Necesito saber de tecnología?",
    a: "No. Hablamos en tu idioma y te explicamos cada decisión en el camino.",
  },
  {
    q: "¿Y si el resultado no me convence?",
    a: "Seguimos ajustando hasta que sí. No entregamos algo a medias.",
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
        tagline="Diagnóstico gratis. Automatización real."
        titleLine1="Automatizamos lo repetitivo"
        titleLine2={
          <>
            <span className="whitespace-nowrap">y construimos</span> software para tu{" "}
            <RotatingWord words={BUSINESS_TYPES} />{" "}
            <span className="whitespace-nowrap">con IA</span>
          </>
        }
        description="Dejamos de hacer a mano lo que un sistema puede hacer solo: agendar, responder, ordenar tus datos. Te mostramos gratis dónde te conviene partir."
        primaryCtaText="Agenda tu diagnóstico gratis"
        primaryCtaHref={`mailto:${EMAIL}`}
        secondaryCtaText="Ver experiencia real"
        secondaryCtaHref="#nosotros"
        backgroundImage={HERO_BG}
        stats={HERO_STATS}
        scrollText="Ver cómo te ayudamos"
        scrollHref="#dolor"
      />

      <div className="dark bg-background text-foreground">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-20">
          {/* ---------- Dolor ---------- */}
          <section id="dolor" className="py-20 lg:py-28 scroll-mt-24 relative">
            <div className="grid-fade absolute inset-x-0 top-0 h-[420px] -z-10" />
            <Reveal className="max-w-2xl">
              <motion.p variants={fadeUp} className="text-xs font-medium uppercase tracking-widest text-coral">
                ¿Te suena familiar?
              </motion.p>
              <motion.h2 variants={fadeUp} className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                Tu negocio factura bien. Tú vives apagando incendios.
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-6 text-lg text-zinc-400 leading-relaxed">
                Pasa en casi todas las pymes que conocemos:
              </motion.p>
            </Reveal>

            <Reveal className="mt-8 grid sm:grid-cols-2 gap-4">
              {DOLORES.map((d) => (
                <motion.div
                  key={d}
                  variants={fadeUp}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                  <p className="text-zinc-300 leading-relaxed">{d}</p>
                </motion.div>
              ))}
            </Reveal>

            <Reveal className="mt-8">
              <motion.p variants={fadeUp} className="text-xl font-light tracking-tight text-coral">
                Nosotros partimos justo ahí.
              </motion.p>
            </Reveal>
          </section>

          {/* ---------- Beneficios ---------- */}
          <section className="py-20 lg:py-28 border-t border-white/10">
            <Reveal className="max-w-2xl">
              <motion.p variants={fadeUp} className="text-xs font-medium uppercase tracking-widest text-coral">
                Lo que cambia
              </motion.p>
              <motion.h2 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                Esto pasa cuando automatizas con criterio
              </motion.h2>
            </Reveal>
            <Reveal className="mt-12 grid sm:grid-cols-2 gap-x-12 gap-y-10">
              {BENEFICIOS.map((v) => (
                <motion.div key={v.titulo} variants={fadeUp} className="border-t border-white/10 pt-6">
                  <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">{v.tag}</p>
                  <h3 className="mt-2 text-xl font-medium tracking-tight">{v.titulo}</h3>
                  <p className="mt-3 text-zinc-400 leading-relaxed">{v.texto}</p>
                </motion.div>
              ))}
            </Reveal>
          </section>

          {/* ---------- Cómo trabajamos ---------- */}
          <section id="diagnostico" className="py-20 lg:py-28 border-t border-white/10 scroll-mt-24">
            <Reveal className="max-w-2xl">
              <motion.p variants={fadeUp} className="text-xs font-medium uppercase tracking-widest text-coral">
                Cómo trabajamos
              </motion.p>
              <motion.h2 variants={fadeUp} className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                Primero el diagnóstico, gratis
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-6 text-lg text-zinc-400 leading-relaxed">
                No te vendemos un chatbot antes de entender tu negocio. Así se ve el proceso:
              </motion.p>
            </Reveal>

            <Reveal className="mt-10 rounded-2xl border border-coral/25 bg-coral/[0.08] p-6 sm:p-7 max-w-2xl">
              <motion.p variants={fadeUp} className="text-xl font-light tracking-tight text-coral">
                IA donde suma, control humano donde es crítico.
              </motion.p>
              <motion.p variants={fadeUp} className="mt-2 text-zinc-400 leading-relaxed">
                No delegamos todo a la IA. Automatizamos lo repetitivo y dejamos las decisiones
                importantes en tus manos. Trabajamos con IA desde 2020, así que sabemos dónde
                realmente aporta.
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

            <Reveal className="mt-12 grid sm:grid-cols-2 gap-4">
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

          {/* ---------- Stack ---------- */}
          <section id="stack" className="py-20 lg:py-28 border-t border-white/10 scroll-mt-24">
            <Reveal className="max-w-2xl">
              <motion.p variants={fadeUp} className="text-xs font-medium uppercase tracking-widest text-coral">
                Con qué construimos
              </motion.p>
              <motion.h2 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                Herramientas reales, no humo
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-5 text-lg text-zinc-400 leading-relaxed">
                IA, infraestructura y desarrollo de verdad: esto es lo que usamos para construir agentes, integraciones y CRMs.
              </motion.p>
            </Reveal>
            <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STACK.map((s) => (
                <motion.div
                  key={s.name}
                  variants={fadeUp}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                    <s.icon className="h-5 w-5 text-coral" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium tracking-tight">{s.name}</h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{s.texto}</p>
                </motion.div>
              ))}
            </Reveal>
          </section>

          {/* ---------- Quién soy ---------- */}
          <section id="nosotros" className="py-20 lg:py-28 border-t border-white/10 scroll-mt-24">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 lg:items-start">
              <Reveal>
                <motion.p variants={fadeUp} className="text-xs font-medium uppercase tracking-widest text-coral">
                  Con quién vas a hablar
                </motion.p>
                <motion.h2 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                  Hola, soy Fabián
                </motion.h2>
                <motion.p variants={fadeUp} className="mt-3 font-medium text-zinc-400">
                  Fundador de SpectersAI, y la persona con la que realmente vas a hablar.
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
                  Antes de fundar SpectersAI, tengo experiencia integrando
                  APIs, Shopify y herramientas de IA a operaciones reales,
                  además de haber fundado Conquerspro, un ecommerce que hice
                  crecer con más de $250M CLP en ventas. Esa experiencia es la
                  que traigo a tu negocio.
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

            <Reveal className="mt-16">
              <motion.p variants={fadeUp} className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                Antes de SpectersAI, ya construí esto
              </motion.p>
              <motion.p variants={fadeUp} className="mt-2 max-w-2xl text-zinc-400 leading-relaxed">
                Es la experiencia con la que arranca SpectersAI, no una promesa sin respaldo.
              </motion.p>
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {PROYECTOS.map((p) => (
                  <motion.article
                    key={p.numero}
                    variants={fadeUp}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium text-coral">{p.numero}</span>
                      {p.logo ? (
                        <LogoChip src={p.logo} name={p.cliente} />
                      ) : (
                        <span className="text-lg font-light tracking-tight text-zinc-400">{p.cliente}</span>
                      )}
                    </div>
                    <h3 className="mt-4 text-lg font-medium tracking-tight">{p.titulo}</h3>
                    <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{p.texto}</p>
                  </motion.article>
                ))}
              </div>
            </Reveal>
          </section>

          {/* ---------- FAQ ---------- */}
          <section id="faq" className="py-20 lg:py-28 border-t border-white/10 scroll-mt-24">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12">
              <Reveal>
                <motion.p variants={fadeUp} className="text-xs font-medium uppercase tracking-widest text-coral">
                  Dudas rápidas
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
                Tu competencia todavía hace todo a mano. <span className="text-coral">Tú no tienes por qué.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-6 text-lg text-zinc-400 leading-relaxed max-w-xl">
                Agenda tu diagnóstico gratis y en 30 minutos sabemos por dónde partir.
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
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral to-[#ff9a4d] px-7 py-3.5 font-medium text-white shadow-lg shadow-coral/25 transition-all duration-200 hover:shadow-coral/40 hover:brightness-110"
                >
                  Agenda tu diagnóstico gratis <FaArrowRight className="h-3.5 w-3.5" />
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
