"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/cn";

type Testimonial = {
  quote: string;
  author: string;
  role?: string;
};

export function TestimonialsCarousel({
  items,
  className,
}: {
  items: Testimonial[];
  className?: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || paused || prefersReducedMotion) return;
    const id = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(id);
  }, [emblaApi, paused, prefersReducedMotion]);

  if (!items?.length) return null;

  return (
    <section
      className={cn(
        "relative mx-auto max-w-3xl",
        "rounded-3xl bg-gradient-to-b from-zinc-50/70 to-zinc-100/40 p-6 dark:from-zinc-900/60 dark:to-zinc-950/60",
        "border border-zinc-200/60 dark:border-zinc-800/70 shadow-sm",
        className,
      )}
      aria-label="Depoimentos de clientes"
    >
      <div
        className="overflow-hidden"
        ref={emblaRef}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        aria-roledescription="carrossel"
      >
        <div className="-ml-4 flex">
          {items.map((t, idx) => (
            <article
              key={idx}
              className="min-w-0 shrink-0 grow-0 basis-full pl-4"
            >
              <div
                className={cn(
                  "h-full rounded-2xl p-8 card-surface muted-border flex flex-col justify-between",
                )}
              >
                <div>
                  <div className="mb-4 text-4xl leading-none subtle">
                    “
                  </div>
                  <p className="text-lg leading-relaxed text-[var(--color-ink)]">
                    {t.quote}
                  </p>
                </div>

                <div className="mt-6 border-t border-zinc-200/70 pt-4 text-sm dark:border-zinc-800/70">
                  <span className="font-semibold text-[var(--color-ink)]">
                    {t.author}
                  </span>
                  {t.role ? (
                    <span className="ml-1 subtle">
                      — {t.role}
                    </span>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Navegação por setas */}
      <div className="pointer-events-none absolute inset-x-0 top-50 top-1/2 flex -translate-y-1/2 items-center justify-between px-2">
        <button
          type="button"
          onClick={scrollPrev}
          className={cn(
            "pointer-events-auto inline-flex h-9 w-9 items-center justify-center cursor-pointer",
            "rounded-full border border-zinc-200/80 bg-white/80 shadow-sm backdrop-blur-sm",
            "hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:bg-zinc-900",
            "text-sm text-[var(--color-ink)]",
          )}
          aria-label="Depoimento anterior"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={scrollNext}
          className={cn(
            "pointer-events-auto inline-flex h-9 w-9 items-center justify-center cursor-pointer",
            "rounded-full border border-zinc-200/80 bg-white/80 shadow-sm backdrop-blur-sm",
            "hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:bg-zinc-900",
            "text-sm text-[var(--color-ink)]",
          )}
          aria-label="Próximo depoimento"
        >
          ›
        </button>
      </div>

      {/* Dots de paginação */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {items.map((_, index) => {
          const isActive = index === selectedIndex;
          return (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Ir para depoimento ${index + 1}`}
              className={cn(
                "h-2 w-2 rounded-full transition-all cursor-pointer",
                isActive
                  ? "w-5 bg-[var(--color-ink)]"
                  : "bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600",
              )}
            />
          );
        })}
      </div>
    </section>
  );
}
