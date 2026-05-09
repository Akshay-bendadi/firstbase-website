import Link from "next/link";

import { ArrowRight, Download, GitBranch, SquareTerminal } from "lucide-react";

import { Button } from "../ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden border-b border-white/6">
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/3 h-[640px] w-[640px] rounded-full bg-primary/7 blur-[130px]" />
        <div className="absolute right-1/4 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-accent/5 blur-[110px]" />
        <div className="absolute -bottom-24 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-[hsl(263_82%_67%/0.04)] blur-[90px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-20 lg:pt-12">
        {/* ── Left: Content ── */}
        <div className="flex flex-col justify-center">
          {/* Heading */}
          <h1 className="text-5xl font-extrabold leading-[0.88] tracking-tight sm:text-6xl xl:text-[5.5rem]">
            <span className="block text-foreground/95">Generate the</span>
            <span className="block text-foreground/95">base before the</span>
            <span className="block text-gradient mt-1">product exists.</span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-md text-[0.95rem] leading-8 text-muted-foreground">
            Web interface for{" "}
            <code className="rounded bg-secondary/80 px-1.5 py-0.5 font-mono text-[0.8rem] text-accent/90">
              create-firstbase-app
            </code>
            . Configure your stack, trigger a backend generation job, and receive a clean source
            archive or push directly to GitHub.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/builder">
              <Button className="gap-2 px-7 py-3 text-sm">
                Launch Builder
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a
              href="https://www.npmjs.com/package/create-firstbase-app?activeTab=readme"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border/70 bg-secondary/50 px-6 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-accent/40 hover:bg-secondary hover:text-foreground"
            >
              <SquareTerminal className="h-4 w-4" />
              View CLI
            </a>
          </div>

          {/* Meta */}
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-border/0 to-border/60" />
            <span className="font-mono text-[0.68rem] text-muted-foreground/55">CLI v0.0.7</span>
          </div>
        </div>

        {/* ── Right: Console Mockup ── */}
        <ConsoleMockup />
      </div>
    </section>
  );
}

function ConsoleMockup() {
  const nodes = [
    { step: "01", title: "answers", desc: "framework, language, modules", x: "5%", y: "18%" },
    { step: "02", title: "scaffold", desc: "source tree generated", x: "52%", y: "12%" },
    { step: "03", title: "sanitize", desc: "node_modules removed", x: "14%", y: "53%" },
    { step: "04", title: "export", desc: "zip or repository", x: "55%", y: "60%" },
  ];

  return (
    <div className="relative flex items-center">
      {/* Ambient glow behind panel */}
      <div className="pointer-events-none absolute inset-6 rounded-2xl bg-gradient-to-br from-primary/8 to-accent/6 blur-3xl" />

      {/* Main panel */}
      <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-card/50 shadow-glass backdrop-blur-2xl">
        {/* Grid background */}
        <div className="absolute inset-0 grid-bg opacity-60" />

        {/* Title bar */}
        <div className="relative flex items-center justify-between border-b border-white/8 bg-secondary/30 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-destructive/50" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/50" />
              <span className="h-3 w-3 rounded-full bg-accent/50" />
            </div>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
              generation.console
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="animate-glow-pulse h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono text-[0.65rem] text-accent">LIVE</span>
          </div>
        </div>

        {/* Canvas area */}
        <div className="relative" style={{ height: 560 }}>
          {/* Scan lines */}
          <div
            className="absolute h-px w-[72%] rotate-3 scan-line"
            style={{ left: "8%", top: "28%" }}
          />
          <div
            className="absolute h-px w-[62%] -rotate-3 scan-line-blue"
            style={{ left: "20%", top: "58%" }}
          />
          <div
            className="absolute w-px scan-line-v"
            style={{ left: "47%", top: "12%", height: "52%" }}
          />

          {/* Nodes */}
          {nodes.map((node) => (
            <div
              key={node.step}
              className="absolute w-44 rounded-lg border border-white/10 bg-background/85 p-4 shadow-xl backdrop-blur-sm transition-transform duration-700"
              style={{ left: node.x, top: node.y }}
            >
              <span className="font-mono text-[0.65rem] text-accent">{node.step}</span>
              <p className="mt-3 text-sm font-semibold text-foreground">{node.title}</p>
              <p className="mt-1 text-[0.72rem] leading-5 text-muted-foreground">{node.desc}</p>
            </div>
          ))}

          {/* Corner decoration */}
          <div className="absolute right-4 top-4 h-16 w-16 opacity-20">
            <div className="absolute right-0 top-0 h-4 w-4 border-r border-t border-accent" />
            <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-accent" />
          </div>
        </div>

        {/* Output bar */}
        <div className="relative border-t border-white/8 bg-gradient-to-r from-primary/10 via-card/80 to-accent/8 px-5 py-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-muted-foreground">
                output unlocked
              </p>
              <p className="mt-1.5 text-lg font-bold text-foreground">Clean source artifact</p>
            </div>
            <div className="flex gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-secondary/70 transition-all hover:border-primary/50 hover:shadow-glow-blue">
                <Download className="h-4 w-4 text-primary" />
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-secondary/70 transition-all hover:border-accent/50 hover:shadow-glow-cyan">
                <GitBranch className="h-4 w-4 text-accent" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
