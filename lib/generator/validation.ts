import type { FirstbaseAnswers } from "./types";

const reservedNames = new Set(["node_modules", "dist", "build", ".git"]);

export function validateProjectName(value: string): true | string {
  const normalized = value.trim();

  if (!normalized) {
    return "Project name is required.";
  }

  if (normalized.length > 80) {
    return "Use 80 characters or fewer.";
  }

  if (
    normalized.includes("\0") ||
    normalized.includes("/") ||
    normalized.includes("\\") ||
    normalized.includes("..")
  ) {
    return "Do not use path separators or traversal characters.";
  }

  if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(normalized)) {
    return "Use only letters, numbers, dashes, and underscores. Start with a letter or number.";
  }

  if (reservedNames.has(normalized.toLowerCase())) {
    return "That name is reserved.";
  }

  return true;
}

export function normalizeAnswers(input: unknown): FirstbaseAnswers {
  if (!input || typeof input !== "object") {
    throw new Error("Request body must be an object.");
  }

  const data = input as Partial<FirstbaseAnswers>;
  const projectName = String(data.projectName ?? "").trim();
  const nameStatus = validateProjectName(projectName);

  if (nameStatus !== true) {
    throw new Error(nameStatus);
  }

  const framework = data.framework === "react" ? "react" : "next";
  const language = data.language === "js" ? "js" : "ts";
  const routing = framework === "next" && data.routing === "pages" ? "pages" : "app";
  const uiLibrary = data.uiLibrary === "none" ? "none" : "shadcn";
  const advancedMode = data.advancedMode === "skip" ? "skip" : "go_advanced";
  const advancedEnabled = advancedMode === "go_advanced";

  return {
    projectName,
    framework,
    routing,
    language,
    uiLibrary,
    setupHusky: Boolean(data.setupHusky),
    advancedMode,
    reactQuery: advancedEnabled && Boolean(data.reactQuery),
    auth: advancedEnabled && Boolean(data.auth),
    forms: advancedEnabled && Boolean(data.forms),
    toasts: advancedEnabled && Boolean(data.toasts),
    i18n: advancedEnabled && Boolean(data.i18n),
    seo: advancedEnabled && framework === "next" && Boolean(data.seo),
    tests: advancedEnabled && Boolean(data.tests),
  };
}
