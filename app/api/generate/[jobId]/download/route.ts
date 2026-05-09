import { NextResponse } from "next/server";

import { readFile } from "fs/promises";

import { getInternalGenerationJob } from "../../../../../lib/generator/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await context.params;
  const job = getInternalGenerationJob(jobId);

  if (!job || job.status !== "ready" || !job.zipPath) {
    return NextResponse.json({ error: "ZIP archive is not ready." }, { status: 404 });
  }

  const archive = await readFile(job.zipPath);

  return new Response(archive, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${job.answers.projectName}.zip"`,
      "Cache-Control": "no-store",
    },
  });
}
