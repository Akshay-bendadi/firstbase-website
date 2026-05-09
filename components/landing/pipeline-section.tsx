import { Download, PackageCheck, Radar, Route } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const pipeline: Array<{ icon: LucideIcon; label: string; text: string }> = [
  { icon: Route, label: "Configure", text: "Choose the same project options the CLI asks for." },
  { icon: Radar, label: "Build", text: "A backend job assembles the selected source tree." },
  {
    icon: PackageCheck,
    label: "Prepare",
    text: "The export is cleaned before it reaches the user.",
  },
  { icon: Download, label: "Ship", text: "Send the project as a ZIP or a GitHub repository." },
];

export function PipelineSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/6">
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 via-background to-secondary/40" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-24 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10 lg:px-8">
        {/* Left */}
        <div className="flex flex-col justify-center">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
            server export engine
          </p>
          <h2 className="mt-5 text-4xl font-extrabold leading-[0.9] tracking-tight sm:text-5xl">
            The website does the{" "}
            <span className="text-gradient">terminal work</span> for you.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
            Firstbase Web takes the same decisions as the CLI, runs the project assembly on the
            server, removes dependency weight, and gives the user a clean project artifact — no
            terminal required.
          </p>
        </div>

        {/* Right: Pipeline steps */}
        <div className="relative overflow-hidden rounded-xl border border-white/8 bg-card/40 backdrop-blur-sm">
          <div className="absolute inset-0 grid-bg-sm opacity-40" />
          <div className="relative grid divide-y divide-white/6">
            {pipeline.map((item, index) => (
              <article
                key={item.label}
                className="group grid grid-cols-[3.5rem_1fr_3rem] items-center gap-4 px-6 py-6 transition-colors duration-200 hover:bg-primary/4"
              >
                {/* Number */}
                <div className="font-mono text-2xl font-bold text-muted-foreground/30 transition-colors duration-200 group-hover:text-primary/40">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-base font-bold text-foreground">{item.label}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.text}</p>
                </div>

                {/* Icon */}
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/8 bg-secondary/60 transition-all duration-200 group-hover:border-accent/40 group-hover:shadow-neon-sm">
                  <item.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
