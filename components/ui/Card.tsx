import { cn } from "@/lib/cn";
import React from "react";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("card-surface muted-border h-full flex flex-col", className)} {...props} />;
}
