import { NextResponse } from "next/server";
import { questionBank } from "@/lib/questionBank";

export async function GET() {
  const topicSlugs = Array.from(
    new Set([
      ...Object.keys(questionBank.problems ?? {}),
      ...Object.keys(questionBank.mcqs ?? {}),
    ])
  );

  const counts = topicSlugs.map((topic) => ({
    topic,
    problemCount: questionBank.problems?.[topic]?.length ?? 0,
    mcqCount: questionBank.mcqs?.[topic]?.length ?? 0,
  }));

  return NextResponse.json({ counts });
}