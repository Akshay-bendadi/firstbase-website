import { NextResponse } from "next/server";

import { listGeneratedFiles } from "../../../../../lib/generator/files";
import {
  getInternalGenerationJob,
  markGithubFailed,
  markGithubReady,
  markPushing,
} from "../../../../../lib/generator/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type GithubRequest = {
  token?: string;
  private?: boolean;
};

class GithubApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly acceptedPermissions: string | null,
  ) {
    super(message);
  }
}

function explainGithubError(error: unknown): string {
  if (!(error instanceof GithubApiError)) {
    return error instanceof Error ? error.message : "GitHub push failed.";
  }

  if (error.message.toLowerCase().includes("resource not accessible by personal access token")) {
    const permissions = error.acceptedPermissions
      ? ` GitHub reported required permissions: ${error.acceptedPermissions}.`
      : "";

    return `This token can authenticate, but it cannot create or write the repository. Use a classic token with public_repo for public repos or repo for private repos, or a fine-grained token with repository Administration: write and Contents: write.${permissions}`;
  }

  return error.message;
}

async function githubFetch<T>(url: string, token: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...init.headers,
    },
  });

  const body = (await response.json().catch(() => ({}))) as T & { message?: string };

  if (!response.ok) {
    throw new GithubApiError(
      body.message || `GitHub request failed with ${response.status}.`,
      response.status,
      response.headers.get("x-accepted-github-permissions"),
    );
  }

  return body;
}

export async function POST(request: Request, context: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await context.params;
  const job = getInternalGenerationJob(jobId);

  if (!job || job.status !== "ready" || !job.projectPath) {
    return NextResponse.json(
      { error: "Generate the project before pushing to GitHub." },
      { status: 409 },
    );
  }

  try {
    const body = (await request.json()) as GithubRequest;
    const token = body.token?.trim();

    if (!token) {
      return NextResponse.json({ error: "A GitHub token is required." }, { status: 400 });
    }

    markPushing(jobId);

    const user = await githubFetch<{ login: string }>("https://api.github.com/user", token);
    const repo = await githubFetch<{
      html_url: string;
      name: string;
      default_branch: string;
      owner: { login: string };
    }>("https://api.github.com/user/repos", token, {
      method: "POST",
      body: JSON.stringify({
        name: job.answers.projectName,
        private: Boolean(body.private),
        auto_init: false,
      }),
    });
    const owner = repo.owner?.login || user.login;

    const files = await listGeneratedFiles(job.projectPath);
    const blobs = await Promise.all(
      files.map(async (file) => {
        const blob = await githubFetch<{ sha: string }>(
          `https://api.github.com/repos/${owner}/${repo.name}/git/blobs`,
          token,
          {
            method: "POST",
            body: JSON.stringify({
              content: file.content.toString("base64"),
              encoding: "base64",
            }),
          },
        );

        return {
          path: file.path,
          mode: "100644",
          type: "blob",
          sha: blob.sha,
        };
      }),
    );

    const tree = await githubFetch<{ sha: string }>(
      `https://api.github.com/repos/${owner}/${repo.name}/git/trees`,
      token,
      {
        method: "POST",
        body: JSON.stringify({ tree: blobs }),
      },
    );
    const commit = await githubFetch<{ sha: string }>(
      `https://api.github.com/repos/${owner}/${repo.name}/git/commits`,
      token,
      {
        method: "POST",
        body: JSON.stringify({
          message: "Initial commit (via firstbase web)",
          tree: tree.sha,
        }),
      },
    );

    await githubFetch(`https://api.github.com/repos/${owner}/${repo.name}/git/refs`, token, {
      method: "POST",
      body: JSON.stringify({
        ref: `refs/heads/${repo.default_branch || "main"}`,
        sha: commit.sha,
      }),
    });

    return NextResponse.json(markGithubReady(jobId, repo.html_url));
  } catch (error) {
    const message = explainGithubError(error);
    return NextResponse.json(markGithubFailed(jobId, message), { status: 500 });
  }
}
