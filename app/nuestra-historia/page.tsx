import type { Metadata } from "next";
import OrganicDivider from "@/components/organic-divider";
import PageHero from "@/components/page-hero";
import { MaskedImage, Reveal, SplitHeading, Stagger, StaggerItem } from "@/components/reveal";
import { Container, Eyebrow, PigmentLink, SectionLabel } from "@/components/ui";
import { business, imagery } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nuestra historia",
  description:
    "Bellas Artes Los Arcos abrió en Marbella en 1990. Treinta y seis años como especialistas en material de bellas artes en Calle Galveston 9.",
  alternates: { canonical: "/nuestra-historia" },
};

const timeline = [
  {
    year: "1990",
    title: "Abre Los Arcos",
    body: "Bellas Artes Los Arcos abre sus puertas en Marbella. Desde el primer día la tienda se define por lo mismo que hoy: material de bellas artes y alguien que sabe explicarlo.",
    accent: "#1b3fd8",
  },
  {
    year: "El nombre",
    title: "Los arcos como forma",
    body: "El nombre acompaña a la tienda desde el principio, y de él viene el arco que recorre esta web: la curva que enmarca el color, la puerta por la que se entra a trabajar.",
    accent: "#ff5a3c",
  },
  {
    year: "El oficio",
    title: "Especialistas, no bazar",
    body: "La tienda se presenta como especialista, y eso marca el surtido: pintura, dibujo, pinceles, papeles y soportes, elegidos para pintar de verdad y no para rellenar estantes.",
    accent: "#6d2fd4",
  },
  {
    year: "Hoy",
    title: "Cinco secciones y una libreta de pedidos",
    body: "Seguimos atendiendo en Calle Galveston 9 y preparando pedidos uno a uno. Estamos actualizando el catálogo y los precios: cuando esté listo, lo verá aquí.",
    accent: "#ffc219",
  },
];

export default function NuestraHistoriaPage() {
  return (
    <>
      <PageHero
        index="01"
        eyebrow="Nuestra historia"
        title="Desde 1990, en el mismo oficio y la misma calle."
        lead={`${business.name} abrió en Marbella en ${business.since}. Treinta y seis años después seguimos vendiendo material de bellas artes de la única forma que sabemos: hablando con quien va a usarlo.`}
        accentFrom={1}
        accent="coral"
        dot="#ff5a3c"
      />

      <section className="py-12 sm:py-16">
        <Container width="wide">
          <MaskedImage
            src={imagery.heritage}
            alt="Tubos de óleo usados, con la pintura seca en los bordes, sobre una mesa de trabajo"
            className="aspect-16/10 rounded-2xl sm:aspect-21/9"
            sizes="(max-width: 1320px) 94vw, 1240px"
            priority
          />
        </Container>
      </section>

      {/* ------------------------------------------------------------ */}
      <OrganicDivider from="var(--color-ivory)" to="var(--color-paper)" />
      <section className="bg-paper py-20 sm:py-28">
        <Container width="wide">
          <SectionLabel index="02" title="La línea del tiempo" className="mb-14" />

          <Stagger as="ol" className="flex flex-col" gap={0.1}>
            {timeline.map((entry) => (
              <StaggerItem
                as="li"
                key={entry.year}
                className="group grid gap-4 border-t border-line py-8 sm:grid-cols-[10rem_1fr] sm:gap-10 sm:py-10"
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: entry.accent }}
                  />
                  <span className="eyebrow pt-1 text-ink-muted">{entry.year}</span>
                </div>
                <div>
                  <h2 className="font-display text-[clamp(1.5rem,3.4vw,2.25rem)] leading-tight tracking-[-0.03em]">
                    {entry.title}
                  </h2>
                  <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{entry.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
      <OrganicDivider from="var(--color-paper)" to="var(--color-ivory)" />

      {/* ------------------------------------------------------------ */}
      <section className="py-20 sm:py-28">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20">
            <div>
              <Eyebrow dot="#1b3fd8">Cómo trabajamos</Eyebrow>
              <SplitHeading
                as="h2"
                text="El consejo es el producto."
                className="display-lg mt-6 text-ink"
                accentFrom={2}
                accentClassName="text-cobalt"
              />
              <Stagger className="mt-8 flex max-w-xl flex-col gap-5 text-ink-soft" gap={0.1}>
                <StaggerItem>
                  <p className="leading-relaxed">
                    Una tienda de bellas artes se mide por lo que evita: el papel que se ondula,
                    el pincel que suelta pelo, el barniz que amarillea. Por eso preguntamos antes
                    de vender, y por eso confirmamos cada pedido antes de cobrarlo.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p className="leading-relaxed">
                    No tenemos pago automático en la web. Nos escribe o nos llama, hablamos de lo
                    que necesita, y entonces le pasamos el importe con los gastos de envío. Es más
                    lento y funciona mejor.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <PigmentLink href="/materiales" tone="ink">
                      Ver los materiales
                    </PigmentLink>
                    <PigmentLink href="/contacto" tone="cobalt">
                      Hablar con nosotros
                    </PigmentLink>
                  </div>
                </StaggerItem>
              </Stagger>
            </div>

            <MaskedImage
              src={imagery.shopCounter}
              alt="Mostrador de la tienda con material de dibujo preparado"
              className="aspect-4/5 rounded-t-[13rem] rounded-b-2xl"
              sizes="(max-width: 1024px) 92vw, 42vw"
            />
          </div>
        </Container>
      </section>

      {/* An honest note about what this page does and does not claim. */}
      <section className="pb-20 sm:pb-28">
        <Container width="wide">
          <Reveal className="rounded-2xl border border-dashed border-line bg-paper p-7 sm:p-9">
            <p className="eyebrow text-ink-muted">Nota</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-soft">
              Esta página recoge únicamente lo que la tienda publica hoy: el año de apertura, la
              dirección y su forma de trabajar. Las fotografías son de archivo y están pensadas
              para sustituirse por imágenes de la tienda. Datos como el horario de apertura, las
              marcas que trabajamos o los precios se añadirán en cuanto estén confirmados.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
