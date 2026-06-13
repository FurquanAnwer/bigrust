import { NextResponse } from "next/server";

const judge0ApiUrl = process.env.JUDGE0_API_URL || "https://ce.judge0.com";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const { code, stdin = "" } = body ?? {};

  if (!code || typeof code !== "string") {
    return NextResponse.json(
      { error: "Rust code is required in the `code` field." },
      { status: 400 }
    );
  }

  if (typeof stdin !== "string") {
    return NextResponse.json(
      { error: "`stdin` must be a string when provided." },
      { status: 400 }
    );
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (process.env.JUDGE0_API_KEY) {
    headers["X-RapidAPI-Key"] = process.env.JUDGE0_API_KEY;
  }

  if (process.env.JUDGE0_API_HOST) {
    headers["X-RapidAPI-Host"] = process.env.JUDGE0_API_HOST;
  }

  try {
    const response = await fetch(
      `${judge0ApiUrl}/submissions?base64_encoded=false&wait=true&fields=stdout,stderr,compile_output,message,status`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          language_id: 73,
          source_code: code,
          stdin,
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();

      return NextResponse.json(
        {
          error: "Judge0 request failed.",
          details: text,
        },
        { status: 502 }
      );
    }

    const result = await response.json();

    return NextResponse.json({
      stdout: result.stdout ?? "",
      stderr: result.stderr ?? "",
      compile_output: result.compile_output ?? "",
      message: result.message ?? "",
      status: result.status?.description ?? "Unknown",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to run code.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}