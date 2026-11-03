import type { Metadata } from "next";
import Link from "next/link";
import CategoryGallery from "@/components/category-gallery";
import HomeHero from "@/components/home-hero";
import Marquee from "@/components/marquee";
import OrganicDivider from "@/components/organic-divider";
import PigmentSwatches from "@/components/pigment-swatches";
import { MaskedImage, Reveal, SplitHeading, Stagger, StaggerItem } from "@/components/reveal";
import { Container, Eyebrow, PigmentLink, SectionLabel } from "@/components/ui";
import { business, imagery, orderingSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: `${business.name} — Bellas artes en Marbella desde 1990`,
  description:
    "Especialistas en bellas artes en Marbella desde 1990. Óleo, acrílico, acuarela, pastel y chalk paint, lápices y rotuladores, pinceles, papeles, lienzos y soportes. Calle Galveston 9, Marbella.",
  alternates: { canonical: "/" },
};

const MARQUEE_ITEMS = [
  "Óleo",
  "Acuarela",
  "Acrílico",
  "Pastel",
  "Chalk Paint",
  "Lápices",
  "Rotuladores",
  "Pinceles",
  "Papeles",
  "Lienzos",
];

export default function Home() {
  return (
    <>
      <HomeHero />

      <Marquee items={MARQUEE_ITEMS} className="mt-6 bg-paper sm:mt-10" />

      {/* ------------------------------------------------------------ */}
      {/* Manifesto                                                     */}
      {/* ------------------------------------------------------------ */}
      <section className="py-20 sm:py-28 lg:py-36">
        <Container width="wide">
          <SectionLabel index="01" title="La casa" className="mb-12 sm:mb-16" />

          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:gap-20">
            <div>
              <SplitHeading
                as="h2"
                text="Una tienda de bellas artes, no un catálogo."
                className="display-lg text-ink"
                accentFrom={5}
                accentClassName="text-coral"
              />

              <Stagger className="mt-8 flex max-w-xl flex-col gap-5 text-ink-soft" gap={0.1}>
                <StaggerItem>
                  <p className="leading-relaxed">
                    Abrimos en {business.since} en Marbella y seguimos en el mismo oficio:
                    ayudar a elegir. Qué grano de papel aguanta esa aguada, qué pincel mantiene
                    la punta, por qué un blanco de titanio no se comporta como un blanco de zinc.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p className="leading-relaxed">
                    Trabajamos con pintores que vienen cada semana y con quien compra su primer
                    cuaderno. En los dos casos la conversación es la misma: qué quiere hacer y
                    con qué le va a salir mejor.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <div className="pt-2">
                    <PigmentLink href="/nuestra-historia" tone="ink">
                      Nuestra historia
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="size-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                      </svg>
                    </PigmentLink>
                  </div>
                </StaggerItem>
              </Stagger>
            </div>

            {/* Arch mask — the shop's own name, used as a shape. */}
            <MaskedImage
              src={imagery.shopAisle}
              alt="Estanterías de material de bellas artes ordenadas por color en la tienda"
              className="aspect-4/5 rounded-t-[14rem] rounded-b-2xl"
              sizes="(max-width: 1024px) 92vw, 40vw"
            />
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Palette                                                       */}
      {/* ------------------------------------------------------------ */}
      <OrganicDivider from="var(--color-ivory)" to="var(--color-paper)" />
      <section className="bg-paper py-20 sm:py-28">
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
            <PigmentSwatches />

            <Reveal className="grid grid-cols-2 gap-3 sm:gap-4">
              <MaskedImage
                src={imagery.textureWatercolour}
                alt="Paleta de acuarela con los colores mezclados"
                className="aspect-3/4 rounded-xl"
                sizes="(max-width: 1024px) 45vw, 22vw"
              />
              <MaskedImage
                src={imagery.texturePalette}
                alt="Pastillas de acuarela y pinceles sobre la mesa de trabajo"
                className="mt-8 aspect-3/4 rounded-xl sm:mt-12"
                sizes="(max-width: 1024px) 45vw, 22vw"
              />
            </Reveal>
          </div>
        </Container>
      </section>
      <OrganicDivider from="var(--color-paper)" to="var(--color-ivory)" />

      {/* ------------------------------------------------------------ */}
      {/* Categories                                                    */}
      {/* ------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 lg:py-32">
        <Container width="wide">
          <SectionLabel index="02" title="Categorías de productos" className="mb-12 sm:mb-16" />

          <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <SplitHeading
              as="h2"
              text="Cinco secciones, una conversación."
              className="display-lg max-w-2xl text-ink"
              accentFrom={3}
              accentClassName="text-violet"
            />
            <Reveal>
              <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
                Pase el cursor por la lista para ver cada sección. Los catálogos detallados se
                están preparando: mientras tanto, pregúntenos por teléfono o en tienda.
              </p>
            </Reveal>
          </div>

          <CategoryGallery />
        </Container>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Heritage                                                      */}
      {/* ------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-ink py-20 text-ivory sm:py-28">
        <Container width="wide">
          <Eyebrow className="text-ivory/50" dot="#ffc219">
            {business.sinceLabel}
          </Eyebrow>

          <SplitHeading
            as="h2"
            text="Treinta y seis años en el mismo oficio."
            className="display-lg mt-6 max-w-4xl text-ivory"
            accentFrom={4}
            accentClassName="text-yellow"
          />

          <Stagger
            as="ul"
            className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-ivory/15 sm:grid-cols-3"
            gap={0.1}
          >
            {[
              { figure: "1990", label: "El año en que abrimos en Marbella" },
              { figure: "05", label: "Secciones de material de bellas artes" },
              { figure: "1:1", label: "Asesoramiento en persona, pieza por pieza" },
            ].map((item) => (
              <StaggerItem as="li" key={item.figure} className="bg-ink p-7 sm:p-9">
                <p className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-[-0.04em] text-ivory">
                  {item.figure}
                </p>
                <p className="mt-4 max-w-56 text-sm leading-relaxed text-ivory/60">{item.label}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-12">
            <PigmentLink href="/nuestra-historia" tone="paper">
              Cómo llegamos hasta aquí
            </PigmentLink>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Ordering                                                      */}
      {/* ------------------------------------------------------------ */}
      <section className="py-20 sm:py-28 lg:py-32">
        <Container width="wide">
          <SectionLabel index="03" title="Pedidos y envíos" className="mb-12 sm:mb-16" />

          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <SplitHeading
                as="h2"
                text="Sin carrito. Con una persona al otro lado."
                className="display-md text-ink"
                accentFrom={2}
                accentClassName="text-cobalt"
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-sm leading-relaxed text-ink-soft">
                  No hay pago automático en esta web, y es deliberado: confirmamos cada pedido
                  por teléfono o email antes de cobrar nada, para que no reciba un material que
                  no era el que necesitaba.
                </p>
              </Reveal>
            </div>

            <Stagger as="ol" className="flex flex-col" gap={0.09}>
              {orderingSteps.map((step) => (
                <StaggerItem
                  as="li"
                  key={step.step}
                  className="grid gap-3 border-t border-line py-6 sm:grid-cols-[4rem_1fr] sm:gap-6 sm:py-7"
                >
                  <span className="eyebrow pt-1 text-ink-muted">{step.step}</span>
                  <div>
                    <h3 className="font-display text-xl tracking-[-0.02em] sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-soft">
                      {step.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Visit                                                         */}
      {/* ------------------------------------------------------------ */}
      <OrganicDivider from="var(--color-ivory)" to="var(--color-paper)" />
      <section className="bg-paper py-20 sm:py-28">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <Eyebrow dot="#ff5a3c">Venga a verlo</Eyebrow>
              <SplitHeading
                as="h2"
                text="Calle Galveston 9, Marbella."
                className="display-lg mt-6 text-ink"
                accentFrom={2}
                accentClassName="text-coral"
              />
              <Reveal delay={0.1}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <PigmentLink href="/como-llegar" tone="ink">
                    Cómo llegar
                  </PigmentLink>
                  <PigmentLink href="/contacto" tone="cobalt">
                    Contacto
                  </PigmentLink>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-8 text-sm text-ink-muted">
                  También puede{" "}
                  <a
                    href={`tel:${business.phoneHref}`}
                    className="text-ink underline underline-offset-4 hover:text-cobalt"
                  >
                    llamarnos al {business.phoneDisplay}
                  </a>{" "}
                  o escribir a{" "}
                  <a
                    href={`mailto:${business.email}`}
                    className="break-all text-ink underline underline-offset-4 hover:text-cobalt"
                  >
                    {business.email}
                  </a>
                  .
                </p>
              </Reveal>
            </div>

            <MaskedImage
              src={imagery.shopShelves}
              alt="Interior de la tienda con el material ordenado en estanterías"
              className="aspect-4/3 rounded-2xl lg:aspect-5/4"
              sizes="(max-width: 1024px) 92vw, 46vw"
            />
          </div>
        </Container>
      </section>

      <Reveal className="bg-paper pb-20 sm:pb-28">
        <Container width="wide">
          <Link
            href="/inspiracion"
            className="group flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="font-display text-[clamp(1.5rem,4vw,2.5rem)] leading-tight tracking-[-0.03em] transition-colors group-hover:text-violet">
              Siguiente — Inspiración
            </span>
            <span
              aria-hidden="true"
              className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-ink/20 transition-all duration-500 group-hover:border-violet group-hover:bg-violet group-hover:text-paper motion-reduce:transition-none"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </span>
          </Link>
        </Container>
      </Reveal>
    </>
  );
}
