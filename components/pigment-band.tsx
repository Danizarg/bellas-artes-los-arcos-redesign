"use client";

import { motion } from "motion/react";
import { useHasPointer } from "@/lib/hooks";
import { inView } from "@/lib/motion";
import PigmentField from "./pigment-field";

const BAND_PIGMENTS = ["#6d2fd4", "#1b3fd8", "#ffc219", "#ff5a3c", "#2f7d4f"];

/**
 * A wide pigment wash with the house line set on a paper card, so the type
 * always sits on a solid, high-contrast surface no matter how the colour
 * happens to mix underneath.
 */
export default function PigmentBand() {
  const hasPointer = useHasPointer();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.98 },
        visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      className="grain relative grid min-h-[22rem] place-items-center overflow-hidden rounded-[1.75rem] bg-ivory-deep p-6 sm:min-h-[26rem] sm:p-10"
    >
      <div className="absolute inset-0">
        <PigmentField
          colors={BAND_PIGMENTS}
          pull={hasPointer ? 0.34 : 0.22}
          intensity={0.95}
          resolution={0.4}
        />
      </div>

      <div className="relative max-w-xl rounded-2xl bg-paper/95 px-7 py-8 text-center backdrop-blur-sm sm:px-10 sm:py-10">
        <p className="eyebrow text-ink-muted">Bellas Artes Los Arcos</p>
        <p className="mt-5 font-display text-[clamp(1.5rem,3.6vw,2.5rem)] leading-[1.05] tracking-[-0.03em] text-ink">
          Donde comienza la creatividad.
        </p>
        <p className="mt-5 text-sm text-ink-muted">
          {hasPointer
            ? "Mueva el cursor para mezclar el pigmento."
            : "Deslice el dedo para mezclar el pigmento."}
        </p>
      </div>
    </motion.div>
  );
}
