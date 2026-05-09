import { Braces, Cpu, Layers3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const stackGroups: Array<{
  title: string;
  icon: LucideIcon;
  color: string;
  items: string[];
}> = [
  {
    title: "Application",
    icon: Layers3,
    color: "text-primary",
    items: [
      "React + Vite",
      "Next.js App Router",
      "Next.js Pages Router",
      "TypeScript",
      "JavaScript",
    ],
  },
  {
    title: "Foundation",
    icon: Braces,
    color: "text-accent",
    items: [
      "Tailwind CSS",
      "shadcn-ready primitives",
      "Axios API client",
      "env templates",
      "production docs",
    ],
  },
  {
    title: "Advanced",
    icon: Cpu,
    color: "text-[hsl(263_82%_67%)]",
    items: ["React Query", "Auth scaffold", "Forms + Zod", "Sonner toasts", "i18n", "SEO", "Vitest"],
  },
];

export function StackSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-8">
        {/* Left */}
        <div className="flex flex-col justify-center">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
            payload surface
          </p>
          <h2 className="mt-5 text-4xl font-extrabold leading-[0.9] tracking-tight sm:text-5xl">
            Everything Firstbase can wire belongs in the{" "}
            <span className="text-gradient">visual graph.</span>
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
            Every toggle in the builder maps directly to a CLI flag. No hidden setup, no manual
            configuration — the complete stack, assembled automatically.
          </p>
        </div>

        {/* Right: Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          {stackGroups.map((group) => (
            <article
              key={group.title}
              className="group relative overflow-hidden rounded-xl border border-white/8 bg-card/50 p-5 transition-all duration-300 hover:border-white/15 hover:bg-card/80 hover:shadow-glass"
            >
              {/* Top accent line */}
              <div
                className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${
                  group.title === "Application"
                    ? "via-primary/60"
                    : group.title === "Foundation"
                      ? "via-accent/60"
                      : "via-[hsl(263_82%_67%/0.6)]"
                } to-transparent`}
              />

              {/* Icon */}
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-secondary/60 ${group.color}`}
              >
                <group.icon className="h-4 w-4" aria-hidden="true" />
              </div>

              <h3 className="mt-5 text-base font-bold text-foreground">{group.title}</h3>

              {/* Items */}
              <div className="mt-4 grid gap-1.5">
                {group.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-md border border-white/6 bg-background/50 px-3 py-2 text-xs text-muted-foreground transition-colors duration-150 group-hover:border-white/10"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
