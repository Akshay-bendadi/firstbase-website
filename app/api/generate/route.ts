import { NextResponse } from "next/server";

import { startGeneration } from "../../../lib/generator/store";
import { normalizeAnswers } from "../../../lib/generator/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const answers = normalizeAnswers(body);
    const job = startGeneration(answers);

    return NextResponse.json(job, { status: 202 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to start generation.",
      },
      { status: 400 },
    );
  }
}
