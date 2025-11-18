"use client";
import React from "react";
import { cn } from "@/lib/cn";

interface ModalProps {
  open: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export function Modal({ open, title, children, onClose, className }: ModalProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (open && ref.current) {
      ref.current.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={ref}
        tabIndex={-1}
        className={cn(
          "relative w-full max-w-md rounded-2xl card-surface muted-border shadow-lg p-6 grid gap-4 focus:outline-none",
          className
        )}
      >
        {title && (
          <h2 className="text-lg font-medium tracking-tight">{title}</h2>
        )}
        <div className="text-sm leading-relaxed">{children}</div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-[--color-base] hover:bg-[--color-base-hover] transition-colors border border-[--color-border-subtle]"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
