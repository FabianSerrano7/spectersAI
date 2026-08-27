import { Hero3 } from "@/components/ui/hero-3";
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

/* ---------- Datos ---------- */

const NAV_LINKS = [
  { label: "Diagnóstico", href: "#diagnostico" },
  { label: "Servicios", href: "#servicios" },
  { label: "Quién soy", href: "#nosotros" },
  { label: "Preguntas frecuentes", href: "#faq" },
];

const HERO_STATS = [
  { value: "5+", label: "Sistemas y CRMs construidos" },
  { value: "120h → 40h", label: "Horas ahorradas al mes en un caso real" },
  { value: "2020", label: "Trabajando con IA aplicada a negocios" },
];

/* Fondo del hero: gradiente + grilla generados en SVG, sin depender de
   una imagen externa (evita 404s/hotlink-blocking en producción). */
const HERO_BG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1200" viewBox="0 0 1920 1200">
  <defs>
    <radialGradient id="g1" cx="78%" cy="12%" r="55%">
      <stop offset="0%" stop-color="#c8ef6f" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#c8ef6f" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="12%" cy="85%" r="55%">
      <stop offset="0%" stop-color="#f37262" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#f37262" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1920" height="1200" fill="#08090b"/>
  <rect width="1920" height="1200" fill="url(#grid)"/>
  <rect width="1920" height="1200" fill="url(#g1)"/>
  <rect width="1920" height="1200" fill="url(#g2)"/>
</svg>
`.trim());

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
    <>
      <Hero3
        logoText="SpectersAI"
        navItems={NAV_LINKS.map((l) => ({ label: l.label, href: l.href }))}
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
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10">
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
    </>
  );
}
