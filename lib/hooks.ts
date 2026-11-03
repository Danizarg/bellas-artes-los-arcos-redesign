"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Media queries are external state, so they are read through
 * `useSyncExternalStore` rather than mirrored into `useState`. That keeps the
 * value correct on the first client render and updates live when the user
 * changes the setting mid-visit.
 *
 * The server snapshot is always `false`: markup is rendered as if the feature
 * were absent, which is the safe default for both hover and reduced motion.
 */
function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** True when the visitor has asked the system to reduce motion. */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * True when the device has a real hovering pointer. Everything cursor-driven
 * checks this first and falls back to an ambient animation on touch.
 */
export function useHasPointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
