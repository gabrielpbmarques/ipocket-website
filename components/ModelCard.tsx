"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { blurDataURL } from "@/lib/blur";

export type ModelSwatch = {
  key: string;
  name: string;
  var: string; // CSS variable name
};

interface ModelCardProps {
  title: string;
  description: string;
  priceLabel: string;
  imageSrc: string;
  imageAlt: string;
  swatches: ModelSwatch[];
  compact?: boolean;
}

export function ModelCard({
  title,
  description,
  priceLabel,
  imageSrc,
  imageAlt,
  swatches,
  compact = false,
}: ModelCardProps) {
  const [selected, setSelected] = React.useState<string | null>(
    swatches[0]?.key || null,
  );

  const selectedSwatch = swatches.find((s) => s.key === selected);
  const displayImageSrc = selected ? `/assets/colors/${selected}.png` : imageSrc;

  return (
    <Card
      className={cn(
        "relative flex flex-col gap-5 rounded-3xl p-6",
        compact && "p-4 gap-4",
      )}
    >
      {/* Header: título + preço */}
      <header className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-lg font-semibold tracking-tight text-[var(--color-ink)] sm:text-xl">
            {title}
          </h3>
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
              // Claro: fundo claro translúcido; Escuro: fundo escuro translúcido
              "border-zinc-200/80 bg-white/80 text-[var(--color-ink)]",
              "dark:border-zinc-800/80 dark:bg-zinc-900/80",
            )}
          >
            {priceLabel}
          </span>
        </div>
        <p className="mt-1 text-sm subtle">
          {description}
        </p>
      </header>

      {/* Área visual principal: exibe mock ou cor selecionada */}
      <div
        className={cn(
          "mt-1 overflow-hidden rounded-2xl aspect-[4/3] relative bg-[var(--color-surface)] muted-border",
        )}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={displayImageSrc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
            style={{ willChange: "opacity" }}
          >
            <Image
              src={displayImageSrc}
              alt={selectedSwatch ? `Amostra ampliada da cor ${selectedSwatch.name} - ${title}` : imageAlt}
              fill
              sizes="(min-width: 768px) 400px, 100vw"
              className={cn(
                "object-cover",
              )}
              priority={false}
              placeholder="blur"
              blurDataURL={blurDataURL(400, 300)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Swatches de cor */}
      <section className="mt-4">
        <p className="mb-3 text-sm font-medium text-[var(--color-ink)]">
          Cores disponíveis
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {swatches.map((s) => {
            const active = selected === s.key;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => setSelected(s.key)}
                aria-pressed={active}
                aria-label={`Selecionar cor ${s.name}`}
                className={cn(
                  "group relative flex flex-col items-center cursor-pointer",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950",
                )}
              >
                <span
                  className={cn(
                    "h-8 w-8 rounded-full border border-black/10 shadow-sm transition-all dark:border-white/10",
                    "group-hover:scale-105 group-hover:shadow-md",
                    active &&
                      "scale-110 ring-2 ring-[var(--color-primary-600)] ring-offset-2 ring-offset-white dark:ring-offset-zinc-950",
                  )}
                  style={{ backgroundColor: `var(${s.var})` }}
                />
                <span
                  className={cn(
                    "mt-1 text-xs subtle",
                    active && "font-medium text-[var(--color-ink)]",
                  )}
                >
                  {s.name}
                </span>
              </button>
            );
          })}
        </div>

        {selectedSwatch && (
          <p className="mt-3 text-xs subtle">
            Cor selecionada:{" "}
            <span className="font-medium text-[var(--color-ink)]">
              {selectedSwatch.name}
            </span>
          </p>
        )}
      </section>
    </Card>
  );
}
