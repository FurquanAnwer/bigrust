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
  const [fontSize, setFontSize] = useState(14);
  const [theme, setTheme] = useState<"vs-dark" | "light">("vs-dark");
  const [wordWrap, setWordWrap] = useState<"on" | "off">("on");
  const [tabSize, setTabSize] = useState(4);

  function resetEditor() {
    setCode(defaultRustCode);
    setResult(null);
  }

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
    <section className="flex min-h-[720px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:min-h-0">
      <div className="flex flex-col gap-3 border-b border-slate-200 bg-white px-4 py-3 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <h2 className="text-sm font-semibold text-slate-900">Code</h2>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Rust solution for {problemTitle}
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
            onClick={resetEditor}
            className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => setResult(null)}
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
