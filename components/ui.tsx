import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "wide" | "narrow";
}) {
  const max =
    width === "wide" ? "max-w-[1600px]" : width === "narrow" ? "max-w-3xl" : "max-w-[1320px]";
  return <div className={`mx-auto w-full ${max} px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

export function Eyebrow({
  children,
  className = "",
  dot,
}: {
  children: ReactNode;
  className?: string;
  dot?: string;
}) {
  return (
    <p className={`eyebrow flex items-center gap-2.5 text-ink-muted ${className}`}>
      {dot ? (
        <span
          aria-hidden="true"
          className="inline-block size-2 shrink-0 rounded-full"
          style={{ backgroundColor: dot }}
        />
      ) : null}
      {children}
    </p>
  );
}

/**
 * The site's primary action. A pigment disc slides up behind the label on
 * hover — the only "button flourish" used anywhere, so it stays a signal.
 */
export function PigmentLink({
  href,
  children,
  tone = "ink",
  className = "",
  external = false,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  tone?: "ink" | "cobalt" | "coral" | "violet" | "paper";
  className?: string;
  external?: boolean;
  ariaLabel?: string;
}) {
  const tones = {
    ink: "border-ink text-ink hover:text-paper [--fill:var(--color-ink)]",
    cobalt: "border-cobalt text-cobalt hover:text-paper [--fill:var(--color-cobalt)]",
    coral: "border-coral text-coral hover:text-paper [--fill:var(--color-coral)]",
    violet: "border-violet text-violet hover:text-paper [--fill:var(--color-violet)]",
    paper: "border-paper text-paper hover:text-ink [--fill:var(--color-paper)]",
  } as const;

  const classes = `group relative inline-flex items-center justify-center overflow-hidden rounded-full border px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-500 ${tones[tone]} ${className}`;

  const inner = (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-y-full rounded-full bg-(--fill) transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 motion-reduce:transition-none"
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {inner}
    </Link>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return <hr className={`border-0 border-t border-line ${className}`} />;
}

export function SectionLabel({
  index,
  title,
  className = "",
}: {
  index: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`flex items-baseline gap-4 border-t border-line pt-4 ${className}`}>
      <span className="eyebrow text-ink-muted">{index}</span>
      <span className="eyebrow text-ink">{title}</span>
    </div>
  );
}
