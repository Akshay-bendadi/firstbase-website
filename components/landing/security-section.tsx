import { LockKeyhole, ShieldCheck } from "lucide-react";

const signals = [
  { icon: ShieldCheck, label: "Validated project names", desc: "Sanitized before filesystem ops" },
  { icon: LockKeyhole, label: "Token only for push", desc: "Never stored or logged" },
];

export function SecuritySection() {
  return (
    <section className="border-t border-white/6">
      <div className="mx-auto grid max-w-7xl gap-0 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
        {signals.map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            className="group flex items-center gap-4 border-b border-white/6 py-6 transition-colors duration-200 hover:bg-primary/3 md:border-b-0 md:border-r md:px-8 md:py-8 md:first:pl-0 md:last:border-r-0"
          >
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/8 transition-all duration-200 group-hover:border-accent/40 group-hover:shadow-neon-sm">
              <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground/90">{label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
