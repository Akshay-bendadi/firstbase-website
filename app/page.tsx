import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { ThemeToggle } from "../components/theme-toggle";


const metrics = [
  {
    "label": "Setup time",
    "value": "< 1 min"
  },
  {
    "label": "Starter pages",
    "value": "Structured"
  },
  {
    "label": "Theme mode",
    "value": "Dark / Light"
  }
];
const features = [
  "Tailwind tokens and CSS variables are pre-wired.",
  "Starter pages include real utility classes so the build has content to scan.",
  "Optional shadcn components are generated with a ready-to-use alias setup."
];
const sectionNotes = [
  {
    "label": "Design system",
    "text": "Theme tokens, scale, and spacing are already mapped."
  },
  {
    "label": "Frontend flow",
    "text": "Layouts, API client, and guardrails ship together."
  },
  {
    "label": "Advanced modules",
    "text": "Auth, forms, toasts, React Query, and tests are opt-in."
  }
];
const frontendSkills = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "shadcn/ui",
  "React Query",
  "Husky",
  "Vitest",
  "Zod"
];

export default function Page() {

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground lg:h-screen lg:overflow-hidden">
      
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 pt-6 lg:px-8">
        <Badge variant="outline" className="gap-3 bg-background/75 px-4 py-2 shadow-sm backdrop-blur">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          Firstbase
        </Badge>
        <div className="flex items-center gap-3">
          
          <ThemeToggle />
        </div>
      </header>

      <section className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 py-12 lg:h-[calc(100vh-88px)] lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:px-8 lg:py-8">
        <div className="space-y-8 lg:sticky lg:top-8 lg:self-start lg:pr-4">
          <div className="space-y-6">
            <Badge variant="outline" className="gap-2 border-transparent bg-transparent px-0 text-muted-foreground">
                <span className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
                System first
              </Badge>
            <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.05em] sm:text-6xl lg:text-[4.75rem]">
              A disciplined frontend foundation.
            </h1>
            <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
              Firstbase composes Tailwind tokens, layout structure, optional shadcn wiring, env files, and commit hooks into one calm starting point.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button>Launch project</Button>
          </div>
          <div className="rounded-[1.75rem] border border-border bg-background/70 p-4 shadow-sm backdrop-blur">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-muted-foreground">
              Grid note
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              The composition stays flat, measured, and contrast-led so the page reads like a designed system rather than a demo of components.
            </p>
          </div>
          <div className="grid gap-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-muted-foreground">
              Frontend stack
            </p>
            <div className="flex flex-wrap gap-2">
              {frontendSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border bg-background/75 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-[1.75rem] border border-border bg-background/75 p-4 shadow-sm backdrop-blur">
                <p className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">{metric.label}</p>
                <p className="mt-3 font-mono text-2xl font-semibold tracking-[-0.03em]">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:pr-2">
          <div className="rounded-[2rem] border border-border bg-background/70 p-5 shadow-sm backdrop-blur">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-muted-foreground">
              Included
            </p>
            <p className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.04em]">
              Theme tokens, component wiring, env handling, and commit hooks arrive before you write app logic.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
              The left rail stays fixed. The right rail carries the feature story, optional modules, and generated UI sections in a restrained grid.
            </p>
          </div>

          <Separator className="opacity-70" />
          <div className="grid gap-3 sm:grid-cols-3">
            {sectionNotes.map((section) => (
              <div key={section.label} className="rounded-[1.5rem] border border-border bg-background/80 p-4 shadow-sm backdrop-blur">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-muted-foreground">
                  {section.label}
                </p>
                <p className="mt-3 text-sm leading-7 text-foreground">
                  {section.text}
                </p>
              </div>
            ))}
          </div>

          <Card className="grid gap-3 border-white/10 bg-background/80 shadow-xl">
              <p className="text-sm font-medium text-muted-foreground">Production foundation</p>
              <p className="text-lg font-semibold">Theme toggle, motion, shadcn-ready wiring, env files, and first commit setup are included.</p>
            </Card>
          
          <div id="features" className="grid gap-4">
            <div className="space-y-1 px-1">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-muted-foreground">
                What ships
              </p>
              <p className="max-w-xl text-sm leading-7 text-muted-foreground">
                The default build is opinionated: typography, motion, theming, and reusable UI are already in place.
              </p>
            </div>
            {features.map((feature, index) => (
              <div key={feature} className="group rounded-[1.75rem] border border-border bg-background/80 p-4 shadow-sm transition hover:border-primary/40">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-border bg-muted font-mono text-sm font-semibold text-muted-foreground transition group-hover:bg-primary group-hover:text-primary-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="space-y-1">
                    <p className="text-base font-semibold leading-7 tracking-[-0.02em]">{feature}</p>
                    <p className="text-sm leading-6 text-muted-foreground">
                      Built into the scaffold so the starter stays production-oriented from the first commit.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
