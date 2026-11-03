import type { Metadata } from "next";
import CopyAddress from "@/components/copy-address";
import OrganicDivider from "@/components/organic-divider";
import PageHero from "@/components/page-hero";
import { MaskedImage, Reveal, SplitHeading, Stagger, StaggerItem } from "@/components/reveal";
import { Container, Eyebrow, PigmentLink } from "@/components/ui";
import {
  appleMapsUrl,
  business,
  imagery,
  mapsDirectionsUrl,
  mapsEmbedUrl,
  mapsUrl,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Cómo llegar",
  description:
    "Bellas Artes Los Arcos está en Calle Galveston 9, 29601 Marbella (Málaga). Indicaciones para llegar en coche o a pie y enlace directo a Google Maps y Apple Maps.",
  alternates: { canonical: "/como-llegar" },
};

const practical = [
  {
    title: "En coche",
    body: `Calle Galveston está en el ${business.neighbourhood} de Marbella, en la zona de ${business.quarter}. Si usa el navegador, introduzca «Calle Galveston 9, 29601 Marbella» — o abra directamente la ruta con los botones de arriba.`,
    accent: "#1b3fd8",
  },
  {
    title: "Aparcar",
    body: "Se aparca en la calle, en el entorno del local. Si va a recoger un pedido grande, avísenos al llamar y lo dejamos preparado para que la parada sea corta.",
    accent: "#ff5a3c",
  },
  {
    title: "Antes de venir",
    body: `El horario de apertura no está publicado todavía. Una llamada al ${business.phoneDisplay} confirma que estamos y, si busca algo concreto, que lo tenemos.`,
    accent: "#6d2fd4",
  },
  {
    title: "Recoger un pedido",
    body: "Puede hacer el pedido por teléfono o email y recogerlo en tienda, sin gastos de envío. Lo confirmamos antes con usted, como cualquier otro pedido.",
    accent: "#ffc219",
  },
];

export default function ComoLlegarPage() {
  return (
    <>
      <PageHero
        index="06"
        eyebrow="Cómo llegar"
        title="Calle Galveston 9, Marbella."
        lead="Estamos en Marbella, en Calle Galveston número 9, código postal 29601. Abajo tiene el mapa, la ruta directa y lo práctico: dónde aparcar y qué conviene preguntar antes de venir."
        accentFrom={2}
        accent="cobalt"
      />

      {/* ---------------- Address + actions ---------------- */}
      <section className="pb-14 sm:pb-20">
        <Container width="wide">
          <div className="grid gap-10 border-t border-line pt-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <Reveal>
              <address className="text-base not-italic">
                <p className="eyebrow text-ink-muted">Dirección</p>
                <p className="mt-4 font-display text-[clamp(1.75rem,4.2vw,3rem)] leading-[1.05] tracking-[-0.03em] text-ink">
                  {business.street}
                  <br />
                  {business.postalCode} {business.city}
                  <span className="text-ink-muted">, {business.province}</span>
                </p>
                <p className="mt-5 text-sm text-ink-muted">
                  <a
                    href={`tel:${business.phoneHref}`}
                    className="text-ink underline underline-offset-4 hover:text-cobalt"
                  >
                    {business.phoneDisplay}
                  </a>
                  {" · "}
                  <a
                    href={`mailto:${business.email}`}
                    className="break-all text-ink underline underline-offset-4 hover:text-cobalt"
                  >
                    {business.email}
                  </a>
                </p>
              </address>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-wrap gap-3">
                <PigmentLink href={mapsDirectionsUrl} external tone="ink">
                  Ruta en Google Maps
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </PigmentLink>
                <PigmentLink href={appleMapsUrl} external tone="cobalt">
                  Apple Maps
                </PigmentLink>
                <CopyAddress />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------------- Map ---------------- */}
      <section className="pb-16 sm:pb-24">
        <Container width="wide">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-line bg-ivory-deep">
              <iframe
                src={mapsEmbedUrl}
                title={`Mapa de la ubicación de ${business.name} en Calle Galveston 9, Marbella`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full border-0 sm:h-[460px]"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-4 text-xs text-ink-muted">
              Mapa de OpenStreetMap. Para la ruta puerta a puerta, use los botones de arriba o{" "}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline underline-offset-4 hover:text-cobalt"
              >
                abra la ubicación en Google Maps
              </a>
              .
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ---------------- Practical notes ---------------- */}
      <OrganicDivider from="var(--color-ivory)" to="var(--color-paper)" />
      <section className="bg-paper py-20 sm:py-28">
        <Container width="wide">
          <Eyebrow dot="#ff5a3c">Lo práctico</Eyebrow>
          <SplitHeading
            as="h2"
            text="Cuatro cosas que conviene saber."
            className="display-lg mt-6 max-w-2xl text-ink"
            accentFrom={3}
            accentClassName="text-coral"
          />

          <Stagger as="ul" className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2" gap={0.09}>
            {practical.map((item) => (
              <StaggerItem as="li" key={item.title} className="bg-paper p-7 sm:p-9">
                <span
                  aria-hidden="true"
                  className="inline-block size-2.5 rounded-full"
                  style={{ backgroundColor: item.accent }}
                />
                <h3 className="mt-5 font-display text-2xl tracking-[-0.025em]">{item.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">{item.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
      <OrganicDivider from="var(--color-paper)" to="var(--color-ivory)" />

      {/* ---------------- Closing ---------------- */}
      <section className="py-20 sm:py-28">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20">
            <div>
              <SplitHeading
                as="h2"
                text="Le esperamos en el mostrador."
                className="display-lg text-ink"
                accentFrom={2}
                accentClassName="text-cobalt"
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-lg leading-relaxed text-ink-soft">
                  Traiga una foto de lo que está pintando, un trozo del papel que usa o el tubo
                  que se le ha terminado. Con eso en la mano la conversación es mucho más corta y
                  el acierto mucho mayor.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <PigmentLink href={`tel:${business.phoneHref}`} external tone="ink">
                    Llamar al {business.phoneDisplay}
                  </PigmentLink>
                  <PigmentLink href="/contacto" tone="coral">
                    Escribirnos
                  </PigmentLink>
                </div>
              </Reveal>
            </div>

            <MaskedImage
              src={imagery.shopCounter}
              alt="Mostrador de la tienda con material preparado para un pedido"
              className="aspect-4/5 rounded-t-[13rem] rounded-b-2xl"
              sizes="(max-width: 1024px) 92vw, 42vw"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
