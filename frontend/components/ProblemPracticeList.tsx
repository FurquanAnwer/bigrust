"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { Problem } from "@/lib/problems";
import type { Difficulty } from "@/lib/topics";

type ProblemPracticeListProps = {
  problems: Problem[];
};

type DifficultyFilter = "All" | Difficulty;

const difficultyFilters: DifficultyFilter[] = ["All", "Easy", "Medium", "Hard"];
const storageKey = "bigrust-solved-problems";

export function ProblemPracticeList({ problems }: ProblemPracticeListProps) {
  const [activeFilter, setActiveFilter] = useState<DifficultyFilter>("All");
  const [solvedProblemIds, setSolvedProblemIds] = useState<string[]>([]);

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
