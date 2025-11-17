import { cn } from "@/lib/cn";

export type Swatch = { key: string; name: string; colorVar: string };

const DEFAULT_SWATCHES: Swatch[] = [
    { key: "preto", name: "Preto", colorVar: "--swatch-preto" },
    { key: "canela", name: "Canela", colorVar: "--swatch-canela" },
    { key: "safira", name: "Safira", colorVar: "--swatch-safira" },
    { key: "limao", name: "Limão", colorVar: "--swatch-limao" },
    { key: "tangerina", name: "Tangerina", colorVar: "--swatch-tangerina" },
    { key: "roxo", name: "Roxo", colorVar: "--swatch-roxo" },
    { key: "rosa", name: "Rosa", colorVar: "--swatch-rosa" },
    { key: "pavao", name: "Pavão", colorVar: "--swatch-pavao" },
];

export function ColorSwatches({
    swatches = DEFAULT_SWATCHES,
    onSelect,
    selected,
    className,
}: {
    swatches?: Swatch[];
    selected?: string;
    onSelect?: (key: string) => void;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "grid grid-cols-4 gap-3 sm:grid-cols-8 sm:gap-4",
                className,
            )}
            role="radiogroup"
            aria-label="Seleção de cor"
        >
            {swatches.map((s) => {
                const active = selected === s.key;
                return (
                    <button
                        key={s.key}
                        type="button"
                        onClick={() => onSelect?.(s.key)}
                        className={cn(
                            "group flex flex-col items-center gap-1.5 cursor-pointer",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-primary-400] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950",
                        )}
                        role="radio"
                        aria-checked={active}
                        aria-label={`Selecionar cor ${s.name}`}
                    >
                        <span
                            className={cn(
                                "dot h-8 w-8 rounded-full border shadow-sm ring-offset-2 transition-all duration-150",
                                "border-black/10 dark:border-white/10",
                                "group-hover:scale-105 group-hover:shadow-md",
                                active &&
                                    "scale-110 ring-2 ring-[--color-primary-500] ring-offset-2 ring-offset-[--color-surface]",
                            )}
                            style={{ backgroundColor: `var(${s.colorVar})` }}
                        />
                        <span
                            className={cn(
                                "text-[11px] leading-tight subtle",
                                active && "font-medium text-[--color-ink]",
                            )}
                        >
                            {s.name}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
