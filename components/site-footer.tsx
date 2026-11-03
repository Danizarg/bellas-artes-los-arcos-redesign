import Link from "next/link";
import { business, categories, mapsDirectionsUrl, navigation } from "@/lib/site";
import { Container } from "./ui";

export default function SiteFooter() {
  const year = 2026;

  return (
    <footer className="relative bg-ink text-ivory">
      <Container width="wide" className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <p className="eyebrow text-ivory/50">{business.sinceLabel}</p>
            <p className="mt-4 font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[0.95] tracking-[-0.03em]">
              Donde comienza
              <br />
              la creatividad.
            </p>
            <div aria-hidden="true" className="mt-7 flex -space-x-1.5">
              {["#1b3fd8", "#ff5a3c", "#6d2fd4", "#ffc219"].map((hex) => (
                <span
                  key={hex}
                  className="size-5 rounded-full mix-blend-screen"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          </div>

          <nav aria-label="Páginas">
            <h2 className="eyebrow text-ivory/50">Navegar</h2>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ivory/80 underline-offset-4 transition-colors hover:text-ivory hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Categorías">
            <h2 className="eyebrow text-ivory/50">Categorías</h2>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/categorias#${category.slug}`}
                    className="text-ivory/80 underline-offset-4 transition-colors hover:text-ivory hover:underline"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-ivory/50">La tienda</h2>
            <address className="mt-5 flex flex-col gap-2.5 text-sm not-italic text-ivory/80">
              <span>
                {business.street}
                <br />
                {business.postalCode} {business.city}, {business.province}
              </span>
              <a
                href={`tel:${business.phoneHref}`}
                className="w-fit underline-offset-4 transition-colors hover:text-ivory hover:underline"
              >
                {business.phoneDisplay}
              </a>
              <a
                href={`mailto:${business.email}`}
                className="w-fit break-all underline-offset-4 transition-colors hover:text-ivory hover:underline"
              >
                {business.email}
              </a>
              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex w-fit items-center gap-1.5 text-yellow underline-offset-4 hover:underline"
              >
                Cómo llegar
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
              </a>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/15 pt-7 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.name}. Especialistas en bellas artes desde {business.since}.
          </p>
          <p>
            Los pedidos se confirman siempre por teléfono o email. No hay venta automática en
            esta web.
          </p>
        </div>
      </Container>
    </footer>
  );
}
