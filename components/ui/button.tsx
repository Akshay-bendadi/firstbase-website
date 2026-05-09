import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import { cn } from "../../lib/utils";

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: "default" | "secondary" | "outline" | "ghost";
};

const variants = {
  default:
    "bg-primary text-primary-foreground shadow-glow-blue hover:shadow-glow-blue hover:brightness-110 active:brightness-95",
  secondary:
    "bg-secondary text-secondary-foreground border border-border/60 hover:border-primary/40 hover:bg-muted",
  outline:
    "border border-border bg-transparent text-foreground hover:border-accent/60 hover:text-accent hover:shadow-neon-sm",
  ghost: "bg-transparent text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
} as const;

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-40",
        variants[variant],
        className,
      )}
      {...props}
    >
      {props.children}
    </button>
  );
}
