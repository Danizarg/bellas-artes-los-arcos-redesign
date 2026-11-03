"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { business } from "@/lib/site";

export default function CopyAddress() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${business.name}, ${business.street}, ${business.postalCode} ${business.city}`,
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard blocked (insecure context or denied permission) — the
      // address is plainly visible next to this button, so there is nothing
      // to recover from.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2.5 rounded-full border border-ink/20 px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
    >
      <span className="relative grid h-4 w-4 place-items-center" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.svg
            key={copied ? "check" : "copy"}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            viewBox="0 0 24 24"
            className="absolute size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            {copied ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
            ) : (
              <>
                <rect x="9" y="9" width="11" height="11" rx="2" />
                <path strokeLinecap="round" d="M15 5.5A1.5 1.5 0 0 0 13.5 4H5.5A1.5 1.5 0 0 0 4 5.5v8A1.5 1.5 0 0 0 5.5 15" />
              </>
            )}
          </motion.svg>
        </AnimatePresence>
      </span>
      {copied ? "Dirección copiada" : "Copiar dirección"}
      <span aria-live="polite" className="sr-only">
        {copied ? "Dirección copiada al portapapeles" : ""}
      </span>
    </button>
  );
}
