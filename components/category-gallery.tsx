"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { categories } from "@/lib/site";

/**
 * Interactive index of the shop's material categories.
 *
 * Desktop: an editorial list on the left drives a single large image panel on
 * the right. Hover and focus share the same state, so tabbing through the
 * list animates exactly like pointing at it.
 *
 * Mobile: the same data, laid out as cards with the image inline — no hover
 * state is required to see anything.
 */
export default function CategoryGallery() {
  const [active, setActive] = useState(0);
  const current = categories[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
      {/* ---------- The list ---------- */}
      <ul className="border-t border-line">
        {categories.map((category, index) => {
          const isActive = index === active;
          return (
            <li key={category.slug} className="border-b border-line">
              <Link
                href={`/categorias#${category.slug}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="group block py-6 sm:py-7"
                aria-describedby={`cat-blurb-${category.slug}`}
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <span className="eyebrow mt-2 w-8 shrink-0 text-ink-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3
                      className="font-display text-[clamp(1.5rem,4.4vw,2.6rem)] leading-[1.02] tracking-[-0.03em] transition-colors duration-400"
                      style={{ color: isActive ? category.hex : undefined }}
                    >
                      {category.name}
                    </h3>

                    {/* Mobile keeps the image with its card. */}
                    <div className="relative mt-4 aspect-4/3 overflow-hidden rounded-xl bg-ivory-deep lg:hidden">
                      <Image
                        src={category.cover}
                        alt={`Materiales de ${category.name} en Bellas Artes Los Arcos`}
                        fill
                        sizes="(max-width: 1024px) 92vw, 1px"
                        className="object-cover"
                      />
                    </div>

                    <p
                      id={`cat-blurb-${category.slug}`}
                      className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft lg:mt-3"
                    >
                      {category.blurb}
                    </p>

                    <AnimatePresence initial={false}>
                      {isActive ? (
                        <motion.div
                          key="ranges"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-wrap gap-2 pt-4">
                            {category.ranges.length > 0 ? (
                              category.ranges.map((range) => (
                                <span
                                  key={range}
                                  className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs text-ink-soft"
                                >
                                  {range}
                                </span>
                              ))
                            ) : (
                              <span className="rounded-full border border-dashed border-line px-3 py-1.5 text-xs text-ink-muted">
                                Catálogo en preparación — consúltenos en tienda
                              </span>
                            )}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>

                  <span
                    aria-hidden="true"
                    className="mt-2 shrink-0 text-ink-muted transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 motion-reduce:transition-none"
                  >
                    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* ---------- The image panel (desktop) ---------- */}
      <div className="sticky top-28 hidden lg:block">
        <div className="relative aspect-3/4 overflow-hidden rounded-[1.75rem] bg-ivory-deep">
          <AnimatePresence initial={false}>
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={current.cover}
                alt={`Materiales de ${current.name} en Bellas Artes Los Arcos`}
                fill
                sizes="(max-width: 1024px) 1px, 42vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ink/55 to-transparent"
          />

          <div aria-hidden="true" className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
            <p className="font-display text-2xl text-paper tracking-[-0.02em]">{current.name}</p>
            <span
              className="size-9 shrink-0 rounded-full border-2 border-paper/70 transition-colors duration-500"
              style={{ backgroundColor: current.hex }}
            />
          </div>
        </div>

        <div className="mt-4 flex gap-1.5" aria-hidden="true">
          {categories.map((category, index) => (
            <span
              key={category.slug}
              className="h-0.5 flex-1 rounded-full transition-colors duration-500"
              style={{
                backgroundColor: index === active ? category.hex : "var(--color-line)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
