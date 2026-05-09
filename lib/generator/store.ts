import { randomUUID } from "crypto";
import { mkdir, rm } from "fs/promises";
import os from "os";
import path from "path";

import { writeGeneratedProject } from "./project-writer";
import type { FirstbaseAnswers, GenerationJob, PublicGenerationJob } from "./types";
import { createZipArchive } from "./zip";

const globalJobs = globalThis as typeof globalThis & {
  __firstbaseGenerationJobs?: Map<string, GenerationJob>;
};
const jobs = globalJobs.__firstbaseGenerationJobs ?? new Map<string, GenerationJob>();
globalJobs.__firstbaseGenerationJobs = jobs;
const rootDir = path.join(os.tmpdir(), "firstbase-web-jobs");

function publicJob(job: GenerationJob): PublicGenerationJob {
  const { projectPath, zipPath, ...safeJob } = job;
  void projectPath;
  void zipPath;
  return safeJob;
}

function now(): string {
  return new Date().toISOString();
}

function updateJob(id: string, patch: Partial<GenerationJob>, log?: string): GenerationJob {
  const current = jobs.get(id);

  if (!current) {
    throw new Error("Generation job was not found.");
  }

  const next: GenerationJob = {
    ...current,
    ...patch,
    updatedAt: now(),
    logs: log ? [...current.logs, log] : current.logs,
  };

  jobs.set(id, next);
  return next;
}

async function runGeneration(id: string): Promise<void> {
  const job = jobs.get(id);

  if (!job) {
    return;
  }

  try {
    updateJob(id, { status: "validating" }, "Validated project options.");

    const jobDir = path.join(rootDir, id);
    const projectPath = path.join(jobDir, job.answers.projectName);
    const zipPath = path.join(jobDir, `${job.answers.projectName}.zip`);

    await mkdir(jobDir, { recursive: true });
    updateJob(id, { status: "scaffolding", projectPath }, "Writing scaffold files.");
    await writeGeneratedProject(projectPath, job.answers);

    updateJob(id, { status: "cleaning" }, "Removing dependency folders from export.");
    await rm(path.join(projectPath, "node_modules"), { recursive: true, force: true });

    updateJob(id, { status: "zipping", zipPath }, "Creating ZIP archive.");
    await createZipArchive(projectPath, zipPath);

    updateJob(
      id,
      {
        status: "ready",
        downloadUrl: `/api/generate/${id}/download`,
      },
      "Project ZIP is ready.",
    );
  } catch (error) {
    updateJob(
      id,
      {
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown generation failure.",
      },
      "Generation failed.",
    );
  }
}

export function startGeneration(answers: FirstbaseAnswers): PublicGenerationJob {
  const id = randomUUID();
  const job: GenerationJob = {
    id,
    status: "queued",
    answers,
    createdAt: now(),
    updatedAt: now(),
    logs: ["Queued generation job."],
  };

  jobs.set(id, job);
  setTimeout(() => {
    void runGeneration(id);
  }, 0);

  return publicJob(job);
}

export function getGenerationJob(id: string): PublicGenerationJob | undefined {
  const job = jobs.get(id);
  return job ? publicJob(job) : undefined;
}

export function getInternalGenerationJob(id: string): GenerationJob | undefined {
  return jobs.get(id);
}

export function markPushing(id: string): void {
  updateJob(id, { status: "pushing" }, "Pushing generated files to GitHub.");
}

export function markGithubReady(id: string, githubUrl: string): PublicGenerationJob {
  return publicJob(updateJob(id, { status: "ready", githubUrl }, "GitHub repository is ready."));
}

export function markGithubFailed(id: string, error: string): PublicGenerationJob {
  return publicJob(updateJob(id, { status: "failed", error }, "GitHub push failed."));
}
