"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import {
  FaArrowRight,
  FaRobot,
  FaPlug,
  FaLayerGroup,
  FaHandshake,
  FaScaleBalanced,
  FaLinkedin,
  FaChartLine,
  FaCreditCard,
  FaChartPie,
  FaEnvelope,
  FaTableCellsLarge,
  FaClock,
  FaTriangleExclamation,
} from "react-icons/fa6";
import { Hero3 } from "@/components/ui/hero-3";
import {
  ClaudeIcon,
  GeminiIcon,
  LovableIcon,
  ChatGPTIcon,
  CloudflareIcon,
  VercelIcon,
  GitHubIcon,
} from "@/components/brand-icons";
import { LogoChip } from "./Avatar";

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

const HERO_STATS = [
  { value: "120h → 40h", label: "Horas ahorradas al mes, en un caso real" },
  { value: "5+", label: "Sistemas y automatizaciones en producción" },
  { value: "30 min", label: "Diagnóstico inicial, sin compromiso" },
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
    titulo: "Diagnóstico inicial",
    texto: "Revisamos tu operación real: qué haces a mano, en qué se te va más tiempo. Sin compromiso.",
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

const SERVICIOS = [
  {
    slug: "agentes-de-ia",
    icon: FaRobot,
    titulo: "Agentes de IA que contestan por ti",
    texto:
      "Atienden clientes, cotizan y agendan por WhatsApp, mail o tu web, las 24 horas, con reglas claras de cuándo pasarte la conversación a ti.",
  },
  {
    slug: "crm-a-medida",
    icon: FaLayerGroup,
    titulo: "Un CRM hecho para cómo trabajas tú",
    texto:
      "En vez de forzar tu negocio a encajar en un software genérico, construimos el sistema a tu medida, con la estructura que tu operación necesita.",
  },
  {
    slug: "integraciones",
    icon: FaPlug,
    titulo: "Todo tu software hablando entre sí",
    texto:
      "Shopify, WhatsApp Business, pasarelas de pago, planillas, APIs propias o de terceros: conectado, sin trabajo doble.",
  },
  {
    slug: "soporte-continuo",
    icon: FaHandshake,
    titulo: "No te dejamos solo después de lanzar",
    texto: "Monitoreamos, ajustamos y sumamos automatizaciones nuevas a medida que tu negocio crece.",
  },
  {
    slug: "campanas-digitales",
    icon: FaChartLine,
    titulo: "Campañas digitales con tracking real",
    texto:
      "Configuramos tus campañas en Meta Ads y Google Ads, con los eventos de conversión bien medidos, para que sepas qué está funcionando y qué no.",
  },
  {
    slug: "pasarelas-de-pago",
    icon: FaCreditCard,
    titulo: "Pasarelas de pago integradas",
    texto:
      "Conectamos Mercado Pago, Webpay, Flow y otras pasarelas para que cobres pagos únicos o recurrentes sin fricción.",
  },
  {
    slug: "paneles-de-reportes",
    icon: FaChartPie,
    titulo: "Paneles con tus números ordenados",
    texto:
      "Construimos un panel de reportería con tus métricas clave, fácil de revisar, sin armar un informe a mano cada vez.",
  },
  {
    slug: "automatizacion-de-correos",
    icon: FaEnvelope,
    titulo: "Automatización de correos",
    texto:
      "Secuencias automáticas para seguimiento de clientes, cobranza o retención, sin que tengas que enviarlas una por una.",
  },
];

const PROBLEMAS = [
  {
    problema: "Todo se maneja a mano, sin un sistema que lo sostenga",
    solucion:
      "Cotizaciones en papel o WhatsApp, información repartida en varias planillas: ese método se cae en cuanto crece el número de clientes o proveedores. Lo reemplazamos por un sistema centralizado donde cotizar, hacer seguimiento y consultar el historial queda automatizado.",
  },
  {
    problema: "Nadie responde fuera de horario",
    solucion:
      "Un asistente automatizado atiende, cotiza y agenda las 24 horas, y deriva a tu equipo solo cuando realmente hace falta.",
  },
  {
    problema: "Tratas a todos tus clientes igual, aunque no todos aportan lo mismo",
    solucion:
      "Te ayudamos a identificar y priorizar a los clientes que realmente generan valor para tu negocio, con una estrategia de retención distinta para cada segmento.",
  },
  {
    problema: "Tus sistemas no se hablan entre sí",
    solucion:
      "Conectamos pagos, inventario y atención al cliente para que la información se actualice sola, en todos lados a la vez.",
  },
  {
    problema: "La operación depende de que una sola persona esté disponible",
    solucion:
      "Documentamos y sistematizamos los procesos clave, para que el trabajo no se detenga cuando esa persona está de vacaciones, enferma o simplemente ocupada.",
  },
  {
    problema: "Tu sitio web está desactualizado o no funciona bien en el celular",
    solucion:
      "Construimos o renovamos tu sitio con IA: catálogo de productos al día, diseño optimizado para mobile y hosting incluido, sin que tengas que preocuparte de la parte técnica.",
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

const PERFIL_FACTS = [
  { etiqueta: "Experiencia", valor: "+8 años en ventas, tecnología y marketing" },
  { etiqueta: "Especialidad", valor: "Marketing digital, automatización con IA, eCommerce y data analytics" },
  { etiqueta: "Escala", valor: "€35M/mes en revenue gestionados con 15 KAMs (ex-SumUp)" },
  { etiqueta: "Empresas", valor: "SumUp · Capitaria · Grupo Air · Conquerspro" },
  { etiqueta: "Certificaciones", valor: "8 · Reforge, Wharton, UC Berkeley" },
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
    a: "Es una llamada de 30 minutos sin compromiso: revisamos tu operación y te decimos exactamente qué automatizar primero.",
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
        tagline=""
        titleLine1="Automatizamos lo repetitivo"
        titleLine2={
          <>
            y construimos software para tu <span className="text-coral">Negocio</span> con IA
          </>
        }
        description="Le quitamos a pymes y equipos operativos el peso de las tareas repetitivas: construimos sistemas a medida y agentes de IA integrados a las herramientas que tu equipo ya usa. La IA se encarga de lo operativo; las decisiones críticas siguen en manos de personas."
        primaryCtaText="Agenda tu diagnóstico"
        primaryCtaHref={`mailto:${EMAIL}`}
        secondaryCtaText="Ver experiencia real"
        secondaryCtaHref="#nosotros"
        backgroundImage={HERO_BG}
        stats={HERO_STATS}
        scrollText="Ver cómo te ayudamos"
        scrollHref="#dolor"
      />

      <div className="dark bg-background text-foreground">
        <div className="w-full max-w-7xl px-6 sm:px-10 md:px-16 lg:px-20">
          {/* ---------- Dolor ---------- */}
          <section id="dolor" className="py-20 lg:py-28 scroll-mt-24 relative">
            <div className="grid-fade absolute inset-x-0 top-0 h-[420px] -z-10" />
            <Reveal className="max-w-2xl">
              <motion.p variants={fadeUp} className="text-xs font-medium uppercase tracking-widest text-coral">
                ¿Te suena familiar?
              </motion.p>
              <motion.h2 variants={fadeUp} className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                Que tu negocio siga vendiendo más, mejorando la operación.
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
                Primero el diagnóstico
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
                Lo que hacemos para que tu operación esté ordenada y optimizada
              </motion.h2>
            </Reveal>

            <Reveal className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SERVICIOS.map((s) => (
                <motion.article
                  key={s.titulo}
                  variants={fadeUp}
                  className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:p-7 hover:bg-white/[0.04] transition-colors"
                >
                  <s.icon className="h-5 w-5 text-coral" />
                  <h3 className="mt-4 text-lg font-medium tracking-tight">{s.titulo}</h3>
                  <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{s.texto}</p>
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-coral hover:text-[#ff9a4d] transition-colors"
                  >
                    Ver más <FaArrowRight className="h-3 w-3" />
                  </Link>
                </motion.article>
              ))}
            </Reveal>
          </section>

          {/* ---------- Panel en acción ---------- */}
          <section className="py-20 lg:py-28 border-t border-white/10">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
              <Reveal>
                <motion.p variants={fadeUp} className="text-xs font-medium uppercase tracking-widest text-coral">
                  Panel de control
                </motion.p>
                <motion.h2 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                  Controla tu operación, no solo tareas sueltas
                </motion.h2>
                <motion.p variants={fadeUp} className="mt-5 max-w-lg text-lg text-zinc-400 leading-relaxed">
                  Pedidos, pagos y clientes coordinados en un solo panel, sin depender de una planilla ni saltar entre aplicaciones.
                </motion.p>

                <motion.div variants={fadeUp} className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-coral/10 text-coral">
                      <FaTableCellsLarge className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Visibilidad total</p>
                      <p className="text-xs text-zinc-500">Ve en qué etapa está cada pedido o cliente</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-coral/10 text-coral">
                      <FaClock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Velocidad de ejecución</p>
                      <p className="text-xs text-zinc-500">Mide cuánto tarda cada proceso en resolverse</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-coral/10 text-coral">
                      <FaTriangleExclamation className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Alertas inteligentes</p>
                      <p className="text-xs text-zinc-500">Detecta problemas antes de que crezcan</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="mt-8">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral to-[#ff9a4d] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-coral/25 transition-all duration-200 hover:shadow-coral/40 hover:brightness-110"
                  >
                    Ver cómo funciona
                  </a>
                </motion.div>
              </Reveal>

              <Reveal className="relative flex justify-center rounded-2xl border border-white/10 bg-white/[0.02] p-8">
                <div className="relative h-[380px] w-full max-w-md">
                  <motion.div
                    variants={fadeUp}
                    className="absolute top-0 left-0 w-[260px] rounded-xl border border-white/10 bg-background/80 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md"
                  >
                    <p className="text-xs text-zinc-500">Flujo entrante</p>
                    <p className="mt-1 text-lg font-medium tracking-tight">Nuevo pedido detectado</p>
                    <div className="mt-2 flex gap-2 text-[10px]">
                      <span className="rounded-md bg-coral/10 px-2 py-0.5 text-coral">En vivo</span>
                      <span className="rounded-md bg-white/5 px-2 py-0.5 text-zinc-400">Disparador</span>
                    </div>
                    <div className="mt-3 space-y-1 text-xs text-zinc-500">
                      <p>Origen: WhatsApp / Web</p>
                      <p>Región: Chile</p>
                      <p>Estado: Activo</p>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={fadeUp}
                    className="absolute top-28 right-0 z-10 w-[240px] rounded-xl border border-white/10 bg-background/90 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-md"
                  >
                    <p className="text-xs text-zinc-500">Seguimiento</p>
                    <p className="mt-1 text-sm font-medium">Estado de los pedidos</p>
                    <div className="mt-3 flex h-2 w-full gap-1 overflow-hidden rounded-full">
                      <div className="w-[50%] bg-coral" />
                      <div className="w-[30%] bg-blue-400" />
                      <div className="w-[20%] bg-amber-400" />
                    </div>
                    <div className="mt-3 flex gap-3 text-[10px] text-zinc-500">
                      <span>Pendiente</span>
                      <span>En proceso</span>
                      <span>Entregado</span>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={fadeUp}
                    className="absolute bottom-8 left-10 w-[260px] rounded-xl border border-white/10 bg-background/90 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-md"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Ejecución</span>
                      <span className="text-xs text-zinc-500">Sincronizado</span>
                    </div>
                    <p className="mt-2 text-sm text-zinc-400">Acción completada y enviada a los sistemas conectados</p>
                    <div className="mt-3 flex gap-2 text-[10px]">
                      <span className="rounded-md bg-green-500/10 px-2 py-0.5 text-green-500">Listo</span>
                      <span className="rounded-md bg-purple-500/10 px-2 py-0.5 text-purple-400">Distribuido</span>
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ---------- Problemas que resolvemos ---------- */}
          <section id="problemas" className="py-20 lg:py-28 border-t border-white/10 scroll-mt-24">
            <Reveal className="max-w-2xl">
              <motion.p variants={fadeUp} className="text-xs font-medium uppercase tracking-widest text-coral">
                Casos reales
              </motion.p>
              <motion.h2 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                Cómo resolvemos los problemas que tienen empresas como la tuya
              </motion.h2>
            </Reveal>

            <Reveal className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PROBLEMAS.map((p) => (
                <motion.div
                  key={p.problema}
                  variants={fadeUp}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 lg:p-9"
                >
                  <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">Problema</p>
                  <h3 className="mt-2 text-lg font-medium tracking-tight">{p.problema}</h3>
                  <div className="mt-5 border-t border-white/10 pt-5">
                    <p className="text-sm font-medium uppercase tracking-widest text-coral">Cómo lo resolvemos</p>
                    <p className="mt-2 text-zinc-400 leading-relaxed">{p.solucion}</p>
                  </div>
                </motion.div>
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
                Tecnología de nivel profesional, sin depender de una sola marca
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-5 text-lg text-zinc-400 leading-relaxed">
                Elegimos la herramienta según el problema, no al revés. Este es el stack con el que construimos agentes, integraciones y CRMs.
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
                  Fabián Serrano
                </motion.h2>
                <motion.p variants={fadeUp} className="mt-3 font-medium text-zinc-400">
                  Ingeniero Civil Industrial. Santiago, Chile. Fundador de SpectersAI.
                </motion.p>

                <motion.div variants={fadeUp} className="lg:hidden mt-8 divide-y divide-white/10 border-t border-white/10">
                  {PERFIL_FACTS.map((f) => (
                    <div key={f.etiqueta} className="flex items-center justify-between gap-4 py-3">
                      <span className="text-xs uppercase tracking-widest text-zinc-500">{f.etiqueta}</span>
                      <span className="text-sm text-zinc-200 text-right">{f.valor}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.p variants={fadeUp} className="mt-8 text-lg text-zinc-400 leading-relaxed">
                  Llevo <span className="text-foreground font-medium">más de 8 años</span> entre
                  ventas, tecnología y marketing. En SumUp construí desde cero
                  el área de Customer Success para LATAM: llegué a liderar
                  un <span className="text-foreground font-medium">equipo de 15 KAMs</span> a cargo de
                  cuentas que generaban el <span className="text-foreground font-medium">60% del revenue</span> y
                  movían cerca de <span className="text-foreground font-medium">€35M al mes</span>, llevando
                  la cobertura de retención de <span className="text-foreground font-medium">7% a 60%</span> en
                  dos años.
                </motion.p>
                <motion.p variants={fadeUp} className="mt-4 text-lg text-zinc-400 leading-relaxed">
                  Antes de fundar SpectersAI fundé <span className="text-foreground font-medium">Conquerspro</span>,
                  un ecommerce que hice crecer a <span className="text-foreground font-medium">más de $250M CLP en ventas</span>,
                  y llevé una <span className="text-foreground font-medium">agencia de marketing digital</span> que
                  ayudó a más de <span className="text-foreground font-medium">15 empresas, pequeñas, medianas y grandes</span>,
                  con sus campañas en Meta. Hoy aplico esa misma mirada a los negocios con
                  los que trabajo: <span className="text-foreground font-medium">identificar el 20% de clientes que genera el 80% de resultados</span>,
                  construir <span className="text-foreground font-medium">matrices de retención</span> y
                  automatizar con IA.
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

                <motion.div variants={fadeUp} className="lg:hidden mt-10">
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

              <div className="hidden lg:block lg:pt-[92px]">
                <Reveal className="divide-y divide-white/10 border-t border-white/10">
                  {PERFIL_FACTS.map((f) => (
                    <motion.div key={f.etiqueta} variants={fadeUp} className="flex items-center justify-between gap-4 py-3">
                      <span className="text-xs uppercase tracking-widest text-zinc-500">{f.etiqueta}</span>
                      <span className="text-sm text-zinc-200 text-right">{f.valor}</span>
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
                <div className="mt-10">
                  <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">He trabajado en</p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4">
                    {COMPANIES.map((c) => (
                      <LogoChip key={c.name} src={c.src} name={c.name} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
                Agenda tu diagnóstico y en 30 minutos sabemos por dónde partir.
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
                  Agenda tu diagnóstico <FaArrowRight className="h-3.5 w-3.5" />
                </a>
                <p className="text-sm text-zinc-500">
                  Te respondemos a la brevedad,
                  <br className="sm:hidden" /> directo al punto.
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
