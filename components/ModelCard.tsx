"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

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
        "relative flex flex-col gap-5 rounded-3xl border border-zinc-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-sm",
        "dark:border-zinc-800/80 dark:bg-zinc-950/80",
        compact && "p-4 gap-4",
      )}
    >
      {/* Header: título + preço */}
      <header className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-xl">
            {title}
          </h3>
          <span
            className={cn(
              "inline-flex items-center rounded-full border border-zinc-200/80 bg-zinc-50/80 px-3 py-1 text-xs font-medium text-zinc-700",
              "dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:text-zinc-200",
            )}
          >
            {priceLabel}
          </span>
        </div>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
          {description}
        </p>
      </header>

      {/* Área visual principal: exibe mock ou cor selecionada */}
      <div
        className={cn(
          "mt-1 overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-50/80 aspect-[4/3] relative",
          "dark:border-zinc-800/80 dark:bg-zinc-950/80",
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={displayImageSrc}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.995 }}
            transition={{ duration: 0.45, ease: [0.25, 0.8, 0.25, 1] }}
            className="absolute inset-0"
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
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Swatches de cor */}
      <section className="mt-4">
        <p className="mb-3 text-sm font-medium text-zinc-800 dark:text-zinc-200">
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
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-primary-400] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950",
                )}
              >
                <span
                  className={cn(
                    "h-8 w-8 rounded-full border border-black/10 shadow-sm transition-all dark:border-white/10",
                    "group-hover:scale-105 group-hover:shadow-md",
                    active &&
                      "scale-110 ring-2 ring-[--color-primary-600] ring-offset-2 ring-offset-white dark:ring-offset-zinc-950",
                  )}
                  style={{ backgroundColor: `var(${s.var})` }}
                />
                <span
                  className={cn(
                    "mt-1 text-xs text-zinc-600 dark:text-zinc-300",
                    active && "font-medium text-zinc-900 dark:text-zinc-50",
                  )}
                >
                  {s.name}
                </span>
              </button>
            );
          })}
        </div>

        {selectedSwatch && (
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            Cor selecionada:{" "}
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {selectedSwatch.name}
            </span>
          </p>
        )}
      </section>
    </Card>
  );
}
