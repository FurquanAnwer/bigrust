"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { CodePlayground } from "@/components/CodePlayground";
import { QuestionLoading } from "@/components/QuestionLoading";
import {
  getBackendProblemById,
  getBackendQuestionCounts
} from "@/lib/backendQuestions";
import { getProblemExamples } from "@/lib/problemExamples";
import type { Problem } from "@/lib/problems";

type ProblemWorkspaceProps = {
  problemId: string;
};

export function ProblemWorkspace({ problemId }: ProblemWorkspaceProps) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [totalProblemCount, setTotalProblemCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    async function loadProblem() {
      setIsLoading(true);
      setError(null);

      try {
        const [nextProblem, questionCounts] = await Promise.all([
          getBackendProblemById(problemId),
          getBackendQuestionCounts()
        ]);

        if (isCurrent) {
          setProblem(nextProblem);
          setTotalProblemCount(
            questionCounts.reduce(
              (total, count) => total + count.problemCount,
              0
            )
          );
        }
      } catch (loadError) {
        if (isCurrent) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load this coding question."
          );
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    loadProblem();

    return () => {
      isCurrent = false;
    };
  }, [problemId]);

  if (isLoading) {
    return (
      <main className="min-h-[calc(100vh-65px)] bg-slate-100 p-4">
        <div className="mx-auto max-w-[110rem] pt-6">
          <QuestionLoading label="Loading coding workspace..." cards={3} />
        </div>
      </main>
    );
  }

  if (error || !problem) {
    return (
      <main className="min-h-[calc(100vh-65px)] bg-slate-100 px-4 py-10">
        <section className="mx-auto max-w-2xl rounded-lg border border-rose-200 bg-white p-6 shadow-card">
          <p className="text-sm font-semibold text-rose-700">
            Coding question could not be loaded.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            {error ?? "Problem not found."}
          </p>
          <Link
            href="/topics"
            className="mt-5 inline-flex rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
          >
            Back to topics
          </Link>
        </section>
      </main>
    );
  }

  const examples = getProblemExamples(problem);

  return (
    <main className="min-h-[calc(100vh-65px)] bg-slate-100">
      <div className="border-b border-slate-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-[110rem] items-center justify-between gap-4">
          <Link
            href={`/topics/${problem.topic}/problems`}
            className="inline-flex rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
          >
            Back to {problem.topicTitle} problems
          </Link>
          <div className="hidden text-sm font-medium text-slate-500 sm:block">
            BigRust coding workspace
          </div>
        </div>
      </div>

      <section className="mx-auto grid max-w-[110rem] gap-3 p-3 lg:h-[calc(100vh-118px)] lg:grid-cols-[minmax(360px,0.95fr)_minmax(520px,1.25fr)]">
        <article className="overflow-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-3">
            <p className="text-sm font-semibold text-slate-700">Description</p>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-3">
              <span className="rounded-md bg-teal-50 px-3 py-1 font-mono text-xs text-teal-700">
                {problem.topicTitle}
              </span>
              <span className="rounded-md bg-amber-50 px-3 py-1 font-mono text-xs text-amber-700">
                {problem.difficulty}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
              {problem.title}
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-700">
              {problem.description}
            </p>

            <div className="mt-8 space-y-5">
              <h2 className="text-lg font-semibold text-slate-950">
                Examples
              </h2>
              {examples.map((example, index) => (
                <div
                  key={`${example.input}-${index}`}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <h3 className="text-sm font-semibold text-slate-950">
                    Example {index + 1}
                  </h3>
                  <div className="mt-3 grid gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-500">
                        Input
                      </p>
                      <pre className="mt-1 overflow-auto rounded-md border border-slate-200 bg-white p-3 font-mono text-sm text-slate-800">
                        {example.input || "(empty input)"}
                      </pre>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-500">
                        Output
                      </p>
                      <pre className="mt-1 overflow-auto rounded-md border border-slate-200 bg-white p-3 font-mono text-sm text-emerald-700">
                        {example.output || "(empty output)"}
                      </pre>
                    </div>
                    {example.explanation ? (
                      <p className="text-sm leading-6 text-slate-600">
                        {example.explanation}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        <CodePlayground
          problem={problem}
          totalProblemCount={totalProblemCount}
        />
      </section>
    </main>
  );
}
