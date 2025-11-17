import { cn } from "@/lib/cn";
import React from "react";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-[--color-ink] dark:bg-zinc-800",
        className
      )}
      {...props}
    />
  );
}
