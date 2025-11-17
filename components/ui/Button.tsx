"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-md)] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-primary-600)] text-white hover:bg-[var(--color-primary-700)] focus-visible:ring-[var(--color-primary-400)]",
        outline:
          "muted-border bg-[--color-surface] text-[--color-ink] hover:bg-[--color-muted]",
        ghost:
          "text-[--color-ink] hover:bg-[--color-muted]",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  }
);
Button.displayName = "Button";
