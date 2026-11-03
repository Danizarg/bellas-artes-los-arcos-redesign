/**
 * A slow editorial band. CSS-only, duplicated once so the loop is seamless,
 * and hidden from assistive tech because it is decoration — the same words
 * appear as real content elsewhere on the page.
 */
export default function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`group relative flex overflow-hidden border-y border-line py-5 select-none ${className}`}
    >
      <div className="animate-marquee-x flex w-max shrink-0 items-center group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {items.map((item, index) => (
              <span key={`${copy}-${item}-${index}`} className="flex items-center">
                <span className="px-6 font-display text-[clamp(1.1rem,2.3vw,1.9rem)] tracking-[-0.02em] whitespace-nowrap text-ink-soft sm:px-9">
                  {item}
                </span>
                <span
                  className="size-1.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: ["#1b3fd8", "#ff5a3c", "#6d2fd4", "#ffc219"][index % 4],
                  }}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
