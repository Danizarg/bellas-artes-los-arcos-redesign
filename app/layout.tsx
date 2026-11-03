import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import IntroCurtain from "@/components/intro-curtain";
import MotionProvider from "@/components/motion-provider";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { business, mapsUrl, siteUrl } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} — Bellas artes en Marbella desde 1990`,
    template: `%s — ${business.name}`,
  },
  description:
    "Tienda especialista en bellas artes en Marbella desde 1990. Pintura al óleo, acrílico, acuarela, pastel y chalk paint, lápices y rotuladores, pinceles, papeles, lienzos y soportes. Calle Galveston 9.",
  applicationName: business.name,
  keywords: [
    "bellas artes Marbella",
    "tienda de arte Marbella",
    "material de bellas artes",
    "óleo Marbella",
    "acuarela Marbella",
    "acrílico Marbella",
    "lienzos Marbella",
    "pinceles Marbella",
    "chalk paint Marbella",
    "Bellas Artes Los Arcos",
  ],
  authors: [{ name: business.name }],
  creator: business.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: business.name,
    title: `${business.name} — Donde comienza la creatividad`,
    description:
      "Especialistas en bellas artes en Marbella desde 1990. Pintura, dibujo, pinceles, papeles, lienzos y soportes.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} — Donde comienza la creatividad`,
    description: "Especialistas en bellas artes en Marbella desde 1990.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "shopping",
};

export const viewport: Viewport = {
  themeColor: "#f8f3e9",
  colorScheme: "light",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: business.name,
  description:
    "Tienda especialista en material de bellas artes en Marbella desde 1990: pintura, dibujo, pinceles, papeles, lienzos y soportes.",
  url: siteUrl,
  telephone: `+34 ${business.phoneDisplay}`,
  email: business.email,
  foundingDate: String(business.since),
  slogan: business.tagline,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: business.street,
    postalCode: business.postalCode,
    addressLocality: business.city,
    addressRegion: business.province,
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: business.geo.lat,
    longitude: business.geo.lng,
  },
  hasMap: mapsUrl,
  areaServed: [
    { "@type": "City", name: "Marbella" },
    { "@type": "AdministrativeArea", name: "Costa del Sol" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="grain antialiased">
        {/* Scroll reveals start life hidden via inline styles. Without
            JavaScript nothing would ever reveal them, so force the finished
            state. The opening curtain is left alone — it lifts itself in
            pure CSS. */}
        <noscript>
          <style>{`#contenido *, footer * { opacity: 1 !important; transform: none !important; clip-path: none !important; }`}</style>
        </noscript>

        <IntroCurtain />

        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
        >
          Saltar al contenido
        </a>

        <MotionProvider>
          <SiteHeader />
          <main id="contenido">{children}</main>
          <SiteFooter />
        </MotionProvider>

        <script
          type="application/ld+json"
          // Static, author-controlled data — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
