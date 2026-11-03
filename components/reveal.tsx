"use client";

import { motion, type Variants } from "motion/react";
import Image from "next/image";
import type { ElementType, ReactNode } from "react";
import { inView, lineIn, maskIn, riseIn, stagger } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                       */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  className,
  delay = 0,
  variants = riseIn,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
}) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Parent that cascades its children's reveals. */
export function Stagger({
  children,
  className,
  gap = 0.08,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  as?: "div" | "ul" | "ol" | "section";
}) {
  const Component = motion[as] as ElementType;
  return (
    <Component
      className={className}
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
  variants = riseIn,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "span";
  variants?: Variants;
}) {
  const Component = motion[as] as ElementType;
  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  );
}

/* ------------------------------------------------------------------ */
/* Animated typography                                                 */
/* ------------------------------------------------------------------ */

/**
 * Reveals a heading word by word, each word rising out of its own clipping
 * box. Words stay real text in the DOM, so screen readers and search engines
 * read an ordinary heading.
 */
export function SplitHeading({
  text,
  className,
  as: Tag = "h2",
  gap = 0.045,
  delay = 0,
  accentFrom,
  accentClassName = "text-cobalt",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  gap?: number;
  delay?: number;
  /** Index of the first word to receive the accent colour. */
  accentFrom?: number;
  accentClassName?: string;
}) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <motion.span
        className="block"
        variants={stagger(gap, delay)}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        aria-hidden="true"
      >
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden pb-[0.12em] align-bottom"
          >
            <motion.span
              className={`inline-block ${
                accentFrom !== undefined && index >= accentFrom ? accentClassName : ""
              }`}
              variants={lineIn}
            >
              {word}
            </motion.span>
            {index < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
          </span>
        ))}
      </motion.span>
      {/* The accessible copy of the heading, unaffected by the animation. */}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Editorial image mask                                                */
/* ------------------------------------------------------------------ */

export function MaskedImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  width,
  height,
  fill = true,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  fill?: boolean;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden bg-ivory-deep ${className}`}
      variants={maskIn}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
    >
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imageClassName}`}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width ?? 1200}
          height={height ?? 1500}
          sizes={sizes}
          priority={priority}
          className={`h-auto w-full object-cover ${imageClassName}`}
        />
      )}
    </motion.div>
  );
}
