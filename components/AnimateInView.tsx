"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import React from "react";

export function AnimateInView({
  children,
  delay = 0,
  y = 24,
  once = true,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay } });
    }
  }, [inView, controls, delay]);

  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y }} animate={controls}>
      {children}
    </motion.div>
  );
}
