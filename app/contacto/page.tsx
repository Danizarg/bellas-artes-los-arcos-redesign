import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import OrganicDivider from "@/components/organic-divider";
import PageHero from "@/components/page-hero";
import PigmentBand from "@/components/pigment-band";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "@/components/reveal";
import { Container, Eyebrow, PigmentLink } from "@/components/ui";
import { business, mapsDirectionsUrl, orderingSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Hable con Bellas Artes Los Arcos: Calle Galveston 9, 29601 Marbella. Teléfono 952 86 05 54, email bellasarteslosarcos@gmail.com.",
  alternates: { canonical: "/contacto" },
};

const channels = [
  {
    label: "Teléfono",
    value: business.phoneDisplay,
    href: `tel:${business.phoneHref}`,
    note: "Lo más rápido para preguntar por un material concreto.",
    accent: "#1b3fd8",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.5 5.5c0-1.1.9-2 2-2h2.2c.9 0 1.7.6 1.9 1.5l.7 2.6c.2.8-.1 1.6-.8 2l-1.2.8a12 12 0 0 0 5.3 5.3l.8-1.2c.4-.7 1.2-1 2-.8l2.6.7c.9.2 1.5 1 1.5 1.9v2.2c0 1.1-.9 2-2 2h-.5A15.5 15.5 0 0 1 2.5 6V5.5Z"
      />
    ),
  },
  {
    label: "Email",
    value: business.email,
    href: `mailto:${business.email}`,
    note: "Para pedidos, listados largos y presupuestos.",
    accent: "#ff5a3c",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 6.5h18v11H3zM3 7l9 6 9-6"
      />
    ),
  },
  {
    label: "La tienda",
    value: business.addressLine,
    href: mapsDirectionsUrl,
    note: "Venga a verlo, tocarlo y compararlo en el mostrador.",
    accent: "#6d2fd4",
    external: true,
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"
        />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
] as const;

export default function ContactoPage() {
  // Read at build time. Adding the key in Vercel needs a redeploy to take
  // effect — until then the form composes the message in the visitor's own
  // mail client instead of claiming to have sent it.
  const deliveryConfigured = Boolean(process.env.RESEND_API_KEY);

  return (
    <>
      <PageHero
        index="05"
        eyebrow="Contacto"
        title="Cuéntenos qué está pintando."
        lead="Llame, escriba o pásese por la tienda. Si nos dice en qué está trabajando, le ahorramos tres viajes y un material que no era el adecuado."
        accentFrom={2}
        accent="coral"
        dot="#ff5a3c"
      />

      {/* ---------------- Channels ---------------- */}
      <section className="pb-8 sm:pb-12">
        <Container width="wide">
          <Stagger as="ul" className="grid gap-4 border-t border-line pt-10 sm:grid-cols-3" gap={0.09}>
            {channels.map((channel) => (
              <StaggerItem as="li" key={channel.label}>
                <a
                  href={channel.href}
                  {...("external" in channel && channel.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-line bg-paper p-6 transition-colors duration-500 hover:border-ink/25 sm:p-7"
                >
                  <div>
                    <span
                      aria-hidden="true"
                      className="inline-flex size-10 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 motion-reduce:transition-none"
                      style={{ backgroundColor: `${channel.accent}1a`, color: channel.accent }}
                    >
                      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                        {channel.icon}
                      </svg>
                    </span>
                    <p className="eyebrow mt-5 text-ink-muted">{channel.label}</p>
                    <p className="mt-2.5 font-display text-xl leading-snug tracking-[-0.02em] break-words text-ink">
                      {channel.value}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-ink-muted">{channel.note}</p>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ---------------- Form ---------------- */}
      <OrganicDivider from="var(--color-ivory)" to="var(--color-paper)" />
      <section className="bg-paper py-16 sm:py-24">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <Eyebrow dot="#1b3fd8">Escríbanos</Eyebrow>
              <SplitHeading
                as="h2"
                text="Un formulario, una persona leyéndolo."
                className="display-md mt-6 text-ink"
                accentFrom={3}
                accentClassName="text-cobalt"
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-lg leading-relaxed text-ink-soft">
                  Cuantos más detalles nos dé — medio, formato, plazo — más concreta será la
                  respuesta. Si es un pedido, indique también si prefiere pagar por PayPal o por
                  transferencia.
                </p>
              </Reveal>

              <Reveal delay={0.16} className="mt-10">
                <ContactForm deliveryConfigured={deliveryConfigured} />
              </Reveal>
            </div>

            <div className="flex flex-col gap-8">
              <Reveal>
                <PigmentBand />
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-line bg-ivory p-6 sm:p-7">
                  <p className="eyebrow text-ink-muted">Horario</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                    El horario de apertura no está publicado todavía. Antes de desplazarse,{" "}
                    <a
                      href={`tel:${business.phoneHref}`}
                      className="text-ink underline underline-offset-4 hover:text-cobalt"
                    >
                      llámenos al {business.phoneDisplay}
                    </a>{" "}
                    y se lo confirmamos.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
      <OrganicDivider from="var(--color-paper)" to="var(--color-ivory)" />

      {/* ---------------- Ordering reminder ---------------- */}
      <section className="py-16 sm:py-24">
        <Container width="wide">
          <Eyebrow dot="#ffc219">Pedidos</Eyebrow>
          <SplitHeading
            as="h2"
            text="Así tramitamos un pedido."
            className="display-md mt-6 text-ink"
            accentFrom={2}
            accentClassName="text-yellow-deep"
          />

          <Stagger as="ol" className="mt-10 flex flex-col" gap={0.08}>
            {orderingSteps.map((step) => (
              <StaggerItem
                as="li"
                key={step.step}
                className="grid gap-2 border-t border-line py-5 sm:grid-cols-[4rem_1fr] sm:gap-6"
              >
                <span className="eyebrow pt-1 text-ink-muted">{step.step}</span>
                <div>
                  <h3 className="font-display text-lg tracking-[-0.02em]">{step.title}</h3>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-10">
            <div className="flex flex-wrap gap-3">
              <PigmentLink href="/como-llegar" tone="ink">
                Cómo llegar a la tienda
              </PigmentLink>
              <PigmentLink href="/categorias" tone="violet">
                Ver categorías
              </PigmentLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
