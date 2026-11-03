"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type Props = {
  /** Background of the section above the curve. */
  from?: string;
  /** Fill of the section arriving below the curve. */
  to?: string;
  /** Flip the curve so a section can both open and close organically. */
  flip?: boolean;
  className?: string;
};

/**
 * A soft, hand-drawn-feeling boundary between two sections. The curve shifts
 * a few units as it scrolls past, which reads as the page breathing rather
 * than as an effect. The SVG overflows the clipping box vertically so the
 * shift can never open a seam.
 */
export default function OrganicDivider({
  from = "var(--color-ivory)",
  to = "var(--color-paper)",
  flip = false,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const shift = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-16, 16]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none relative h-[7vw] min-h-12 w-full overflow-hidden sm:min-h-20 ${className}`}
      style={{ background: from, transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -top-[15%] h-[130%] w-full"
      >
        <motion.path
          d="M0,116 C210,42 356,138 584,94 C812,50 962,130 1172,86 C1286,62 1368,74 1440,54 L1440,200 L0,200 Z"
          fill={to}
          style={{ y: shift }}
        />
      </svg>
    </div>
  );
}
