import { NextResponse } from "next/server";
import { questionBank } from "@/lib/questionBank";
import { generateStarterCode } from "@/lib/generateStarterCode";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const problemEntry = Object.entries(questionBank.problems ?? {}).find(
    ([, problems]: any) => problems.some((item: any) => item.id === id)
  );

  if (!problemEntry) {
    return NextResponse.json(
      { error: "Problem not found." },
      { status: 404 }
    );
  }

  const [topic, problems] = problemEntry as [string, any[]];
  const problem = problems.find((item) => item.id === id);

  return NextResponse.json({
    problem: {
      ...problem,
      starterCode: generateStarterCode(problem),
    },
    topic,
  });
}