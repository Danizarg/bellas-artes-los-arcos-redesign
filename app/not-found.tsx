import type { Metadata } from "next";
import { Container, PigmentLink } from "@/components/ui";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="grid min-h-[70svh] place-items-center py-32">
      <Container width="narrow" className="text-center">
        <span aria-hidden="true" className="inline-flex -space-x-2">
          {["#1b3fd8", "#ff5a3c", "#6d2fd4", "#ffc219"].map((hex) => (
            <span
              key={hex}
              className="size-6 rounded-full mix-blend-multiply"
              style={{ backgroundColor: hex }}
            />
          ))}
        </span>

        <h1 className="display-lg mt-9 text-ink">Esta página se ha quedado en blanco.</h1>

        <p className="mx-auto mt-6 max-w-md leading-relaxed text-ink-soft">
          No encontramos lo que buscaba. Vuelva al inicio, mire las categorías o llámenos al{" "}
          <a
            href={`tel:${business.phoneHref}`}
            className="text-ink underline underline-offset-4 hover:text-cobalt"
          >
            {business.phoneDisplay}
          </a>
          .
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <PigmentLink href="/" tone="ink">
            Volver al inicio
          </PigmentLink>
          <PigmentLink href="/categorias" tone="cobalt">
            Categorías de productos
          </PigmentLink>
        </div>
      </Container>
    </section>
  );
}
