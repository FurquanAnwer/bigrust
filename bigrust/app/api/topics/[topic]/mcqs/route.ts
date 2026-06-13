import { NextResponse } from "next/server";
import { questionBank } from "@/lib/questionBank";

export async function GET(
  _request: Request,
  context: { params: Promise<{ topic: string }> }
) {
  const { topic } = await context.params;

  const mcqs = questionBank.mcqs?.[topic];

  if (!mcqs) {
    return NextResponse.json(
      { error: "No interview MCQs found for this topic yet." },
      { status: 404 }
    );
  }

  return NextResponse.json({ mcqs });
}