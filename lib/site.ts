/**
 * Single source of truth for everything the site says about the business.
 *
 * Every claim here is taken from the shop's own website
 * (bellasarteslosarcos.webnode.es) or from the brief supplied by the owner.
 * Nothing is invented: no prices, no brands, no stock levels, no opening
 * hours — none of those are published by the shop.
 *
 * Categories the shop lists but has not yet filled in are marked
 * `catalogueReady: false` so the UI can show an honest placeholder.
 */

export const business = {
  name: "Bellas Artes Los Arcos",
  shortName: "Los Arcos",
  tagline: "Donde comienza la creatividad.",
  /** Confirmed on the shop's own homepage: "ESPECIALISTAS DESDE 1990". */
  since: 1990,
  sinceLabel: "Desde 1990",
  specialistsLabel: "Especialistas desde 1990",
  /** Confirmed on the shop's own homepage. */
  claim: "Su tienda de bellas artes en Marbella",
  street: "Calle Galveston, 9",
  postalCode: "29601",
  city: "Marbella",
  province: "Málaga",
  country: "España",
  addressLine: "Calle Galveston 9, 29601 Marbella",
  phoneDisplay: "952 86 05 54",
  phoneHref: "+34952860554",
  email: "bellasarteslosarcos@gmail.com",
  /** Geocoded from OpenStreetMap: Calle Galveston, Marbella (29601). */
  geo: { lat: 36.51455, lng: -4.88089 },
  /** Neighbourhood as recorded in OpenStreetMap for this street. */
  neighbourhood: "Barrio Alto",
  quarter: "Divina Pastora",
} as const;

export const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Calle Galveston 9, 29601 Marbella, Málaga");

export const mapsDirectionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent("Calle Galveston 9, 29601 Marbella, Málaga");

export const mapsEmbedUrl =
  "https://www.openstreetmap.org/export/embed.html?bbox=" +
  "-4.8889%2C36.5106%2C-4.8729%2C36.5185&layer=mapnik&marker=36.51455%2C-4.88089";

export const appleMapsUrl =
  "https://maps.apple.com/?q=" +
  encodeURIComponent("Calle Galveston 9, 29601 Marbella");

/* ------------------------------------------------------------------ */
/* Pigment palette — used for swatch interactions and section accents  */
/* ------------------------------------------------------------------ */

export type Pigment = {
  name: string;
  hex: string;
  note: string;
};

export const pigments: Pigment[] = [
  { name: "Azul cobalto", hex: "#1b3fd8", note: "Frío, profundo, luminoso" },
  { name: "Rojo coral", hex: "#ff5a3c", note: "Cálido, directo, vibrante" },
  { name: "Violeta", hex: "#6d2fd4", note: "Denso, elegante, nocturno" },
  { name: "Amarillo", hex: "#ffc219", note: "Luz, energía, mediodía" },
  { name: "Tierra siena", hex: "#a9552b", note: "Tierra, sombra, raíz" },
  { name: "Verde savia", hex: "#2f7d4f", note: "Vegetal, fresco, sereno" },
  { name: "Negro marfil", hex: "#15110d", note: "Contorno, peso, firma" },
];

/* ------------------------------------------------------------------ */
/* Photography — Unsplash CDN, every URL verified to resolve           */
/* ------------------------------------------------------------------ */

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=80`;

export const imagery = {
  heroPaint: photo("1611843467106-e44e3c7e2b07"),
  heroStudio: photo("1595991209266-5ff5a3a2f008"),
  shopAisle: photo("1568301856220-8d0dc08a6d48"),
  shopShelves: photo("1611758498818-bfdeec6dc3de"),
  shopCounter: photo("1586895945065-149308f2b102"),
  heritage: photo("1514680000430-93a1864bd79d"),
  textureWatercolour: photo("1561559679-ee3af236f671"),
  texturePalette: photo("1601049320268-42a9b275068c"),
} as const;

/* ------------------------------------------------------------------ */
/* Product categories — exactly as the shop lists them                 */
/* ------------------------------------------------------------------ */

export type Category = {
  slug: string;
  name: string;
  /** Sub-ranges the shop names on its own category page. Empty = not yet published. */
  ranges: string[];
  catalogueReady: boolean;
  blurb: string;
  accent: "cobalt" | "coral" | "violet" | "yellow";
  hex: string;
  cover: string;
  gallery: string[];
};

export const categories: Category[] = [
  {
    slug: "pintura",
    name: "Pintura",
    ranges: ["Óleo", "Acrílico", "Acuarela", "Pastel", "Chalk Paint"],
    catalogueReady: true,
    blurb:
      "El corazón de la tienda. Pasillos enteros dedicados al color, del óleo tradicional al acrílico contemporáneo.",
    accent: "cobalt",
    hex: "#1b3fd8",
    cover: photo("1611843467106-e44e3c7e2b07"),
    gallery: [
      photo("1618275341069-262c9ddc62ec"),
      photo("1541942927-ac35578a2019"),
      photo("1526242767279-2ad8d8271177"),
      photo("1460398495418-62c9b5d79fbf"),
      photo("1591724316824-a6986e18e5c1"),
      photo("1581273154768-0a9a16887d2a"),
    ],
  },
  {
    slug: "dibujo-y-rotuladores",
    name: "Dibujo y Rotuladores",
    ranges: ["Lápices", "Cajas y sets de Lápices", "Rotuladores"],
    catalogueReady: true,
    blurb:
      "Grafito, color y punta fina. Desde el lápiz suelto hasta las cajas y sets completos para trabajar con gama amplia.",
    accent: "yellow",
    hex: "#ffc219",
    cover: photo("1667687435942-4fdff73a3ed6"),
    gallery: [
      photo("1513542789411-b6a5d4f31634"),
      photo("1607081758973-b85919737e26"),
      photo("1501349800519-48093d60bde0"),
      photo("1609881532802-493ca789f868"),
      photo("1627873828998-50b7aeec7ffe"),
    ],
  },
  {
    slug: "pinceles-y-espatulas",
    name: "Pinceles y Espátulas",
    ranges: [],
    catalogueReady: false,
    blurb:
      "Herramienta de mano: el gesto, la carga, el filo. Una sección que estamos preparando para mostrarla como merece.",
    accent: "coral",
    hex: "#ff5a3c",
    cover: photo("1658301720419-d1c963f7993b"),
    gallery: [
      photo("1513364776144-60967b0f800f"),
      photo("1616140588045-d1fe5b9a9665"),
      photo("1613746203812-717e6e5db3da"),
      photo("1535673774336-ef95d2851cf3"),
    ],
  },
  {
    slug: "papeles",
    name: "Papeles",
    ranges: [],
    catalogueReady: false,
    blurb:
      "El soporte que decide la mitad del resultado. Gramajes, granos y formatos, en preparación para el nuevo catálogo.",
    accent: "violet",
    hex: "#6d2fd4",
    cover: photo("1516409590654-e8d51fc2d25c"),
    gallery: [
      photo("1543002588-bfa74002ed7e"),
      photo("1617850332221-2c039479d407"),
      photo("1586162481176-7abc53f1f7c2"),
      photo("1610088660962-3f85d27cadc7"),
    ],
  },
  {
    slug: "lienzos-y-soportes",
    name: "Lienzos y Soportes",
    ranges: [],
    catalogueReady: false,
    blurb:
      "Bastidores, lienzos y tableros. El punto de partida en blanco, listo para detallarse en el catálogo que viene.",
    accent: "cobalt",
    hex: "#0f2693",
    cover: photo("1554757388-d18867a11d05"),
    gallery: [photo("1611548059045-0d51894f9343"), photo("1757546049629-2391be154fb7")],
  },
];

export const readyCategories = categories.filter((c) => c.catalogueReady);

/* ------------------------------------------------------------------ */
/* How ordering actually works — described on the shop's own site      */
/* ------------------------------------------------------------------ */

export const orderingSteps = [
  {
    step: "01",
    title: "Nos cuenta qué necesita",
    body: "Por teléfono, por email o pasando por la tienda. Indíquenos los artículos que desea y la forma de pago que prefiere.",
  },
  {
    step: "02",
    title: "Le confirmamos el pedido",
    body: "En cuanto recibimos su petición nos ponemos en contacto con usted para confirmarla y facilitarle los datos de pago, incluyendo el importe total con los gastos de envío.",
  },
  {
    step: "03",
    title: "Elige cómo pagar",
    body: "Disponemos de dos medios de pago: PayPal o transferencia bancaria. No hay pago automático en la web: siempre hablamos antes con usted.",
  },
  {
    step: "04",
    title: "Enviamos por Correos certificado",
    body: "Una vez recibido el pago, el envío se realiza por Correos, certificado y con número de seguimiento, que le proporcionamos en ese mismo momento.",
  },
] as const;

export const navigation = [
  { href: "/", label: "Inicio", short: "Inicio" },
  { href: "/nuestra-historia", label: "Nuestra historia", short: "Historia" },
  { href: "/materiales", label: "Materiales de bellas artes", short: "Materiales" },
  { href: "/categorias", label: "Categorías de productos", short: "Categorías" },
  { href: "/inspiracion", label: "Inspiración", short: "Inspiración" },
  { href: "/contacto", label: "Contacto", short: "Contacto" },
  { href: "/como-llegar", label: "Cómo llegar", short: "Cómo llegar" },
] as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://bellas-artes-los-arcos-redesign.vercel.app";
