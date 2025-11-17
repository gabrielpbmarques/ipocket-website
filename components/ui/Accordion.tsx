"use client";
import * as React from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export function Accordion({ className, ...props }: RadixAccordion.AccordionSingleProps) {
  return <RadixAccordion.Root className={cn("w-full", className)} {...props} />;
}

export function AccordionItem({ className, ...props }: RadixAccordion.AccordionItemProps) {
  return (
    <RadixAccordion.Item
      className={cn("rounded-[var(--radius-md)] muted-border", className)}
      {...props}
    />
  );
}

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>
>(({ className, children, ...props }, ref) => (
  <RadixAccordion.Header className="flex">
    <RadixAccordion.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between gap-4 rounded-[var(--radius-md)] px-4 py-3 text-left text-base font-medium cursor-pointer",
        "bg-[--color-surface] text-[--color-ink] hover:bg-[--color-muted]",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-5 w-5 shrink-0 transition-transform data-[state=open]:rotate-180" />
    </RadixAccordion.Trigger>
  </RadixAccordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Content>
>(({ className, children, ...props }, ref) => (
  <RadixAccordion.Content
    ref={ref}
    className={cn("overflow-hidden border-t muted-border", className)}
    {...props}
  >
    <div className="px-4 py-4 subtle">{children}</div>
  </RadixAccordion.Content>
));
AccordionContent.displayName = "AccordionContent";
