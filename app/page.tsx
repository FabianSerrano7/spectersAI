import { Avatar, LogoChip } from "./Avatar";

/* ---------- Gráficos estilo dashboard (SVG) ---------- */

function Ghost({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path
        d="M24 5C14.6 5 8 12.2 8 21.5V40c0 1.8 2.1 2.8 3.5 1.6l3.1-2.6c.8-.7 2-.6 2.7.1l2.9 2.9c.9.9 2.4.9 3.3 0l2.9-2.9c.7-.7 1.9-.8 2.7-.1l3.4 2.7C34 42.9 36 41.9 36 40.1V21.5C40 12.2 33.4 5 24 5Z"
        fill="currentColor"
        transform="translate(2 0)"
      />
      <circle cx="20" cy="21" r="2.6" fill="var(--color-paper)" />
      <circle cx="31" cy="21" r="2.6" fill="var(--color-paper)" />
    </svg>
  );
}

/* Marcador irregular hecho a mano — se pinta detrás del texto */
function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block isolate">
      <svg
        viewBox="0 0 300 90"
        preserveAspectRatio="none"
        className="absolute -inset-x-2 -inset-y-1 -z-10 h-[112%] w-[104%]"
        aria-hidden
      >
        <path
          d="M8 20 C70 12, 150 10, 288 15 C296 15, 297 24, 294 40 C292 56, 296 68, 288 74 C200 80, 90 82, 14 76 C4 75, 2 66, 5 50 C7 38, 3 28, 8 20 Z"
          fill="var(--color-lime)"
        />
      </svg>
      {children}
    </span>
  );
}

/* Subrayado tipo lápiz, con doble trazo y textura */
function PencilUnderline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 20" fill="none" className={className} aria-hidden>
      <path
        d="M4 11C48 6 96 5 150 7c26 1 52 2 84 5"
        stroke="var(--color-coral)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M14 15C70 12 130 12 196 14"
        stroke="var(--color-coral)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeOpacity="0.55"
      />
    </svg>
  );
}

function AreaChart({ className, uid = "d" }: { className?: string; uid?: string }) {
  const line =
    "M4 42 C18 38, 26 42, 38 33 C48 25.5, 56 31, 66 26 C78 20, 92 17, 112 9";
  const gid = `areaFill-${uid}`;
  return (
    <svg viewBox="0 0 120 52" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-lime)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--color-lime)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[14, 26, 38].map((y) => (
        <line key={y} x1="4" y1={y} x2="116" y2={y} stroke="#191913" strokeOpacity="0.06" />
      ))}
      <path d={`${line} L112 52 L4 52 Z`} fill={`url(#${gid})`} />
      <path d={line} stroke="#79b426" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="112" cy="9" r="4" fill="#79b426" stroke="white" strokeWidth="2" />
    </svg>
  );
}

function Gauge({ percent, className, uid = "d" }: { percent: number; className?: string; uid?: string }) {
  const arc = Math.PI * 40; // semicírculo r=40
  const gid = `gaugeGrad-${uid}`;
  return (
    <svg viewBox="0 0 100 58" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-sun)" />
          <stop offset="100%" stopColor="var(--color-coral)" />
        </linearGradient>
      </defs>
      <path
        d="M10 54 A40 40 0 0 1 90 54"
        stroke="#191913"
        strokeOpacity="0.08"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M10 54 A40 40 0 0 1 90 54"
        stroke={`url(#${gid})`}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${(percent / 100) * arc} ${arc}`}
      />
    </svg>
  );
}

function MiniBars({ className }: { className?: string }) {
  const bars = [18, 26, 22, 34, 30, 42];
  return (
    <svg viewBox="0 0 120 48" fill="none" className={className} aria-hidden>
      {bars.map((h, i) => (
        <rect
          key={i}
          x={6 + i * 19}
          y={46 - h}
          width="11"
          height={h}
          rx="3.5"
          fill={i === bars.length - 1 ? "var(--color-lime)" : "rgba(251,250,246,0.28)"}
        />
      ))}
    </svg>
  );
}

function DeltaChip({ value }: { value: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#e7f5cf] px-2 py-0.5 text-xs font-semibold text-[#4e7a12] tabular-nums">
      <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none" aria-hidden>
        <path d="M2 8.5 6 4l4 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {value}
    </span>
  );
}

/* ---------- Tarjetas flotantes del hero ---------- */

function VentasCard({ className, uid = "d" }: { className?: string; uid?: string }) {
  return (
    <div className={`float-card rounded-2xl bg-white p-5 ${className ?? ""}`}>
      <div className="flex items-center justify-between gap-6">
        <p className="text-sm font-medium text-ink-soft">Ventas atribuidas</p>
        <DeltaChip value="+18,5%" />
      </div>
      <p className="mt-1 font-display text-3xl font-bold tabular-nums tracking-tight">$4.280.590</p>
      <p className="text-xs text-ink-soft/70">vs mes anterior</p>
      <AreaChart className="mt-3 w-full" uid={uid} />
    </div>
  );
}

function DiagnosticoCard({ className, uid = "d" }: { className?: string; uid?: string }) {
  return (
    <div className={`float-card rounded-2xl bg-white p-5 ${className ?? ""}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-ink-soft">Diagnóstico de negocio</p>
        <DeltaChip value="+20 pts" />
      </div>
      <div className="relative mt-3 mx-auto w-36">
        <Gauge percent={80} className="w-full" uid={uid} />
        <p className="absolute inset-x-0 bottom-0 text-center font-display text-2xl font-bold tabular-nums">
          80<span className="text-sm text-ink-soft/60">/100</span>
        </p>
      </div>
      <p className="mt-3 text-center text-xs text-ink-soft/70">
        salud digital de tu negocio
      </p>
    </div>
  );
}

function CampanasCard({ className }: { className?: string }) {
  return (
    <div className={`float-card rounded-2xl bg-night text-paper p-5 ${className ?? ""}`}>
      <div className="flex items-center justify-between gap-6">
        <p className="text-sm font-medium">Meta Ads · Google Ads</p>
        <span className="h-2 w-2 rounded-full bg-lime animate-pulse" />
      </div>
      <MiniBars className="mt-3 w-full" />
      <p className="mt-2 text-xs text-paper/60">campañas optimizadas semana a semana</p>
    </div>
  );
}

function Chip8020({ className }: { className?: string }) {
  return (
    <span
      className={`float-card inline-flex items-center gap-1.5 rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white ${className ?? ""}`}
    >
      ✦ Enfoque 80/20
    </span>
  );
}

function GhostTile({ className }: { className?: string }) {
  return (
    <div className={`float-card grid place-items-center w-14 h-14 rounded-2xl bg-white ${className ?? ""}`}>
      <Ghost className="w-8 h-8 text-ink" />
    </div>
  );
}

/* ---------- Datos ---------- */

const NAV_LINKS = [
  { label: "Diagnóstico", href: "#diagnostico" },
  { label: "Servicios", href: "#servicios" },
  { label: "Quién soy", href: "#nosotros" },
  { label: "Preguntas frecuentes", href: "#faq" },
];

const PASOS = [
  {
    numero: "01",
    titulo: "Revisamos tu data",
    texto: "Si tienes números (ventas, clientes, ticket promedio, márgenes), los analizamos para ver tu situación real. Si no, te ayudamos a empezar a medir.",
  },
  {
    numero: "02",
    titulo: "Priorización 80/20",
    texto: "Encontramos el 20% de productos y clientes que te deja el 80% del margen, y enfocamos el esfuerzo ahí.",
  },
  {
    numero: "03",
    titulo: "Más ventas por cliente y por visita",
    texto: "Detectamos dónde subir el ticket promedio con upselling y cross-selling, y cómo hacer que más visitas de tu web terminen comprando.",
  },
  {
    numero: "04",
    titulo: "Ejecución y medición",
    texto: "Ejecutamos en orden lo que mueve la aguja y medimos cada peso invertido para decidir el siguiente paso. Nada de suerte.",
  },
];

const SERVICIOS = [
  {
    numero: "02",
    titulo: "Optimización Web y E-commerce",
    texto:
      "Creamos o rediseñamos tu sitio web o tienda online, con pasarela de pagos, SSL y velocidad, para que convierta las visitas que ya tienes antes de traer más.",
  },
  {
    numero: "03",
    titulo: "Oferta, Priorización y Ticket Promedio",
    texto:
      "Priorizamos los productos que dejan margen (80/20) y diseñamos estrategias de upselling y cross-selling para subir tu ticket promedio y que cada cliente valga más.",
  },
  {
    numero: "04",
    titulo: "Publicidad en Meta y Google Ads",
    texto:
      "Cuando la base está lista, escalamos con campañas en Facebook, Instagram y Google (Búsqueda, Shopping, Display o Video), medidas y optimizadas.",
  },
  {
    numero: "05",
    titulo: "Acompañamiento Continuo",
    texto:
      "Si tú creces, nosotros crecemos. Nos convertimos en partners durante todo el proceso para que tu negocio aumente en ventas y reconocimiento.",
  },
];

const ESCENARIOS = [
  {
    situacion: "Tienes un buen producto, pero tu web es lenta o no convierte.",
    paso: "Partimos optimizando tu web",
    detalle: "Antes de traer tráfico, arreglamos la casa: velocidad, claridad y flujo de compra.",
    color: "bg-white border border-ink/10",
    acento: "text-coral",
  },
  {
    situacion: "Vendes de todo, pero no sabes qué deja margen ni a quién apuntar.",
    paso: "Partimos por tu oferta (80/20)",
    detalle: "Priorizamos lo rentable y afinamos qué vender, a qué precio y a quién.",
    color: "bg-lime",
    acento: "text-ink/60",
  },
  {
    situacion: "Tu web y tu oferta ya están sólidas y quieres crecer.",
    paso: "Ahí sí, escalamos con Ads",
    detalle: "Recién acá invertir en Meta y Google tiene sentido: amplificamos lo que ya funciona.",
    color: "bg-night text-paper",
    acento: "text-lime",
  },
];

const VENTAJAS = [
  {
    tag: "Mejores resultados",
    titulo: "Aumentarás tus ventas",
    texto:
      "Una buena implementación y optimización de campañas te ayudará a aumentar las ventas de tu negocio, no a quemar presupuesto.",
  },
  {
    tag: "Más alcance de marca",
    titulo: "Mayor reconocimiento",
    texto:
      "Cuando tu marca aparece de manera frecuente frente a los clientes correctos, pasas de ser desconocido a ser la primera opción.",
  },
  {
    tag: "Enfoque analítico y creativo",
    titulo: "Data-driven: las métricas lo son todo",
    texto:
      "El marketing digital no es suerte. Medimos y optimizamos cada métrica de tus campañas para sacarle el máximo a tu presupuesto.",
  },
  {
    tag: "Conviértete en referente",
    titulo: "Posicionamiento en el mercado",
    texto:
      "El posicionamiento es lo que produces en la mente del cliente: que te vean como la opción perfecta cuando necesiten lo que ofreces.",
  },
];

const PERFIL_STATS = [
  { valor: "$50–100 millones", etiqueta: "de pesos mensuales gestionados y optimizados en Meta Ads" },
  { valor: "10+ personas", etiqueta: "experiencia liderando equipos y proyectos" },
  { valor: "Data-driven", etiqueta: "mido, priorizo y optimizo cada peso invertido" },
  { valor: "IA a medida", etiqueta: "experiencia creando herramientas y plataformas con IA" },
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

const LINKEDIN_URL = "https://www.linkedin.com/in/fserranop/";

/* Piezas de la sección "Quién soy" que se renderizan una vez por breakpoint
   (mobile y desktop), para evitar que CSS Grid intente igualar alturas de fila. */
function ProfileCard() {
  return (
    <div className="col-span-2 float-card rounded-2xl bg-white border border-ink/10 p-6 flex items-center gap-4">
      <Avatar src="/fabian.jpg" initials="FS" alt="Fabián Serrano" className="w-16 h-16" />
      <div>
        <p className="font-display text-xl font-bold tracking-tight">Fabián Serrano</p>
        <p className="text-sm text-ink-soft">Ingeniero Civil Industrial · Santiago, Chile</p>
      </div>
    </div>
  );
}

function PerfilStats() {
  return (
    <>
      {PERFIL_STATS.map((s, i) => (
        <div
          key={s.valor}
          className={`float-card rounded-2xl p-6 ${
            i === 0 ? "bg-lime" : i === 3 ? "bg-night text-paper" : "bg-white border border-ink/10"
          }`}
        >
          <p className={`font-display text-2xl font-bold tracking-tight ${i === 3 ? "text-lime" : ""}`}>
            {s.valor}
          </p>
          <p className={`mt-2 text-sm leading-snug ${i === 3 ? "text-paper/70" : "text-ink-soft"}`}>
            {s.etiqueta}
          </p>
        </div>
      ))}
    </>
  );
}

function CertList() {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-widest text-ink-soft/70">
        Certificaciones
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {CERTS.map((c) => (
          <li
            key={c}
            className="rounded-full border border-ink/12 bg-white px-3 py-1 text-xs font-medium text-ink-soft"
          >
            {c}
          </li>
        ))}
      </ul>
    </>
  );
}

const FAQS = [
  {
    q: "¿Por qué no parten altiro con campañas de publicidad?",
    a: "Porque la publicidad amplifica lo que ya existe: si tu web no convierte o tu oferta no está clara, invertir en anuncios es quemar plata. Con el diagnóstico detectamos qué hay que arreglar primero, a veces es optimizar tu sitio, priorizar productos o ajustar precios, y recién ahí invertimos en tráfico.",
  },
  {
    q: "¿Con qué podemos empezar si conozco poco sobre el tema?",
    a: "Con el trabajo que haremos queremos que también aprendas. Partimos haciendo una auditoría de tu empresa a nivel de negocio y marketing digital, y desde ahí comenzamos a ayudarte. Con eso definimos lo mejor a implementar en tu caso.",
  },
  {
    q: "¿Trabajan de manera presencial o remota?",
    a: "Trabajamos remoto por defecto, con reuniones por Zoom o Google Meet según te acomode, lo que nos permite trabajar con clientes de todo Chile y responder rápido. Si el proyecto lo amerita, también podemos visitar tu local o tienda de forma presencial.",
  },
  {
    q: "¿Qué pasa si no me convencen los entregables?",
    a: "Si eso pasa, seguimos desarrollando lo solicitado hasta que quedes conforme con el trabajo. No queremos hacer las cosas a medias, ni menos que no te gusten.",
  },
  {
    q: "¿Cómo cobran por su servicio?",
    a: "Para trabajo puntual (diagnóstico, sitios web, oferta y priorización, u otros proyectos específicos) cobramos un valor fijo que definimos en la primera conversación, según el tamaño y la complejidad de tu negocio. Para campañas de marketing digital en modo de acompañamiento continuo, el modelo es un fee de puesta en marcha más una mensualidad, o un porcentaje del monto invertido en la plataforma (10 a 20%).",
  },
];

const EMAIL = "fabian@specterspro.com";

/* ---------- Página ---------- */

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10">
      {/* ---------- Nav (fijo) ---------- */}
      <header className="sticky top-0 z-50 -mx-5 sm:-mx-8 lg:-mx-10 border-b border-ink/5 bg-paper">
        <div className="flex items-center justify-between px-5 sm:px-8 lg:px-10 py-4">
          <a href="#" className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight">
            <Ghost className="w-8 h-8 text-ink" />
            specters
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-soft">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-ink transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={`mailto:${EMAIL}`}
            className="rounded-full bg-ink text-paper px-5 py-2.5 text-sm font-semibold hover:bg-ink/85 transition-colors"
          >
            Hablemos
          </a>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-6 items-center pt-10 pb-20 lg:pt-16 lg:pb-28">
        <div>
          <h1 className="font-display text-[2.7rem] leading-[1.14] sm:text-6xl sm:leading-[1.12] lg:text-[4.3rem] font-bold tracking-tight">
            Te ayudamos a{" "}
            <Highlight>vender más</Highlight>{" "}
            y{" "}
            <span className="relative inline-block">
              <em className="not-italic text-coral">escalar</em>
              <PencilUnderline className="absolute -bottom-3 left-0 w-full" />
            </span>{" "}
            tu negocio
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-soft leading-relaxed">
            Primero diagnosticamos tu negocio y encontramos el 20% de acciones
            que genera el 80% de los resultados. Después ejecutamos en orden:
            optimizar tu web, afinar tu oferta y, cuando la base está lista,
            invertir en Meta y Google Ads.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${EMAIL}`}
              className="rounded-full bg-ink text-paper px-7 py-3.5 font-semibold hover:bg-ink/85 transition-colors"
            >
              Agenda una llamada →
            </a>
            <a
              href="#diagnostico"
              className="rounded-full border border-ink/20 bg-white px-7 py-3.5 font-semibold hover:border-ink/50 transition-colors"
            >
              Cómo trabajamos
            </a>
          </div>
        </div>

        {/* Collage flotante — desktop */}
        <div className="relative hidden lg:block h-[560px]">
          <div
            className="absolute inset-0 rounded-[3rem]"
            style={{
              background:
                "radial-gradient(380px 300px at 32% 28%, var(--color-mint), transparent 72%), radial-gradient(360px 320px at 74% 72%, var(--color-peach), transparent 72%)",
            }}
          />
          <VentasCard className="absolute left-1 top-10 w-[340px] -rotate-2" />
          <Chip8020 className="absolute right-4 top-6 rotate-3" />
          <DiagnosticoCard className="absolute right-0 top-[176px] w-[250px] rotate-2 z-10" />
          <CampanasCard className="absolute left-8 bottom-8 w-[300px] rotate-1" />
          <GhostTile className="absolute right-14 bottom-4 -rotate-6" />
        </div>

        {/* Collage — mobile/tablet */}
        <div className="lg:hidden relative">
          <div
            className="absolute inset-0 -m-4 rounded-[3rem]"
            style={{
              background:
                "radial-gradient(300px 260px at 25% 20%, var(--color-mint), transparent 72%), radial-gradient(300px 280px at 80% 85%, var(--color-peach), transparent 72%)",
            }}
          />
          <div className="relative grid grid-cols-2 gap-4 items-start">
            <VentasCard className="col-span-2 -rotate-1" uid="m" />
            <DiagnosticoCard className="rotate-1" uid="m" />
            <div className="grid gap-4 justify-items-start">
              <Chip8020 className="rotate-2" />
              <CampanasCard className="-rotate-1" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Diagnóstico ---------- */}
      <section id="diagnostico" className="py-16 lg:py-24 scroll-mt-8">
        <div className="rounded-[2.5rem] bg-night text-paper px-6 sm:px-12 lg:px-16 py-14 lg:py-20 relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(520px 380px at 85% 0%, rgba(200,239,111,0.14), transparent 70%), radial-gradient(480px 360px at 0% 100%, rgba(243,114,98,0.12), transparent 70%)",
            }}
          />
          <div className="relative max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-lime">
              Primero, el diagnóstico
            </p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight">
              No siempre hay que partir por la{" "}
              <em className="not-italic text-coral">publicidad</em>
            </h2>
            <p className="mt-6 text-lg text-paper/70 leading-relaxed">
              La mayoría de las agencias parte vendiéndote campañas. Nosotros
              partimos entendiendo tu negocio: tu oferta, tu sitio web, tus
              precios y tus canales. A veces la oportunidad está en publicidad.
              Pero muchas veces primero hay que optimizar tu web, priorizar los
              productos que de verdad dejan margen, o mejorar tu oferta. Recién
              ahí invertir en tráfico hace sentido.
            </p>
          </div>

          <div className="relative mt-10 rounded-2xl border border-lime/25 bg-lime/10 p-6 sm:p-7 max-w-3xl">
            <p className="font-display text-xl sm:text-2xl font-bold tracking-tight">
              Priorizar es clave.
            </p>
            <p className="mt-2 text-paper/75 leading-relaxed">
              Estoy seguro de que cerca del{" "}
              <span className="font-semibold text-lime">20% de tus productos te deja el 80% del margen</span>.
              El diagnóstico encuentra ese 20% para enfocar ahí tu energía y tu
              presupuesto, en vez de repartirlo en todo por igual.
            </p>
          </div>

          <div className="reveal relative mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PASOS.map((p) => (
              <div key={p.numero} className="rounded-2xl bg-white/[0.06] border border-white/10 p-6">
                <span className="font-display text-sm font-bold text-lime">{p.numero}</span>
                <h3 className="mt-2 font-display text-xl font-bold tracking-tight">{p.titulo}</h3>
                <p className="mt-2 text-sm text-paper/65 leading-relaxed">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Escenarios ---------- */}
      <section className="py-16 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-coral">
            Cómo se ve en la práctica
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight">
            El diagnóstico define por dónde{" "}
            <em className="not-italic text-coral">partir</em>
          </h2>
          <p className="mt-5 text-lg text-ink-soft leading-relaxed">
            Cada negocio parte en un punto distinto. Estos son escenarios típicos
            de dónde suele estar la primera gran oportunidad:
          </p>
        </div>
        <div className="reveal mt-12 grid md:grid-cols-3 gap-4 lg:gap-5">
          {ESCENARIOS.map((e, i) => (
            <article key={i} className={`rounded-3xl p-7 lg:p-8 flex flex-col ${e.color}`}>
              <span className={`font-display text-sm font-bold ${e.acento}`}>
                Escenario {i + 1}
              </span>
              <p className="mt-4 font-display text-lg font-bold tracking-tight leading-snug">
                “{e.situacion}”
              </p>
              <div className="mt-auto pt-6">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span className={e.acento}>→</span>
                  <span>{e.paso}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed opacity-75">{e.detalle}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-ink-soft/80">
          ¿No sabes en cuál estás? Justo para eso es el diagnóstico.
        </p>
      </section>

      {/* ---------- Servicios ---------- */}
      <section id="servicios" className="py-16 lg:py-24 scroll-mt-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-coral">
            Nuestros servicios
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Lo que hacemos para que tu negocio{" "}
            <em className="not-italic text-coral">despegue</em>
          </h2>
        </div>

        <div className="reveal mt-12 grid gap-4 lg:gap-5">
          {/* Servicio destacado */}
          <article
            className="rounded-3xl p-8 lg:p-10 grid lg:grid-cols-[1.3fr_1fr] gap-8 items-center"
            style={{
              background: "linear-gradient(120deg, var(--color-mint) 0%, #eef5d8 55%, var(--color-peach) 100%)",
            }}
          >
            <div>
              <span className="font-display text-sm font-bold text-ink/50">01 · Lo primero</span>
              <h3 className="mt-3 font-display text-3xl font-bold tracking-tight">
                Asesoría y Diagnóstico de Negocio
              </h3>
              <p className="mt-4 leading-relaxed text-ink-soft">
                Antes de invertir un peso en publicidad, analizamos tu negocio
                completo. Te entregamos un plan priorizado con lo que hace más
                sentido hacer primero, que no siempre es marketing.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                "Auditoría de tu presencia digital y tu oferta",
                "Priorización 80/20: foco en lo que mueve la aguja",
                "Plan de acción concreto, con responsables y plazos",
              ].map((item) => (
                <li key={item} className="float-card flex items-start gap-3 rounded-xl bg-white/85 px-4 py-3 text-sm font-medium">
                  <span className="mt-0.5 grid place-items-center w-5 h-5 rounded-full bg-ink text-lime text-[10px] font-bold shrink-0">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
            {SERVICIOS.map((s) => (
              <article key={s.numero} className="rounded-3xl bg-white border border-ink/10 p-7 lg:p-9">
                <span className="font-display font-bold text-sm text-coral">{s.numero}</span>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">{s.titulo}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{s.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Ventajas ---------- */}
      <section id="ventajas" className="py-16 lg:py-24 scroll-mt-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-coral">
            Por qué funciona
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Ventajas de hacer campañas en Meta y Google
          </h2>
        </div>
        <div className="reveal mt-12 grid sm:grid-cols-2 gap-x-12 gap-y-10">
          {VENTAJAS.map((v) => (
            <div key={v.titulo} className="border-t border-ink/10 pt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-soft/70">
                {v.tag}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">{v.titulo}</h3>
              <p className="mt-3 text-ink-soft leading-relaxed">{v.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Quién soy ---------- */}
      {/*
        Dos columnas independientes en desktop (como cualquier layout de 2 columnas
        normal, sin auto-placement de grid: cada una fluye a su propia altura).
        El bloque de foto+hitos y el de certificaciones se renderizan dos veces
        (uno para mobile, oculto en lg:, y otro para desktop, oculto por defecto)
        para poder ubicarlos en el orden correcto en cada breakpoint sin que
        CSS Grid intente igualar alturas de fila entre columnas.
      */}
      <section id="nosotros" className="py-16 lg:py-24 scroll-mt-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 lg:items-start">
          {/* Columna 1 (desktop): identidad, bio, CTA, trayectoria */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-coral">
              Quién soy
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight">
              Hola, soy{" "}
              <em className="not-italic text-coral">Fabián</em>
            </h2>
            <p className="mt-3 font-medium text-ink-soft">
              Fundador de Specters · Ingeniero Civil Industrial
            </p>

            {/* Foto + hitos: solo en mobile, justo después de la identidad */}
            <div className="reveal lg:hidden mt-8 grid grid-cols-2 gap-4">
              <ProfileCard />
              <PerfilStats />
            </div>

            <p className="mt-8 text-lg text-ink-soft leading-relaxed">
              Llevo más de 7 años entre ventas, performance marketing, growth y
              customer success, siempre con el mismo método: entender el problema,
              moverme rápido y generar impacto real en ventas.
            </p>
            <p className="mt-4 text-lg text-ink-soft leading-relaxed">
              He liderado equipos de grandes cuentas de hasta 15 personas con un
              volumen sobre €30M mensuales, gestionado campañas de Meta de
              $50–100M CLP al mes y asesorado a pymes en su web y sus campañas.
              También fundé Conquerspro, un ecommerce de planners que hice crecer
              con más de $250M CLP en ventas vía Meta Ads. Esa experiencia, de
              fundador y de gestor de grandes cuentas, es la que traigo a tu
              negocio.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex rounded-full bg-ink text-paper px-7 py-3.5 font-semibold hover:bg-ink/85 transition-colors"
              >
                Conversemos →
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold underline decoration-coral decoration-2 underline-offset-4 hover:text-coral transition-colors"
              >
                Ver mi LinkedIn
              </a>
            </div>

            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-soft/70">
                He trabajado en
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4">
                {COMPANIES.map((c) => (
                  <LogoChip key={c.name} src={c.src} name={c.name} />
                ))}
              </div>
            </div>

            {/* Certificaciones: solo en mobile, al final */}
            <div className="lg:hidden mt-10">
              <CertList />
            </div>
          </div>

          {/* Columna 2 (desktop): foto + hitos, certificaciones */}
          <div className="hidden lg:block">
            <div className="reveal grid grid-cols-2 gap-4">
              <ProfileCard />
              <PerfilStats />
            </div>
            <div className="mt-10">
              <CertList />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="py-16 lg:py-24 scroll-mt-8">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-coral">Dudas comunes</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight">
              Preguntas frecuentes
            </h2>
            <p className="mt-5 text-ink-soft leading-relaxed">
              ¿Tienes otra duda? Escríbenos a{" "}
              <a href={`mailto:${EMAIL}`} className="font-semibold underline decoration-coral decoration-2 underline-offset-4">
                {EMAIL}
              </a>{" "}
              y te respondemos a la brevedad.
            </p>
          </div>
          <div className="reveal space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group float-card rounded-2xl bg-white px-6 py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-display font-bold text-lg tracking-tight">
                  {f.q}
                  <span className="faq-icon grid place-items-center w-8 h-8 rounded-full bg-lime text-ink text-xl shrink-0 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-ink-soft leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA final + footer ---------- */}
      <section className="pb-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-night text-paper px-6 sm:px-12 lg:px-16 pt-16 pb-10">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(560px 400px at 90% 10%, rgba(200,239,111,0.16), transparent 70%), radial-gradient(520px 380px at 5% 95%, rgba(243,114,98,0.14), transparent 70%)",
            }}
          />
          <div className="relative max-w-3xl">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              ¿Listo para{" "}
              <em className="not-italic text-lime">escalar</em>{" "}
              tu negocio?
            </h2>
            <p className="mt-6 text-lg text-paper/70 leading-relaxed max-w-xl">
              Conversemos. Partimos con un diagnóstico, y de ahí vemos si lo
              tuyo es optimizar tu web, afinar tu oferta o invertir en publicidad.
            </p>
            <div className="mt-8 inline-flex items-start gap-3 rounded-2xl border border-lime/30 bg-lime/10 px-5 py-4 max-w-xl">
              <span className="mt-0.5 grid place-items-center w-6 h-6 rounded-full bg-lime text-ink text-xs font-bold shrink-0">
                ✓
              </span>
              <p className="text-sm text-paper/85 leading-relaxed">
                <span className="font-semibold text-paper">Trabajamos hasta que quedes conforme.</span>{" "}
                Si algún entregable no te convence, lo seguimos desarrollando. Sin letra chica.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a
                href={`mailto:${EMAIL}`}
                className="rounded-full bg-lime text-ink px-7 py-3.5 font-bold hover:bg-lime/85 transition-colors"
              >
                Escríbenos →
              </a>
              <p className="text-sm text-paper/60">
                Te respondemos a la brevedad,
                <br className="sm:hidden" /> sin vueltas.
              </p>
            </div>
          </div>

          <hr className="relative mt-16 border-paper/15" />
          <footer className="relative mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-2 font-display text-xl font-bold">
              <Ghost className="w-6 h-6 text-lime" />
              specters
            </div>
            <nav className="flex flex-wrap gap-6 text-sm text-paper/70">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="hover:text-paper transition-colors">
                  {l.label}
                </a>
              ))}
            </nav>
            <p className="text-sm text-paper/50">
              © {new Date().getFullYear()} Specters, todos los derechos reservados
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
}
