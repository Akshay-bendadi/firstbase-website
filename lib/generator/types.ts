export type Framework = "react" | "next";
export type Language = "js" | "ts";
export type Routing = "app" | "pages";
export type UiLibrary = "none" | "shadcn";
export type AdvancedMode = "skip" | "go_advanced";

export type FirstbaseAnswers = {
  projectName: string;
  framework: Framework;
  routing: Routing;
  language: Language;
  uiLibrary: UiLibrary;
  setupHusky: boolean;
  advancedMode: AdvancedMode;
  reactQuery: boolean;
  auth: boolean;
  forms: boolean;
  toasts: boolean;
  i18n: boolean;
  seo: boolean;
  tests: boolean;
};

export type JobStatus =
  | "queued"
  | "validating"
  | "scaffolding"
  | "cleaning"
  | "zipping"
  | "ready"
  | "failed"
  | "pushing";

export type GenerationJob = {
  id: string;
  status: JobStatus;
  answers: FirstbaseAnswers;
  createdAt: string;
  updatedAt: string;
  logs: string[];
  projectPath?: string;
  zipPath?: string;
  downloadUrl?: string;
  githubUrl?: string;
  error?: string;
};

export type PublicGenerationJob = Omit<GenerationJob, "projectPath" | "zipPath">;
