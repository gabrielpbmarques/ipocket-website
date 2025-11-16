import * as React from "react";
import { cn } from "@/lib/cn";

export const Label = ({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={cn(
      "mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300 tracking-tight",
      className,
    )}
    {...props}
  />
);

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-11 w-full rounded-xl border border-zinc-200 bg-white/90 px-3 text-[15px] text-zinc-900",
      "placeholder:text-zinc-400",
      "transition-all duration-200",
      "focus:border-[--color-primary-400] focus:ring-2 focus:ring-[--color-primary-400] focus:ring-offset-1",
      "dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-100",
      "dark:focus:ring-[--color-primary-500]",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full rounded-xl border border-zinc-200 bg-white/90 px-3 py-2 text-[15px] text-zinc-900",
      "placeholder:text-zinc-400 transition-all duration-200",
      "focus:border-[--color-primary-400] focus:ring-2 focus:ring-[--color-primary-400] focus:ring-offset-1",
      "dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-100",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Select = ({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    className={cn(
      "h-11 w-full appearance-none rounded-xl border border-zinc-200 bg-white/90 px-3 text-[15px] text-zinc-900",
      "transition-all duration-200 cursor-pointer",
      "focus:border-[--color-primary-400] focus:ring-2 focus:ring-[--color-primary-400] focus:ring-offset-1",
      "dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-100",
      className,
    )}
    {...props}
  >
    {children}
  </select>
);
