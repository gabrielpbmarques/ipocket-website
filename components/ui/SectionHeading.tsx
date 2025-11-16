import { cn } from "@/lib/cn";
import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export function SectionHeading({ title, subtitle, align = "center", className }: Props) {
  return (
    <div className={cn("mb-8", align === "center" ? "text-center" : "text-left", className)}>
      <h2 className="heading-section">{title}</h2>
      {subtitle && <p className="mt-4 text-lg subtle">{subtitle}</p>}
    </div>
  );
}
