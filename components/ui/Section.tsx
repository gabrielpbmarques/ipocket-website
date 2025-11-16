import { cn } from "@/lib/cn";
import React from "react";

type Props = React.HTMLAttributes<HTMLElement> & {
  id?: string;
  padded?: boolean;
};

export function Section({ className, id, padded = true, ...props }: Props) {
  return (
    <section id={id} className={cn(padded && "section-pad", className)} {...props} />
  );
}
