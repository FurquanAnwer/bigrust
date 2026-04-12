"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { defaultRustCode } from "@/lib/problems";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false
});

type RunResponse = {
  stdout?: string;
  stderr?: string;
  compile_output?: string;
  error?: string;
  details?: string;
};

type CodePlaygroundProps = {
  problemTitle: string;
};

export function CodePlayground({ problemTitle }: CodePlaygroundProps) {
  const [code, setCode] = useState(defaultRustCode);
  const [result, setResult] = useState<RunResponse | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    setResult(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"}/run`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ code })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setResult({
          error: data.error || "Something went wrong while running the code.",
          details: data.details
        });
        return;
      }

      setResult(data);
    } catch (error) {
      setResult({
        error: "Unable to reach the backend.",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Rust Editor</h2>
          <p className="text-sm text-slate-600">
            Write a solution for {problemTitle} and run it through Judge0.
          </p>
        </div>
        <button
          type="button"
          onClick={runCode}
          disabled={isRunning}
          className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-teal-300"
        >
          {isRunning ? "Running..." : "Run Code"}
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200">
        <MonacoEditor
          height="420px"
          defaultLanguage="rust"
          value={code}
          onChange={(value) => setCode(value ?? defaultRustCode)}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true
          }}
        />
      </div>

      <div className="rounded-lg bg-zinc-950 p-4 font-mono text-sm text-slate-100">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs uppercase text-slate-400">
            Output
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
