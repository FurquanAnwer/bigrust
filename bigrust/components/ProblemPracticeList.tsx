"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { QuestionLoading } from "@/components/QuestionLoading";
import { getBackendProblemsByTopic } from "@/lib/backendQuestions";
import type { Problem } from "@/lib/problems";
import type { Difficulty } from "@/lib/topics";

type ProblemPracticeListProps = {
  topic: string;
};

type DifficultyFilter = "All" | Difficulty;

const difficultyFilters: DifficultyFilter[] = ["All", "Easy", "Medium", "Hard"];
const storageKey = "bigrust-solved-problems";

export function ProblemPracticeList({ topic }: ProblemPracticeListProps) {
  const [activeFilter, setActiveFilter] = useState<DifficultyFilter>("All");
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [solvedProblemIds, setSolvedProblemIds] = useState<string[]>([]);

  useEffect(() => {
    let isCurrent = true;

    async function loadProblems() {
      setIsLoading(true);
      setError(null);

      try {
        const nextProblems = await getBackendProblemsByTopic(topic);

        if (isCurrent) {
          setProblems(nextProblems);
        }
      } catch (loadError) {
        if (isCurrent) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load coding questions."
          );
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    loadProblems();

    return () => {
      isCurrent = false;
    };
  }, [topic]);

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

  function toggleSolved(problemId: string) {
    setSolvedProblemIds((current) => {
      const next = current.includes(problemId)
        ? current.filter((id) => id !== problemId)
        : [...current, problemId];

      window.localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  }

  const filteredProblems =
    activeFilter === "All"
      ? problems
      : problems.filter((problem) => problem.difficulty === activeFilter);

  const solvedCount = problems.filter((problem) =>
    solvedProblemIds.includes(problem.id)
  ).length;

  if (isLoading) {
    return <QuestionLoading label="Loading coding questions..." />;
  }

  if (error) {
    return (
      <section className="rounded-lg border border-rose-200 bg-white p-5 shadow-card">
        <p className="text-sm font-semibold text-rose-700">
          Coding questions could not be loaded.
        </p>
        <p className="mt-2 text-sm text-slate-600">{error}</p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-950">
            {solvedCount}/{problems.length} questions solved
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Filter by difficulty and mark problems done as you complete them.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {difficultyFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeFilter === filter
                  ? "bg-teal-700 text-white"
                  : "border border-slate-300 bg-white text-slate-600 hover:border-teal-300 hover:text-teal-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {filteredProblems.length === 0 ? (
          <article className="rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-card">
            No coding questions match this filter yet.
          </article>
        ) : null}

        {filteredProblems.map((problem) => {
          const isSolved = solvedProblemIds.includes(problem.id);

          return (
            <article
              key={problem.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-teal-300"
            >
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-md bg-teal-50 px-3 py-1 font-mono text-xs text-teal-700">
                  {problem.topicTitle}
                </span>
                <span className="rounded-md bg-amber-50 px-3 py-1 font-mono text-xs text-amber-700">
                  {problem.difficulty}
                </span>
                <span
                  className={`rounded-md px-3 py-1 font-mono text-xs ${
                    isSolved
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {isSolved ? "Solved" : "Unsolved"}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {problem.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {problem.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => toggleSolved(problem.id)}
                    className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                      isSolved
                        ? "bg-emerald-700 text-white hover:bg-emerald-800"
                        : "border border-slate-300 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
                    }`}
                  >
                    {isSolved ? "Mark unsolved" : "Mark solved"}
                  </button>
                  <Link
                    href={`/problems/${problem.id}`}
                    className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
                  >
                    Open problem
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
