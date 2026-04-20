"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

import { getProblemTestCases } from "@/lib/problemExamples";
import {
  defaultRustCode,
  type Problem,
  type ProblemTestCase
} from "@/lib/problems";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false
});

type RunResponse = {
  stdout?: string;
  stderr?: string;
  compile_output?: string;
  error?: string;
  details?: string;
  status?: string;
  message?: string;
};

type CodePlaygroundProps = {
  problem: Problem;
  totalProblemCount: number;
};

type TestCaseResult = ProblemTestCase & {
  actualOutput: string;
  passed: boolean;
  status?: string;
  error?: string;
};

const storageKey = "bigrust-solved-problems";

function normalizeOutput(output: string) {
  return output.replace(/\r\n/g, "\n").trimEnd();
}

function isTestCaseResult(
  testCase: ProblemTestCase | TestCaseResult
): testCase is TestCaseResult {
  return "passed" in testCase;
}

export function CodePlayground({
  problem,
  totalProblemCount
}: CodePlaygroundProps) {
  const [code, setCode] = useState(defaultRustCode);
  const [result, setResult] = useState<RunResponse | null>(null);
  const [testResults, setTestResults] = useState<TestCaseResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [solvedProblemIds, setSolvedProblemIds] = useState<string[]>([]);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState(14);
  const [theme, setTheme] = useState<"vs-dark" | "light">("vs-dark");
  const [wordWrap, setWordWrap] = useState<"on" | "off">("on");
  const [tabSize, setTabSize] = useState(4);
  const testCases = useMemo(() => getProblemTestCases(problem), [problem]);
  const isSolved = solvedProblemIds.includes(problem.id);
  const passedCount = testResults.filter((testCase) => testCase.passed).length;
  const allTestsPassed =
    testResults.length > 0 && passedCount === testResults.length;

  useEffect(() => {
    const savedProgress = window.localStorage.getItem(storageKey);
    if (savedProgress) {
      try {
        setSolvedProblemIds(JSON.parse(savedProgress) as string[]);
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
  }, []);

  function markSolved() {
    setSolvedProblemIds((current) => {
      if (current.includes(problem.id)) {
        return current;
      }

      const next = [...current, problem.id];
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  }

  function resetEditor() {
    setCode(defaultRustCode);
    setResult(null);
    setTestResults([]);
    setSubmitMessage(null);
  }

  async function executeCode(stdin: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"}/run`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code, stdin })
      }
    );

    const data = (await response.json()) as RunResponse;

    if (!response.ok) {
      return {
        error: data.error || "Something went wrong while running the code.",
        details: data.details
      };
    }

    return data;
  }

  async function runTests() {
    setSubmitMessage(null);
    setResult(null);
    setTestResults([]);

    try {
      const nextResults: TestCaseResult[] = [];

      for (const testCase of testCases) {
        const data = await executeCode(testCase.input);
        const actualOutput = data.stdout ?? "";
        const hasRuntimeError =
          Boolean(data.error) ||
          Boolean(data.stderr) ||
          Boolean(data.compile_output);
        const passed =
          !hasRuntimeError &&
          normalizeOutput(actualOutput) ===
            normalizeOutput(testCase.expectedOutput);

        nextResults.push({
          ...testCase,
          actualOutput,
          passed,
          status: data.status,
          error: data.error || data.stderr || data.compile_output
        });

        setTestResults([...nextResults]);
        setResult(data);

        if (hasRuntimeError) {
          break;
        }
      }

      return nextResults;
    } catch (error) {
      const nextError = {
        error: "Unable to reach the backend.",
        details: error instanceof Error ? error.message : "Unknown error"
      };
      setResult(nextError);
      return [];
    }
  }

  const runCode = async () => {
    setIsRunning(true);

    try {
      await runTests();
    } finally {
      setIsRunning(false);
    }
  };

  const submitSolution = async () => {
    setIsSubmitting(true);

    try {
      const results = allTestsPassed ? testResults : await runTests();
      const solvedNow =
        results.length > 0 && results.every((testCase) => testCase.passed);

      if (solvedNow) {
        markSolved();
        setSubmitMessage("Accepted. Progress updated.");
      } else {
        setSubmitMessage("Fix the failing tests, then submit again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-[720px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:min-h-0">
      <div className="flex flex-col gap-3 border-b border-slate-200 bg-white px-4 py-3 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <h2 className="text-sm font-semibold text-slate-900">Code</h2>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Rust solution for {problem.title}
          </p>
          <p className="mt-1 text-xs font-medium text-emerald-700">
            {solvedProblemIds.length}/{totalProblemCount || "?"} solved
            {isSolved ? " · current question solved" : ""}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={runCode}
            disabled={isRunning}
            className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-300"
          >
            {isRunning ? "Running..." : "Run Code"}
          </button>
          <button
            type="button"
            onClick={submitSolution}
            disabled={isRunning || isSubmitting}
            className="inline-flex items-center justify-center rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-teal-300"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={resetEditor}
            className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => {
              setResult(null);
              setTestResults([]);
              setSubmitMessage(null);
            }}
            className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
          >
            Clear output
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          Font
          <button
            type="button"
            onClick={() => setFontSize((size) => Math.max(12, size - 1))}
            className="rounded border border-slate-300 bg-white px-2 py-0.5 text-slate-700 transition hover:border-slate-400"
          >
            -
          </button>
          <span className="min-w-8 text-center font-mono text-xs">{fontSize}px</span>
          <button
            type="button"
            onClick={() => setFontSize((size) => Math.min(24, size + 1))}
            className="rounded border border-slate-300 bg-white px-2 py-0.5 text-slate-700 transition hover:border-slate-400"
          >
            +
          </button>
        </label>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          Theme
          <select
            value={theme}
            onChange={(event) => setTheme(event.target.value as "vs-dark" | "light")}
            className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-700"
          >
            <option value="vs-dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          Word wrap
          <select
            value={wordWrap}
            onChange={(event) => setWordWrap(event.target.value as "on" | "off")}
            className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-700"
          >
            <option value="on">On</option>
            <option value="off">Off</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          Tab size
          <select
            value={tabSize}
            onChange={(event) => setTabSize(Number(event.target.value))}
            className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-700"
          >
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={8}>8</option>
          </select>
        </label>
      </div>

      <div className="min-h-[360px] flex-1 overflow-hidden">
        <MonacoEditor
          height="100%"
          defaultLanguage="rust"
          value={code}
          onChange={(value) => setCode(value ?? defaultRustCode)}
          theme={theme}
          options={{
            minimap: { enabled: false },
            fontSize,
            tabSize,
            wordWrap,
            scrollBeyondLastLine: false,
            automaticLayout: true
          }}
        />
      </div>

      <div className="max-h-80 overflow-auto border-t border-slate-200 bg-white p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-950">
              Test cases
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Run or submit to compare stdout with the expected output.
            </p>
          </div>
          {testResults.length > 0 ? (
            <span
              className={`rounded-md px-3 py-1 font-mono text-xs ${
                allTestsPassed
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
              }`}
            >
              {passedCount}/{testResults.length} passed
            </span>
          ) : (
            <span className="rounded-md bg-slate-100 px-3 py-1 font-mono text-xs text-slate-500">
              {testCases.length} ready
            </span>
          )}
        </div>

        {submitMessage ? (
          <p
            className={`mb-3 rounded-md px-3 py-2 text-sm font-medium ${
              allTestsPassed || isSolved
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700"
            }`}
          >
            {submitMessage}
          </p>
        ) : null}

        <div className="space-y-3">
          {(testResults.length > 0 ? testResults : testCases).map(
            (testCase, index) => {
              const resultForCase = isTestCaseResult(testCase)
                ? testCase
                : undefined;

              return (
                <div
                  key={`${testCase.input}-${index}`}
                  className="rounded-lg border border-slate-200 p-3"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-900">
                      Case {index + 1}
                    </p>
                    {resultForCase ? (
                      <span
                        className={`rounded-md px-2 py-1 font-mono text-xs ${
                          resultForCase.passed
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {resultForCase.passed ? "Passed" : "Failed"}
                      </span>
                    ) : (
                      <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-500">
                        Not run
                      </span>
                    )}
                  </div>

                  <div className="grid gap-3 text-sm md:grid-cols-3">
                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-500">
                        Input
                      </p>
                      <pre className="mt-1 max-h-28 overflow-auto rounded-md bg-slate-50 p-2 font-mono text-xs text-slate-700">
                        {testCase.input || "(empty input)"}
                      </pre>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-500">
                        Expected
                      </p>
                      <pre className="mt-1 max-h-28 overflow-auto rounded-md bg-slate-50 p-2 font-mono text-xs text-emerald-700">
                        {testCase.expectedOutput || "(empty output)"}
                      </pre>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-500">
                        Actual
                      </p>
                      <pre className="mt-1 max-h-28 overflow-auto rounded-md bg-slate-50 p-2 font-mono text-xs text-slate-700">
                        {resultForCase
                          ? resultForCase.actualOutput || "(empty output)"
                          : "Run first"}
                      </pre>
                    </div>
                  </div>

                  {resultForCase?.error ? (
                    <pre className="mt-3 whitespace-pre-wrap rounded-md bg-rose-50 p-2 font-mono text-xs text-rose-700">
                      {resultForCase.error}
                    </pre>
                  ) : null}
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className="max-h-64 overflow-auto border-t border-slate-800 bg-zinc-950 p-4 font-mono text-sm text-slate-100">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Console
          </h3>
          {isRunning ? (
            <span className="text-xs text-orange-300">Executing...</span>
          ) : null}
        </div>

        {!result ? (
          <p className="text-slate-400">
            Run the code to see stdout, stderr, or compiler output here.
          </p>
        ) : (
          <div className="space-y-4">
            {result.stdout ? (
              <div>
                <div className="mb-1 text-xs uppercase text-slate-500">
                  Stdout
                </div>
                <pre className="whitespace-pre-wrap text-emerald-300">
                  {result.stdout}
                </pre>
              </div>
            ) : null}

            {result.stderr ? (
              <div>
                <div className="mb-1 text-xs uppercase text-slate-500">
                  Stderr
                </div>
                <pre className="whitespace-pre-wrap text-rose-300">
                  {result.stderr}
                </pre>
              </div>
            ) : null}

            {result.compile_output ? (
              <div>
                <div className="mb-1 text-xs uppercase text-slate-500">
                  Compile output
                </div>
                <pre className="whitespace-pre-wrap text-amber-300">
                  {result.compile_output}
                </pre>
              </div>
            ) : null}

            {result.error ? (
              <div>
                <div className="mb-1 text-xs uppercase text-slate-500">
                  Error
                </div>
                <pre className="whitespace-pre-wrap text-rose-300">
                  {result.error}
                  {result.details ? `\n\n${result.details}` : ""}
                </pre>
              </div>
            ) : null}

            {!result.stdout &&
            !result.stderr &&
            !result.compile_output &&
            !result.error ? (
              <p className="text-slate-400">Program finished with no output.</p>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
