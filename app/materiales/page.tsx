import type { Metadata } from "next";
import Image from "next/image";
import Marquee from "@/components/marquee";
import OrganicDivider from "@/components/organic-divider";
import PageHero from "@/components/page-hero";
import { MaskedImage, Reveal, SplitHeading, Stagger, StaggerItem } from "@/components/reveal";
import { Container, Eyebrow, PigmentLink, SectionLabel } from "@/components/ui";
import { categories } from "@/lib/site";

export const metadata: Metadata = {
  title: "Materiales de bellas artes",
  description:
    "Pintura al óleo, acrílico, acuarela, pastel y chalk paint; lápices, cajas, sets y rotuladores; pinceles y espátulas, papeles, lienzos y soportes. Materiales de bellas artes en Marbella.",
  alternates: { canonical: "/materiales" },
};

/**
 * Guidance below is general technique knowledge about each family of
 * material — it describes what the material does, not what the shop stocks.
 * Stock, brands and prices are deliberately absent: the shop does not
 * publish them.
 */
const families = [
  {
    slug: "pintura",
    name: "Pintura",
    kicker: "El cuerpo del color",
    body: "Cada medio tiene su tiempo. El óleo perdona, se trabaja mojado sobre mojado durante días y pide disolvente y paciencia. El acrílico seca en minutos y permite capas rápidas y opacas. La acuarela se construye con transparencias y depende del papel tanto como del pigmento. El pastel es pigmento casi puro: intenso, directo y frágil hasta que se fija. La chalk paint cubre sin imprimación y deja una superficie mate, pensada para madera y objeto.",
    note: "Si viene con una obra concreta en la cabeza, tráiganos la idea: la elección entre óleo y acrílico suele decidirse por el plazo, no por el precio.",
    accent: "#1b3fd8",
  },
  {
    slug: "dibujo-y-rotuladores",
    name: "Dibujo y Rotuladores",
    kicker: "La línea y el gesto",
    body: "El grafito se mide en durezas: las H sostienen el trazo técnico y las B dan el negro graso del apunte. Los lápices de color se eligen por carga de pigmento y por si se quieren mezclar en seco o con agua. Las cajas y los sets resuelven el problema contrario al del lápiz suelto: dan una gama coherente desde el primer día. Los rotuladores piden papel que no sangre y se trabajan por capas, del tono más claro al más oscuro.",
    note: "Para bocetar en calle, un lápiz blando y un cuaderno de grano fino rinden más que un set de veinticuatro colores.",
    accent: "#ffc219",
  },
  {
    slug: "pinceles-y-espatulas",
    name: "Pinceles y Espátulas",
    kicker: "La herramienta de mano",
    body: "Un pincel se juzga por tres cosas: cuánta pintura carga, si recupera la punta al levantarlo y cómo aguanta el disolvente. Las cerdas firmes empujan óleo y acrílico espeso; los pelos suaves son para aguadas y velados. Las espátulas no sustituyen al pincel: dan plano, filo y empaste, y dejan una huella que ningún pincel imita.",
    note: "Pregunte en tienda por esta sección: estamos preparando el catálogo detallado.",
    accent: "#ff5a3c",
  },
  {
    slug: "papeles",
    name: "Papeles",
    kicker: "La mitad del resultado",
    body: "El papel decide antes que el pigmento. El gramaje determina cuánta agua aguanta sin ondularse; el grano, si la mancha queda lisa o vibrada; el encolado, si el color se queda arriba o se hunde. Para acuarela, el gramaje alto permite mojar sin montar; para grafito y carbón, el grano fino conserva el detalle; para rotulador, la superficie cerrada evita que la tinta se extienda.",
    note: "Pregunte en tienda por esta sección: estamos preparando el catálogo detallado.",
    accent: "#6d2fd4",
  },
  {
    slug: "lienzos-y-soportes",
    name: "Lienzos y Soportes",
    kicker: "El punto de partida en blanco",
    body: "El soporte fija el formato y la tensión del trabajo. El lienzo montado sobre bastidor responde al pincel con algo de rebote; el tablero no cede y favorece el detalle y el empaste. El grueso del bastidor importa cuando la obra es grande, y la imprimación define cuánta pintura absorbe la tela antes de empezar a cubrir.",
    note: "Pregunte en tienda por esta sección: estamos preparando el catálogo detallado.",
    accent: "#0f2693",
  },
] as const;

const MARQUEE_ITEMS = [
  "Pintura",
  "Dibujo",
  "Rotuladores",
  "Pinceles",
  "Espátulas",
  "Papeles",
  "Lienzos",
  "Soportes",
];

export default function MaterialesPage() {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="Materiales de bellas artes"
        title="Qué hace cada material, y cuándo elegirlo."
        lead="Un recorrido por las cinco familias que trabajamos. No es un catálogo con precios: es lo que le contaríamos en el mostrador antes de que decida."
        accentFrom={4}
        accent="violet"
        dot="#6d2fd4"
      />

      <Marquee items={MARQUEE_ITEMS} className="mb-4 bg-paper" />

      {families.map((family, index) => {
        const category = categories.find((item) => item.slug === family.slug);
        const reversed = index % 2 === 1;

        return (
          <section
            key={family.slug}
            id={family.slug}
            className="scroll-mt-28 py-16 sm:py-24"
          >
            <Container width="wide">
              <SectionLabel
                index={String(index + 1).padStart(2, "0")}
                title={family.kicker}
                className="mb-10 sm:mb-14"
              />

              <div
                className={`grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-20 ${
                  reversed ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <SplitHeading
                    as="h2"
                    text={family.name}
                    className="display-lg text-ink"
                  />

                  <Reveal delay={0.08}>
                    <p className="mt-7 max-w-xl leading-relaxed text-ink-soft">{family.body}</p>
                  </Reveal>

                  {category && category.ranges.length > 0 ? (
                    <Stagger as="ul" className="mt-8 flex flex-wrap gap-2.5" gap={0.06}>
                      {category.ranges.map((range) => (
                        <StaggerItem as="li" key={range}>
                          <span
                            className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm text-ink"
                            style={{ borderColor: `${family.accent}33` }}
                          >
                            <span
                              aria-hidden="true"
                              className="size-2 rounded-full"
                              style={{ backgroundColor: family.accent }}
                            />
                            {range}
                          </span>
                        </StaggerItem>
                      ))}
                    </Stagger>
                  ) : (
                    <Reveal delay={0.12}>
                      <p className="mt-8 inline-flex rounded-full border border-dashed border-line px-4 py-2 text-sm text-ink-muted">
                        Catálogo en preparación
                      </p>
                    </Reveal>
                  )}

                  <Reveal delay={0.16}>
                    <p
                      className="mt-8 max-w-md border-l-2 pl-5 text-sm leading-relaxed text-ink-muted"
                      style={{ borderColor: family.accent }}
                    >
                      {family.note}
                    </p>
                  </Reveal>
                </div>

                <div>
                  <MaskedImage
                    src={category?.cover ?? ""}
                    alt={`${family.name} — material de bellas artes`}
                    className="aspect-4/5 rounded-t-[12rem] rounded-b-2xl"
                    sizes="(max-width: 1024px) 92vw, 42vw"
                  />

                  {category && category.gallery.length > 1 ? (
                    <Stagger as="ul" className="mt-4 grid grid-cols-3 gap-3" gap={0.07}>
                      {category.gallery.slice(0, 3).map((src, imageIndex) => (
                        <StaggerItem as="li" key={src}>
                          <div className="relative aspect-square overflow-hidden rounded-lg bg-ivory-deep">
                            <Image
                              src={src}
                              alt={`${family.name}, detalle ${imageIndex + 1}`}
                              fill
                              sizes="(max-width: 1024px) 30vw, 14vw"
                              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 motion-reduce:transition-none"
                            />
                          </div>
                        </StaggerItem>
                      ))}
                    </Stagger>
                  ) : null}
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      <OrganicDivider from="var(--color-ivory)" to="var(--color-paper)" />
      <section className="bg-paper py-20 sm:py-28">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Eyebrow dot="#ff5a3c">Siguiente paso</Eyebrow>
              <SplitHeading
                as="h2"
                text="Vea las cinco categorías en detalle."
                className="display-lg mt-6 max-w-2xl text-ink"
                accentFrom={3}
                accentClassName="text-coral"
              />
            </div>
            <Reveal>
              <div className="flex flex-wrap gap-3">
                <PigmentLink href="/categorias" tone="ink">
                  Categorías de productos
                </PigmentLink>
                <PigmentLink href="/contacto" tone="coral">
                  Preguntar por un material
                </PigmentLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
