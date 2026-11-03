import type { Metadata } from "next";
import Image from "next/image";
import OrganicDivider from "@/components/organic-divider";
import PageHero from "@/components/page-hero";
import PigmentBand from "@/components/pigment-band";
import { MaskedImage, Reveal, SplitHeading, Stagger, StaggerItem } from "@/components/reveal";
import { Container, Eyebrow, PigmentLink, SectionLabel } from "@/components/ui";
import { categories, imagery } from "@/lib/site";

export const metadata: Metadata = {
  title: "Inspiración",
  description:
    "Tres formas de empezar a pintar y dibujar, y qué material hace falta para cada una. Ideas prácticas desde Bellas Artes Los Arcos, Marbella.",
  alternates: { canonical: "/inspiracion" },
};

/**
 * General technique guidance. Each route lists only material families the
 * shop actually publishes — nothing here claims a specific brand or product.
 */
const routes = [
  {
    index: "01",
    title: "Acuarela de calle",
    summary:
      "Un cuaderno, una caja pequeña y un pincel con depósito de agua. Todo cabe en un bolsillo y obliga a decidir rápido, que es exactamente lo que entrena el ojo.",
    needs: ["Acuarela", "Papeles", "Pinceles"],
    tip: "Empiece por las manchas grandes de luz y sombra. El detalle, si sobra tiempo.",
    accent: "#1b3fd8",
    image: categories[0].gallery[4],
    alt: "Caja de acuarelas abierta con los colores gastados por el uso",
  },
  {
    index: "02",
    title: "Óleo de taller",
    summary:
      "El medio lento. Un lienzo mediano, una paleta corta de seis colores y días por delante para volver sobre lo mismo mientras la pintura sigue fresca.",
    needs: ["Óleo", "Lienzos y Soportes", "Pinceles y Espátulas"],
    tip: "Una paleta de seis colores enseña más sobre mezcla que una de treinta.",
    accent: "#ff5a3c",
    image: categories[0].gallery[1],
    alt: "Tubos de óleo y pinceles sobre una paleta de madera manchada",
  },
  {
    index: "03",
    title: "Cuaderno diario",
    summary:
      "Un lápiz blando, un rotulador y la disciplina de una página al día. Es la práctica más barata que existe y la que más se nota a los tres meses.",
    needs: ["Lápices", "Rotuladores", "Papeles"],
    tip: "Fije una hora, no un objetivo. La página sale sola cuando el hueco está reservado.",
    accent: "#6d2fd4",
    image: categories[1].gallery[0],
    alt: "Lápices de color alineados por tono junto a un cuaderno abierto",
  },
] as const;

/** A moodboard drawn from across the shop's own categories. */
const moodboard = [
  {
    src: categories[0].cover,
    alt: "Tubos de pintura al óleo ordenados por color",
    span: "sm:col-span-2 sm:row-span-2",
  },
  { src: categories[1].gallery[1], alt: "Puntas de lápices de color vistas de cerca", span: "" },
  { src: categories[2].cover, alt: "Pinceles de distintos grosores en un bote", span: "" },
  { src: categories[3].gallery[0], alt: "Hojas de papel apiladas mostrando el grano", span: "" },
  {
    src: imagery.textureWatercolour,
    alt: "Paleta de acuarela con los colores mezclados",
    span: "sm:col-span-2",
  },
  { src: categories[2].gallery[2], alt: "Pincel cargado de pintura azul sobre papel", span: "" },
  { src: categories[4].cover, alt: "Lienzo en blanco montado sobre bastidor", span: "" },
] as const;

export default function InspiracionPage() {
  return (
    <>
      <PageHero
        index="04"
        eyebrow="Inspiración"
        title="Tres maneras de empezar esta semana."
        lead="No hacen falta treinta tubos para pintar algo que valga la pena. Hacen falta tres decisiones: con qué medio, sobre qué soporte y cuándo se sienta a hacerlo."
        accentFrom={2}
        accent="violet"
        dot="#6d2fd4"
      />

      {/* ---------------- Routes ---------------- */}
      <section className="py-12 sm:py-16">
        <Container width="wide">
          <SectionLabel index="01" title="Rutas de material" className="mb-12" />

          <div className="flex flex-col">
            {routes.map((route) => (
              <article
                key={route.index}
                className="grid gap-8 border-t border-line py-10 lg:grid-cols-[4rem_1fr_0.75fr] lg:gap-12 lg:py-14"
              >
                <Reveal>
                  <span className="eyebrow text-ink-muted">{route.index}</span>
                </Reveal>

                <div>
                  <SplitHeading
                    as="h2"
                    text={route.title}
                    className="display-md text-ink"
                  />

                  <Reveal delay={0.08}>
                    <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">{route.summary}</p>
                  </Reveal>

                  <Reveal delay={0.12}>
                    <div className="mt-7">
                      <p className="eyebrow text-ink-muted">Qué necesita</p>
                      <ul className="mt-3 flex flex-wrap gap-2.5">
                        {route.needs.map((need) => (
                          <li key={need}>
                            <span
                              className="inline-flex items-center gap-2 rounded-full border bg-paper px-4 py-2 text-sm text-ink"
                              style={{ borderColor: `${route.accent}40` }}
                            >
                              <span
                                aria-hidden="true"
                                className="size-2 rounded-full"
                                style={{ backgroundColor: route.accent }}
                              />
                              {need}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>

                  <Reveal delay={0.16}>
                    <p
                      className="mt-7 max-w-lg border-l-2 pl-5 font-display text-lg leading-snug tracking-[-0.01em] text-ink"
                      style={{ borderColor: route.accent }}
                    >
                      {route.tip}
                    </p>
                  </Reveal>
                </div>

                <MaskedImage
                  src={route.image}
                  alt={route.alt}
                  className="aspect-4/5 rounded-t-[10rem] rounded-b-2xl"
                  sizes="(max-width: 1024px) 92vw, 30vw"
                />
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------- Pigment band ---------------- */}
      <section className="py-10 sm:py-14">
        <Container width="wide">
          <PigmentBand />
        </Container>
      </section>

      {/* ---------------- Moodboard ---------------- */}
      <OrganicDivider from="var(--color-ivory)" to="var(--color-paper)" />
      <section className="bg-paper py-20 sm:py-28">
        <Container width="wide">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Eyebrow dot="#ffc219">Mesa de trabajo</Eyebrow>
              <SplitHeading
                as="h2"
                text="El material, visto de cerca."
                className="display-lg mt-6 max-w-2xl text-ink"
                accentFrom={2}
                accentClassName="text-yellow-deep"
              />
            </div>
            <Reveal>
              <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
                Imágenes de muestra de las cinco familias que trabajamos, pensadas para
                sustituirse por fotografías de la tienda.
              </p>
            </Reveal>
          </div>

          <Stagger
            as="ul"
            className="mt-12 grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-4 sm:gap-4"
            gap={0.07}
          >
            {moodboard.map((item, index) => (
              <StaggerItem
                as="li"
                key={`${item.src}-${index}`}
                className={`relative overflow-hidden rounded-xl bg-ivory-deep ${item.span}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 24vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.05] motion-reduce:transition-none"
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
      <OrganicDivider from="var(--color-paper)" to="var(--color-ivory)" />

      {/* ---------------- Reserved space for the shop's own gallery ---------------- */}
      <section className="py-20 sm:py-28">
        <Container width="wide">
          <Reveal className="grid gap-8 rounded-2xl border border-dashed border-line p-8 sm:p-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="eyebrow text-ink-muted">Espacio reservado</p>
              <h2 className="mt-5 font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-tight tracking-[-0.03em]">
                Obra de quien compra aquí.
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">
                Esta sección está preparada para mostrar trabajos hechos con material de la
                tienda, con el nombre de cada autor y su permiso. Está vacía a propósito: se
                llenará con obra real, no con imágenes de archivo.
              </p>
              <div className="mt-8">
                <PigmentLink href="/contacto" tone="violet">
                  Enviarnos una obra
                </PigmentLink>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="grid grid-cols-3 gap-3 opacity-50"
            >
              {[0, 1, 2, 3, 4, 5].map((slot) => (
                <div
                  key={slot}
                  className="aspect-square rounded-lg border border-dashed border-line bg-paper"
                />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container width="wide">
          <MaskedImage
            src={imagery.heroStudio}
            alt="Mesa de taller con material de bellas artes repartido"
            className="aspect-16/10 rounded-2xl sm:aspect-21/9"
            sizes="(max-width: 1320px) 94vw, 1240px"
          />
        </Container>
      </section>
    </>
  );
}
