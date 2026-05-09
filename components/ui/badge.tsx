import type { HTMLAttributes } from "react";

import { cn } from "../../lib/utils";

type BadgeProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "secondary" | "outline" | "glow";
};

const variants = {
  default: "border-transparent bg-primary/15 text-primary border-primary/30",
  secondary: "border-transparent bg-secondary text-secondary-foreground",
  outline: "border-border/60 text-muted-foreground bg-transparent",
  glow: "border-accent/40 bg-accent/10 text-accent shadow-neon-sm",
} as const;

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.14em] transition-colors",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
