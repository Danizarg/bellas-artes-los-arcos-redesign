/**
 * The opening transition. Deliberately CSS-only: it is present in the very
 * first byte of HTML so there is no flash of unstyled content, it lifts
 * itself without JavaScript, and under `prefers-reduced-motion` the global
 * override snaps it straight to its hidden end state.
 */
export default function IntroCurtain() {
  return (
    <div
      aria-hidden="true"
      className="curtain pointer-events-none fixed inset-0 z-100 grid place-items-center bg-ivory"
    >
      <div className="curtain-mark flex flex-col items-center gap-5">
        <span className="flex items-center -space-x-1.5">
          {["#1b3fd8", "#ff5a3c", "#6d2fd4", "#ffc219"].map((hex, index) => (
            <span
              key={hex}
              className="curtain-dot size-4 rounded-full mix-blend-multiply sm:size-5"
              style={{ backgroundColor: hex, animationDelay: `${index * 0.09}s` }}
            />
          ))}
        </span>
        <span className="font-display text-sm font-semibold tracking-[0.3em] text-ink-muted uppercase">
          Desde 1990
        </span>
      </div>
    </div>
  );
}
