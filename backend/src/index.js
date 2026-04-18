import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const judge0ApiUrl = process.env.JUDGE0_API_URL || "https://ce.judge0.com";
const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);
const questionBankPath = resolve(
  currentDir,
  "../../shared/interviewQuestions.json"
);
const questionBank = JSON.parse(readFileSync(questionBankPath, "utf8"));

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/topics/question-counts", (_req, res) => {
  const topicSlugs = Array.from(
    new Set([
      ...Object.keys(questionBank.problems ?? {}),
      ...Object.keys(questionBank.mcqs ?? {})
    ])
  );

  const counts = topicSlugs.map((topic) => ({
    topic,
    problemCount: questionBank.problems?.[topic]?.length ?? 0,
    mcqCount: questionBank.mcqs?.[topic]?.length ?? 0
  }));

  return res.json({ counts });
});

app.get("/topics/:topic/problems", (req, res) => {
  const problems = questionBank.problems?.[req.params.topic];

  if (!problems) {
    return res.status(404).json({
      error: "No interview coding problems found for this topic yet."
    });
  }

  return res.json({ problems });
});

app.get("/topics/:topic/mcqs", (req, res) => {
  const mcqs = questionBank.mcqs?.[req.params.topic];

  if (!mcqs) {
    return res.status(404).json({
      error: "No interview MCQs found for this topic yet."
    });
  }

  return res.json({ mcqs });
});

app.get("/problems/:id", (req, res) => {
  const problemEntry = Object.entries(questionBank.problems ?? {}).find(
    ([, problems]) => problems.some((item) => item.id === req.params.id)
  );

  if (!problemEntry) {
    return res.status(404).json({
      error: "Problem not found."
    });
  }

  const [topic, problems] = problemEntry;
  const problem = problems.find((item) => item.id === req.params.id);

  return res.json({ problem, topic });
});

app.post("/run", async (req, res) => {
  const { code } = req.body ?? {};

  if (!code || typeof code !== "string") {
    return res.status(400).json({
      error: "Rust code is required in the `code` field."
    });
  }

  const headers = {
    "Content-Type": "application/json"
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
          source_code: code
        })
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(502).json({
        error: "Judge0 request failed.",
        details: text
      });
    }

    const result = await response.json();

    return res.json({
      stdout: result.stdout ?? "",
      stderr: result.stderr ?? "",
      compile_output: result.compile_output ?? "",
      message: result.message ?? "",
      status: result.status?.description ?? "Unknown"
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to run code.",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

if (process.argv[1] === currentFilePath) {
  app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
  });
}

export { app };
