export type SizeTier = {
  label: string;
  extra: number;
};

export type Service = {
  slug: string;
  name: string;
  category: string;
  badge?: string;
  duration: string;
  shortDescription: string;
  description: string;
  basePrice: number;
  sizes?: SizeTier[];
  perks: string[];
  details: { title: string; body: string }[];
  rating: number;
  reviewCount: number;
};

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  benefitTag: string;
  benefitTitle: string;
  benefitBody: string;
  image: string;
};

// Fotos de stock libres (Unsplash), una por categoría, reutilizadas en
// las tarjetas y como galería de cada página de servicio.
export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?q=80&w=1200&auto=format&fit=crop";

// Categorías y servicios del catálogo final de Lovely Hair, definido junto
// a Pamela (dueña) en agosto 2026: de 171 líneas del catálogo actual de
// AgendaPro a 40 servicios, revisados uno a uno por ella en un CCB
// (columna Comentarios) donde confirmó, corrigió o eliminó cada línea.
export const CATEGORIES: Category[] = [
  {
    slug: "coloraciones",
    name: "Coloraciones",
    tagline: "Retoque, baño de color, balayage y mechas",
    benefitTag: "El resultado",
    benefitTitle: "Un color que se ve caro",
    benefitBody:
      "Retoques que no dejan ver la raíz, tonos que duran, y un brillo que no se compra en la droguería.",
    image:
      "https://images.unsplash.com/photo-1560869713-bf165a9cfac1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "cortes-de-cabello",
    name: "Cortes de Cabello",
    tagline: "Mujer, hombre, niños y barba",
    benefitTag: "El resultado",
    benefitTitle: "Un corte que se peina solo",
    benefitBody:
      "Corte a tu medida, para que el pelo caiga bien todos los días, no solo el día que sales de acá.",
    image:
      "https://images.unsplash.com/photo-1700760934268-8aa0ef52ce0a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "alisados-y-botox",
    name: "Alisados y Botox",
    tagline: "Tecnología capilar Hakari",
    benefitTag: "El resultado",
    benefitTitle: "Pelo liso, sin frizz, por semanas",
    benefitBody:
      "Tratamientos de alisado y botox capilar con tecnología brasileña, resultado más duradero y un acabado suave y antifrizz.",
    image:
      "https://images.unsplash.com/photo-1496440543089-3d0eb669f6f6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "rituales-capilares",
    name: "Rituales Capilares",
    tagline: "Detox, reparación y brillo",
    benefitTag: "El resultado",
    benefitTitle: "Pelo que se siente sano",
    benefitBody:
      "Protocolos de reparación profunda para el daño que dejan el calor, el color y el tiempo.",
    image:
      "https://images.unsplash.com/photo-1717160675643-53a7a2ebaa9f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "peinados",
    name: "Peinados",
    tagline: "Ondas, fiesta, novia y brushing",
    benefitTag: "El resultado",
    benefitTitle: "Lista para la ocasión",
    benefitBody:
      "Desde un brushing exprés hasta la prueba de peinado de novia, con productos profesionales y terminación que dura.",
    image:
      "https://images.unsplash.com/photo-1782787229897-2208730e6f01?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "promociones",
    name: "Promociones",
    tagline: "Packs exclusivos por día de la semana",
    benefitTag: "El resultado",
    benefitTitle: "Más conveniente, ciertos días",
    benefitBody:
      "Packs con precio especial válidos ciertos días de la semana, la forma más conveniente de agendar.",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop",
  },
];

export const SERVICES: Service[] = [
  // Coloraciones
  {
    slug: "retoque-de-raiz",
    name: "Retoque de Raíz",
    category: "coloraciones",
    badge: "Más pedido",
    duration: "1 hr 30 min",
    shortDescription: "Cobertura de canas y crecimiento de raíz.",
    description:
      "Cubre la raíz y el crecimiento del color, igualando tu tono habitual con productos profesionales.",
    basePrice: 42900,
    perks: ["Productos profesionales", "Estilistas certificadas"],
    details: [
      { title: "¿Qué incluye?", body: "Aplicación de retoque de raíz, tiempo de pausa y lavado post-color." },
      { title: "¿Cómo prepararte?", body: "Llega con el pelo limpio o recién lavado el día anterior." },
      { title: "Tip de tu estilista", body: "Si pasas seguido las 5 semanas entre retoques, súmale un Post Color Therapy el mismo día." },
    ],
    rating: 4.8,
    reviewCount: 62,
  },
  {
    slug: "bano-de-color-tradicional",
    name: "Baño de Color Tradicional",
    category: "coloraciones",
    duration: "3 hrs",
    shortDescription: "Color de largo a largo, tono a elección.",
    description:
      "El valor puede variar según la evaluación del profesional, largo y condición del cabello a tratar.",
    basePrice: 55000,
    sizes: [
      { label: "S", extra: 0 },
      { label: "M", extra: 10000 },
      { label: "L", extra: 20000 },
      { label: "XL", extra: 30000 },
      { label: "XXL", extra: 40000 },
    ],
    perks: ["Evaluación previa del estilista", "Productos profesionales"],
    details: [
      { title: "¿Qué incluye?", body: "Aplicación de color completo, tiempo de pausa, lavado y secado." },
      { title: "¿Cómo prepararte?", body: "Trae referencias del tono que buscas." },
      { title: "Tip de tu estilista", body: "El precio final depende del largo y cantidad de cabello, confirmado antes de empezar." },
    ],
    rating: 4.7,
    reviewCount: 38,
  },
  {
    slug: "balayage",
    name: "Balayage",
    category: "coloraciones",
    badge: "Popular",
    duration: "5 hrs",
    shortDescription: "Balayage con Olaplex, resultado natural.",
    description:
      "Balayage con Olaplex. El valor es un desde referencial, dependerá de la evaluación del profesional según largo y condición del cabello.",
    basePrice: 110000,
    sizes: [
      { label: "M", extra: 0 },
      { label: "L", extra: 10000 },
      { label: "XL", extra: 20000 },
      { label: "XXL", extra: 30000 },
    ],
    perks: ["Con Olaplex", "Bajo mantenimiento"],
    details: [
      { title: "¿Qué incluye?", body: "Balayage con Olaplex, matización y secado." },
      { title: "¿Cómo prepararte?", body: "Idealmente sin color previo reciente, coméntalo con tu estilista." },
      { title: "Tip de tu estilista", body: "El balayage crece bien, puedes espaciar el mantenimiento varios meses." },
    ],
    rating: 4.9,
    reviewCount: 51,
  },
  {
    slug: "mechas-o-babylights",
    name: "Mechas o Babylights",
    category: "coloraciones",
    duration: "5 hrs",
    shortDescription: "Mechas Olaplex, iluminación natural.",
    description:
      "El valor es un desde referencial, dependerá de la evaluación del profesional según largo y condición del cabello a tratar.",
    basePrice: 109900,
    sizes: [
      { label: "S", extra: 0 },
      { label: "M", extra: 10000 },
      { label: "L", extra: 20000 },
      { label: "XL", extra: 30000 },
      { label: "XXL", extra: 40000 },
    ],
    perks: ["Con Olaplex", "Técnica a mano alzada"],
    details: [
      { title: "¿Qué incluye?", body: "Mechas o babylights con Olaplex, matización y secado." },
      { title: "¿Cómo prepararte?", body: "Trae referencias del resultado que buscas." },
      { title: "Tip de tu estilista", body: "Combina bien con un Gloss Diamond como cierre." },
    ],
    rating: 4.8,
    reviewCount: 44,
  },
  {
    slug: "tecnica-mixta-babylight-balayage",
    name: "Técnica Mixta (Babylight/Balayage)",
    category: "coloraciones",
    badge: "Favorito",
    duration: "5 hrs 30 min",
    shortDescription: "Lo mejor de babylights y balayage en una técnica.",
    description:
      "Combina babylights y balayage en una sola técnica para un degradé más natural y luminoso. El valor es un desde referencial, dependerá de la evaluación del profesional según largo y condición del cabello.",
    basePrice: 115000,
    sizes: [
      { label: "M", extra: 0 },
      { label: "L", extra: 15000 },
      { label: "XL", extra: 30000 },
      { label: "XXL", extra: 45000 },
    ],
    perks: ["Con Olaplex", "Resultado más luminoso"],
    details: [
      { title: "¿Qué incluye?", body: "Técnica mixta babylight + balayage, matización y secado." },
      { title: "¿Cómo prepararte?", body: "Idealmente sin color previo reciente, coméntalo con tu estilista." },
      { title: "Tip de tu estilista", body: "Es la técnica que más se acerca a un color 100% natural con más luz." },
    ],
    rating: 4.9,
    reviewCount: 30,
  },
  {
    slug: "tecnica-coloracion-global",
    name: "Técnica de Coloración Global",
    category: "coloraciones",
    duration: "3 hrs",
    shortDescription: "Cobertura completa, un solo tono uniforme.",
    description:
      "Coloración global de largo a largo para un tono uniforme y parejo. El valor puede variar según la evaluación del profesional, largo y condición del cabello.",
    basePrice: 55000,
    sizes: [
      { label: "S", extra: 0 },
      { label: "M", extra: 10000 },
      { label: "L", extra: 20000 },
      { label: "XL", extra: 30000 },
      { label: "XXL", extra: 40000 },
    ],
    perks: ["Evaluación previa del estilista", "Productos profesionales"],
    details: [
      { title: "¿Qué incluye?", body: "Aplicación de color global completo, tiempo de pausa, lavado y secado." },
      { title: "¿Cómo prepararte?", body: "Trae referencias del tono que buscas." },
      { title: "Tip de tu estilista", body: "Ideal si buscas cambiar de tono de raíz a puntas, no solo cubrir canas." },
    ],
    rating: 4.7,
    reviewCount: 33,
  },
  {
    slug: "mechas-gorra",
    name: "Mechas Gorra",
    category: "coloraciones",
    duration: "3 hrs",
    shortDescription: "Técnica clásica, mechas finas y precisas.",
    description:
      "Mechas con técnica de gorra, ideal para un iluminado fino y preciso. El valor puede variar según largo y condición del cabello.",
    basePrice: 88000,
    sizes: [
      { label: "M", extra: 0 },
      { label: "L", extra: 20000 },
    ],
    perks: ["Técnica clásica", "Iluminado preciso"],
    details: [
      { title: "¿Qué incluye?", body: "Mechas con técnica de gorra, matización y secado." },
      { title: "¿Cómo prepararte?", body: "Trae referencias del resultado que buscas." },
      { title: "Tip de tu estilista", body: "Buena opción si buscas un iluminado más sutil que el balayage." },
    ],
    rating: 4.7,
    reviewCount: 21,
  },
  {
    slug: "decoloracion-global",
    name: "Decoloración Global",
    category: "coloraciones",
    duration: "3 hrs",
    shortDescription: "Base para tonos fantasía o rubios extremos.",
    description:
      "Decoloración de largo a largo, la base para lograr tonos rubios extremos o de fantasía. El valor final se confirma según largo, densidad y condición del cabello.",
    basePrice: 115000,
    perks: ["Evaluación previa obligatoria", "Incluye tratamiento post-decoloración"],
    details: [
      { title: "¿Qué incluye?", body: "Decoloración completa, neutralización y tratamiento de cierre." },
      { title: "¿Cómo prepararte?", body: "Agenda una evaluación previa si nunca te has decolorado antes." },
      { title: "Tip de tu estilista", body: "Súmale un Ritual Detox o Cristalización para cuidar la fibra después." },
    ],
    rating: 4.6,
    reviewCount: 16,
  },
  {
    slug: "bloques-de-color",
    name: "Bloques de Color",
    category: "coloraciones",
    duration: "2 hrs 30 min",
    shortDescription: "Bloques de color contrastante, técnica creativa.",
    description:
      "Técnica creativa de bloques de color para un resultado con más personalidad. El valor final se confirma según diseño, largo y condición del cabello.",
    basePrice: 68000,
    perks: ["Técnica creativa", "Resultado personalizado"],
    details: [
      { title: "¿Qué incluye?", body: "Diseño y aplicación de bloques de color, matización y secado." },
      { title: "¿Cómo prepararte?", body: "Trae referencias del diseño y ubicación que buscas." },
      { title: "Tip de tu estilista", body: "Conversemos el diseño antes de empezar, así ajustamos el tiempo real de la sesión." },
    ],
    rating: 4.7,
    reviewCount: 12,
  },
  {
    slug: "crecimiento-full-blondie",
    name: "Crecimiento Full Blondie",
    category: "coloraciones",
    duration: "2 hrs 30 min",
    shortDescription: "Mantención de rubios ya decolorados.",
    description:
      "Servicio de mantención para cabello ya decolorado full blondie, retocando raíz y matizando para que el rubio se mantenga parejo.",
    basePrice: 72000,
    perks: ["Matización incluida", "Para rubios ya decolorados"],
    details: [
      { title: "¿Qué incluye?", body: "Retoque de crecimiento, decoloración de raíz y matización." },
      { title: "¿Cómo prepararte?", body: "Solo aplica si ya tienes el cabello decolorado full blondie." },
      { title: "Tip de tu estilista", body: "Mantenerlo cada 6-8 semanas evita que se note el contraste de raíz." },
    ],
    rating: 4.8,
    reviewCount: 15,
  },
  {
    slug: "alisado-organico-diamond-rose",
    name: "Alisado Orgánico Diamond Rose",
    category: "alisados-y-botox",
    duration: "3 hrs 30 min",
    shortDescription: "Alisado orgánico, brillo tipo diamante.",
    description:
      "Alisado orgánico con acabado de brillo tipo diamante, reduce el volumen y controla el frizz. La estilista confirma el valor final según largo y condición del cabello.",
    basePrice: 75000,
    sizes: [
      { label: "S", extra: 0 },
      { label: "L", extra: 15000 },
      { label: "XL", extra: 25000 },
      { label: "XXL", extra: 35000 },
    ],
    perks: ["Fórmula orgánica", "Brillo intenso"],
    details: [
      { title: "¿Qué incluye?", body: "Aplicación de alisado orgánico Diamond Rose y secado con plancha." },
      { title: "¿Cómo prepararte?", body: "Idealmente sin color aplicado el mismo día." },
      { title: "Tip de tu estilista", body: "El brillo que deja es uno de los más pedidos entre nuestros alisados orgánicos." },
    ],
    rating: 4.7,
    reviewCount: 19,
  },
  {
    slug: "bano-de-color-fantasia",
    name: "Baño de Color Fantasía",
    category: "coloraciones",
    duration: "2 hrs",
    shortDescription: "Tonos fantasía sobre base ya decolorada.",
    description:
      "Baño de color en tonos fantasía (rosa, lila, azul y más) sobre cabello ya decolorado. El valor final se confirma según largo y tono elegido.",
    basePrice: 28900,
    perks: ["Tonos personalizados", "Requiere base decolorada"],
    details: [
      { title: "¿Qué incluye?", body: "Mezcla y aplicación del tono fantasía elegido, sellado del color." },
      { title: "¿Cómo prepararte?", body: "Necesitas tener el cabello ya decolorado antes de este servicio." },
      { title: "Tip de tu estilista", body: "Los tonos fantasía se lavan más rápido, usa shampoo sin sulfatos para que dure más." },
    ],
    rating: 4.6,
    reviewCount: 9,
  },
  {
    slug: "post-color-therapy",
    name: "Post Color Therapy",
    category: "coloraciones",
    duration: "15 min",
    shortDescription: "Cierre técnico del color, sella y da brillo.",
    description:
      "Finaliza tu color con nuestro Post Color Therapy, el cierre perfecto que equilibra el pH, sella la cutícula y potencia el brillo de tu cabello.",
    basePrice: 15000,
    perks: ["Sella la cutícula", "Potencia el brillo"],
    details: [
      { title: "¿Qué incluye?", body: "Aplicación del tratamiento de cierre post-color." },
      { title: "¿Cómo prepararte?", body: "Se aplica como complemento inmediatamente después de un servicio de color." },
      { title: "Tip de tu estilista", body: "Vale la pena sumarlo cada vez que te haces color, protege la inversión." },
    ],
    rating: 4.9,
    reviewCount: 27,
  },

  // Cortes de Cabello
  {
    slug: "corte-de-cabello-mujer",
    name: "Corte de Cabello Mujer",
    category: "cortes-de-cabello",
    badge: "Más pedido",
    duration: "1 hr",
    shortDescription: "Corte a tu medida, evaluación previa incluida.",
    description: "El valor es desde, dependerá del largo del cabello previa evaluación del estilista.",
    basePrice: 30900,
    perks: ["Evaluación previa", "Lavado y secado incluido"],
    details: [
      { title: "¿Qué incluye?", body: "Diagnóstico, corte, lavado y secado con styling básico." },
      { title: "¿Cómo prepararte?", body: "Trae referencias si tienes un largo o forma en mente." },
      { title: "Tip de tu estilista", body: "Un corte cada 8-10 semanas mantiene las puntas sanas." },
    ],
    rating: 4.8,
    reviewCount: 84,
  },
  {
    slug: "corte-de-cabello-hombre",
    name: "Corte de Cabello Hombre",
    category: "cortes-de-cabello",
    badge: "Más pedido",
    duration: "1 hr",
    shortDescription: "Corte clásico o a la moda.",
    description: "Corte de cabello para hombre, con máquina y tijera según el estilo que busques.",
    basePrice: 18900,
    perks: ["Sin espera con hora reservada"],
    details: [
      { title: "¿Qué incluye?", body: "Corte con máquina y tijera, terminación con producto." },
      { title: "¿Cómo prepararte?", body: "Puedes llegar directo, no necesita preparación previa." },
      { title: "Tip de tu estilista", body: "Súmale un Barba Express si quieres perfilar de paso." },
    ],
    rating: 4.7,
    reviewCount: 45,
  },
  {
    slug: "corte-cabello-nina",
    name: "Corte Cabello Niña (hasta 10 años)",
    category: "cortes-de-cabello",
    duration: "40 min",
    shortDescription: "Corte para niñas hasta 10 años.",
    description: "Corte de cabello pensado para niñas hasta 10 años, en un ambiente cómodo y sin apuro.",
    basePrice: 16900,
    perks: ["Ambiente cómodo para niñas"],
    details: [
      { title: "¿Qué incluye?", body: "Corte, lavado y secado básico." },
      { title: "¿Cómo prepararte?", body: "Puedes acompañar a tu hija durante todo el servicio." },
      { title: "Tip de tu estilista", body: "Si es su primer corte, cuéntanoslo, vamos con más calma." },
    ],
    rating: 4.9,
    reviewCount: 26,
  },
  {
    slug: "corte-cabello-nino",
    name: "Corte Cabello Niño (hasta 10 años)",
    category: "cortes-de-cabello",
    duration: "30 min",
    shortDescription: "Corte para niños hasta 10 años.",
    description: "Corte de cabello pensado para niños hasta 10 años, con máquina y tijera.",
    basePrice: 14900,
    perks: ["Ambiente cómodo para niños"],
    details: [
      { title: "¿Qué incluye?", body: "Corte con máquina y tijera." },
      { title: "¿Cómo prepararte?", body: "Puedes acompañar a tu hijo durante todo el servicio." },
      { title: "Tip de tu estilista", body: "Si es su primer corte, cuéntanoslo, vamos con más calma." },
    ],
    rating: 4.8,
    reviewCount: 31,
  },
  {
    slug: "permanente-hombre",
    name: "Permanente Hombre",
    category: "cortes-de-cabello",
    duration: "3 hrs",
    shortDescription: "Rulos definidos y textura de larga duración.",
    description:
      "Servicio de permanente para hombres, pensado para dar textura y rulos definidos de larga duración. El precio es referencial, la estilista confirma el valor final antes de comenzar.",
    basePrice: 85900,
    perks: ["Larga duración", "Diseñado para hombres"],
    details: [
      { title: "¿Qué incluye?", body: "Aplicación de permanente, tiempo de pausa y finalización." },
      { title: "¿Cómo prepararte?", body: "Sin color reciente, coméntalo con tu estilista." },
      { title: "Tip de tu estilista", body: "Ideal si buscas rulos definidos sin usar herramientas de calor a diario." },
    ],
    rating: 4.6,
    reviewCount: 14,
  },
  {
    slug: "barba-express",
    name: "Barba Express",
    category: "cortes-de-cabello",
    duration: "30 min",
    shortDescription: "Perfilado de barba solo a máquina.",
    description: "Servicio express de perfilado de barba, solo a máquina.",
    basePrice: 10000,
    perks: ["Rápido"],
    details: [
      { title: "¿Qué incluye?", body: "Perfilado de barba a máquina." },
      { title: "¿Cómo prepararte?", body: "No requiere preparación previa." },
      { title: "Tip de tu estilista", body: "Ideal para combinar con el Corte de Cabello Hombre." },
    ],
    rating: 4.6,
    reviewCount: 19,
  },
  {
    slug: "corte-flequillo",
    name: "Corte Flequillo",
    category: "cortes-de-cabello",
    duration: "30 min",
    shortDescription: "Ajuste rápido de flequillo entre cortes.",
    description: "Servicio express para ajustar el flequillo entre cortes completos.",
    basePrice: 9900,
    perks: ["Rápido", "Sin necesidad de hora larga"],
    details: [
      { title: "¿Qué incluye?", body: "Corte y ajuste de flequillo." },
      { title: "¿Cómo prepararte?", body: "No requiere preparación previa." },
      { title: "Tip de tu estilista", body: "Bueno para mantener la forma entre cortes completos." },
    ],
    rating: 4.7,
    reviewCount: 22,
  },

  // Alisados y Botox
  {
    slug: "botox-capilar",
    name: "Botox Capilar",
    category: "alisados-y-botox",
    badge: "Favorito",
    duration: "2 hrs",
    shortDescription: "Nutrición profunda, brillo y control de frizz.",
    description:
      "Tratamiento de nutrición profunda que aporta brillo, suavidad y control del frizz. La estilista confirma el valor final antes de comenzar.",
    basePrice: 45000,
    sizes: [
      { label: "S y M", extra: 0 },
      { label: "L y XL", extra: 10000 },
    ],
    perks: ["Reduce el frizz", "Brillo y suavidad"],
    details: [
      { title: "¿Qué incluye?", body: "Diagnóstico, aplicación de botox capilar y secado." },
      { title: "¿Cómo prepararte?", body: "Idealmente con el pelo limpio." },
      { title: "Tip de tu estilista", body: "Combina bien con un corte, ya que se aprecia más con las puntas parejas." },
    ],
    rating: 4.8,
    reviewCount: 33,
  },
  {
    slug: "btx-organico-blue-diamond",
    name: "BTX Orgánico Blue Diamond",
    category: "alisados-y-botox",
    duration: "3 hrs",
    shortDescription: "Botox capilar Hakari, acabado suave y antifrizz.",
    description:
      "Tecnología capilar avanzada Hakari, tratamiento de botox capilar diseñado para resultados más duraderos, seguros y con un acabado suave, brillante y antifrizz.",
    basePrice: 60000,
    sizes: [
      { label: "S", extra: 0 },
      { label: "M", extra: 10000 },
      { label: "L", extra: 20000 },
      { label: "XL", extra: 30000 },
      { label: "XXL", extra: 40000 },
    ],
    perks: ["Tecnología Hakari", "Resultado duradero"],
    details: [
      { title: "¿Qué incluye?", body: "Aplicación de BTX orgánico Blue Diamond, tiempo de pausa y secado." },
      { title: "¿Cómo prepararte?", body: "Idealmente sin tratamientos químicos recientes." },
      { title: "Tip de tu estilista", body: "Ideal antes del verano para controlar el frizz por semanas." },
    ],
    rating: 4.8,
    reviewCount: 29,
  },
  {
    slug: "alisado-con-keratina",
    name: "Alisado con Keratina",
    category: "alisados-y-botox",
    duration: "4 hrs",
    shortDescription: "Reduce volumen y controla el frizz.",
    description:
      "Tratamiento para reducir volumen y controlar frizz. La estilista confirmará el valor final antes de comenzar el servicio.",
    basePrice: 35000,
    sizes: [
      { label: "S", extra: 0 },
      { label: "M", extra: 10000 },
      { label: "L", extra: 30000 },
      { label: "XL", extra: 50000 },
    ],
    perks: ["Reduce volumen", "Controla el frizz"],
    details: [
      { title: "¿Qué incluye?", body: "Diagnóstico, aplicación de keratina y secado con plancha." },
      { title: "¿Cómo prepararte?", body: "Sin color aplicado el mismo día." },
      { title: "Tip de tu estilista", body: "El resultado rinde varias semanas si evitas amarrarte el pelo los primeros días." },
    ],
    rating: 4.7,
    reviewCount: 25,
  },

  // Rituales Capilares
  {
    slug: "ritual-reparacion-molecular",
    name: "Ritual Reparación Molecular",
    category: "rituales-capilares",
    badge: "Favorito",
    duration: "45 min",
    shortDescription: "Reparación profunda de la fibra capilar.",
    description:
      "Protocolo de reparación profunda para recuperar el cabello dañado: fortalece la fibra capilar desde adentro y devuelve brillo intenso.",
    basePrice: 45900,
    perks: ["Reparación profunda", "Brillo intenso"],
    details: [
      { title: "¿Qué incluye?", body: "Aplicación del ritual de reparación molecular y sellado." },
      { title: "¿Cómo prepararte?", body: "No requiere preparación especial." },
      { title: "Tip de tu estilista", body: "Ideal después de procesos de color o decoloración." },
    ],
    rating: 4.9,
    reviewCount: 41,
  },
  {
    slug: "ritual-cristalizacion",
    name: "Ritual Cristalización",
    category: "rituales-capilares",
    duration: "40 min",
    shortDescription: "Brillo intenso, hidrata y controla el frizz.",
    description:
      "Tratamiento de brillo intenso que hidrata, controla el frizz y mejora la suavidad del cabello sin alisarlo. Ideal para recuperar un aspecto sano y luminoso.",
    basePrice: 47900,
    perks: ["Brillo espejo", "No alisa el cabello"],
    details: [
      { title: "¿Qué incluye?", body: "Aplicación del ritual de cristalización y sellado." },
      { title: "¿Cómo prepararte?", body: "No requiere preparación especial." },
      { title: "Tip de tu estilista", body: "El valor final se confirma según largo y densidad del cabello." },
    ],
    rating: 4.8,
    reviewCount: 36,
  },
  {
    slug: "ritual-lino-nutritive",
    name: "Ritual Lino Nutritive",
    category: "rituales-capilares",
    duration: "40 min",
    shortDescription: "Hidratación a base de semilla de lino.",
    description:
      "Tratamiento nutritivo a base de Semilla de Lino que hidrata profundamente el cabello, aportando suavidad, brillo y mayor control de frizz.",
    basePrice: 30900,
    perks: ["Ingredientes naturales", "Hidratación profunda"],
    details: [
      { title: "¿Qué incluye?", body: "Aplicación del ritual nutritivo de lino y sellado." },
      { title: "¿Cómo prepararte?", body: "No requiere preparación especial." },
      { title: "Tip de tu estilista", body: "Bueno como mantención mensual entre tratamientos más intensivos." },
    ],
    rating: 4.7,
    reviewCount: 20,
  },
  {
    slug: "glow-ritual",
    name: "Glow Ritual",
    category: "rituales-capilares",
    duration: "30 min",
    shortDescription: "Hidratación ligera y brillo exprés.",
    description: "Hidratación ligera y brillo, ideal para una mantención rápida entre visitas.",
    basePrice: 23900,
    perks: ["Exprés", "Ideal antes de un evento"],
    details: [
      { title: "¿Qué incluye?", body: "Aplicación de hidratación ligera con brillo." },
      { title: "¿Cómo prepararte?", body: "No requiere preparación especial." },
      { title: "Tip de tu estilista", body: "Perfecto para sumar antes de un peinado de evento." },
    ],
    rating: 4.7,
    reviewCount: 18,
  },

  // Peinados
  {
    slug: "peinado-con-ondas",
    name: "Peinado con Ondas",
    category: "peinados",
    duration: "1 hr",
    shortDescription: "Para eventos, matrimonios o graduaciones.",
    description:
      "Ideal para eventos, matrimonios, graduaciones o una ocasión especial. Incluye preparación del cabello y finalización con productos profesionales.",
    basePrice: 30000,
    sizes: [
      { label: "S", extra: 0 },
      { label: "M", extra: 5000 },
      { label: "XL", extra: 8000 },
    ],
    perks: ["Incluye preparación", "Productos profesionales"],
    details: [
      { title: "¿Qué incluye?", body: "Preparación del cabello, ondas y finalización." },
      { title: "¿Cómo prepararte?", body: "Trae referencias de fotos si tienes un estilo en mente." },
      { title: "Tip de tu estilista", body: "El pelo con un día de lavado rinde mejor peinado que recién lavado." },
    ],
    rating: 4.8,
    reviewCount: 31,
  },
  {
    slug: "peinado-fiesta",
    name: "Peinado Fiesta",
    category: "peinados",
    badge: "Ocasión especial",
    duration: "1 hr 15 min",
    shortDescription: "Recogidos y semi recogidos para fiesta.",
    description:
      "Peinado de fiesta, recogido o semi recogido, con finalización profesional para que dure toda la noche.",
    basePrice: 30000,
    sizes: [
      { label: "M", extra: 0 },
      { label: "L", extra: 8000 },
      { label: "XL", extra: 15000 },
    ],
    perks: ["Incluye fijación de larga duración"],
    details: [
      { title: "¿Qué incluye?", body: "Preparación, armado del peinado y fijación." },
      { title: "¿Cómo prepararte?", body: "Trae referencias de fotos si tienes un estilo en mente." },
      { title: "Tip de tu estilista", body: "Agenda con anticipación en fechas de fiestas de egresados o fin de año." },
    ],
    rating: 4.8,
    reviewCount: 24,
  },
  {
    slug: "prueba-y-peinado-novia",
    name: "Prueba y Peinado Novia",
    category: "peinados",
    badge: "Ocasión especial",
    duration: "4 hrs",
    shortDescription: "Incluye prueba previa y lavado.",
    description: "Prueba y peinado de novia, incluye lavado, pensado para coordinar el look completo del día.",
    basePrice: 100000,
    perks: ["Incluye prueba previa", "Incluye lavado"],
    details: [
      { title: "¿Qué incluye?", body: "Sesión de prueba de peinado + el peinado del día, con lavado incluido." },
      { title: "¿Cómo prepararte?", body: "Agenda con anticipación para coordinar la prueba." },
      { title: "Tip de tu estilista", body: "Trae tu velo o accesorios el día de la prueba, cambia bastante el resultado." },
    ],
    rating: 5.0,
    reviewCount: 18,
  },
  {
    slug: "brushing-o-plancha",
    name: "Brushing o Plancha",
    category: "peinados",
    duration: "1 hr",
    shortDescription: "Incluye lavado, brushing y shot de brillo.",
    description: "Incluye lavado, brushing y shot de brillo Brasil Cacau.",
    basePrice: 15000,
    sizes: [
      { label: "S", extra: 0 },
      { label: "M", extra: 5000 },
      { label: "L", extra: 10000 },
      { label: "XL", extra: 15000 },
      { label: "XXL", extra: 20000 },
    ],
    perks: ["Incluye lavado", "Shot de brillo incluido"],
    details: [
      { title: "¿Qué incluye?", body: "Lavado, brushing y shot de brillo Brasil Cacau." },
      { title: "¿Cómo prepararte?", body: "Puedes llegar con el pelo como esté, se lava en el salón." },
      { title: "Tip de tu estilista", body: "Rinde varios días con una funda de seda para dormir." },
    ],
    rating: 4.6,
    reviewCount: 40,
  },
  {
    slug: "lavado-y-secado",
    name: "Lavado y Secado",
    category: "peinados",
    duration: "30 min",
    shortDescription: "Rápido, para salir lista en minutos.",
    description: "Servicio de lavado y secado según largo y cantidad de cabello.",
    basePrice: 10900,
    sizes: [
      { label: "S", extra: 0 },
      { label: "M y L", extra: 3000 },
    ],
    perks: ["Rápido"],
    details: [
      { title: "¿Qué incluye?", body: "Lavado y secado con cepillo." },
      { title: "¿Cómo prepararte?", body: "No requiere preparación previa." },
      { title: "Tip de tu estilista", body: "Bueno para antes de una salida sin tiempo para más." },
    ],
    rating: 4.6,
    reviewCount: 24,
  },

  // Promociones
  {
    slug: "pack-shine",
    name: "Pack Shine (Corte e Hidratación)",
    category: "promociones",
    badge: "Mar-Jue-Vie-Sáb",
    duration: "1 hr 30 min",
    shortDescription: "Corte + hidratación, renueva el look completo.",
    description:
      "Pack que combina corte de cabello con tratamiento de hidratación para renovar el look, aportar brillo y mejorar la suavidad del cabello. Promoción válida días martes, jueves, viernes y sábado.",
    basePrice: 36900,
    perks: ["Corte + hidratación en un pack", "Promoción por día"],
    details: [
      { title: "¿Qué incluye?", body: "Corte de cabello + tratamiento de hidratación." },
      { title: "¿Cómo prepararte?", body: "Válido solo martes, jueves, viernes y sábado." },
      { title: "Tip de tu estilista", body: "El combo más pedido para renovar todo de una vez." },
    ],
    rating: 4.9,
    reviewCount: 71,
  },
  {
    slug: "martes-color-retoque-de-raiz",
    name: "Martes Color · Retoque de Raíz",
    category: "promociones",
    badge: "Solo martes",
    duration: "1 hr 30 min",
    shortDescription: "Retoque de raíz + despunte de cortesía.",
    description:
      "Servicio de retoque de raíz para mantener tu color perfecto, con despunte de cortesía para renovar puntas y dar mayor movimiento al cabello. Promoción exclusiva solo días martes.",
    basePrice: 42900,
    perks: ["Incluye despunte de cortesía", "Promoción exclusiva martes"],
    details: [
      { title: "¿Qué incluye?", body: "Retoque de raíz + despunte de cortesía." },
      { title: "¿Cómo prepararte?", body: "Válido exclusivamente los días martes." },
      { title: "Tip de tu estilista", body: "La forma más conveniente de mantener el color al día." },
    ],
    rating: 4.8,
    reviewCount: 58,
  },
  {
    slug: "martes-pack-color-bano-despunte",
    name: "Martes Pack Color · Baño de Color + Despunte",
    category: "promociones",
    badge: "Solo martes",
    duration: "3 hrs",
    shortDescription: "Baño de color completo + despunte incluido.",
    description:
      "Pack de baño de color de largo a largo con despunte incluido, precio especial disponible solo los días martes.",
    basePrice: 62000,
    perks: ["Incluye despunte", "Promoción exclusiva martes"],
    details: [
      { title: "¿Qué incluye?", body: "Baño de color completo + despunte." },
      { title: "¿Cómo prepararte?", body: "Válido exclusivamente los días martes." },
      { title: "Tip de tu estilista", body: "Buena opción si quieres renovar color y puntas el mismo día." },
    ],
    rating: 4.8,
    reviewCount: 27,
  },
  {
    slug: "miercoles-ritual-reparacion-molecular",
    name: "Miércoles Rituales · Reparación Molecular",
    category: "promociones",
    badge: "Solo miércoles",
    duration: "45 min",
    shortDescription: "Reparación profunda, precio de miércoles.",
    description:
      "Protocolo de reparación profunda para recuperar el cabello dañado, a precio especial disponible solo los miércoles.",
    basePrice: 39900,
    perks: ["Mismo ritual de reparación, precio de miércoles"],
    details: [
      { title: "¿Qué incluye?", body: "Ritual de reparación molecular completo." },
      { title: "¿Cómo prepararte?", body: "Válido exclusivamente los días miércoles." },
      { title: "Tip de tu estilista", body: "Es el mismo Ritual Reparación Molecular, a precio de miércoles." },
    ],
    rating: 4.9,
    reviewCount: 34,
  },
  {
    slug: "miercoles-brillo-cristalizacion",
    name: "Miércoles Rituales · Brillo & Cristalización",
    category: "promociones",
    badge: "Solo miércoles",
    duration: "40 min",
    shortDescription: "Brillo intenso, precio de miércoles.",
    description:
      "Ritual de cristalización para un brillo intenso y control de frizz, a precio especial disponible solo los miércoles.",
    basePrice: 39900,
    perks: ["Mismo ritual de cristalización, precio de miércoles"],
    details: [
      { title: "¿Qué incluye?", body: "Ritual de cristalización completo." },
      { title: "¿Cómo prepararte?", body: "Válido exclusivamente los días miércoles." },
      { title: "Tip de tu estilista", body: "Es el mismo Ritual Cristalización, a precio de miércoles." },
    ],
    rating: 4.8,
    reviewCount: 20,
  },
  {
    slug: "jueves-pack-botox-reconstructor",
    name: "Jueves Pack · Botox Reconstructor Orgánico",
    category: "promociones",
    badge: "Solo jueves",
    duration: "3 hrs",
    shortDescription: "Hidrata, reduce el frizz y aporta manejabilidad.",
    description:
      "Tratamiento capilar que hidrata profundamente el cabello, reduce el frizz y aporta brillo, suavidad y mayor manejabilidad. Precio para tallas S y M, disponible solo los jueves.",
    basePrice: 70000,
    perks: ["Promoción exclusiva jueves"],
    details: [
      { title: "¿Qué incluye?", body: "Botox reconstructor orgánico completo." },
      { title: "¿Cómo prepararte?", body: "Válido exclusivamente los días jueves. Tallas mayores a S/M tienen costo adicional." },
      { title: "Tip de tu estilista", body: "Ideal para dejar el pelo listo antes del fin de semana." },
    ],
    rating: 4.8,
    reviewCount: 22,
  },
  {
    slug: "viernes-pack-alisado-pro-liss",
    name: "Viernes Pack · Alisado Pro Liss",
    category: "promociones",
    badge: "Solo viernes",
    duration: "3 hrs",
    shortDescription: "Reduce volumen y frizz, más liso y disciplinado.",
    description:
      "Tratamiento de alisado que reduce volumen y frizz, dejando el cabello más liso, brillante y disciplinado. Precio para tallas S y M, disponible solo los viernes.",
    basePrice: 80000,
    perks: ["Promoción exclusiva viernes"],
    details: [
      { title: "¿Qué incluye?", body: "Alisado Pro Liss completo." },
      { title: "¿Cómo prepararte?", body: "Válido exclusivamente los días viernes. Tallas mayores a S/M tienen costo adicional." },
      { title: "Tip de tu estilista", body: "Perfecto para llegar al fin de semana con el pelo bajo control." },
    ],
    rating: 4.7,
    reviewCount: 17,
  },
];

export function getServicesByCategory(categorySlug: string) {
  return SERVICES.filter((s) => s.category === categorySlug);
}

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function getCategoryImage(categorySlug: string) {
  return CATEGORIES.find((c) => c.slug === categorySlug)?.image ?? HERO_IMAGE;
}
