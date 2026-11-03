"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

type Props = {
  /** Pigment hexes, drawn back to front. */
  colors?: string[];
  /** How strongly the pigment leans toward the pointer (0 = ignore it). */
  pull?: number;
  /** Overall density of the wash. */
  intensity?: number;
  /** Bitmap resolution relative to layout size. Low is the point — it stays soft. */
  resolution?: number;
  className?: string;
};

type Blob = {
  hex: string;
  /** Where this pigment lives. Blobs are spread out so they mix in pairs at
   *  their edges rather than all piling into the middle, which is what turns
   *  subtractive mixing into mud. */
  homeX: number;
  homeY: number;
  /** Lissajous drift parameters, so the composition never repeats exactly. */
  ax: number;
  ay: number;
  fx: number;
  fy: number;
  phase: number;
  radius: number;
  /** Current drawn position, eased toward the target each frame. */
  x: number;
  y: number;
  swell: number;
};

const DEFAULT_COLORS = ["#1b3fd8", "#ff5a3c", "#6d2fd4", "#ffc219", "#1b3fd8", "#ff5a3c"];

/** Lighten toward white so overlaps mix into colour rather than into mud. */
function wash(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

export default function PigmentField({
  colors = DEFAULT_COLORS,
  pull = 0.26,
  intensity = 1,
  resolution = 0.5,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Deterministic layout so server and client agree and the composition is
    // art-directed rather than random noise.
    const blobs: Blob[] = colors.map((hex, i) => {
      // Golden-angle placement keeps the pigments well separated however
      // many colours are passed in.
      const angle = i * 2.399963;
      const spread = 0.12 + 0.26 * Math.sqrt((i + 0.6) / colors.length);
      const homeX = 0.5 + spread * Math.cos(angle);
      const homeY = 0.5 + spread * 0.92 * Math.sin(angle);
      return {
        hex,
        homeX,
        homeY,
        ax: 0.05 + 0.03 * Math.sin(i * 2.1),
        ay: 0.045 + 0.025 * Math.cos(i * 1.7),
        fx: 0.055 + i * 0.015,
        fy: 0.042 + i * 0.018,
        phase: i * 1.37,
        radius: 0.36 + 0.08 * Math.sin(i * 0.9),
        x: homeX,
        y: homeY,
        swell: 0,
      };
    });

    let width = 0;
    let height = 0;
    let bitmapW = 0;
    let bitmapH = 0;

    const measure = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return false;
      // Cap the bitmap so huge monitors don't pay for pixels nobody can see
      // through a soft wash anyway.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      bitmapW = Math.max(2, Math.round(width * resolution * dpr));
      bitmapH = Math.max(2, Math.round(height * resolution * dpr));
      canvas.width = bitmapW;
      canvas.height = bitmapH;
      return true;
    };

    // Pointer target in normalised coords; -1 means "no pointer yet".
    const pointer = { x: 0.5, y: 0.5, active: false };
    const eased = { x: 0.5, y: 0.5 };

    const draw = (timeSeconds: number) => {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#f8f3e9";
      ctx.fillRect(0, 0, bitmapW, bitmapH);

      // Subtractive mixing: this is how real pigment behaves. Cobalt over
      // yellow reads green, coral over violet reads a deep plum.
      ctx.globalCompositeOperation = "multiply";

      const shortSide = Math.min(bitmapW, bitmapH);

      for (const blob of blobs) {
        const driftX =
          blob.homeX + blob.ax * Math.sin(timeSeconds * blob.fx * Math.PI * 2 + blob.phase);
        const driftY =
          blob.homeY + blob.ay * Math.cos(timeSeconds * blob.fy * Math.PI * 2 + blob.phase * 1.3);

        let targetX = driftX;
        let targetY = driftY;
        let targetSwell = 0;

        if (pointer.active && pull > 0) {
          const dx = eased.x - driftX;
          const dy = eased.y - driftY;
          const distance = Math.hypot(dx, dy);
          // Falls off smoothly — only nearby pigment reacts, so the whole
          // field never lurches at once.
          const influence = Math.exp(-(distance * distance) / 0.12);
          targetX = driftX + dx * pull * influence;
          targetY = driftY + dy * pull * influence;
          targetSwell = influence;
        }

        blob.x += (targetX - blob.x) * 0.06;
        blob.y += (targetY - blob.y) * 0.06;
        blob.swell += (targetSwell - blob.swell) * 0.05;

        const cx = blob.x * bitmapW;
        const cy = blob.y * bitmapH;
        const r = blob.radius * shortSide * (1 + blob.swell * 0.18);

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        // Kept light on purpose: two light washes crossing make a clean
        // secondary colour, whereas two saturated ones make brown.
        gradient.addColorStop(0, wash(blob.hex, 0.2));
        gradient.addColorStop(0.5, wash(blob.hex, 0.6));
        // White is the identity colour for multiply, so the wash dissolves
        // into the ivory ground instead of ending on a hard edge.
        gradient.addColorStop(1, "rgb(255, 255, 255)");

        ctx.globalAlpha = Math.min(1, 0.9 * intensity);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    if (!measure()) {
      // Laid out at zero size (hidden tab, for instance) — try again shortly.
      const retry = requestAnimationFrame(() => {
        if (measure()) draw(0);
      });
      return () => cancelAnimationFrame(retry);
    }

    if (reducedMotion) {
      // One still frame. No loop, no listeners, no motion at all.
      draw(6.5);
      const resizeObserver = new ResizeObserver(() => {
        if (measure()) draw(6.5);
      });
      resizeObserver.observe(canvas);
      return () => resizeObserver.disconnect();
    }

    let frame = 0;
    let running = true;
    let visible = true;
    const start = performance.now();

    const loop = (now: number) => {
      if (!running) return;
      if (visible && !document.hidden) {
        eased.x += (pointer.x - eased.x) * 0.08;
        eased.y += (pointer.y - eased.y) * 0.08;
        draw((now - start) / 1000);
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    // One listener on window covers mouse, pen and finger drags alike; touch
    // devices simply have no pointer until the user actually drags.
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointercancel", onPointerLeave, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave, { passive: true });

    // Stop painting entirely when the field is scrolled away.
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "120px" },
    );
    intersectionObserver.observe(canvas);

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });
    resizeObserver.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointercancel", onPointerLeave);
      document.removeEventListener("pointerleave", onPointerLeave);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [colors, pull, intensity, resolution, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`h-full w-full ${className}`}
    />
  );
}
