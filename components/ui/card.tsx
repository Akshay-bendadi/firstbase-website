import type { HTMLAttributes } from "react";

import { cn } from "../../lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/8 bg-card/50 p-6 shadow-glass backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      {props.children}
    </div>
  );
}
