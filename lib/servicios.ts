import type { IconType } from "react-icons";
import {
  FaRobot,
  FaLayerGroup,
  FaPlug,
  FaHandshake,
  FaChartLine,
  FaCreditCard,
  FaChartPie,
  FaEnvelope,
} from "react-icons/fa6";

export type ServicioDetalle = {
  slug: string;
  icon: IconType;
  kicker: string;
  titulo: string;
  resumen: string;
  incluye: string[];
  comoFunciona: string[];
  paraQuien: string;
};

export const SERVICIOS_DETALLE: ServicioDetalle[] = [
  {
    slug: "agentes-de-ia",
    icon: FaRobot,
    kicker: "Atención automatizada",
    titulo: "Agentes de IA que contestan por ti",
    resumen:
      "Un agente entrenado con la información de tu negocio responde a tus clientes por WhatsApp, mail o tu web, las 24 horas, y solo te pasa la conversación cuando de verdad hace falta que intervengas tú.",
    incluye: [
      "Agente conectado a WhatsApp Business, correo o el chat de tu sitio",
      "Entrenado con tu catálogo, precios y forma de responder",
      "Cotiza, agenda y resuelve las preguntas repetidas sin intervención",
      "Reglas claras de cuándo derivarte una conversación a ti",
    ],
    comoFunciona: [
      "Revisamos las conversaciones y preguntas más frecuentes de tu negocio",
      "Entrenamos al agente con esa información y con el tono con el que quieres responder",
      "Lo conectamos al canal que ya usas, sin pedirle a tus clientes que cambien de app",
      "Ajustamos las reglas de derivación según cómo responde en la práctica",
    ],
    paraQuien:
      "Negocios que reciben muchas consultas repetidas por WhatsApp o mail y hoy responden todo a mano, uno por uno.",
  },
  {
    slug: "crm-a-medida",
    icon: FaLayerGroup,
    kicker: "Software a medida",
    titulo: "Un CRM hecho para cómo trabajas tú",
    resumen:
      "En vez de forzar tu negocio a encajar en un software genérico, construimos el sistema con la estructura que tu operación realmente necesita.",
    incluye: [
      "Estructura de datos pensada en tus clientes, no en un template genérico",
      "Vistas y flujos para cada rol de tu equipo (ventas, atención, administración)",
      "Historial de cada cliente centralizado, sin planillas paralelas",
      "Panel de acceso simple, sin curva de aprendizaje larga",
    ],
    comoFunciona: [
      "Mapeamos cómo se mueve hoy la información en tu negocio",
      "Diseñamos la estructura del CRM alrededor de ese flujo real",
      "Construimos el sistema y lo probamos contigo antes de lanzarlo",
      "Capacitamos a tu equipo y ajustamos según el uso real",
    ],
    paraQuien:
      "Negocios que ya probaron un CRM genérico y terminaron usando la mitad de las funciones, o volviendo al Excel.",
  },
  {
    slug: "integraciones",
    icon: FaPlug,
    kicker: "Sistemas conectados",
    titulo: "Todo tu software hablando entre sí",
    resumen:
      "Shopify, WhatsApp Business, pasarelas de pago, planillas, APIs propias o de terceros: conectamos todo para que la información se actualice sola, sin trabajo doble.",
    incluye: [
      "Conexión entre las herramientas que ya usas hoy",
      "Sincronización automática de clientes, pedidos e inventario",
      "Reemplazo del copiar y pegar entre planillas y sistemas",
      "Alertas cuando algo falla en la sincronización, para que no se te escape",
    ],
    comoFunciona: [
      "Revisamos qué sistemas usas y dónde se pierde información entre ellos",
      "Definimos qué datos tienen que viajar de un sistema a otro y cuándo",
      "Construimos las integraciones y las probamos con datos reales",
      "Monitoreamos las primeras semanas para asegurar que todo sincronice bien",
    ],
    paraQuien:
      "Negocios que ya usan varias herramientas (tienda online, WhatsApp, pagos, planillas) pero tienen que traspasar información a mano entre ellas.",
  },
  {
    slug: "soporte-continuo",
    icon: FaHandshake,
    kicker: "Acompañamiento",
    titulo: "No te dejamos solo después de lanzar",
    resumen:
      "Monitoreamos lo que construimos, lo ajustamos y sumamos automatizaciones nuevas a medida que tu negocio crece, en vez de entregarte un sistema y desaparecer.",
    incluye: [
      "Monitoreo de que los sistemas y agentes sigan funcionando bien",
      "Ajustes cuando algo del negocio cambia (precios, catálogo, procesos)",
      "Nuevas automatizaciones a medida que aparecen necesidades",
      "Un canal directo conmigo, sin mesa de ayuda ni tickets",
    ],
    comoFunciona: [
      "Después del lanzamiento, revisamos juntos cómo está funcionando todo",
      "Detectamos qué se puede mejorar o automatizar a continuación",
      "Vamos sumando esos ajustes sin tener que rehacer lo ya construido",
      "Mantenemos una revisión periódica para que el sistema crezca con tu negocio",
    ],
    paraQuien:
      "Negocios que ya tuvieron la experiencia de contratar un desarrollo y quedarse sin soporte apenas terminó el proyecto.",
  },
  {
    slug: "campanas-digitales",
    icon: FaChartLine,
    kicker: "Marketing con datos",
    titulo: "Campañas digitales con tracking real",
    resumen:
      "Configuramos tus campañas en Meta Ads y Google Ads, con los eventos de conversión bien medidos, para que sepas exactamente qué está funcionando y qué no, en vez de invertir a ciegas. Hoy optimizo cerca de $50 a 100 millones de pesos mensuales en Meta Ads.",
    incluye: [
      "Configuración de campañas en Meta Ads (Facebook e Instagram) y Google Ads (Búsqueda, Shopping, Display o Video)",
      "Eventos de conversión conectados a tu sitio, tienda o WhatsApp",
      "Segmentación de audiencias según quién realmente te compra",
      "Optimización semanal, no configurar y olvidar",
      "Reportes con las métricas que importan, no solo alcance e impresiones",
    ],
    comoFunciona: [
      "Revisamos tu producto, tu audiencia y qué resultado quieres conseguir",
      "Configuramos el pixel o la API de conversiones para medir bien",
      "Lanzamos y ajustamos las campañas cada semana según el desempeño real",
      "Te entregamos reportes claros para decidir dónde subir o bajar la inversión",
    ],
    paraQuien:
      "Negocios que ya invierten en Meta Ads o Google Ads pero no tienen claro qué campaña realmente les trae ventas, o que quieren escalar la inversión con datos en vez de a ciegas.",
  },
  {
    slug: "pasarelas-de-pago",
    icon: FaCreditCard,
    kicker: "Cobros sin fricción",
    titulo: "Pasarelas de pago integradas",
    resumen:
      "Conectamos Mercado Pago, Webpay, Flow y otras pasarelas para que cobres pagos únicos o recurrentes sin que tu equipo tenga que perseguir transferencias.",
    incluye: [
      "Integración de la pasarela que ya usas o la que más te convenga",
      "Cobros únicos, recurrentes o con cuotas, según tu negocio",
      "Conciliación automática entre lo cobrado y tu sistema de gestión",
      "Confirmaciones automáticas al cliente cuando el pago se procesa",
    ],
    comoFunciona: [
      "Definimos qué tipo de cobro necesitas (único, suscripción, cuotas)",
      "Conectamos la pasarela a tu sitio, CRM o flujo de venta",
      "Probamos el flujo completo de principio a fin antes de activarlo",
      "Dejamos la conciliación conectada a tu panel de números",
    ],
    paraQuien:
      "Negocios que hoy cobran por transferencia y tienen que confirmar cada pago a mano, o que quieren ofrecer pagos recurrentes.",
  },
  {
    slug: "paneles-de-reportes",
    icon: FaChartPie,
    kicker: "Números ordenados",
    titulo: "Paneles con tus números ordenados",
    resumen:
      "Construimos un panel de reportería con tus métricas clave, fácil de revisar, para que dejes de armar un informe a mano cada semana o cada mes.",
    incluye: [
      "Panel con las métricas que realmente usas para decidir",
      "Datos conectados directo desde tus sistemas, sin copiar y pegar",
      "Vistas simples, pensadas para revisar en minutos, no en horas",
      "Actualización automática, sin depender de que alguien lo arme a mano",
    ],
    comoFunciona: [
      "Definimos juntos qué números necesitas ver y con qué frecuencia",
      "Conectamos las fuentes de datos (ventas, marketing, operación)",
      "Construimos el panel y lo ajustamos con tu feedback",
      "Dejamos todo actualizándose solo, listo para revisar cuando quieras",
    ],
    paraQuien:
      "Negocios que hoy arman un reporte a mano en Excel cada cierto tiempo, juntando números de distintos lados.",
  },
  {
    slug: "automatizacion-de-correos",
    icon: FaEnvelope,
    kicker: "Seguimiento automático",
    titulo: "Automatización de correos",
    resumen:
      "Secuencias automáticas para seguimiento de clientes, cobranza o retención, sin que tengas que redactar y enviar cada correo uno por uno.",
    incluye: [
      "Secuencias automáticas según la etapa en la que está cada cliente",
      "Recordatorios de cobranza sin tener que perseguir a nadie a mano",
      "Correos de retención para clientes que llevan tiempo sin comprar",
      "Personalización automática con los datos de cada cliente",
    ],
    comoFunciona: [
      "Mapeamos los momentos en que hoy le escribes a tus clientes a mano",
      "Diseñamos las secuencias y los disparadores que las activan",
      "Conectamos todo a tu CRM o base de clientes existente",
      "Revisamos resultados y ajustamos el contenido según cómo responden",
    ],
    paraQuien:
      "Negocios que hacen seguimiento de clientes o cobranza escribiendo correos uno por uno, o que simplemente no llegan a hacerlo.",
  },
];

export function getServicioBySlug(slug: string) {
  return SERVICIOS_DETALLE.find((s) => s.slug === slug);
}
