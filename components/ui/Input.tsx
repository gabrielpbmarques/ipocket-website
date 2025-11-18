import * as React from "react";
import { cn } from "@/lib/cn";

export const Label = ({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={cn(
      "mb-1 block text-sm font-medium tracking-tight",
      "text-[var(--color-ink)]", // usa token para contrastar em claro/escuro
      className,
    )}
    {...props}
  />
);

// base igual pro input / textarea / select
const baseFieldClasses =
  // altura próxima do Stripe (48px) e largura total
  "h-16 w-full rounded-xl border px-3 text-[15px] shadow-sm " +
  // fundo branco, independente do tema, pra ficar igual aos campos do Stripe
  "border-zinc-300 bg-white text-zinc-900 " +
  "placeholder:text-zinc-500 " +
  // foco com borda preta igual vibe do Stripe flat
  "transition-all duration-200 " +
  "focus:border-black focus:outline-none " +
  "focus:ring-2 focus:ring-black focus:ring-offset-1 focus:ring-offset-zinc-950";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(baseFieldClasses, className)}
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
      baseFieldClasses,
      "h-auto min-h-[96px] py-2", // textarea mais alto
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
      baseFieldClasses,
      "appearance-none cursor-pointer", // look mais “select” padrão
      className,
    )}
    {...props}
  >
    {children}
  </select>
);
