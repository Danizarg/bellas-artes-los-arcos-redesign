"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { pigments } from "@/lib/site";

/**
 * Colour-swatch interaction. Pointing at — or tabbing to — a swatch lifts it
 * out of the row and repaints the statement above it. Hover and focus drive
 * the same state, so the keyboard experience is identical to the mouse one.
 */
export default function PigmentSwatches() {
  const [active, setActive] = useState(0);
  const pigment = pigments[active];

  return (
    <div>
      <p className="eyebrow text-ink-muted">La paleta de la casa</p>

      <p className="display-lg mt-5 flex flex-wrap items-baseline gap-x-4">
        <span>Todo empieza</span>
        <span className="relative inline-block">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={pigment.name}
              initial={{ opacity: 0, y: "0.35em", filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: "-0.35em", filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
              style={{ color: pigment.hex }}
            >
              en un color.
            </motion.span>
          </AnimatePresence>
        </span>
      </p>

      <ul className="mt-10 flex items-end gap-1.5 sm:gap-2.5">
        {pigments.map((item, index) => {
          const isActive = index === active;
          return (
            <li key={item.name} className="flex-1">
              <button
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                aria-pressed={isActive}
                className="group block w-full cursor-pointer text-left"
              >
                <span className="sr-only">
                  {item.name}. {item.note}.
                </span>
                <motion.span
                  aria-hidden="true"
                  className="block w-full rounded-t-[0.3rem] rounded-b-xs"
                  style={{ backgroundColor: item.hex }}
                  animate={{ height: isActive ? 132 : 84 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 flex min-h-12 items-start justify-between gap-6 border-t border-line pt-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pigment.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-display text-xl tracking-[-0.02em]">{pigment.name}</p>
            <p className="mt-1 text-sm text-ink-muted">{pigment.note}</p>
          </motion.div>
        </AnimatePresence>
        <p
          aria-hidden="true"
          className="shrink-0 font-mono text-xs tracking-widest text-ink-muted uppercase"
        >
          {pigment.hex}
        </p>
      </div>
    </div>
  );
}
