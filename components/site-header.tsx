"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { business, navigation } from "@/lib/site";
import { Container } from "./ui";

const PIGMENT_DOTS = ["#1b3fd8", "#ff5a3c", "#6d2fd4", "#ffc219"];

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span aria-hidden="true" className="flex shrink-0 items-center -space-x-1">
        {PIGMENT_DOTS.map((hex) => (
          <span
            key={hex}
            className="size-2.5 rounded-full mix-blend-multiply sm:size-3"
            style={{ backgroundColor: hex }}
          />
        ))}
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em] sm:text-lg">
          Bellas Artes Los&nbsp;Arcos
        </span>
        {!compact ? (
          <span className="eyebrow mt-1 text-[0.5625rem] text-ink-muted">
            {business.sinceLabel} · Marbella
          </span>
        ) : null}
      </span>
    </span>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  // The menu is stored as "open for this route" rather than a bare boolean, so
  // navigating anywhere closes it during render — no effect required.
  const [openedFor, setOpenedFor] = useState<string | null>(null);
  const open = openedFor === pathname;
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpenedFor(null);
    toggleRef.current?.focus();
  }, []);

  // Lock scrolling, trap focus and wire up Escape while the panel is open.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled || open
            ? "border-b border-line/70 bg-ivory/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <Container width="wide" className="flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
          <Link
            href="/"
            className="shrink-0 rounded-sm text-ink transition-opacity hover:opacity-70"
            aria-label={`${business.name} — Inicio`}
          >
            <Wordmark />
          </Link>

          <nav aria-label="Navegación principal" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="group relative block rounded-full px-3.5 py-2 text-sm text-ink-soft transition-colors hover:text-ink aria-[current=page]:text-ink"
                    >
                      {item.short}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3.5 -bottom-px h-0.5 origin-left bg-cobalt transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${business.phoneHref}`}
              className="hidden items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper sm:inline-flex"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.5 5.5c0-1.1.9-2 2-2h2.2c.9 0 1.7.6 1.9 1.5l.7 2.6c.2.8-.1 1.6-.8 2l-1.2.8a12 12 0 0 0 5.3 5.3l.8-1.2c.4-.7 1.2-1 2-.8l2.6.7c.9.2 1.5 1 1.5 1.9v2.2c0 1.1-.9 2-2 2h-.5A15.5 15.5 0 0 1 2.5 6V5.5Z"
                />
              </svg>
              {business.phoneDisplay}
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => (open ? close() : setOpenedFor(pathname))}
              aria-expanded={open}
              aria-controls="menu-principal"
              className="inline-flex items-center gap-2.5 rounded-full border border-ink/15 py-2 pr-4 pl-3.5 text-sm font-medium text-ink transition-colors hover:border-ink xl:hidden"
            >
              <span aria-hidden="true" className="relative flex h-3 w-4 flex-col justify-between">
                <span
                  className={`block h-[1.5px] w-full bg-ink transition-transform duration-300 ${
                    open ? "translate-y-[5.25px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full bg-ink transition-opacity duration-200 ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full bg-ink transition-transform duration-300 ${
                    open ? "-translate-y-[5.25px] -rotate-45" : ""
                  }`}
                />
              </span>
              {open ? "Cerrar" : "Menú"}
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-principal"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ivory pt-[4.5rem] lg:pt-20 xl:hidden"
          >
            <Container className="flex min-h-[calc(100dvh-4.5rem)] flex-col justify-between gap-10 py-10">
              <nav aria-label="Navegación principal (móvil)">
                <ul className="flex flex-col">
                  {navigation.map((item, index) => {
                    const active = isActive(item.href);
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.06 + index * 0.045,
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="border-b border-line"
                      >
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className="flex items-baseline justify-between gap-4 py-4"
                        >
                          <span
                            className={`font-display text-[1.75rem] leading-tight tracking-[-0.02em] sm:text-4xl ${
                              active ? "text-cobalt" : "text-ink"
                            }`}
                          >
                            {item.label}
                          </span>
                          <span className="eyebrow shrink-0 text-ink-muted">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.38, duration: 0.5 }}
                className="flex flex-col gap-3 text-sm"
              >
                <a
                  href={`tel:${business.phoneHref}`}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 font-medium text-paper"
                >
                  Llamar · {business.phoneDisplay}
                </a>
                <a href={`mailto:${business.email}`} className="text-ink-soft underline-offset-4 hover:underline">
                  {business.email}
                </a>
                <p className="text-ink-muted">{business.addressLine}</p>
              </motion.div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
