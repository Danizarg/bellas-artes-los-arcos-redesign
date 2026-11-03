"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { useHasPointer } from "@/lib/hooks";
import { business, pigments } from "@/lib/site";
import PigmentField from "./pigment-field";
import { Container } from "./ui";

/** Module scope keeps the array identity stable across renders. */
const HERO_PIGMENTS = ["#1b3fd8", "#ff5a3c", "#ffc219", "#6d2fd4", "#1b3fd8"];
const HEADLINE = ["Donde", "comienza", "la creatividad."];

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const hasPointer = useHasPointer();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const archY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "16%"]);
  const archScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.07]);
  const textY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "-8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-36 lg:pb-24">
      <Container width="wide">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* ---------------- The arch ---------------- */}
          <motion.div
            style={{ y: archY, scale: archScale }}
            className="relative order-1 mx-auto w-full max-w-[26rem] lg:order-2 lg:max-w-none"
          >
            <motion.div
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.3, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grain relative aspect-5/7 w-full overflow-hidden rounded-t-full rounded-b-2xl bg-ivory-deep sm:aspect-4/5 lg:aspect-5/6"
            >
              <PigmentField
                colors={HERO_PIGMENTS}
                pull={hasPointer ? 0.3 : 0.2}
                intensity={1}
                resolution={0.42}
              />
              {/* Keeps the keyline crisp over a soft wash. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-t-full rounded-b-2xl ring-1 ring-ink/8 ring-inset"
              />
            </motion.div>

            {/* Floating pigment chips — the palette, loose on the table. */}
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 1.1 } } }}
              className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full border border-line bg-paper/90 px-3 py-2 backdrop-blur-sm sm:-bottom-4 sm:gap-2 sm:px-4"
            >
              {pigments.slice(0, 5).map((pigment) => (
                <motion.li
                  key={pigment.name}
                  variants={{
                    hidden: { opacity: 0, scale: 0.4 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
                  }}
                  title={pigment.name}
                  className="size-4 rounded-full mix-blend-multiply sm:size-5"
                  style={{ backgroundColor: pigment.hex }}
                />
              ))}
            </motion.ul>
          </motion.div>

          {/* ---------------- The statement ---------------- */}
          <motion.div style={{ y: textY }} className="order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-ink-muted"
            >
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="inline-block size-2 rounded-full bg-coral" />
                {business.specialistsLabel}
              </span>
              <span aria-hidden="true" className="hidden h-3 w-px bg-line sm:block" />
              <span>{business.city}</span>
            </motion.p>

            <h1 className="display-hero mt-6 text-ink">
              <span aria-hidden="true">
                {HEADLINE.map((line, index) => (
                  <span key={line} className="block overflow-hidden pb-[0.06em]">
                    <motion.span
                      className="block"
                      initial={{ y: "112%" }}
                      animate={{ y: "0%" }}
                      transition={{
                        duration: 1.05,
                        delay: 0.6 + index * 0.085,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {index === 2 ? (
                        <>
                          la <span className="text-cobalt">creatividad.</span>
                        </>
                      ) : (
                        line
                      )}
                    </motion.span>
                  </span>
                ))}
              </span>
              <span className="sr-only">Donde comienza la creatividad.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg"
            >
              {business.claim}. Treinta y seis años aconsejando a pintores, estudiantes y
              restauradores sobre el material que de verdad necesitan — en una tienda donde se
              puede tocar, comparar y preguntar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/categorias"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-y-full bg-cobalt transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 motion-reduce:transition-none"
                />
                <span className="relative z-10">Ver categorías</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="relative z-10 size-4 transition-transform duration-500 group-hover:translate-x-1 motion-reduce:transition-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>

              <a
                href={`tel:${business.phoneHref}`}
                className="inline-flex items-center gap-2.5 rounded-full border border-ink/20 px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                {business.phoneDisplay}
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.32 }}
              className="mt-8 text-xs text-ink-muted"
            >
              {hasPointer
                ? "Mueva el cursor sobre el arco para remover el pigmento."
                : "Deslice el dedo sobre el arco para remover el pigmento."}
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
