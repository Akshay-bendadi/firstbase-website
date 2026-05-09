import { Coffee } from "lucide-react";

export function SupportSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-card/80 via-secondary/50 to-card/80 p-8 shadow-glass transition-all duration-500 hover:border-white/14 sm:p-12 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
        {/* Background glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/6 blur-3xl transition-all duration-500 group-hover:bg-accent/10" />
        <div className="pointer-events-none absolute -bottom-16 left-1/4 h-48 w-48 rounded-full bg-primary/5 blur-3xl transition-all duration-500 group-hover:bg-primary/8" />

        {/* Accent lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/30 bg-accent/10">
              <Coffee className="h-5 w-5 text-accent" aria-hidden="true" />
            </div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
              support
            </p>
          </div>
          <h2 className="mt-5 text-4xl font-extrabold leading-none tracking-tight">
            Fuel <span className="text-gradient">Firstbase</span> development.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            Firstbase is a free, open-source tool. If it saves you setup time, consider buying the
            creator a coffee — it keeps the project alive and improving.
          </p>
        </div>

        <div className="relative mt-8 lg:mt-0">
          <a
            href="https://www.buymeacoffee.com/akshaybendadi"
            className="group/btn inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl border border-accent/40 bg-accent/10 px-8 text-sm font-semibold text-accent transition-all duration-200 hover:border-accent/70 hover:bg-accent/20 hover:shadow-glow-cyan"
          >
            <Coffee className="h-4 w-4 transition-transform duration-200 group-hover/btn:rotate-12" />
            Buy me a coffee
          </a>
        </div>
      </div>
    </section>
  );
}
