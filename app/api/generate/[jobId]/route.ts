import { NextResponse } from "next/server";

import { getGenerationJob } from "../../../../lib/generator/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await context.params;
  const job = getGenerationJob(jobId);

  if (!job) {
    return NextResponse.json({ error: "Generation job was not found." }, { status: 404 });
  }

  return NextResponse.json(job);
}
