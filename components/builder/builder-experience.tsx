"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import {
  AlertCircle,
  Check,
  Clipboard,
  Download,
  GitBranch,
  Loader2,
  LockKeyhole,
  Network,
  PackageCheck,
  Rocket,
  Sparkles,
  SquareTerminal,
} from "lucide-react";

import type { FirstbaseAnswers, PublicGenerationJob } from "../../lib/generator/types";
import { validateProjectName } from "../../lib/generator/validation";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type AdvancedKey = "reactQuery" | "auth" | "forms" | "toasts" | "i18n" | "seo" | "tests";

const advancedOptions: Array<{ key: AdvancedKey; label: string; detail: string }> = [
  { key: "reactQuery", label: "React Query", detail: "Server state cache" },
  { key: "auth", label: "Auth", detail: "Scaffold auth files" },
  { key: "forms", label: "Forms", detail: "React Hook Form + Zod" },
  { key: "toasts", label: "Toasts", detail: "Sonner setup" },
  { key: "i18n", label: "i18n", detail: "Language-ready shape" },
  { key: "seo", label: "SEO", detail: "Next metadata helpers" },
  { key: "tests", label: "Tests", detail: "Vitest baseline" },
];

const jobSteps = [
  { status: "queued", label: "Queued" },
  { status: "validating", label: "Validate" },
  { status: "scaffolding", label: "Scaffold" },
  { status: "cleaning", label: "Clean" },
  { status: "zipping", label: "ZIP" },
  { status: "ready", label: "Ready" },
] as const;

function ChoiceButton({
  active,
  children,
  disabled,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "min-h-10 rounded-lg border border-white/10 bg-secondary/40 px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35",
        active &&
          "border-primary/60 bg-primary/12 text-primary shadow-glow-blue hover:border-primary/70 hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}

function currentStepIndex(job?: PublicGenerationJob): number {
  if (!job || job.status === "failed") return 0;
  const index = jobSteps.findIndex((s) => s.status === job.status);
  return index === -1 ? 0 : index;
}

export function BuilderExperience() {
  const [projectName, setProjectName] = useState("firstbase-starter");
  const [framework, setFramework] = useState<FirstbaseAnswers["framework"]>("next");
  const [language, setLanguage] = useState<FirstbaseAnswers["language"]>("ts");
  const [routing, setRouting] = useState<FirstbaseAnswers["routing"]>("app");
  const [uiLibrary, setUiLibrary] = useState<FirstbaseAnswers["uiLibrary"]>("shadcn");
  const [setupHusky, setSetupHusky] = useState(true);
  const [advancedMode, setAdvancedMode] = useState<FirstbaseAnswers["advancedMode"]>("go_advanced");
  const [advanced, setAdvanced] = useState<Record<AdvancedKey, boolean>>({
    reactQuery: true,
    auth: true,
    forms: true,
    toasts: true,
    i18n: false,
    seo: true,
    tests: true,
  });
  const [job, setJob] = useState<PublicGenerationJob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [githubToken, setGithubToken] = useState("");
  const [githubPrivate, setGithubPrivate] = useState(false);
  const [pushing, setPushing] = useState(false);

  const nameStatus = validateProjectName(projectName);
  const validName = nameStatus === true;
  const activeAdvanced = advancedMode === "go_advanced";

  const answers = useMemo<FirstbaseAnswers>(
    () => ({
      projectName: projectName.trim() || "my-app",
      framework,
      routing: framework === "next" ? routing : "app",
      language,
      uiLibrary,
      setupHusky,
      advancedMode,
      reactQuery: activeAdvanced && advanced.reactQuery,
      auth: activeAdvanced && advanced.auth,
      forms: activeAdvanced && advanced.forms,
      toasts: activeAdvanced && advanced.toasts,
      i18n: activeAdvanced && advanced.i18n,
      seo: activeAdvanced && framework === "next" && advanced.seo,
      tests: activeAdvanced && advanced.tests,
    }),
    [
      activeAdvanced,
      advanced,
      advancedMode,
      framework,
      language,
      projectName,
      routing,
      setupHusky,
      uiLibrary,
    ],
  );

  const receipt = JSON.stringify(answers, null, 2);
  const stepIndex = currentStepIndex(job ?? undefined);
  const generating = Boolean(job && !["ready", "failed"].includes(job.status));
  const enabledModules = advancedOptions.filter((o) => answers[o.key]).map((o) => o.label);

  const mapNodes = [
    { label: "Name", text: answers.projectName, x: "5%", y: "10%", complete: validName },
    {
      label: "Stack",
      text: answers.framework === "next" ? "Next.js" : "React + Vite",
      x: "38%",
      y: "4%",
      complete: true,
    },
    {
      label: "Language",
      text: answers.language === "ts" ? "TypeScript" : "JavaScript",
      x: "68%",
      y: "13%",
      complete: true,
    },
    {
      label: "Modules",
      text: enabledModules.length ? `${enabledModules.length} selected` : "Skipped",
      x: "12%",
      y: "52%",
      complete: true,
    },
    {
      label: "Server job",
      text: job?.status ?? "idle",
      x: "45%",
      y: "44%",
      complete: job?.status === "ready",
      active: generating,
    },
    {
      label: "Exports",
      text: job?.status === "ready" ? "ZIP unlocked" : "Waiting",
      x: "68%",
      y: "65%",
      complete: job?.status === "ready",
    },
  ];

  useEffect(() => {
    if (!job || job.status === "ready" || job.status === "failed") return;

    const timer = window.setInterval(() => {
      fetch(`/api/generate/${job.id}`)
        .then((r) => r.json())
        .then((next: PublicGenerationJob) => setJob(next))
        .catch(() => setError("Could not refresh generation status."));
    }, 850);

    return () => window.clearInterval(timer);
  }, [job]);

  async function copyReceipt() {
    await navigator.clipboard.writeText(receipt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  async function generate() {
    if (!validName || generating) return;
    setError(null);
    setJob(null);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Unable to start generation.");
      return;
    }
    setJob(data as PublicGenerationJob);
  }

  async function pushToGithub() {
    if (!job || job.status !== "ready" || !githubToken.trim()) {
      setError("Generate the project and provide a GitHub token first.");
      return;
    }

    setPushing(true);
    setError(null);

    const response = await fetch(`/api/generate/${job.id}/github`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: githubToken,
        private: githubPrivate,
      }),
    });
    const data = await response.json();
    setPushing(false);

    if (!response.ok) {
      setError(data.error || data.error?.message || "GitHub push failed.");
      return;
    }
    setJob(data as PublicGenerationJob);
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
      {/* ── LEFT PANEL: Form ── */}
      <div className="flex flex-col gap-5">
        <div className="rounded-xl border border-white/8 bg-card/50 p-6 shadow-glass backdrop-blur-sm">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Open the project graph, <span className="text-gradient">then generate the source.</span>
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Maps directly to Firstbase CLI answers. Validates project name, starts a backend
            generation job, and exposes ZIP plus GitHub outputs.
          </p>

          <div className="mt-7 grid gap-5">
            {/* Project name */}
            <div className="grid gap-2">
              <Label
                htmlFor="projectName"
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
              >
                Project Name
              </Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className={cn(
                  "font-mono",
                  !validName &&
                    "border-destructive/60 focus-visible:border-destructive focus-visible:ring-destructive/25",
                )}
              />
              <p
                className={cn(
                  "min-h-4 text-xs",
                  validName ? "text-muted-foreground/60" : "text-destructive/80",
                )}
              >
                {validName ? "Used for folder, ZIP, and repository name." : String(nameStatus)}
              </p>
            </div>

            {/* Framework */}
            <div className="grid gap-2">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Framework
              </p>
              <div className="grid grid-cols-2 gap-2">
                <ChoiceButton active={framework === "next"} onClick={() => setFramework("next")}>
                  Next.js
                </ChoiceButton>
                <ChoiceButton active={framework === "react"} onClick={() => setFramework("react")}>
                  React + Vite
                </ChoiceButton>
              </div>
            </div>

            {/* Language + Routing */}
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="grid gap-2">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Language
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <ChoiceButton active={language === "ts"} onClick={() => setLanguage("ts")}>
                    TypeScript
                  </ChoiceButton>
                  <ChoiceButton active={language === "js"} onClick={() => setLanguage("js")}>
                    JavaScript
                  </ChoiceButton>
                </div>
              </div>
              <div className="grid gap-2">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Router
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <ChoiceButton
                    active={framework === "next" && routing === "app"}
                    disabled={framework !== "next"}
                    onClick={() => setRouting("app")}
                  >
                    App
                  </ChoiceButton>
                  <ChoiceButton
                    active={framework === "next" && routing === "pages"}
                    disabled={framework !== "next"}
                    onClick={() => setRouting("pages")}
                  >
                    Pages
                  </ChoiceButton>
                </div>
              </div>
            </div>

            {/* UI Kit + Husky */}
            <div className="grid gap-2">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Tooling
              </p>
              <div className="grid grid-cols-3 gap-2">
                <ChoiceButton
                  active={uiLibrary === "shadcn"}
                  onClick={() => setUiLibrary("shadcn")}
                >
                  shadcn/ui
                </ChoiceButton>
                <ChoiceButton active={uiLibrary === "none"} onClick={() => setUiLibrary("none")}>
                  No UI kit
                </ChoiceButton>
                <ChoiceButton active={setupHusky} onClick={() => setSetupHusky((v) => !v)}>
                  Husky {setupHusky ? "on" : "off"}
                </ChoiceButton>
              </div>
            </div>

            {/* Advanced chain */}
            <div className="rounded-xl border border-white/8 bg-background/30 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-foreground">Advanced chain</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {enabledModules.length
                      ? enabledModules.join(", ")
                      : "Advanced modules are skipped."}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <ChoiceButton
                    active={advancedMode === "skip"}
                    onClick={() => setAdvancedMode("skip")}
                  >
                    Skip
                  </ChoiceButton>
                  <ChoiceButton
                    active={advancedMode === "go_advanced"}
                    onClick={() => setAdvancedMode("go_advanced")}
                  >
                    Advanced
                  </ChoiceButton>
                </div>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {advancedOptions.map((option) => {
                  const disabled =
                    !activeAdvanced || (option.key === "seo" && framework !== "next");
                  const active = !disabled && advanced[option.key];

                  return (
                    <button
                      key={option.key}
                      type="button"
                      disabled={disabled}
                      onClick={() =>
                        setAdvanced((cur) => ({ ...cur, [option.key]: !cur[option.key] }))
                      }
                      className={cn(
                        "grid grid-cols-[1.5rem_1fr] gap-3 rounded-lg border border-white/8 bg-secondary/30 p-3 text-left transition-all duration-200 hover:border-primary/35 disabled:cursor-not-allowed disabled:opacity-35",
                        active && "border-primary/50 bg-primary/8",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-white/15",
                          active && "border-primary bg-primary/90 shadow-glow-blue",
                        )}
                      >
                        {active ? (
                          <Check className="h-3 w-3 text-primary-foreground" aria-hidden="true" />
                        ) : null}
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-foreground/90">
                          {option.label}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {option.detail}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                disabled={!validName || generating}
                onClick={generate}
                className="gap-2"
              >
                {generating ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Rocket className="h-4 w-4" aria-hidden="true" />
                )}
                {generating ? "Generating…" : "Generate project"}
              </Button>
              <Button type="button" variant="outline" onClick={copyReceipt} className="gap-2">
                <Clipboard className="h-4 w-4" aria-hidden="true" />
                {copied ? "Copied!" : "Copy JSON"}
              </Button>
            </div>

            {/* Error */}
            {error ? (
              <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                {error}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL: Canvas + Outputs ── */}
      <div className="grid gap-6">
        {/* Canvas */}
        <div className="rounded-xl border border-white/8 bg-card/50 p-5 shadow-glass backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Network className="h-4 w-4 text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-bold text-foreground">Canvas chain</p>
                <p className="text-xs text-muted-foreground">
                  Project graph with live backend state
                </p>
              </div>
            </div>
            <Badge variant={job?.status === "ready" ? "glow" : "outline"} className="capitalize">
              {job?.status ?? "idle"}
            </Badge>
          </div>

          {/* Graph */}
          <div
            className="relative mt-5 overflow-hidden rounded-lg border border-white/8 bg-background/40"
            style={{ height: 480 }}
          >
            <div className="absolute inset-0 grid-bg" />

            {/* Scan lines */}
            <div
              className="absolute h-px w-3/4 rotate-3 scan-line"
              style={{ left: "12%", top: "26%" }}
            />
            <div
              className="absolute h-px w-[58%] -rotate-3 scan-line-blue"
              style={{ left: "24%", top: "55%" }}
            />
            <div
              className="absolute w-px scan-line-v"
              style={{ left: "47%", top: "8%", height: "50%" }}
            />

            {/* Nodes */}
            {mapNodes.map((node, i) => (
              <div
                key={node.label}
                className={cn(
                  "absolute w-36 rounded-lg border border-white/10 bg-card/90 p-3.5 shadow-xl backdrop-blur-sm transition-all duration-300",
                  node.active && "node-pulse border-primary/60 bg-primary/10",
                  node.complete && !node.active && "border-primary/35",
                )}
                style={{ left: node.x, top: node.y }}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary/80 font-mono text-[0.65rem] font-bold text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {node.complete ? (
                    <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  ) : null}
                </div>
                <p className="mt-3 text-xs font-bold text-foreground">{node.label}</p>
                <p className="mt-0.5 truncate text-[0.65rem] text-muted-foreground">{node.text}</p>
              </div>
            ))}

            {/* Step tracker */}
            <div className="absolute bottom-3 left-3 right-3 rounded-lg border border-white/8 bg-card/90 p-3 backdrop-blur-sm">
              <div className="grid grid-cols-6 gap-1.5">
                {jobSteps.map((step, i) => (
                  <div
                    key={step.status}
                    className={cn(
                      "rounded-md border border-white/8 bg-background/60 px-2 py-2 text-center text-[0.6rem]",
                      stepIndex === i &&
                        Boolean(job) &&
                        job.status !== "ready" &&
                        job.status !== "failed"
                        ? "node-pulse border-primary/60 bg-primary/12"
                        : null,
                      Boolean(job) && stepIndex >= i && job.status !== "failed"
                        ? "border-primary/35"
                        : null,
                    )}
                  >
                    <p className="font-mono text-muted-foreground/60">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-0.5 font-bold text-foreground/80">{step.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-5 h-px scan-line" />

          {/* JSON Receipt */}
          <div className="overflow-hidden rounded-lg border border-white/8 bg-secondary/30">
            <div className="flex items-center justify-between border-b border-white/8 bg-secondary/40 px-4 py-3">
              <div className="flex items-center gap-2">
                <SquareTerminal className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                <span className="font-mono text-[0.65rem] text-muted-foreground">
                  firstbase.answers.json
                </span>
              </div>
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-white/10" />
                <span className="h-2 w-2 rounded-full bg-white/10" />
                <span className="h-2 w-2 rounded-full bg-white/10" />
              </div>
            </div>
            <pre className="max-h-60 overflow-auto px-4 py-4 text-xs leading-6 text-foreground/75">
              <code>{receipt}</code>
            </pre>
          </div>

          {/* Job logs */}
          {job && job.logs.length > 0 ? (
            <div className="mt-4 rounded-lg border border-white/8 bg-background/30 p-4">
              <p className="text-xs font-bold text-foreground/70 uppercase tracking-wider">
                Job log
              </p>
              <div className="mt-3 grid gap-2">
                {job.logs.map((log) => (
                  <p key={log} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Sparkles className="h-3 w-3 text-primary flex-shrink-0" aria-hidden="true" />
                    {log}
                  </p>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Outputs */}
        <div className="rounded-xl border border-white/8 bg-card/50 p-5 shadow-glass backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <PackageCheck className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 className="text-base font-bold text-foreground">Outputs</h2>
          </div>

          <div className="mt-4 grid gap-3">
            <a
              href={job?.downloadUrl ?? undefined}
              aria-disabled={job?.status !== "ready"}
              className={cn(
                "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold transition-all duration-200",
                job?.status === "ready"
                  ? "border-primary/50 bg-primary/12 text-primary shadow-glow-blue hover:bg-primary/20"
                  : "pointer-events-none border-white/8 bg-secondary/30 text-muted-foreground/40",
              )}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download ZIP
            </a>
          </div>

          <div className="mt-6 grid gap-4 border-t border-white/8 pt-5">
            <div className="grid gap-2">
              <Label
                htmlFor="githubToken"
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground"
              >
                <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
                GitHub Token
              </Label>
              <Input
                id="githubToken"
                type="password"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                placeholder="ghp_..."
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground/60">
                Used only for this push. Classic tokens need public_repo for public repos or repo
                for private repos.
              </p>
              <p className="text-xs text-muted-foreground/60">
                GitHub repo name comes from Project Name:{" "}
                <span className="font-mono text-foreground/70">{answers.projectName}</span>
              </p>
            </div>

            <div className="grid gap-2">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Repository visibility
              </p>
              <div className="grid grid-cols-2 gap-2">
                <ChoiceButton active={!githubPrivate} onClick={() => setGithubPrivate(false)}>
                  Public
                </ChoiceButton>
                <ChoiceButton active={githubPrivate} onClick={() => setGithubPrivate(true)}>
                  Private
                </ChoiceButton>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              disabled={job?.status !== "ready" || pushing || !githubToken.trim()}
              onClick={pushToGithub}
              className="gap-2 min-h-12"
            >
              {pushing ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <GitBranch className="h-4 w-4" aria-hidden="true" />
              )}
              {pushing ? "Pushing repository..." : "Push to GitHub"}
            </Button>

            {job?.githubUrl ? (
              <a
                href={job.githubUrl}
                className="flex items-center gap-2 text-sm font-medium text-primary transition-all duration-200 hover:text-primary/80 hover:underline"
              >
                <GitBranch className="h-4 w-4" aria-hidden="true" />
                Open repository →
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
