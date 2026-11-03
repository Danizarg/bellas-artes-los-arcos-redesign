import type { Transition, Variants } from "motion/react";

/** Long, soft easing used across the site so everything feels like one hand. */
export const organic: Transition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1],
};

export const organicFast: Transition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1],
};

/** Fade + lift. The workhorse reveal. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: organic },
};

/** Editorial mask reveal — the image is wiped open from the bottom edge. */
export const maskIn: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Line-by-line typographic reveal. */
export const lineIn: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Shared viewport config: fire once, a little before the element is centred. */
export const inView = { once: true, margin: "-12% 0px -12% 0px" } as const;
