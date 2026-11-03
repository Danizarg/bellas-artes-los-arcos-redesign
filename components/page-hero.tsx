import { Reveal, SplitHeading } from "./reveal";
import { Container, Eyebrow } from "./ui";

export default function PageHero({
  index,
  eyebrow,
  title,
  lead,
  accentFrom,
  accent = "cobalt",
  dot = "#1b3fd8",
}: {
  index: string;
  eyebrow: string;
  title: string;
  lead: string;
  accentFrom?: number;
  accent?: "cobalt" | "coral" | "violet" | "yellow";
  dot?: string;
}) {
  const accentClass = {
    cobalt: "text-cobalt",
    coral: "text-coral",
    violet: "text-violet",
    yellow: "text-yellow-deep",
  }[accent];

  return (
    <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 lg:pt-44">
      <Container width="wide">
        <div className="flex items-baseline gap-4">
          <span className="eyebrow text-ink-muted">{index}</span>
          <Eyebrow dot={dot}>{eyebrow}</Eyebrow>
        </div>

        <SplitHeading
          as="h1"
          text={title}
          className="display-xl mt-7 max-w-[60rem] text-ink"
          accentFrom={accentFrom}
          accentClassName={accentClass}
        />

        <Reveal delay={0.2}>
          <p className="mt-9 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {lead}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
