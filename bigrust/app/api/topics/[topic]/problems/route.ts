import { NextResponse } from "next/server";
import { questionBank } from "@/lib/questionBank";
import { generateStarterCode } from "@/lib/generateStarterCode";

export async function GET(
  _request: Request,
  context: { params: Promise<{ topic: string }> }
) {
  const { topic } = await context.params;

  const problems = questionBank.problems?.[topic];

  if (!problems) {
    return NextResponse.json(
      { error: "No interview coding problems found for this topic yet." },
      { status: 404 }
    );
  }

  const problemsWithStarterCode = problems.map((problem: any) => ({
    ...problem,
    starterCode: generateStarterCode(problem),
  }));

  return NextResponse.json({ problems: problemsWithStarterCode });
}