import type { Metadata } from "next";
import Image from "next/image";
import OrganicDivider from "@/components/organic-divider";
import PageHero from "@/components/page-hero";
import { MaskedImage, Reveal, SplitHeading, Stagger, StaggerItem } from "@/components/reveal";
import { Container, Eyebrow, PigmentLink } from "@/components/ui";
import { business, categories, orderingSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "Categorías de productos",
  description:
    "Las cinco categorías de Bellas Artes Los Arcos: Pintura (óleo, acrílico, acuarela, pastel, chalk paint), Dibujo y Rotuladores, Pinceles y Espátulas, Papeles, y Lienzos y Soportes.",
  alternates: { canonical: "/categorias" },
};

export default function CategoriasPage() {
  return (
    <>
      <PageHero
        index="03"
        eyebrow="Categorías de productos"
        title="Cinco secciones. El surtido de una tienda especialista."
        lead="Esto es lo que encontrará en tienda, ordenado como lo tenemos en los pasillos. Sin precios ni stock en pantalla: para eso, una llamada resuelve más que una ficha."
        accentFrom={3}
        accent="cobalt"
      />

      {/* ---------------- Index ---------------- */}
      <section className="pb-12 sm:pb-16">
        <Container width="wide">
          <Stagger as="ul" className="flex flex-wrap gap-2.5 border-t border-line pt-8" gap={0.06}>
            {categories.map((category, index) => (
              <StaggerItem as="li" key={category.slug}>
                <a
                  href={`#${category.slug}`}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-paper px-4 py-2.5 text-sm text-ink transition-colors hover:border-ink"
                >
                  <span className="eyebrow text-ink-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: category.hex }}
                  />
                  {category.name}
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ---------------- Category sections ---------------- */}
      {categories.map((category, index) => (
        <section
          key={category.slug}
          id={category.slug}
          className="scroll-mt-28 border-t border-line py-16 sm:py-24"
        >
          <Container width="wide">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              {/* Sticky heading column */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="size-3 rounded-full"
                    style={{ backgroundColor: category.hex }}
                  />
                  <span className="eyebrow text-ink-muted">
                    Categoría {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <SplitHeading
                  as="h2"
                  text={category.name}
                  className="display-md mt-5 text-ink"
                />

                <Reveal delay={0.08}>
                  <p className="mt-5 max-w-sm leading-relaxed text-ink-soft">{category.blurb}</p>
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="mt-7">
                    {category.catalogueReady ? (
                      <p className="eyebrow text-ink-muted">
                        {category.ranges.length} gamas en tienda
                      </p>
                    ) : (
                      <p className="inline-flex rounded-full border border-dashed border-line px-4 py-2 text-xs text-ink-muted">
                        Catálogo en preparación
                      </p>
                    )}
                  </div>
                </Reveal>

                <Reveal delay={0.16}>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <PigmentLink href={`tel:${business.phoneHref}`} external tone="ink">
                      Preguntar por teléfono
                    </PigmentLink>
                  </div>
                </Reveal>
              </div>

              {/* Showroom column */}
              <div>
                <MaskedImage
                  src={category.cover}
                  alt={`${category.name} en Bellas Artes Los Arcos, Marbella`}
                  className="aspect-16/10 rounded-2xl"
                  sizes="(max-width: 1024px) 92vw, 54vw"
                  priority={index === 0}
                />

                {category.ranges.length > 0 ? (
                  <Stagger as="ul" className="mt-5 grid gap-4 sm:grid-cols-2" gap={0.08}>
                    {category.ranges.map((range, rangeIndex) => (
                      <StaggerItem as="li" key={range}>
                        <article className="group h-full overflow-hidden rounded-xl border border-line bg-paper">
                          <div className="relative aspect-5/4 overflow-hidden bg-ivory-deep">
                            <Image
                              src={category.gallery[rangeIndex % category.gallery.length]}
                              alt={`${range} — ${category.name}`}
                              fill
                              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 26vw"
                              className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none"
                            />
                          </div>
                          <div className="flex items-baseline justify-between gap-3 p-5">
                            <h3 className="font-display text-lg tracking-[-0.02em]">{range}</h3>
                            <span className="eyebrow shrink-0 text-ink-muted">En tienda</span>
                          </div>
                        </article>
                      </StaggerItem>
                    ))}
                  </Stagger>
                ) : (
                  <Stagger as="ul" className="mt-5 grid gap-4 sm:grid-cols-2" gap={0.08}>
                    {category.gallery.slice(0, 2).map((src, imageIndex) => (
                      <StaggerItem as="li" key={src}>
                        <article className="h-full overflow-hidden rounded-xl border border-dashed border-line bg-paper/60">
                          <div className="relative aspect-5/4 overflow-hidden bg-ivory-deep">
                            <Image
                              src={src}
                              alt={`${category.name}, imagen ilustrativa ${imageIndex + 1}`}
                              fill
                              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 26vw"
                              className="object-cover"
                            />
                          </div>
                          <div className="p-5">
                            <h3 className="font-display text-lg tracking-[-0.02em] text-ink-muted">
                              Ficha en preparación
                            </h3>
                            <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                              Este hueco está reservado para las gamas de {category.name} cuando
                              la tienda nos facilite el listado.
                            </p>
                          </div>
                        </article>
                      </StaggerItem>
                    ))}
                  </Stagger>
                )}
              </div>
            </div>
          </Container>
        </section>
      ))}

      {/* ---------------- Ordering ---------------- */}
      <OrganicDivider from="var(--color-ivory)" to="var(--color-paper)" />
      <section className="bg-paper py-20 sm:py-28">
        <Container width="wide">
          <Eyebrow dot="#ffc219">Pedidos, pagos y envíos</Eyebrow>
          <SplitHeading
            as="h2"
            text="Cómo se compra aquí."
            className="display-lg mt-6 text-ink"
            accentFrom={2}
            accentClassName="text-yellow-deep"
          />

          <Stagger as="ol" className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 lg:grid-cols-4" gap={0.09}>
            {orderingSteps.map((step) => (
              <StaggerItem as="li" key={step.step} className="bg-paper p-6 sm:p-7">
                <span className="eyebrow text-ink-muted">{step.step}</span>
                <h3 className="mt-4 font-display text-xl leading-snug tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{step.body}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-10">
            <p className="max-w-3xl text-sm leading-relaxed text-ink-muted">
              Los gastos de envío se calculan según la tarifa de Correos con servicio certificado.
              No hay venta automática ni pago en línea en esta web: cada pedido se confirma antes
              con usted.
            </p>
          </Reveal>

          <Reveal className="mt-9">
            <div className="flex flex-wrap gap-3">
              <PigmentLink href="/contacto" tone="ink">
                Hacer una consulta
              </PigmentLink>
              <PigmentLink href={`tel:${business.phoneHref}`} external tone="cobalt">
                Llamar al {business.phoneDisplay}
              </PigmentLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper pb-20 sm:pb-28">
        <Container width="wide">
          <Reveal className="rounded-2xl border border-dashed border-line p-7 sm:p-9">
            <p className="eyebrow text-ink-muted">Sobre este catálogo</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-soft">
              Las categorías y gamas que aparecen aquí son las que la tienda publica. Las
              fotografías son de archivo y sirven de muestra: están preparadas para sustituirse
              por fotos reales de los pasillos. No se muestran marcas, precios ni disponibilidad
              porque la tienda está actualizando esa información.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
