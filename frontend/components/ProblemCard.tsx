import Link from "next/link";

import type { Problem } from "@/lib/problems";

type ProblemCardProps = {
  problem: Problem;
};

export function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <Link
      href={`/problems/${problem.id}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-teal-300"
    >
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="rounded-md bg-teal-50 px-3 py-1 font-mono text-xs text-teal-700">
          {problem.topicTitle}
        </span>
        <span className="rounded-md bg-amber-50 px-3 py-1 font-mono text-xs text-amber-700">
          {problem.difficulty}
        </span>
        <span className="ml-auto text-sm text-slate-500 transition group-hover:text-teal-700">
          Open problem
        </span>
      </div>

      <h2 className="text-xl font-semibold text-slate-900">{problem.title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        {problem.description}
      </p>
    </Link>
  );
}
