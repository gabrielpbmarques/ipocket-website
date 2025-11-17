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
      "h-11 w-full rounded-xl px-3 text-[15px] transition-all duration-200",
      "muted-border bg-[--color-surface] text-[--color-ink]",
      "placeholder:text-zinc-400",
      "focus:border-[--color-primary-400] focus:ring-2 focus:ring-[--color-primary-400] focus:ring-offset-1",
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
      "w-full rounded-xl px-3 py-2 text-[15px] transition-all duration-200",
      "muted-border bg-[--color-surface] text-[--color-ink]",
      "placeholder:text-zinc-400",
      "focus:border-[--color-primary-400] focus:ring-2 focus:ring-[--color-primary-400] focus:ring-offset-1",
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
      "h-11 w-full appearance-none rounded-xl px-3 text-[15px] transition-all duration-200 cursor-pointer",
      "muted-border bg-[--color-surface] text-[--color-ink]",
      "focus:border-[--color-primary-400] focus:ring-2 focus:ring-[--color-primary-400] focus:ring-offset-1",
      className,
    )}
    {...props}
  >
    {children}
  </select>
);
