const metrics = [
  { label: "frameworks", value: "React + Next.js" },
  { label: "archive", value: "source ZIP" },
  { label: "repository", value: "GitHub push" },
  { label: "runtime", value: "Node 20.19+" },
];

export function TelemetryBar() {
  return (
    <section className="relative border-b border-white/6 bg-secondary/25">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      <div className="mx-auto grid max-w-7xl px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        {metrics.map(({ label, value }, index) => (
          <div
            key={label}
            className="group relative border-b border-white/6 py-7 transition-colors duration-200 hover:bg-primary/4 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0"
          >
            {/* Hover accent line */}
            <div className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-transform duration-300 group-hover:scale-x-100 md:inset-y-0 md:left-auto md:right-0 md:h-auto md:w-px md:bg-none" />

            <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
              {String(index + 1).padStart(2, "0")} · {label}
            </p>
            <p className="mt-2.5 text-xl font-bold text-foreground">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
